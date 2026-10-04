import fallbackCatalog from '../shared/nutrition/catalog.json' with { type: 'json' };
import { parseNutritionFiles } from '../shared/nutrition/parse.js';
import { createNutritionSource, publicCatalog } from '../shared/nutrition/source.js';
import { isVagueDishName, resolveMealItem } from '../shared/nutrition/match.js';
import { calculateNutrition, sumNutrition } from '../shared/nutrition/calculate.js';
import { booheeCodeFromId } from '../shared/nutrition/boohee.js';
import { booheeFromEnv } from './boohee.js';
import { chooseRecipes, programReason } from '../shared/nutrition/recommend.js';
import { collectAllowedNumbers, inferCaution, programAdvice, sanitizeAdvice, sanitizeReason } from '../shared/nutrition/advice.js';
import { cleanDietSettings } from '../shared/meals.js';
import { isExplicitUrgent, urgentResponse, urgentText } from '../shared/safety.js';
import { extractJson, qwenChat, qwenConfig, readModelItems, stubParseText } from './qwen.js';

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' },
});

export function loadNutrition(env = {}) {
  if (env.NUTRITION_FOODS_CSV || env.NUTRITION_RECIPES_CSV) {
    let config = fallbackCatalog.portionDefaults ? { catalogVersion: fallbackCatalog.version, portionDefaults: fallbackCatalog.portionDefaults } : {};
    if (env.NUTRITION_CONFIG) {
      try { config = JSON.parse(env.NUTRITION_CONFIG); }
      catch { return { errors: ['config.json 无法解析'], source: null }; }
    }
    const parsed = parseNutritionFiles({ foodsCsv: env.NUTRITION_FOODS_CSV || '', recipesCsv: env.NUTRITION_RECIPES_CSV || '', config });
    if (parsed.errors.length) return { errors: parsed.errors, source: null };
    return { errors: [], source: createNutritionSource(parsed.catalog) };
  }
  return { errors: [], source: createNutritionSource(fallbackCatalog) };
}

export async function handleDiet(request, env, url) {
  const loaded = loadNutrition(env);
  if (url.pathname === '/api/diet/catalog' && request.method === 'GET') {
    if (loaded.errors.length) return json({ error: '食物数据未通过校验', details: loaded.errors }, 500);
    return json(publicCatalog(loaded.source));
  }
  if (request.method !== 'POST') return json({ error: '请使用 POST 请求' }, 405);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: '请求需为 JSON' }, 415);
  const maxBytes = url.pathname === '/api/diet/recognize' ? 2 * 1024 * 1024 : 256 * 1024;
  let body;
  try { body = await readJson(request, maxBytes); }
  catch (error) { return json({ error: error.message === 'size' ? '请求内容过长' : '请求或回复校验未通过' }, error.message === 'size' ? 413 : 400); }
  try {
    if (loaded.errors.length) return json({ error: '食物数据未通过校验', details: loaded.errors }, 500);
    const result = await dispatchDiet(url.pathname, body, env, loaded.source);
    await assertDietResult(result, loaded.source, booheeFromEnv(env));
    return json(result);
  } catch (error) {
    if (error.message === 'size') return json({ error: '请求内容过长' }, 413);
    const safe = new Set(['没有从这句话里拆出食物', '没有识别出食物', '模型没有返回可解析的结果', '模型返回的食物列表无效', '模型返回的食物名为空', '模型服务暂时不可用', '模型没有返回内容', '照片格式无效', '缺少餐食内容', '食物项无效', '目标无效', '请求编号无效', '路径无效', '暂时无法识别，请稍后再试或改为打字记录']);
    return json({ error: safe.has(error.message) ? error.message : '请求或回复校验未通过' }, 400);
  }
}

