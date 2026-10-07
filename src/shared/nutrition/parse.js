const FOOD_HEADERS = ['id', 'name', 'aliases', 'kcal_per_100g', 'protein_g_per_100g', 'fat_g_per_100g', 'carb_g_per_100g', 'source', 'source_note', 'version', 'calculable', 'example', 'portion_small_g', 'portion_medium_g', 'portion_large_g'];
const RECIPE_HEADERS = ['id', 'name', 'meal', 'ingredients', 'steps', 'note', 'avoid', 'source_note', 'example'];
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack', 'any']);
const AVOID = new Set(['kidney_high_protein']);
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseCsv(text) {
  const source = String(text ?? '').replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"') {
        if (source[index + 1] === '"') { cell += '"'; index += 1; }
        else quoted = false;
      } else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(cell); cell = ''; }
    else if (char === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (char !== '\r') cell += char;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(columns => columns.some(column => column.trim() !== ''));
}

export function parseNutritionFiles({ foodsCsv, recipesCsv, config }) {
  const errors = [];
  const warnings = [];
  const portionDefaults = normalizePortions(config?.portionDefaults, errors);
  const foods = parseFoods(foodsCsv, portionDefaults, errors, warnings);
  const recipes = parseRecipes(recipesCsv, foods, errors);
  if (!errors.length) warnDuplicateAliases(foods, warnings);
  return {
    errors,
    warnings,
    catalog: errors.length ? null : {
      version: config?.catalogVersion || 'unversioned',
      portionDefaults,
      foods,
      recipes,
    },
  };
}

function parseFoods(text, portionDefaults, errors, warnings) {
  const table = parseTable('foods.csv', text, FOOD_HEADERS, errors);
  const foods = [];
  const seen = new Set();
  for (const { line, record } of table) {
    const id = record.id.trim();
    const where = `foods.csv 第 ${line} 行`;
    if (!ID_PATTERN.test(id)) errors.push(`${where}：编号无效`);
    if (seen.has(id)) errors.push(`${where}：编号 ${id} 重复`);
    seen.add(id);
    const name = record.name.trim();
    if (!name || name.length > 30) errors.push(`${where}：食物名需要 1 到 30 个字`);
    const calculable = booleanField(record.calculable, `${where}：calculable`, errors);
    const example = booleanField(record.example, `${where}：example`, errors);
    const sourceNote = record.source_note.trim();
    const version = record.version.trim();
    if (!sourceNote) errors.push(`${where}：缺少 source_note`);
    if (!version) errors.push(`${where}：缺少 version`);
    const source = record.source.trim();
    let per100g = null;
    if (calculable === true) {
      if (!source) errors.push(`${where}：可计算的食物必须填写 source`);
      per100g = {
        kcal: numberField(record.kcal_per_100g, `${where}：kcal_per_100g`, errors, 0, 950),
        protein: numberField(record.protein_g_per_100g, `${where}：protein_g_per_100g`, errors, 0, 100),
        fat: numberField(record.fat_g_per_100g, `${where}：fat_g_per_100g`, errors, 0, 100),
        carb: numberField(record.carb_g_per_100g, `${where}：carb_g_per_100g`, errors, 0, 100),
      };
    } else if (calculable === false) {
      for (const key of ['kcal_per_100g', 'protein_g_per_100g', 'fat_g_per_100g', 'carb_g_per_100g']) {
        if (record[key].trim()) errors.push(`${where}：不可计算的食物不要填写 ${key}`);
      }
    }
    const portion = {
      small: optionalNumber(record.portion_small_g, portionDefaults.small, `${where}：portion_small_g`, errors),
      medium: optionalNumber(record.portion_medium_g, portionDefaults.medium, `${where}：portion_medium_g`, errors),
      large: optionalNumber(record.portion_large_g, portionDefaults.large, `${where}：portion_large_g`, errors),
    };
    if ([portion.small, portion.medium, portion.large].some(value => value != null && (value <= 0 || value > 2000))) errors.push(`${where}：份量克数需要在 1 到 2000 之间`);
    const aliases = record.aliases.split('|').map(alias => alias.trim()).filter(Boolean);
    if (aliases.some(alias => alias.length > 30)) errors.push(`${where}：别名过长`);
    if (aliases.includes(name)) warnings.push(`${where}：别名和食物名重复，已忽略`);
    foods.push({
      id, name, aliases: aliases.filter(alias => alias !== name), per100g, source, sourceNote, version,
      calculable: calculable === true, example: example === true, portion,
    });
  }
  return foods;
}

