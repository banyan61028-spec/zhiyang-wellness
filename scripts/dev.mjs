import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import worker from '../dist/server/index.js';

async function loadDotEnv() {
  try {
    const text = await readFile('.env', 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const index = trimmed.indexOf('=');
      if (index < 1) continue;
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      if (process.env[key] == null) process.env[key] = value;
    }
  } catch { /* .env is optional */ }
}
await loadDotEnv();
const root = resolve('dist/client');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const env = {
  DASHSCOPE_API_KEY: process.env.DASHSCOPE_API_KEY || '',
  DASHSCOPE_BASE_URL: process.env.DASHSCOPE_BASE_URL || '',
  DASHSCOPE_VISION_MODEL: process.env.DASHSCOPE_VISION_MODEL || '',
  DASHSCOPE_TEXT_MODEL: process.env.DASHSCOPE_TEXT_MODEL || '',
  NUTRITION_FOODS_CSV: await readFile('data/nutrition/foods.csv', 'utf8'),
  NUTRITION_RECIPES_CSV: await readFile('data/nutrition/recipes.csv', 'utf8'),
  NUTRITION_CONFIG: await readFile('data/nutrition/config.json', 'utf8'),
  ASSETS: { async fetch(req) {
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
