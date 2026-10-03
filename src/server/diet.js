import fallbackCatalog from '../shared/nutrition/catalog.json' with { type: 'json' };
import { parseNutritionFiles } from '../shared/nutrition/parse.js';
import { createNutritionSource, publicCatalog } from '../shared/nutrition/source.js';
import { resolveMealItem } from '../shared/nutrition/match.js';
import { sumNutrition } from '../shared/nutrition/calculate.js';
import { chooseRecipes, programReason } from '../shared/nutrition/recommend.js';
import { collectAllowedNumbers, inferCaution, programAdvice, sanitizeAdvice, sanitizeReason } from '../shared/nutrition/advice.js';
import { cleanDietSettings } from '../shared/meals.js';
import { isExplicitUrgent, urgentResponse, urgentText } from '../shared/safety.js';
import { extractJson, qwenChat, qwenConfig, readModelItems, stubImageItems, stubParseText } from './qwen.js';

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
    assertDietResult(result, loaded.source);
    return json(result);
  } catch (error) {
    if (error.message === 'size') return json({ error: '请求内容过长' }, 413);
    const safe = new Set(['没有从这句话里拆出食物', '没有识别出食物', '模型没有返回可解析的结果', '模型返回的食物列表无效', '模型返回的食物名为空', '模型服务暂时不可用', '模型没有返回内容', '照片格式无效', '缺少餐食内容', '食物项无效', '目标无效', '请求编号无效', '路径无效']);
    return json({ error: safe.has(error.message) ? error.message : '请求或回复校验未通过' }, 400);
  }
}

export async function dispatchDiet(pathname, body, env, source) {
  const requestId = cleanId(body?.requestId);
  if (pathname === '/api/diet/recognize') return recognizeMeal(body, env, source, requestId);
  if (pathname === '/api/diet/calculate') return calculateItems(body, source, requestId);
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
    stub = true;
    parsed = image && !text ? stubImageItems() : stubParseText(text || '米饭和鸡蛋');
  } else {
    const content = await qwenChat({
      config,
      model: image ? config.visionModel : config.textModel,
      messages: mealMessages({ text, image, source }),
    });
    parsed = readModelItems(extractJson(content));
  }
  const items = parsed.map(item => resolveMealItem(item, source)).filter(item => item.inputName || item.name);
  if (!items.length) throw new Error('没有识别出食物');
  return {
    requestId,
    mode: 'meal_draft',
    stub,
    notice: stub ? '未配置 DASHSCOPE_API_KEY，这次由测试替身拆分食物和分量。请核对后再保存。' : '食物名和分量来自千问。热量按食物表计算，模型给出的营养数字不会被采用。',
    items,
  };
}

export function calculateItems(body, source, requestId) {
  const text = typeof body?.text === 'string' ? body.text : '';
  if (isExplicitUrgent(text)) return urgentOnly(requestId);
  if (!Array.isArray(body?.items) || body.items.length > 12) throw new Error('食物项无效');
  const items = body.items.map(item => resolveMealItem({
    name: item?.name || item?.inputName,
    inputName: item?.inputName,
    foodId: item?.foodId,
    grams: item?.grams,
    portionLabel: item?.portionLabel,
    forceUnestimated: item?.forceUnestimated === true,
  }, source, { trustFoodId: Boolean(item?.foodId) && item?.forceUnestimated !== true }));
  return { requestId, mode: 'calculated', items };
}

export async function buildReport(body, env, source, requestId) {
  const texts = collectTexts(body);
  if (texts.some(isExplicitUrgent)) return urgentOnly(requestId);
  const meals = recomputeMeals(body?.meals, source);
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
    adviceNote: adviceKept ? '' : '这句建议没有通过核对，已隐藏。上面的数字来自食物表计算。',
    skipped: meals.flatMap(meal => meal.items).filter(item => !item.nutrition).map(item => item.name),
  };
}

export async function buildRecommendation(body, env, source, requestId) {
  const texts = collectTexts(body);
  if (texts.some(isExplicitUrgent)) return urgentOnly(requestId);
  const meals = recomputeMeals(body?.meals, source);
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
    reasonNote: reasonKept ? '' : '推荐理由没有通过核对，已隐藏。这道菜仍来自食谱库，营养是按原料算的。',
  };
}

function mealMessages({ text, image, source }) {
  const names = source.foods.map(food => food.aliases.length ? `${food.name}（${food.aliases.join('、')}）` : food.name).join('、');
  const instruction = `只把餐食拆成食物名称、分量说法和估计克数。不要输出热量或营养素。名称尽量沿用这些食物：${names}。对不上就保留看到的名字。只返回 JSON：{"items":[{"name":"","portionLabel":"","grams":0}]}`;
  if (!image) return [{ role: 'system', content: instruction }, { role: 'user', content: text }];
  return [{ role: 'system', content: instruction }, { role: 'user', content: [{ type: 'image_url', image_url: { url: image } }, { type: 'text', text: text || '请识别这张餐食照片里的食物和大致克数。' }] }];
}

function recomputeMeals(meals, source) {
  if (!Array.isArray(meals)) return [];
  return meals.slice(0, 12).map(meal => {
    const items = Array.isArray(meal?.items) ? meal.items.slice(0, 12).map(item => resolveMealItem({
      name: item?.name,
      inputName: item?.inputName,
      foodId: item?.status === 'matched' || item?.foodId ? item.foodId : '',
      grams: item?.grams,
      portionLabel: item?.portionLabel,
    }, source, { trustFoodId: Boolean(item?.foodId) && item?.status !== 'unestimated' && item?.status !== 'ambiguous' })) : [];
    return { items };
  }).filter(meal => meal.items.length);
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

export function assertDietResult(result, source) {
  if (!result || result.mode === 'urgent_help') {
    if (result?.text !== urgentText || result.items?.length || result.recipe || result.advice) throw new Error('紧急求助回复未通过校验');
    return result;
  }
  if (result.mode === 'meal_draft' || result.mode === 'calculated') {
    for (const item of result.items) assertItem(item, source);
  }
  if (result.mode === 'recommendation' && result.recipe) {
    if (!source.getRecipe(result.recipe.id) || source.getRecipe(result.recipe.id).blockedByHerbs) throw new Error('推荐不在食谱库中');
  }
  if (result.advice && result.adviceKept === false) throw new Error('未通过核对的建议不能返回');
  if (result.reason && result.reasonKept === false) throw new Error('未通过核对的理由不能返回');
  return result;
}

function assertItem(item, source) {
  if (item.nutrition && item.status !== 'matched') throw new Error('无法估算的食物不能带热量');
  if (item.status !== 'matched') return;
  const again = resolveMealItem({ name: item.name, foodId: item.foodId, grams: item.grams, portionLabel: item.portionLabel }, source, { trustFoodId: true });
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