export async function dispatchDiet(pathname, body, env, source) {
  const requestId = cleanId(body?.requestId);
  if (pathname === '/api/diet/recognize') return recognizeMeal(body, env, source, requestId);
  if (pathname === '/api/diet/calculate') return calculateItems(body, source, requestId, env);
  if (pathname === '/api/diet/report') return buildReport(body, env, source, requestId);
  if (pathname === '/api/diet/recommend') return buildRecommendation(body, env, source, requestId);
  throw new Error('路径无效');
}

export async function recognizeMeal(body, env, source, requestId) {
  const text = typeof body?.text === 'string' ? body.text.trim().slice(0, 1500) : '';
  const image = normalizeImage(body?.imageDataUrl);
  if (!text && !image) throw new Error('缺少餐食内容');
  if (isExplicitUrgent(text)) return urgentOnly(requestId);
  const config = qwenConfig(env);
  let parsed;
  let stub = false;
  if (!config.enabled) {
    console.info(JSON.stringify({ component: 'diet', event: 'recognize_unconfigured' }));
    if (image && !text) throw new Error('暂时无法识别，请稍后再试或改为打字记录');
    stub = true;
    parsed = stubParseText(text);
  } else {
    let content;
    try {
      content = await qwenChat({
        config,
        model: image ? config.visionModel : config.textModel,
        messages: mealMessages({ text, image, source }),
        fetchImpl: env.qwenFetch,
      });
    } catch (error) {
      console.info(JSON.stringify({ component: 'diet', event: 'recognize_failed' }));
      throw error;
    }
    parsed = readModelItems(extractJson(content));
  }
  const boohee = booheeFromEnv(env);
  const items = (await Promise.all(parsed.map(item => resolveRecordedItem(item, source, boohee, { allowSearch: true })))).filter(item => item.inputName || item.name);
  if (!items.length) throw new Error('没有识别出食物');
  return {
    requestId,
    mode: 'meal_draft',
    stub,
    notice: '请核对食物和分量，再记下来。',
    items,
  };
}

export async function calculateItems(body, source, requestId, env = {}) {
  const text = typeof body?.text === 'string' ? body.text : '';
  if (isExplicitUrgent(text)) return urgentOnly(requestId);
  if (!Array.isArray(body?.items) || body.items.length > 12) throw new Error('食物项无效');
  const boohee = booheeFromEnv(env);
  const items = await Promise.all(body.items.map(item => resolveRecordedItem({
    name: item?.name || item?.inputName,
    inputName: item?.inputName,
    foodId: item?.foodId,
    grams: item?.grams,
    portionLabel: item?.portionLabel,
    forceUnestimated: item?.forceUnestimated === true,
  }, source, boohee, { trustFoodId: Boolean(item?.foodId) && item?.forceUnestimated !== true, allowSearch: true })));
  return { requestId, mode: 'calculated', items };
}

export async function buildReport(body, env, source, requestId) {
  const texts = collectTexts(body);
  if (texts.some(isExplicitUrgent)) return urgentOnly(requestId);
  const meals = await recomputeMeals(body?.meals, source, booheeFromEnv(env));
  if (!meals.length) return { requestId, mode: 'empty', text: '今天还没有记录，所以不会生成一份报告。', totals: null, advice: '', adviceKept: false };
  const totals = sumNutrition(meals.flatMap(meal => meal.items));
  const targets = cleanTargets(body?.targets);
  const caution = inferCaution(texts, body?.flagsConfirmed === true ? body.flags : {});
  const allowed = collectAllowedNumbers(totals, targets);
  const config = qwenConfig(env);
  let advice = '';
  let adviceKept = false;
  let stub = !config.enabled;
  if (!totals.counted && totals.skipped) {
    advice = programAdvice({ totals, targets, caution });
    adviceKept = true;
    stub = true;
  } else if (!config.enabled) {
    advice = programAdvice({ totals, targets, caution });
    const checked = sanitizeAdvice(advice, allowed);
    advice = checked.text;
    adviceKept = checked.kept;
  } else {
    try {
      const content = await qwenChat({
        config,
        model: config.textModel,
        messages: [{ role: 'system', content: '你只根据给定的合计写一两句中文建议。不要新增数字、食物或菜谱。不要鼓励极端少吃，不要提供治疗方案。只返回 JSON：{"advice":"..."}' }, { role: 'user', content: JSON.stringify({ totals, targets: targets.confirmed ? targets : null, caution }) }],
        fetchImpl: env.qwenFetch,
      });
      const checked = sanitizeAdvice(extractJson(content).advice, allowed);
      advice = checked.text;
      adviceKept = checked.kept;
      stub = false;
    } catch {
      advice = '';
      adviceKept = false;
    }
  }
  return {
    requestId,
    mode: 'report',
    stub,
    totals,
    targets: targets.confirmed ? targets : null,
    caution,
    advice,
    adviceKept,
    adviceNote: adviceKept ? '' : '今天先看上面的合计。',
    skipped: meals.flatMap(meal => meal.items).filter(item => !item.nutrition).map(item => item.name),
  };
}

