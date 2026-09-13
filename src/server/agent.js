import { recipes, topics, articles, lifestyle } from '../client/data.js';
import { validatePlan } from '../shared/records.js';
import { ruleVersion, isExplicitUrgent, isSensitive, urgentResponse, validateReply } from '../shared/safety.js';
import { herbRules, checkHerbs } from '../../rules/herbs.js';

const reply = (requestId, mode, text, extra = {}) => ({ requestId, mode, text, followUpQuestions: [], contentRefs: [], sources: [], ruleVersion, demo: true, ...extra });
const personalUnavailable = id => reply(id, 'professional_help', '这类情况需要结合个人状况、用药和专业评估。本演示不提供个体茶方、药材用量或治疗性饮食，也不建议自行更改药物。请向医生、药师或营养专业人员确认适用的生活调整。你仍可询问一般食养知识。');
const selectedSource = { id: 'demo-nutrition-2024', title: '中国公民健康素养（2024 年版）', url: 'https://www.nhc.gov.cn/xcs/c100123/202405/73a4927142f34152abed875634a3c13b.shtml' };
const knownNames = [...new Set(herbRules.flatMap(r => [...r.left, ...r.right]))].sort((a, b) => b.length - a.length);

export function validateRequest(body) {
  if (!body || typeof body !== 'object' || typeof body.requestId !== 'string' || !/^[\w-]{1,100}$/.test(body.requestId) || typeof body.message !== 'string' || !body.message.trim() || body.message.length > 1500 || !Array.isArray(body.history) || body.history.length > 16 || body.history.some(m => !m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || m.content.length > 6000)) throw new Error('请求格式无效');
  if (body.activePlan) validatePlan(body.activePlan);
  if (body.profileContext && ['goal', 'habit', 'preference'].some(k => body.profileContext[k] != null && (typeof body.profileContext[k] !== 'string' || body.profileContext[k].length > 80))) throw new Error('档案摘要无效');
  if (body.contentRef) {
    const list = { recipe: recipes, topic: topics, article: articles }[body.contentRef.type];
    if (!list?.some(r => r.id === body.contentRef.id)) throw new Error('关联内容不存在');
  }
  // No questionnaire version is approved for Agent use. Never trust client eligibility flags.
  return { requestId: body.requestId, message: body.message.trim(), history: body.history, profileContext: body.profileContext || {}, activePlan: body.activePlan, contentRef: body.contentRef, safetyContext: { urgent: body.safetyContext?.urgent === true, sensitive: body.safetyContext?.sensitive === true } };
}

function planExample(request, gain = false) {
  const noFish = request.profileContext.preference === '不喜欢吃鱼';
  const lunch = noFish ? recipes.find(r => r.id === 'dinner') : recipes.find(r => r.id === 'lunch');
  return { id: crypto.randomUUID(), revision: 1, baseRevision: null, provenance: 'demo', reviewStatus: 'pending', goal: gain ? '健康增重' : request.profileContext.goal || '均衡饮食', title: gain ? '三餐与加餐搭配示例' : '家常三餐搭配示例', meals: [
    { label: '早餐', value: recipes[0].title, recipeId: 'breakfast' },
    { label: '午餐', value: lunch.title, recipeId: lunch.id },
    { label: '晚餐', value: recipes[2].title, recipeId: 'dinner' },
    ...(gain ? [{ label: '加餐', value: recipes[4].title, recipeId: 'oats' }] : []),
  ], note: '仅体验方案保存和调整，不是针对身体情况生成的建议；未计算能量、份量或医疗适用性。' };
}

