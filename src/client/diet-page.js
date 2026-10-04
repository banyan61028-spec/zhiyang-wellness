import { calculateItems, fetchCatalog, recognizeMeal, requestRecommendation, requestReport } from './diet-client.js';
import { localDateString, validateMeal } from '../shared/meals.js';

const mealNames = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐' };
const mealOrder = ['breakfast', 'lunch', 'dinner', 'snack'];

export function createDietPages(ctx) {
  let catalog = null;
  let catalogError = '';
  let draft = null;
  let busy = false;
  let report = null;
  let recommendation = null;
  let excludeIds = [];
  let inflight = '';
  let urgent = null;

  document.addEventListener('change', event => {
    const el = event.target;
    if (!(el instanceof HTMLElement)) return;
    if (el.dataset.dietFood != null) void changeFood(el.dataset.dietFood, el.value).catch(error => ctx.toast(error.message));
    if (el.dataset.dietGrams != null) void changeGrams(el.dataset.dietGrams, el.value).catch(error => ctx.toast(error.message));
  });

  async function loadCatalog() {
    try { catalog = await fetchCatalog(); catalogError = ''; }
    catch (error) { catalog = null; catalogError = error.message || '食物表暂时读不出来'; }
  }

  function record() {
    const state = ctx.getState();
    const todayMeals = mealsOn(state, localDateString());
    return `${heading('记下这一餐。', '拍照或写一句话。热量按食物表计算，界面写「约」。')}${privacy()}${catalogError ? `<div class="storage-error" role="alert">${ctx.esc(catalogError)}</div>` : ''}${urgent ? urgentBanner(urgent) : ''}<div class="diet-layout"><section class="diet-card"><form id="meal-form"><label class="form-label">这一餐<select name="meal">${mealOrder.map(key => `<option value="${key}" ${key === defaultMeal() ? 'selected' : ''}>${mealNames[key]}</option>`).join('')}</select></label><label class="form-label">写下来<textarea name="text" maxlength="1500" rows="3" placeholder="例如：中午一碗牛肉面加个蛋"></textarea></label><label class="outline-button file-button">拍照或上传照片<input id="meal-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" capture="environment"></label><button class="primary-button full-button" type="submit" ${busy ? 'disabled' : ''}>识别这一餐</button></form>${draft ? editor(draft) : ''}</section><aside class="diet-card"><h2>今天已经记下</h2>${todayMeals.length ? todayMeals.map(mealCard).join('') : '<p class="empty-copy">还没有记录。记下一餐后，这里和「今日」都会更新。</p>'}<button class="text-button" data-page="today">看今日报告 ${ctx.icon('arrow')}</button></aside></div>`;
  }

  function today() {
    scheduleToday();
    const state = ctx.getState();
    const meals = mealsOn(state, localDateString());
    return `${heading('今天吃得怎样。', '合计来自食物表。建议只有一两句，数字对不上就会被拿掉。')}${privacy()}${urgent ? urgentBanner(urgent) : ''}${meals.length ? meals.map(mealCard).join('') : '<div class="empty-state"><div><h3>今天还是空的</h3><p>先记下吃了什么。没有记录时，不会编一份报告。</p><button class="primary-button" data-page="home">去记一餐</button></div></div>'}${reportBlock()}${recommendBlock()}`;
  }

  function library() {
    if (!catalog) return `${heading('食谱库。', '下一餐只从这里选。')}${catalogError ? `<div class="storage-error">${ctx.esc(catalogError)}</div>` : '<p class="empty-copy">正在读取食谱。</p>'}`;
    return `${heading('食谱库。', '每道菜的热量都由原料克数计算，不是手写的大约值。')}<div class="food-grid">${catalog.recipes.map(recipe => `<button class="recipe-tile" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}"><div class="recipe-type-art"><span>${mealNames[recipe.meal] || '家常'}</span></div><div class="recipe-tile-body"><span class="tag">${recipe.example ? '示例' : '食谱'}${recipe.blockedByHerbs ? ' · 不推荐' : ''}</span><h3>${ctx.esc(recipe.name)}</h3><p>约 ${recipe.nutrition.kcal} 千卡 · 蛋白质 ${recipe.nutrition.protein} 克</p></div></button>`).join('')}</div>`;
  }

  function settings() {
    const settingsState = ctx.getState().dietSettings;
    const targets = settingsState.targets;
    const flags = settingsState.flags;
    return `${heading('目标和这台设备上的记录。', '没有账号。换浏览器或清除数据后，记录不会跟着走。')}${privacy()}<section class="diet-card"><h2>每日目标</h2><p class="small muted">这是你自己填的参考，不是膳食处方。留空的项目不参与对比。</p><form id="target-form"><div class="target-grid"><label class="form-label">热量（千卡）<input name="kcal" inputmode="numeric" min="0" max="10000" value="${targets.kcal ?? ''}"></label><label class="form-label">蛋白质（克）<input name="protein" inputmode="numeric" min="0" max="500" value="${targets.protein ?? ''}"></label><label class="form-label">脂肪（克）<input name="fat" inputmode="numeric" min="0" max="500" value="${targets.fat ?? ''}"></label><label class="form-label">碳水（克）<input name="carb" inputmode="numeric" min="0" max="500" value="${targets.carb ?? ''}"></label></div><label class="check-line"><input type="checkbox" name="confirm" ${targets.confirmed ? 'checked' : ''}> 我确认把这些数字当作自己的每日目标</label><button class="primary-button" type="submit">保存目标</button></form></section><section class="diet-card"><h2>需要放宽建议的情况</h2><p class="small muted">勾选后，报告不再按热量缺口鼓励少吃；肾病不会按蛋白质缺口推荐高蛋白菜。这不是诊断。</p><form id="flags-form">${flagBox('pregnancy', '孕期或备孕', flags.pregnancy)}${flagBox('lactation', '哺乳', flags.lactation)}${flagBox('minor', '未成年', flags.minor)}${flagBox('kidney', '肾病', flags.kidney)}${flagBox('diabetes', '糖尿病', flags.diabetes)}${flagBox('hypertension', '高血压', flags.hypertension)}${flagBox('eatingDisorder', '进食让我很痛苦，或出现催吐、绝食', flags.eatingDisorder)}<label class="check-line"><input type="checkbox" name="confirm" ${settingsState.flagsConfirmed ? 'checked' : ''}> 我确认用这些情况调整文字建议，不据此开饮食处方</label><button class="primary-button" type="submit">保存这些情况</button></form></section><section class="diet-card"><h2>清除本机数据</h2><p class="small muted">会同时清除饮食记录、每日目标、旧档案、收藏、方案和测评。清除后找不回来。</p><button class="outline-button" data-action="reset">清除本机记录</button></section>`;
  }

  async function onClick(button) {
    const action = button.dataset.dietAction;
    if (!action) return false;
    if (action === 'portion') await changePortion(button.dataset.dietItem, button.dataset.dietSize);
    else if (action === 'save-draft') await saveDraft();
    else if (action === 'discard') { draft = null; urgent = null; ctx.render(); }
    else if (action === 'delete-meal') { await ctx.writeStore(storage => storage.removeMeal(button.dataset.dietId)); invalidateToday(); ctx.toast('已删除这一餐'); }
    else if (action === 'edit-meal') beginEdit(button.dataset.dietId);
    else if (action === 'recipe') openRecipe(button.dataset.dietId);
    else if (action === 'another') await anotherRecipe();
    else if (action === 'retry-today') { invalidateToday(); ctx.render(); }
    else return false;
    return true;
  }

  async function onSubmit(event) {
    if (event.target.id === 'meal-form') { event.preventDefault(); await submitMeal(event.target); return true; }
    if (event.target.id === 'target-form') { event.preventDefault(); await saveTargets(event.target); return true; }
    if (event.target.id === 'flags-form') { event.preventDefault(); await saveFlags(event.target); return true; }
    return false;
  }

  async function submitMeal(form) {
    const text = String(new FormData(form).get('text') || '').trim();
    const file = form.querySelector('#meal-photo')?.files?.[0];
    if (!text && !file) { ctx.toast('请拍照或写一句话'); return; }
    busy = true; urgent = null; ctx.render();
    try {
      const imageDataUrl = file ? await compressImage(file) : '';
      const result = await recognizeMeal({ text, imageDataUrl });
      if (result.mode === 'urgent_help') { draft = null; urgent = result; return; }
      draft = {
        id: crypto.randomUUID(), date: localDateString(), meal: String(new FormData(form).get('meal')), inputType: file ? 'photo' : 'text',
        rawText: text, stub: result.stub === true, notice: result.notice || '', createdAt: new Date().toISOString(),
        items: result.items.map(item => ({ ...item, clientId: crypto.randomUUID() })),
      };
    } finally { busy = false; ctx.render(); }
  }

  function editor(current) {
    return `<div class="draft-editor"><h2>核对这一餐</h2><p class="small muted">${ctx.esc(current.notice)}</p>${current.items.map(item => itemCard(item)).join('')}<div class="button-row"><button class="primary-button" type="button" data-diet-action="save-draft">记下来</button><button class="outline-button" type="button" data-diet-action="discard">先不记</button></div></div>`;
  }

  function itemCard(item) {
    const food = catalog?.foods.find(entry => entry.id === item.foodId);
    const nutrition = item.nutrition;
    const tag = nutrition ? (nutrition.source === '薄荷健康' ? '薄荷健康' : '已匹配食物表') : '无法估算';
    return `<article class="food-item"><header><strong>${ctx.esc(item.name || item.inputName)}</strong>${item.inputName && item.inputName !== item.name ? `<span class="small muted">识别为 ${ctx.esc(item.inputName)}</span>` : ''}<span class="${nutrition ? 'tag' : 'unestimated'}">${tag}</span></header>${foodSelect(item)}<div class="portion-row" role="group" aria-label="修正分量"><button type="button" data-diet-action="portion" data-diet-item="${ctx.esc(item.clientId)}" data-diet-size="small" class="${item.portionLabel === '小' ? 'active' : ''}">小</button><button type="button" data-diet-action="portion" data-diet-item="${ctx.esc(item.clientId)}" data-diet-size="medium" class="${item.portionLabel === '中' ? 'active' : ''}">中</button><button type="button" data-diet-action="portion" data-diet-item="${ctx.esc(item.clientId)}" data-diet-size="large" class="${item.portionLabel === '大' ? 'active' : ''}">大</button><label>克数<input data-diet-grams="${ctx.esc(item.clientId)}" type="number" min="1" max="5000" value="${item.grams ?? ''}"></label></div>${nutrition ? `<p class="kcal-figure">约 ${nutrition.kcal} 千卡</p><p class="macro-row"><span>蛋白质 ${nutrition.protein} 克</span><span>脂肪 ${nutrition.fat} 克</span><span>碳水 ${nutrition.carb} 克</span></p><p class="small muted">来源：${ctx.esc(nutrition.source)}。${ctx.esc(nutrition.sourceNote)}</p>` : `<p class="unestimated">${unestimatedCopy(item.reason)}</p>`}${food && !nutrition ? `<p class="small muted">${ctx.esc(food.sourceNote)}</p>` : ''}</article>`;
  }

  function foodSelect(item) {
    if (!catalog) return '';
    const extras = [];
    const push = option => { if (option?.id && !extras.some(entry => entry.id === option.id)) extras.push(option); };
    if (item.nutrition && item.foodId) push({ id: item.foodId, name: item.name });
    for (const candidate of item.candidates || []) push(candidate);
    const local = catalog.foods.filter(food => food.calculable && !extras.some(entry => entry.id === food.id));
    const options = [...extras, ...local];
    const selected = item.nutrition ? item.foodId : '';
    const prompt = item.status === 'ambiguous' && !item.nutrition ? '请选择' : '无法估算';
    return `<label class="form-label">${item.status === 'ambiguous' && !item.nutrition ? '请选择对应的食物' : '改食物'}<select data-diet-food="${ctx.esc(item.clientId)}"><option value="">${prompt}</option>${options.map(option => `<option value="${ctx.esc(option.id)}" ${option.id === selected ? 'selected' : ''}>${ctx.esc(option.branded ? `${option.name}（品牌包装）` : option.name)}</option>`).join('')}</select></label>`;
  }

  async function changePortion(clientId, size) {
    const item = draft?.items.find(entry => entry.clientId === clientId);
    if (!item) return;
    const food = catalog?.foods.find(entry => entry.id === item.foodId);
    const portion = food?.portion || { small: 100, medium: 150, large: 250 };
    item.grams = portion[size];
    item.portionLabel = size === 'small' ? '小' : size === 'large' ? '大' : '中';
    item.userAdjusted = true;
    await recalculate();
  }

  async function changeGrams(clientId, value) {
    const item = draft?.items.find(entry => entry.clientId === clientId);
    if (!item) return;
    item.grams = Number(value);
    item.portionLabel = '自定义';
    item.userAdjusted = true;
    await recalculate();
  }

  async function changeFood(clientId, foodId) {
    const item = draft?.items.find(entry => entry.clientId === clientId);
    if (!item) return;
    item.userAdjusted = true;
    if (!foodId) { item.foodId = null; item.forceUnestimated = true; item.status = 'unestimated'; }
    else { item.foodId = foodId; item.forceUnestimated = false; item.name = catalog?.foods.find(food => food.id === foodId)?.name || item.name; }
    await recalculate();
  }

  async function recalculate() {
    if (!draft) return;
    const result = await calculateItems({ items: draft.items.map(item => ({ name: item.inputName || item.name, inputName: item.inputName, foodId: item.forceUnestimated ? '' : item.foodId, grams: item.grams, portionLabel: item.portionLabel, forceUnestimated: item.forceUnestimated === true })) });
    if (result.mode === 'urgent_help') { urgent = result; draft = null; ctx.render(); return; }
    draft.items = draft.items.map((item, index) => {
      const next = result.items[index];
      return { ...item, ...next, candidates: next.candidates?.length ? next.candidates : item.candidates, clientId: item.clientId, userAdjusted: item.userAdjusted, forceUnestimated: item.forceUnestimated === true && !next.nutrition };
    });
    ctx.render();
  }

  async function saveDraft() {
    if (!draft?.items.length) return;
    const record = validateMeal({ ...draft, rawText: draft.rawText || '' });
    await ctx.writeStore(storage => storage.saveMeal(record));
    draft = null;
    invalidateToday();
    ctx.toast('已记在这台设备上');
    ctx.render();
  }

  function beginEdit(id) {
    const meal = ctx.getState().meals.find(item => item.id === id);
    if (!meal) return;
    draft = { ...meal, items: meal.items.map(item => ({ ...item, clientId: crypto.randomUUID(), inputName: item.inputName || item.name })), notice: '正在修改已保存的一餐。', stub: meal.stub };
    urgent = null;
    ctx.navigate('home');
  }

  function scheduleToday() {
    const key = cacheKey();
    if ((report?.key === key && recommendation?.key === key) || inflight === key) return;
    inflight = key;
    queueMicrotask(() => loadToday(key));
  }

  async function loadToday(key) {
    try {
      const meals = mealsOn(ctx.getState(), localDateString());
      if (cacheKey() !== key) return;
      if (!meals.length) {
        report = { key, mode: 'empty' };
        recommendation = { key, empty: true, reason: '先记下今天吃了什么，再从食谱库里选下一餐。', reasonKept: true };
        excludeIds = [];
        return;
      }
      const body = requestBody(meals);
      const nextReport = { key, ...(await requestReport(body)) };
      if (cacheKey() !== key) return;
      report = nextReport;
      if (report.mode === 'urgent_help') { urgent = report; recommendation = { key, empty: true, reason: '', reasonKept: true }; return; }
      excludeIds = [];
      const nextRecommendation = { key, ...(await requestRecommendation({ ...body, excludeIds })) };
      if (cacheKey() !== key) return;
      recommendation = nextRecommendation;
      if (recommendation.mode === 'urgent_help') urgent = recommendation;
    } catch (error) {
      if (cacheKey() !== key) return;
      report = { key, mode: 'error', adviceNote: error.message || '今天的报告没有生成' };
      recommendation = { key, empty: true, reason: '', reasonKept: false };
    } finally {
      if (inflight === key) inflight = '';
      ctx.render();
    }
  }

  async function anotherRecipe() {
    if (!recommendation?.recipe) return;
    excludeIds = [...excludeIds, recommendation.recipe.id];
    const meals = mealsOn(ctx.getState(), localDateString());
    const key = cacheKey();
    recommendation = { key, ...(await requestRecommendation({ ...requestBody(meals), excludeIds })) };
    ctx.render();
  }

  function requestBody(meals) {
    const settingsState = ctx.getState().dietSettings;
    return {
      meals: meals.map(meal => ({ rawText: meal.rawText, items: meal.items.map(item => ({ name: item.name, inputName: item.inputName, foodId: item.foodId, grams: item.grams, status: item.status, portionLabel: item.portionLabel })) })),
      texts: meals.map(meal => meal.rawText).filter(Boolean),
      targets: settingsState.targets,
      flags: settingsState.flags,
      flagsConfirmed: settingsState.flagsConfirmed,
    };
  }

  function reportBlock() {
    if (!report || report.mode === 'empty') return '';
    if (report.mode === 'error') return `<div class="storage-error">${ctx.esc(report.adviceNote)} <button class="text-button" data-diet-action="retry-today">重试</button></div>`;
    if (report.mode === 'urgent_help') return '';
    const totals = report.totals;
    if (!totals) return '';
    const target = report.targets;
    const gap = target?.kcal != null ? target.kcal - totals.kcal : null;
    return `<section class="diet-card report-card"><p class="eyebrow">按当前食物表重算</p><p class="kcal-figure">${totals.counted ? `约 ${totals.kcal} 千卡` : '没有可计算的热量'}</p><p class="macro-row"><span>蛋白质 ${totals.protein} 克</span><span>脂肪 ${totals.fat} 克</span><span>碳水 ${totals.carb} 克</span></p>${gap == null ? '<p class="small muted">每日目标还没确认，所以这里只显示合计。</p>' : `<p>和你确认过的 ${target.kcal} 千卡相比，${gap >= 0 ? `大约还少 ${gap} 千卡` : `大约多了 ${Math.abs(gap)} 千卡`}。</p>`}${report.skipped?.length ? `<p class="small muted">未计入：${report.skipped.map(name => ctx.esc(name)).join('、')}。这些食物无法估算。</p>` : ''}${report.adviceKept && report.advice ? `<p class="advice-line">${ctx.esc(report.advice)}</p>` : `<p class="small muted">${ctx.esc(report.adviceNote || '')}</p>`}</section>`;
  }

  function recommendBlock() {
    if (!recommendation) return mealsOn(ctx.getState(), localDateString()).length ? '<p class="empty-copy">正在从食谱库里选下一餐。</p>' : '';
    if (!recommendation.recipe) return `<section class="diet-card"><h2>下一餐</h2><p>${ctx.esc(recommendation.reason || recommendation.reasonNote || '食谱库里没有更合适的一道。')}</p><button class="text-button" data-page="library">查看现有食谱 ${ctx.icon('arrow')}</button></section>`;
    const recipe = recommendation.recipe;
    return `<section class="diet-card"><h2>下一餐可以从这道开始</h2><h3>${ctx.esc(recipe.name)}</h3><p class="kcal-figure">约 ${recipe.nutrition.kcal} 千卡</p><p class="macro-row"><span>蛋白质 ${recipe.nutrition.protein} 克</span><span>脂肪 ${recipe.nutrition.fat} 克</span><span>碳水 ${recipe.nutrition.carb} 克</span></p>${recommendation.reasonKept && recommendation.reason ? `<p class="advice-line">${ctx.esc(recommendation.reason)}</p>` : `<p class="small muted">${ctx.esc(recommendation.reasonNote || '推荐理由没有通过核对，只保留食谱库里的这道菜。')}</p>`}<div class="button-row"><button class="primary-button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}">查看做法</button><button class="outline-button" data-diet-action="another">换一道库里的菜</button></div></section>`;
  }

  function mealCard(meal) {
    const estimated = meal.items.filter(item => item.nutrition);
    const kcal = estimated.reduce((sum, item) => sum + item.nutrition.kcal, 0);
    return `<article class="saved-meal"><div class="section-mini"><span>${mealNames[meal.meal]} · ${ctx.esc(meal.date)}</span><span><button class="text-button" data-diet-action="edit-meal" data-diet-id="${ctx.esc(meal.id)}">修改</button><button class="text-button" data-diet-action="delete-meal" data-diet-id="${ctx.esc(meal.id)}">删除</button></span></div><p>${meal.items.map(item => `${ctx.esc(item.name)} ${item.grams ?? ''} 克${item.nutrition ? ` · 约 ${item.nutrition.kcal} 千卡` : ' · 无法估算'}`).join('<br>')}</p><p class="small muted">${estimated.length ? `这一餐可估算部分约 ${kcal} 千卡` : '这一餐没有可估算的热量'}</p></article>`;
  }

  function openRecipe(id) {
    const recipe = catalog?.recipes.find(item => item.id === id) || recommendation?.recipe;
    if (!recipe || recipe.id !== id && recommendation?.recipe?.id !== id) return;
    const chosen = recipe.id === id ? recipe : recommendation.recipe;
    ctx.openDetail(`<div class="detail-body"><span class="tag">${chosen.example ? '示例食谱' : '食谱'} · ${mealNames[chosen.meal] || '家常'}</span><h2>${ctx.esc(chosen.name)}</h2><p class="kcal-figure">约 ${chosen.nutrition.kcal} 千卡</p><p class="macro-row"><span>蛋白质 ${chosen.nutrition.protein} 克</span><span>脂肪 ${chosen.nutrition.fat} 克</span><span>碳水 ${chosen.nutrition.carb} 克</span></p><h3>原料和克数</h3><div class="ingredient-list">${chosen.ingredients.map(item => `<span>${ctx.esc(item.name)} ${item.grams} 克</span>`).join('')}</div><h3>做法</h3><ol class="step-list">${chosen.steps.map(step => `<li>${ctx.esc(step)}</li>`).join('')}</ol><p class="gentle-note">${ctx.esc(chosen.note || '')} ${ctx.esc(chosen.sourceNote || '')}</p>${chosen.avoid?.includes('kidney_high_protein') ? '<p class="boundary-note">这道菜标记为蛋白质较高，肾病用户不会因为蛋白质缺口被推荐它。</p>' : ''}</div>`, '食谱');
  }

  async function saveTargets(form) {
    const data = new FormData(form);
    if (!data.get('confirm')) { ctx.toast('请先勾选确认，再保存目标'); return; }
    const current = ctx.getState().dietSettings;
    await ctx.writeStore(storage => storage.dietSettings({ ...current, targets: { kcal: blank(data.get('kcal')), protein: blank(data.get('protein')), fat: blank(data.get('fat')), carb: blank(data.get('carb')), source: 'user', confirmed: true }, flagsConfirmed: current.flagsConfirmed }));
    invalidateToday();
    ctx.toast('每日目标已保存在本机');
  }

  async function saveFlags(form) {
    const data = new FormData(form);
    if (!data.get('confirm')) { ctx.toast('请先勾选确认，再保存这些情况'); return; }
    const current = ctx.getState().dietSettings;
    const flags = Object.fromEntries(['pregnancy', 'lactation', 'minor', 'kidney', 'diabetes', 'hypertension', 'eatingDisorder'].map(key => [key, data.get(key) === 'on']));
    await ctx.writeStore(storage => storage.dietSettings({ ...current, flags, flagsConfirmed: true }));
    invalidateToday();
    ctx.toast('已保存。之后的报告会按这些情况放宽建议');
  }

  function invalidateToday() { report = null; recommendation = null; excludeIds = []; inflight = ''; }
  function cacheKey() {
    const state = ctx.getState();
    const meals = mealsOn(state, localDateString());
    return JSON.stringify({ meals: meals.map(meal => [meal.id, meal.updatedAt, meal.items.map(item => [item.foodId, item.grams, item.status])]), targets: state.dietSettings.targets, flags: state.dietSettings.flags, flagsConfirmed: state.dietSettings.flagsConfirmed });
  }

  return { loadCatalog, record, today, library, settings, onClick, onSubmit };
}

