import test from 'node:test';
import assert from 'node:assert/strict';
import { lanIpv4Addresses, previewRequestUrl, previewStartupLines, readPreviewBind } from '../scripts/preview-bind.mjs';

test('preview bind defaults to loopback and follows HOST and PORT', () => {
  assert.deepEqual(readPreviewBind({}), { host: '127.0.0.1', port: 8765 });
  assert.deepEqual(readPreviewBind({ HOST: ' 0.0.0.0 ', PORT: '8080' }), { host: '0.0.0.0', port: 8080 });
  assert.deepEqual(readPreviewBind({ PORT: 'nope' }), { host: '127.0.0.1', port: 8765 });
  assert.deepEqual(readPreviewBind({ PORT: '0' }), { host: '127.0.0.1', port: 8765 });
  assert.deepEqual(readPreviewBind({ PORT: '65536' }), { host: '127.0.0.1', port: 8765 });
});

test('binding all interfaces prints LAN links and the quota warning', () => {
  assert.deepEqual(previewStartupLines({ host: '127.0.0.1', port: 8765, addresses: ['192.168.1.8'] }), [
    'Preview ready at http://127.0.0.1:8765',
  ]);
  assert.deepEqual(previewStartupLines({ host: '0.0.0.0', port: 9000, addresses: ['192.168.1.8', '10.0.0.4'] }), [
    'Preview ready at http://127.0.0.1:9000',
    'http://192.168.1.8:9000',
    'http://10.0.0.4:9000',
    '同一 Wi-Fi 下的人都能用，会消耗你的模型和薄荷额度。',
  ]);
  assert.deepEqual(previewStartupLines({ host: '0.0.0.0', port: 8765, addresses: [] }).at(-1), '同一 Wi-Fi 下的人都能用，会消耗你的模型和薄荷额度。');
});

test('forwarded request URL keeps the browser host and the configured port', () => {
  assert.equal(previewRequestUrl(9000, '/api/diet/recognize', '192.168.1.8:9000'), 'http://192.168.1.8:9000/api/diet/recognize');
  assert.equal(previewRequestUrl(9000, '/api/diet/catalog'), 'http://127.0.0.1:9000/api/diet/catalog');
  assert.equal(previewRequestUrl(9000, '/x', 'not a host'), 'http://127.0.0.1:9000/x');
});

test('LAN address list keeps non-internal IPv4 only', () => {
  assert.deepEqual(lanIpv4Addresses({
    lo: [{ family: 'IPv4', internal: true, address: '127.0.0.1' }],
    en0: [{ family: 'IPv4', internal: false, address: '192.168.1.8' }, { family: 'IPv6', internal: false, address: 'fe80::1' }],
    eth0: [{ family: 4, internal: false, address: '10.0.0.4' }, { family: 4, internal: false, address: '10.0.0.4' }],
  }), ['192.168.1.8', '10.0.0.4']);
});
