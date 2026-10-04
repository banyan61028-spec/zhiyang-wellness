import { createId } from '../shared/id.js';
import { isExplicitUrgent, urgentResponse } from '../shared/safety.js';

async function post(path, body, signal) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ requestId: createId(), ...body }),
    signal,
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || '这次没有完成');
  if (payload.mode === 'urgent_help') return payload;
  return payload;
}

export async function fetchCatalog() {
  const response = await fetch('/api/diet/catalog', { cache: 'no-store' });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(Array.isArray(payload.details) ? payload.details.join('；') : (payload.error || '食物表暂时读不出来'));
  return payload;
}

export function urgentIfNeeded(text) {
  if (text && isExplicitUrgent(text)) return { ...urgentResponse(createId()), items: [], recipe: null, advice: '' };
  return null;
}

export const recognizeMeal = (body, signal) => urgentIfNeeded(body.text) || post('/api/diet/recognize', body, signal);
export const calculateItems = (body, signal) => post('/api/diet/calculate', body, signal);
export const requestReport = (body, signal) => post('/api/diet/report', body, signal);
export const requestRecommendation = (body, signal) => post('/api/diet/recommend', body, signal);
