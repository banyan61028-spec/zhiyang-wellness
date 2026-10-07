import { networkInterfaces } from 'node:os';

export function readPreviewBind(env = {}) {
  const host = String(env.HOST ?? '').trim() || (String(env.ZHIYANG_START ?? '') === '1' ? '0.0.0.0' : '127.0.0.1');
  const raw = String(env.PORT ?? '').trim();
  let port = 8765;
  if (raw) {
    const parsed = Number(raw);
    if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 65535) port = parsed;
  }
  return { host, port };
}

export function lanIpv4Addresses(interfaces = networkInterfaces()) {
  const seen = new Set();
  for (const entries of Object.values(interfaces || {})) {
    for (const entry of entries || []) {
      const family = entry.family === 'IPv4' || entry.family === 4;
      if (!family || entry.internal || !entry.address || seen.has(entry.address)) continue;
      seen.add(entry.address);
    }
  }
  return [...seen];
}

export function previewStartupLines({ host, port, addresses = [] }) {
  const lines = [host === '127.0.0.1' || host === '0.0.0.0'
    ? `Preview ready at http://127.0.0.1:${port}`
    : `Preview ready at http://${host}:${port}`];
  if (host !== '0.0.0.0') return lines;
  if (addresses.length) {
    for (const address of addresses) lines.push(`http://${address}:${port}`);
  } else {
    lines.push('没有发现局域网 IPv4，手机暂时打不开。');
  }
  lines.push('同一 Wi-Fi 下的人都能用，会消耗你的模型和薄荷额度。');
  return lines;
}

export function previewRequestUrl(port, url = '/', hostHeader = '') {
  const path = typeof url === 'string' && url.startsWith('/') ? url : '/';
  const header = String(hostHeader ?? '').trim();
  const host = /^[A-Za-z0-9.:[\]-]+$/.test(header) ? header : `127.0.0.1:${port}`;
  return `http://${host}${path}`;
}
