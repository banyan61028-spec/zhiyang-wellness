// Calories stay the anchor. Default energy shares are protein 20%, fat 25%, carb 55%.
// Grams use 4 kcal/g for protein and carb, 9 kcal/g for fat, and stay within 2 kcal.
// A macro the person edits is fixed (up to two). One fixed macro leaves the other two
// to split the remaining calories by their last shares. Two fixed macros leave the
// third to the leftover calories. Changing calories keeps fixed grams when they fit.

export const KCAL_PER_GRAM = { protein: 4, carb: 4, fat: 9 };
export const DEFAULT_ENERGY_RATIOS = { protein: 20, fat: 25, carb: 55 };
export const KCAL_MAX = 10000;
export const GRAM_MAX = { protein: 2500, fat: 1200, carb: 2500 };
export const ENERGY_TOLERANCE = 2;

const MACRO_KEYS = ['protein', 'fat', 'carb'];

export function emptyTargets(confirmed = false) {
  return {
    kcal: null,
    protein: null,
    fat: null,
    carb: null,
    ratios: { protein: null, fat: null, carb: null },
    fixed: [],
    source: 'user',
    confirmed: confirmed === true,
  };
}

export function macroEnergy(grams = {}) {
  return MACRO_KEYS.reduce((sum, key) => sum + (Number(grams[key]) || 0) * KCAL_PER_GRAM[key], 0);
}

export function settleDailyTargets(targets = {}) {
  const confirmed = targets?.confirmed === true;
  const kcal = readCleanTarget(targets?.kcal, KCAL_MAX);
  const gramsInput = {
    protein: readCleanTarget(targets?.protein, GRAM_MAX.protein),
    fat: readCleanTarget(targets?.fat, GRAM_MAX.fat),
    carb: readCleanTarget(targets?.carb, GRAM_MAX.carb),
  };
  if (kcal == null) return emptyTargets(confirmed);
  const ratioInput = readRatioInput(targets?.ratios);
  const fixed = readFixedOrder(targets, gramsInput);
  const anyGram = MACRO_KEYS.some(key => gramsInput[key] != null);
  if (!anyGram) return pack(kcal, gramsFromRatios(kcal, ratioInput || DEFAULT_ENERGY_RATIOS), confirmed, fixed);
  if (ratioInput && MACRO_KEYS.every(key => gramsInput[key] != null)) {
    const allocated = gramsFromRatios(kcal, ratioInput);
    if (MACRO_KEYS.every(key => gramsInput[key] === allocated.grams[key])) return pack(kcal, allocated, confirmed, fixed);
  }
  const partial = MACRO_KEYS.some(key => gramsInput[key] == null);
  const settled = partial ? settlePartial(kcal, gramsInput) : settleComplete(kcal, gramsInput);
  return pack(kcal, settled, confirmed, fixed);
}

export function gramsFromRatios(kcal, ratios) {
  const normalized = normalizeRatios(ratios);
  const proteinEnergy = kcal * normalized.protein / 100;
  const fatEnergy = kcal * normalized.fat / 100;
  let protein = clamp(Math.round(proteinEnergy / KCAL_PER_GRAM.protein), 0, GRAM_MAX.protein);
  let fat = clamp(Math.round(fatEnergy / KCAL_PER_GRAM.fat), 0, GRAM_MAX.fat);
  while (protein * KCAL_PER_GRAM.protein + fat * KCAL_PER_GRAM.fat > kcal && (protein > 0 || fat > 0)) {
    const proteinOver = protein * KCAL_PER_GRAM.protein - proteinEnergy;
    const fatOver = fat * KCAL_PER_GRAM.fat - fatEnergy;
    if (fat > 0 && (protein === 0 || fatOver >= proteinOver)) fat -= 1;
    else protein -= 1;
  }
  const left = kcal - protein * KCAL_PER_GRAM.protein - fat * KCAL_PER_GRAM.fat;
  const carb = absorb(left, KCAL_PER_GRAM.carb, GRAM_MAX.carb);
  return { grams: { protein, fat, carb }, ratios: normalized };
}

