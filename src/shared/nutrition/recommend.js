export function chooseRecipes({ recipes, totals, targets, caution, excludeIds = [], limit = 3 }) {
  const excluded = new Set(excludeIds);
  let pool = recipes.filter(recipe => recipe?.nutrition && recipe.blockedByHerbs !== true && !excluded.has(recipe.id));
  if (caution?.kidney) pool = pool.filter(recipe => !recipe.avoid?.includes('kidney_high_protein'));
  const gentle = Boolean(caution?.eatingDisorder || caution?.pregnancy || caution?.lactation || caution?.minor || caution?.diabetes || caution?.hypertension);
  const useGap = !gentle && targets?.confirmed === true && Number.isFinite(Number(targets.kcal));
  return pool
    .map(recipe => ({ recipe, score: scoreRecipe(recipe, { useGap, totals, targets }) }))
    .sort((a, b) => b.score - a.score || a.recipe.id.localeCompare(b.recipe.id))
    .slice(0, limit)
    .map(item => item.recipe);
}

function scoreRecipe(recipe, { useGap, totals, targets }) {
  const kcal = recipe.nutrition.kcal;
  if (!useGap) return -Math.abs(kcal - 450) / 10;
  const remain = Math.round(Number(targets.kcal) - totals.kcal);
  let score = 0;
  if (remain <= 150) score -= kcal / 5;
  else {
    const targetMeal = Math.min(remain, 700);
    score -= Math.abs(kcal - targetMeal) / 8;
    if (kcal <= remain + 80) score += 20;
  }
  if (Number.isFinite(Number(targets.protein))) {
    const gap = Number(targets.protein) - totals.protein;
    if (gap > 10) score += recipe.nutrition.protein * 2;
  }
  return score;
}

export function programReason(recipe, { totals, targets, caution }) {
  if (!recipe) return '今天先从食谱里自己挑一道吧。';
  if (caution?.eatingDisorder || caution?.pregnancy || caution?.lactation || caution?.minor) {
    return `可以试试「${recipe.name}」。这是家常搭配，不是为了少吃。`;
  }
  if (caution?.kidney) return `可以试试「${recipe.name}」。没有特意选高蛋白的菜。肾病相关的吃法请以医嘱为准。`;
  if (caution?.diabetes || caution?.hypertension) return `可以试试「${recipe.name}」。这是家常搭配。`;
  if (!targets?.confirmed || targets.kcal == null) return `可以试试「${recipe.name}」。每日目标还没填，所以先按家常来选。`;
  const remain = Math.round(Number(targets.kcal) - totals.kcal);
  if (Number.isFinite(Number(targets.protein)) && Number(targets.protein) - totals.protein > 10 && !caution?.kidney) {
    const gap = Math.round(Number(targets.protein) - totals.protein);
    return `今天蛋白质大约还少 ${gap} 克，可以试试「${recipe.name}」。这道大约 ${recipe.nutrition.kcal} 千卡、蛋白质 ${recipe.nutrition.protein} 克。`;
  }
  if (remain > 0) return `距离你填的热量目标还少 ${remain} 千卡，可以试试「${recipe.name}」，大约 ${recipe.nutrition.kcal} 千卡。`;
  return `今天热量已经不低，可以试试分量更小的「${recipe.name}」，大约 ${recipe.nutrition.kcal} 千卡。`;
}
