import { defaultDietSettings } from './meals.js';
export const defaultProfile = { name: '体验用户', goal: '均衡饮食', habit: '自己做饭与外食都有', preference: '暂无偏好', updated: '' };
export const emptyState = () => ({ profile: { ...defaultProfile }, saved: [], plans: [], assessments: [], draft: null, meals: [], dietSettings: defaultDietSettings() });
export function cleanProfile(input = {}) {
  return Object.fromEntries(Object.entries(defaultProfile).map(([key, fallback]) => [key, typeof input[key] === 'string' ? input[key].slice(0, key === 'name' ? 20 : 80) : fallback]));
}
export const validFavorite = key => /^(recipe:(breakfast|lunch|dinner|tea|oats)|article:(season|balance))$/.test(key);
export function validatePlan(plan) {
  if (!plan || typeof plan.id !== 'string' || !plan.id || plan.id.length > 100 || !Number.isInteger(plan.revision) || plan.revision < 1 || typeof plan.title !== 'string' || plan.title.length > 150 || typeof plan.goal !== 'string' || typeof plan.note !== 'string' || !Array.isArray(plan.meals) || !plan.meals.length || plan.meals.length > 12 || plan.meals.some(m => !m || typeof m.label !== 'string' || typeof m.value !== 'string' || m.value.length > 500) || plan.provenance !== 'demo') throw new Error('方案数据不完整');
  return plan;
}
export function nextPlanRecord(draft, current) {
  validatePlan(draft);
  if (current ? current.revision !== draft.baseRevision : draft.baseRevision != null) throw new Error('方案已变更或被删除，请重新打开后调整');
  const now = new Date().toISOString();
  return { ...structuredClone(draft), baseRevision: undefined, revision: (current?.revision || 0) + 1, createdAt: current?.createdAt || now, updatedAt: now };
}
export function migrateLegacy(raw) {
  let old; try { old = JSON.parse(raw); } catch { return emptyState(); }
  const state = emptyState();
  if (!old || typeof old !== 'object') return state;
  state.profile = cleanProfile(old.profile);
  state.saved = Array.isArray(old.saved) ? [...new Set(old.saved.filter(validFavorite))] : [];
  for (const p of Array.isArray(old.plans) ? old.plans : []) {
    try { state.plans.push(validatePlan({ ...p, id: crypto.randomUUID(), revision: 1, provenance: 'demo', legacy: true, note: typeof p.note === 'string' ? p.note : '旧版演示方案' })); } catch { /* Invalid old records are not promoted. */ }
  }
  return state;
}