export async function buildRecommendation(body, env, source, requestId) {
  const texts = collectTexts(body);
  if (texts.some(isExplicitUrgent)) return urgentOnly(requestId);
  const meals = await recomputeMeals(body?.meals, source, booheeFromEnv(env));
  const totals = sumNutrition(meals.flatMap(meal => meal.items));
  const targets = cleanTargets(body?.targets);
  const caution = inferCaution(texts, body?.flagsConfirmed === true ? body.flags : {});
  const excludeIds = Array.isArray(body?.excludeIds) ? body.excludeIds.filter(id => typeof id === 'string').slice(0, 30) : [];
  const [recipe] = chooseRecipes({ recipes: source.recipes, totals, targets, caution, excludeIds, limit: 1 });
  if (!recipe) {
    return { requestId, mode: 'recommendation', recipe: null, reason: '食谱库里没有更合适的一道。可以从现有食谱里另选，这里不会新编一道菜。', reasonKept: true, reasonSource: 'program', empty: true };
  }
  const allowed = [...collectAllowedNumbers(totals, targets), recipe.nutrition.kcal, recipe.nutrition.protein, recipe.nutrition.fat, recipe.nutrition.carb];
  const config = qwenConfig(env);
  let reason = '';
  let reasonKept = false;
  let reasonSource = 'dropped';
  if (!config.enabled) {
    const checked = sanitizeReason(programReason(recipe, { totals, targets, caution }), recipe, source.recipes, allowed);
    reason = checked.text;
    reasonKept = checked.kept;
    reasonSource = 'program';
  } else {
    try {
      const content = await qwenChat({
        config,
        model: config.textModel,
        messages: [{ role: 'system', content: '食谱已经选定。只用一两句话解释为什么是这道。不要提到其他菜名，不要编造做法或营养数字。只返回 JSON：{"reason":"..."}' }, { role: 'user', content: JSON.stringify({ recipe: { id: recipe.id, name: recipe.name, nutrition: recipe.nutrition }, totals, targets: targets.confirmed ? targets : null, caution }) }],
        fetchImpl: env.qwenFetch,
      });
      const checked = sanitizeReason(extractJson(content).reason, recipe, source.recipes, allowed);
      reason = checked.text;
      reasonKept = checked.kept;
      reasonSource = checked.kept ? 'model' : 'dropped';
    } catch {
      reason = '';
      reasonKept = false;
    }
  }
  return {
    requestId,
    mode: 'recommendation',
    empty: false,
    recipe: publicRecipe(recipe, source),
    reason,
    reasonKept,
    reasonSource,
    reasonNote: reasonKept ? '' : '可以从这道开始。',
  };
}

