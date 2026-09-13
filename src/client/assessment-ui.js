import { questionnaire, options, assessmentRecord } from '../shared/assessment.js';
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export function createAssessmentUI({ show, storage, changed, notify }) {
  let answers = [], step = 0, result = null, running = false, epoch = 0, writing = Promise.resolve();
  const questions = questionnaire.order.map(id => questionnaire.questions.find(q => q.id === id));
  const body = html => show(`<div class="detail-body assessment-body">${html}</div>`, '日常感受试测');
  const draft = () => ({ questionnaireVersion: questionnaire.id, answers: structuredClone(answers), step, updatedAt: new Date().toISOString() });
  const saveDraft = () => {
    const snapshot = draft(), current = epoch;
    writing = writing.catch(() => {}).then(() => current === epoch ? storage().draft(snapshot) : undefined);
    return writing;
  };
  function intro(saved) {
    running = false;
    body(`<span class="tag">32 道候选题 · 试测阶段</span><h2>回顾一年的日常感受</h2><p class="detail-lead">不是只看今天，也不用猜测病因。按自己的真实感受选择，记不清、不适用或不愿回答都可以。</p><div class="gentle-note">本轮用于成人理解题目的试测。新问卷尚未完成专业审核与测量验证，无法据此正式判定个人体质。</div><p>答题草稿只保存在当前浏览器。完成后，可以自行决定是否保存感受记录。无需测评，也可以咨询助手。</p><p class="small muted">如果此刻有明显紧急不适，请立即联系当地急救服务（中国大陆 120），不要继续测评。</p><div class="button-row">${saved ? `<button class="primary-button" data-assessment="resume">继续本机草稿（${saved.answers.length}/32）</button>` : ''}<button class="${saved ? 'outline' : 'primary'}-button" data-assessment="start">${saved ? '重新开始试测' : '了解并开始试测'}</button></div>`);
  }
  function draw() {
    const q = questions[step], selected = answers.find(a => a.id === q.id)?.value;
    body(`<span class="tag">回想过去一年 · 试测参考</span><h2>认识自己的身体感受</h2><div class="quiz-progress"><span>第 ${step + 1} 题 / 32 题</span><span>已答 ${answers.length} 题</span></div><progress class="assessment-progress" max="32" value="${answers.length}" aria-label="答题完成进度"></progress><h3 class="quiz-question" tabindex="-1">${escape(q.text)}</h3><div class="quiz-options">${options.map(([value, label]) => `<button data-assessment-answer="${value}" class="${value === selected ? 'selected' : ''}" aria-pressed="${value === selected}"><span>${label}</span>${value === selected ? '✓' : ''}</button>`).join('')}</div><div class="button-row"><button class="text-button" data-assessment="back" ${step === 0 ? 'disabled' : ''}>← 上一题</button><button class="outline-button" data-assessment="next">${step === 31 ? '查看答题并提交' : '下一题 →'}</button><button class="text-button" data-assessment="pause">保存草稿并退出</button></div><p class="small muted" id="draft-status" role="status">选择答案后自动保存本机草稿。</p>`);
    document.querySelector('.quiz-question')?.focus({ preventScroll: true });
  }
  function review() {
    const missing = questions.filter(q => !answers.some(a => a.id === q.id));
    body(`<span class="tag">提交前核对</span><h2>${missing.length ? `还有 ${missing.length} 道未答题` : '已完成全部 32 道题'}</h2><p>可以返回修改任何一题，也可以选择“记不清”“不适用”或“不愿回答”。</p><div class="question-jump">${questions.map((q, i) => `<button class="${answers.some(a => a.id === q.id) ? 'answered' : ''}" data-assessment-jump="${i}" aria-label="${i + 1} 题${answers.some(a => a.id === q.id) ? '已答' : '未答'}">${i + 1}</button>`).join('')}</div><button class="primary-button full-button" data-assessment="submit" ${missing.length ? 'disabled' : ''}>提交并查看感受记录</button>`);
  }
  function resultView(record, saved = false) {
    running = false; result = record;
    const frequent = record.answers.filter(a => typeof a.value === 'number' && a.value >= 3);
    body(`<span class="tag">试测参考 · 无体质判定</span><h2>你的日常感受记录</h2><p class="detail-lead">以下整理你选择“经常”或“几乎总是”的感受。它不是诊断，也不能据此自动推荐茶方。</p>${frequent.length ? `<ul class="step-list">${frequent.map(a => `<li>${escape(questions.find(q => q.id === a.id).text)} <span class="muted">— ${options.find(([v]) => v === a.value)[1]}</span></li>`).join('')}</ul>` : '<div class="gentle-note">你没有选择“经常”或“几乎总是”的项目。这不代表已判定为平和质，也不等于健康评估通过。</div>'}<details class="source-details"><summary>查看全部 32 道回答</summary>${questions.map(q => `<p><strong>${escape(q.text)}</strong><br>${options.find(([v]) => v === record.answers.find(a => a.id === q.id)?.value)?.[1] || '未答'}</p>`).join('')}</details><p class="small muted">候选题 v0.1 · 审核待完成 · 此结果不自动发送给咨询助手</p><div class="button-row">${saved ? '<span class="tag">已保存于本机</span>' : '<button class="primary-button" data-assessment="save">保存这份感受记录</button>'}<button class="outline-button" data-action="constitutions">九种体质科普</button><button class="text-button" data-close="detail">关闭</button></div>`);
  }
  return {
    async open() { const state = await storage().load(); intro(state.draft?.questionnaireVersion === questionnaire.id ? state.draft : null); },
    view: record => resultView(record, true),
    async reset() { epoch++; running = false; answers = []; result = null; await writing.catch(() => {}); },
    async action(button) {
      const data = button.dataset;
      if (!('assessment' in data || 'assessmentAnswer' in data || 'assessmentJump' in data)) return false;
      try {
        if ('assessmentAnswer' in data && running) {
          const value = /^\d$/.test(data.assessmentAnswer) ? Number(data.assessmentAnswer) : data.assessmentAnswer;
          if (!options.some(([v]) => v === value)) return true;
          const id = questions[step].id;
          answers = [...answers.filter(a => a.id !== id), { id, value }];
          draw();
          await saveDraft();
          const status = document.getElementById('draft-status'); if (status) status.textContent = '草稿已保存在本机';
        } else if ('assessmentJump' in data) { step = Number(data.assessmentJump); running = true; draw(); }
        else switch (data.assessment) {
          case 'start': epoch++; answers = []; step = 0; result = null; running = true; await saveDraft(); draw(); break;
          case 'resume': { const state = await storage().load(); const d = state.draft; if (!d || d.questionnaireVersion !== questionnaire.id) throw new Error('没有可继续的草稿'); answers = d.answers; step = Math.min(31, Math.max(0, d.step)); running = true; draw(); break; }
          case 'back': step = Math.max(0, step - 1); draw(); break;
          case 'next': if (step === 31) review(); else { step++; draw(); } break;
          case 'pause': await saveDraft(); await changed(); document.getElementById('detail-dialog').close(); notify('草稿已保存，可从“我的”继续'); break;
          case 'submit': result = assessmentRecord(answers); resultView(result); break;
          case 'save': if (result) { button.disabled = true; await writing; await storage().assessment(result); await changed(); resultView(result, true); notify('感受记录已保存于本机'); } break;
        }
      } catch (error) { button.disabled = false; notify(error.message || '保存未完成，答案仍保留在当前页面'); const status = document.getElementById('draft-status'); if (status) status.textContent = '本次保存失败，答案仍保留在页面。请重试保存草稿。'; }
      return true;
    },
  };
}
