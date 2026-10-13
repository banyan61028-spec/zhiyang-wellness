import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { calculateNutrition } from '../src/shared/nutrition/calculate.js';
import { previewPortion, rescaleMatchedNutrition } from '../src/client/diet-page.js';

const rice = {
  id: 'rice-cooked',
  name: '米饭',
  calculable: true,
  portion: { small: 100, medium: 150, large: 200 },
  per100g: { kcal: 130, protein: 2.7, fat: 0.3, carb: 28.2 },
  source: '知养食物库',
  sourceNote: '参考编号',
  version: 'example-2026-10-03',
};

function picked(nutrition) {
  return {
    kcal: nutrition.kcal,
    protein: nutrition.protein,
    fat: nutrition.fat,
    carb: nutrition.carb,
    grams: nutrition.grams,
    foodId: nutrition.foodId,
    source: nutrition.source,
    sourceNote: nutrition.sourceNote,
    version: nutrition.version,
  };
}

function matched(food, grams, portionLabel) {
  return {
    name: food.name,
    foodId: food.id,
    grams,
    portionLabel,
    nutrition: calculateNutrition(food, grams),
  };
}

test('small medium and large use the same rounding as the nutrition formula', () => {
  const item = matched(rice, 150, '中');
  const snapshot = structuredClone(item);
  for (const [size, label] of [['small', '小'], ['medium', '中'], ['large', '大']]) {
    const next = previewPortion(item, size, rice);
    assert.equal(next.portionLabel, label);
    assert.equal(next.grams, rice.portion[size]);
    assert.deepEqual(picked(next.nutrition), picked(calculateNutrition(rice, rice.portion[size])));
    for (const key of ['kcal', 'protein', 'fat', 'carb']) assert.equal(Number.isInteger(next.nutrition[key]), true);
  }
  assert.deepEqual(item, snapshot);
});

test('switching back and forth does not drift the macros', () => {
  let item = matched(rice, 150, '中');
  const original = picked(item.nutrition);
  for (const size of ['small', 'large', 'medium', 'large', 'small', 'medium']) {
    const next = previewPortion(item, size, rice);
    item = { ...item, grams: next.grams, portionLabel: next.portionLabel, nutrition: next.nutrition };
  }
  assert.equal(item.portionLabel, '中');
  assert.equal(item.grams, 150);
  assert.deepEqual(picked(item.nutrition), original);
});

test('a food outside the local catalog still scales from its saved per 100g', () => {
  const food = {
    id: 'boohee:liangpi',
    name: '凉皮卷',
    calculable: true,
    per100g: { kcal: 169, protein: 6.7, fat: 2.1, carb: 32.4 },
    source: '薄荷健康',
    sourceNote: '食物编码 123',
    version: 'boohee',
  };
  const item = matched(food, 150, '中');
  assert.equal(item.nutrition.protein, 10);
  assert.equal(item.nutrition.fat, 3);
  assert.equal(item.nutrition.carb, 49);
  const small = previewPortion(item, 'small', null);
  const large = previewPortion(item, 'large', null);
  assert.equal(small.grams, 100);
  assert.equal(large.grams, 250);
  assert.deepEqual(picked(small.nutrition), picked(calculateNutrition(food, 100)));
  assert.deepEqual(picked(large.nutrition), picked(calculateNutrition(food, 250)));
  assert.equal(rescaleMatchedNutrition(item, 0, null), null);
});

test('portion clicks update the card in place and do not replay the page entrance', async () => {
  const page = await readFile(new URL('../src/client/diet-page.js', import.meta.url), 'utf8');
  const app = await readFile(new URL('../src/client/app.js', import.meta.url), 'utf8');
  const portion = page.slice(page.indexOf('async function changePortion'), page.indexOf('async function changeGrams'));
  const paintAt = portion.indexOf('paintFoodCard(item)');
  const awaitAt = portion.indexOf('await recalculate');
  assert.ok(paintAt > 0 && awaitAt > paintAt);
  assert.equal(portion.includes('ctx.render'), false);
  assert.match(portion, /previewPortion/);
  assert.match(app, /const quiet=options\?\.quiet===true/);
  assert.match(app, /if\(!quiet\)\{void main\.offsetWidth;main\.classList\.add\('is-entering'\)\}/);
  const recalc = page.slice(page.indexOf('async function recalculate'), page.indexOf('function syncFoodCard'));
  assert.match(recalc, /ctx\.render\(\{ quiet: true \}\)/);
  assert.doesNotMatch(recalc, /syncFoodCard\(item, replace\)\) return;\s*ctx\.render\(\);/);
});
