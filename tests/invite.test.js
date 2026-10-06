import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../src/server/index.js';
import { codeAccepted, parseInviteCodes, readInviteConfig, safeEqual, signInviteToken, verifyInviteToken, COOKIE, MAX_AGE_SECONDS } from '../src/server/invite.js';

const CODE = 'friend-door-9f3a';
const SECRET = 'test-invite-secret-value';
const lockedEnv = { INVITE_CODES: `  ${CODE}, other-door  `, INVITE_SECRET: SECRET };

function postInvite(code, url = 'https://example.test/api/invite', headers = {}) {
  return worker.fetch(new Request(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify({ code }),
  }), lockedEnv);
}

test('invite codes trim comma and space lists, and an empty list stays open', () => {
  assert.deepEqual(parseInviteCodes(' one, two  three '), ['one', 'two', 'three']);
  assert.deepEqual(parseInviteCodes('one,one, two'), ['one', 'two']);
  assert.deepEqual(parseInviteCodes('  ,  '), []);
  assert.equal(readInviteConfig({}).enabled, false);
  assert.equal(readInviteConfig({ INVITE_CODES: '   ' }).enabled, false);
  assert.equal(readInviteConfig({ INVITE_CODES: CODE, INVITE_SECRET: '  ' }).secret, '');
  assert.equal(safeEqual('same', 'same'), true);
  assert.equal(safeEqual('same', 'same '), false);
  assert.equal(codeAccepted(`  ${CODE}  `, [CODE, 'other']), true);
  assert.equal(codeAccepted('nope', [CODE, 'other']), false);
  assert.equal(codeAccepted('', [CODE]), false);
});

test('signed invite token expires, rejects tampering, and does not contain the code', async () => {
  const now = Date.UTC(2026, 9, 6);
  const token = await signInviteToken(SECRET, now);
  assert.equal(token.includes(CODE), false);
  assert.equal(await verifyInviteToken(token, SECRET, now + 1000), true);
  assert.equal(await verifyInviteToken(token, 'another-secret-value', now + 1000), false);
  assert.equal(await verifyInviteToken(token, '', now + 1000), false);
  assert.equal(await verifyInviteToken(`${token}00`, SECRET, now + 1000), false);
  assert.equal(await verifyInviteToken(token, SECRET, now + MAX_AGE_SECONDS * 1000 + 1), false);
  const [version, exp, signature] = token.split('.');
  assert.equal(await verifyInviteToken(`${version}.${exp}.${signature.slice(0, -1)}0`, SECRET, now + 1000), false);
});

test('empty INVITE_CODES leaves diet and status open', async () => {
  for (const env of [{}, { INVITE_CODES: '' }, { INVITE_CODES: '  , ' }]) {
    const catalog = await worker.fetch(new Request('https://example.test/api/diet/catalog'), env);
    assert.equal(catalog.status, 200);
    const status = await worker.fetch(new Request('https://example.test/api/invite/status'), env);
    assert.equal(status.status, 200);
    assert.deepEqual(await status.json(), { unlocked: true });
  }
});

test('invite accepts a known code, rejects others, and requires the cookie on diet and agent', async () => {
  const denied = await worker.fetch(new Request('https://example.test/api/diet/catalog'), lockedEnv);
  assert.equal(denied.status, 401);
  assert.equal((await denied.json()).error, '请先填写邀请码');
  const agent = await worker.fetch(new Request('https://example.test/api/agent', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: '你好', profile: null }),
  }), lockedEnv);
  assert.equal(agent.status, 401);

  const wrong = await postInvite('not-the-code');
  assert.equal(wrong.status, 401);
  assert.equal((await wrong.json()).error, '邀请码不对，请再试一次');
  assert.equal(wrong.headers.get('set-cookie'), null);

  const empty = await postInvite('   ');
  assert.equal(empty.status, 400);
  assert.equal(empty.headers.get('set-cookie'), null);

  const good = await postInvite(CODE);
  assert.equal(good.status, 200);
  assert.deepEqual(await good.json(), { unlocked: true });
  const setCookie = good.headers.get('set-cookie');
  assert.match(setCookie, new RegExp(`^${COOKIE}=`));
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Lax/);
  assert.match(setCookie, /Secure/);
  assert.match(setCookie, new RegExp(`Max-Age=${MAX_AGE_SECONDS}`));
  assert.equal(setCookie.includes(CODE), false);
  const token = decodeURIComponent(setCookie.split(';', 1)[0].slice(COOKIE.length + 1));

  const status = await worker.fetch(new Request('https://example.test/api/invite/status', { headers: { cookie: `${COOKIE}=${token}` } }), lockedEnv);
  assert.deepEqual(await status.json(), { unlocked: true });
  const lockedStatus = await worker.fetch(new Request('https://example.test/api/invite/status'), lockedEnv);
  assert.deepEqual(await lockedStatus.json(), { unlocked: false });

  const catalog = await worker.fetch(new Request('https://example.test/api/diet/catalog', { headers: { cookie: `${COOKIE}=${token}` } }), lockedEnv);
  assert.equal(catalog.status, 200);
  const tampered = await worker.fetch(new Request('https://example.test/api/diet/recognize', {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie: `${COOKIE}=${token}00` },
    body: JSON.stringify({ requestId: crypto.randomUUID(), text: '米饭' }),
  }), lockedEnv);
  assert.equal(tampered.status, 401);
});

test('missing INVITE_SECRET refuses to unlock and still blocks diet APIs', async () => {
  const env = { INVITE_CODES: CODE };
  const attempt = await worker.fetch(new Request('https://example.test/api/invite', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: CODE }),
  }), env);
  assert.equal(attempt.status, 503);
  assert.equal((await attempt.json()).error, '暂时无法核对邀请码，请稍后再试');
  assert.equal(attempt.headers.get('set-cookie'), null);
  const catalog = await worker.fetch(new Request('https://example.test/api/diet/catalog'), env);
  assert.equal(catalog.status, 401);
});

test('Secure is set for https and forwarded https, and omitted on plain http', async () => {
  const local = await postInvite(CODE, 'http://127.0.0.1:8765/api/invite');
  assert.doesNotMatch(local.headers.get('set-cookie'), /Secure/);
  const forwarded = await postInvite(CODE, 'http://127.0.0.1:8765/api/invite', { 'x-forwarded-proto': 'https' });
  assert.match(forwarded.headers.get('set-cookie'), /Secure/);
});

test('static pages still load while diet stays locked, and a foreign origin is rejected', async () => {
  const assets = { async fetch() { return new Response('<p>邀请页</p>', { headers: { 'content-type': 'text/html; charset=utf-8' } }); } };
  const page = await worker.fetch(new Request('https://example.test/'), { ...lockedEnv, ASSETS: assets });
  assert.equal(page.status, 200);
  assert.match(await page.text(), /邀请页/);
  const foreign = await postInvite(CODE, 'https://example.test/api/invite', { origin: 'https://evil.test' });
  assert.equal(foreign.status, 403);
});
