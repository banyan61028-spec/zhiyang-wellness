import test from 'node:test';
import assert from 'node:assert/strict';
import { foodFromBooheeRecord, rankBooheeFoods } from '../src/shared/nutrition/boohee.js';
import { createBooheeClient } from '../src/server/boohee.js';
import { buildReport, calculateItems, dispatchDiet, loadNutrition } from '../src/server/diet.js';
import worker from '../src/server/index.js';

const source = loadNutrition().source;
const fanqie = [
  { code: 'fanqiechaodan', name: '番茄炒蛋', calories: 84, protein: 4.7, fat: 5.96, carbohydrate: 3.52 },
  { code: 'fd17c8ad', name: '番茄炒蛋(辅食)', calories: 116, protein: 6.67, fat: 8.91, carbohydrate: 2.75 },
  { code: 'fd0f25d2', name: '罗森 番茄炒蛋', calories: 159, protein: 4, fat: 13.9, carbohydrate: 4.9 },
  { code: 'fd3b3220', name: '会有 番茄炒蛋炸鸡饭', calories: 161, protein: 7.7, fat: 2.8, carbohydrate: 25.8 },
];

test('boohee ranking prefers a generic exact dish and keeps branded foods as candidates', () => {
  const ranked = rankBooheeFoods('番茄炒蛋', fanqie);
  assert.equal(ranked.status, 'matched');
  assert.equal(ranked.food.id, 'boohee:fanqiechaodan');
  assert.equal(ranked.food.source, '薄荷健康');
  assert.match(ranked.food.sourceNote, /fanqiechaodan/);
  assert.equal(ranked.candidates.some(item => item.id === 'boohee:fd0f25d2' && item.branded === true), true);
  assert.equal(ranked.candidates[0].branded, false);
  const brandedOnly = rankBooheeFoods('番茄炒蛋', [fanqie[2]]);
  assert.equal(brandedOnly.status, 'ambiguous');
  assert.equal(brandedOnly.candidates[0].name, '罗森 番茄炒蛋');
  const variants = rankBooheeFoods('番茄炒蛋', [
    { code: 'fd5cf190', name: '青椒番茄炒蛋', calories: 95, protein: 4.66, fat: 7.04, carbohydrate: 3.86 },
    fanqie[2],
  ]);
  assert.equal(variants.status, 'ambiguous');
  assert.equal(variants.candidates[0].name, '青椒番茄炒蛋');
  assert.equal(foodFromBooheeRecord({ code: 'x', name: '缺数字', calories: 1, protein: 1, fat: 1 }), null);
});

test('boohee lookup succeeds from search, ignores invented calories, and does not call again while cached', async () => {
  const logs = [];
  let calls = 0;
  const client = createBooheeClient({
    apiKey: 'test-key',
    log: entry => logs.push(entry),
    fetch: async (url, options) => {
      calls += 1;
      const parsed = new URL(url);
      assert.equal(parsed.hostname, 'api.boohee.com');
      assert.equal(parsed.pathname, '/open-apis/v1/food/search');
      assert.equal(parsed.searchParams.get('keyword'), '番茄炒蛋');
      assert.equal(parsed.searchParams.has('page'), true);
      assert.equal(options.headers['X-Api-Key'], 'test-key');
      assert.equal(String(url).includes('test-key'), false);
      assert.equal(parsed.pathname.includes('image_recognize'), false);
      return Response.json({ code: 0, message: '0', data: { foods: fanqie, has_more: true } });
    },
  });
  const env = { booheeClient: client };
  const draft = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '番茄炒蛋' }, env, source);
  const item = draft.items[0];
  assert.equal(item.foodId, 'boohee:fanqiechaodan');
  assert.equal(item.nutrition.source, '薄荷健康');
  assert.deepEqual(
    { kcal: item.nutrition.kcal, protein: item.nutrition.protein, fat: item.nutrition.fat, carb: item.nutrition.carb },
    { kcal: 126, protein: 7, fat: 9, carb: 5 },
  );
  assert.match(draft.notice, /薄荷健康/);
  const again = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '番茄炒蛋' }, env, source);
  assert.equal(again.items[0].nutrition.kcal, 126);
  assert.equal(calls, 1);
  const switched = await calculateItems({
    requestId: crypto.randomUUID(),
    items: [{ name: '番茄炒蛋', foodId: 'boohee:fd0f25d2', grams: 100, portionLabel: '中' }],
  }, source, crypto.randomUUID(), env);
  assert.equal(switched.items[0].name, '罗森 番茄炒蛋');
  assert.equal(switched.items[0].nutrition.kcal, 159);
  assert.equal(switched.items[0].nutrition.fat, 14);
  assert.equal(calls, 1);
  const report = await buildReport({
    requestId: crypto.randomUUID(),
    meals: [{ rawText: '番茄炒蛋', items: [{ name: '番茄炒蛋', foodId: 'boohee:fanqiechaodan', grams: 100, status: 'matched', nutrition: { kcal: 9999 } }] }],
  }, env, source, crypto.randomUUID());
  assert.equal(report.totals.kcal, 84);
  assert.equal(JSON.stringify(logs).includes('番茄炒蛋'), false);
  assert.equal(JSON.stringify(logs).includes('test-key'), false);
  const response = await worker.fetch(new Request('https://example.test/api/diet/recognize', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ requestId: crypto.randomUUID(), text: '番茄炒蛋' }),
  }), env);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).items[0].nutrition.kcal, 126);
});

