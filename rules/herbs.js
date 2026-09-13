// Initial project rules transcribed from docs/07; pending current-pharmacopoeia review.
export const herbRuleVersion = 'zy-herb-blocks-v0.1';
export const herbRules = [
  ['HB01', ['甘草'], ['甘遂', '大戟', '芫花', '海藻']],
  ['HB02', ['川乌', '草乌', '附子'], ['川贝母', '浙贝母', '平贝母', '伊贝母', '湖北贝母', '瓜蒌', '瓜蒌子', '瓜蒌皮', '天花粉', '半夏', '白蔹', '白及']],
  ['HB03', ['藜芦'], ['人参', '丹参', '沙参', '玄参', '苦参', '细辛', '白芍', '赤芍']],
  ['HB04', ['硫黄'], ['朴硝']], ['HB05', ['水银'], ['砒霜']],
  ['HB06', ['狼毒'], ['密陀僧']], ['HB07', ['巴豆'], ['牵牛']],
  ['HB08', ['丁香'], ['郁金']], ['HB09', ['川乌', '草乌'], ['犀角']],
  ['HB10', ['牙硝'], ['三棱']], ['HB11', ['官桂'], ['石脂']],
  ['HB12', ['人参'], ['五灵脂']],
].map(([id, left, right]) => ({ id, left, right, source: 'S17', reviewStatus: 'pending' }));
const known = new Set(herbRules.flatMap(r => [...r.left, ...r.right]));
export function checkHerbs({ ingredients = [], currentIngredients = [], identitiesComplete = false } = {}) {
  const all = [...ingredients, ...currentIngredients];
  const conflicts = herbRules.filter(r => all.some(h => r.left.includes(h)) && all.some(h => r.right.includes(h))).map(r => r.id);
  if (conflicts.length) return { status: 'blocked', conflicts, ruleVersion: herbRuleVersion };
  // Absence from this incomplete table never establishes safety or food eligibility.
  return { status: 'unverified', unknown: all.filter(h => !known.has(h)), identitiesComplete, conflicts: [], ruleVersion: herbRuleVersion };
}
