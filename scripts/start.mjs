import { access } from 'node:fs/promises';
import { spawn } from 'node:child_process';

async function distReady() {
  await access(new URL('../dist/server/index.js', import.meta.url));
  await access(new URL('../dist/client/index.html', import.meta.url));
}

try {
  await distReady();
} catch {
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', resolve);
  });
  if (code !== 0) process.exit(code || 1);
}

process.env.ZHIYANG_START = '1';
await import('./dev.mjs');
