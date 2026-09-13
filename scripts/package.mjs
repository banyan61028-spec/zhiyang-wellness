// Packaging for this custom (non-vinext) Worker; build artifacts only.
import { readFile, readdir } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';
import { spawnSync } from 'node:child_process';
const archive = process.argv[2];
if (!archive || !isAbsolute(archive) || !archive.endsWith('.tar.gz')) throw new Error('Supply an absolute .tar.gz output path');
const manifest = JSON.parse(await readFile('.openai/hosting.json', 'utf8'));
const built = JSON.parse(await readFile('dist/.openai/hosting.json', 'utf8'));
if (manifest.project_id !== built.project_id || manifest.static) throw new Error('Expected matching Worker manifests');
for (const path of ['dist/server/index.js', 'dist/client/index.html', 'dist/client/app.js']) await readFile(path);
const entries = await readdir('dist');
if (entries.some(name => !['.openai', 'server', 'client'].includes(name))) throw new Error('Unexpected build output');
const result = spawnSync('tar', ['-czf', archive, '.openai/hosting.json', 'dist'], { cwd: resolve('.'), stdio: 'inherit' });
if (result.status !== 0) throw new Error('Archive creation failed');
const listing = spawnSync('tar', ['-tzf', archive], { encoding: 'utf8' });
if (listing.status !== 0 || !listing.stdout.includes('dist/server/index.js') || !listing.stdout.includes('dist/client/index.html') || /(?:node_modules|\.env|\.git\/)/.test(listing.stdout)) throw new Error('Archive verification failed');
console.log('Verified Worker archive: ' + archive);
