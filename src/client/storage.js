import { cleanProfile, emptyState, migrateLegacy, nextPlanRecord, validFavorite } from '../shared/records.js';
import { scoreAssessment, questionnaire } from '../shared/assessment.js';
import { cleanDietSettings, validateMeal } from '../shared/meals.js';
export const DB_NAME = 'zhiyang-local-v2';
const stores = ['profile', 'favorites', 'plans', 'assessments', 'drafts', 'meta', 'meals', 'dietSettings'];
export async function openStorage(factory = globalThis.indexedDB, legacy = globalThis.localStorage) {
  if (!factory) throw new Error('此浏览器无法使用本机存储');
  const db = await new Promise((resolve, reject) => {
    const req = factory.open(DB_NAME, 2);
    req.onupgradeneeded = () => { const db = req.result; for (const name of stores) if (!db.objectStoreNames.contains(name)) db.createObjectStore(name); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('请关闭其他旧版页面后重试'));
  });
  db.onversionchange = () => db.close();
  const transact = (names, work, mode = 'readwrite') => new Promise((resolve, reject) => {
    let result, failure;
    const tx = db.transaction(names, mode);
    const set = value => { result = value; };
    const abort = error => { failure = error; tx.abort(); };
    tx.oncomplete = () => resolve(result);
    tx.onabort = tx.onerror = () => reject(failure || tx.error || new Error('保存未完成'));
    try { work(tx, set, abort); } catch (error) { abort(error); }
  });
  // The migration marker and imported data commit atomically, including across tabs.
  try { await transact(stores, (tx, _set, abort) => {
    const meta = tx.objectStore('meta');
    const req = meta.get('legacy-v1');
    req.onsuccess = () => {
      if (req.result) return;
      let raw = null;
      try { raw = legacy?.getItem('zhiyang-demo-v1'); }
      catch { abort(new Error('旧版记录暂时无法读取，请检查浏览器存储设置后重试')); return; }
      const imported = migrateLegacy(raw);
      tx.objectStore('profile').put(imported.profile, 'current');
      imported.saved.forEach(key => tx.objectStore('favorites').put(key, key));
      imported.plans.forEach(plan => tx.objectStore('plans').put(plan, plan.id));
      meta.put(true, 'legacy-v1');
    };
  }); } catch (error) { db.close(); throw error; }
  return {
    close: () => db.close(),
    load: () => transact(stores, (tx, set) => {
      const state = emptyState(); set(state);
      for (const [store, field, key] of [['profile', 'profile', 'current'], ['favorites', 'saved'], ['plans', 'plans'], ['assessments', 'assessments'], ['drafts', 'draft', 'current'], ['meals', 'meals'], ['dietSettings', 'dietSettings', 'current']]) {
        const req = key ? tx.objectStore(store).get(key) : tx.objectStore(store).getAll();
        req.onsuccess = () => {
          if (req.result === undefined) return;
          if (field === 'profile') state.profile = cleanProfile(req.result);
          else if (field === 'dietSettings') { try { state.dietSettings = cleanDietSettings(req.result); } catch { /* Keep the empty confirmed-target default. */ } }
          else if (field === 'meals') state.meals = req.result.filter(meal => { try { validateMeal(meal); return true; } catch { return false; } });
          else state[field] = req.result;
        };
      }
    }, 'readonly'),
    profile: input => transact(['profile'], tx => tx.objectStore('profile').put(cleanProfile(input), 'current')),
    favorite: key => {
      if (!validFavorite(key)) return Promise.reject(new Error('收藏内容不存在'));
      return transact(['favorites'], tx => { const s = tx.objectStore('favorites'), req = s.get(key); req.onsuccess = () => req.result ? s.delete(key) : s.put(key, key); });
    },
    plan: draft => transact(['plans'], (tx, set, abort) => {
      const s = tx.objectStore('plans'), req = s.get(draft.id);
      req.onsuccess = () => { try { const record = nextPlanRecord(draft, req.result); s.put(record, record.id); set(record); } catch (error) { abort(error); } };
    }),
    removePlan: id => transact(['plans'], tx => tx.objectStore('plans').delete(id)),
    assessment: record => {
      const checked = { ...record, result: scoreAssessment(record.answers, record.questionnaireVersion, record.result.scoreVersion) };
      if (checked.result.status !== 'pilot_reference') return Promise.reject(new Error('答题尚未完成'));
      return transact(['assessments', 'drafts'], tx => { tx.objectStore('assessments').put(checked, checked.id); tx.objectStore('drafts').delete('current'); });
    },
    removeAssessment: id => transact(['assessments'], tx => tx.objectStore('assessments').delete(id)),
    draft: draft => {
      if (draft && draft.questionnaireVersion !== questionnaire.id) return Promise.reject(new Error('草稿版本不匹配'));
      return transact(['drafts'], tx => draft ? tx.objectStore('drafts').put(draft, 'current') : tx.objectStore('drafts').delete('current'));
    },
    saveMeal: meal => transact(['meals'], (tx, set, abort) => { try { const record = validateMeal(meal); tx.objectStore('meals').put(record, record.id); set(record); } catch (error) { abort(error); } }),
    removeMeal: id => transact(['meals'], tx => tx.objectStore('meals').delete(id)),
    dietSettings: input => transact(['dietSettings'], (tx, set, abort) => { try { const record = cleanDietSettings(input); tx.objectStore('dietSettings').put(record, 'current'); set(record); } catch (error) { abort(error); } }),
    clear: async () => {
      // Remove legacy first; never claim a full reset if this fails.
      legacy?.removeItem('zhiyang-demo-v1');
      await transact(stores, tx => { stores.forEach(name => tx.objectStore(name).clear()); tx.objectStore('meta').put(true, 'legacy-v1'); });
    },
  };
}