export function ratiosFromGrams(grams = {}) {
  const parts = MACRO_KEYS.map(key => ({
    key,
    exact: Math.max(0, Number(grams[key]) || 0) * KCAL_PER_GRAM[key],
  }));
  const total = parts.reduce((sum, part) => sum + part.exact, 0);
  if (total <= 0) return { protein: 0, fat: 0, carb: 0 };
  return largestRemainderSum(parts.map(part => ({ key: part.key, exact: part.exact / total * 100 })), 100);
}

export function normalizeRatios(input) {
  if (!input) return { ...DEFAULT_ENERGY_RATIOS };
  const raw = {};
  for (const key of MACRO_KEYS) {
    const value = Number(input[key]);
    if (!Number.isFinite(value) || value < 0) return { ...DEFAULT_ENERGY_RATIOS };
    raw[key] = value;
  }
  const sum = MACRO_KEYS.reduce((total, key) => total + raw[key], 0);
  if (sum <= 0) return { ...DEFAULT_ENERGY_RATIOS };
  if (sum === 100 && MACRO_KEYS.every(key => Number.isInteger(raw[key]))) {
    return { protein: raw.protein, fat: raw.fat, carb: raw.carb };
  }
  return largestRemainderSum(MACRO_KEYS.map(key => ({ key, exact: raw[key] / sum * 100 })), 100);
}

export function allocateAfterRatioEdit(kcal, ratios, key, percent) {
  const nextValue = clamp(Math.round(Number(percent)), 0, 100);
  const others = MACRO_KEYS.filter(name => name !== key);
  const weights = otherWeights(ratios, others);
  const remain = 100 - nextValue;
  const rest = largestRemainderSum(others.map(name => ({ key: name, exact: remain * weights[name] })), remain);
  return gramsFromRatios(kcal, { ...rest, [key]: nextValue });
}

export function allocateAfterGramEdit(kcal, ratios, key, grams) {
  const per = KCAL_PER_GRAM[key];
  const locked = clamp(Math.round(Number(grams)), 0, Math.min(GRAM_MAX[key], Math.floor(kcal / per)));
  const remain = kcal - locked * per;
  const others = MACRO_KEYS.filter(name => name !== key);
  const weights = otherWeights(ratios, others);
  const ordered = ['fat', 'protein', 'carb'].filter(name => name !== key);
  const out = { protein: 0, fat: 0, carb: 0, [key]: locked };
  let left = remain;
  for (let index = 0; index < ordered.length; index += 1) {
    const name = ordered[index];
    const step = KCAL_PER_GRAM[name];
    if (index === ordered.length - 1) out[name] = absorb(left, step, GRAM_MAX[name]);
    else {
      let value = clamp(Math.round(remain * weights[name] / step), 0, GRAM_MAX[name]);
      while (value * step > left && value > 0) value -= 1;
      out[name] = value;
      left -= value * step;
    }
  }
  return { grams: out, ratios: ratiosFromGrams(out) };
}

export function allocateFixedMacros(kcal, ratios, locks = {}, order = [], preserveKey = null) {
  const fixed = normalizeOrder(order).filter(key => Number.isInteger(locks?.[key]));
  if (fixed.length === 0) return gramsFromRatios(kcal, ratios);
  if (fixed.length === 1) return allocateAfterGramEdit(kcal, ratios, fixed[0], locks[fixed[0]]);
  return allocateTwo(kcal, fixed.slice(0, 2), locks, preserveKey);
}

export function mergeTargetEdit(live = {}, snapshot, editedName) {
  if (!snapshot || !editedName) return live;
  if (editedName === 'kcal' || editedName === 'rebalance') return { ...snapshot, kcal: live.kcal };
  const fields = { ...snapshot, kcal: live.kcal };
  fields[editedName] = live[editedName];
  return fields;
}

