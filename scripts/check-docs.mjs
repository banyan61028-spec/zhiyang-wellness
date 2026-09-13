import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
const files = ['README.md', ...(await readdir('docs')).filter(p => p.endsWith('.md')).map(p => `docs/${p}`)];
let count = 0;
for (const file of files) {
  for (const [, link] of (await readFile(file, 'utf8')).matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(https?:|#)/.test(link)) continue;
    await access(resolve(dirname(file), link.split('#')[0])); count++;
  }
}
console.log(`${files.length} documents, ${count} local links verified.`);
