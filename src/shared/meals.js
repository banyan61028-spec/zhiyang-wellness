export const defaultDietSettings = () => ({
  targets: { kcal: null, protein: null, fat: null, carb: null, source: 'user', confirmed: false },
  flags: { pregnancy: false, lactation: false, minor: false, kidney: false, diabetes: false, hypertension: false, eatingDisorder: false },
  flagsConfirmed: false,
});

const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);
const STATUSES = new Set(['matched', 'unestimated', 'ambiguous']);

export function cleanDietSettings(input = {}) {
  const base = defaultDietSettings();
  const targets = input.targets || {};
  const flags = input.flags || {};
  base.targets.confirmed = targets.confirmed === true;
  base.targets.source = 'user';
  for (const key of ['kcal', 'protein', 'fat', 'carb']) base.targets[key] = cleanTarget(targets[key], key === 'kcal' ? 10000 : 500);
  base.flagsConfirmed = input.flagsConfirmed === true;
  for (const key of Object.keys(base.flags)) base.flags[key] = flags[key] === true;
  if (!base.flagsConfirmed) {
    for (const key of Object.keys(base.flags)) base.flags[key] = false;
  }
  return base;
}

function cleanTarget(value, max) {
  if (value == null || value === '') return null;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > max) throw new Error('每日目标数字无效');
  return number;
}

export function validateMeal(meal) {
  if (!meal || typeof meal.id !== 'string' || !/^[\w-]{1,100}$/.test(meal.id)) throw new Error('这一餐的编号无效');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meal.date)) throw new Error('日期无效');
  if (!MEALS.has(meal.meal)) throw new Error('餐次无效');
  if (!['text', 'photo'].includes(meal.inputType)) throw new Error('记录方式无效');
  if (typeof meal.rawText !== 'string' || meal.rawText.length > 1500) throw new Error('原始文字过长');
  if (meal.inputType === 'photo' && meal.rawText.includes('data:image')) throw new Error('照片不保存在本机记录里');
  if (!Array.isArray(meal.items) || !meal.items.length || meal.items.length > 12) throw new Error('食物项无效');
  for (const item of meal.items) validateMealItem(item);
  return {
    id: meal.id,
    date: meal.date,
    meal: meal.meal,
    inputType: meal.inputType,
    rawText: meal.rawText,
    items: meal.items.map(item => ({ ...item, nutrition: item.nutrition ? { ...item.nutrition, per100g: item.nutrition.per100g ? { ...item.nutrition.per100g } : undefined } : null, candidates: item.candidates || [] })),
    createdAt: typeof meal.createdAt === 'string' ? meal.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stub: meal.stub === true,
  };
}

function validateMealItem(item) {
  if (!item || typeof item.name !== 'string' || !item.name.trim() || item.name.length > 40) throw new Error('食物名无效');
  if (!STATUSES.has(item.status)) throw new Error('食物状态无效');
  if (item.grams != null && (!Number.isFinite(item.grams) || item.grams <= 0 || item.grams > 5000)) throw new Error('克数无效');
  if (item.status === 'matched') {
    if (!item.foodId || !item.nutrition) throw new Error('已匹配的食物缺少计算结果');
    for (const key of ['kcal', 'protein', 'fat', 'carb']) if (!Number.isInteger(item.nutrition[key]) || item.nutrition[key] < 0) throw new Error('营养数字无效');
    if (!item.nutrition.source || !item.nutrition.sourceNote || !item.nutrition.version) throw new Error('营养数字缺少来源');
    if (item.nutrition.foodId !== item.foodId) throw new Error('营养来源和食物不一致');
  } else if (item.nutrition != null) throw new Error('无法估算的食物不能带热量');
}

export function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