export function previewMacroTargets(fields = {}, editedName, fixed = {}) {
  const kcal = parseIntField(fields.kcal);
  if (kcal == null || kcal > KCAL_MAX) return { ready: false };
  const ratios = fieldRatios(fields);
  const order = normalizeOrder(fixed.order);
  const locks = {};
  for (const key of order) {
    const value = Number(fixed.locks?.[key]);
    if (Number.isInteger(value) && value >= 0) locks[key] = value;
  }
  const macro = macroKeyFromField(editedName);
  if (editedName === 'rebalance') {
    return present(allocateFixedMacros(kcal, DEFAULT_ENERGY_RATIOS, locks, order), null, null);
  }
  if (macro) {
    const typed = parseIntField(fields[editedName]);
    if (typed == null) return { ready: true, skip: true };
    if (!order.includes(macro) && order.length >= 2) return { ready: true, skip: true };
    const nextOrder = order.includes(macro) ? order : [...order, macro];
    const ratioEdit = editedName.startsWith('ratio-');
    if (ratioEdit && nextOrder.length === 1) {
      return present(allocateAfterRatioEdit(kcal, ratios, macro, typed), editedName, typed);
    }
    const nextLocks = { ...locks };
    nextLocks[macro] = ratioEdit ? gramsFromShare(kcal, macro, typed) : typed;
    return present(allocateFixedMacros(kcal, ratios, nextLocks, nextOrder, macro), editedName, typed);
  }
  return present(allocateFixedMacros(kcal, ratios, locks, order), null, null);
}

function present(allocated, editedName, typed) {
  const inputs = {
    protein: String(allocated.grams.protein),
    fat: String(allocated.grams.fat),
    carb: String(allocated.grams.carb),
    'ratio-protein': String(allocated.ratios.protein),
    'ratio-fat': String(allocated.ratios.fat),
    'ratio-carb': String(allocated.ratios.carb),
  };
  const clamp = {};
  if (editedName && typed != null && inputs[editedName] !== String(typed)) clamp[editedName] = true;
  return { ready: true, inputs, clamp };
}

function allocateTwo(kcal, fixedKeys, locks, preserveKey) {
  const auto = MACRO_KEYS.find(key => !fixedKeys.includes(key));
  const grams = { protein: 0, fat: 0, carb: 0 };
  for (const key of fixedKeys) {
    const per = KCAL_PER_GRAM[key];
    grams[key] = clamp(Math.round(locks[key]), 0, Math.min(GRAM_MAX[key], Math.floor(kcal / per)));
  }
  let used = fixedKeys.reduce((sum, key) => sum + grams[key] * KCAL_PER_GRAM[key], 0);
  if (used > kcal) {
    const scaled = scaleFixed(kcal, fixedKeys, grams);
    for (const key of fixedKeys) grams[key] = scaled[key];
    used = fixedKeys.reduce((sum, key) => sum + grams[key] * KCAL_PER_GRAM[key], 0);
  }
  grams[auto] = absorb(Math.max(0, kcal - used), KCAL_PER_GRAM[auto], GRAM_MAX[auto]);
  tightenEnergy(kcal, grams, auto, fixedKeys, preserveKey);
  return { grams, ratios: ratiosFromGrams(grams) };
}

function scaleFixed(kcal, keys, grams) {
  const energy = keys.reduce((sum, key) => sum + grams[key] * KCAL_PER_GRAM[key], 0);
  const scale = energy > 0 ? kcal / energy : 0;
  const next = {};
  for (const key of keys) next[key] = Math.floor(grams[key] * scale);
  let left = kcal - keys.reduce((sum, key) => sum + next[key] * KCAL_PER_GRAM[key], 0);
  const ranked = [...keys].sort((a, b) => {
    const fracA = grams[a] * scale - next[a];
    const fracB = grams[b] * scale - next[b];
    return fracB - fracA || MACRO_KEYS.indexOf(a) - MACRO_KEYS.indexOf(b);
  });
  let progressed = true;
  while (left > 0 && progressed) {
    progressed = false;
    for (const key of ranked) {
      const step = KCAL_PER_GRAM[key];
      if (left >= step && next[key] < grams[key]) {
        next[key] += 1;
        left -= step;
        progressed = true;
      }
    }
  }
  return next;
}

