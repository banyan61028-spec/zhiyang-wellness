import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanDietSettings } from '../src/shared/meals.js';
import { programAdvice } from '../src/shared/nutrition/advice.js';
import {
  ENERGY_TOLERANCE,
  allocateAfterGramEdit,
  allocateAfterRatioEdit,
  macroEnergy,
  previewMacroTargets,
  settleDailyTargets,
} from '../src/shared/nutrition/targets.js';
import { dailyGoalsCard } from '../src/client/diet-page.js';

test('calorie target allocates default energy shares into grams', () => {
  const targets = settleDailyTargets({ kcal: 1800, confirmed: true });
  assert.deepEqual(targets, {
    kcal: 1800,
    protein: 90,
    fat: 50,
    carb: 247,
    ratios: { protein: 20, fat: 25, carb: 55 },
    source: 'user',
    confirmed: true,
  });
  assert.ok(Math.abs(macroEnergy(targets) - 1800) <= ENERGY_TOLERANCE);
  const higher = settleDailyTargets({ kcal: 2000, confirmed: true });
  assert.deepEqual(
    { protein: higher.protein, fat: higher.fat, carb: higher.carb, ratios: higher.ratios },
    { protein: 100, fat: 56, carb: 274, ratios: { protein: 20, fat: 25, carb: 55 } },
  );
  assert.equal(macroEnergy(higher), 2000);
});

test('ratio edits keep the calorie anchor and rescale the other shares', () => {
  const next = allocateAfterRatioEdit(2000, { protein: 20, fat: 25, carb: 55 }, 'protein', 30);
  assert.deepEqual(next.ratios, { protein: 30, fat: 22, carb: 48 });
  assert.deepEqual(next.grams, { protein: 150, fat: 49, carb: 240 });
  assert.ok(Math.abs(macroEnergy(next.grams) - 2000) <= ENERGY_TOLERANCE);
  const capped = allocateAfterRatioEdit(2000, next.ratios, 'fat', 140);
  assert.equal(capped.ratios.fat, 100);
  assert.equal(capped.ratios.protein + capped.ratios.carb, 0);
});

test('gram edits lock that macro and give the remaining calories to the others', () => {
  const next = allocateAfterGramEdit(2000, { protein: 20, fat: 25, carb: 55 }, 'protein', 120);
  assert.equal(next.grams.protein, 120);
  assert.deepEqual(next.grams, { protein: 120, fat: 53, carb: 261 });
  assert.deepEqual(next.ratios, { protein: 24, fat: 24, carb: 52 });
  assert.ok(Math.abs(macroEnergy(next.grams) - 2000) <= ENERGY_TOLERANCE);
  const capped = allocateAfterGramEdit(1800, { protein: 20, fat: 25, carb: 55 }, 'protein', 999);
  assert.equal(capped.grams.protein, 450);
  assert.equal(capped.grams.fat, 0);
  assert.equal(capped.grams.carb, 0);
  assert.equal(macroEnergy(capped.grams), 1800);
});

test('preview follows the field the person is editing', () => {
  const base = {
    kcal: '2000',
    protein: '100',
    fat: '56',
    carb: '274',
    'ratio-protein': '20',
    'ratio-fat': '25',
    'ratio-carb': '55',
  };
  const ratioEdit = previewMacroTargets({ ...base, 'ratio-protein': '30' }, 'ratio-protein');
  assert.equal(ratioEdit.inputs['ratio-protein'], '30');
  assert.equal(ratioEdit.inputs.protein, '150');
  assert.equal(ratioEdit.inputs.fat, '49');
  assert.equal(ratioEdit.inputs.carb, '240');
  const gramEdit = previewMacroTargets({ ...base, protein: '120' }, 'protein');
  assert.equal(gramEdit.inputs.protein, '120');
  assert.equal(gramEdit.inputs['ratio-protein'], '24');
  assert.deepEqual(gramEdit.clamp, {});
  const over = previewMacroTargets({ ...base, kcal: '1800', protein: '999' }, 'protein');
  assert.equal(over.inputs.protein, '450');
  assert.equal(over.clamp.protein, true);
  const cleared = previewMacroTargets({ ...base, protein: '' }, 'protein');
  assert.equal(cleared.ready, true);
  assert.equal(cleared.skip, true);
  assert.equal(previewMacroTargets({ ...base, kcal: '' }, 'kcal').ready, false);
  const moved = previewMacroTargets({ ...base, kcal: '1800' }, 'kcal');
  assert.equal(moved.inputs.protein, '90');
  assert.equal(moved.inputs['ratio-protein'], '20');
});

