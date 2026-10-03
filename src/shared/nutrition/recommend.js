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
  if (!recipe) return '食谱库里没有更合适的一道。可以从现有食谱里另选，这里不会新编一道菜。';
  if (caution?.eatingDisorder || caution?.pregnancy || caution?.lactation || caution?.minor) {
    return `从食谱库选了「${recipe.name}」，只作为家常搭配，不是按热量缺口安排的少吃方案。`;
  }
  if (caution?.kidney) return `从食谱库选了「${recipe.name}」。没有按蛋白质缺口挑高蛋白菜，肾病饮食请以医嘱为准。`;
  if (caution?.diabetes || caution?.hypertension) return `从食谱库选了「${recipe.name}」。这是家常搭配，不是治疗膳食。`;
  if (!targets?.confirmed || targets.kcal == null) return `从食谱库选了「${recipe.name}」。每日目标还没填写，所以没有按缺口筛选。`;
  const remain = Math.round(Number(targets.kcal) - totals.kcal);
  if (Number.isFinite(Number(targets.protein)) && Number(targets.protein) - totals.protein > 10 && !caution?.kidney) {
    const gap = Math.round(Number(targets.protein) - totals.protein);
    return `今天蛋白质大约还少 ${gap} 克，所以从食谱库选了「${recipe.name}」。这道菜大约 ${recipe.nutrition.kcal} 千卡、蛋白质 ${recipe.nutrition.protein} 克。`;
  }
  if (remain > 0) return `距离你填的热量目标还少 ${remain} 千卡，所以从食谱库选了「${recipe.name}」，这道菜大约 ${recipe.nutrition.kcal} 千卡。`;
  return `今天热量已经不低，所以从食谱库选了分量更小的「${recipe.name}」，大约 ${recipe.nutrition.kcal} 千卡。`;
}