function tightenEnergy(kcal, grams, auto, fixedKeys, preserveKey) {
  if (Math.abs(macroEnergy(grams) - kcal) <= ENERGY_TOLERANCE) return;
  const adjustable = [
    ...fixedKeys.filter(key => key !== preserveKey && KCAL_PER_GRAM[key] === 4),
    ...fixedKeys.filter(key => key === preserveKey && KCAL_PER_GRAM[key] === 4),
  ];
  for (const key of adjustable) {
    for (const delta of [-1, 1]) {
      const trial = { ...grams, [key]: grams[key] + delta };
      if (trial[key] < 0 || trial[key] > GRAM_MAX[key]) continue;
      const used = fixedKeys.reduce((sum, name) => sum + trial[name] * KCAL_PER_GRAM[name], 0);
      if (used > kcal) continue;
      trial[auto] = absorb(kcal - used, KCAL_PER_GRAM[auto], GRAM_MAX[auto]);
      if (Math.abs(macroEnergy(trial) - kcal) <= ENERGY_TOLERANCE) {
        Object.assign(grams, trial);
        return;
      }
    }
  }
}

function gramsFromShare(kcal, key, percent) {
  const share = clamp(Math.round(Number(percent)), 0, 100);
  const per = KCAL_PER_GRAM[key];
  let grams = clamp(Math.round(kcal * share / 100 / per), 0, GRAM_MAX[key]);
  const maxByKcal = Math.floor(kcal / per);
  if (grams > maxByKcal) grams = maxByKcal;
  return grams;
}

function macroKeyFromField(name) {
  if (name === 'protein' || name === 'fat' || name === 'carb') return name;
  if (typeof name === 'string' && name.startsWith('ratio-')) {
    const key = name.slice('ratio-'.length);
    if (MACRO_KEYS.includes(key)) return key;
  }
  return null;
}

function normalizeOrder(order) {
  const next = [];
  for (const key of Array.isArray(order) ? order : []) {
    if (!MACRO_KEYS.includes(key) || next.includes(key)) continue;
    next.push(key);
    if (next.length === 2) break;
  }
  return next;
}

function fieldRatios(fields) {
  const ratios = {};
  for (const key of MACRO_KEYS) {
    const parsed = parseIntField(fields[`ratio-${key}`]);
    if (parsed == null) return { ...DEFAULT_ENERGY_RATIOS };
    ratios[key] = parsed;
  }
  return ratios;
}

function settlePartial(kcal, gramsInput) {
  const provided = MACRO_KEYS.filter(key => gramsInput[key] != null);
  const missing = MACRO_KEYS.filter(key => gramsInput[key] == null);
  const grams = { protein: 0, fat: 0, carb: 0 };
  for (const key of provided) grams[key] = gramsInput[key];
  if (macroEnergy(grams) > kcal) return gramsFromRatios(kcal, ratiosFromGrams(grams));
  const remain = kcal - macroEnergy(grams);
  if (missing.length === 1) {
    const key = missing[0];
    grams[key] = absorb(remain, KCAL_PER_GRAM[key], GRAM_MAX[key]);
    return { grams, ratios: ratiosFromGrams(grams) };
  }
  const weights = otherWeights(DEFAULT_ENERGY_RATIOS, missing);
  const ordered = ['fat', 'protein', 'carb'].filter(key => missing.includes(key));
  let left = remain;
  for (let index = 0; index < ordered.length; index += 1) {
    const key = ordered[index];
    const step = KCAL_PER_GRAM[key];
    if (index === ordered.length - 1) grams[key] = absorb(left, step, GRAM_MAX[key]);
    else {
      let value = clamp(Math.round(remain * weights[key] / step), 0, GRAM_MAX[key]);
      while (value * step > left && value > 0) value -= 1;
      grams[key] = value;
      left -= value * step;
    }
  }
  return { grams, ratios: ratiosFromGrams(grams) };
}