test('saved targets stay on the calorie anchor, including older partial goals', () => {
  const defaults = cleanDietSettings({ targets: { kcal: 1800, protein: null, fat: null, carb: null, confirmed: true } });
  assert.equal(defaults.targets.protein, 90);
  assert.equal(defaults.targets.fat, 50);
  assert.equal(defaults.targets.carb, 247);
  const partial = cleanDietSettings({ targets: { kcal: 1800, protein: 60, fat: null, carb: null, confirmed: true } });
  assert.equal(partial.targets.protein, 60);
  assert.equal(partial.targets.fat, 54);
  assert.equal(partial.targets.carb, 268);
  assert.ok(Math.abs(macroEnergy(partial.targets) - 1800) <= ENERGY_TOLERANCE);
  const skewed = cleanDietSettings({ targets: { kcal: 1800, protein: 200, fat: 10, carb: 10, confirmed: true } });
  assert.ok(Math.abs(macroEnergy(skewed.targets) - 1800) <= ENERGY_TOLERANCE);
  assert.ok(skewed.targets.protein > skewed.targets.fat);
  assert.ok(skewed.targets.protein > skewed.targets.carb);
  const dropped = cleanDietSettings({ targets: { protein: 90, fat: 50, carb: 200, confirmed: true } });
  assert.equal(dropped.targets.kcal, null);
  assert.equal(dropped.targets.protein, null);
  assert.equal(dropped.targets.fat, null);
  assert.equal(dropped.targets.carb, null);
  assert.throws(() => cleanDietSettings({ targets: { kcal: 10001, confirmed: true } }), /每日目标数字无效/);
  for (let kcal = 0; kcal <= 10000; kcal += 50) {
    const settled = settleDailyTargets({ kcal, confirmed: true });
    assert.equal(settled.ratios.protein + settled.ratios.fat + settled.ratios.carb, 100);
    assert.ok(Math.abs(macroEnergy(settled) - kcal) <= ENERGY_TOLERANCE, String(kcal));
  }
});

test('confirmed calorie targets are compared for every macro', () => {
  const targets = cleanDietSettings({ targets: { kcal: 1800, confirmed: true } }).targets;
  const advice = programAdvice({
    totals: { kcal: 520, protein: 20, fat: 18, carb: 60, counted: 2, skipped: 0 },
    targets,
    caution: {},
  });
  assert.match(advice, /1280 千卡，碳水大约还少 187 克/);
});

test('goals screen asks for calories first and shows the derived macros', () => {
  const empty = dailyGoalsCard({ kcal: null, protein: null, fat: null, carb: null, ratios: { protein: null, fat: null, carb: null }, confirmed: false });
  assert.match(empty, /先填每天想吃多少热量/);
  assert.match(empty, /data-macro-plan hidden/);
  assert.match(empty, /填好热量后，会显示蛋白质、脂肪和碳水各多少克/);
  assert.equal(empty.includes('留空的项目不参与对比'), false);
  const filled = dailyGoalsCard(settleDailyTargets({ kcal: 1800, confirmed: true }));
  assert.match(filled, /name="kcal"[^>]*value="1800"/);
  assert.match(filled, /name="ratio-protein"[^>]*value="20"/);
  assert.match(filled, /name="protein"[^>]*value="90"/);
  assert.match(filled, /name="fat"[^>]*value="50"/);
  assert.match(filled, /name="carb"[^>]*value="247"/);
  assert.equal(filled.includes('data-macro-plan hidden'), false);
  assert.match(filled, /data-macro-empty hidden/);
});
