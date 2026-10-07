import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { friendlyMessage } from '../src/client/diet-page.js';

const banned = ['Demo', '交互演示', '关于这个 Demo', '试用版', '测试替身', 'DASHSCOPE', '大模型', 'USDA FoodData Central', '待审核', '千问', '百炼', '未配置'];

test('technical failures become a short message for the person using the app', () => {
  assert.equal(friendlyMessage('未配置 DASHSCOPE_API_KEY，这次由测试替身拆分食物和分量。'), '请稍后再试');
  assert.equal(friendlyMessage('模型服务暂时不可用', '暂时无法识别，请稍后再试或改为打字记录'), '暂时无法识别，请稍后再试或改为打字记录');
  assert.equal(friendlyMessage('请核对食物和分量，再记下来。'), '请核对食物和分量，再记下来。');
});

test('the phone shell does not show demo or developer wording', async () => {
  const files = ['public/index.html', 'src/client/diet-page.js'];
  for (const file of files) {
    const text = (await readFile(file, 'utf8')).replace(/\/(?:\\.|[^/\n])+\/[a-z]*/g, '');
    for (const word of banned) assert.equal(text.includes(word), false, `${file} still contains ${word}`);
  }
  const page = await readFile('src/client/diet-page.js', 'utf8');
  assert.match(page, /知养食物库/);
  assert.match(page, /薄荷健康/);
  assert.equal(page.includes('example-mark'), false);
});
