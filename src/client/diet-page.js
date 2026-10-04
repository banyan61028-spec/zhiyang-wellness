import { calculateItems, fetchCatalog, recognizeMeal, requestRecommendation, requestReport } from './diet-client.js';
import { localDateString, validateMeal } from '../shared/meals.js';

const mealNames = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐' };
const mealOrder = ['breakfast', 'lunch', 'dinner', 'snack'];
const RING_R = 52;
const RING_C = 2 * Math.PI * RING_R;

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
  let composeText = '';
  let composeMeal = '';
  let composeError = '';
  let photoName = '';
  let pendingFile = null;

  document.addEventListener('input', event => {
    const el = event.target;
    if (!(el instanceof HTMLTextAreaElement)) return;
    if (el.name === 'text' && el.closest('#meal-form')) composeText = el.value;
  });

  document.addEventListener('change', event => {
    const el = event.target;
    if (!(el instanceof HTMLElement)) return;
    if (el.id === 'meal-photo') {
      pendingFile = el.files?.[0] || null;
      photoName = pendingFile ? pendingFile.name : '';
      const hint = document.querySelector('[data-photo-name]');
      if (hint) hint.textContent = photoName ? `已选 ${photoName}` : '';
      return;
    }
    if (el.name === 'meal' && el.closest('#meal-form')) { composeMeal = el.value; return; }
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
    const meal = composeMeal || defaultMeal();
    const status = busy ? '正在识别食物和分量' : (photoName ? `已选 ${photoName}` : '写好后点发送，或先拍一张');
    return `${heading('记下这一餐', '写一句话，或拍一张。热量按食物表计算，界面写「约」。')}
      <div class="diet-page">${privacy()}${catalogError ? `<div class="storage-error" role="alert">${ctx.esc(catalogError)}</div>` : ''}${urgent ? urgentBanner(urgent) : ''}
      <div class="diet-layout">
        <section>
          <form id="meal-form" class="composer ${busy ? 'is-busy' : ''}">
            <label class="meal-chip">这一餐
              <select name="meal" aria-label="这一餐">${mealOrder.map(key => `<option value="${key}" ${key === meal ? 'selected' : ''}>${mealNames[key]}</option>`).join('')}</select>
            </label>
            <div class="composer-box">
              <textarea name="text" maxlength="1500" rows="2" placeholder="中午吃了一碗米饭和番茄炒蛋" aria-label="写下吃了什么">${ctx.esc(composeText)}</textarea>
              <div class="composer-actions">
                <label class="icon-hit">
                  <span class="sr-only">拍照或上传照片</span>
                  <input id="meal-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" capture="environment">
                  ${ctx.icon('camera')}
                </label>
                <button class="icon-hit send" type="submit" aria-label="${busy ? '正在识别' : '识别这一餐'}" aria-busy="${busy ? 'true' : 'false'}" ${busy ? 'disabled' : ''}>${ctx.icon('send')}</button>
              </div>
            </div>
            <p class="composer-status" role="status" data-photo-name>${ctx.esc(status)}</p>
            ${composeError ? `<p class="composer-error" role="alert">${ctx.esc(composeError)}</p>` : ''}
          </form>
          ${draft ? editor(draft) : ''}
        </section>
        <aside class="diet-card today-side">
          <h2>今天已经记下</h2>
          ${todayMeals.length ? todayMeals.map(mealCard).join('') : '<p class="empty-copy">还没有记录。记下一餐后，这里和「今日」都会更新。</p>'}
          <button class="text-button diet-link" data-page="today">看今日报告 ${ctx.icon('arrow')}</button>
        </aside>
      </div></div>`;
  }

  function today() {
    scheduleToday();
    const state = ctx.getState();
    const meals = mealsOn(state, localDateString());
    const body = meals.length
      ? `${reportBlock()}${recommendBlock()}<section class="diet-section"><h2>今天记下的</h2>${meals.map(mealCard).join('')}</section>`
      : '<div class="empty-state"><div><h3>今天还是空的</h3><p>先记下吃了什么。没有记录时，不会编一份报告。</p><button class="primary-button" data-page="home">去记一餐</button></div></div>';
    return `${heading('今天', '合计来自食物表。建议只有一两句，数字对不上就会被拿掉。')}<div class="diet-page">${privacy()}${urgent ? urgentBanner(urgent) : ''}${body}</div>`;
  }

  function library() {
    if (!catalog) return `${heading('食谱', '下一餐只从这里选。')}<div class="diet-page">${catalogError ? `<div class="storage-error">${ctx.esc(catalogError)}</div>` : '<p class="empty-copy">正在读取食谱。</p>'}</div>`;
    return `${heading('食谱', '每道菜的热量都由原料克数计算，不是手写的大约值。')}<div class="diet-page"><p class="library-note">正式食谱整理中。</p><div class="food-grid diet-library">${catalog.recipes.map(recipe => `<button class="recipe-tile diet-recipe" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}"><div class="recipe-type-art"><span>${mealNames[recipe.meal] || '家常'}</span></div><div class="recipe-tile-body">${recipe.example ? '<span class="example-mark">示例食谱</span>' : ''}<h3>${ctx.esc(recipe.name)}</h3><p class="num">约 ${recipe.nutrition.kcal} 千卡</p>${recipe.blockedByHerbs ? '<span class="chip chip-quiet">暂不主动推荐</span>' : ''}</div></button>`).join('')}</div></div>`;
  }

  function settings() {
    const settingsState = ctx.getState().dietSettings;
    const targets = settingsState.targets;
    const flags = settingsState.flags;
    return `${heading('我的', '没有账号。换浏览器或清除数据后，记录不会跟着走。')}<div class="diet-page">${privacy()}<section class="diet-card"><h2>每日目标</h2><p class="small muted">这是你自己填的参考，不是膳食处方。留空的项目不参与对比。</p><form id="target-form"><div class="target-grid"><label class="form-label">热量（千卡）<input name="kcal" inputmode="numeric" min="0" max="10000" value="${targets.kcal ?? ''}"></label><label class="form-label">蛋白质（克）<input name="protein" inputmode="numeric" min="0" max="500" value="${targets.protein ?? ''}"></label><label class="form-label">脂肪（克）<input name="fat" inputmode="numeric" min="0" max="500" value="${targets.fat ?? ''}"></label><label class="form-label">碳水（克）<input name="carb" inputmode="numeric" min="0" max="500" value="${targets.carb ?? ''}"></label></div><label class="check-line"><input type="checkbox" name="confirm" ${targets.confirmed ? 'checked' : ''}> 我确认把这些数字当作自己的每日目标</label><button class="primary-button" type="submit">保存目标</button></form></section><section class="diet-card"><h2>需要放宽建议的情况</h2><p class="small muted">勾选后，报告不再按热量缺口鼓励少吃；肾病不会按蛋白质缺口推荐高蛋白菜。这不是诊断。</p><form id="flags-form">${flagBox('pregnancy', '孕期或备孕', flags.pregnancy)}${flagBox('lactation', '哺乳', flags.lactation)}${flagBox('minor', '未成年', flags.minor)}${flagBox('kidney', '肾病', flags.kidney)}${flagBox('diabetes', '糖尿病', flags.diabetes)}${flagBox('hypertension', '高血压', flags.hypertension)}${flagBox('eatingDisorder', '进食让我很痛苦，或出现催吐、绝食', flags.eatingDisorder)}<label class="check-line"><input type="checkbox" name="confirm" ${settingsState.flagsConfirmed ? 'checked' : ''}> 我确认用这些情况调整文字建议，不据此开饮食处方</label><button class="primary-button" type="submit">保存这些情况</button></form></section><section class="diet-card"><h2>清除本机数据</h2><p class="small muted">会同时清除饮食记录、每日目标、旧档案、收藏、方案和测评。清除后找不回来。</p><button class="outline-button" data-action="reset">清除本机记录</button></section></div>`;
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
    const data = new FormData(form);
    const text = String(data.get('text') || '').trim();
    const meal = String(data.get('meal') || composeMeal || defaultMeal());
    const file = form.querySelector('#meal-photo')?.files?.[0] || pendingFile;
    composeText = String(data.get('text') || '');
    composeMeal = meal;
    if (file) { pendingFile = file; photoName = file.name; }
    if (!text && !file) { composeError = '写一句话，或拍一张这一餐的照片。'; ctx.render(); return; }
    busy = true;
    urgent = null;
    composeError = '';
    ctx.render();
    try {
      const imageDataUrl = file ? await compressImage(file) : '';
      const result = await recognizeMeal({ text, imageDataUrl });
      if (result.mode === 'urgent_help') {
        draft = null;
        urgent = result;
        composeText = '';
        pendingFile = null;
        photoName = '';
        return;
      }
      draft = {
        id: crypto.randomUUID(), date: localDateString(), meal, inputType: file ? 'photo' : 'text',
        rawText: text, stub: result.stub === true, notice: result.notice || '', createdAt: new Date().toISOString(),
        items: result.items.map(item => ({ ...item, clientId: crypto.randomUUID() })),
      };
      composeText = '';
      pendingFile = null;
      photoName = '';
      composeError = '';
    } catch (error) {
      composeError = error.message || '识别没有完成。已写的内容还在，可以再发一次。';
      ctx.toast(composeError);
    } finally { busy = false; ctx.render(); }
  }

  function editor(current) {
    return `<section class="draft-editor" aria-label="核对这一餐"><div class="draft-head"><h2>核对这一餐</h2><p class="small muted">${ctx.esc(current.notice)}</p></div>${current.items.map(item => itemCard(item)).join('')}<div class="button-row"><button class="primary-button" type="button" data-diet-action="save-draft">记下来</button><button class="outline-button" type="button" data-diet-action="discard">先不记</button></div></section>`;
  }

  function itemCard(item) {
    const food = catalog?.foods.find(entry => entry.id === item.foodId);
    const nutrition = item.nutrition;
    const sourceLabel = nutrition ? (nutrition.source === '薄荷健康' ? '薄荷健康' : '本地食物表') : '';
    const kcal = nutrition
      ? `<p class="food-kcal"><span class="num">${nutrition.kcal}</span><small>约千卡</small></p>`
      : '<p class="food-kcal food-kcal-soft"><span>无法估算</span><small>可以改选，或先留着</small></p>';
    return `<article class="food-card">
      <header class="food-card-head"><div><h3>${ctx.esc(item.name || item.inputName)}</h3>${item.inputName && item.inputName !== item.name ? `<p class="small muted">识别为 ${ctx.esc(item.inputName)}</p>` : ''}</div>${kcal}</header>
      <div class="chip-row">${sourceLabel ? `<span class="chip">${sourceLabel}</span>` : '<span class="chip chip-soft">无法估算</span>'}${item.portionLabel ? `<span class="chip chip-quiet">${ctx.esc(item.portionLabel)}</span>` : ''}</div>
      ${foodSelect(item)}
      <div class="portion-row" role="group" aria-label="修正分量">
        ${portionButton(item, 'small', '小')}${portionButton(item, 'medium', '中')}${portionButton(item, 'large', '大')}
        <label class="grams-field">克数<input data-diet-grams="${ctx.esc(item.clientId)}" type="number" min="1" max="5000" inputmode="numeric" value="${item.grams ?? ''}" aria-label="克数"></label>
      </div>
      ${nutrition ? `${macroPills(nutrition)}<p class="small muted">来源：${ctx.esc(nutrition.source)}。${ctx.esc(nutrition.sourceNote)}</p>` : `<div class="unestimated-panel"><p>${unestimatedCopy(item.reason)}</p>${food ? `<p class="small">${ctx.esc(food.sourceNote)}</p>` : ''}</div>`}
    </article>`;
  }

  function portionButton(item, size, label) {
    const active = item.portionLabel === label;
    return `<button type="button" data-diet-action="portion" data-diet-item="${ctx.esc(item.clientId)}" data-diet-size="${size}" class="${active ? 'active' : ''}" aria-pressed="${active}">${label}</button>`;
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
    const asking = item.status === 'ambiguous' && !item.nutrition;
    const prompt = asking ? '请选择' : '无法估算';
    return `<label class="form-label food-pick">${asking ? '这几项都可能，选一个' : '换成别的'}<select data-diet-food="${ctx.esc(item.clientId)}" aria-label="${asking ? '选择对应的食物' : '改食物'}"><option value="">${prompt}</option>${options.map(option => `<option value="${ctx.esc(option.id)}" ${option.id === selected ? 'selected' : ''}>${ctx.esc(option.branded ? `${option.name}（品牌包装）` : option.name)}</option>`).join('')}</select></label>`;
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
    if (!report || report.mode === 'empty') return '<section class="diet-card dash-loading"><p class="composer-status">正在汇总今天的热量。</p></section>';
    if (report.mode === 'error') return `<div class="storage-error" role="alert">${ctx.esc(report.adviceNote)} <button class="text-button diet-link" data-diet-action="retry-today">重试</button></div>`;
    if (report.mode === 'urgent_help') return '';
    const totals = report.totals;
    if (!totals) return '';
    const target = report.targets;
    const gap = target?.kcal != null ? target.kcal - totals.kcal : null;
    const ratio = target?.kcal ? totals.kcal / target.kcal : null;
    const tone = ratio != null && ratio > 1 ? 'over' : 'under';
    const center = totals.counted ? String(totals.kcal) : '—';
    const aria = gap == null
      ? (totals.counted ? `今日约 ${totals.kcal} 千卡，还没有确认每日目标` : '今天还没有可计算的热量')
      : `今日约 ${totals.kcal} 千卡，目标 ${target.kcal} 千卡，${gap >= 0 ? `大约还少 ${gap} 千卡` : `大约多了 ${Math.abs(gap)} 千卡`}`;
    const gapCopy = gap == null
      ? '<p class="dash-gap">每日目标还没确认，所以这里只显示合计。</p>'
      : `<p class="dash-gap ${gap < 0 ? 'over' : ''}">和你确认过的 <span class="num">${target.kcal}</span> 千卡相比，${gap >= 0 ? `大约还少 <span class="num">${gap}</span> 千卡` : `大约多了 <span class="num">${Math.abs(gap)}</span> 千卡`}。</p>`;
    const advice = report.adviceKept && report.advice
      ? `<p>${ctx.esc(report.advice)}</p>`
      : `<p class="small muted">${ctx.esc(report.adviceNote || '')}</p>`;
    return `<section class="dash" aria-label="今日热量">
      <div class="ring-wrap" role="img" aria-label="${ctx.esc(aria)}">${ringSvg(ratio, tone)}<div class="ring-center"><strong class="num">${center}</strong><span>${totals.counted ? '今日千卡' : '没有可计算的热量'}</span></div></div>
      <div class="dash-copy"><p class="eyebrow">按当前食物表重算</p>${gapCopy}${report.skipped?.length ? `<p class="small muted">未计入：${report.skipped.map(name => ctx.esc(name)).join('、')}。这些食物无法估算。</p>` : ''}</div>
    </section>
    <section class="diet-card"><h2>三大营养素</h2>${macroBars(totals, target)}</section>
    <section class="diet-card advice-card"><h2>今天的建议</h2>${advice}</section>`;
  }

  function recommendBlock() {
    if (!recommendation) return '<section class="diet-card"><p class="composer-status">正在从食谱库里选下一餐。</p></section>';
    if (!recommendation.recipe) return `<section class="diet-card"><h2>下一餐</h2><p>${ctx.esc(recommendation.reason || recommendation.reasonNote || '食谱库里没有更合适的一道。')}</p><button class="text-button diet-link" data-page="library">查看现有食谱 ${ctx.icon('arrow')}</button></section>`;
    const recipe = recommendation.recipe;
    const reason = recommendation.reasonKept && recommendation.reason
      ? `<p class="advice-line">${ctx.esc(recommendation.reason)}</p>`
      : `<p class="small muted">${ctx.esc(recommendation.reasonNote || '推荐理由没有通过核对，只保留食谱库里的这道菜。')}</p>`;
    return `<article class="recipe-feature"><div class="recipe-feature-art"><span>${mealNames[recipe.meal] || '家常'}</span>${recipe.example ? '<span class="example-mark">示例食谱</span>' : ''}</div><div class="recipe-feature-body"><p class="eyebrow">下一餐可以从这道开始</p><h2>${ctx.esc(recipe.name)}</h2><p class="food-kcal"><span class="num">${recipe.nutrition.kcal}</span><small>约千卡</small></p>${macroPills(recipe.nutrition)}${reason}<div class="button-row"><button class="primary-button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}">查看做法</button><button class="outline-button" data-diet-action="another">换一道库里的菜</button></div></div></article>`;
  }

  function mealCard(meal) {
    const estimated = meal.items.filter(item => item.nutrition);
    const kcal = estimated.reduce((sum, item) => sum + item.nutrition.kcal, 0);
    return `<article class="saved-meal"><div class="section-mini"><span>${mealNames[meal.meal]} · <span class="num">${ctx.esc(meal.date)}</span></span><span class="meal-actions"><button class="text-button" data-diet-action="edit-meal" data-diet-id="${ctx.esc(meal.id)}">修改</button><button class="text-button" data-diet-action="delete-meal" data-diet-id="${ctx.esc(meal.id)}">删除</button></span></div><ul class="meal-lines">${meal.items.map(item => `<li><span>${ctx.esc(item.name)}</span><span class="num">${item.grams ?? '—'} 克</span><span class="num">${item.nutrition ? `约 ${item.nutrition.kcal} 千卡` : '无法估算'}</span></li>`).join('')}</ul><p class="small muted">${estimated.length ? `这一餐可估算部分约 <span class="num">${kcal}</span> 千卡` : '这一餐没有可估算的热量'}</p></article>`;
  }

  function openRecipe(id) {
    const recipe = catalog?.recipes.find(item => item.id === id) || recommendation?.recipe;
    if (!recipe || recipe.id !== id && recommendation?.recipe?.id !== id) return;
    const chosen = recipe.id === id ? recipe : recommendation.recipe;
    ctx.openDetail(`<div class="detail-body">${chosen.example ? '<span class="example-mark example-inline">示例食谱</span>' : '<span class="chip">食谱</span>'}<h2>${ctx.esc(chosen.name)}</h2><p class="small muted">${mealNames[chosen.meal] || '家常'}</p><p class="food-kcal"><span class="num">${chosen.nutrition.kcal}</span><small>约千卡</small></p>${macroPills(chosen.nutrition)}<h3>原料和克数</h3><div class="ingredient-list">${chosen.ingredients.map(item => `<span>${ctx.esc(item.name)} <span class="num">${item.grams}</span> 克</span>`).join('')}</div><h3>做法</h3><ol class="step-list">${chosen.steps.map(step => `<li>${ctx.esc(step)}</li>`).join('')}</ol><p class="gentle-note">${ctx.esc(chosen.note || '')} ${ctx.esc(chosen.sourceNote || '')}</p>${chosen.avoid?.includes('kidney_high_protein') ? '<p class="boundary-note">这道菜标记为蛋白质较高，肾病用户不会因为蛋白质缺口被推荐它。</p>' : ''}</div>`, '食谱');
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
  return `<div class="page-heading diet-heading"><div><p class="eyebrow">知养</p><h1>${title}</h1><p>${sub}</p></div><div class="date-stamp"><strong class="num">${String(now.getMonth() + 1).padStart(2, '0')}<span>/${String(now.getDate()).padStart(2, '0')}</span></strong><span>今天 · 记在本机</span></div></div>`;
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
function macroShares(nutrition) {
  const protein = Number(nutrition?.protein) || 0;
  const fat = Number(nutrition?.fat) || 0;
  const carb = Number(nutrition?.carb) || 0;
  const total = protein + fat + carb || 1;
  return { protein: protein / total * 100, fat: fat / total * 100, carb: carb / total * 100 };
}
function macroPills(nutrition) {
  const share = macroShares(nutrition);
  return `<div class="macro-stack" aria-hidden="true"><i class="protein" style="width:${share.protein.toFixed(1)}%"></i><i class="fat" style="width:${share.fat.toFixed(1)}%"></i><i class="carb" style="width:${share.carb.toFixed(1)}%"></i></div><p class="macro-pills"><span>蛋白质 <b class="num">${nutrition.protein}</b> 克</span><span>脂肪 <b class="num">${nutrition.fat}</b> 克</span><span>碳水 <b class="num">${nutrition.carb}</b> 克</span></p>`;
}
function macroBars(totals, targets) {
  const rows = [
    ['蛋白质', totals.protein, targets?.protein],
    ['脂肪', totals.fat, targets?.fat],
    ['碳水', totals.carb, targets?.carb],
  ];
  const gramSum = rows.reduce((sum, row) => sum + (Number(row[1]) || 0), 0) || 1;
  return `<div class="macro-bars">${rows.map(([label, value, target]) => {
    const amount = Number(value) || 0;
    const hasTarget = target != null && Number(target) > 0;
    const ratio = hasTarget ? amount / Number(target) : amount / gramSum;
    const width = Math.max(0, Math.min(ratio, 1)) * 100;
    const over = hasTarget && ratio > 1;
    const note = hasTarget ? `目标 ${target} 克` : '占三项合计';
    return `<div class="macro-line"><div class="macro-line-top"><span>${label}</span><span class="num">${amount} 克</span></div><div class="bar${over ? ' over' : ''}"><span style="width:${width.toFixed(1)}%"></span></div><p class="small muted">${note}${over ? ' · 已超过' : ''}</p></div>`;
  }).join('')}</div>`;
}
function ringSvg(ratio, tone) {
  const dash = (ratio == null ? RING_C : Math.max(0, Math.min(ratio, 1)) * RING_C);
  const shown = dash.toFixed(2);
  const rest = (RING_C - dash).toFixed(2);
  return `<svg class="kcal-ring ${tone}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="${RING_R}" class="ring-track"/><circle cx="70" cy="70" r="${RING_R}" class="ring-value" stroke-dasharray="${shown} ${rest}" transform="rotate(-90 70 70)"/></svg>`;
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
