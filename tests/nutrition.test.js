import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { calculateNutrition, sumNutrition } from '../src/shared/nutrition/calculate.js';
import { matchFood, resolveMealItem } from '../src/shared/nutrition/match.js';
import { parseNutritionFiles } from '../src/shared/nutrition/parse.js';
import { createNutritionSource } from '../src/shared/nutrition/source.js';
import { chooseRecipes } from '../src/shared/nutrition/recommend.js';
import { numbersConflict, programAdvice, sanitizeAdvice, sanitizeReason } from '../src/shared/nutrition/advice.js';
import { buildRecommendation, buildReport, dispatchDiet } from '../src/server/diet.js';
import { stubParseText } from '../src/server/qwen.js';
import worker from '../src/server/index.js';

const config = JSON.parse(readFileSync('data/nutrition/config.json', 'utf8'));
const foodsCsv = readFileSync('data/nutrition/foods.csv', 'utf8');
const recipesCsv = readFileSync('data/nutrition/recipes.csv', 'utf8');
const parsed = parseNutritionFiles({ foodsCsv, recipesCsv, config });
const source = createNutritionSource(parsed.catalog);
const rice = source.getFood('rice-cooked');
const requestId = () => crypto.randomUUID();

test('example tables parse, keep sources, and do not invent recipe calories', () => {
  assert.deepEqual(parsed.errors, []);
  assert.ok(parsed.catalog.foods.length >= 30);
  assert.equal(source.recipes.length, 20);
  assert.equal(source.getRecipe('egg-rice'), null);
  assert.ok(source.recipes.every(recipe => recipe.example === true && recipe.sourceNote.includes('待审核')));
  assert.ok(parsed.catalog.foods.every(food => food.example === true && food.sourceNote));
  assert.ok(parsed.catalog.foods.filter(food => food.calculable).every(food => food.source && food.per100g));
  assert.ok(parsed.catalog.foods.filter(food => !food.calculable).every(food => food.per100g == null));
  for (const recipe of source.recipes) {
    const again = sumNutrition(recipe.ingredients.map(item => ({ nutrition: calculateNutrition(source.getFood(item.foodId), item.grams) })));
    assert.equal(recipe.nutrition.kcal, again.kcal);
    assert.equal(recipe.blockedByHerbs, false);
  }
});

test('calories follow per-100g times grams and round to integers', () => {
  assert.deepEqual(pick(calculateNutrition(rice, 100)), { kcal: 130, protein: 3, fat: 0, carb: 28 });
  assert.deepEqual(pick(calculateNutrition(rice, 150)), { kcal: 195, protein: 4, fat: 0, carb: 42 });
  assert.equal(calculateNutrition(rice, 150).source, rice.source);
  assert.throws(() => calculateNutrition(rice, 0), /克数无效/);
  assert.equal(calculateNutrition(source.getFood('beef-noodle'), 400), null);
});

test('unmatched, non-calculable and ambiguous foods never receive invented calories', () => {
  const unknown = resolveMealItem({ name: '火星烤串', grams: 200, kcal: 9999 }, source);
  assert.equal(unknown.status, 'unestimated');
  assert.equal(unknown.nutrition, null);
  const noodle = resolveMealItem({ name: '牛肉面', grams: 400, kcal: 880 }, source);
  assert.equal(noodle.status, 'unestimated');
  assert.equal(noodle.nutrition, null);
  const egg = resolveMealItem({ name: '蛋', grams: 50, kcal: 9999, portionLabel: '一个' }, source);
  assert.equal(egg.status, 'matched');
  assert.equal(egg.nutrition.kcal, 72);
  assert.notEqual(egg.nutrition.kcal, 9999);
  const ambiguous = createNutritionSource({
    version: 'fixture',
    portionDefaults: { small: 100, medium: 150, large: 250 },
    foods: [
      food('greens-a', '青菜甲', ['青菜'], 20),
      food('greens-b', '青菜乙', ['青菜'], 40),
    ],
    recipes: [],
  });
  const hit = matchFood('青菜', ambiguous);
  assert.equal(hit.status, 'ambiguous');
  assert.equal(resolveMealItem({ name: '青菜', grams: 100, kcal: 30 }, ambiguous).nutrition, null);
});

test('portion buttons change grams and the table recalculates', () => {
  const small = resolveMealItem({ name: '米饭', foodId: 'rice-cooked', grams: rice.portion.small, portionLabel: '小' }, source, { trustFoodId: true });
  const large = resolveMealItem({ name: '米饭', foodId: 'rice-cooked', grams: rice.portion.large, portionLabel: '大' }, source, { trustFoodId: true });
  assert.equal(small.grams, 100);
  assert.equal(large.grams, 200);
  assert.equal(large.nutrition.kcal, small.nutrition.kcal * 2);
});

test('text stub splits beef noodles and an egg without filling the unknown dish', () => {
  const items = stubParseText('中午一碗牛肉面加个蛋').map(item => resolveMealItem(item, source));
  assert.equal(items[0].name, '牛肉面');
  assert.equal(items[0].nutrition, null);
  assert.equal(items[1].foodId, 'egg-whole');
  assert.ok(items[1].nutrition.kcal > 0);
});

