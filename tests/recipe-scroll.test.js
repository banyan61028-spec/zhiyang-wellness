import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('opened recipe cards scroll inside the detail sheet', async () => {
  const css = await readFile('src/client/styles.css', 'utf8');
  const rule = css.match(/\.detail-dialog\{[^}]+\}/g)?.find(block => block.includes('overflow'));
  assert.ok(rule, 'detail dialog should declare overflow');
  assert.match(rule, /overflow-y:\s*auto/);
  assert.doesNotMatch(rule, /overflow:\s*hidden/);
  assert.match(rule, /overscroll-behavior:\s*contain/);
});

test('recipe card list keeps vertical panning on the cards', async () => {
  const css = await readFile('src/client/styles.css', 'utf8');
  const list = css.match(/\.recipe-list\{[^}]+\}/);
  const row = css.match(/\.recipe-row\{[^}]+\}/);
  assert.ok(list);
  assert.ok(row);
  assert.match(list[0], /touch-action:\s*pan-y/);
  assert.match(row[0], /touch-action:\s*pan-y/);
  assert.doesNotMatch(list[0], /overflow:\s*hidden/);
  assert.doesNotMatch(row[0], /max-height/);
});
