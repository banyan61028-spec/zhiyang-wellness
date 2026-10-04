import { foodFromBooheeRecord, rankBooheeFoods } from '../shared/nutrition/boohee.js';
import { normalizeFoodName } from '../shared/nutrition/match.js';

const DEFAULT_BASE = 'https://api.boohee.com/open-apis';
const CACHE_LIMIT = 100;

export function createBooheeClient({
  apiKey = '',
  baseUrl = DEFAULT_BASE,
  fetch: fetchImpl = globalThis.fetch,
  timeoutMs = 8000,
  cacheTtlMs = 10 * 60 * 1000,
  now = Date.now,
  log = defaultLog,
} = {}) {
  const enabled = Boolean(apiKey);
  const root = String(baseUrl || DEFAULT_BASE).replace(/\/$/, '');
  const searchCache = new Map();
  const codeCache = new Map();

  function remember(food) {
    codeCache.set(food.booheeCode, { at: now(), food });
    trim(codeCache);
  }

  async function request(endpoint, url) {
    const started = now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey, accept: 'application/json' },
        redirect: 'error',
        signal: controller.signal,
      });
      if (!response.ok) {
        logCall(log, { endpoint, outcome: 'http_error', durationMs: now() - started, httpStatus: response.status, resultCount: null });
        throw failure('failed');
      }
      const payload = await response.json().catch(() => null);
      if (!payload || payload.code !== 0) {
        logCall(log, { endpoint, outcome: 'bad_response', durationMs: now() - started, httpStatus: response.status, resultCount: null });
        throw failure('failed');
      }
      return { payload, durationMs: now() - started, httpStatus: response.status };
    } catch (error) {
      if (error?.code === 'failed') throw error;
      const outcome = controller.signal.aborted || error?.name === 'AbortError' || error?.name === 'TimeoutError' ? 'timeout' : 'failed';
      logCall(log, { endpoint, outcome, durationMs: now() - started, httpStatus: null, resultCount: null });
      throw failure(outcome);
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    enabled,
    async matchName(keyword) {
      const query = [...String(keyword || '').trim()].slice(0, 30).join('');
      if (!query) return { status: 'empty', candidates: [] };
      if (!enabled) {
        logCall(log, { endpoint: 'food/search', outcome: 'no_key', durationMs: 0, httpStatus: null, resultCount: 0 });
        return { status: 'no_key', candidates: [] };
      }
      const cacheKey = normalizeFoodName(query);
      const cached = searchCache.get(cacheKey);
      if (cached && now() - cached.at < cacheTtlMs) {
        logCall(log, { endpoint: 'food/search', outcome: 'cache', durationMs: 0, httpStatus: null, resultCount: cached.resultCount });
        return cached.result;
      }
      const url = new URL(`${root}/v1/food/search`);
      url.searchParams.set('keyword', query);
      url.searchParams.set('page', '1');
      url.searchParams.set('per_page', '20');
      try {
        const { payload, durationMs, httpStatus } = await request('food/search', url);
        const records = Array.isArray(payload.data?.foods) ? payload.data.foods.slice(0, 20) : [];
        for (const food of records.map(foodFromBooheeRecord).filter(Boolean)) remember(food);
        const result = rankBooheeFoods(query, records);
        searchCache.set(cacheKey, { at: now(), result, resultCount: records.length });
        trim(searchCache);
        logCall(log, { endpoint: 'food/search', outcome: 'ok', durationMs, httpStatus, resultCount: records.length });
        return result;
      } catch (error) {
        return { status: 'failed', reason: error.code === 'timeout' ? 'timeout' : 'failed', candidates: [] };
      }
    },
    async foodByCode(code) {
      if (!/^[A-Za-z0-9_-]{1,64}$/.test(String(code || ''))) return { status: 'empty' };
      if (!enabled) {
        logCall(log, { endpoint: 'food/detail', outcome: 'no_key', durationMs: 0, httpStatus: null, resultCount: 0 });
        return { status: 'no_key' };
      }
      const cached = codeCache.get(code);
      if (cached && now() - cached.at < cacheTtlMs) {
        logCall(log, { endpoint: 'food/detail', outcome: 'cache', durationMs: 0, httpStatus: null, resultCount: 1 });
        return { status: 'ok', food: cached.food };
      }
      const url = new URL(`${root}/v1/food/detail`);
      url.searchParams.set('code', code);
      try {
        const { payload, durationMs, httpStatus } = await request('food/detail', url);
        const food = foodFromBooheeRecord(payload.data);
        if (!food || food.booheeCode !== code) {
          logCall(log, { endpoint: 'food/detail', outcome: 'bad_response', durationMs, httpStatus, resultCount: 0 });
          return { status: 'empty' };
        }
        remember(food);
        logCall(log, { endpoint: 'food/detail', outcome: 'ok', durationMs, httpStatus, resultCount: 1 });
        return { status: 'ok', food };
      } catch (error) {
        return { status: 'failed', reason: error.code === 'timeout' ? 'timeout' : 'failed' };
      }
    },
  };
}

const clients = new Map();

export function booheeFromEnv(env = {}) {
  if (env.booheeClient) return env.booheeClient;
  const apiKey = env.BOOHEE_API_KEY || '';
  const baseUrl = env.BOOHEE_BASE_URL || DEFAULT_BASE;
  const cacheKey = `${baseUrl}\n${apiKey}`;
  if (!clients.has(cacheKey)) clients.set(cacheKey, createBooheeClient({ apiKey, baseUrl }));
  return clients.get(cacheKey);
}

function logCall(log, entry) {
  log({
    component: 'boohee',
    endpoint: entry.endpoint,
    outcome: entry.outcome,
    durationMs: entry.durationMs,
    httpStatus: entry.httpStatus,
    resultCount: entry.resultCount,
  });
}

function defaultLog(entry) {
  console.info(JSON.stringify(entry));
}

function failure(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}

function trim(cache) {
  while (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value);
}
