const DEFAULT_BASE = 'https://dashscope.aliyuncs.com/compatible-mode/v1';

export function qwenConfig(env = {}) {
  const key = env.DASHSCOPE_API_KEY || '';
  return {
    apiKey: key,
    enabled: Boolean(key),
    baseUrl: (env.DASHSCOPE_BASE_URL || DEFAULT_BASE).replace(/\/$/, ''),
    visionModel: env.DASHSCOPE_VISION_MODEL || 'qwen3-vl-flash',
    textModel: env.DASHSCOPE_TEXT_MODEL || 'qwen-plus',
  };
}

export function extractJson(text) {
  const fenced = String(text ?? '').match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : String(text ?? '');
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('模型没有返回可解析的结果');
  return JSON.parse(raw.slice(start, end + 1));
}

export function readModelItems(payload) {
  const items = payload?.items;
  if (!Array.isArray(items) || !items.length || items.length > 12) throw new Error('模型返回的食物列表无效');
  return items.map(item => {
    const name = String(item?.name ?? '').trim().slice(0, 40);
    if (!name) throw new Error('模型返回的食物名为空');
    const grams = Number(item?.grams);
    return {
      name,
      portionLabel: String(item?.portionLabel ?? '').trim().slice(0, 20),
      grams: Number.isFinite(grams) ? Math.round(grams) : null,
    };
  });
}

export async function qwenChat({ config, model, messages }) {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { authorization: `Bearer ${config.apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model, messages, temperature: 0.2 }),
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error('模型服务暂时不可用');
  const body = await response.json();
  const text = body?.choices?.[0]?.message?.content;
  if (typeof text !== 'string' || !text.trim()) throw new Error('模型没有返回内容');
  return text;
}

export function stubParseText(text) {
  const normalized = String(text).replace(/加个/g, '，一个').replace(/加一/g, '，一').replace(/加/g, '，');
  const chunks = normalized.split(/，|、|和|配|以及|\+/).map(part => part.trim()).filter(Boolean);
  const items = chunks.map(chunk => {
    let rest = chunk.replace(/^(今天|刚刚|早上|早晨|中午|晚上|凌晨|早餐|午餐|晚餐|加餐|我吃了|吃了|来了)/, '').trim();
    const explicit = rest.match(/(\d+(?:\.\d+)?)\s*(克|g|Ｇ)/i);
    let grams = explicit ? Math.round(Number(explicit[1])) : null;
    let portionLabel = '一份';
    if (/小碗|小份/.test(rest)) portionLabel = '小';
    else if (/大碗|大份/.test(rest)) portionLabel = '大';
    else if (/中碗|中份|一碗|一中碗/.test(rest)) portionLabel = '中';
    else if (/一个|一只|一枚/.test(rest)) { portionLabel = '一个'; if (grams == null) grams = 50; }
    if (grams == null && portionLabel === '一份') grams = 150;
    rest = rest.replace(/(\d+(?:\.\d+)?)\s*(克|g|Ｇ)/ig, '');
    rest = rest.replace(/小碗|中碗|大碗|小份|中份|大份|一碗|一个|一只|一枚|一份|这碗|这盘/g, '');
    const name = rest.replace(/^[的了呢吧啊呀]+|[的了呢吧啊呀]+$/g, '').trim();
    return { name, portionLabel, grams };
  }).filter(item => item.name);
  if (!items.length) throw new Error('没有从这句话里拆出食物');
  return items.slice(0, 12);
}

export function stubImageItems() {
  return [
    { name: '米饭', portionLabel: '中', grams: 150 },
    { name: '鸡蛋', portionLabel: '一个', grams: 50 },
  ];
}
