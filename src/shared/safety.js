export const ruleVersion = 'zy-health-v0.2';
export const urgentText = '你描述的情况需要立即获得专业帮助。请立即联系当地急救服务（中国大陆拨打 120），或请身边的人协助联系。请不要等待本助手回复或继续寻找食养方案。';
// These deterministic examples support prototype regression only. They are not a validated triage classifier.
const urgentPattern = /呼吸困难|无法吞咽|喘不过气|不能呼吸|胸痛|呕血|昏迷|叫不醒|突然.{0,6}(最严重|剧烈).{0,3}头痛|头痛.{0,8}(说话不清|一侧无力)|想自杀|准备自杀|不想活|吃了.{0,5}(一瓶|大量).{0,5}药/g;
export function isExplicitUrgent(message) {
  return String(message).split(/[，。！？；\n]/).some(clause => {
    return [...clause.matchAll(urgentPattern)].some(match => {
    const prefix = clause.slice(0, match.index);
    if (/^(请问)?(什么是|科普|解释|如果|假如)/.test(clause)) return false;
    if (/以前|曾经|去年/.test(prefix) && !/现在|目前|此刻/.test(prefix)) return false;
    return !/(没有|并无|否认|不是|不伴有|无)(任何)?$/.test(prefix);
    });
  });
}
export const isSensitive = text => /怀孕|孕妇|孕期|备孕|哺乳|婴儿|宝宝|儿童|未成年|高龄|老人|[七八九]十岁|[789]\d岁|基础病|糖尿病|高血压|肾病|肝病|心脏病|服药|吃药|用药|过敏|抗凝|手术|正在治疗|药名不清/.test(text);
export function urgentResponse(requestId) {
  return { requestId, mode: 'urgent_help', text: urgentText, contentRefs: [], sources: [], followUpQuestions: [], ruleVersion, demo: true };
}
export function validateReply(reply, requestId) {
  if (!reply || reply.requestId !== requestId || !['answer', 'clarify', 'professional_help', 'urgent_help', 'unavailable'].includes(reply.mode) || typeof reply.text !== 'string' || reply.text.length > 6000 || !Array.isArray(reply.contentRefs) || !Array.isArray(reply.followUpQuestions) || reply.followUpQuestions.some(q => typeof q !== 'string' || q.length > 200) || !Array.isArray(reply.sources) || reply.ruleVersion !== ruleVersion) throw new Error('回复格式校验未通过');
  if (reply.mode !== 'answer' && (Object.hasOwn(reply, 'planDraft') || reply.contentRefs.length)) throw new Error('此类回复禁止附带方案');
  if (reply.mode === 'urgent_help' && (reply.followUpQuestions.length || reply.sources.length || reply.text !== urgentText)) throw new Error('紧急求助回复未通过校验');
  return reply;
}