export function mealMessages({ text, image, source }) {
  const names = source.foods.map(food => food.aliases.length ? `${food.name}：${food.aliases.join('、')}` : food.name).join('；');
  const instruction = [
    '把这一餐分成若干项，每项只要名称、分量说法和估计克数。不要输出热量或营养素。',
    'name 只输出一个简短菜名，不要带别名，不要加括号。',
    '用户说的是一道菜时，保留这道菜的整体名称，不要拆成原料。例如「番茄炒蛋」「红烧肉」「牛肉面」各算一项，不要拆成番茄、鸡蛋、油或面条。',
    '只有用户明确分开列出的食材，才各自成项。例如「米饭、青菜和鸡腿」是三项。',
    '照片里确实分开的食物各自成项。已经用整道菜表示的，不要再把这道菜的原料重复列出来，也不要又写菜名又写原料。',
    `能对上就用冒号左边的标准名。对照：${names}。对不上就保留用户说的或照片里看到的简短名字。不要为了凑表里的原料把一道菜拆开。`,
    '只返回 JSON：{"items":[{"name":"","portionLabel":"","grams":0}]}',
  ].join('');
  if (!image) return [{ role: 'system', content: instruction }, { role: 'user', content: text }];
  return [{ role: 'system', content: instruction }, { role: 'user', content: [{ type: 'image_url', image_url: { url: image } }, { type: 'text', text: text || '请识别这张餐食照片里的食物和大致克数。' }] }];
}

async function recomputeMeals(meals, source, boohee) {
  if (!Array.isArray(meals)) return [];
  const resolved = [];
  for (const meal of meals.slice(0, 12)) {
    const raws = Array.isArray(meal?.items) ? meal.items.slice(0, 12) : [];
    const items = await Promise.all(raws.map(item => resolveRecordedItem({
      name: item?.name,
      inputName: item?.inputName,
      foodId: item?.status === 'matched' || item?.foodId ? item.foodId : '',
      grams: item?.grams,
      portionLabel: item?.portionLabel,
    }, source, boohee, { trustFoodId: Boolean(item?.foodId) && item?.status !== 'unestimated' && item?.status !== 'ambiguous', allowSearch: false })));
    if (items.length) resolved.push({ items });
  }
  return resolved;
}

async function resolveRecordedItem(raw, source, boohee, options = {}) {
  const code = booheeCodeFromId(raw?.foodId);
  if (options.trustFoodId && code) return resolveBooheeCode(raw, boohee, code);
  const local = resolveMealItem(raw, source, options);
  if (isVagueDishName(local.inputName) || isVagueDishName(local.name)) {
    return { ...local, status: 'unestimated', reason: 'too_vague', foodId: local.foodId || null, nutrition: null, candidates: [] };
  }
  const canSearch = options.allowSearch && local.status === 'unestimated' && (local.reason === 'no_match' || local.reason === 'not_calculable');
  if (!canSearch) return local;
  const outcome = await boohee.matchName(local.inputName);
  if (outcome.status === 'matched') return withBooheeFood(local, outcome.food, outcome.candidates);
  if (outcome.status === 'ambiguous') return { ...local, status: 'ambiguous', reason: 'ambiguous', foodId: null, nutrition: null, candidates: outcome.candidates };
  if (outcome.status === 'no_key') return { ...local, reason: 'no_key', nutrition: null };
  if (outcome.status === 'failed') return { ...local, reason: 'lookup_failed', nutrition: null };
  return { ...local, reason: 'no_match', nutrition: null };
}

async function resolveBooheeCode(raw, boohee, code) {
  const found = await boohee.foodByCode(code);
  const base = resolveMealItem({ ...raw, forceUnestimated: true }, { foods: [], getFood: () => null }, {});
  if (found.status === 'ok') return withBooheeFood({ ...base, inputName: raw.inputName || raw.name || found.food.name, grams: numberGrams(raw.grams) || base.grams, portionLabel: raw.portionLabel || base.portionLabel }, found.food, []);
  return { ...base, inputName: String(raw.inputName || raw.name || '').trim().slice(0, 40), name: String(raw.name || raw.inputName || '').trim().slice(0, 40) || base.name, reason: found.status === 'no_key' ? 'no_key' : 'lookup_failed' };
}

