import { respond } from './agent.js';
import { handleDiet } from './diet.js';
import { handleInvite, inviteAllows } from './invite.js';

const MAX_BYTES = 48 * 1024;
const buckets = new Map();
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });

function takeRateLimit(request) {
  const key = request.headers.get('cf-connecting-ip') || 'local';
  const now = Date.now();
  for (const [bucketKey, value] of buckets) if (now - value.start > 60000) buckets.delete(bucketKey);
  const bucket = buckets.get(key) || { start: now, count: 0 };
  bucket.count += 1;
  if (buckets.size >= 1000 && !buckets.has(key)) return json({ error: '服务繁忙，请稍后重试' }, 429);
  buckets.set(key, bucket);
  if (bucket.count > 40) return json({ error: '请求较多，请稍后重试' }, 429);
  return null;
}

async function boundedJSON(request) {
  if (Number(request.headers.get('content-length')) > MAX_BYTES) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('input');
  const chunks = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BYTES) { await reader.cancel(); throw new Error('size'); }
    chunks.push(value);
  }
  const joined = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { joined.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(joined));
}

export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);
    const diet = url.pathname.startsWith('/api/diet');
    const invite = url.pathname === '/api/invite' || url.pathname === '/api/invite/status';
    if (!diet && !invite && url.pathname !== '/api/agent') return env.ASSETS ? env.ASSETS.fetch(request) : new Response('Not found', { status: 404 });
    if (request.headers.get('origin') && request.headers.get('origin') !== url.origin) return json({ error: '请求来源不匹配' }, 403);
    if (invite) {
      const limited = takeRateLimit(request);
      if (limited) return limited;
      return handleInvite(request, env, url);
    }
    if (request.method !== 'POST' && !(diet && request.method === 'GET')) return json({ error: '请使用 POST 请求' }, 405);
    if (request.method === 'POST' && !diet && !request.headers.get('content-type')?.startsWith('application/json')) return json({ error: '请求需为 JSON' }, 415);
    const limited = takeRateLimit(request);
    if (limited) return limited;
    if (!(await inviteAllows(request, env))) return json({ error: '请先填写邀请码' }, 401);
    try { return diet ? handleDiet(request, env, url) : json(respond(await boundedJSON(request))); }
    catch (error) { return json({ error: error.message === 'size' ? '请求内容过长' : '请求或回复校验未通过' }, error.message === 'size' ? 413 : 400); }
  },
};