function parseRecipes(text, foods, errors) {
  const table = parseTable('recipes.csv', text, RECIPE_HEADERS, errors);
  const foodById = new Map(foods.map(food => [food.id, food]));
  const recipes = [];
  const seen = new Set(foods.map(food => food.id));
  for (const { line, record } of table) {
    const where = `recipes.csv 第 ${line} 行`;
    const id = record.id.trim();
    if (!ID_PATTERN.test(id)) errors.push(`${where}：编号无效`);
    if (seen.has(id)) errors.push(`${where}：编号 ${id} 与已有食物或食谱重复`);
    seen.add(id);
    const name = record.name.trim();
    if (!name || name.length > 40) errors.push(`${where}：菜名需要 1 到 40 个字`);
    const meal = record.meal.trim();
    if (!MEALS.has(meal)) errors.push(`${where}：meal 只能是 breakfast、lunch、dinner、snack 或 any`);
    const example = booleanField(record.example, `${where}：example`, errors);
    if (!record.source_note.trim()) errors.push(`${where}：缺少 source_note`);
    const ingredients = [];
    const used = new Set();
    for (const part of record.ingredients.split('|').map(item => item.trim()).filter(Boolean)) {
      const matched = part.match(/^([a-z0-9]+(?:-[a-z0-9]+)*):(\d+(?:\.\d+)?)$/);
      if (!matched) { errors.push(`${where}：原料「${part}」应为 食物编号:克数`); continue; }
      const foodId = matched[1];
      const grams = Number(matched[2]);
      const food = foodById.get(foodId);
      if (!food) errors.push(`${where}：原料 ${foodId} 不在食物表中`);
      else if (!food.calculable) errors.push(`${where}：原料 ${foodId} 不可计算，不能写进食谱`);
      if (used.has(foodId)) errors.push(`${where}：原料 ${foodId} 重复，请合并克数`);
      used.add(foodId);
      if (!(grams > 0 && grams <= 2000)) errors.push(`${where}：原料 ${foodId} 的克数无效`);
      ingredients.push({ foodId, grams });
    }
    if (!ingredients.length) errors.push(`${where}：至少需要一种原料`);
    const steps = record.steps.split('|').map(step => step.trim()).filter(Boolean);
    if (!steps.length) errors.push(`${where}：至少需要一条做法`);
    const avoid = record.avoid.split('|').map(item => item.trim()).filter(Boolean);
    for (const flag of avoid) if (!AVOID.has(flag)) errors.push(`${where}：无法识别的 avoid「${flag}」`);
    recipes.push({
      id, name, meal, ingredients, steps, note: record.note.trim(), avoid, sourceNote: record.source_note.trim(), example: example === true,
    });
  }
  return recipes;
}

function parseTable(filename, text, headers, errors) {
  const rows = parseCsv(text);
  if (!rows.length) { errors.push(`${filename}：文件是空的`); return []; }
  const header = rows[0].map(column => column.trim());
  if (header.join(',') !== headers.join(',')) errors.push(`${filename}：表头应为 ${headers.join(',')}`);
  return rows.slice(1).map((columns, index) => {
    const record = Object.fromEntries(headers.map((key, column) => [key, columns[column] ?? '']));
    return { line: index + 2, record };
  });
}

function booleanField(value, label, errors) {
  const text = value.trim();
  if (text === 'true') return true;
  if (text === 'false') return false;
  errors.push(`${label} 只能是 true 或 false`);
  return null;
}

function numberField(value, label, errors, min, max) {
  const text = value.trim();
  if (!text || Number.isNaN(Number(text)) || !Number.isFinite(Number(text))) { errors.push(`${label} 不是数字`); return null; }
  const number = Number(text);
  if (number < min || number > max) errors.push(`${label} 超出 ${min} 到 ${max}`);
  return number;
}

function optionalNumber(value, fallback, label, errors) {
  if (!value.trim()) return fallback;
  return numberField(value, label, errors, 1, 2000);
}

function normalizePortions(value, errors) {
  const source = value || {};
  const portion = {
    small: Number(source.small ?? 100),
    medium: Number(source.medium ?? 150),
    large: Number(source.large ?? 250),
  };
  if ([portion.small, portion.medium, portion.large].some(item => !Number.isFinite(item) || item <= 0)) errors.push('config.json：份量默认克数无效');
  return portion;
}

function warnDuplicateAliases(foods, warnings) {
  const owners = new Map();
  for (const food of foods) {
    for (const label of [food.name, ...food.aliases]) {
      const key = label.normalize('NFKC').trim().toLowerCase();
      const list = owners.get(key) || [];
      list.push(food.id);
      owners.set(key, list);
    }
  }
  for (const [label, ids] of owners) {
    if (ids.length > 1) warnings.push(`别名或名称「${label}」同时属于 ${ids.join('、')}。使用时会请用户选择，不会自动估算。`);
  }
}
