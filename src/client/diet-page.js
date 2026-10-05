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
  let libraryFilter = 'all';

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
    const status = busy ? '正在看这一餐' : (photoName ? `已选 ${photoName}` : '');
    const side = todayMeals.length
      ? `<aside class="quiet-card today-side"><div class="quiet-copy"><h2>今天已经记下</h2><p>轻轻记一笔，养成更好的节奏。</p></div><div class="quiet-meals">${todayMeals.map(item => mealCard(item, true)).join('')}</div><button class="pill-link" data-page="today">看今天 ${ctx.icon('arrow')}</button></aside>`
      : `<aside class="quiet-card today-side is-empty"><div class="quiet-art" aria-hidden="true">${bowlArt()}</div><div class="quiet-copy"><h2>今天还没记</h2><p>轻轻记一笔，养成更好的节奏。</p></div><button class="pill-link" data-page="today">看今天 ${ctx.icon('arrow')}</button></aside>`;
    return `<div class="diet-page diet-record">${catalogError ? `<div class="storage-error" role="alert">${ctx.esc(catalogError)}</div>` : ''}${urgent ? urgentBanner(urgent) : ''}
      <section class="hero-card">
        <div class="hero-wash" aria-hidden="true"></div>
        <div class="hero-copy"><h1>记下这一餐</h1><p>拍一张，或写一句话</p></div>
        <form id="meal-form" class="composer ${busy ? 'is-busy' : ''}">
          <label class="meal-chip"><span class="sr-only">这一餐</span>
            <select name="meal" aria-label="这一餐">${mealOrder.map(key => `<option value="${key}" ${key === meal ? 'selected' : ''}>${mealNames[key]}</option>`).join('')}</select>
          </label>
          <div class="composer-box">
            <textarea name="text" maxlength="1500" rows="2" placeholder="记录食物、感受或拍照…" aria-label="写下吃了什么">${ctx.esc(composeText)}</textarea>
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
      </section>
      ${draft ? editor(draft) : ''}
      ${side}
    </div>`;
  }

  function today() {
    scheduleToday();
    const state = ctx.getState();
    const meals = mealsOn(state, localDateString());
    const body = meals.length
      ? `${reportBlock()}${mealStrip(meals)}${recommendBlock()}${adviceCard()}`
      : `<div class="empty-hero"><div class="quiet-art" aria-hidden="true">${bowlArt()}</div><div><h2>今天还没记</h2><p>轻轻记一笔，这里才会出现合计。</p><button class="primary-button" data-page="home">去记一餐</button></div></div>`;
    return `${heading('今日', '看看今天大约吃了多少。')}<div class="diet-page diet-today">${urgent ? urgentBanner(urgent) : ''}${body}</div>`;
  }

  function library() {
    if (!catalog) return `${heading('食谱', '按现在的记录，挑下一餐')}<div class="diet-page">${catalogError ? `<div class="storage-error">${ctx.esc(catalogError)}</div>` : '<p class="empty-copy">正在准备食谱。</p>'}</div>`;
    const filters = [['all', '全部'], ['light', '清淡'], ['home', '家常'], ['breakfast', '早餐'], ['lunch', '午餐'], ['dinner', '晚餐']];
    const list = catalog.recipes.filter(recipe => matchLibrary(recipe, libraryFilter));
    return `${heading('食谱', '按现在的记录，挑下一餐')}<div class="diet-page diet-library-page"><div class="filter-row" aria-label="食谱筛选">${filters.map(([id, label]) => `<button type="button" class="filter-chip ${libraryFilter === id ? 'active' : ''}" data-diet-action="library-filter" data-diet-filter="${id}" aria-pressed="${libraryFilter === id}">${label}</button>`).join('')}</div><div class="recipe-list">${list.length ? list.map(recipeRow).join('') : '<p class="empty-copy">这一类里还没有食谱。</p>'}</div><p class="library-foot">记下今日饮食，遇见更合适的食谱</p></div>`;
  }

  function settings() {
    const settingsState = ctx.getState().dietSettings;
    const targets = settingsState.targets;
    const flags = settingsState.flags;
    return `${heading('我的', '目标和记录都在这台手机上。')}<div class="diet-page diet-settings"><section class="diet-card"><h2>每日目标</h2><p class="small muted">按自己的习惯填。留空的项目不参与对比。</p><form id="target-form"><div class="target-grid"><label class="form-label">热量（千卡）<input name="kcal" inputmode="numeric" min="0" max="10000" value="${targets.kcal ?? ''}"></label><label class="form-label">蛋白质（克）<input name="protein" inputmode="numeric" min="0" max="500" value="${targets.protein ?? ''}"></label><label class="form-label">脂肪（克）<input name="fat" inputmode="numeric" min="0" max="500" value="${targets.fat ?? ''}"></label><label class="form-label">碳水（克）<input name="carb" inputmode="numeric" min="0" max="500" value="${targets.carb ?? ''}"></label></div><label class="check-line"><input type="checkbox" name="confirm" ${targets.confirmed ? 'checked' : ''}> 把这些数字当作我的每日目标</label><button class="primary-button" type="submit">保存目标</button></form></section><section class="diet-card"><h2>这些情况下，建议会更谨慎</h2><p class="small muted">勾选后，不会按吃得少来催你，也不会因为蛋白质不够就推荐高蛋白的菜。</p><form id="flags-form">${flagBox('pregnancy', '孕期或备孕', flags.pregnancy)}${flagBox('lactation', '哺乳', flags.lactation)}${flagBox('minor', '未成年', flags.minor)}${flagBox('kidney', '肾病', flags.kidney)}${flagBox('diabetes', '糖尿病', flags.diabetes)}${flagBox('hypertension', '高血压', flags.hypertension)}${flagBox('eatingDisorder', '吃饭让我很痛苦，或出现催吐、绝食', flags.eatingDisorder)}<label class="check-line"><input type="checkbox" name="confirm" ${settingsState.flagsConfirmed ? 'checked' : ''}> 按这些情况调整文字建议</label><button class="primary-button" type="submit">保存</button></form></section><section class="settings-list" aria-label="更多"><button class="settings-row" type="button" data-action="privacy"><span><strong>隐私与说明</strong><small>记录只留在这台手机上。热量是估算。</small></span>${ctx.icon('arrow')}</button><button class="settings-row" type="button" data-action="reset"><span><strong>清除这台手机上的记录</strong><small>饮食记录和每日目标会一起清掉。</small></span>${ctx.icon('arrow')}</button></section></div>`;
  }

  async function onClick(button) {
    const action = button.dataset.dietAction;
    if (!action) return false;
    if (action === 'portion') await changePortion(button.dataset.dietItem, button.dataset.dietSize);
    else if (action === 'save-draft') await saveDraft();
    else if (action === 'discard') { draft = null; urgent = null; ctx.render(); }
    else if (action === 'delete-meal') { await ctx.writeStore(storage => storage.removeMeal(button.dataset.dietId)); invalidateToday(); ctx.toast('已删除这一餐'); }
    else if (action === 'edit-meal') beginEdit(button.dataset.dietId);
    else if (action === 'library-filter') { libraryFilter = button.dataset.dietFilter || 'all'; ctx.render(); }
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
      ? '<p class="dash-gap">还没确认每日目标，这里只显示合计。</p>'
      : `<p class="dash-gap ${gap < 0 ? 'over' : ''}">目标 <span class="num">${target.kcal}</span> 千卡 · ${gap >= 0 ? `还差 <span class="num">${gap}</span> 千卡` : `多了 <span class="num">${Math.abs(gap)}</span> 千卡`}</p>`;
    const ringLabel = ratio == null
      ? `<strong class="ring-word">合计</strong><span>${totals.counted ? '未设目标' : '没有可计算的热量'}</span>`
      : `<span class="ring-kicker">今日进度</span><strong class="num">${Math.min(999, Math.round(ratio * 100))}%</strong><span>${ratio > 1 ? '超过目标' : '对照目标'}</span>`;
    return `<section class="dash" aria-label="今日热量">
      <div class="dash-main"><p class="eyebrow">今日摄入</p><p class="kcal-hero"><span class="num">${center}</span>${totals.counted ? '<small>千卡</small>' : ''}</p>${gapCopy}${report.skipped?.length ? `<p class="small muted">还没算进去：${report.skipped.map(name => ctx.esc(name)).join('、')}。</p>` : ''}</div>
      <div class="ring-wrap" role="img" aria-label="${ctx.esc(aria)}">${ringSvg(ratio, tone)}<div class="ring-center">${ringLabel}</div></div>
    </section>
    ${macroTiles(totals, target)}`;
  }

  function adviceCard() {
    if (!report || report.mode !== 'report') return '';
    const advice = report.adviceKept && report.advice
      ? `<p>${ctx.esc(report.advice)}</p>`
      : (report.adviceNote ? `<p class="small muted">${ctx.esc(gentleNotice(report.adviceNote))}</p>` : '');
    return advice ? `<section class="diet-card advice-card"><h2>今天的建议</h2>${advice}</section>` : '';
  }

  function recommendBlock() {
    if (!recommendation) return '<section class="diet-card next-wait"><p class="composer-status">正在选下一餐。</p></section>';
    if (!recommendation.recipe) return `<section class="diet-card next-wait"><h2>下一餐建议</h2><p>${ctx.esc(gentleNotice(recommendation.reason || recommendation.reasonNote || '今天先从食谱里自己挑一道吧。'))}</p><button class="pill-link" data-page="library">去看食谱 ${ctx.icon('arrow')}</button></section>`;
    const recipe = recommendation.recipe;
    const blurb = recommendation.reasonKept && recommendation.reason
      ? recommendation.reason
      : (recommendation.reasonNote ? gentleNotice(recommendation.reasonNote) : (visibleNote(recipe.note) || `${mealNames[recipe.meal] || '家常'} · 约 ${recipe.nutrition.kcal} 千卡`));
    return `<article class="next-meal"><div class="next-meal-copy"><p class="eyebrow">下一餐建议</p><h2>${ctx.esc(recipe.name)}</h2><p class="next-kcal"><span class="num">${recipe.nutrition.kcal}</span> 约千卡</p><p class="next-blurb">${ctx.esc(blurb)}</p><div class="next-actions"><button class="primary-button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}">查看这道 ${ctx.icon('arrow')}</button><button class="text-button" data-diet-action="another">换一道</button></div></div><div class="next-meal-art meal-${ctx.esc(recipe.meal)}" aria-hidden="true">${ctx.icon('bowl')}</div></article>`;
  }

  function mealStrip(meals) {
    return `<section class="diet-section meal-strip"><div class="section-row"><h2>餐次记录</h2></div><div class="meal-scroll">${meals.map(item => mealCard(item, true)).join('')}</div></section>`;
  }

  function mealCard(meal, compact = false) {
    const estimated = meal.items.filter(item => item.nutrition);
    const kcal = estimated.reduce((sum, item) => sum + item.nutrition.kcal, 0);
    const names = meal.items.map(item => item.name).filter(Boolean).join('、');
    if (compact) {
      return `<article class="meal-tile"><div class="meal-tile-top"><span class="meal-mark" aria-hidden="true"></span><div><p class="meal-kicker">${mealNames[meal.meal]}</p><p class="meal-kcal">${estimated.length ? `<span class="num">${kcal}</span> 千卡` : '暂时算不出来'}</p></div></div><p class="meal-names">${ctx.esc(names)}</p><span class="meal-actions"><button class="text-button" data-diet-action="edit-meal" data-diet-id="${ctx.esc(meal.id)}">修改</button><button class="text-button" data-diet-action="delete-meal" data-diet-id="${ctx.esc(meal.id)}">删除</button></span></article>`;
    }
    return `<article class="saved-meal"><div class="section-mini"><span>${mealNames[meal.meal]} · <span class="num">${ctx.esc(meal.date)}</span></span><span class="meal-actions"><button class="text-button" data-diet-action="edit-meal" data-diet-id="${ctx.esc(meal.id)}">修改</button><button class="text-button" data-diet-action="delete-meal" data-diet-id="${ctx.esc(meal.id)}">删除</button></span></div><ul class="meal-lines">${meal.items.map(item => `<li><span>${ctx.esc(item.name)}</span><span class="num">${item.grams ?? '—'} 克</span><span class="num">${item.nutrition ? `约 ${item.nutrition.kcal} 千卡` : '暂时算不出来'}</span></li>`).join('')}</ul><p class="small muted">${estimated.length ? `这一餐大约 <span class="num">${kcal}</span> 千卡` : '这一餐还没有算出热量'}</p></article>`;
  }

  function recipeRow(recipe) {
    const note = visibleNote(recipe.note);
    return `<button class="recipe-row" type="button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}"><span class="recipe-swatch meal-${ctx.esc(recipe.meal)}" aria-hidden="true">${ctx.icon('bowl')}</span><span class="recipe-row-body"><strong>${ctx.esc(recipe.name)}</strong><span class="recipe-facts"><span class="num">约 ${recipe.nutrition.kcal} 千卡</span><span>${mealNames[recipe.meal] || '家常'}</span>${recipe.blockedByHerbs ? '<span>先不主动推荐</span>' : ''}</span>${note ? `<span class="recipe-line">${ctx.esc(note)}</span>` : ''}</span><span class="recipe-chevron" aria-hidden="true">${ctx.icon('arrow')}</span></button>`;
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
  return `<header class="page-heading diet-heading"><div><h1>${title}</h1><p>${sub}</p></div></header>`;
}
function matchLibrary(recipe, filter) {
  if (!filter || filter === 'all') return true;
  if (filter === 'breakfast' || filter === 'lunch' || filter === 'dinner' || filter === 'snack') return recipe.meal === filter;
  const note = `${recipe.note || ''}`;
  if (filter === 'light') return note.includes('清淡');
  if (filter === 'home') return note.includes('家常');
  return true;
}
function bowlArt() {
  return '<svg viewBox="0 0 72 56" fill="none" aria-hidden="true"><ellipse cx="36" cy="44" rx="24" ry="7" fill="#E6D9C8"/><path d="M14 28h44c0 12-9 18-22 18S14 40 14 28z" fill="#FFFCF8" stroke="#C9B8A4" stroke-width="1.4"/><path d="M24 27c1.5-7 6-11 12-11s10.5 4 12 11" stroke="#7FA38E" stroke-width="1.5" stroke-linecap="round"/><path d="M30 18c2-4 5-6 8-6" stroke="#A8C5B5" stroke-width="1.4" stroke-linecap="round"/></svg>';
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
function macroTiles(totals, targets) {
  const rows = [
    ['蛋白质', 'protein', totals.protein, targets?.protein],
    ['碳水化合物', 'carb', totals.carb, targets?.carb],
    ['脂肪', 'fat', totals.fat, targets?.fat],
  ];
  return `<div class="macro-tiles">${rows.map(([label, kind, value, target]) => {
    const amount = Number(value) || 0;
    const hasTarget = target != null && Number(target) > 0;
    const note = hasTarget ? `目标 ${target} 克` : '未设目标';
    return `<article class="macro-tile"><span class="macro-ico ${kind}" aria-hidden="true">${macroGlyph(kind)}</span><p>${label}</p><strong class="num">${amount}<small>克</small></strong><p class="small">${note}</p></article>`;
  }).join('')}</div>`;
}
function macroGlyph(kind) {
  const open = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  if (kind === 'protein') return `${open}<path d="M19 4C11 4 6 8 6 14a5 5 0 0 0 5 5c7 0 11-5 8-15Z"/><path d="M9 19c2-5 5-8 10-10"/></svg>`;
  if (kind === 'carb') return `${open}<path d="M5 14c2-6 5-8 7-8s5 2 7 8"/><path d="M7 14h10c0 4-2.5 6-5 6s-5-2-5-6Z"/></svg>`;
  return `${open}<path d="M12 3.5c2.2 4 5 6.8 5 10.2a5 5 0 0 1-10 0c0-3.4 2.8-6.2 5-10.2Z"/></svg>`;
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
