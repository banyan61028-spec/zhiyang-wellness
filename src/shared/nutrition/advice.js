const numberPattern = /\d+(?:\.\d+)?/g;

export function collectAllowedNumbers(totals, targets) {
  const numbers = [totals.kcal, totals.protein, totals.fat, totals.carb, totals.counted, totals.skipped];
  if (targets?.confirmed) {
    for (const key of ['kcal', 'protein', 'fat', 'carb']) {
      if (targets[key] == null || !Number.isFinite(Number(targets[key]))) continue;
      const target = Math.round(Number(targets[key]));
      const actual = totals[key];
      numbers.push(target, target - actual, Math.abs(target - actual));
    }
  }
  return [...new Set(numbers.filter(value => Number.isFinite(value)).map(value => Math.round(value)))];
}

export function numbersConflict(text, allowed) {
  const allowedSet = new Set(allowed.map(value => String(value)));
  const found = String(text ?? '').match(numberPattern) || [];
  return found.some(token => {
    const asNumber = String(Number(token));
    return !allowedSet.has(token) && !allowedSet.has(asNumber);
  });
}

export function sanitizeAdvice(text, allowed) {
  const sentences = String(text ?? '').trim().split(/(?<=[。！？])/).map(part => part.trim()).filter(Boolean).slice(0, 2);
  const joined = sentences.join('');
  if (!joined || numbersConflict(joined, allowed)) return { text: '', kept: false };
  return { text: joined, kept: true };
}

export function programAdvice({ totals, targets, caution }) {
  if (!totals.counted && totals.skipped) return '今天记下的食物暂时都无法估算，所以没有热量合计。';
  if (caution.eatingDisorder) return '记录已经留下。这里不按热量缺口鼓励少吃。如果吃饭让你很痛苦，请寻求专业帮助。';
  if (caution.pregnancy || caution.lactation || caution.minor) return '今天的合计只作记录。这不是减重目标，下一餐也只从家常菜里作一般搭配。具体请咨询医生或营养专业人员。';
  if (caution.kidney) return '今天的合计可以看。不会按蛋白质缺口推荐高蛋白菜。肾病相关饮食请以医嘱为准。';
  if (caution.diabetes || caution.hypertension) return '今天的合计只供记录，不是治疗膳食。具体吃什么以医嘱为准。';
  if (!targets?.confirmed || targets.kcal == null) return '今天只显示已经算出的合计。每日目标还没填写，所以没有和目标对比。';
  const allowed = collectAllowedNumbers(totals, targets);
  const gaps = [
    ['蛋白质', targets.protein, totals.protein],
    ['脂肪', targets.fat, totals.fat],
    ['碳水', targets.carb, totals.carb],
  ].filter(([, target]) => target != null && Number.isFinite(Number(target)));
  const short = gaps
    .map(([label, target, actual]) => ({ label, gap: Math.round(Number(target) - actual) }))
    .filter(item => item.gap > 5)
    .sort((a, b) => b.gap - a.gap)[0];
  const kcalGap = Math.round(targets.kcal - totals.kcal);
  let sentence = `今天大约吃了 ${totals.kcal} 千卡。`;
  if (kcalGap > 0) sentence += `距离你填的目标还少 ${kcalGap} 千卡。`;
  else if (kcalGap < 0) sentence += `已经比你填的目标多 ${Math.abs(kcalGap)} 千卡。`;
  else sentence += '和你填的热量目标一样。';
  if (short && allowed.includes(short.gap)) sentence += `${short.label}大约还少 ${short.gap} 克。`;
  const checked = sanitizeAdvice(sentence, allowed);
  return checked.kept ? checked.text : '今天的合计已经按食物表算好。';
}

export function inferCaution(texts, flags = {}) {
  const blob = `${Array.isArray(texts) ? texts.join('。') : ''}`;
  return {
    eatingDisorder: flags.eatingDisorder === true || /催吐|绝食|暴瘦|只喝茶|不吃饭/.test(blob),
    pregnancy: flags.pregnancy === true || /怀孕|孕妇|孕期|备孕/.test(blob),
    lactation: flags.lactation === true || /哺乳/.test(blob),
    minor: flags.minor === true || /未成年|婴儿|宝宝|儿童/.test(blob),
    kidney: flags.kidney === true || /肾病/.test(blob),
    diabetes: flags.diabetes === true || /糖尿病/.test(blob),
    hypertension: flags.hypertension === true || /高血压/.test(blob),
  };
}

export function sanitizeReason(text, recipe, recipes, allowed) {
  const joined = String(text ?? '').trim().split(/(?<=[。！？])/).map(part => part.trim()).filter(Boolean).slice(0, 2).join('');
  if (!joined || !recipe) return { text: '', kept: false };
  const otherNames = recipes.filter(item => item.id !== recipe.id).map(item => item.name).filter(name => name && name.length >= 2);
  if (otherNames.some(name => joined.includes(name))) return { text: '', kept: false };
  if (numbersConflict(joined, allowed)) return { text: '', kept: false };
  return { text: joined, kept: true };
}
