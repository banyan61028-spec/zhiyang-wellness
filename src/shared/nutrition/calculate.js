const MAX_GRAMS = 5000;

export function roundNutrient(value) {
  return Math.round(value);
}

export function calculateNutrition(food, grams) {
  if (!food || food.calculable !== true || !food.per100g) return null;
  if (!food.source || !food.sourceNote || !food.version) return null;
  if (!Number.isFinite(grams) || grams <= 0 || grams > MAX_GRAMS) throw new Error('克数无效');
  const factor = grams / 100;
  const per = food.per100g;
  return {
    kcal: roundNutrient(per.kcal * factor),
    protein: roundNutrient(per.protein * factor),
    fat: roundNutrient(per.fat * factor),
    carb: roundNutrient(per.carb * factor),
    grams,
    per100g: { kcal: per.kcal, protein: per.protein, fat: per.fat, carb: per.carb },
    source: food.source,
    sourceNote: food.sourceNote,
    version: food.version,
    foodId: food.id,
    foodName: food.name,
  };
}

export function sumNutrition(items) {
  const list = Array.isArray(items) ? items : [];
  const total = { kcal: 0, protein: 0, fat: 0, carb: 0, counted: 0, skipped: 0 };
  for (const item of list) {
    if (!item?.nutrition) { total.skipped += 1; continue; }
    total.kcal += item.nutrition.kcal;
    total.protein += item.nutrition.protein;
    total.fat += item.nutrition.fat;
    total.carb += item.nutrition.carb;
    total.counted += 1;
  }
  return total;
}

export function sumIngredientNutrition(ingredients, getFood) {
  const items = ingredients.map(ingredient => {
    const food = getFood(ingredient.foodId);
    return { nutrition: calculateNutrition(food, ingredient.grams) };
  });
  if (items.some(item => !item.nutrition)) return null;
  return sumNutrition(items);
}
