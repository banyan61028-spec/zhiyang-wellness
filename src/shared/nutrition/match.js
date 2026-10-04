import { calculateNutrition } from './calculate.js';

const VAGUE_DISH_NAMES = new Set(['外卖套餐', '套餐', '外卖']);

export function normalizeFoodName(value) {
  return String(value ?? '').normalize('NFKC').trim().toLowerCase().replace(/\s+/g, '').replace(/[，。、,.!！?？·]/g, '');
}

export function isVagueDishName(name) {
  return VAGUE_DISH_NAMES.has(normalizeFoodName(name));
}

export function matchFood(name, source) {
  const key = normalizeFoodName(name);
  if (!key) return { status: 'unestimated', reason: 'empty', candidates: [] };
  const hits = source.foods.filter(food => normalizeFoodName(food.name) === key || food.aliases.some(alias => normalizeFoodName(alias) === key));
  if (hits.length === 0) return { status: 'unestimated', reason: 'no_match', candidates: [] };
  if (hits.length > 1) return { status: 'ambiguous', reason: 'ambiguous', candidates: hits.map(food => ({ id: food.id, name: food.name })) };
  const food = hits[0];
  if (food.calculable !== true) return { status: 'unestimated', reason: 'not_calculable', foodId: food.id, foodName: food.name, candidates: [] };
  return { status: 'matched', reason: 'matched', food, candidates: [] };
}

export function resolveMealItem(raw, source, { trustFoodId = false } = {}) {
  const inputName = String(raw?.name ?? raw?.inputName ?? '').trim().slice(0, 40);
  const portionLabel = String(raw?.portionLabel ?? '').trim().slice(0, 20);
  const parsedGrams = Number(raw?.grams);
  let grams = Number.isFinite(parsedGrams) ? Math.round(parsedGrams) : null;
  if (raw?.forceUnestimated) {
    if (grams == null || grams <= 0) grams = gramsFromPortion(portionLabel, { small: 100, medium: 150, large: 250 });
    return baseItem({ inputName, name: inputName || '未命名食物', portionLabel, grams, status: 'unestimated', reason: 'user', foodId: null });
  }
  const matched = trustFoodId && raw?.foodId ? matchById(raw.foodId, source) : matchFood(inputName, source);
  if (matched.status === 'matched') {
    if (grams == null || grams <= 0) grams = gramsFromPortion(portionLabel, matched.food.portion);
    let nutrition = null;
    try { nutrition = calculateNutrition(matched.food, grams); }
    catch { nutrition = null; }
    if (!nutrition) return baseItem({ inputName, name: inputName, portionLabel, grams, status: 'unestimated', reason: 'bad_grams' });
    return baseItem({ inputName, name: matched.food.name, portionLabel, grams, status: 'matched', reason: 'matched', foodId: matched.food.id, nutrition });
  }
  if (grams == null || grams <= 0) {
    const known = matched.foodId ? source.getFood(matched.foodId) : null;
    grams = gramsFromPortion(portionLabel, known?.portion || { small: 100, medium: 150, large: 250 });
  }
  if (matched.status === 'ambiguous') {
    return baseItem({ inputName, name: inputName, portionLabel, grams, status: 'ambiguous', reason: 'ambiguous', candidates: matched.candidates });
  }
  return baseItem({
    inputName, name: inputName, portionLabel, grams, status: 'unestimated', reason: matched.reason || 'no_match',
    foodId: matched.foodId || null,
  });
}

function gramsFromPortion(portionLabel, portion) {
  if (portionLabel === '小') return portion.small;
  if (portionLabel === '大') return portion.large;
  if (portionLabel === '一个') return portion.medium;
  return portion.medium;
}

function matchById(foodId, source) {
  const food = source.getFood(foodId);
  if (!food) return { status: 'unestimated', reason: 'no_match', candidates: [] };
  if (food.calculable !== true) return { status: 'unestimated', reason: 'not_calculable', foodId: food.id, foodName: food.name, candidates: [] };
  return { status: 'matched', reason: 'matched', food, candidates: [] };
}

function baseItem(fields) {
  return {
    inputName: fields.inputName,
    name: fields.name,
    portionLabel: fields.portionLabel,
    grams: fields.grams,
    status: fields.status,
    reason: fields.reason,
    foodId: fields.foodId || null,
    nutrition: fields.nutrition || null,
    candidates: fields.candidates || [],
    userAdjusted: false,
  };
}