function withBooheeFood(local, food, candidates) {
  let nutrition = null;
  try { nutrition = calculateNutrition(food, local.grams); }
  catch { nutrition = null; }
  if (!nutrition) return { ...local, status: 'unestimated', reason: 'bad_grams', foodId: null, nutrition: null, candidates };
  return { ...local, name: food.name, status: 'matched', reason: 'matched', foodId: food.id, nutrition, candidates };
}

function numberGrams(value) {
  const grams = Number(value);
  return Number.isFinite(grams) ? Math.round(grams) : null;
}

function publicRecipe(recipe, source) {
  return publicCatalog({ ...source, recipes: [recipe], foods: source.foods, getFood: source.getFood }).recipes[0];
}

function cleanTargets(input) {
  try { return cleanDietSettings({ targets: input, flagsConfirmed: false }).targets; }
  catch { throw new Error('目标无效'); }
}

function collectTexts(body) {
  const texts = [];
  if (typeof body?.text === 'string') texts.push(body.text);
  if (Array.isArray(body?.texts)) texts.push(...body.texts.filter(item => typeof item === 'string'));
  if (Array.isArray(body?.meals)) {
    for (const meal of body.meals) if (typeof meal?.rawText === 'string') texts.push(meal.rawText);
  }
  return texts.map(item => item.slice(0, 1500));
}

function cleanId(id) {
  if (typeof id !== 'string' || !/^[\w-]{1,100}$/.test(id)) throw new Error('请求编号无效');
  return id;
}

function normalizeImage(value) {
  if (value == null || value === '') return '';
  if (typeof value !== 'string') throw new Error('照片格式无效');
  const compact = value.replace(/\s/g, '');
  if (compact.length > 1_800_000) throw new Error('size');
  if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(compact)) throw new Error('照片格式无效');
  return compact;
}

function urgentOnly(requestId) {
  return { ...urgentResponse(requestId), items: [], recipe: null, advice: '', planDraft: undefined };
}

export async function assertDietResult(result, source, boohee = booheeFromEnv({})) {
  if (!result || result.mode === 'urgent_help') {
    if (result?.text !== urgentText || result.items?.length || result.recipe || result.advice) throw new Error('紧急求助回复未通过校验');
    return result;
  }
  if (result.mode === 'meal_draft' || result.mode === 'calculated') {
    for (const item of result.items) await assertItem(item, source, boohee);
  }
  if (result.mode === 'recommendation' && result.recipe) {
    if (!source.getRecipe(result.recipe.id) || source.getRecipe(result.recipe.id).blockedByHerbs) throw new Error('推荐不在食谱库中');
  }
  if (result.advice && result.adviceKept === false) throw new Error('未通过核对的建议不能返回');
  if (result.reason && result.reasonKept === false) throw new Error('未通过核对的理由不能返回');
  return result;
}

async function assertItem(item, source, boohee) {
  if (item.nutrition && item.status !== 'matched') throw new Error('无法估算的食物不能带热量');
  if (item.status !== 'matched') return;
  const again = await resolveRecordedItem({ name: item.name, foodId: item.foodId, grams: item.grams, portionLabel: item.portionLabel }, source, boohee, { trustFoodId: true, allowSearch: false });
  if (!again.nutrition || again.nutrition.kcal !== item.nutrition.kcal || again.nutrition.protein !== item.nutrition.protein || again.nutrition.fat !== item.nutrition.fat || again.nutrition.carb !== item.nutrition.carb) {
    throw new Error('热量校验未通过');
  }
}

async function readJson(request, maxBytes) {
  if (Number(request.headers.get('content-length')) > maxBytes) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('input');
  const chunks = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxBytes) { await reader.cancel(); throw new Error('size'); }
    chunks.push(value);
  }
  const joined = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { joined.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(joined));
}