test('local foods are not sent to boohee, and missing key, empty result, http failure or timeout stay unestimated', async () => {
  let calls = 0;
  const noisy = createBooheeClient({
    apiKey: 'test-key',
    fetch: async () => { calls += 1; return Response.json({ code: 0, data: { foods: fanqie } }); },
  });
  const local = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '一个鸡蛋加牛肉面' }, { booheeClient: noisy }, source);
  assert.equal(calls, 1);
  assert.equal(local.items.find(item => item.foodId === 'egg-whole').nutrition.kcal, 72);
  const noodle = local.items.find(item => item.inputName === '牛肉面');
  assert.equal(noodle.nutrition, null);
  assert.equal(noodle.reason, 'no_match');

  const logs = [];
  const missingKey = createBooheeClient({ apiKey: '', log: entry => logs.push(entry), fetch: async () => { throw new Error('should not call'); } });
  const unnamed = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '番茄炒蛋' }, { booheeClient: missingKey }, source);
  assert.equal(unnamed.items[0].nutrition, null);
  assert.equal(unnamed.items[0].reason, 'no_key');
  assert.equal(logs[0].outcome, 'no_key');
  assert.equal(JSON.stringify(logs).includes('番茄炒蛋'), false);
  const hidden = await buildReport({
    requestId: crypto.randomUUID(),
    meals: [{ items: [{ name: '番茄炒蛋', foodId: 'boohee:fanqiechaodan', grams: 100, status: 'matched', nutrition: { kcal: 9999 } }] }],
  }, { booheeClient: missingKey }, source, crypto.randomUUID());
  assert.equal(hidden.totals.kcal, 0);
  assert.equal(hidden.totals.counted, 0);

  const empty = createBooheeClient({
    apiKey: 'test-key',
    fetch: async () => Response.json({ code: 0, data: { foods: [] } }),
  });
  const none = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '番茄炒蛋' }, { booheeClient: empty }, source);
  assert.equal(none.items[0].nutrition, null);
  assert.equal(none.items[0].reason, 'no_match');

  const broken = createBooheeClient({
    apiKey: 'test-key',
    log: entry => logs.push(entry),
    fetch: async () => new Response('no', { status: 503 }),
  });
  const failed = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '番茄炒蛋' }, { booheeClient: broken }, source);
  assert.equal(failed.items[0].nutrition, null);
  assert.equal(failed.items[0].reason, 'lookup_failed');
  assert.equal(logs.some(entry => entry.outcome === 'http_error' && entry.httpStatus === 503), true);

  const rejected = createBooheeClient({
    apiKey: 'test-key',
    fetch: async () => Response.json({ code: 401, message: '番茄炒蛋', data: null }),
  });
  const bad = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '番茄炒蛋' }, { booheeClient: rejected }, source);
  assert.equal(bad.items[0].reason, 'lookup_failed');
  assert.equal(bad.items[0].nutrition, null);

  const slow = createBooheeClient({
    apiKey: 'test-key',
    timeoutMs: 20,
    log: entry => logs.push(entry),
    fetch: (_url, options) => new Promise((_resolve, reject) => {
      const abort = () => {
        const error = new Error('aborted');
        error.name = 'TimeoutError';
        reject(error);
      };
      if (options.signal.aborted) abort();
      else options.signal.addEventListener('abort', abort, { once: true });
    }),
  });
  const timed = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '番茄炒蛋' }, { booheeClient: slow }, source);
  assert.equal(timed.items[0].nutrition, null);
  assert.equal(timed.items[0].reason, 'lookup_failed');
  assert.equal(logs.some(entry => entry.outcome === 'timeout'), true);

  const detailLogs = [];
  const detail = createBooheeClient({
    apiKey: 'test-key',
    log: entry => detailLogs.push(entry),
    fetch: async (url) => {
      const parsed = new URL(url);
      assert.equal(parsed.pathname, '/open-apis/v1/food/detail');
      assert.equal(parsed.searchParams.get('code'), 'fanqiechaodan');
      return Response.json({
        code: 0,
        data: { code: 'fanqiechaodan', name: '番茄炒蛋', calories: { value: 84 }, protein: { value: 4.7 }, fat: { value: 5.96 }, carbohydrate: { value: 3.52 } },
      });
    },
  });
  const checked = await calculateItems({
    requestId: crypto.randomUUID(),
    items: [{ name: '随便写的热量', foodId: 'boohee:fanqiechaodan', grams: 100 }],
  }, source, crypto.randomUUID(), { booheeClient: detail });
  assert.equal(checked.items[0].nutrition.kcal, 84);
  assert.equal(checked.items[0].nutrition.protein, 5);
  assert.equal(checked.items[0].nutrition.source, '薄荷健康');
  assert.equal(JSON.stringify(detailLogs).includes('番茄炒蛋'), false);
});

