import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseNutritionFiles } from '../src/shared/nutrition/parse.js';

export async function importNutrition(dir = resolve('data/nutrition')) {
  const foodsCsv = await readFile(resolve(dir, 'foods.csv'), 'utf8');
  const recipesCsv = await readFile(resolve(dir, 'recipes.csv'), 'utf8');
  const config = JSON.parse(await readFile(resolve(dir, 'config.json'), 'utf8'));
  const result = parseNutritionFiles({ foodsCsv, recipesCsv, config });
  for (const warning of result.warnings) console.warn(`警告：${warning}`);
  if (result.errors.length) {
    for (const error of result.errors) console.error(error);
    console.error(`导入未完成：${result.errors.length} 个格式错误。`);
    return 1;
  }
  const catalog = result.catalog;
  const calculable = catalog.foods.filter(food => food.calculable).length;
  await writeFile(resolve('src/shared/nutrition/catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(`食物 ${catalog.foods.length} 条，其中可计算 ${calculable} 条，占位不计算 ${catalog.foods.length - calculable} 条。`);
  console.log(`食谱 ${catalog.recipes.length} 道。营养不写在表里，使用时按原料克数计算。`);
  console.log('已写入 src/shared/nutrition/catalog.json');
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const code = await importNutrition(process.argv[2] ? resolve(process.argv[2]) : undefined);
  process.exit(code);
}
