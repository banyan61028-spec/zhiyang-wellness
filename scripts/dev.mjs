import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import worker from '../dist/server/index.js';
const root = resolve('dist/client');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const env = { ASSETS: { async fetch(req) {
  const name = new URL(req.url).pathname;
  const path = resolve(root, '.' + decodeURIComponent(name === '/' ? '/index.html' : name));
  if (!path.startsWith(root + '/')) return new Response('Forbidden', { status: 403 });
  try { return new Response(await readFile(path), { headers: { 'content-type': types[extname(path)] || 'application/octet-stream', 'cache-control': 'no-store' } }); }
  catch { return new Response('Not found', { status: 404 }); }
} } };
createServer(async (req, res) => {
  try {
    const request = new Request(`http://127.0.0.1:8765${req.url}`, { method: req.method, headers: req.headers, ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: req, duplex: 'half' } : {}) });
    const response = await worker.fetch(request, env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch { res.writeHead(500); res.end('Preview unavailable'); }
}).listen(8765, '127.0.0.1', () => console.log('Preview ready at http://127.0.0.1:8765'));
