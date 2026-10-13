import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanDietSettings } from '../src/shared/meals.js';
import { programAdvice } from '../src/shared/nutrition/advice.js';
import {
  ENERGY_TOLERANCE,
  allocateAfterGramEdit,
  allocateAfterRatioEdit,
  allocateFixedMacros,
  macroEnergy,
  mergeTargetEdit,
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
    fixed: [],
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
  const snapshot = { ...base };
  const typed = previewMacroTargets(mergeTargetEdit({ ...base, protein: '120', 'ratio-fat': '23', 'ratio-carb': '53' }, snapshot, 'protein'), 'protein');
  assert.equal(typed.inputs.protein, '120');
  assert.equal(typed.inputs.fat, '53');
  assert.equal(typed.inputs.carb, '261');
  assert.equal(typed.inputs['ratio-fat'], '24');
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
  assert.match(empty, /改一项时，另外两项会自动配齐；改两项时，第三项按剩余热量自动算出/);
  assert.match(empty, /data-macro-plan hidden/);
  assert.match(empty, /填好热量后，会显示蛋白质、脂肪和碳水各多少克/);
  assert.equal(empty.includes('留空的项目不参与对比'), false);
  assert.equal(empty.includes('Demo'), false);
  const filled = dailyGoalsCard(settleDailyTargets({ kcal: 1800, confirmed: true }));
  assert.match(filled, /name="kcal"[^>]*value="1800"/);
  assert.match(filled, /name="ratio-protein"[^>]*value="20"/);
  assert.match(filled, /name="protein"[^>]*value="90"/);
  assert.match(filled, /name="fat"[^>]*value="50"/);
  assert.match(filled, /name="carb"[^>]*value="247"/);
  assert.equal(filled.includes('data-macro-plan hidden'), false);
  assert.match(filled, /data-macro-empty hidden/);
  assert.match(filled, /data-macro-set="protein" hidden/);
  const held = dailyGoalsCard({ ...settleDailyTargets({ kcal: 1800, protein: 120, fat: 40, carb: 240, fixed: ['protein', 'fat'], confirmed: true }), protein: 120, fat: 40, carb: 240 });
  assert.match(held, /data-fixed="protein,fat"/);
  assert.match(held, /data-lock-protein="120"/);
  assert.match(held, /data-lock-fat="40"/);
  assert.match(held, /data-macro-set="protein">已设定/);
  assert.match(held, /data-macro-set="carb" hidden/);
});

test('setting one macro fills the other two from their remaining share', () => {
  const next = previewMacroTargets(fieldsAt1800({ protein: '120' }), 'protein');
  assert.equal(next.inputs.protein, '120');
  assert.equal(next.inputs.fat, '46');
  assert.equal(next.inputs.carb, '226');
  assert.equal(next.inputs['ratio-protein'], '27');
  assert.ok(Math.abs(energyOf(next.inputs) - 1800) <= ENERGY_TOLERANCE);
  const byShare = previewMacroTargets(fieldsAt1800({ 'ratio-protein': '30' }), 'ratio-protein');
  assert.equal(byShare.inputs['ratio-protein'], '30');
  assert.equal(byShare.inputs.protein, '135');
  assert.equal(byShare.inputs.fat, '44');
  assert.equal(byShare.inputs.carb, '216');
  assert.ok(Math.abs(energyOf(byShare.inputs) - 1800) <= ENERGY_TOLERANCE);
});

test('setting two macros fills the third from leftover calories', () => {
  const proteinFixed = { order: ['protein'], locks: { protein: 120 } };
  const next = previewMacroTargets(fieldsAt1800({
    protein: '120',
    fat: '40',
    carb: '226',
    'ratio-protein': '27',
    'ratio-fat': '23',
    'ratio-carb': '50',
  }), 'fat', proteinFixed);
  assert.equal(next.inputs.protein, '120');
  assert.equal(next.inputs.fat, '40');
  assert.equal(next.inputs.carb, '240');
  assert.equal(next.inputs['ratio-protein'], '27');
  assert.equal(next.inputs['ratio-fat'], '20');
  assert.equal(next.inputs['ratio-carb'], '53');
  assert.ok(Math.abs(energyOf(next.inputs) - 1800) <= ENERGY_TOLERANCE);
  const blocked = previewMacroTargets(fieldsAt1800({ carb: '10' }), 'carb', {
    order: ['protein', 'fat'],
    locks: { protein: 120, fat: 40 },
  });
  assert.equal(blocked.skip, true);
  const direct = allocateFixedMacros(1800, { protein: 27, fat: 20, carb: 53 }, { protein: 120, fat: 40 }, ['protein', 'fat']);
  assert.deepEqual(direct.grams, { protein: 120, fat: 40, carb: 240 });
});

