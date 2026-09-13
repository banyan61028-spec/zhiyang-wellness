import test from 'node:test';
import assert from 'node:assert/strict';
import { IDBFactory } from 'fake-indexeddb';
import { openStorage } from '../src/client/storage.js';
import { questionnaire, assessmentRecord } from '../src/shared/assessment.js';
import { migrateLegacy } from '../src/shared/records.js';
const plan = () => ({ id: crypto.randomUUID(), revision: 1, baseRevision: null, title: '搭配示例', goal: '均衡饮食', provenance: 'demo', meals: [{ label: '午餐', value: '清蒸鱼与时蔬饭' }], note: '示例' });
const fakeLegacy = value => ({ value, getItem() { return this.value; }, removeItem() { this.value = null; } });
test('legacy migration discards fixed constitution, unknown favorites and broken plans', () => {
  const state = migrateLegacy(JSON.stringify({ profile: { name: '旧用户', constitution: '平和质' }, saved: ['recipe:tea', 'bad', 'recipe:tea'], plans: [{ id: 'bad' }, plan()] }));
  assert.equal(state.profile.name, '旧用户'); assert.ok(!('constitution' in state.profile)); assert.deepEqual(state.saved, ['recipe:tea']); assert.equal(state.plans.length, 1); assert.equal(state.assessments.length, 0);
});
test('atomic, idempotent migration across simultaneous opens; reload persists records', async () => {
  const factory = new IDBFactory(), legacy = fakeLegacy(JSON.stringify({ plans: [plan()] }));
  const [a, b] = await Promise.all([openStorage(factory, legacy), openStorage(factory, legacy)]);
  assert.equal((await a.load()).plans.length, 1);
  await a.profile({ name: '本机用户' }); await a.favorite('recipe:tea');
  assert.equal((await b.load()).profile.name, '本机用户'); assert.deepEqual((await b.load()).saved, ['recipe:tea']);
  a.close(); b.close();
});
test('new plans coexist; revision conflict and deleted plan never silently overwrite', async () => {
  const s = await openStorage(new IDBFactory(), fakeLegacy(null));
  const first = await s.plan(plan()), second = await s.plan(plan());
  assert.notEqual(first.id, second.id); assert.equal((await s.load()).plans.length, 2);
  const draft = { ...first, baseRevision: first.revision, meals: [{ label: '午餐', value: '豆腐' }] };
  const outcomes = await Promise.allSettled([s.plan(draft), s.plan(draft)]);
  assert.equal(outcomes.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal((await s.load()).plans.find(p => p.id === first.id).revision, 2);
  await s.removePlan(first.id); await assert.rejects(s.plan(draft), /已变更或被删除/);
  assert.deepEqual((await s.load()).plans.map(p => p.id), [second.id]); s.close();
});
test('QA11/12: draft, multiple results and deletion; forged eligibility cannot persist', async () => {
  const s = await openStorage(new IDBFactory(), fakeLegacy(null));
  const answers = questionnaire.questions.map(q => ({ id: q.id, value: 0 }));
  await s.draft({ questionnaireVersion: questionnaire.id, answers: answers.slice(0, 2), step: 1 });
  assert.equal((await s.load()).draft.answers.length, 2);
  const a = assessmentRecord(answers), b = assessmentRecord(answers); a.result.agentEligible = true;
  await s.assessment(a); await s.assessment(b); await s.removeAssessment(a.id);
  const state = await s.load(); assert.equal(state.draft, null); assert.equal(state.assessments.length, 1); assert.equal(state.assessments[0].result.agentEligible, false); s.close();
});
test('reset clears every store and legacy; re-opening never remigrates old records', async () => {
  const factory = new IDBFactory(), legacy = fakeLegacy(JSON.stringify({ plans: [plan()] }));
  const s = await openStorage(factory, legacy); await s.favorite('recipe:tea'); await s.profile({ name: '清除测试' });
  await s.clear(); assert.equal(legacy.value, null); s.close();
  const reopened = await openStorage(factory, legacy), state = await reopened.load();
  assert.deepEqual([state.saved.length, state.plans.length, state.assessments.length], [0, 0, 0]); assert.equal(state.draft, null); assert.equal(state.profile.name, '体验用户'); reopened.close();
});
test('closed/unavailable storage rejects writes instead of reporting success', async () => {
  const s = await openStorage(new IDBFactory(), fakeLegacy(null)); s.close(); await assert.rejects(s.profile({ name: '未保存' }));
  await assert.rejects(openStorage(null, fakeLegacy(null)));
});
test('failed legacy read does not mark migration completed or erase future recovery', async () => {
  const factory = new IDBFactory();
  await assert.rejects(openStorage(factory, { getItem() { throw new Error('denied'); } }), /旧版记录/);
  const s = await openStorage(factory, fakeLegacy(JSON.stringify({ profile: { name: '可恢复旧记录' } })));
  assert.equal((await s.load()).profile.name, '可恢复旧记录'); s.close();
});
