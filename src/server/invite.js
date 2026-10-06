const COOKIE = 'zhiyang_invite';
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;
const encoder = new TextEncoder();

export function parseInviteCodes(value) {
  const seen = new Set();
  for (const part of String(value ?? '').split(/[\s,]+/)) {
    const code = part.trim();
    if (code) seen.add(code);
  }
  return [...seen];
}

export function readInviteConfig(env = {}) {
  const codes = parseInviteCodes(env.INVITE_CODES);
  const secret = String(env.INVITE_SECRET ?? '').trim();
  return { enabled: codes.length > 0, codes, secret };
}

export function safeEqual(left, right) {
  const a = String(left);
  const b = String(right);
  const length = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let index = 0; index < length; index += 1) diff |= (a.charCodeAt(index) || 0) ^ (b.charCodeAt(index) || 0);
  return diff === 0;
}

export function codeAccepted(code, codes) {
  const value = String(code ?? '').trim();
  if (!value || !codes?.length) return false;
  let matched = 0;
  for (const expected of codes) matched |= safeEqual(value, expected) ? 1 : 0;
  return matched === 1;
}

async function hmacHex(secret, message) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return [...new Uint8Array(signature)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function signInviteToken(secret, now = Date.now()) {
  const exp = now + MAX_AGE_SECONDS * 1000;
  const payload = `v1.${exp}`;
  return `${payload}.${await hmacHex(secret, payload)}`;
}

export async function verifyInviteToken(token, secret, now = Date.now()) {
  try {
    if (!secret) return false;
    const match = /^v1\.(\d+)\.([a-f0-9]{64})$/.exec(String(token ?? ''));
    if (!match) return false;
    const exp = Number(match[1]);
    if (!Number.isSafeInteger(exp) || exp < now || exp > now + MAX_AGE_SECONDS * 1000 + 60_000) return false;
    const payload = `v1.${exp}`;
    return safeEqual(await hmacHex(secret, payload), match[2]);
  } catch {
    return false;
  }
}

export function readCookie(header, name = COOKIE) {
  for (const part of String(header ?? '').split(';')) {
    const index = part.indexOf('=');
    if (index < 1) continue;
    if (part.slice(0, index).trim() !== name) continue;
    try { return decodeURIComponent(part.slice(index + 1).trim()); }
    catch { return ''; }
  }
  return '';
}

export function requestIsHttps(request, url) {
  if (url.protocol === 'https:') return true;
  const forwarded = request.headers.get('x-forwarded-proto') || request.headers.get('x-forwarded-protocol') || '';
  if (forwarded.split(',')[0].trim().toLowerCase() === 'https') return true;
  return /(?:^|[;,])\s*proto=https\b/i.test(request.headers.get('forwarded') || '');
}

export function inviteCookie(token, secure) {
  return `${COOKIE}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${MAX_AGE_SECONDS}${secure ? '; Secure' : ''}`;
}

const json = (body, status = 200, extra = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...extra },
});

async function readInviteJson(request) {
  if (Number(request.headers.get('content-length')) > 2048) {
    const error = new Error('size');
    throw error;
  }
  const text = await request.text();
  if (text.length > 2048) throw new Error('size');
  return JSON.parse(text);
}

export async function inviteAllows(request, env) {
  const config = readInviteConfig(env);
  if (!config.enabled) return true;
  return verifyInviteToken(readCookie(request.headers.get('cookie')), config.secret);
}

export async function handleInvite(request, env, url) {
  const config = readInviteConfig(env);
  if (url.pathname === '/api/invite/status') {
    if (request.method !== 'GET') return json({ error: '请使用 GET 请求' }, 405);
    if (!config.enabled) return json({ unlocked: true });
    const unlocked = await verifyInviteToken(readCookie(request.headers.get('cookie')), config.secret);
    return json({ unlocked });
  }
  if (request.method !== 'POST') return json({ error: '请使用 POST 请求' }, 405);
  if (!config.enabled) return json({ unlocked: true });
  if (!config.secret) return json({ error: '暂时无法核对邀请码，请稍后再试' }, 503);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: '请求需为 JSON' }, 415);
  let body;
  try { body = await readInviteJson(request); }
  catch (error) { return json({ error: error.message === 'size' ? '请求内容过长' : '请先填写邀请码' }, error.message === 'size' ? 413 : 400); }
  const code = typeof body?.code === 'string' ? body.code : '';
  if (!String(code).trim()) return json({ error: '请先填写邀请码' }, 400);
  if (!codeAccepted(code, config.codes)) return json({ error: '邀请码不对，请再试一次' }, 401);
  const token = await signInviteToken(config.secret);
  return json({ unlocked: true }, 200, { 'set-cookie': inviteCookie(token, requestIsHttps(request, url)) });
}

export { COOKIE, MAX_AGE_SECONDS };