export function runDemoAgent(raw) {
  const req = validateRequest(raw), { requestId: id, message, history } = req;
  const users = [...history.filter(h => h.role === 'user').map(h => h.content), message];
  if (req.safetyContext.urgent || users.some(isExplicitUrgent)) return urgentResponse(id);
  const context = users.join('。');
  // General education is available to special populations; individual recommendations remain gated.
  const education = /什么是|科普|解释|是什么/.test(message) && !/我.{0,10}(怎么|能不能|可以|适合)|给我|用量|配方/.test(message);
  if (education) return reply(id, 'answer', /十八反|十九畏/.test(message) ? '“十八反、十九畏”是传统中药配伍禁忌的归纳。本产品将其作为禁配检查的一部分，还需要核对原料身份、现用药、特殊人群和证据。未命中某组禁忌不等于安全，也不据此提供自行配药方案。' : '健康养生咨询可以帮助理解一般食物搭配和生活习惯；体质类型不能凭一个症状或未经验证的问卷确定。当前是预设演示，尚不能检索和回答任意专业知识。');
  if (req.safetyContext.sensitive || isSensitive(context)) return personalUnavailable(id);
  const names = knownNames.filter(name => context.includes(name));
  const herbs = checkHerbs({ ingredients: names });
  if (herbs.status === 'blocked') return reply(id, 'professional_help', '你提到的原料触发了本产品的中药配伍禁忌规则，本助手不提供该搭配或变通用法。请携带完整原料和用药信息咨询医生或药师；用量少、错开时间或自行承担风险都不解除此限制。');
  if (/中药|药材|配方|十八反|十九畏|克数|几克|剂量|处方|停药|减药/.test(context) || names.length) return personalUnavailable(id);
  if (/暴瘦|只喝茶|不吃饭|绝食|催吐/.test(context)) return reply(id, 'clarify', '不提供极端限制饮食、只喝茶代替正餐或快速暴瘦的计划。可以重新说明希望改善的日常饮食习惯；当前演示也不计算个人减重目标。');
  if (/头痛|头疼|肚子痛|不舒服|便秘|嗓子|咽喉|湿气|浮肿/.test(context)) return reply(id, 'clarify', '我理解你想从食养与生活习惯角度了解这个感受。通常需要先澄清发生时间、是否持续或加重，以及相关健康背景；不能直接据此推荐茶方。当前是规则演示，无法完成个人评估。明显、持续或加重的不适，请咨询医生。');
  if (req.contentRef && !/生成三餐示例|生成增重示例/.test(message)) {
    const item = { recipe: recipes, topic: topics, article: articles }[req.contentRef.type].find(r => r.id === req.contentRef.id);
    return reply(id, 'answer', `正在讨论《${item.title}》。${item.note || item.boundary || item.intro} 当前可浏览内容和保存收藏，结合个人健康背景的自由解答等待真实模型接入。`, { contentRefs: [req.contentRef] });
  }
  if (req.activePlan) {
    if (req.activePlan.kind === 'routine') {
      const original = req.activePlan;
      const valid = original.meals.length === 3 && original.meals[0].value === lifestyle.points[0] && original.meals[2].value === lifestyle.points[1] && /^(按自己的作息安排|(?:[01]\d|2[0-3]):[0-5]\d)$/.test(original.meals[1].value);
      if (!valid) return reply(id, 'unavailable', '这份起居记录暂不支持自动调整，请从当前示例重新建立。');
      const time = message.match(/(?:改为|改到)\s*((?:[01]\d|2[0-3]):[0-5]\d)/)?.[1];
      if (!time) return reply(id, 'clarify', '可以把准备时间换成你自己选的时间，例如“把准备时间改为22:30”。这是个人日程记录，不代表适合所有人的睡眠建议。', { followUpQuestions: ['把准备时间改为22:30'] });
      const planDraft = { ...structuredClone(original), baseRevision: original.revision };
      planDraft.meals[1].value = time;
      return reply(id, 'answer', '已记录你选择的准备时间，其他安排保持原样。保存后更新这份起居记录。', { planDraft });
    }
    const supported = req.activePlan.meals.every(m => recipes.some(r => r.id === m.recipeId && r.title === m.value));
    if (!supported) return reply(id, 'unavailable', '这份旧版或非标准示例方案暂不支持自动调整，可以继续回看。请从当前三餐示例新建一份方案体验；原记录会保留。');
    if (/换掉鱼|不吃鱼|不喜欢.*鱼|不要鱼|改成豆腐/.test(message)) {
      const draft = structuredClone(req.activePlan);
      draft.baseRevision = draft.revision;
      draft.meals = draft.meals.map(m => m.recipeId === 'lunch' || /鱼/.test(m.value) ? { ...m, value: recipes[2].title, recipeId: 'dinner' } : m);
      if (JSON.stringify(draft.meals) === JSON.stringify(req.activePlan.meals)) return reply(id, 'clarify', '这份方案里已经没有鱼类搭配。当前可演示将鱼换成豆腐；其他自由调整待接入真实模型后支持。');
      return reply(id, 'answer', '已在你打开的这份方案上，把鱼类搭配换成豆腐示例。保存后更新同一份方案，其他餐次保留。', { planDraft: draft, contentRefs: [...new Set(draft.meals.map(m => m.recipeId).filter(Boolean))].map(id => ({ type: 'recipe', id })), sources: [selectedSource] });
    }
    return reply(id, 'clarify', '正在调整你打开的方案。当前可体验“不吃鱼，换成豆腐”；任意需求调整要等真实模型接入。', { followUpQuestions: ['不吃鱼，换成豆腐'] });
  }
  if (/生成作息示例/.test(message)) return reply(id, 'answer', '可以先保存一份起居安排示例，再从“我的方案”记录自己选择的准备时间。持续的睡眠困扰需要寻求专业帮助。', { planDraft: { id: crypto.randomUUID(), revision: 1, baseRevision: null, kind: 'routine', provenance: 'demo', reviewStatus: 'pending', goal: '规律作息', title: '晚间收尾安排示例', meals: [{ label: '留出空间', value: lifestyle.points[0] }, { label: '准备时间', value: '按自己的作息安排' }, { label: '放下待办', value: lifestyle.points[1] }], note: '日程记录示例，不评估或治疗睡眠问题。请按真实作息调整。' } });
  if (/生成三餐示例|生成增重示例/.test(message)) {
    const plan = planExample(req, /增重/.test(message));
    return reply(id, 'answer', '这是用于体验产品流程的预设搭配，已沿用你允许使用的饮食偏好。可以保存，再从“我的方案”继续调整。', { planDraft: plan, contentRefs: [...new Set(plan.meals.map(m => m.recipeId))].map(id => ({ type: 'recipe', id })), sources: [selectedSource] });
  }
  if (/三餐|减重|减肥|胖了|增重|增肥|怎么吃/.test(message)) return reply(id, 'clarify', '可以先聊你的饮食目标和用餐习惯。当前尚未接入真实模型，你可以先体验一份预设三餐示例的保存与调整；它不会根据健康问题给出个人饮食处方。', { followUpQuestions: [/增重|增肥/.test(message) ? '生成增重示例' : '生成三餐示例'] });
  if (/茶|食养/.test(message)) return reply(id, 'answer', '茶饮可以先从风味、原料与适用说明了解。当前内容尚未完成专业审核，因此只提供茶饮页面示例，不生成个性化中药茶方。', { contentRefs: [{ type: 'recipe', id: 'tea' }] });
  if (/作息|睡眠|晚睡/.test(message)) return reply(id, 'answer', '可以先记录自己的作息与睡眠机会，看看是否存在容易调整的生活安排。这里是一般知识示例，持续影响生活的睡眠困扰应寻求专业帮助。', { followUpQuestions: ['生成作息示例'] });
  return reply(id, 'unavailable', '你的问题可以属于知养未来承接的健康咨询范围。目前真实模型尚未接入，暂时不能给出可靠的自由问答。可以从首页的示例体验三餐安排、茶饮内容和本机记录功能。');
}

export function respond(raw) {
  const result = runDemoAgent(raw);
  validateReply(result, raw.requestId);
  if (result.planDraft) validatePlan(result.planDraft);
  for (const ref of result.contentRefs) {
    if (!{ recipe: recipes, topic: topics, article: articles }[ref.type]?.some(c => c.id === ref.id)) throw new Error('内容引用无效');
  }
  return result;
}
