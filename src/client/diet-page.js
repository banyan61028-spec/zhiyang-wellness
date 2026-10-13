import { calculateItems, fetchCatalog, recognizeMeal, requestRecommendation, requestReport } from './diet-client.js';
import { clampPhotoPlace, gapShift, photoRejectCopy, photoStatus, photoTrayHtml, takePhotos } from './composer-photos.js';
import { createId } from '../shared/id.js';
import { localDateString, validateMeal } from '../shared/meals.js';
import { calculateNutrition } from '../shared/nutrition/calculate.js';
import { DEFAULT_ENERGY_RATIOS, GRAM_MAX, KCAL_MAX, mergeTargetEdit, previewMacroTargets } from '../shared/nutrition/targets.js';

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
  let pendingPhotos = [];
  let photoPlace = { x: 8, y: 8 };
  let photoDrag = null;
  let libraryFilter = 'all';
  let draftRevision = 0;

  document.addEventListener('input', event => {
    const el = event.target;
    if (el instanceof HTMLTextAreaElement && el.name === 'text' && el.closest('#meal-form')) composeText = el.value;
    if (el instanceof HTMLInputElement) onTargetInput(el);
  });
  document.addEventListener('focusin', event => {
    if (event.target instanceof HTMLInputElement) rememberTargetEdit(event.target);
  });
  document.addEventListener('focusout', event => {
    if (event.target instanceof HTMLInputElement) onTargetBlur(event.target);
  });

  document.addEventListener('change', event => {
    const el = event.target;
    if (!(el instanceof HTMLElement)) return;
    if (el.id === 'meal-photo') {
      const files = [...el.files || []];
      el.value = '';
      if (!files.length || busy) return;
      const before = pendingPhotos.length;
      const reason = rememberPhotos(files);
      if (reason) ctx.toast(photoRejectCopy(reason));
      if (pendingPhotos.length !== before) ctx.render();
      return;
    }
    if (el.name === 'meal' && el.closest('#meal-form')) { composeMeal = el.value; return; }
    if (el.dataset.dietFood != null) void changeFood(el.dataset.dietFood, el.value).catch(error => ctx.toast(friendlyMessage(error.message, '这次没有改成，请再试一次')));
    if (el.dataset.dietGrams != null) void changeGrams(el.dataset.dietGrams, el.value).catch(error => ctx.toast(friendlyMessage(error.message, '这次没有改成，请再试一次')));
  });

  document.addEventListener('pointerdown', event => {
    const chip = document.querySelector('.meal-chip.is-open');
    if (!chip || !(event.target instanceof Node) || chip.contains(event.target)) return;
    closeMealMenu();
  }, true);
  document.addEventListener('keydown', event => {
    const chip = document.querySelector('#meal-form .meal-chip');
    if (!chip) return;
    const open = chip.classList.contains('is-open');
    if (event.key === 'Escape' && open) { event.preventDefault(); closeMealMenu(true); return; }
    const options = [...chip.querySelectorAll('.meal-option')];
    if (!(document.activeElement instanceof Node) || !chip.contains(document.activeElement)) return;
    if (!open) {
      if (document.activeElement === chip.querySelector('.meal-chip-trigger') && event.key === 'ArrowDown') {
        event.preventDefault();
        setMealMenu(chip, true);
        chip.querySelector('.meal-option.is-selected')?.focus({ preventScroll: true });
      }
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || !options.length) return;
    event.preventDefault();
    let index = options.findIndex(option => option === document.activeElement);
    if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = options.length - 1;
    else if (index < 0) index = event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? options.length - 1 : Math.max(options.findIndex(option => option.classList.contains('is-selected')), 0);
    else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') index = (index + 1) % options.length;
    else index = (index <= 0 ? options.length : index) - 1;
    options[index].focus({ preventScroll: true });
  });
  document.addEventListener('pointerdown', onPhotoPointerDown, { passive: false });
  document.addEventListener('pointermove', onPhotoPointerMove, { passive: false });
  document.addEventListener('pointerup', finishPhotoDrag);
  document.addEventListener('pointercancel', finishPhotoDrag);
  document.addEventListener('dragover', onPhotoFileOver);
  document.addEventListener('drop', onPhotoFileDrop);

  async function loadCatalog() {
    try { catalog = await fetchCatalog(); catalogError = ''; }
    catch (error) { catalog = null; catalogError = friendlyMessage(error.message, '食谱暂时打不开，请稍后再试'); }
  }

  function record() {
    const state = ctx.getState();
    const todayMeals = mealsOn(state, localDateString());
    const meal = composeMeal || defaultMeal();
    const status = photoStatus(pendingPhotos.length, busy);
    const side = todayMeals.length
      ? `<aside class="quiet-card today-side"><div class="quiet-copy"><h2>今天已经记下</h2><p>轻轻记一笔，养成更好的节奏。</p></div><div class="quiet-meals">${todayMeals.map(item => mealCard(item, true)).join('')}</div><button class="pill-link" data-page="today">看今天 ${ctx.icon('arrow')}</button></aside>`
      : `<aside class="quiet-card today-side is-empty"><div class="quiet-art" aria-hidden="true">${bowlArt()}</div><div class="quiet-copy"><h2>今天还没记</h2><p>轻轻记一笔，养成更好的节奏。</p></div><button class="pill-link" data-page="today">看今天 ${ctx.icon('arrow')}</button></aside>`;
    return `<div class="diet-page diet-record">${catalogError ? `<div class="storage-error" role="alert">${ctx.esc(catalogError)}</div>` : ''}${urgent ? urgentBanner(urgent) : ''}
      <section class="hero-card">
        <div class="hero-wash" aria-hidden="true"></div>
        <div class="hero-copy"><h1>记下这一餐</h1><p>拍一张，或写一句话</p></div>
        <form id="meal-form" class="composer ${busy ? 'is-busy' : ''}" data-photo-count="${pendingPhotos.length}">
          ${mealPicker(meal)}
          <div class="composer-box${pendingPhotos.length ? ' has-photos' : ''}">
            ${photoTrayHtml(pendingPhotos, photoPlace, ctx.esc)}
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
          <p class="composer-status" role="status" data-photo-status>${ctx.esc(status)}</p>
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
    return `${heading('我的', '目标和记录都在这台手机上。')}<div class="diet-page diet-settings">${dailyGoalsCard(targets)}<section class="diet-card"><h2>这些情况下，建议会更谨慎</h2><p class="small muted">勾选后，不会按吃得少来催你，也不会因为蛋白质不够就推荐高蛋白的菜。</p><form id="flags-form">${flagBox('pregnancy', '孕期或备孕', flags.pregnancy)}${flagBox('lactation', '哺乳', flags.lactation)}${flagBox('minor', '未成年', flags.minor)}${flagBox('kidney', '肾病', flags.kidney)}${flagBox('diabetes', '糖尿病', flags.diabetes)}${flagBox('hypertension', '高血压', flags.hypertension)}${flagBox('eatingDisorder', '吃饭让我很痛苦，或出现催吐、绝食', flags.eatingDisorder)}<label class="check-line"><input type="checkbox" name="confirm" ${settingsState.flagsConfirmed ? 'checked' : ''}> 按这些情况调整文字建议</label><button class="primary-button" type="submit">保存</button></form></section><section class="settings-list" aria-label="更多"><button class="settings-row" type="button" data-action="privacy"><span><strong>隐私与说明</strong><small>记录只留在这台手机上。热量是估算。</small></span>${ctx.icon('arrow')}</button><button class="settings-row" type="button" data-action="reset"><span><strong>清除这台手机上的记录</strong><small>饮食记录和每日目标会一起清掉。</small></span>${ctx.icon('arrow')}</button></section></div>`;
  }

  async function onClick(button) {
    const action = button.dataset.dietAction;
    if (!action) return false;
    if (action === 'toggle-meal') { toggleMealMenu(button); }
    else if (action === 'pick-meal') pickMeal(button.dataset.meal);
    else if (action === 'portion') await changePortion(button.dataset.dietItem, button.dataset.dietSize);
    else if (action === 'save-draft') await saveDraft();
    else if (action === 'discard') { draft = null; urgent = null; ctx.render(); }
    else if (action === 'delete-meal') { await ctx.writeStore(storage => storage.removeMeal(button.dataset.dietId)); invalidateToday(); ctx.toast('已删除这一餐'); }
    else if (action === 'edit-meal') beginEdit(button.dataset.dietId);
    else if (action === 'remove-photo') removePhoto(button.dataset.photoId);
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
    const file = pendingPhotos[0]?.file || null;
    composeText = String(data.get('text') || '');
    composeMeal = meal;
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
        releasePhotos();
        return;
      }
      draft = {
        id: createId(), date: localDateString(), meal, inputType: file ? 'photo' : 'text',
        rawText: text, stub: result.stub === true, notice: result.notice || '', createdAt: new Date().toISOString(),
        items: result.items.map(item => ({ ...item, clientId: createId() })),
      };
      composeText = '';
      releasePhotos();
      composeError = '';
    } catch (error) {
      composeError = friendlyMessage(error.message, '暂时无法识别，请稍后再试或改为打字记录');
      ctx.toast(composeError);
    } finally { busy = false; ctx.render(); }
  }

  function rememberPhotos(files) {
    const { accepted, rejected } = takePhotos(pendingPhotos.length, files);
    for (const file of accepted) {
      pendingPhotos.push({ id: createId(), file, url: URL.createObjectURL(file), name: file.name || '照片' });
    }
    if (pendingPhotos.length !== 1) photoPlace = { x: 8, y: 8 };
    return rejected[0]?.reason || '';
  }

  function releasePhotos() {
    photoDrag = null;
    document.body.classList.remove('is-photo-drag');
    for (const photo of pendingPhotos) URL.revokeObjectURL(photo.url);
    pendingPhotos = [];
    photoPlace = { x: 8, y: 8 };
  }

  function removePhoto(id) {
    if (busy) return;
    const photo = pendingPhotos.find(item => item.id === id);
    if (!photo) return;
    if (photoDrag?.id === id) {
      photoDrag = null;
      document.body.classList.remove('is-photo-drag');
    }
    URL.revokeObjectURL(photo.url);
    pendingPhotos = pendingPhotos.filter(item => item.id !== id);
    if (pendingPhotos.length !== 1) photoPlace = { x: 8, y: 8 };
    ctx.render();
  }

  function photoById(id) {
    return [...document.querySelectorAll('#meal-form .composer-photo')].find(card => card.dataset.photoId === id) || null;
  }

  function onPhotoPointerDown(event) {
    if (photoDrag || busy) return;
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    if (!target || target.closest('.composer-photo-remove')) return;
    const card = target.closest('.composer-photo');
    const tray = card?.closest('#meal-form [data-photo-tray]');
    if (!card || !tray) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    photoDrag = {
      id: card.dataset.photoId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      single: tray.classList.contains('is-free'),
      moved: false,
      gap: null,
    };
    try { card.setPointerCapture(event.pointerId); } catch { /* pointer capture is optional */ }
  }

  function onPhotoPointerMove(event) {
    if (!photoDrag || event.pointerId !== photoDrag.pointerId) return;
    const drag = photoDrag;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved) {
      if (Math.hypot(dx, dy) < 6) return;
      const card = photoById(drag.id);
      const tray = document.querySelector('#meal-form [data-photo-tray]');
      if (!card || !tray) { photoDrag = null; return; }
      const rect = card.getBoundingClientRect();
      drag.moved = true;
      drag.originLeft = rect.left;
      drag.originTop = rect.top;
      drag.width = rect.width;
      drag.height = rect.height;
      if (!drag.single) {
        const gap = document.createElement('div');
        gap.className = 'composer-photo-gap';
        gap.style.width = `${rect.width}px`;
        gap.style.height = `${rect.height}px`;
        card.before(gap);
        drag.gap = gap;
      }
      card.classList.add('is-dragging');
      card.style.position = 'fixed';
      card.style.width = `${rect.width}px`;
      card.style.height = `${rect.height}px`;
      card.style.margin = '0';
      card.style.zIndex = '20';
      card.style.pointerEvents = 'none';
      document.body.classList.add('is-photo-drag');
    }
    const card = photoById(drag.id);
    if (!card) return;
    event.preventDefault();
    card.style.left = `${drag.originLeft + dx}px`;
    card.style.top = `${drag.originTop + dy}px`;
    if (drag.single || !drag.gap) return;
    const tray = card.closest('#meal-form')?.querySelector('[data-photo-tray]');
    if (tray) movePhotoGap(tray, card, drag.gap, drag.originLeft + dx + drag.width / 2);
  }

  function boxOf(el) {
    const rect = el.getBoundingClientRect();
    return { left: rect.left, width: rect.width };
  }

  function movePhotoGap(tray, card, gap, x) {
    for (let guard = 0; guard < 8; guard += 1) {
      const siblings = [...tray.children].filter(el => el !== card);
      const gapIndex = siblings.indexOf(gap);
      const beforeEl = siblings[gapIndex - 1];
      const afterEl = siblings[gapIndex + 1];
      const before = beforeEl?.classList.contains('composer-photo') ? boxOf(beforeEl) : null;
      const after = afterEl?.classList.contains('composer-photo') ? boxOf(afterEl) : null;
      const shift = gapShift(before, after, x);
      if (shift === 'after') afterEl.after(gap);
      else if (shift === 'before') beforeEl.before(gap);
      else break;
    }
  }

  function finishPhotoDrag(event) {
    if (!photoDrag || event.pointerId !== photoDrag.pointerId) return;
    const drag = photoDrag;
    photoDrag = null;
    document.body.classList.remove('is-photo-drag');
    const card = photoById(drag.id);
    const tray = document.querySelector('#meal-form [data-photo-tray]');
    if (card?.hasPointerCapture?.(drag.pointerId)) card.releasePointerCapture(drag.pointerId);
    if (!drag.moved) {
      card?.classList.remove('is-dragging');
      return;
    }
    const form = document.querySelector('#meal-form');
    const field = form?.querySelector('textarea');
    if (field) composeText = field.value;
    const meal = form?.querySelector('[name="meal"]');
    if (meal) composeMeal = meal.value;
    if (drag.single && card && tray) {
      const trayRect = tray.getBoundingClientRect();
      const left = Number.parseFloat(card.style.left);
      const top = Number.parseFloat(card.style.top);
      if (Number.isFinite(left) && Number.isFinite(top)) {
        photoPlace = clampPhotoPlace(left - trayRect.left, top - trayRect.top, {
          trayWidth: tray.clientWidth,
          trayHeight: tray.clientHeight,
          photoWidth: drag.width,
          photoHeight: drag.height,
        });
      }
    } else if (tray && drag.gap) {
      const order = [];
      for (const el of tray.children) {
        if (el.classList.contains('composer-photo-gap')) order.push(drag.id);
        else if (el.dataset.photoId && el.dataset.photoId !== drag.id) order.push(el.dataset.photoId);
      }
      const next = order.map(id => pendingPhotos.find(photo => photo.id === id)).filter(Boolean);
      if (next.length === pendingPhotos.length) pendingPhotos = next;
    }
    const stopClick = click => {
      click.preventDefault();
      click.stopPropagation();
      document.removeEventListener('click', stopClick, true);
    };
    document.addEventListener('click', stopClick, true);
    setTimeout(() => document.removeEventListener('click', stopClick, true), 250);
    ctx.render();
  }

  function onPhotoFileOver(event) {
    const form = event.target instanceof Element ? event.target.closest('#meal-form') : null;
    const types = [...event.dataTransfer?.types || []];
    if (!form || busy || !types.includes('Files')) {
      document.querySelector('#meal-form')?.classList.remove('is-file-drop');
      return;
    }
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
    form.classList.add('is-file-drop');
  }

  function onPhotoFileDrop(event) {
    const form = event.target instanceof Element ? event.target.closest('#meal-form') : null;
    document.querySelector('#meal-form')?.classList.remove('is-file-drop');
    if (!form) return;
    event.preventDefault();
    if (busy) return;
    const files = [...event.dataTransfer?.files || []];
    if (!files.length) return;
    const before = pendingPhotos.length;
    const reason = rememberPhotos(files);
    if (reason) ctx.toast(photoRejectCopy(reason));
    if (pendingPhotos.length !== before) ctx.render();
  }

  function editor(current) {
    return `<section class="draft-editor" aria-label="核对这一餐"><div class="draft-head"><h2>核对这一餐</h2><p class="small muted">${ctx.esc(gentleNotice(current.notice))}</p></div>${current.items.map(item => itemCard(item)).join('')}<div class="button-row"><button class="primary-button" type="button" data-diet-action="save-draft">记下来</button><button class="outline-button" type="button" data-diet-action="discard">先不记</button></div></section>`;
  }

  function itemCard(item) {
    const nutrition = item.nutrition;
    const shown = displaySource(nutrition);
    const kcal = nutrition
      ? `<p class="food-kcal" data-kcal><span class="num" data-kcal-value>${nutrition.kcal}</span><small>约千卡</small></p>`
      : '<p class="food-kcal food-kcal-soft" data-kcal><span>暂时算不出来</span><small>可以改选，或先留着</small></p>';
    return `<article class="food-card" data-diet-card="${ctx.esc(item.clientId)}">
      <header class="food-card-head"><div><h3>${ctx.esc(item.name || item.inputName)}</h3>${item.inputName && item.inputName !== item.name ? `<p class="small muted">识别为 ${ctx.esc(item.inputName)}</p>` : ''}</div>${kcal}</header>
      <div class="chip-row">${shown ? `<span class="chip">${shown.label}</span>` : '<span class="chip chip-soft">暂时算不出来</span>'}${item.portionLabel ? `<span class="chip chip-quiet" data-portion-label>${ctx.esc(item.portionLabel)}</span>` : ''}</div>
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
    const food = catalog?.foods.find(entry => entry.id === item.foodId) || null;
    const next = previewPortion(item, size, food);
    if (!next || (item.grams === next.grams && item.portionLabel === next.portionLabel)) return;
    draftRevision += 1;
    item.grams = next.grams;
    item.portionLabel = next.portionLabel;
    item.userAdjusted = true;
    if (next.nutrition) item.nutrition = next.nutrition;
    if (next.nutrition && paintFoodCard(item)) return;
    if (next.nutrition && replaceFoodCard(item)) return;
    paintFoodCard(item);
    await recalculate();
  }

  async function changeGrams(clientId, value) {
    const item = draft?.items.find(entry => entry.clientId === clientId);
    if (!item) return;
    const grams = Number(value);
    item.grams = grams;
    item.portionLabel = '自定义';
    item.userAdjusted = true;
    draftRevision += 1;
    const food = catalog?.foods.find(entry => entry.id === item.foodId) || null;
    const nutrition = rescaleMatchedNutrition(item, grams, food);
    if (nutrition) {
      item.nutrition = nutrition;
      if (paintFoodCard(item) || replaceFoodCard(item)) return;
    }
    await recalculate();
  }

  async function changeFood(clientId, foodId) {
    const item = draft?.items.find(entry => entry.clientId === clientId);
    if (!item) return;
    item.userAdjusted = true;
    if (!foodId) { item.foodId = null; item.forceUnestimated = true; item.status = 'unestimated'; }
    else { item.foodId = foodId; item.forceUnestimated = false; item.name = catalog?.foods.find(food => food.id === foodId)?.name || item.name; }
    await recalculate({ replace: true });
  }

  async function recalculate({ replace = false } = {}) {
    if (!draft) return;
    const revision = ++draftRevision;
    const result = await calculateItems({ items: draft.items.map(item => ({ name: item.inputName || item.name, inputName: item.inputName, foodId: item.forceUnestimated ? '' : item.foodId, grams: item.grams, portionLabel: item.portionLabel, forceUnestimated: item.forceUnestimated === true })) });
    if (revision !== draftRevision || !draft) return;
    if (result.mode === 'urgent_help') { urgent = result; draft = null; ctx.render(); return; }
    draft.items = draft.items.map((item, index) => {
      const next = result.items[index];
      return { ...item, ...next, candidates: next.candidates?.length ? next.candidates : item.candidates, clientId: item.clientId, userAdjusted: item.userAdjusted, forceUnestimated: item.forceUnestimated === true && !next.nutrition };
    });
    if (draft.items.every(item => syncFoodCard(item, replace))) return;
    ctx.render({ quiet: true });
  }

  function syncFoodCard(item, replace) {
    if (!replace && paintFoodCard(item)) return true;
    return replaceFoodCard(item);
  }

  function foodCardElement(clientId) {
    if (typeof clientId !== 'string' || !clientId) return null;
    const escaped = window.CSS?.escape ? CSS.escape(clientId) : clientId;
    return document.querySelector(`[data-diet-card="${escaped}"]`);
  }

  function paintFoodCard(item) {
    const card = foodCardElement(item.clientId);
    if (!card) return false;
    const activeSize = item.portionLabel === '小' ? 'small' : item.portionLabel === '大' ? 'large' : item.portionLabel === '中' ? 'medium' : '';
    card.querySelectorAll('[data-diet-action="portion"]').forEach(button => {
      const on = button.dataset.dietSize === activeSize;
      button.classList.toggle('active', on);
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const gramsInput = card.querySelector('[data-diet-grams]');
    if (gramsInput && document.activeElement !== gramsInput) gramsInput.value = item.grams ?? '';
    const portionChip = card.querySelector('[data-portion-label]');
    if (item.portionLabel && !portionChip) return false;
    if (portionChip) portionChip.textContent = item.portionLabel || '';
    const kcalValue = card.querySelector('[data-kcal-value]');
    if (Boolean(item.nutrition) !== Boolean(kcalValue)) return false;
    if (!item.nutrition) return true;
    kcalValue.textContent = String(item.nutrition.kcal);
    card.querySelector('[data-kcal]')?.classList.remove('food-kcal-soft');
    const share = macroShares(item.nutrition);
    for (const key of ['protein', 'fat', 'carb']) {
      const num = card.querySelector(`[data-macro="${key}"]`);
      const bar = card.querySelector(`[data-share="${key}"]`);
      if (!num || !bar) return false;
      num.textContent = String(item.nutrition[key]);
      bar.style.width = `${share[key].toFixed(1)}%`;
    }
    return true;
  }

  function replaceFoodCard(item) {
    const card = foodCardElement(item.clientId);
    if (!card) return false;
    const holder = document.createElement('template');
    holder.innerHTML = itemCard(item).trim();
    const next = holder.content.firstElementChild;
    if (!next) return false;
    card.replaceWith(next);
    return true;
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
    return `<article class="next-meal"><div class="next-meal-copy"><p class="eyebrow">下一餐建议</p><h2>${ctx.esc(recipe.name)}</h2><p class="next-kcal"><span class="num">${recipe.nutrition.kcal}</span> 约千卡</p><p class="next-blurb">${ctx.esc(blurb)}</p><div class="next-actions"><button class="primary-button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}">查看这道 ${ctx.icon('arrow')}</button><button class="text-button" data-diet-action="another">换一道</button></div></div>${recipePhoto(recipe, 'next')}</article>`;
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

  function recipePhoto(recipe, variant) {
    const src = `/recipes/${encodeURIComponent(recipe.id)}.jpg`;
    const frame = variant === 'cover' ? 'recipe-cover' : variant === 'next' ? 'next-meal-art' : 'recipe-swatch';
    const alt = variant === 'cover' ? ctx.esc(recipe.name) : '';
    return `<span class="${frame} recipe-photo meal-${ctx.esc(recipe.meal)}"><img src="${ctx.esc(src)}" alt="${alt}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('is-fallback')">${ctx.icon('bowl')}</span>`;
  }

  function recipeRow(recipe) {
    const note = visibleNote(recipe.note);
    return `<button class="recipe-row" type="button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}">${recipePhoto(recipe, 'row')}<span class="recipe-row-body"><strong>${ctx.esc(recipe.name)}</strong><span class="recipe-facts"><span class="num">约 ${recipe.nutrition.kcal} 千卡</span><span>${mealNames[recipe.meal] || '家常'}</span>${recipe.blockedByHerbs ? '<span>先不主动推荐</span>' : ''}</span>${note ? `<span class="recipe-line">${ctx.esc(note)}</span>` : ''}</span><span class="recipe-chevron" aria-hidden="true">${ctx.icon('arrow')}</span></button>`;
  }

  function openRecipe(id) {
    const recipe = catalog?.recipes.find(item => item.id === id) || recommendation?.recipe;
    if (!recipe || recipe.id !== id && recommendation?.recipe?.id !== id) return;
    const chosen = recipe.id === id ? recipe : recommendation.recipe;
    const note = visibleNote(chosen.note);
    ctx.openDetail(`${recipePhoto(chosen, 'cover')}<div class="detail-body"><span class="chip">食谱</span><h2>${ctx.esc(chosen.name)}</h2><p class="small muted">${mealNames[chosen.meal] || '家常'}</p><p class="food-kcal"><span class="num">${chosen.nutrition.kcal}</span><small>约千卡</small></p>${macroPills(chosen.nutrition)}<h3>原料和克数</h3><div class="ingredient-list">${chosen.ingredients.map(item => `<span>${ctx.esc(item.name)} <span class="num">${item.grams}</span> 克</span>`).join('')}</div><h3>做法</h3><ol class="step-list">${chosen.steps.map(step => `<li>${ctx.esc(step)}</li>`).join('')}</ol>${note ? `<p class="gentle-note">${ctx.esc(note)}</p>` : ''}${chosen.avoid?.includes('kidney_high_protein') ? '<p class="boundary-note">这道蛋白质比较高。有肾病情况时，不会因为蛋白质不够就推荐它。</p>' : ''}</div>`, '食谱');
  }

  async function saveTargets(form) {
    const data = new FormData(form);
    if (!data.get('confirm')) { ctx.toast('请先勾选确认，再保存目标'); return; }
    if (blank(data.get('kcal')) == null) { ctx.toast('先填写每天的热量'); return; }
    const current = ctx.getState().dietSettings;
    await ctx.writeStore(storage => storage.dietSettings({
      ...current,
      targets: {
        kcal: blank(data.get('kcal')),
        protein: blank(data.get('protein')),
        fat: blank(data.get('fat')),
        carb: blank(data.get('carb')),
        ratios: {
          protein: blank(data.get('ratio-protein')),
          fat: blank(data.get('ratio-fat')),
          carb: blank(data.get('ratio-carb')),
        },
        fixed: readFixed(form).order,
        source: 'user',
        confirmed: true,
      },
      flagsConfirmed: current.flagsConfirmed,
    }));
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
  function setMealMenu(chip, open) {
    chip.classList.toggle('is-open', open);
    const trigger = chip.querySelector('.meal-chip-trigger');
    const menu = chip.querySelector('.meal-menu');
    if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (menu) menu.hidden = !open;
  }
  function closeMealMenu(focusTrigger = false) {
    const chip = document.querySelector('.meal-chip.is-open');
    if (!chip) return;
    setMealMenu(chip, false);
    if (focusTrigger) chip.querySelector('.meal-chip-trigger')?.focus({ preventScroll: true });
  }
  function toggleMealMenu(button) {
    const chip = button.closest('.meal-chip');
    if (!chip) return;
    const open = !chip.classList.contains('is-open');
    setMealMenu(chip, open);
    if (open && !document.documentElement.classList.contains('using-pointer')) {
      chip.querySelector('.meal-option.is-selected')?.focus({ preventScroll: true });
    }
  }
  function pickMeal(value) {
    if (!mealNames[value]) return;
    composeMeal = value;
    const chip = document.querySelector('#meal-form .meal-chip');
    const field = chip?.querySelector('[name="meal"]');
    if (field) field.value = value;
    const label = chip?.querySelector('.meal-chip-label');
    if (label) label.textContent = mealNames[value];
    chip?.querySelectorAll('.meal-option').forEach(option => {
      const on = option.dataset.meal === value;
      option.classList.toggle('is-selected', on);
      option.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    closeMealMenu();
  }
  function cacheKey() {
    const state = ctx.getState();
    const meals = mealsOn(state, localDateString());
    return JSON.stringify({ meals: meals.map(meal => [meal.id, meal.updatedAt, meal.items.map(item => [item.foodId, item.grams, item.status])]), targets: state.dietSettings.targets, flags: state.dietSettings.flags, flagsConfirmed: state.dietSettings.flagsConfirmed });
  }

  return { loadCatalog, record, today, library, settings, onClick, onSubmit };
}

const PORTION_LABELS = { small: '小', medium: '中', large: '大' };
const PORTION_DEFAULTS = { small: 100, medium: 150, large: 250 };

export function previewPortion(item, size, food) {
  if (!PORTION_LABELS[size]) return null;
  const grams = portionGrams(size, food);
  return { grams, portionLabel: PORTION_LABELS[size], nutrition: rescaleMatchedNutrition(item, grams, food) };
}

export function rescaleMatchedNutrition(item, grams, food) {
  const basis = foodBasis(food) || storedBasis(item);
  if (!basis) return null;
  try { return calculateNutrition(basis, grams); }
  catch { return null; }
}

function portionGrams(size, food) {
  const fromFood = Number(food?.portion?.[size]);
  if (Number.isFinite(fromFood) && fromFood > 0) return fromFood;
  return PORTION_DEFAULTS[size];
}

function foodBasis(food) {
  if (!food?.calculable || !food.per100g || !food.source || !food.sourceNote || !food.version || !food.id) return null;
  return food;
}

function storedBasis(item) {
  const current = item?.nutrition;
  if (!current?.per100g || !current.source || !current.sourceNote || !current.version || !current.foodId) return null;
  return {
    calculable: true,
    id: current.foodId,
    name: current.foodName || item.name,
    per100g: current.per100g,
    source: current.source,
    sourceNote: current.sourceNote,
    version: current.version,
  };
}

function mealsOn(state, date) {
  return (state.meals || []).filter(meal => meal.date === date).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
function mealPicker(meal) {
  const current = mealNames[meal] ? meal : 'dinner';
  const options = mealOrder.map(key => {
    const on = key === current;
    return `<button type="button" class="meal-option${on ? ' is-selected' : ''}" role="option" data-diet-action="pick-meal" data-meal="${key}" aria-selected="${on ? 'true' : 'false'}">${mealNames[key]}</button>`;
  }).join('');
  return `<div class="meal-chip"><button type="button" class="meal-chip-trigger" data-diet-action="toggle-meal" aria-haspopup="listbox" aria-expanded="false" aria-controls="meal-menu"><span class="meal-chip-label">${mealNames[current]}</span><svg class="meal-chip-caret" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6.2 8 10l4-3.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button><input type="hidden" name="meal" value="${current}"><div id="meal-menu" class="meal-menu" role="listbox" aria-label="这一餐" hidden>${options}</div></div>`;
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
  const bit = (key, label) => `<span>${label} <b class="num" data-macro="${key}">${nutrition[key]}</b> 克</span>`;
  return `<div class="macro-stack" aria-hidden="true"><i class="protein" data-share="protein" style="width:${share.protein.toFixed(1)}%"></i><i class="fat" data-share="fat" style="width:${share.fat.toFixed(1)}%"></i><i class="carb" data-share="carb" style="width:${share.carb.toFixed(1)}%"></i></div><p class="macro-pills">${bit('protein', '蛋白质')}${bit('fat', '脂肪')}${bit('carb', '碳水')}</p>`;
}
function macroTiles(totals, targets) {
  const rows = [
    ['蛋白质', 'protein', totals.protein, targets?.protein],
    ['碳水化合物', 'carb', totals.carb, targets?.carb],
    ['脂肪', 'fat', totals.fat, targets?.fat],
  ];
  return `<div class="macro-tiles">${rows.map(([label, kind, value, target]) => {
    const amount = Number(value) || 0;
    const hasTarget = hasMacroTarget(target);
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
    const hasTarget = hasMacroTarget(target);
    const goal = Number(target);
    const ratio = !hasTarget ? amount / gramSum : goal > 0 ? amount / goal : (amount > 0 ? 1 : 0);
    const width = Math.max(0, Math.min(ratio, 1)) * 100;
    const over = hasTarget && (goal > 0 ? ratio > 1 : amount > 0);
    const note = hasTarget ? `目标 ${goal} 克` : '占三项合计';
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

const TARGET_FIELDS = new Set(['kcal', 'protein', 'fat', 'carb', 'ratio-protein', 'ratio-fat', 'ratio-carb']);

export function dailyGoalsCard(targets = {}) {
  const ratios = targets.ratios || {};
  const ready = Number.isInteger(targets.kcal);
  const fixed = fixedFromTargets(targets);
  const row = (label, key, gramMax) => `<div class="macro-plan-row"><span class="macro-plan-name">${label}<span class="macro-set" data-macro-set="${key}"${fixed.order.includes(key) ? '' : ' hidden'}>已设定</span></span><label class="macro-plan-field"><span class="sr-only">${label}能量占比</span><span class="macro-plan-input"><input ${targetInputAttrs(`ratio-${key}`, ratios[key], 100)}><span>%</span></span></label><label class="macro-plan-field"><span class="sr-only">${label}克数</span><span class="macro-plan-input"><input ${targetInputAttrs(key, targets[key], gramMax)}><span>克</span></span></label></div>`;
  return `<section class="diet-card"><h2>每日目标</h2><p class="small muted">先填每天想吃多少热量。蛋白质、脂肪和碳水会按这个热量算出来。</p><form id="target-form"${fixedFormAttrs(fixed)}><label class="form-label">每天热量（千卡）<input ${targetInputAttrs('kcal', targets.kcal, KCAL_MAX)}></label><div class="macro-plan" data-macro-plan ${ready ? '' : 'hidden'}><p class="small muted">${macroPlanNote()}</p><div class="macro-plan-head" aria-hidden="true"><span></span><span>能量占比</span><span>克数</span></div>${row('蛋白质', 'protein', GRAM_MAX.protein)}${row('脂肪', 'fat', GRAM_MAX.fat)}${row('碳水', 'carb', GRAM_MAX.carb)}</div><p class="small muted" data-macro-empty ${ready ? 'hidden' : ''}>填好热量后，会显示蛋白质、脂肪和碳水各多少克。</p><label class="check-line"><input type="checkbox" name="confirm" ${targets.confirmed ? 'checked' : ''}> 把这些数字当作我的每日目标</label><button class="primary-button" type="submit">保存目标</button></form></section>`;
}

function macroPlanNote() {
  const ratios = DEFAULT_ENERGY_RATIOS;
  return `改一项时，另外两项会自动配齐；改两项时，第三项按剩余热量自动算出。清空已设定的数字，可以重新分配。没改过的项目，一开始按蛋白质 ${ratios.protein}%、脂肪 ${ratios.fat}%、碳水 ${ratios.carb}% 来配。`;
}

function fixedFromTargets(targets) {
  const order = [];
  const locks = {};
  for (const key of Array.isArray(targets.fixed) ? targets.fixed : []) {
    if (!['protein', 'fat', 'carb'].includes(key) || order.includes(key) || !Number.isInteger(targets[key])) continue;
    order.push(key);
    locks[key] = targets[key];
    if (order.length === 2) break;
  }
  return { order, locks };
}

function fixedFormAttrs(fixed) {
  const locks = fixed.order.map(key => ` data-lock-${key}="${fixed.locks[key]}"`).join('');
  return ` data-fixed="${fixed.order.join(',')}"${locks}`;
}

function targetInputAttrs(name, value, max) {
  const shown = Number.isInteger(value) ? String(value) : '';
  const last = shown === '' ? '' : ` data-last="${shown}"`;
  return `name="${name}" inputmode="numeric" min="0" max="${max}" autocomplete="off" spellcheck="false" value="${shown}"${last}`;
}

function onTargetInput(el) {
  if (!TARGET_FIELDS.has(el.name) || !el.closest('#target-form')) return;
  if (!/^\d+$/.test(el.value)) {
    if (el.name === 'kcal') setMacroPlanReady(el.form, false);
    return;
  }
  applyMacroPreview(el.form, el.name, false);
}

function rememberTargetEdit(el) {
  if (!TARGET_FIELDS.has(el.name) || !el.closest('#target-form')) return;
  const form = el.form;
  if (!form || (form.dataset.editField === el.name && form.dataset.ratioSnapshot)) return;
  form.dataset.editField = el.name;
  form.dataset.ratioSnapshot = JSON.stringify(readTargetFields(form));
  form.dataset.fixedSnapshot = JSON.stringify(readFixed(form));
}

function onTargetBlur(el) {
  if (!TARGET_FIELDS.has(el.name) || !el.closest('#target-form')) return;
  const form = el.form;
  const macro = macroKeyFromField(el.name);
  const complete = /^\d+$/.test(el.value);
  if (!complete && el.name === 'kcal' && el.dataset.last != null) el.value = el.dataset.last;
  const starting = readSnapshotFixed(form) || readFixed(form);
  if (el.name === 'kcal') {
    applyMacroPreview(form, 'kcal', true, starting);
    if (/^\d+$/.test(form.elements.namedItem('kcal')?.value || '')) syncDisplayedLocks(form, starting);
  } else if (macro && !complete) {
    const next = removeMacro(starting, macro);
    const released = Array.isArray(starting.order) && starting.order.includes(macro);
    applyMacroPreview(form, released ? 'rebalance' : 'refill', true, next);
    syncDisplayedLocks(form, next);
  } else if (macro) {
    const next = addMacro(starting, macro);
    applyMacroPreview(form, next.order.includes(macro) ? el.name : 'refill', true, next);
    syncDisplayedLocks(form, next);
  }
  updateSetBadges(form);
  delete form.dataset.editField;
  delete form.dataset.ratioSnapshot;
  delete form.dataset.fixedSnapshot;
}

function applyMacroPreview(form, editedName, rewriteActive, fixedOverride) {
  if (!form) return;
  const packed = fieldsForPreview(form, editedName);
  const preview = previewMacroTargets(packed.fields, editedName, fixedOverride || packed.fixed);
  setMacroPlanReady(form, preview.ready);
  if (!preview.inputs) return;
  for (const [name, value] of Object.entries(preview.inputs)) {
    const input = form.elements.namedItem(name);
    if (!input) continue;
    const active = input === document.activeElement;
    if (active && !rewriteActive && !preview.clamp?.[name]) continue;
    input.value = value;
    input.dataset.last = value;
  }
}

function fieldsForPreview(form, editedName) {
  const live = readTargetFields(form);
  const fixed = readFixed(form);
  if (!form.dataset.ratioSnapshot) return { fields: live, fixed };
  try {
    return {
      fields: mergeTargetEdit(live, JSON.parse(form.dataset.ratioSnapshot), editedName),
      fixed: form.dataset.fixedSnapshot ? JSON.parse(form.dataset.fixedSnapshot) : fixed,
    };
  } catch {
    return { fields: live, fixed };
  }
}

function readSnapshotFixed(form) {
  if (!form?.dataset.fixedSnapshot) return null;
  try {
    const parsed = JSON.parse(form.dataset.fixedSnapshot);
    return parsed && Array.isArray(parsed.order) ? parsed : null;
  } catch {
    return null;
  }
}

function addMacro(fixed, macro) {
  const order = Array.isArray(fixed?.order) ? fixed.order.filter(key => key === 'protein' || key === 'fat' || key === 'carb') : [];
  const locks = { ...(fixed?.locks || {}) };
  if (order.includes(macro) || order.length >= 2) return { order: order.slice(0, 2), locks };
  return { order: [...order.slice(0, 2), macro], locks };
}

function removeMacro(fixed, macro) {
  const order = (fixed?.order || []).filter(key => key !== macro);
  const locks = { ...(fixed?.locks || {}) };
  delete locks[macro];
  return { order, locks };
}

function syncDisplayedLocks(form, fixed) {
  const locks = {};
  for (const key of fixed.order || []) {
    const value = form.elements.namedItem(key)?.value;
    if (/^\d+$/.test(value || '')) locks[key] = Number(value);
    else if (Number.isInteger(fixed.locks?.[key])) locks[key] = fixed.locks[key];
  }
  writeFixed(form, { order: fixed.order || [], locks });
}

function updateSetBadges(form) {
  const order = new Set(readFixed(form).order);
  for (const key of ['protein', 'fat', 'carb']) {
    const badge = form.querySelector(`[data-macro-set="${key}"]`);
    if (badge) badge.hidden = !order.has(key);
  }
}

const MACRO_FIELD_KEYS = ['protein', 'fat', 'carb'];

function macroKeyFromField(name) {
  if (MACRO_FIELD_KEYS.includes(name)) return name;
  if (typeof name === 'string' && name.startsWith('ratio-')) {
    const key = name.slice('ratio-'.length);
    if (MACRO_FIELD_KEYS.includes(key)) return key;
  }
  return null;
}

function lockDatasetName(key) {
  return `lock${key[0].toUpperCase()}${key.slice(1)}`;
}

function readFixed(form) {
  const order = [];
  const locks = {};
  for (const key of String(form?.dataset.fixed || '').split(',')) {
    const name = key.trim();
    if (!MACRO_FIELD_KEYS.includes(name) || order.includes(name) || order.length >= 2) continue;
    const raw = form.dataset[lockDatasetName(name)];
    if (!/^\d+$/.test(String(raw ?? ''))) continue;
    order.push(name);
    locks[name] = Number(raw);
  }
  return { order, locks };
}

function writeFixed(form, fixed) {
  const order = [];
  for (const key of fixed.order || []) {
    if (!MACRO_FIELD_KEYS.includes(key) || order.includes(key)) continue;
    order.push(key);
    if (order.length === 2) break;
  }
  form.dataset.fixed = order.join(',');
  for (const key of MACRO_FIELD_KEYS) {
    const name = lockDatasetName(key);
    if (order.includes(key) && Number.isInteger(fixed.locks?.[key])) form.dataset[name] = String(fixed.locks[key]);
    else delete form.dataset[name];
  }
}

function readTargetFields(form) {
  const value = name => form.elements.namedItem(name)?.value ?? '';
  return {
    kcal: value('kcal'),
    protein: value('protein'),
    fat: value('fat'),
    carb: value('carb'),
    'ratio-protein': value('ratio-protein'),
    'ratio-fat': value('ratio-fat'),
    'ratio-carb': value('ratio-carb'),
  };
}

function setMacroPlanReady(form, ready) {
  const plan = form?.querySelector('[data-macro-plan]');
  const empty = form?.querySelector('[data-macro-empty]');
  if (plan) plan.hidden = !ready;
  if (empty) empty.hidden = ready;
}

function hasMacroTarget(target) {
  return target != null && target !== '' && Number.isFinite(Number(target));
}
