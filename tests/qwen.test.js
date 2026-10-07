import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanModelFoodName, qwenChat, qwenConfig, readModelItems } from '../src/server/qwen.js';
import { loadNutrition, mealMessages, recognizeMeal } from '../src/server/diet.js';
import { createBooheeClient } from '../src/server/boohee.js';

const source = loadNutrition().source;

test('qwen requests disable thinking by default, honor env overrides, and retry a 400 without that field', async () => {
  const defaults = qwenConfig({});
  assert.equal(defaults.enableThinking, false);
  assert.equal(defaults.timeoutMs, 40000);
  assert.equal(defaults.baseUrl, 'https://dashscope.aliyuncs.com/compatible-mode/v1');
  const configured = qwenConfig({
    DASHSCOPE_API_KEY: 'test-key',
    DASHSCOPE_BASE_URL: 'https://maas-api.antdigital.com/v1/',
    DASHSCOPE_TEXT_MODEL: 'qwen3.8-flash',
    DASHSCOPE_VISION_MODEL: 'qwen3.8-flash',
    DASHSCOPE_ENABLE_THINKING: 'true',
    DASHSCOPE_TIMEOUT_MS: '15000',
  });
  assert.equal(configured.enabled, true);
  assert.equal(configured.baseUrl, 'https://maas-api.antdigital.com/v1');
  assert.equal(configured.textModel, 'qwen3.8-flash');
  assert.equal(configured.visionModel, 'qwen3.8-flash');
  assert.equal(configured.enableThinking, true);
  assert.equal(configured.timeoutMs, 15000);
  assert.equal(qwenConfig({ DASHSCOPE_ENABLE_THINKING: 'false', DASHSCOPE_TIMEOUT_MS: 'abc' }).enableThinking, false);
  assert.equal(qwenConfig({ DASHSCOPE_TIMEOUT_MS: 'abc' }).timeoutMs, 40000);

  const bodies = [];
  let calls = 0;
  const text = await qwenChat({
    config: qwenConfig({ DASHSCOPE_API_KEY: 'test-key', DASHSCOPE_BASE_URL: 'https://maas-api.antdigital.com/v1' }),
    model: 'qwen3.8-flash',
    messages: [{ role: 'user', content: '中午一碗米饭加番茄炒蛋' }],
    fetchImpl: async (url, options) => {
      calls += 1;
      assert.equal(String(url), 'https://maas-api.antdigital.com/v1/chat/completions');
      assert.equal(options.headers.authorization, 'Bearer test-key');
      const payload = JSON.parse(options.body);
      bodies.push(payload);
      assert.equal(JSON.stringify(payload).includes('test-key'), false);
      if (calls === 1) return new Response('unknown parameter enable_thinking', { status: 400 });
      return Response.json({ choices: [{ message: { content: '{"items":[{"name":"番茄炒蛋"}]}' } }] });
    },
  });
  assert.match(text, /番茄炒蛋/);
  assert.equal(bodies[0].enable_thinking, false);
  assert.equal(bodies[0].model, 'qwen3.8-flash');
  assert.equal(Object.hasOwn(bodies[1], 'enable_thinking'), false);
  assert.equal(calls, 2);

  let thinkingCalls = 0;
  await qwenChat({
    config: qwenConfig({ DASHSCOPE_API_KEY: 'test-key', DASHSCOPE_ENABLE_THINKING: 'true' }),
    model: 'qwen3.8-flash',
    messages: [{ role: 'user', content: 'hi' }],
    fetchImpl: async (_url, options) => {
      thinkingCalls += 1;
      assert.equal(JSON.parse(options.body).enable_thinking, true);
      return new Response('no', { status: 503 });
    },
  }).then(() => { throw new Error('should fail'); }, error => assert.equal(error.message, '模型服务暂时不可用'));
  assert.equal(thinkingCalls, 1);

  const started = Date.now();
  await assert.rejects(qwenChat({
    config: { ...qwenConfig({ DASHSCOPE_API_KEY: 'test-key' }), timeoutMs: 30 },
    model: 'qwen3.8-flash',
    messages: [{ role: 'user', content: 'hi' }],
    fetchImpl: (_url, options) => new Promise((_resolve, reject) => {
      const abort = () => {
        const error = new Error('aborted');
        error.name = 'AbortError';
        reject(error);
      };
      if (options.signal.aborted) abort();
      else options.signal.addEventListener('abort', abort, { once: true });
    }),
  }), /模型服务暂时不可用/);
  assert.ok(Date.now() - started < 1000);
});

