import { isExplicitUrgent, urgentResponse, validateReply } from '../shared/safety.js';
import { validatePlan } from '../shared/records.js';
import { recipes, topics, articles } from './data.js';
export async function getAgentReply(request, { signal } = {}) {
  // Urgent help is available even if the network or model is unavailable.
  if (request.safetyContext?.urgent || [request.message, ...request.history.filter(h => h.role === 'user').map(h => h.content)].some(isExplicitUrgent)) return urgentResponse(request.requestId);
  const response = await fetch('/api/agent', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(request), signal, cache: 'no-store' });
  if (!response.ok) throw new Error(response.status === 429 ? '请求较多，请稍后重试' : '咨询服务暂不可用，请重试');
  const reply = validateReply(await response.json(), request.requestId);
  if (reply.planDraft) validatePlan(reply.planDraft);
  for (const ref of reply.contentRefs) if (!{ recipe: recipes, topic: topics, article: articles }[ref.type]?.some(r => r.id === ref.id)) throw new Error('内容引用未通过校验');
  return reply;
}