test('changing calories keeps two fixed macros and updates the third', () => {
  const fixed = { order: ['protein', 'fat'], locks: { protein: 120, fat: 40 } };
  const current = fieldsAt1800({
    protein: '120',
    fat: '40',
    carb: '240',
    'ratio-protein': '27',
    'ratio-fat': '20',
    'ratio-carb': '53',
  });
  const moved = previewMacroTargets({ ...current, kcal: '1600' }, 'kcal', fixed);
  assert.equal(moved.inputs.protein, '120');
  assert.equal(moved.inputs.fat, '40');
  assert.equal(moved.inputs.carb, '190');
  assert.equal(moved.inputs['ratio-protein'], '30');
  assert.ok(Math.abs(energyOf(moved.inputs) - 1600) <= ENERGY_TOLERANCE);
  const capped = previewMacroTargets({ ...current, kcal: '600' }, 'kcal', fixed);
  assert.equal(capped.inputs.protein, '87');
  assert.equal(capped.inputs.fat, '28');
  assert.equal(capped.inputs.carb, '0');
  assert.ok(Number(capped.inputs.protein) < 120);
  assert.ok(Number(capped.inputs.fat) < 40);
  assert.ok(Math.abs(energyOf(capped.inputs) - 600) <= ENERGY_TOLERANCE);
  const saved = settleDailyTargets({
    kcal: 1800,
    protein: 120,
    fat: 40,
    carb: 240,
    ratios: { protein: 27, fat: 20, carb: 53 },
    fixed: ['protein', 'fat', 'carb'],
    confirmed: true,
  });
  assert.deepEqual(saved.fixed, ['protein', 'fat']);
  assert.equal(saved.protein, 120);
  assert.equal(saved.fat, 40);
  assert.equal(saved.carb, 240);
});

test('clearing a set macro returns the open items to the default split', () => {
  const afterProtein = previewMacroTargets(fieldsAt1800({
    protein: '120',
    fat: '46',
    carb: '226',
    'ratio-protein': '27',
    'ratio-fat': '23',
    'ratio-carb': '50',
  }), 'rebalance', { order: [], locks: {} });
  assert.equal(afterProtein.inputs.protein, '90');
  assert.equal(afterProtein.inputs.fat, '50');
  assert.equal(afterProtein.inputs.carb, '247');
  const afterOneOfTwo = previewMacroTargets(fieldsAt1800({
    protein: '120',
    fat: '40',
    carb: '240',
    'ratio-protein': '27',
    'ratio-fat': '20',
    'ratio-carb': '53',
  }), 'rebalance', { order: ['fat'], locks: { fat: 40 } });
  assert.equal(afterOneOfTwo.inputs.fat, '40');
  assert.equal(afterOneOfTwo.inputs.protein, '96');
  assert.equal(afterOneOfTwo.inputs.carb, '264');
  assert.ok(Math.abs(energyOf(afterOneOfTwo.inputs) - 1800) <= ENERGY_TOLERANCE);
});

test('typing mid-field keeps the original shares instead of sibling updates', () => {
  const snapshot = fieldsAt1800();
  const fixed = { order: [], locks: {} };
  const afterOne = previewMacroTargets(mergeTargetEdit({ ...snapshot, protein: '1' }, snapshot, 'protein'), 'protein', fixed);
  const stable = previewMacroTargets(mergeTargetEdit({ ...snapshot, protein: '12' }, snapshot, 'protein'), 'protein', fixed);
  const fedBack = previewMacroTargets({
    ...snapshot,
    protein: '12',
    fat: afterOne.inputs.fat,
    carb: afterOne.inputs.carb,
    'ratio-protein': afterOne.inputs['ratio-protein'],
    'ratio-fat': afterOne.inputs['ratio-fat'],
    'ratio-carb': afterOne.inputs['ratio-carb'],
  }, 'protein', fixed);
  assert.equal(stable.inputs.protein, '12');
  assert.equal(stable.inputs.fat, '61');
  assert.equal(stable.inputs.carb, '301');
  assert.notEqual(fedBack.inputs.fat, stable.inputs.fat);
  const calorieSnapshot = {
    kcal: '2000',
    protein: '100',
    fat: '56',
    carb: '274',
    'ratio-protein': '20',
    'ratio-fat': '25',
    'ratio-carb': '55',
  };
  const calorieEdit = previewMacroTargets(
    mergeTargetEdit({ ...calorieSnapshot, kcal: '1800', 'ratio-protein': '50', 'ratio-fat': '25', 'ratio-carb': '25' }, calorieSnapshot, 'kcal'),
    'kcal',
  );
  assert.equal(calorieEdit.inputs.protein, '90');
  assert.equal(calorieEdit.inputs['ratio-protein'], '20');
  const second = previewMacroTargets(
    mergeTargetEdit({ ...snapshot, protein: '120', fat: '4', 'ratio-fat': '1' }, snapshot, 'fat'),
    'fat',
    { order: ['protein'], locks: { protein: 120 } },
  );
  assert.equal(second.inputs.protein, '120');
  assert.equal(second.inputs.fat, '4');
  const finished = previewMacroTargets(
    mergeTargetEdit({ ...snapshot, protein: '120', fat: '40', 'ratio-fat': '9' }, snapshot, 'fat'),
    'fat',
    { order: ['protein'], locks: { protein: 120 } },
  );
  assert.equal(finished.inputs.protein, '120');
  assert.equal(finished.inputs.fat, '40');
  assert.equal(finished.inputs.carb, '240');
  assert.notEqual(finished.inputs.carb, second.inputs.carb);
});

function fieldsAt1800(overrides = {}) {
  return {
    kcal: '1800',
    protein: '90',
    fat: '50',
    carb: '247',
    'ratio-protein': '20',
    'ratio-fat': '25',
    'ratio-carb': '55',
    ...overrides,
  };
}

function energyOf(inputs) {
  return macroEnergy({
    protein: Number(inputs.protein),
    fat: Number(inputs.fat),
    carb: Number(inputs.carb),
  });
}