function mealsOn(state, date) {
  return (state.meals || []).filter(meal => meal.date === date).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
function defaultMeal() {
  const hour = new Date().getHours();
  if (hour < 10) return 'breakfast';
  if (hour < 15) return 'lunch';
  return hour < 21 ? 'dinner' : 'snack';
}
function heading(title, sub) {
  const now = new Date();
  return `<div class="page-heading"><div><p class="eyebrow">MEAL NOTES</p><h1>${title}</h1><p>${sub}</p></div><div class="date-stamp"><strong>${String(now.getMonth() + 1).padStart(2, '0')}<span>/${String(now.getDate()).padStart(2, '0')}</span></strong><span>今天 · 记在本机</span></div></div>`;
}
function privacy() {
  return '<p class="privacy-banner">你输入的文字和上传的照片会发给阿里云百炼的千问，用来识别食物和写一两句建议。没有配置千问密钥时使用本机测试替身，不会外发。对不上本地食物表的食物名称会发给薄荷健康开放平台查询营养数据；没有配置薄荷密钥或查询失败时，该项标为无法估算。本应用不在服务器上保存照片和饮食正文。记录只留在这台设备的浏览器里。</p>';
}
function urgentBanner(result) {
  return `<div class="urgent-help" role="alert"><strong>请立即寻求专业帮助</strong><p>${result.text}</p></div>`;
}
function unestimatedCopy(reason) {
  if (reason === 'no_key') return '本地食物表没有这项。没有配置薄荷开放平台，所以无法估算。';
  if (reason === 'lookup_failed') return '薄荷查询没有成功，所以无法估算。不会填一个看起来合理的热量。';
  if (reason === 'not_calculable') return '这道在本地食物表里标为不可计算。不会填一个看起来合理的热量。';
  return '这道暂时无法估算。可以改成食物表或上面列出的一项，或保留为无法估算。不会填一个看起来合理的热量。';
}
function flagBox(name, label, checked) {
  return `<label class="check-line"><input type="checkbox" name="${name}" ${checked ? 'checked' : ''}> ${label}</label>`;
}
function blank(value) {
  const text = String(value ?? '').trim();
  return text === '' ? null : Number(text);
}
async function compressImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('请选择图片');
  if (file.size > 8 * 1024 * 1024) throw new Error('图片太大，请换一张较小的照片');
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1024 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.72));
  if (!blob) throw new Error('照片处理失败');
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  return `data:image/jpeg;base64,${btoa(binary)}`;
}
