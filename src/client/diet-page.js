import { calculateItems, fetchCatalog, recognizeMeal, requestRecommendation, requestReport } from './diet-client.js';
import { createId } from '../shared/id.js';
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
    if (el.dataset.dietFood != null) void changeFood(el.dataset.dietFood, el.value).catch(error => ctx.toast(friendlyMessage(error.message, '这次没有改成，请再试一次')));
    if (el.dataset.dietGrams != null) void changeGrams(el.dataset.dietGrams, el.value).catch(error => ctx.toast(friendlyMessage(error.message, '这次没有改成，请再试一次')));
  });

  async function loadCatalog() {
    try { catalog = await fetchCatalog(); catalogError = ''; }
    catch (error) { catalog = null; catalogError = friendlyMessage(error.message, '食谱暂时打不开，请稍后再试'); }
  }

  function record() {
    const state = ctx.getState();
    const todayMeals = mealsOn(state, localDateString());
    const meal = composeMeal || defaultMeal();
    const status = busy ? '正在看这一餐' : (photoName ? `已选 ${photoName}` : '写好后发送，或拍一张');
    return `${heading('记下这一餐', '拍一张，或写一句话。')}
      <div class="diet-page">${catalogError ? `<div class="storage-error" role="alert">${ctx.esc(catalogError)}</div>` : ''}${urgent ? urgentBanner(urgent) : ''}
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
          ${todayMeals.length ? todayMeals.map(mealCard).join('') : '<p class="empty-copy">今天还没记。写一句话，或拍一张。</p>'}
          <button class="text-button diet-link" data-page="today">看今天 ${ctx.icon('arrow')}</button>
        </aside>
      </div></div>`;
  }

  function today() {
    scheduleToday();
    const state = ctx.getState();
    const meals = mealsOn(state, localDateString());
    const body = meals.length
      ? `${reportBlock()}${recommendBlock()}<section class="diet-section"><h2>今天记下的</h2>${meals.map(mealCard).join('')}</section>`
      : '<div class="empty-state"><div><h3>今天还没记下一餐</h3><p>记下来之后，这里才会出现合计。</p><button class="primary-button" data-page="home">去记一餐</button></div></div>';
    return `${heading('今天', '看看今天大约吃了多少。')}<div class="diet-page">${urgent ? urgentBanner(urgent) : ''}${body}</div>`;
  }

  function library() {
    if (!catalog) return `${heading('食谱', '选一道，当作下一餐。')}<div class="diet-page">${catalogError ? `<div class="storage-error">${ctx.esc(catalogError)}</div>` : '<p class="empty-copy">正在准备食谱。</p>'}</div>`;
    return `${heading('食谱', '选一道，当作下一餐。')}<div class="diet-page"><div class="food-grid diet-library">${catalog.recipes.map(recipe => `<button class="recipe-tile diet-recipe" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}"><div class="recipe-type-art"><span>${mealNames[recipe.meal] || '家常'}</span></div><div class="recipe-tile-body"><h3>${ctx.esc(recipe.name)}</h3><p class="num">约 ${recipe.nutrition.kcal} 千卡</p>${recipe.blockedByHerbs ? '<span class="chip chip-quiet">先不主动推荐</span>' : ''}</div></button>`).join('')}</div></div>`;
  }

  function settings() {
    const settingsState = ctx.getState().dietSettings;
    const targets = settingsState.targets;
    const flags = settingsState.flags;
    return `${heading('我的', '目标和记录都在这台手机上。')}<div class="diet-page"><section class="diet-card"><h2>每日目标</h2><p class="small muted">按自己的习惯填。留空的项目不参与对比。</p><form id="target-form"><div class="target-grid"><label class="form-label">热量（千卡）<input name="kcal" inputmode="numeric" min="0" max="10000" value="${targets.kcal ?? ''}"></label><label class="form-label">蛋白质（克）<input name="protein" inputmode="numeric" min="0" max="500" value="${targets.protein ?? ''}"></label><label class="form-label">脂肪（克）<input name="fat" inputmode="numeric" min="0" max="500" value="${targets.fat ?? ''}"></label><label class="form-label">碳水（克）<input name="carb" inputmode="numeric" min="0" max="500" value="${targets.carb ?? ''}"></label></div><label class="check-line"><input type="checkbox" name="confirm" ${targets.confirmed ? 'checked' : ''}> 把这些数字当作我的每日目标</label><button class="primary-button" type="submit">保存目标</button></form></section><section class="diet-card"><h2>这些情况下，建议会更谨慎</h2><p class="small muted">勾选后，不会按吃得少来催你，也不会因为蛋白质不够就推荐高蛋白的菜。</p><form id="flags-form">${flagBox('pregnancy', '孕期或备孕', flags.pregnancy)}${flagBox('lactation', '哺乳', flags.lactation)}${flagBox('minor', '未成年', flags.minor)}${flagBox('kidney', '肾病', flags.kidney)}${flagBox('diabetes', '糖尿病', flags.diabetes)}${flagBox('hypertension', '高血压', flags.hypertension)}${flagBox('eatingDisorder', '吃饭让我很痛苦，或出现催吐、绝食', flags.eatingDisorder)}<label class="check-line"><input type="checkbox" name="confirm" ${settingsState.flagsConfirmed ? 'checked' : ''}> 按这些情况调整文字建议</label><button class="primary-button" type="submit">保存</button></form></section><section class="diet-card"><h2>隐私与说明</h2><p class="small muted">记录只留在这台手机上。热量是估算。</p><button class="text-button" data-action="privacy">查看隐私与说明</button></section><section class="diet-card"><h2>清除这台手机上的记录</h2><p class="small muted">饮食记录和每日目标会一起清掉，清掉后找不回来。</p><button class="outline-button" data-action="reset">清除记录</button></section></div>`;
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
        id: createId(), date: localDateString(), meal, inputType: file ? 'photo' : 'text',
        rawText: text, stub: result.stub === true, notice: result.notice || '', createdAt: new Date().toISOString(),
        items: result.items.map(item => ({ ...item, clientId: createId() })),
      };
      composeText = '';
      pendingFile = null;
      photoName = '';
      composeError = '';
    } catch (error) {
      composeError = friendlyMessage(error.message, '暂时无法识别，请稍后再试或改为打字记录');
      ctx.toast(composeError);
    } finally { busy = false; ctx.render(); }
  }

  function editor(current) {
    return `<section class="draft-editor" aria-label="核对这一餐"><div class="draft-head"><h2>核对这一餐</h2><p class="small muted">${ctx.esc(gentleNotice(current.notice))}</p></div>${current.items.map(item => itemCard(item)).join('')}<div class="button-row"><button class="primary-button" type="button" data-diet-action="save-draft">记下来</button><button class="outline-button" type="button" data-diet-action="discard">先不记</button></div></section>`;
  }

  function itemCard(item) {
    const nutrition = item.nutrition;
    const shown = displaySource(nutrition);
    const kcal = nutrition
      ? `<p class="food-kcal"><span class="num">${nutrition.kcal}</span><small>约千卡</small></p>`
      : '<p class="food-kcal food-kcal-soft"><span>暂时算不出来</span><small>可以改选，或先留着</small></p>';
    return `<article class="food-card">
      <header class="food-card-head"><div><h3>${ctx.esc(item.name || item.inputName)}</h3>${item.inputName && item.inputName !== item.name ? `<p class="small muted">识别为 ${ctx.esc(item.inputName)}</p>` : ''}</div>${kcal}</header>
      <div class="chip-row">${shown ? `<span class="chip">${shown.label}</span>` : '<span class="chip chip-soft">暂时算不出来</span>'}${item.portionLabel ? `<span class="chip chip-quiet">${ctx.esc(item.portionLabel)}</span>` : ''}</div>
      ${foodSelect(item)}
      <div class="portion-row" role="group" aria-label="修正分量">
        ${portionButton(item, 'small', '小')}${portionButton(item, 'medium', '中')}${portionButton(item, 'large', '大')}
        <label class="grams-field">克数<input data-diet-grams="${ctx.esc(item.clientId)}" type="number" min="1" max="5000" inputmode="numeric" value="${item.grams ?? ''}" aria-label="克数"></label>
      </div>
      ${nutrition ? `${macroPills(nutrition)}${shown.detail ? `<details class="source-fold"><summary>数据来源</summary><p>${ctx.esc(shown.label)}。${ctx.esc(shown.detail)}</p></details>` : `<details class="source-fold"><summary>数据来源</summary><p>${ctx.esc(shown.label)}</p></details>`}` : `<div class="unestimated-panel"><p>${unestimatedCopy(item.reason)}</p></div>`}
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
    const prompt = asking ? '请选择' : '先不算';
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
    draft = { ...meal, items: meal.items.map(item => ({ ...item, clientId: createId(), inputName: item.inputName || item.name })), notice: '正在修改已保存的一餐。', stub: meal.stub };
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
      report = { key, mode: 'error', adviceNote: friendlyMessage(error.message, '今天的合计暂时出不来，请稍后再试') };
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
      : (report.adviceNote ? `<p class="small muted">${ctx.esc(gentleNotice(report.adviceNote))}</p>` : '');
    return `<section class="dash" aria-label="今日热量">
      <div class="ring-wrap" role="img" aria-label="${ctx.esc(aria)}">${ringSvg(ratio, tone)}<div class="ring-center"><strong class="num">${center}</strong><span>${totals.counted ? '今日千卡' : '没有可计算的热量'}</span></div></div>
      <div class="dash-copy"><p class="eyebrow">今天大约</p>${gapCopy}${report.skipped?.length ? `<p class="small muted">还没算进去：${report.skipped.map(name => ctx.esc(name)).join('、')}。</p>` : ''}</div>
    </section>
    <section class="diet-card"><h2>三大营养素</h2>${macroBars(totals, target)}</section>
    <section class="diet-card advice-card"><h2>今天的建议</h2>${advice}</section>`;
  }

  function recommendBlock() {
    if (!recommendation) return '<section class="diet-card"><p class="composer-status">正在选下一餐。</p></section>';
    if (!recommendation.recipe) return `<section class="diet-card"><h2>下一餐</h2><p>${ctx.esc(gentleNotice(recommendation.reason || recommendation.reasonNote || '今天先从食谱里自己挑一道吧。'))}</p><button class="text-button diet-link" data-page="library">去看食谱 ${ctx.icon('arrow')}</button></section>`;
    const recipe = recommendation.recipe;
    const reason = recommendation.reasonKept && recommendation.reason
      ? `<p class="advice-line">${ctx.esc(recommendation.reason)}</p>`
      : (recommendation.reasonNote ? `<p class="small muted">${ctx.esc(gentleNotice(recommendation.reasonNote))}</p>` : '');
    return `<article class="recipe-feature"><div class="recipe-feature-art"><span>${mealNames[recipe.meal] || '家常'}</span></div><div class="recipe-feature-body"><p class="eyebrow">下一餐可以从这道开始</p><h2>${ctx.esc(recipe.name)}</h2><p class="food-kcal"><span class="num">${recipe.nutrition.kcal}</span><small>约千卡</small></p>${macroPills(recipe.nutrition)}${reason}<div class="button-row"><button class="primary-button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}">查看做法</button><button class="outline-button" data-diet-action="another">换一道</button></div></div></article>`;
  }

  function mealCard(meal) {
    const estimated = meal.items.filter(item => item.nutrition);
    const kcal = estimated.reduce((sum, item) => sum + item.nutrition.kcal, 0);
    return `<article class="saved-meal"><div class="section-mini"><span>${mealNames[meal.meal]} · <span class="num">${ctx.esc(meal.date)}</span></span><span class="meal-actions"><button class="text-button" data-diet-action="edit-meal" data-diet-id="${ctx.esc(meal.id)}">修改</button><button class="text-button" data-diet-action="delete-meal" data-diet-id="${ctx.esc(meal.id)}">删除</button></span></div><ul class="meal-lines">${meal.items.map(item => `<li><span>${ctx.esc(item.name)}</span><span class="num">${item.grams ?? '—'} 克</span><span class="num">${item.nutrition ? `约 ${item.nutrition.kcal} 千卡` : '暂时算不出来'}</span></li>`).join('')}</ul><p class="small muted">${estimated.length ? `这一餐大约 <span class="num">${kcal}</span> 千卡` : '这一餐还没有算出热量'}</p></article>`;
  }

  function openRecipe(id) {
    const recipe = catalog?.recipes.find(item => item.id === id) || recommendation?.recipe;
    if (!recipe || recipe.id !== id && recommendation?.recipe?.id !== id) return;
    const chosen = recipe.id === id ? recipe : recommendation.recipe;
    const note = visibleNote(chosen.note);
    ctx.openDetail(`<div class="detail-body"><span class="chip">食谱</span><h2>${ctx.esc(chosen.name)}</h2><p class="small muted">${mealNames[chosen.meal] || '家常'}</p><p class="food-kcal"><span class="num">${chosen.nutrition.kcal}</span><small>约千卡</small></p>${macroPills(chosen.nutrition)}<h3>原料和克数</h3><div class="ingredient-list">${chosen.ingredients.map(item => `<span>${ctx.esc(item.name)} <span class="num">${item.grams}</span> 克</span>`).join('')}</div><h3>做法</h3><ol class="step-list">${chosen.steps.map(step => `<li>${ctx.esc(step)}</li>`).join('')}</ol>${note ? `<p class="gentle-note">${ctx.esc(note)}</p>` : ''}${chosen.avoid?.includes('kidney_high_protein') ? '<p class="boundary-note">这道蛋白质比较高。有肾病情况时，不会因为蛋白质不够就推荐它。</p>' : ''}</div>`, '食谱');
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
export function friendlyMessage(message, fallback = '请稍后再试') {
  const text = String(message || '').trim();
  if (!text || /模型|密钥|API|DASHSCOPE|USDA|测试替身|未配置|大模型|千问|百炼|Demo|演示|示例/.test(text)) return fallback;
  return text;
}
function gentleNotice(notice) {
  return friendlyMessage(notice, '请核对食物和分量，再记下来。');
}
function displaySource(nutrition) {
  if (!nutrition) return null;
  if (nutrition.source === '薄荷健康') {
    const code = String(nutrition.sourceNote || '').match(/编码\s*(\S+)/);
    return { label: '薄荷健康', detail: code ? `食物编码 ${code[1]}` : '' };
  }
  const fdc = String(nutrition.sourceNote || '').match(/FDC\s*(\d+)/);
  return { label: '知养食物库', detail: fdc ? `参考编号 FDC ${fdc[1]}` : '' };
}
function visibleNote(note) {
  return String(note || '').split(/(?<=[。！？])/).map(part => part.trim()).filter(part => part && !/USDA|FDC|待审核|示例|Demo|大模型|API|密钥|测试/.test(part)).join('');
}
function urgentBanner(result) {
  return `<div class="urgent-help" role="alert"><strong>请立即寻求专业帮助</strong><p>${result.text}</p></div>`;
}
function unestimatedCopy(reason) {
  if (reason === 'too_vague') return '这个说法有点笼统。写成具体的菜，比如「米饭、青菜和鸡腿」，才能估算。';
  return '这道暂时算不出来。可以换成上面的食物，或先留着。不会随便填一个热量。';
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
