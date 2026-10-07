import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createId } from '../src/shared/id.js';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

test('createId uses randomUUID when the browser provides it', () => {
  let fallback = 0;
  const id = createId({ randomUUID: () => 'from-random-uuid', getRandomValues() { fallback += 1; } });
  assert.equal(id, 'from-random-uuid');
  assert.equal(fallback, 0);
});

test('createId falls back to getRandomValues outside a secure context', () => {
  const id = createId({
    getRandomValues(bytes) {
      bytes.set([0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff]);
    },
  });
  assert.equal(id, '00112233-4455-4677-8899-aabbccddeeff');
  assert.match(id, uuid);
});

test('createId refuses when neither generator exists', () => {
  assert.throws(() => createId({}), /无法生成编号/);
});

async function sourceFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...await sourceFiles(path));
    else if (entry.name.endsWith('.js')) found.push(path);
  }
  return found;
}

test('browser code does not call secure-context-only APIs', async () => {
  const files = [...await sourceFiles('src/client'), 'src/shared/records.js', 'src/shared/assessment.js', 'src/shared/id.js'];
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    assert.equal(text.includes('crypto.randomUUID'), false, file);
    assert.equal(text.includes('navigator.clipboard'), false, file);
    assert.equal(text.includes('crypto.subtle'), false, file);
    assert.equal(text.includes('getUserMedia'), false, file);
  }
  const page = await readFile('src/client/diet-page.js', 'utf8');
  assert.match(page, /<input id="meal-photo" name="photo" type="file" accept="image\/jpeg,image\/png,image\/webp" capture="environment">/);
});
