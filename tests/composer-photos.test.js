import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  PHOTO_LIMIT,
  clampPhotoPlace,
  gapShift,
  photoRejectCopy,
  photoStatus,
  photoTrayHtml,
  reorderPhotos,
  takePhotos,
} from '../src/client/composer-photos.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const file = (type, size = 1000) => ({ type, size, name: 'meal.jpg' });

test('accepts jpeg, png and webp up to four photos', () => {
  const { accepted, rejected } = takePhotos(0, [
    file('image/jpeg'),
    file('image/png'),
    file('image/webp'),
    file('image/gif'),
    file('image/jpeg', 8 * 1024 * 1024 + 1),
    file('image/jpeg'),
    file('image/jpeg'),
  ]);
  assert.equal(accepted.length, PHOTO_LIMIT);
  assert.deepEqual(accepted.map(item => item.type), ['image/jpeg', 'image/png', 'image/webp', 'image/jpeg']);
  assert.deepEqual(rejected.map(item => item.reason), ['type', 'size', 'limit']);
});

test('a full tray only reports the limit', () => {
  const { accepted, rejected } = takePhotos(4, [file('image/jpeg')]);
  assert.equal(accepted.length, 0);
  assert.equal(photoRejectCopy(rejected[0].reason), '一次最多四张照片');
  assert.equal(photoRejectCopy('size'), '图片太大，请换一张较小的照片');
  assert.equal(photoRejectCopy('type'), '请选择照片');
});

test('photo copy stays in product language', () => {
  assert.equal(photoStatus(0, false), '');
  assert.equal(photoStatus(1, true), '正在看这一餐');
  assert.equal(photoStatus(1, false), '可以直接拖动这张照片');
  assert.match(photoStatus(2, false), /拖动照片可以调整顺序/);
  assert.match(photoStatus(3, false), /最前面/);
  for (const text of [photoStatus(1, false), photoStatus(2, false), photoRejectCopy('limit')]) {
    assert.equal(/Demo|示例|模型/.test(text), false);
  }
});

test('reorder moves a photo to the requested slot', () => {
  const photos = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  assert.deepEqual(reorderPhotos(photos, 'a', 2).map(item => item.id), ['b', 'c', 'a']);
  assert.deepEqual(reorderPhotos(photos, 'c', 0).map(item => item.id), ['c', 'a', 'b']);
  assert.deepEqual(reorderPhotos(photos, 'missing', 0).map(item => item.id), ['a', 'b', 'c']);
  assert.deepEqual(photos.map(item => item.id), ['a', 'b', 'c']);
});

test('gap only swaps with the neighbor the pointer has crossed', () => {
  const before = { left: 0, width: 72 };
  const after = { left: 80, width: 72 };
  assert.equal(gapShift(before, after, 40), 'stay');
  assert.equal(gapShift(before, after, 80 + 36), 'stay');
  assert.equal(gapShift(before, after, 80 + 37), 'after');
  assert.equal(gapShift(before, after, 35), 'before');
  assert.equal(gapShift(null, after, 10), 'stay');
});

test('a single photo stays inside the composer tray', () => {
  const bounds = { trayWidth: 306, trayHeight: 112, photoWidth: 72, photoHeight: 72 };
  assert.deepEqual(clampPhotoPlace(-20, 4, bounds), { x: 0, y: 4 });
  assert.deepEqual(clampPhotoPlace(400, 80, bounds), { x: 234, y: 40 });
  assert.deepEqual(clampPhotoPlace(Number.NaN, 12.4, bounds), { x: 0, y: 12 });
});

test('the tray shows a preview and a drag handle', () => {
  const one = photoTrayHtml([{ id: 'p1', url: 'blob:meal' }], { x: 24, y: 8 }, esc);
  assert.match(one, /class="composer-photos is-free"/);
  assert.match(one, /src="blob:meal"/);
  assert.match(one, /alt="这一餐的照片，可拖动"/);
  assert.match(one, /--photo-x:24px;--photo-y:8px/);
  assert.match(one, /aria-label="移除这张照片"/);
  assert.equal(one.includes('先看这张'), false);

  const many = photoTrayHtml([
    { id: 'a"b', url: 'blob:a&b' },
    { id: 'c', url: 'blob:c' },
  ], { x: 0, y: 0 }, esc);
  assert.equal(many.includes('is-free'), false);
  assert.match(many, /data-photo-id="a&quot;b"/);
  assert.match(many, /src="blob:a&amp;b"/);
  assert.match(many, /先看这张/);
  assert.match(many, /识别时先看这张/);
  assert.equal(many.split('先看这张').length - 1, 2);
});

test('the record composer keeps the camera input and renders the tray', async () => {
  const page = await readFile(new URL('../src/client/diet-page.js', import.meta.url), 'utf8');
  assert.match(page, /<input id="meal-photo" name="photo" type="file" accept="image\/jpeg,image\/png,image\/webp" capture="environment">/);
  assert.match(page, /photoTrayHtml\(pendingPhotos, photoPlace, ctx\.esc\)/);
  assert.match(page, /pendingPhotos\[0\]\?\.file/);
});
