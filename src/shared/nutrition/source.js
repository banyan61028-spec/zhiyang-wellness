import { checkHerbs } from '../../../rules/herbs.js';
import { sumIngredientNutrition } from './calculate.js';

export function createNutritionSource(catalog) {
  const foods = catalog.foods.map(food => ({ ...food, aliases: [...food.aliases], portion: { ...food.portion }, per100g: food.per100g ? { ...food.per100g } : null }));
  const byId = new Map(foods.map(food => [food.id, food]));
  const recipes = catalog.recipes.map(recipe => {
    const ingredientNames = recipe.ingredients.map(item => byId.get(item.foodId)?.name).filter(Boolean);
    const herbs = checkHerbs({ ingredients: ingredientNames });
    return {
      ...recipe,
      ingredients: recipe.ingredients.map(item => ({ ...item })),
      steps: [...recipe.steps],
      avoid: [...recipe.avoid],
      ingredientNames,
      nutrition: sumIngredientNutrition(recipe.ingredients, id => byId.get(id)),
      blockedByHerbs: herbs.status === 'blocked',
      herbConflicts: herbs.conflicts,
    };
  });
  return {
    version: catalog.version,
    foods,
    recipes,
    getFood: id => byId.get(id) || null,
    getRecipe: id => recipes.find(recipe => recipe.id === id) || null,
  };
}

export function publicCatalog(source) {
  return {
    version: source.version,
    foods: source.foods.map(food => ({
      id: food.id,
      name: food.name,
      aliases: food.aliases,
      calculable: food.calculable,
      per100g: food.per100g,
      source: food.source,
      sourceNote: food.sourceNote,
      version: food.version,
      portion: food.portion,
      example: food.example,
    })),
    recipes: source.recipes.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      meal: recipe.meal,
      ingredients: recipe.ingredients.map(item => ({
        foodId: item.foodId,
        name: source.getFood(item.foodId)?.name || item.foodId,
        grams: item.grams,
        source: source.getFood(item.foodId)?.source || '',
        sourceNote: source.getFood(item.foodId)?.sourceNote || '',
      })),
      steps: recipe.steps,
      note: recipe.note,
      avoid: recipe.avoid,
      sourceNote: recipe.sourceNote,
      example: recipe.example,
      nutrition: recipe.nutrition,
      blockedByHerbs: recipe.blockedByHerbs,
    })),
  };
}
