export const PHOTO_LIMIT = 4;
export const PHOTO_MAX_BYTES = 8 * 1024 * 1024;
const PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export function takePhotos(existingCount, files) {
  const accepted = [];
  const rejected = [];
  const used = Number.isFinite(existingCount) && existingCount > 0 ? Math.floor(existingCount) : 0;
  for (const file of files || []) {
    if (used + accepted.length >= PHOTO_LIMIT) {
      rejected.push({ reason: 'limit' });
      continue;
    }
    if (!file || !PHOTO_TYPES.has(file.type)) {
      rejected.push({ reason: 'type' });
      continue;
    }
    if (!(file.size >= 0) || file.size > PHOTO_MAX_BYTES) {
      rejected.push({ reason: 'size' });
      continue;
    }
    accepted.push(file);
  }
  return { accepted, rejected };
}

export function photoRejectCopy(reason) {
  if (reason === 'limit') return '一次最多四张照片';
  if (reason === 'size') return '图片太大，请换一张较小的照片';
  return '请选择照片';
}

export function photoStatus(count, busy) {
  if (busy) return '正在看这一餐';
  if (count > 1) return '拖动照片可以调整顺序，识别时看最前面的一张';
  if (count === 1) return '可以直接拖动这张照片';
  return '';
}

export function reorderPhotos(photos, fromId, toIndex) {
  const next = photos.slice();
  const from = next.findIndex(photo => photo.id === fromId);
  if (from < 0) return next;
  const [item] = next.splice(from, 1);
  const index = Math.max(0, Math.min(Math.trunc(Number(toIndex) || 0), next.length));
  next.splice(index, 0, item);
  return next;
}

export function gapShift(before, after, x) {
  if (after && x > after.left + after.width / 2) return 'after';
  if (before && x < before.left + before.width / 2) return 'before';
  return 'stay';
}

export function clampPhotoPlace(x, y, bounds) {
  const maxX = Math.max(0, Number(bounds.trayWidth) - Number(bounds.photoWidth));
  const maxY = Math.max(0, Number(bounds.trayHeight) - Number(bounds.photoHeight));
  const nx = Number.isFinite(x) ? x : 0;
  const ny = Number.isFinite(y) ? y : 0;
  return {
    x: Math.round(Math.min(maxX, Math.max(0, nx))),
    y: Math.round(Math.min(maxY, Math.max(0, ny))),
  };
}

function px(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.round(n));
}

export function photoTrayHtml(photos, place, esc) {
  if (!photos.length) return '';
  const single = photos.length === 1;
  const items = photos.map((photo, index) => {
    const alt = single
      ? '这一餐的照片，可拖动'
      : `这一餐的照片 ${index + 1}${index === 0 ? '，识别时先看这张' : ''}，可拖动`;
    const style = single ? ` style="--photo-x:${px(place?.x, 8)}px;--photo-y:${px(place?.y, 8)}px"` : '';
    const tag = !single && index === 0 ? '<span class="composer-photo-tag">先看这张</span>' : '';
    return `<div class="composer-photo${index === 0 && !single ? ' is-cover' : ''}" data-photo-id="${esc(photo.id)}" data-photo-slot="${index}" draggable="false"${style}><img src="${esc(photo.url)}" alt="${esc(alt)}" draggable="false">${tag}<button type="button" class="composer-photo-remove" data-diet-action="remove-photo" data-photo-id="${esc(photo.id)}" aria-label="移除这张照片"><span aria-hidden="true">×</span></button></div>`;
  }).join('');
  return `<div class="composer-photos${single ? ' is-free' : ''}" data-photo-tray>${items}</div>`;
}