test('import script reports format errors and accepts the repo tables', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'zy-nutrition-'));
  const broken = 'id,name\n,缺表头\n';
  await writeFile(join(dir, 'foods.csv'), broken);
  await writeFile(join(dir, 'recipes.csv'), 'id,name\n');
  await writeFile(join(dir, 'config.json'), JSON.stringify(config));
  const failed = spawnSync(process.execPath, ['scripts/import-nutrition.mjs', dir], { encoding: 'utf8' });
  assert.notEqual(failed.status, 0);
  assert.match(failed.stderr, /foods.csv/);
  const ok = spawnSync(process.execPath, ['scripts/import-nutrition.mjs'], { encoding: 'utf8' });
  assert.equal(ok.status, 0, ok.stderr);
  const missing = parseNutritionFiles({
    foodsCsv: header() + 'rice,米饭,,130,2.7,0.3,28,来源,,v,true,true,100,150,200\n',
    recipesCsv: recipeHeader(),
    config,
  });
  assert.ok(missing.errors.some(error => error.includes('source_note')));
  const recipe = parseNutritionFiles({
    foodsCsv, recipesCsv: recipesCsv + 'bad-dish,坏菜,lunch,missing-food:10,煮熟。,说明,,示例,true\n', config,
  });
  assert.ok(recipe.errors.some(error => error.includes('missing-food')));
  await rm(dir, { recursive: true, force: true });
});

test('advice keeps only numbers from the calculation and recommendation stays inside the library', async () => {
  const totals = { kcal: 520, protein: 20, fat: 18, carb: 60, counted: 2, skipped: 1 };
  const targets = { kcal: 1800, protein: 60, fat: null, carb: null, source: 'user', confirmed: true };
  assert.equal(sanitizeAdvice('今天大约 9999 千卡。', [520, 1800]).kept, false);
  assert.equal(numbersConflict('今天大约 520 千卡。', [520]), false);
  const advice = programAdvice({ totals, targets, caution: {} });
  assert.equal(sanitizeAdvice(advice, [520, 20, 18, 60, 2, 1, 1800, 1280, 60, 40]).kept, true);
  assert.doesNotMatch(advice, /9999/);
  const meals = [{ items: [{ name: '米饭', foodId: 'rice-cooked', grams: 150, status: 'matched', portionLabel: '中' }] }];
  const kidney = await buildRecommendation({ requestId: requestId(), meals, targets: { ...targets, protein: 200 }, flags: { kidney: true }, flagsConfirmed: true, excludeIds: [] }, {}, source, requestId());
  assert.equal(kidney.recipe.avoid.includes('kidney_high_protein'), false);
  assert.ok(source.getRecipe(kidney.recipe.id));
  const blocked = createNutritionSource({
    version: 'fixture',
    foods: [food('licorice', '甘草', [], 0), food('seaweed', '海藻', [], 0)],
    recipes: [{ id: 'bad-soup', name: '禁忌汤', meal: 'any', ingredients: [{ foodId: 'licorice', grams: 10 }, { foodId: 'seaweed', grams: 10 }], steps: ['不要推荐'], note: '', avoid: [], sourceNote: '测试', example: true }],
  });
  assert.equal(blocked.getRecipe('bad-soup').blockedByHerbs, true);
  assert.deepEqual(chooseRecipes({ recipes: blocked.recipes, totals, targets, caution: {}, excludeIds: [] }), []);
  const dropped = sanitizeReason('换成番茄鸡蛋盖饭吧', source.getRecipe('millet-egg'), source.recipes, [1]);
  assert.equal(dropped.kept, false);
});

test('diet API urgent path has no meal, and a normal sentence can be logged', async () => {
  const urgent = await dispatchDiet('/api/diet/recognize', { requestId: requestId(), text: '我现在呼吸困难' }, {}, source);
  assert.equal(urgent.mode, 'urgent_help');
  assert.deepEqual(urgent.items, []);
  const call = body => worker.fetch(new Request('https://example.test/api/diet/recognize', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }));
  const response = await call({ requestId: requestId(), text: '中午一碗牛肉面加个蛋' });
  assert.equal(response.status, 200);
  const draft = await response.json();
  assert.equal(draft.stub, true);
  assert.equal(draft.items.find(item => item.name === '牛肉面').nutrition, null);
  assert.equal(draft.items.find(item => item.name === '牛肉面').reason, 'no_key');
  assert.equal(draft.items.find(item => item.foodId === 'egg-whole').nutrition.kcal, 72);
  const empty = await buildReport({ requestId: requestId(), meals: [] }, {}, source, requestId());
  assert.equal(empty.mode, 'empty');
  assert.equal(empty.advice, '');
});

function pick(nutrition) {
  return { kcal: nutrition.kcal, protein: nutrition.protein, fat: nutrition.fat, carb: nutrition.carb };
}
function food(id, name, aliases, kcal) {
  return { id, name, aliases, per100g: { kcal, protein: 1, fat: 0, carb: 1 }, source: '测试', sourceNote: '测试来源', version: 't', calculable: true, example: true, portion: { small: 80, medium: 100, large: 150 } };
}
function header() {
  return 'id,name,aliases,kcal_per_100g,protein_g_per_100g,fat_g_per_100g,carb_g_per_100g,source,source_note,version,calculable,example,portion_small_g,portion_medium_g,portion_large_g\n';
}
function recipeHeader() {
  return 'id,name,meal,ingredients,steps,note,avoid,source_note,example\n';
}
