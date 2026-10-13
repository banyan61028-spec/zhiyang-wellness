import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('pointer clicks drop the rectangular focus outline and keyboard keeps a soft ring', async () => {
  const css = await readFile(new URL('../src/client/styles.css', import.meta.url), 'utf8');
  const harsh = css.indexOf('outline:3px solid var(--color-primary)');
  const pointer = css.indexOf('html.using-pointer');
  assert.ok(harsh > 0);
  assert.ok(pointer > harsh);
  assert.match(css, /html\.using-pointer :is\(button,a,input,select,textarea,summary\):focus-visible\{outline:none\}/);
  assert.match(css, /html:not\(\.using-pointer\) :is\(button,a,summary,input,textarea,select\):focus-visible:not\(\.composer-photo-remove\)\{outline:none;box-shadow:0 0 0 3px rgba\(255,252,250,\.96\),0 0 0 6px rgba\(31,77,58,\.2\)\}/);
  const app = await readFile(new URL('../src/client/app.js', import.meta.url), 'utf8');
  assert.match(app, /using-pointer/);
  assert.match(app, /pointerdown/);
});

test('the meal tag opens as chips instead of a native select', async () => {
  const page = await readFile(new URL('../src/client/diet-page.js', import.meta.url), 'utf8');
  assert.equal(page.includes('<select name="meal"'), false);
  assert.equal(page.includes('select[name="meal"]'), false);
  assert.match(page, /data-diet-action="toggle-meal"/);
  assert.match(page, /data-diet-action="pick-meal"/);
  assert.match(page, /<input type="hidden" name="meal"/);
  assert.match(page, /querySelector\('\[name="meal"\]'\)/);
  assert.match(page, /早餐/);
  assert.match(page, /晚餐/);
});

test('press feedback covers pills, tabs, and rows', async () => {
  const css = await readFile(new URL('../src/client/styles.css', import.meta.url), 'utf8');
  assert.match(css, /button:active:not\(:disabled\)\{transform:scale\(\.975\)\}/);
  assert.match(css, /\.meal-chip-trigger:active:not\(:disabled\)/);
  assert.match(css, /\.navigation \.nav-item:active\{transform:scale\(\.96\)\}/);
  assert.match(css, /\.filter-row \.filter-chip:active/);
  assert.match(css, /\.recipe-row:active/);
  assert.match(css, /\.settings-row:active/);
  assert.match(css, /\.meal-menu\[hidden\]\{display:none\}/);
});
