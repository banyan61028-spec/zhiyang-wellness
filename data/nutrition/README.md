# 食物与食谱导入

把表格放在本目录后，重新运行校验脚本，再重启本地服务，记录、计算和推荐就会使用新数据。服务启动时直接读这里的 CSV，不需要改业务代码。

```sh
npm run import-nutrition
npm run dev
```

`import-nutrition` 只做校验，并写出一份供构建兜底的 `src/shared/nutrition/catalog.json`。格式不对时会逐行说明，不会悄悄跳过。本地预览以本目录的 CSV 为准。

不要把 API Key 写进这些文件。

## 食物表 `foods.csv`

UTF-8，第一行是表头。可以用英文逗号分隔。单元格里如果有英文逗号或引号，按 CSV 规则用双引号包起来。

| 列 | 必填 | 说明 |
| --- | --- | --- |
| id | 是 | 稳定编号，小写字母、数字和连字符，如 `egg-whole` |
| name | 是 | 食物名，如 `鸡蛋` |
| aliases | 否 | 别名，用竖线分隔，如 `蛋\|煮鸡蛋`。匹配是整段相等，不会模糊猜测 |
| kcal_per_100g | 可计算时必填 | 每 100 克可食部热量，千卡 |
| protein_g_per_100g | 可计算时必填 | 每 100 克蛋白质，克 |
| fat_g_per_100g | 可计算时必填 | 每 100 克脂肪，克 |
| carb_g_per_100g | 可计算时必填 | 每 100 克碳水化合物，克 |
| source | 可计算时必填 | 这几个数字的来源名称 |
| source_note | 是 | 来源说明。谁整理的、哪一版、有什么限制 |
| version | 是 | 数据版本，如 `linden-2026-10-03` |
| calculable | 是 | `true` 或 `false`。`false` 只占位，计算时标为无法估算 |
| example | 是 | `true` 或 `false`。仓库里自带的行都是示例 |
| portion_small_g | 否 | 小份克数。空着则用 `config.json` 的默认值 |
| portion_medium_g | 否 | 中份克数 |
| portion_large_g | 否 | 大份克数 |

热量和三大营养素只描述每 100 克。一道菜吃了多少，由克数在程序里乘出来，不要在这张表里写「一碗多少千卡」。

`calculable` 为 `false` 时，四个营养数字留空。这样「牛肉面」可以先被认出来，但不会得到一个编出来的热量。

同一个别名出现在两种食物上时，脚本会警告。使用时列为待选择，不会自动挑一条来算。

## 食谱表 `recipes.csv`

| 列 | 必填 | 说明 |
| --- | --- | --- |
| id | 是 | 稳定编号，不要和食物编号重复 |
| name | 是 | 菜名 |
| meal | 是 | `breakfast`、`lunch`、`dinner`、`snack`、`any` 之一 |
| ingredients | 是 | `食物编号:克数`，多条用竖线分隔，如 `egg-whole:50\|rice-cooked:150` |
| steps | 是 | 做法，步骤之间用竖线分隔 |
| note | 否 | 给用户看的一句说明 |
| avoid | 否 | 目前只用 `kidney_high_protein`。肾病用户不会因为蛋白质缺口被推荐这道菜。多种用竖线分隔 |
| source_note | 是 | 这道菜的来源说明。营养数字不要写在这里充数 |
| example | 是 | `true` 或 `false` |

食谱不填写热量。导入时按原料克数和食物表计算。原料必须已经在食物表里，并且 `calculable` 为 `true`。

茶饮不要放进这张表。下一餐只从这里选。

## 示例数据

当前 CSV 是小范围试用的示例，不是 linden 的正式表，也不是《中国食物成分表》。可计算的原料按 USDA FoodData Central 公开领域数据的常见参考值手工录入并四舍五入，没有从网站抓取。每行都标了 `example=true`，并带有来源字段。正式试用前，用自己整理的表替换同名文件即可。
