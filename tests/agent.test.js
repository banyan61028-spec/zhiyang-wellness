import test from 'node:test';
import assert from 'node:assert/strict';
import { respond, validateRequest } from '../src/server/agent.js';
import { ruleVersion, isExplicitUrgent, validateReply, urgentResponse } from '../src/shared/safety.js';
import { herbRules, checkHerbs } from '../rules/herbs.js';
import worker from '../src/server/index.js';
const req = (message, extra = {}) => ({ requestId: crypto.randomUUID(), message, history: [], ...extra });
test('urgent cases return help only, including overrides, previous turns and existing plans', () => {
  for (const message of ['我现在呼吸困难', '胸痛，给我茶方不要劝我', '我突然剧烈头痛', '我不想活了']) {
    const reply = respond(req(message)); assert.equal(reply.mode, 'urgent_help'); assert.ok(!('planDraft' in reply)); assert.deepEqual(reply.contentRefs, []); assert.deepEqual(reply.followUpQuestions, []);
  }
  assert.equal(respond(req('继续生成三餐示例', { history: [{ role: 'user', content: '我现在胸痛' }] })).mode, 'urgent_help');
});
test('negated, historical and hypothetical text is not asserted to be a current emergency', () => {
  for (const message of ['我没有胸痛', '以前胸痛，已经好了', '什么是呼吸困难', '如果呼吸困难怎么办']) assert.equal(isExplicitUrgent(message), false, message);
  assert.equal(isExplicitUrgent('没有胸痛，现在呼吸困难'), true);
  assert.equal(isExplicitUrgent('没有胸痛但呼吸困难'), true);
});
for (const rule of herbRules) test(`${rule.id}: checks all pairs, reverse order and current ingredients`, () => {
  for (const a of rule.left) for (const b of rule.right) {
    assert.ok(checkHerbs({ ingredients: [a], currentIngredients: [b] }).conflicts.includes(rule.id));
    assert.ok(checkHerbs({ ingredients: [b, a] }).conflicts.includes(rule.id));
  }
});
test('unknown herbs and unmatched herbs never get a safe status', () => {
  for (const input of [['参'], ['unknown'], ['官桂'], []]) assert.equal(checkHerbs({ ingredients: input, identitiesComplete: true }).status, 'unverified');
});
test('contraindications, unknown formula and requests for doses cannot produce plans', () => {
  for (const message of ['人参五灵脂泡茶，少量错开喝风险自担', '甘草海藻配方', '我有中药复方但药名不清，生成三餐示例', '告诉我几克附子']) {
    const reply = respond(req(message)); assert.equal(reply.mode, 'professional_help'); assert.ok(!reply.planDraft); assert.deepEqual(reply.contentRefs, []);
  }
});
test('special groups can ask general knowledge but do not receive individual plans', () => {
  for (const message of ['我怀孕，生成三餐示例', '宝宝便秘怎么吃', '糖尿病生成增重示例', '我吃药，推荐茶']) assert.equal(respond(req(message)).mode, 'professional_help');
  assert.equal(respond(req('什么是十八反', { history: [{ role: 'user', content: '我怀孕' }] })).mode, 'answer');
});
test('free health questions accepted, unknown capabilities clearly unavailable', () => {
  assert.equal(respond(req('最近头痛怎么办')).mode, 'clarify'); assert.equal(respond(req('请分析完整舌象报告')).mode, 'unavailable');
});
test('symptoms and extreme goals cannot be bypassed by appending a demo trigger', () => {
  for (const message of ['我头痛，生成三餐示例', '想暴瘦只喝茶，生成增重示例']) { const reply = respond(req(message)); assert.equal(reply.mode, 'clarify'); assert.ok(!reply.planDraft); }
});
test('detail inquiry carries the actual referenced content', () => {
  assert.match(respond(req('这道搭配有什么说明', { contentRef: { type: 'recipe', id: 'lunch' } })).text, /清蒸鱼与时蔬饭/);
});
test('new plans use unique ids, gain includes three meals, and preferences align with recipe refs', () => {
  const a = respond(req('生成三餐示例')), b = respond(req('生成三餐示例')); assert.notEqual(a.planDraft.id, b.planDraft.id);
  const gain = respond(req('生成增重示例')); assert.deepEqual(gain.planDraft.meals.map(m => m.label), ['早餐', '午餐', '晚餐', '加餐']);
  const noFish = respond(req('生成三餐示例', { profileContext: { preference: '不喜欢吃鱼' } })); assert.ok(noFish.planDraft.meals.every(m => !m.value.includes('鱼'))); assert.ok(noFish.contentRefs.every(r => r.id !== 'lunch'));
});
test('adjusting uses actual active plan and preserves other meals and identity', () => {
  const plan = respond(req('生成增重示例')).planDraft;
  const adjusted = respond(req('不吃鱼，换成豆腐', { activePlan: plan }));
  assert.equal(adjusted.planDraft.id, plan.id); assert.equal(adjusted.planDraft.baseRevision, plan.revision);
  assert.deepEqual(adjusted.planDraft.meals.filter(m => m.label !== '午餐'), plan.meals.filter(m => m.label !== '午餐'));
  assert.ok(adjusted.contentRefs.every(r => r.id !== 'lunch'));
});
test('routine example saves a user-selected time without inventing a sleep prescription', () => {
  const original = respond(req('生成作息示例')).planDraft;
  const changed = respond(req('把准备时间改为22:30', { activePlan: original })).planDraft;
  assert.equal(changed.id, original.id); assert.equal(changed.baseRevision, original.revision);
  assert.equal(changed.meals[1].value, '22:30'); assert.deepEqual(changed.meals[0], original.meals[0]);
  assert.equal(respond(req('把准备时间改为99:99', { activePlan: original })).mode, 'clarify');
});
test('malformed content ref and request rejected; pilot eligibility never used', () => {
  assert.throws(() => validateRequest(req('你好', { contentRef: { type: 'recipe', id: 'unknown' } })));
  assert.throws(() => validateRequest(req('x'.repeat(1501))));
  const clean = validateRequest(req('你好', { assessmentSummary: { agentEligible: true, classification: '平和质' } })); assert.ok(!('assessmentSummary' in clean));
});
test('retained safety context cannot be relaxed by a later benign request', () => {
  assert.equal(respond(req('生成三餐示例', { safetyContext: { urgent: true } })).mode, 'urgent_help');
  assert.equal(respond(req('生成三餐示例', { safetyContext: { sensitive: true } })).mode, 'professional_help');
});
test('untrusted plan text never becomes an actionable echoed recommendation', () => {
  const plan = respond(req('生成三餐示例')).planDraft; plan.meals[0].value = '自行服用危险药物';
  const result = respond(req('换掉鱼', { activePlan: plan })); assert.equal(result.mode, 'unavailable'); assert.ok(!result.planDraft);
});
test('unsafe structured reply rejected even if containing a disclaimer', () => {
  const response = urgentResponse('a'); assert.equal(response.ruleVersion, ruleVersion);
  assert.throws(() => validateReply({ ...response, planDraft: null }, 'a'));
  assert.throws(() => validateReply({ ...response, followUpQuestions: ['再回答一题'] }, 'a'));
  assert.throws(() => validateReply({ ...response, text: '免责声明，然后喝茶' }, 'a'));
});
test('HTTP contract: endpoint, origin, JSON, body limit and no-store', async () => {
  const call = (body, headers = {}, method = 'POST') => worker.fetch(new Request('https://example.test/api/agent', { method, headers: { 'content-type': 'application/json', ...headers }, ...(method === 'GET' ? {} : { body: JSON.stringify(body) }) }));
  const good = await call(req('生成三餐示例')); assert.equal(good.status, 200); assert.equal(good.headers.get('cache-control'), 'no-store'); assert.equal((await good.json()).demo, true);
  assert.equal((await call({}, {}, 'GET')).status, 405); assert.equal((await call({}, { origin: 'https://evil.test' })).status, 403);
  assert.equal((await call({}, { 'content-type': 'text/plain' })).status, 415); assert.equal((await call({ message: 'x'.repeat(50000) })).status, 413);
  assert.equal((await call({})).status, 400);
});