function settleComplete(kcal, gramsInput) {
  const grams = { protein: gramsInput.protein, fat: gramsInput.fat, carb: gramsInput.carb };
  if (Math.abs(macroEnergy(grams) - kcal) <= ENERGY_TOLERANCE) return { grams, ratios: ratiosFromGrams(grams) };
  const ratios = ratiosFromGrams(grams);
  if (ratios.protein + ratios.fat + ratios.carb <= 0) return gramsFromRatios(kcal, DEFAULT_ENERGY_RATIOS);
  return gramsFromRatios(kcal, ratios);
}

function otherWeights(ratios, others) {
  const raw = {};
  let sum = 0;
  for (const name of others) {
    const value = Number(ratios?.[name]);
    raw[name] = Number.isFinite(value) && value > 0 ? value : 0;
    sum += raw[name];
  }
  if (sum <= 0) {
    const fallback = others.reduce((total, name) => total + DEFAULT_ENERGY_RATIOS[name], 0);
    return Object.fromEntries(others.map(name => [name, DEFAULT_ENERGY_RATIOS[name] / fallback]));
  }
  return Object.fromEntries(others.map(name => [name, raw[name] / sum]));
}

function largestRemainderSum(items, target) {
  const rows = items.map(item => {
    const base = Math.floor(item.exact + 1e-9);
    return { key: item.key, base, frac: item.exact - base };
  });
  let leftover = target - rows.reduce((sum, row) => sum + row.base, 0);
  const ranked = [...rows].sort((a, b) => b.frac - a.frac || MACRO_KEYS.indexOf(a.key) - MACRO_KEYS.indexOf(b.key));
  const bonus = new Set();
  for (const row of ranked) {
    if (leftover <= 0) break;
    bonus.add(row.key);
    leftover -= 1;
  }
  const out = {};
  for (const row of rows) out[row.key] = row.base + (bonus.has(row.key) ? 1 : 0);
  return out;
}

function absorb(energyLeft, perGram, max) {
  if (energyLeft <= 0 || perGram <= 0) return 0;
  const low = clamp(Math.floor(energyLeft / perGram), 0, max);
  const high = clamp(low + 1, 0, max);
  const lowErr = Math.abs(low * perGram - energyLeft);
  const highErr = Math.abs(high * perGram - energyLeft);
  return highErr < lowErr ? high : low;
}

function readCleanTarget(value, max) {
  if (value == null || value === '') return null;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > max) throw new Error('每日目标数字无效');
  return number;
}

function readFixedOrder(targets, grams) {
  if (!Array.isArray(targets?.fixed)) return [];
  const order = [];
  for (const key of targets.fixed) {
    if (typeof key !== 'string' || !MACRO_KEYS.includes(key) || order.includes(key)) continue;
    if (grams[key] == null) continue;
    order.push(key);
    if (order.length === 2) break;
  }
  return order;
}

function readRatioInput(ratios) {
  if (!ratios || typeof ratios !== 'object') return null;
  const out = {};
  for (const key of MACRO_KEYS) {
    const value = ratios[key];
    if (value == null || value === '') return null;
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0 || number > 100) return null;
    out[key] = Math.round(number);
  }
  if (out.protein + out.fat + out.carb <= 0) return null;
  return out;
}

function pack(kcal, allocated, confirmed, fixed = []) {
  return {
    kcal,
    protein: allocated.grams.protein,
    fat: allocated.grams.fat,
    carb: allocated.grams.carb,
    ratios: { ...allocated.ratios },
    fixed: normalizeOrder(fixed),
    source: 'user',
    confirmed,
  };
}

function parseIntField(value) {
  const text = String(value ?? '').trim();
  if (!/^\d+$/.test(text)) return null;
  const number = Number(text);
  if (!Number.isSafeInteger(number)) return null;
  return number;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