test('a named dish stays whole for Boohee, and the prompt refuses to split it into ingredients', async () => {
  const keywords = [];
  let instruction = '';
  const env = {
    DASHSCOPE_API_KEY: 'test-key',
    DASHSCOPE_TEXT_MODEL: 'qwen3.8-flash',
    DASHSCOPE_VISION_MODEL: 'qwen3.8-flash',
    qwenFetch: async (_url, options) => {
      const payload = JSON.parse(options.body);
      instruction = payload.messages[0].content;
      assert.equal(payload.enable_thinking, false);
      assert.equal(payload.model, 'qwen3.8-flash');
      return Response.json({
        choices: [{ message: { content: JSON.stringify({ items: [
          { name: '米饭', portionLabel: '一碗', grams: 200 },
          { name: '番茄炒蛋', portionLabel: '一份', grams: 200 },
          { name: '苹果', portionLabel: '一个', grams: 150 },
        ] }) } }],
      });
    },
    booheeClient: createBooheeClient({
      apiKey: 'boohee-key',
      fetch: async (url) => {
        keywords.push(new URL(String(url)).searchParams.get('keyword'));
        return Response.json({ code: 0, data: { foods: [
          { code: 'fanqiechaodan', name: '番茄炒蛋', calories: 84, protein: 4.7, fat: 5.96, carbohydrate: 3.52 },
        ] } });
      },
    }),
  };
  const draft = await recognizeMeal({ text: '中午一碗米饭加番茄炒蛋，还有一个苹果' }, env, source, crypto.randomUUID());
  assert.deepEqual(draft.items.map(item => item.name), ['米饭', '番茄炒蛋', '苹果']);
  assert.equal(draft.items[0].nutrition.source, 'USDA FoodData Central（示例）');
  assert.equal(draft.items[1].foodId, 'boohee:fanqiechaodan');
  assert.equal(draft.items[1].nutrition.kcal, 168);
  assert.equal(draft.items[2].foodId, 'apple');
  assert.deepEqual(keywords, ['番茄炒蛋']);
  assert.match(instruction, /番茄炒蛋/);
  assert.match(instruction, /红烧肉/);
  assert.match(instruction, /牛肉面/);
  assert.match(instruction, /不要拆成原料/);
  assert.match(instruction, /不要再把这道菜的原料重复列出来/);
  assert.match(instruction, /又写菜名又写原料/);
  assert.match(instruction, /name 只输出一个简短菜名/);
  assert.match(instruction, /不要带别名/);
  assert.match(instruction, /不要加括号/);
  assert.match(instruction, /米饭：白饭、蒸米饭、大米饭/);
  assert.equal(instruction.includes('米饭（白饭'), false);
  const photo = mealMessages({ text: '', image: 'data:image/jpeg;base64,aaaa', source });
  assert.equal(photo[0].content, instruction);
  assert.match(photo[1].content[1].text, /照片/);
});

test('alias parentheses copied from the prompt are removed before matching', async () => {
  assert.equal(cleanModelFoodName('米饭（白饭、蒸米饭、大米饭）'), '米饭');
  assert.equal(cleanModelFoodName('  苹果 (红富士)  '), '苹果');
  assert.equal(cleanModelFoodName('煮小米（干饭式）'), '煮小米');
  assert.equal(cleanModelFoodName('米饭（白饭）（蒸米饭）'), '米饭');
  assert.equal(cleanModelFoodName('米\u3000饭（白饭、蒸'), '米饭');
  assert.deepEqual(readModelItems({ items: [{ name: '米饭（白饭、蒸米饭、大米饭）', portionLabel: '一碗', grams: 200 }] }).map(item => item.name), ['米饭']);
  assert.throws(() => readModelItems({ items: [{ name: '（白饭、蒸米饭）' }] }), /食物名为空/);

  const keywords = [];
  const draft = await recognizeMeal({ imageDataUrl: 'data:image/jpeg;base64,aaaa' }, {
    DASHSCOPE_API_KEY: 'test-key',
    DASHSCOPE_VISION_MODEL: 'qwen3.8-flash',
    qwenFetch: async (_url, options) => Response.json({
      choices: [{ message: { content: JSON.stringify({ items: [
        { name: '米饭（白饭、蒸米饭、大米饭）', portionLabel: '中', grams: 150 },
      ] }) } }],
    }),
    booheeClient: createBooheeClient({
      apiKey: 'boohee-key',
      fetch: async (url) => {
        keywords.push(new URL(String(url)).searchParams.get('keyword'));
        return Response.json({ code: 0, data: { foods: [] } });
      },
    }),
  }, source, crypto.randomUUID());
  assert.equal(draft.items[0].name, '米饭');
  assert.equal(draft.items[0].foodId, 'rice-cooked');
  assert.equal(draft.items[0].nutrition.kcal, 195);
  assert.deepEqual(keywords, []);
});
