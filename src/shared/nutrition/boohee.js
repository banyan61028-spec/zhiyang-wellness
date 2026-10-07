import { normalizeFoodName } from './match.js';

export const BOOHEE_SOURCE_NAME = '薄荷健康';

export function booheeFoodId(code) {
  return `boohee:${code}`;
}

export function booheeCodeFromId(id) {
  const match = /^boohee:([A-Za-z0-9_-]{1,64})$/.exec(String(id || ''));
  return match ? match[1] : '';
}

export function isBrandedBooheeName(name) {
  return /\s/.test(String(name || '').trim());
}

export function scoreBooheeName(query, name) {
  const key = normalizeFoodName(query);
  const text = String(name || '').trim();
  const normalized = normalizeFoodName(text);
  if (!key || !normalized) return 0;
  const branded = isBrandedBooheeName(text);
  if (!branded && normalized === key) return 100;
  if (!branded && normalized.includes(key)) return 50;
  const parts = text.split(/\s+/).some(part => normalizeFoodName(part) === key);
  if (branded && (normalized.includes(key) || parts)) return 10;
  return 0;
}

export function foodFromBooheeRecord(record) {
  const code = String(record?.code || '').trim();
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(code)) return null;
  const name = String(record?.name || '').trim();
  if (!name) return null;
  const per100g = {
    kcal: readNutrient(record?.calories),
    protein: readNutrient(record?.protein),
    fat: readNutrient(record?.fat),
    carb: readNutrient(record?.carbohydrate),
  };
  if (Object.values(per100g).some(value => !Number.isFinite(value) || value < 0 || value > 1000)) return null;
  return {
    id: booheeFoodId(code),
    name: [...name].slice(0, 40).join(''),
    aliases: [],
    calculable: true,
    per100g,
    source: BOOHEE_SOURCE_NAME,
    sourceNote: `薄荷健康开放平台，食物编码 ${code}`,
    version: 'boohee',
    example: false,
    portion: { small: 100, medium: 150, large: 250 },
    booheeCode: code,
  };
}

export function rankBooheeFoods(query, records) {
  const ranked = (Array.isArray(records) ? records : [])
    .map(record => ({ record, food: foodFromBooheeRecord(record) }))
    .filter(item => item.food)
    .map(item => ({ ...item, score: scoreBooheeName(query, item.food.name), branded: isBrandedBooheeName(item.record.name) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || Number(a.branded) - Number(b.branded) || a.food.name.length - b.food.name.length);
  const exact = ranked.filter(item => item.score === 100);
  const candidates = (chosenCode) => ranked
    .filter(item => item.food.booheeCode !== chosenCode)
    .slice(0, 8)
    .map(item => ({ id: item.food.id, name: item.food.name, branded: item.branded }));
  if (exact.length === 1) return { status: 'matched', food: exact[0].food, candidates: candidates(exact[0].food.booheeCode) };
  if (!ranked.length) return { status: 'empty', candidates: [] };
  return { status: 'ambiguous', candidates: candidates('') };
}

function readNutrient(value) {
  if (value && typeof value === 'object') return Number(value.value);
  return Number(value);
}
