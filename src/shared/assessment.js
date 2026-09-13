import questionnaire from '../../content/questionnaire.json' with { type: 'json' };
export { questionnaire };
export const options = [
  [0, '从未或几乎没有'], [1, '偶尔，只有少数时候'], [2, '有时，间歇出现'],
  [3, '经常，多数时候'], [4, '几乎总是'], ['UNSURE', '记不清／无法判断'],
  ['NOT_APPLICABLE', '这道题不适用'], ['DECLINED', '不愿回答'],
];
export function scoreAssessment(answers, version = questionnaire.id, scoreVersion = questionnaire.scoreVersion) {
  if (version !== questionnaire.id || scoreVersion !== questionnaire.scoreVersion || !Array.isArray(answers)) throw new Error('问卷版本不受支持');
  const values = new Map();
  for (const answer of answers) {
    if (!answer || !questionnaire.questions.some(q => q.id === answer.id) || values.has(answer.id) || !options.some(([v]) => v === answer.value)) throw new Error('存在无效或重复答案');
    values.set(answer.id, answer.value);
  }
  const missing = questionnaire.order.filter(id => !values.has(id));
  if (missing.length) return { status: 'incomplete', missing, classification: null, agentEligible: false };
  const dimensions = {};
  for (const dimension of new Set(questionnaire.questions.map(q => q.dimension))) {
    const items = questionnaire.questions.filter(q => q.dimension === dimension);
    const excluded = items.filter(q => typeof values.get(q.id) !== 'number').map(q => ({ id: q.id, reason: values.get(q.id) }));
    dimensions[dimension] = excluded.length ? { status: 'unscorable', excluded } : { status: 'scorable', mean: items.reduce((sum, q) => sum + values.get(q.id), 0) / items.length };
  }
  return { status: 'pilot_reference', questionnaireVersion: version, scoreVersion, dimensions, classification: null, agentEligible: false, reviewStatus: 'pending' };
}
export function assessmentRecord(answers) {
  const result = scoreAssessment(answers);
  if (result.status !== 'pilot_reference') throw new Error('请先完成全部题目');
  return { id: crypto.randomUUID(), answers: structuredClone(answers), result, createdAt: new Date().toISOString(), useConditions: '成人可理解性试测；未经测量验证', questionnaireVersion: questionnaire.id };
}