test('non-calculable dishes are looked up live, and vague names are not sent', async () => {
  const keywords = [];
  const client = createBooheeClient({
    apiKey: 'test-key',
    fetch: async (url) => {
      const keyword = new URL(String(url)).searchParams.get('keyword');
      keywords.push(keyword);
      if (keyword === '牛肉面') {
        return Response.json({ code: 0, data: { foods: [
          { code: 'niuroumian', name: '牛肉面', calories: 140, protein: 7, fat: 4, carbohydrate: 18 },
          { code: 'branded-noodle', name: '某店 牛肉面', calories: 180, protein: 6, fat: 6, carbohydrate: 20 },
        ] } });
      }
      if (keyword === '馒头') return Response.json({ code: 0, data: { foods: [] } });
      if (keyword === '饺子') return new Response('no', { status: 500 });
      throw new Error(`unexpected keyword ${keyword}`);
    },
  });
  const env = { booheeClient: client };
  const noodle = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '中午一碗牛肉面' }, env, source);
  const item = noodle.items[0];
  assert.equal(item.foodId, 'boohee:niuroumian');
  assert.equal(item.grams, 450);
  assert.equal(item.nutrition.kcal, 630);
  assert.equal(item.nutrition.protein, 32);
  assert.equal(item.nutrition.source, '薄荷健康');

  const bun = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '一个馒头' }, env, source);
  assert.equal(bun.items[0].name, '馒头');
  assert.equal(bun.items[0].nutrition, null);
  assert.equal(bun.items[0].reason, 'no_match');

  const dumpling = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text: '饺子' }, env, source);
  assert.equal(dumpling.items[0].nutrition, null);
  assert.equal(dumpling.items[0].reason, 'lookup_failed');

  for (const text of ['外卖套餐', '套餐', '外卖']) {
    const vague = await dispatchDiet('/api/diet/recognize', { requestId: crypto.randomUUID(), text }, env, source);
    assert.equal(vague.items[0].reason, 'too_vague');
    assert.equal(vague.items[0].nutrition, null);
  }
  assert.deepEqual(keywords, ['牛肉面', '馒头', '饺子']);

  const beforeReport = keywords.length;
  const report = await buildReport({
    requestId: crypto.randomUUID(),
    meals: [{ items: [{ name: '牛肉面', inputName: '牛肉面', foodId: 'beef-noodle', grams: 450, status: 'unestimated' }] }],
  }, env, source, crypto.randomUUID());
  assert.equal(report.totals.kcal, 0);
  assert.equal(report.totals.counted, 0);
  assert.equal(keywords.length, beforeReport);
});
