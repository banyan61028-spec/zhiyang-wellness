import test from 'node:test';
import assert from 'node:assert/strict';
import { questionnaire, scoreAssessment, assessmentRecord } from '../src/shared/assessment.js';
const all = value => questionnaire.questions.map(q => ({ id: q.id, value }));
const withValue = (id, value) => all(0).map(a => a.id === id ? { id, value } : a);
for (const value of [0, 4]) test(`QA01/02: all ${value} remains pilot, never a constitution`, () => {
  const result = scoreAssessment(all(value));
  assert.equal(Object.keys(result.dimensions).length, 9);
  assert.ok(Object.values(result.dimensions).every(d => d.mean === value));
  assert.equal(result.classification, null); assert.equal(result.agentEligible, false);
});
test('QA03/04: dimension means retain precision', () => {
  const answers = all(0), values = { Q05: 0, Q06: 1, Q07: 3, Q08: 4, Q09: 1, Q10: 2, Q11: 4 };
  answers.forEach(a => { a.value = values[a.id] ?? 0; });
  const { dimensions } = scoreAssessment(answers);
  assert.equal(dimensions.qi_deficiency.mean, 2); assert.equal(dimensions.yang_deficiency.mean, 7 / 3);
});
for (const value of ['NOT_APPLICABLE', 'DECLINED', 'UNSURE']) test(`non-numeric ${value} is not zero`, () => {
  const result = scoreAssessment(withValue('Q30', value));
  assert.equal(result.status, 'pilot_reference'); assert.equal(result.dimensions.special.status, 'unscorable'); assert.equal(result.dimensions.special.excluded[0].reason, value);
});
test('QA07: missing answer returns its id', () => { assert.deepEqual(scoreAssessment(all(0).filter(a => a.id !== 'Q12')).missing, ['Q12']); });
test('QA08: invalid, duplicate, unknown and string answers rejected', () => {
  for (const value of [-1, 5, 1.5, '1', null, true, {}]) assert.throws(() => scoreAssessment(withValue('Q01', value)));
  assert.throws(() => scoreAssessment([...all(0), { id: 'Q99', value: 0 }]));
  assert.throws(() => scoreAssessment([...all(0), { id: 'Q01', value: 0 }]));
});
test('QA09: apparently inconsistent feelings are preserved', () => {
  const answers = all(0).map(a => ['Q01', 'Q05'].includes(a.id) ? { ...a, value: 4 } : a);
  const copy = structuredClone(answers); scoreAssessment(answers); assert.deepEqual(copy, answers);
});
test('QA10: unknown/mismatched versions and legacy results rejected', () => {
  assert.throws(() => scoreAssessment(all(0), 'old')); assert.throws(() => scoreAssessment(all(0), questionnaire.id, 'unknown')); assert.throws(() => scoreAssessment({ constitution: '平和质' }));
});
test('new assessment ids are independent', () => { assert.notEqual(assessmentRecord(all(0)).id, assessmentRecord(all(0)).id); });
