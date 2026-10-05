// src/client/data.js
var sources = { constitution: { title: "\u4E2D\u533B\u4F53\u8D28\u5206\u7C7B\u4E0E\u5224\u5B9A\uFF08GB/T 46939\u20142025\uFF09\u53D1\u5E03\u8BF4\u660E", url: "https://www.samr.gov.cn/xw/sj/art/2026/art_bbc0d96fbbb741a2a66d2f4f7a44fd82.html" }, nutrition: { title: "\u56FD\u5BB6\u536B\u5065\u59D4\uFF1A\u4E2D\u56FD\u516C\u6C11\u5065\u5EB7\u7D20\u517B\uFF082024 \u5E74\u7248\uFF09", url: "https://www.nhc.gov.cn/xcs/c100123/202405/73a4927142f34152abed875634a3c13b.shtml" }, food: { title: "\u56FD\u5BB6\u536B\u5065\u59D4\uFF1A\u6210\u4EBA\u80A5\u80D6\u98DF\u517B\u6307\u5357\u95EE\u7B54", url: "https://www.nhc.gov.cn/cms-search/downFiles/6d7f12d8c8da45f0859c1c6be6f99726.pdf" }, throat: { title: "NHS\uFF1ASore throat", url: "https://www.nhs.uk/symptoms/sore-throat/" }, bowel: { title: "NHS\uFF1AConstipation", url: "https://www.nhs.uk/conditions/constipation/" } };
var constitutions = [["\u5E73\u548C\u8D28", "\u5E73\u8861\u4E0E\u534F\u8C03"], ["\u6C14\u865A\u8D28", "\u7559\u610F\u7CBE\u529B\u4E0E\u6D3B\u52A8\u611F\u53D7"], ["\u9633\u865A\u8D28", "\u7559\u610F\u5BF9\u5BD2\u51B7\u7684\u611F\u53D7"], ["\u9634\u865A\u8D28", "\u7559\u610F\u5E72\u71E5\u4E0E\u71E5\u70ED\u611F\u53D7"], ["\u75F0\u6E7F\u8D28", "\u7559\u610F\u8EAB\u4F53\u56F0\u91CD\u7684\u611F\u53D7"], ["\u6E7F\u70ED\u8D28", "\u7559\u610F\u6E7F\u4E0E\u70ED\u7684\u611F\u53D7"], ["\u8840\u7600\u8D28", "\u4E86\u89E3\u76F8\u5173\u8EAB\u4F53\u8868\u73B0"], ["\u6C14\u90C1\u8D28", "\u7559\u610F\u60C5\u7EEA\u4E0E\u8EAB\u4F53\u611F\u53D7"], ["\u7279\u7980\u8D28", "\u7559\u610F\u7279\u6B8A\u654F\u611F\u60C5\u51B5"]];
var recipes = [
  { id: "breakfast", title: "\u5C71\u836F\u5C0F\u7C73\u7CA5\u642D\u914D", category: "\u4E09\u9910\u642D\u914D", time: "\u65E9\u9910", duration: "\u7EA6 25 \u5206\u949F", tag: "\u6E29\u70ED\u65E9\u9910", desc: "\u4E00\u7897\u7CA5\u4E4B\u5916\uFF0C\u4E5F\u7ED9\u65E9\u9910\u52A0\u4E00\u70B9\u4E30\u5BCC\u3002", ingredients: ["\u5C71\u836F\u3001\u5C0F\u7C73\u4E0E\u996E\u7528\u6C34", "\u9E21\u86CB\u6216\u4F60\u9002\u5408\u7684\u8C46\u5236\u54C1", "\u4E00\u4EFD\u65B0\u9C9C\u6C34\u679C"], steps: ["\u5C71\u836F\u548C\u5C0F\u7C73\u6D17\u51C0\uFF0C\u6309\u65E5\u5E38\u716E\u7CA5\u65B9\u5F0F\u716E\u719F\u3002", "\u642D\u914D\u9E21\u86CB\u6216\u9002\u5408\u81EA\u5DF1\u7684\u5176\u4ED6\u86CB\u767D\u8D28\u98DF\u7269\u3002", "\u518D\u52A0\u4E00\u4EFD\u6C34\u679C\uFF0C\u8BA9\u65E9\u9910\u98DF\u7269\u79CD\u7C7B\u66F4\u4E30\u5BCC\u3002"], note: "\u8FD9\u662F\u642D\u914D\u793A\u4F8B\uFF0C\u4EFD\u91CF\u5C1A\u672A\u6309\u4E2A\u4EBA\u9700\u8981\u8BA1\u7B97\uFF1B\u5BF9\u539F\u6599\u8FC7\u654F\u65F6\u9700\u8981\u66FF\u6362\u3002", source: "nutrition" },
  { id: "lunch", title: "\u6E05\u84B8\u9C7C\u4E0E\u65F6\u852C\u996D", category: "\u4E09\u9910\u642D\u914D", time: "\u5348\u9910", duration: "\u7EA6 30 \u5206\u949F", tag: "\u8364\u7D20\u642D\u914D", image: "assets/lunch.jpg", desc: "\u4E3B\u98DF\u3001\u9C7C\u8089\u3001\u852C\u83DC\uFF0C\u90FD\u7ED9\u81EA\u5DF1\u7559\u4E00\u4EFD\u3002", ingredients: ["\u7C73\u996D\u6216\u6742\u7CAE\u996D", "\u5145\u5206\u84B8\u719F\u7684\u9C7C\u8089", "\u7EFF\u53F6\u83DC\u4E0E\u5357\u74DC"], steps: ["\u51C6\u5907\u4E00\u4EFD\u4E3B\u98DF\uFF0C\u9C7C\u8089\u5145\u5206\u84B8\u719F\u3002", "\u642D\u914D\u65F6\u852C\uFF0C\u70F9\u8C03\u65F6\u51CF\u5C11\u989D\u5916\u6CB9\u76D0\u3002", "\u6839\u636E\u5B9E\u9645\u9965\u9971\u611F\u4E0E\u4E2A\u4EBA\u9700\u6C42\u8C03\u6574\u4EFD\u91CF\u3002"], note: "\u7167\u7247\u4E3A\u642D\u914D\u793A\u610F\uFF0C\u4E0D\u4EE3\u8868\u7CBE\u786E\u4EFD\u91CF\u6216\u8425\u517B\u8BA1\u7B97\u3002\u5BF9\u9C7C\u8FC7\u654F\u53EF\u67E5\u770B\u8C46\u8150\u66FF\u6362\u793A\u4F8B\u3002", source: "nutrition" },
  { id: "dinner", title: "\u83CC\u83C7\u8C46\u8150\u6742\u7CAE\u996D", category: "\u4E09\u9910\u642D\u914D", time: "\u665A\u9910", duration: "\u7EA6 20 \u5206\u949F", tag: "\u6E05\u723D\u5BB6\u5E38", desc: "\u7528\u5BB6\u5E38\u98DF\u6750\uFF0C\u628A\u665A\u996D\u5403\u5F97\u7B80\u5355\u4E9B\u3002", ingredients: ["\u8C46\u8150\u3001\u83CC\u83C7\u4E0E\u7EFF\u53F6\u83DC", "\u4E00\u4EFD\u6742\u7CAE\u996D", "\u5C11\u91CF\u70F9\u8C03\u7528\u6CB9\u53CA\u8C03\u5473"], steps: ["\u8C46\u8150\u4E0E\u83CC\u83C7\u716E\u719F\u6216\u7096\u719F\u3002", "\u642D\u914D\u4E00\u4EFD\u7EFF\u53F6\u852C\u83DC\u548C\u4E3B\u98DF\u3002", "\u6309\u81EA\u5DF1\u7684\u5B9E\u9645\u9700\u6C42\u8C03\u6574\uFF0C\u4E0D\u56E0\u51CF\u91CD\u800C\u76F4\u63A5\u7701\u7565\u6B63\u9910\u3002"], note: "\u8FD9\u662F\u5BB6\u5E38\u83DC\u793A\u4F8B\uFF0C\u4E0D\u9002\u7528\u4E8E\u9700\u8981\u7279\u6B8A\u81B3\u98DF\u6CBB\u7597\u7684\u60C5\u51B5\u3002", source: "nutrition" },
  { id: "tea", title: "\u9648\u76AE\u7EA2\u67A3\u6E29\u996E", category: "\u98DF\u517B\u8336\u996E", time: "\u8336\u996E", duration: "\u98CE\u5473\u53C2\u8003", tag: "\u4F20\u7EDF\u98DF\u517B", image: "assets/tea.jpg", desc: "\u6DE1\u6DE1\u67D1\u6A58\u9999\uFF0C\u7ED9\u65E5\u5E38\u6DFB\u4E00\u676F\u6E29\u996E\u3002", ingredients: ["\u98DF\u54C1\u7528\u9014\u7684\u9648\u76AE", "\u53BB\u6838\u7EA2\u67A3", "\u996E\u7528\u6C34"], steps: ["\u9009\u7528\u7B26\u5408\u98DF\u54C1\u7528\u9014\u7684\u539F\u6599\uFF0C\u6309\u539F\u6599\u5305\u88C5\u7684\u98DF\u7528\u8BF4\u660E\u51C6\u5907\u3002", "\u6E05\u6D17\u540E\u5145\u5206\u51B2\u6CE1\u6216\u716E\u5236\uFF0C\u653E\u81F3\u9002\u53E3\u6E29\u5EA6\u518D\u996E\u7528\u3002", "\u539F\u6599\u914D\u6BD4\u4E0E\u7528\u91CF\u7559\u5F85\u4E13\u4E1A\u5185\u5BB9\u5BA1\u6838\uFF1B\u672C Demo \u4E0D\u751F\u6210\u4E2A\u6027\u5316\u8349\u836F\u914D\u65B9\u3002"], note: "\u8FD9\u662F\u98CE\u5473\u4E0E\u9875\u9762\u793A\u4F8B\uFF0C\u4E0D\u5BA3\u79F0\u795B\u6E7F\u3001\u6D88\u80BF\u6216\u51CF\u8102\u7597\u6548\u3002\u670D\u836F\u3001\u5B55\u54FA\u671F\u3001\u8FC7\u654F\u6216\u6709\u7279\u6B8A\u5065\u5EB7\u72B6\u51B5\u65F6\uFF0C\u5148\u8BE2\u95EE\u4E13\u4E1A\u4EBA\u5458\u3002", source: "food" },
  { id: "oats", title: "\u71D5\u9EA6\u9178\u5976\u52A0\u9910", category: "\u4E09\u9910\u642D\u914D", time: "\u52A0\u9910", duration: "\u7EA6 5 \u5206\u949F", tag: "\u52A0\u9910\u53C2\u8003", desc: "\u7ED9\u5E0C\u671B\u589E\u52A0\u996E\u98DF\u6444\u5165\u7684\u4EBA\uFF0C\u591A\u4E00\u4E2A\u642D\u914D\u9009\u62E9\u3002", ingredients: ["\u9002\u5408\u81EA\u5DF1\u98DF\u7528\u7684\u539F\u5473\u9178\u5976", "\u5373\u98DF\u71D5\u9EA6", "\u6C34\u679C\u6216\u9002\u91CF\u575A\u679C\uFF08\u65E0\u8FC7\u654F\u65F6\uFF09"], steps: ["\u6839\u636E\u539F\u6599\u8BF4\u660E\u51C6\u5907\u71D5\u9EA6\u3002", "\u4E0E\u9178\u5976\u3001\u6C34\u679C\u642D\u914D\uFF0C\u4F5C\u4E3A\u6B63\u9910\u4E4B\u5916\u7684\u9009\u62E9\u3002", "\u5982\u679C\u8FD1\u671F\u4F53\u91CD\u65E0\u610F\u4E0B\u964D\u6216\u957F\u671F\u5403\u4E0D\u4E0B\uFF0C\u5148\u54A8\u8BE2\u4E13\u4E1A\u4EBA\u5458\u3002"], note: "\u589E\u91CD\u4E0D\u80FD\u53EA\u9760\u67D0\u79CD\u98DF\u7269\u3002\u8FD9\u662F\u642D\u914D\u793A\u4F8B\uFF0C\u672A\u8BA1\u7B97\u4E2A\u4EBA\u80FD\u91CF\u76EE\u6807\u3002", source: "nutrition" }
];
var lifestyle = { id: "sleep", title: "\u7ED9\u4ECA\u665A\u7559\u4E00\u70B9\u5B89\u9759", category: "\u8D77\u5C45\u5EFA\u8BAE", tag: "\u89C4\u5F8B\u4F5C\u606F", desc: "\u628A\u4F11\u606F\u5B89\u6392\u8FDB\u751F\u6D3B\uFF0C\u4E5F\u5141\u8BB8\u8BA1\u5212\u6709\u5F39\u6027\u3002", points: ["\u9009\u4E00\u4E2A\u9002\u5408\u81EA\u5DF1\u7684\u7761\u524D\u51C6\u5907\u65F6\u95F4\u3002", "\u628A\u660E\u5929\u9700\u8981\u5904\u7406\u7684\u4E8B\u60C5\u8BB0\u4E0B\u6765\uFF0C\u51CF\u5C11\u4E34\u7761\u524D\u53CD\u590D\u60E6\u8BB0\u3002", "\u5EFA\u7ACB\u5BB9\u6613\u91CD\u590D\u7684\u7761\u524D\u4E60\u60EF\uFF1B\u6301\u7EED\u7761\u7720\u56F0\u6270\u5E94\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9\u3002"] };
var topics = [
  { id: "damp", title: "\u603B\u89C9\u5F97\u6E7F\u6C14\u91CD", subtitle: "\u4ECE\u996E\u98DF\u4E0E\u65E5\u5E38\u4E60\u60EF\u804A\u8D77", group: "\u65E5\u5E38\u72B6\u6001", icon: "leaf", accent: "green", tips: ["\u5148\u8BB0\u5F55\u4F60\u8BF4\u7684\u201C\u6E7F\u6C14\u91CD\u201D\u5177\u4F53\u6307\u4EC0\u4E48\u611F\u53D7\u3002", "\u4ECE\u89C4\u5F8B\u4E09\u9910\u3001\u51CF\u5C11\u8FC7\u591A\u6CB9\u76D0\u7CD6\u3001\u9002\u5EA6\u6D3B\u52A8\u7B49\u65E5\u5E38\u4E60\u60EF\u5165\u624B\u3002", "\u60F3\u4E86\u89E3\u4F53\u8D28\uFF0C\u53EF\u4EE5\u5148\u6D4F\u89C8\u4E5D\u79CD\u7C7B\u578B\uFF0C\u518D\u4F7F\u7528\u7ECF\u8FC7\u9A8C\u8BC1\u7684\u6B63\u5F0F\u91CF\u8868\u3002"], boundary: "\u201C\u6E7F\u6C14\u91CD\u201D\u662F\u4F60\u7684\u63CF\u8FF0\uFF0C\u4E0D\u80FD\u636E\u6B64\u76F4\u63A5\u5224\u5B9A\u4F53\u8D28\u6216\u75C5\u56E0\u3002\u6709\u660E\u663E\u6D6E\u80BF\u3001\u6301\u7EED\u4E0D\u9002\u65F6\u8BF7\u5C31\u533B\u3002", related: "tea", source: "nutrition" },
  { id: "throat", title: "\u55D3\u5B50\u4E0D\u8212\u670D", subtitle: "\u996E\u6C34\u3001\u996E\u98DF\u4E0E\u4F11\u606F\u53C2\u8003", group: "\u547C\u5438\u4E0E\u54BD\u5589", icon: "wind", accent: "orange", tips: ["\u9009\u62E9\u81EA\u5DF1\u53EF\u4EE5\u8212\u9002\u541E\u54BD\u7684\u98DF\u7269\uFF0C\u9002\u5F53\u996E\u6C34\u3002", "\u4F11\u606F\uFF0C\u907F\u5F00\u70DF\u96FE\u7B49\u523A\u6FC0\u3002", "\u8BB0\u5F55\u6301\u7EED\u65F6\u95F4\u4E0E\u53D8\u5316\uFF1B\u75C7\u72B6\u6301\u7EED\u6216\u52A0\u91CD\u65F6\u54A8\u8BE2\u533B\u751F\u3002"], boundary: "\u82E5\u547C\u5438\u56F0\u96BE\u3001\u65E0\u6CD5\u541E\u54BD\uFF0C\u6216\u60C5\u51B5\u8FC5\u901F\u6076\u5316\uFF0C\u8BF7\u7ACB\u5373\u5BFB\u6C42\u533B\u7597\u5E2E\u52A9\u3002", related: null, source: "throat" },
  { id: "bowel", title: "\u6392\u4FBF\u4E0D\u592A\u987A\u7545", subtitle: "\u7559\u610F\u7EA4\u7EF4\u3001\u6C34\u5206\u4E0E\u89C4\u5F8B", group: "\u813E\u80C3\u4E0E\u6D88\u5316", icon: "sun", accent: "green", tips: ["\u5728\u8010\u53D7\u7684\u524D\u63D0\u4E0B\uFF0C\u9010\u6B65\u589E\u52A0\u852C\u83DC\u3001\u6C34\u679C\u3001\u5168\u8C37\u7269\u7B49\u98DF\u7269\u3002", "\u4FDD\u6301\u9002\u5408\u81EA\u5DF1\u7684\u996E\u6C34\u4E0E\u6D3B\u52A8\u4E60\u60EF\uFF1B\u6709\u533B\u5631\u9650\u5236\u65F6\u9075\u5FAA\u533B\u5631\u3002", "\u8BB0\u5F55\u6392\u4FBF\u4E60\u60EF\uFF0C\u7ED9\u81EA\u5DF1\u89C4\u5F8B\u7684\u5982\u5395\u65F6\u95F4\u3002"], boundary: "\u51FA\u73B0\u4FBF\u8840\u3001\u6301\u7EED\u8179\u75DB\u3001\u4F53\u91CD\u65E0\u610F\u4E0B\u964D\uFF0C\u6216\u53CD\u590D\u3001\u6301\u7EED\u4FBF\u79D8\u65F6\uFF0C\u8BF7\u54A8\u8BE2\u533B\u751F\u3002", related: "dinner", source: "bowel" },
  { id: "sleep", title: "\u4F5C\u606F\u6709\u70B9\u4E71", subtitle: "\u4ECE\u4E00\u4E2A\u5C0F\u4E60\u60EF\u5F00\u59CB", group: "\u4F5C\u606F\u4E0E\u60C5\u7EEA", icon: "moon", accent: "purple", tips: lifestyle.points, boundary: "\u6301\u7EED\u5F71\u54CD\u767D\u5929\u751F\u6D3B\u7684\u7761\u7720\u95EE\u9898\uFF0C\u4E0D\u5B9C\u53EA\u4F9D\u9760\u517B\u751F\u5EFA\u8BAE\u5904\u7406\u3002", related: null, source: "nutrition" },
  { id: "weight", title: "\u6700\u8FD1\u4F53\u91CD\u589E\u52A0", subtitle: "\u628A\u4E09\u9910\u91CD\u65B0\u5B89\u6392\u597D", group: "\u65E5\u5E38\u72B6\u6001", icon: "scale", accent: "orange", tips: ["\u5148\u4E86\u89E3\u4F53\u91CD\u53D8\u5316\u7684\u65F6\u95F4\u3001\u5E45\u5EA6\u4E0E\u751F\u6D3B\u53D8\u5316\u3002", "\u5173\u6CE8\u6574\u4F53\u996E\u98DF\u642D\u914D\uFF0C\u4E0D\u628A\u67D0\u676F\u8336\u6216\u5355\u4E00\u98DF\u7269\u5F53\u4F5C\u51CF\u91CD\u65B9\u6848\u3002", "\u907F\u514D\u4EC5\u51ED\u4F53\u91CD\u7126\u8651\u5C31\u91C7\u7528\u6781\u7AEF\u9650\u5236\u996E\u98DF\u3002"], boundary: "\u672C Demo \u4E0D\u5224\u5B9A\u662F\u5426\u80A5\u80D6\uFF0C\u4E5F\u4E0D\u8BA1\u7B97\u4E2A\u6027\u5316\u51CF\u91CD\u76EE\u6807\u3002\u5FEB\u901F\u3001\u65E0\u6CD5\u89E3\u91CA\u7684\u53D8\u5316\u8BF7\u54A8\u8BE2\u4E13\u4E1A\u4EBA\u5458\u3002", related: "lunch", source: "food" },
  { id: "stress", title: "\u6700\u8FD1\u6709\u70B9\u7D27\u7EF7", subtitle: "\u7ED9\u5FD9\u788C\u7559\u4E00\u4E2A\u6682\u505C\u952E", group: "\u4F5C\u606F\u4E0E\u60C5\u7EEA", icon: "heart", accent: "purple", tips: ["\u7ED9\u81EA\u5DF1\u7559\u4E00\u5C0F\u6BB5\u4E0D\u7528\u5B8C\u6210\u4EFB\u52A1\u7684\u65F6\u95F4\u3002", "\u8BB0\u5F55\u8BA9\u81EA\u5DF1\u7D27\u7EF7\u7684\u4E8B\uFF0C\u5C1D\u8BD5\u51CF\u5C11\u4E00\u4E2A\u53EF\u8C03\u6574\u7684\u8D1F\u62C5\u3002", "\u4E0E\u4FE1\u4EFB\u7684\u4EBA\u4EA4\u6D41\uFF1B\u6301\u7EED\u56F0\u6270\u65F6\u5BFB\u6C42\u4E13\u4E1A\u652F\u6301\u3002"], boundary: "\u8FD9\u91CC\u63D0\u4F9B\u65E5\u5E38\u751F\u6D3B\u53C2\u8003\uFF0C\u4E0D\u8BC4\u4F30\u6216\u6CBB\u7597\u5FC3\u7406\u75BE\u75C5\u3002", related: null, source: "nutrition" }
];
var articles = [
  { id: "season", title: "\u767D\u9732\u4E4B\u540E\uFF0C\u628A\u4E09\u9910\u5403\u5F97\u8212\u670D\u4E00\u70B9", label: "\u65F6\u4EE4\u98DF\u517B", image: "assets/tea.jpg", read: "3 \u5206\u949F", intro: "\u5B63\u8282\u53EF\u4EE5\u6210\u4E3A\u8C03\u6574\u751F\u6D3B\u8282\u594F\u7684\u63D0\u9192\u3002\u5177\u4F53\u5403\u4EC0\u4E48\uFF0C\u4ECD\u8981\u7ED3\u5408\u98DF\u7269\u591A\u6837\u6027\u3001\u81EA\u5DF1\u7684\u504F\u597D\u4E0E\u5B9E\u9645\u9700\u8981\u3002", paragraphs: [["\u4ECE\u5BB6\u5E38\u98DF\u7269\u5F00\u59CB", "\u7ED9\u9910\u684C\u4FDD\u7559\u4E3B\u98DF\u3001\u852C\u83DC\u548C\u9002\u5408\u81EA\u5DF1\u7684\u86CB\u767D\u8D28\u98DF\u7269\u3002\u9009\u62E9\u5F53\u5B63\u98DF\u6750\uFF0C\u53EF\u4EE5\u8BA9\u65E5\u5E38\u642D\u914D\u6709\u66F4\u591A\u53D8\u5316\u3002"], ["\u996E\u54C1\u662F\u751F\u6D3B\u9009\u62E9", "\u8336\u996E\u53EF\u4EE5\u662F\u98CE\u5473\u4F53\u9A8C\uFF0C\u4E0D\u9700\u8981\u627F\u62C5\u51CF\u80A5\u3001\u6D88\u80BF\u6216\u6CBB\u7597\u75BE\u75C5\u7684\u4EFB\u52A1\u3002\u7559\u610F\u539F\u6599\u3001\u9002\u7528\u6761\u4EF6\u548C\u662F\u5426\u989D\u5916\u52A0\u7CD6\u3002"], ["\u7ED9\u8BA1\u5212\u7559\u4E00\u70B9\u4F59\u5730", "\u5FD9\u788C\u65F6\u7528\u66F4\u5BB9\u6613\u51C6\u5907\u7684\u642D\u914D\uFF0C\u4E70\u4E0D\u5230\u7684\u98DF\u6750\u53EF\u4EE5\u66FF\u6362\u3002\u9002\u5408\u957F\u671F\u751F\u6D3B\u7684\u5B89\u6392\uFF0C\u901A\u5E38\u9700\u8981\u4E00\u70B9\u5F39\u6027\u3002"]], source: "nutrition" },
  { id: "balance", title: "\u60F3\u7BA1\u7406\u4F53\u91CD\uFF0C\u5148\u628A\u4E00\u987F\u996D\u642D\u914D\u597D", label: "\u996E\u98DF\u77E5\u8BC6", image: "assets/lunch.jpg", read: "4 \u5206\u949F", intro: "\u201C\u53EA\u5403\u67D0\u79CD\u98DF\u7269\u201D\u548C\u201C\u4E00\u987F\u996D\u600E\u4E48\u642D\u914D\u201D\u662F\u4E0D\u540C\u7684\u95EE\u9898\u3002\u5148\u770B\u6574\u4F53\u996E\u98DF\uFF0C\u518D\u8003\u8651\u5177\u4F53\u66FF\u6362\u3002", paragraphs: [["\u770B\u770B\u8FD9\u4E00\u9910\u90FD\u6709\u4EC0\u4E48", "\u7559\u610F\u4E3B\u98DF\u3001\u852C\u83DC\u4E0E\u86CB\u767D\u8D28\u98DF\u7269\u662F\u5426\u90FD\u6709\uFF0C\u4E5F\u7559\u610F\u996E\u6599\u3001\u96F6\u98DF\u548C\u8C03\u5473\u5E26\u6765\u7684\u989D\u5916\u6444\u5165\u3002"], ["\u5148\u627E\u5230\u5BB9\u6613\u6539\u53D8\u7684\u4E00\u5904", "\u53EF\u4EE5\u4ECE\u51CF\u5C11\u542B\u7CD6\u996E\u6599\u3001\u8C03\u6574\u70F9\u8C03\u65B9\u5F0F\u7B49\u5177\u4F53\u4E60\u60EF\u5F00\u59CB\u3002\u4E2A\u4F53\u7684\u80FD\u91CF\u76EE\u6807\u9700\u8981\u5145\u5206\u4FE1\u606F\u548C\u53EF\u9760\u8BA1\u7B97\u3002"], ["\u98DF\u517B\u4E0D\u66FF\u4EE3\u4E13\u4E1A\u8BC4\u4F30", "\u6709\u7279\u6B8A\u5065\u5EB7\u72B6\u51B5\u3001\u8FD1\u671F\u4F53\u91CD\u660E\u663E\u53D8\u5316\uFF0C\u6216\u9700\u8981\u6CBB\u7597\u6027\u81B3\u98DF\u65F6\uFF0C\u5148\u54A8\u8BE2\u4E13\u4E1A\u4EBA\u5458\u3002"]], source: "food" }
];
for (const item of [...recipes, ...topics, ...articles]) {
  item.reviewStatus = "pending";
  item.contentVersion = "0.1-draft";
}

// src/shared/safety.js
var ruleVersion = "zy-health-v0.2";
var urgentText = "\u4F60\u63CF\u8FF0\u7684\u60C5\u51B5\u9700\u8981\u7ACB\u5373\u83B7\u5F97\u4E13\u4E1A\u5E2E\u52A9\u3002\u8BF7\u7ACB\u5373\u8054\u7CFB\u5F53\u5730\u6025\u6551\u670D\u52A1\uFF08\u4E2D\u56FD\u5927\u9646\u62E8\u6253 120\uFF09\uFF0C\u6216\u8BF7\u8EAB\u8FB9\u7684\u4EBA\u534F\u52A9\u8054\u7CFB\u3002\u8BF7\u4E0D\u8981\u7B49\u5F85\u672C\u52A9\u624B\u56DE\u590D\u6216\u7EE7\u7EED\u5BFB\u627E\u98DF\u517B\u65B9\u6848\u3002";
var urgentPattern = /呼吸困难|无法吞咽|喘不过气|不能呼吸|胸痛|呕血|昏迷|叫不醒|突然.{0,6}(最严重|剧烈).{0,3}头痛|头痛.{0,8}(说话不清|一侧无力)|想自杀|准备自杀|不想活|吃了.{0,5}(一瓶|大量).{0,5}药/g;
function isExplicitUrgent(message) {
  return String(message).split(/[，。！？；\n]/).some((clause) => {
    return [...clause.matchAll(urgentPattern)].some((match) => {
      const prefix = clause.slice(0, match.index);
      if (/^(请问)?(什么是|科普|解释|如果|假如)/.test(clause)) return false;
      if (/以前|曾经|去年/.test(prefix) && !/现在|目前|此刻/.test(prefix)) return false;
      return !/(没有|并无|否认|不是|不伴有|无)(任何)?$/.test(prefix);
    });
  });
}
var isSensitive = (text) => /怀孕|孕妇|孕期|备孕|哺乳|婴儿|宝宝|儿童|未成年|高龄|老人|[七八九]十岁|[789]\d岁|基础病|糖尿病|高血压|肾病|肝病|心脏病|服药|吃药|用药|过敏|抗凝|手术|正在治疗|药名不清/.test(text);
function urgentResponse(requestId) {
  return { requestId, mode: "urgent_help", text: urgentText, contentRefs: [], sources: [], followUpQuestions: [], ruleVersion, demo: true };
}
function validateReply(reply, requestId) {
  if (!reply || reply.requestId !== requestId || !["answer", "clarify", "professional_help", "urgent_help", "unavailable"].includes(reply.mode) || typeof reply.text !== "string" || reply.text.length > 6e3 || !Array.isArray(reply.contentRefs) || !Array.isArray(reply.followUpQuestions) || reply.followUpQuestions.some((q) => typeof q !== "string" || q.length > 200) || !Array.isArray(reply.sources) || reply.ruleVersion !== ruleVersion) throw new Error("\u56DE\u590D\u683C\u5F0F\u6821\u9A8C\u672A\u901A\u8FC7");
  if (reply.mode !== "answer" && (Object.hasOwn(reply, "planDraft") || reply.contentRefs.length)) throw new Error("\u6B64\u7C7B\u56DE\u590D\u7981\u6B62\u9644\u5E26\u65B9\u6848");
  if (reply.mode === "urgent_help" && (reply.followUpQuestions.length || reply.sources.length || reply.text !== urgentText)) throw new Error("\u7D27\u6025\u6C42\u52A9\u56DE\u590D\u672A\u901A\u8FC7\u6821\u9A8C");
  return reply;
}

// src/shared/id.js
function createId(cryptoImpl = globalThis.crypto) {
  if (typeof cryptoImpl?.randomUUID === "function") return cryptoImpl.randomUUID();
  if (typeof cryptoImpl?.getRandomValues !== "function") throw new Error("\u65E0\u6CD5\u751F\u6210\u7F16\u53F7");
  const bytes = new Uint8Array(16);
  cryptoImpl.getRandomValues(bytes);
  bytes[6] = bytes[6] & 15 | 64;
  bytes[8] = bytes[8] & 63 | 128;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// src/shared/meals.js
var defaultDietSettings = () => ({
  targets: { kcal: null, protein: null, fat: null, carb: null, source: "user", confirmed: false },
  flags: { pregnancy: false, lactation: false, minor: false, kidney: false, diabetes: false, hypertension: false, eatingDisorder: false },
  flagsConfirmed: false
});
var MEALS = /* @__PURE__ */ new Set(["breakfast", "lunch", "dinner", "snack"]);
var STATUSES = /* @__PURE__ */ new Set(["matched", "unestimated", "ambiguous"]);
function cleanDietSettings(input = {}) {
  const base = defaultDietSettings();
  const targets = input.targets || {};
  const flags = input.flags || {};
  base.targets.confirmed = targets.confirmed === true;
  base.targets.source = "user";
  for (const key of ["kcal", "protein", "fat", "carb"]) base.targets[key] = cleanTarget(targets[key], key === "kcal" ? 1e4 : 500);
  base.flagsConfirmed = input.flagsConfirmed === true;
  for (const key of Object.keys(base.flags)) base.flags[key] = flags[key] === true;
  if (!base.flagsConfirmed) {
    for (const key of Object.keys(base.flags)) base.flags[key] = false;
  }
  return base;
}
function cleanTarget(value, max) {
  if (value == null || value === "") return null;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > max) throw new Error("\u6BCF\u65E5\u76EE\u6807\u6570\u5B57\u65E0\u6548");
  return number;
}
function validateMeal(meal) {
  if (!meal || typeof meal.id !== "string" || !/^[\w-]{1,100}$/.test(meal.id)) throw new Error("\u8FD9\u4E00\u9910\u7684\u7F16\u53F7\u65E0\u6548");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meal.date)) throw new Error("\u65E5\u671F\u65E0\u6548");
  if (!MEALS.has(meal.meal)) throw new Error("\u9910\u6B21\u65E0\u6548");
  if (!["text", "photo"].includes(meal.inputType)) throw new Error("\u8BB0\u5F55\u65B9\u5F0F\u65E0\u6548");
  if (typeof meal.rawText !== "string" || meal.rawText.length > 1500) throw new Error("\u539F\u59CB\u6587\u5B57\u8FC7\u957F");
  if (meal.inputType === "photo" && meal.rawText.includes("data:image")) throw new Error("\u7167\u7247\u4E0D\u4FDD\u5B58\u5728\u672C\u673A\u8BB0\u5F55\u91CC");
  if (!Array.isArray(meal.items) || !meal.items.length || meal.items.length > 12) throw new Error("\u98DF\u7269\u9879\u65E0\u6548");
  for (const item of meal.items) validateMealItem(item);
  return {
    id: meal.id,
    date: meal.date,
    meal: meal.meal,
    inputType: meal.inputType,
    rawText: meal.rawText,
    items: meal.items.map((item) => ({ ...item, nutrition: item.nutrition ? { ...item.nutrition, per100g: item.nutrition.per100g ? { ...item.nutrition.per100g } : void 0 } : null, candidates: item.candidates || [] })),
    createdAt: typeof meal.createdAt === "string" ? meal.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    stub: meal.stub === true
  };
}
function validateMealItem(item) {
  if (!item || typeof item.name !== "string" || !item.name.trim() || item.name.length > 40) throw new Error("\u98DF\u7269\u540D\u65E0\u6548");
  if (!STATUSES.has(item.status)) throw new Error("\u98DF\u7269\u72B6\u6001\u65E0\u6548");
  if (item.grams != null && (!Number.isFinite(item.grams) || item.grams <= 0 || item.grams > 5e3)) throw new Error("\u514B\u6570\u65E0\u6548");
  if (item.status === "matched") {
    if (!item.foodId || !item.nutrition) throw new Error("\u5DF2\u5339\u914D\u7684\u98DF\u7269\u7F3A\u5C11\u8BA1\u7B97\u7ED3\u679C");
    for (const key of ["kcal", "protein", "fat", "carb"]) if (!Number.isInteger(item.nutrition[key]) || item.nutrition[key] < 0) throw new Error("\u8425\u517B\u6570\u5B57\u65E0\u6548");
    if (!item.nutrition.source || !item.nutrition.sourceNote || !item.nutrition.version) throw new Error("\u8425\u517B\u6570\u5B57\u7F3A\u5C11\u6765\u6E90");
    if (item.nutrition.foodId !== item.foodId) throw new Error("\u8425\u517B\u6765\u6E90\u548C\u98DF\u7269\u4E0D\u4E00\u81F4");
  } else if (item.nutrition != null) throw new Error("\u65E0\u6CD5\u4F30\u7B97\u7684\u98DF\u7269\u4E0D\u80FD\u5E26\u70ED\u91CF");
}
function localDateString(date = /* @__PURE__ */ new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day2 = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day2}`;
}

// src/shared/records.js
var defaultProfile = { name: "\u4F53\u9A8C\u7528\u6237", goal: "\u5747\u8861\u996E\u98DF", habit: "\u81EA\u5DF1\u505A\u996D\u4E0E\u5916\u98DF\u90FD\u6709", preference: "\u6682\u65E0\u504F\u597D", updated: "" };
var emptyState = () => ({ profile: { ...defaultProfile }, saved: [], plans: [], assessments: [], draft: null, meals: [], dietSettings: defaultDietSettings() });
function cleanProfile(input = {}) {
  return Object.fromEntries(Object.entries(defaultProfile).map(([key, fallback]) => [key, typeof input[key] === "string" ? input[key].slice(0, key === "name" ? 20 : 80) : fallback]));
}
var validFavorite = (key) => /^(recipe:(breakfast|lunch|dinner|tea|oats)|article:(season|balance))$/.test(key);
function validatePlan(plan) {
  if (!plan || typeof plan.id !== "string" || !plan.id || plan.id.length > 100 || !Number.isInteger(plan.revision) || plan.revision < 1 || typeof plan.title !== "string" || plan.title.length > 150 || typeof plan.goal !== "string" || typeof plan.note !== "string" || !Array.isArray(plan.meals) || !plan.meals.length || plan.meals.length > 12 || plan.meals.some((m) => !m || typeof m.label !== "string" || typeof m.value !== "string" || m.value.length > 500) || plan.provenance !== "demo") throw new Error("\u65B9\u6848\u6570\u636E\u4E0D\u5B8C\u6574");
  return plan;
}
function nextPlanRecord(draft, current) {
  validatePlan(draft);
  if (current ? current.revision !== draft.baseRevision : draft.baseRevision != null) throw new Error("\u65B9\u6848\u5DF2\u53D8\u66F4\u6216\u88AB\u5220\u9664\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u540E\u8C03\u6574");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return { ...structuredClone(draft), baseRevision: void 0, revision: (current?.revision || 0) + 1, createdAt: current?.createdAt || now, updatedAt: now };
}
function migrateLegacy(raw) {
  let old;
  try {
    old = JSON.parse(raw);
  } catch {
    return emptyState();
  }
  const state2 = emptyState();
  if (!old || typeof old !== "object") return state2;
  state2.profile = cleanProfile(old.profile);
  state2.saved = Array.isArray(old.saved) ? [...new Set(old.saved.filter(validFavorite))] : [];
  for (const p of Array.isArray(old.plans) ? old.plans : []) {
    try {
      state2.plans.push(validatePlan({ ...p, id: createId(), revision: 1, provenance: "demo", legacy: true, note: typeof p.note === "string" ? p.note : "\u65E7\u7248\u6F14\u793A\u65B9\u6848" }));
    } catch {
    }
  }
  return state2;
}

// src/client/agent-client.js
async function getAgentReply(request, { signal } = {}) {
  if (request.safetyContext?.urgent || [request.message, ...request.history.filter((h) => h.role === "user").map((h) => h.content)].some(isExplicitUrgent)) return urgentResponse(request.requestId);
  const response = await fetch("/api/agent", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(request), signal, cache: "no-store" });
  if (!response.ok) throw new Error(response.status === 429 ? "\u8BF7\u6C42\u8F83\u591A\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" : "\u54A8\u8BE2\u670D\u52A1\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u8BD5");
  const reply = validateReply(await response.json(), request.requestId);
  if (reply.planDraft) validatePlan(reply.planDraft);
  for (const ref of reply.contentRefs) if (!{ recipe: recipes, topic: topics, article: articles }[ref.type]?.some((r) => r.id === ref.id)) throw new Error("\u5185\u5BB9\u5F15\u7528\u672A\u901A\u8FC7\u6821\u9A8C");
  return reply;
}

// content/questionnaire.json
var questionnaire_default = {
  id: "zy-constitution-candidate-v0.1",
  scoreVersion: "zy-descriptive-score-v0.1",
  classification: null,
  agentEligible: false,
  validationStatus: "pending",
  order: [
    "Q01",
    "Q05",
    "Q09",
    "Q12",
    "Q16",
    "Q19",
    "Q23",
    "Q26",
    "Q30",
    "Q02",
    "Q06",
    "Q10",
    "Q13",
    "Q17",
    "Q20",
    "Q24",
    "Q27",
    "Q31",
    "Q03",
    "Q07",
    "Q11",
    "Q14",
    "Q18",
    "Q21",
    "Q25",
    "Q28",
    "Q32",
    "Q04",
    "Q08",
    "Q15",
    "Q22",
    "Q29"
  ],
  questions: [
    {
      id: "Q01",
      dimension: "balanced",
      text: "\u4F60\u6709\u8DB3\u591F\u7684\u7CBE\u529B\u5B8C\u6210\u81EA\u5DF1\u5E73\u5E38\u7684\u65E5\u5E38\u4E8B\u52A1\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u4F53\u80FD\u4E0E\u751F\u6D3B\u8D1F\u62C5\u4F1A\u5F71\u54CD\u56DE\u7B54",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q02",
      dimension: "balanced",
      text: "\u4E00\u591C\u7761\u7720\u4E4B\u540E\uFF0C\u4F60\u901A\u5E38\u89C9\u5F97\u4F11\u606F\u8FC7\u6765\u4E86\u5417\uFF1F",
      reviewNote: "S15\uFF1B\u7761\u7720\u673A\u4F1A\u3001\u8F6E\u73ED\u4F1A\u5F71\u54CD\u56DE\u7B54",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q03",
      dimension: "balanced",
      text: "\u5230\u4E86\u5E73\u5E38\u5403\u996D\u7684\u65F6\u95F4\uFF0C\u4F60\u4F1A\u81EA\u7136\u611F\u5230\u6709\u80C3\u53E3\u5417\uFF1F",
      reviewNote: "S15\uFF1B\u533A\u5206\u80C3\u53E3\u4E0E\u8FDB\u98DF\u591A\u5C11",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q04",
      dimension: "balanced",
      text: "\u5728\u65E5\u5E38\u6C14\u6E29\u53D8\u5316\u4E2D\uFF0C\u4F60\u901A\u5E38\u80FD\u4FDD\u6301\u8212\u9002\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u4E0E\u7A7F\u8863\u548C\u73AF\u5883\u6761\u4EF6\u6709\u5173",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q05",
      dimension: "qi_deficiency",
      text: "\u505A\u5B8C\u5E73\u5E38\u80FD\u5E94\u4ED8\u7684\u8F7B\u91CF\u5BB6\u52A1\u540E\uFF0C\u4F60\u4F1A\u89C9\u5F97\u660E\u663E\u75B2\u5026\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u6B8B\u969C\u3001\u6162\u6027\u75C5\u548C\u5DE5\u4F5C\u8D1F\u62C5\u9700\u8003\u8651",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q06",
      dimension: "qi_deficiency",
      text: "\u4F60\u60F3\u6B63\u5E38\u8BF4\u8BDD\u65F6\uFF0C\u4F1A\u89C9\u5F97\u58F0\u97F3\u53D1\u4E0D\u51FA\u6765\u529B\u6C14\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u907F\u514D\u628A\u6027\u683C\u5B89\u9759\u5F53\u6210\u75C7\u72B6",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q07",
      dimension: "qi_deficiency",
      text: "\u6309\u81EA\u5DF1\u5E73\u5E38\u7684\u901F\u5EA6\u8D70\u8DEF\u65F6\uFF0C\u4F60\u4F1A\u89C9\u5F97\u6C14\u4E0D\u591F\u7528\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u4E0D\u80FD\u628A\u65B0\u53D1\u6C14\u4FC3\u5F52\u4E3A\u4F53\u8D28",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q08",
      dimension: "qi_deficiency",
      text: "\u5728\u4E0D\u70ED\u3001\u4E5F\u6CA1\u6709\u660E\u663E\u6D3B\u52A8\u65F6\uFF0C\u4F60\u4ECD\u5BB9\u6613\u51FA\u6C57\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u836F\u7269\u3001\u73AF\u5883\u548C\u7279\u6B8A\u751F\u7406\u72B6\u6001\u53EF\u80FD\u5F71\u54CD",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q09",
      dimension: "yang_deficiency",
      text: "\u5728\u5BA4\u5185\u6E29\u5EA6\u8212\u9002\u65F6\uFF0C\u4F60\u7684\u624B\u811A\u4ECD\u4F1A\u89C9\u5F97\u51B7\u5417\uFF1F",
      reviewNote: "S15\uFF1B\u533A\u5206\u73AF\u5883\u51B7\u4E0E\u81EA\u8EAB\u611F\u53D7",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q10",
      dimension: "yang_deficiency",
      text: "\u5728\u522B\u4EBA\u89C9\u5F97\u5408\u9002\u7684\u6E29\u5EA6\u4E0B\uFF0C\u4F60\u4ECD\u60F3\u589E\u52A0\u8863\u7269\u4FDD\u6696\u5417\uFF1F",
      reviewNote: "S15\uFF1B\u4E0E\u6BD4\u8F83\u5BF9\u8C61\u548C\u7A7F\u8863\u4E60\u60EF\u6709\u5173",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q11",
      dimension: "yang_deficiency",
      text: "\u4F60\u7684\u8179\u90E8\u4F1A\u6709\u660E\u663E\u7684\u53D1\u51C9\u611F\u5417\uFF1F",
      reviewNote: "S15\uFF1B\u5355\u4E00\u611F\u53D7\u4E0D\u4EE3\u8868\u75C5\u56E0\uFF0C\u5BA1\u6838\u662F\u5426\u4FDD\u7559",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q12",
      dimension: "yin_deficiency",
      text: "\u6309\u5E73\u5E38\u4E60\u60EF\u996E\u6C34\u540E\uFF0C\u4F60\u7684\u53E3\u8154\u4ECD\u4F1A\u611F\u89C9\u5E72\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u4E0D\u7531\u6B64\u5224\u65AD\u7F3A\u6C34\u6216\u75BE\u75C5",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q13",
      dimension: "yin_deficiency",
      text: "\u4F60\u4F1A\u6709\u773C\u775B\u5E72\u6DA9\u7684\u611F\u89C9\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u5C4F\u5E55\u4F7F\u7528\u3001\u9690\u5F62\u773C\u955C\u7B49\u53EF\u80FD\u5F71\u54CD",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q14",
      dimension: "yin_deficiency",
      text: "\u6CA1\u6709\u53D1\u70ED\u65F6\uFF0C\u4F60\u7684\u624B\u5FC3\u6216\u811A\u5FC3\u4ECD\u4F1A\u89C9\u5F97\u53D1\u70ED\u5417\uFF1F",
      reviewNote: "S15\uFF1B\u5BA1\u6838\u7528\u6237\u80FD\u5426\u533A\u5206\u4F53\u611F\u4E0E\u4F53\u6E29",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q15",
      dimension: "yin_deficiency",
      text: "\u4F60\u6392\u4FBF\u65F6\u4F1A\u9047\u5230\u5927\u4FBF\u5E72\u786C\u7684\u60C5\u51B5\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u4E0D\u80FD\u636E\u6B64\u628A\u4FBF\u79D8\u5F52\u56E0\u4E8E\u9634\u865A",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q16",
      dimension: "phlegm_dampness",
      text: "\u65E5\u5E38\u6D3B\u52A8\u65F6\uFF0C\u4F60\u4F1A\u89C9\u5F97\u8EAB\u4F53\u6C89\u7538\u7538\u3001\u4E0D\u591F\u8F7B\u677E\u5417\uFF1F",
      reviewNote: "S03\uFF1B\u4E0D\u4EE5\u4F53\u91CD\u4F5C\u4E3A\u7B54\u6848\u7F16\u7801",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q17",
      dimension: "phlegm_dampness",
      text: "\u5728\u6CA1\u6709\u521A\u5403\u4E1C\u897F\u65F6\uFF0C\u4F60\u7684\u53E3\u4E2D\u4ECD\u4F1A\u6709\u9ECF\u817B\u611F\u5417\uFF1F",
      reviewNote: "S03\uFF1B\u5BA1\u6838\u201C\u9ECF\u817B\u201D\u662F\u5426\u6613\u61C2",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q18",
      dimension: "phlegm_dampness",
      text: "\u6CA1\u6709\u6B63\u60A3\u611F\u5192\u65F6\uFF0C\u4F60\u7684\u5589\u95F4\u4ECD\u7ECF\u5E38\u6709\u75F0\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u9700\u6838\u5B9E\u4E0E\u76F8\u5173\u6982\u5FF5\u7684\u5BF9\u5E94\uFF0C\u4E0D\u63A8\u65AD\u75C5\u56E0",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q19",
      dimension: "damp_heat",
      text: "\u4F60\u6E05\u6D01\u9762\u90E8\u540E\uFF0C\u76AE\u80A4\u4F1A\u8F83\u5FEB\u51FA\u73B0\u660E\u663E\u6CB9\u817B\u611F\u5417\uFF1F",
      reviewNote: "S03\uFF1B\u62A4\u80A4\u4E60\u60EF\u548C\u76AE\u80A4\u7C7B\u578B\u53EF\u80FD\u5F71\u54CD",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q20",
      dimension: "damp_heat",
      text: "\u4F60\u4F1A\u53CD\u590D\u957F\u51FA\u7EA2\u80BF\u7684\u75D8\u75D8\u5417\uFF1F",
      reviewNote: "S03\uFF1B\u4E0D\u80FD\u4EE5\u75E4\u75AE\u66FF\u4EE3\u4F53\u8D28\u5224\u5B9A",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q21",
      dimension: "damp_heat",
      text: "\u6CA1\u6709\u521A\u5403\u82E6\u5473\u98DF\u7269\u65F6\uFF0C\u4F60\u53E3\u4E2D\u4ECD\u4F1A\u6709\u82E6\u5473\u5417\uFF1F",
      reviewNote: "S03\uFF1B\u836F\u7269\u3001\u53E3\u8154\u60C5\u51B5\u53EF\u80FD\u5F71\u54CD",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q22",
      dimension: "damp_heat",
      text: "\u4F60\u6392\u4FBF\u540E\uFF0C\u4F1A\u89C9\u5F97\u5927\u4FBF\u9ECF\u6EDE\u3001\u4E0D\u6613\u6392\u51C0\u5417\uFF1F",
      reviewNote: "S03\uFF1B\u9700\u62C6\u5206\u201C\u9ECF\u6EDE\u201D\u548C\u201C\u6392\u51C0\u611F\u201D\u7684\u53EF\u80FD\u6DF7\u6DC6",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q23",
      dimension: "blood_stasis",
      text: "\u4F60\u4F1A\u53D1\u73B0\u76AE\u80A4\u4E0A\u6709\u9752\u7D2B\u5370\uFF0C\u5374\u4E0D\u8BB0\u5F97\u78B0\u649E\u8FC7\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u4E0D\u80FD\u628A\u4E0D\u660E\u7600\u6591\u89E3\u91CA\u4E3A\u4EC5\u9700\u98DF\u517B",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q24",
      dimension: "blood_stasis",
      text: "\u4F60\u7684\u8EAB\u4F53\u4F1A\u5728\u540C\u4E00\u4E2A\u4F4D\u7F6E\u53CD\u590D\u51FA\u73B0\u75BC\u75DB\u5417\uFF1F",
      reviewNote: "S15\uFF1B\u5B9A\u4F4D\u3001\u4E25\u91CD\u7A0B\u5EA6\u548C\u8BCA\u7597\u9700\u6C42\u53E6\u884C\u5904\u7406",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q25",
      dimension: "blood_stasis",
      text: "\u4F60\u4F1A\u7559\u610F\u5230\u76AE\u80A4\u4E0A\u51FA\u73B0\u6BD4\u5468\u56F4\u660E\u663E\u66F4\u6DF1\u7684\u6591\u7247\u5417\uFF1F",
      reviewNote: "S15\uFF1B\u7279\u5F02\u6027\u5F31\u3001\u80A4\u8272\u5DEE\u5F02\u660E\u663E\uFF0C\u4F18\u5148\u8BC4\u4F30\u5220\u6539",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q26",
      dimension: "qi_stagnation",
      text: "\u4F60\u4F1A\u6709\u4E00\u6BB5\u65F6\u95F4\u5FC3\u60C5\u4F4E\u843D\u3001\u63D0\u4E0D\u8D77\u5174\u81F4\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u4E0D\u4F5C\u4E3A\u6291\u90C1\u7B5B\u67E5\u6216\u8BCA\u65AD",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q27",
      dimension: "qi_stagnation",
      text: "\u9762\u5BF9\u65E5\u5E38\u4E8B\u52A1\u65F6\uFF0C\u4F60\u4F1A\u611F\u5230\u7D27\u5F20\u3001\u96BE\u4EE5\u653E\u677E\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u533A\u5206\u751F\u6D3B\u538B\u529B\u4E0E\u4F53\u8D28\u6784\u5FF5",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q28",
      dimension: "qi_stagnation",
      text: "\u4F60\u4F1A\u4E0D\u7531\u81EA\u4E3B\u5730\u53F9\u6C14\u5417\uFF1F",
      reviewNote: "S03\uFF1B\u9700\u8981\u6D4B\u8BD5\u9898\u610F\u4E0E\u533A\u5206\u80FD\u529B",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q29",
      dimension: "qi_stagnation",
      text: "\u4E0D\u5728\u5403\u4E1C\u897F\u65F6\uFF0C\u4F60\u7684\u5589\u5499\u4F1A\u6709\u50CF\u5361\u7740\u4E1C\u897F\u7684\u611F\u89C9\u5417\uFF1F",
      reviewNote: "S03\uFF1B\u4E0D\u6392\u9664\u771F\u5B9E\u541E\u54BD\u6216\u5176\u4ED6\u95EE\u9898",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q30",
      dimension: "special",
      text: "\u63A5\u89E6\u7070\u5C18\u6216\u82B1\u7C89\u65F6\uFF0C\u4F60\u4F1A\u63A5\u8FDE\u6253\u55B7\u568F\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u6CA1\u6709\u63A5\u89E6\u7ECF\u5386\u53EF\u9009\u4E0D\u9002\u7528",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q31",
      dimension: "special",
      text: "\u63A5\u89E6\u65E5\u5E38\u7528\u54C1\u540E\uFF0C\u4F60\u7684\u76AE\u80A4\u4F1A\u51FA\u73B0\u53D1\u75D2\u7684\u53CD\u5E94\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u4E0D\u8BA9\u7528\u6237\u81EA\u884C\u786E\u5B9A\u8FC7\u654F\u539F",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    },
    {
      id: "Q32",
      dimension: "special",
      text: "\u4F60\u4F1A\u53CD\u590D\u51FA\u73B0\u4E00\u7247\u7247\u9686\u8D77\u3001\u53D1\u75D2\uFF0C\u4E4B\u540E\u53C8\u6D88\u9000\u7684\u76AE\u80A4\u53D8\u5316\u5417\uFF1F",
      reviewNote: "S02\uFF1B\u907F\u514D\u8981\u6C42\u7528\u6237\u8BC6\u522B\u201C\u98CE\u56E2\u201D\u672F\u8BED\uFF0C\u9700\u6838\u5B9E\u8986\u76D6",
      itemVersion: "0.1.0-draft",
      contentReview: "pending"
    }
  ]
};

// src/shared/assessment.js
var options = [
  [0, "\u4ECE\u672A\u6216\u51E0\u4E4E\u6CA1\u6709"],
  [1, "\u5076\u5C14\uFF0C\u53EA\u6709\u5C11\u6570\u65F6\u5019"],
  [2, "\u6709\u65F6\uFF0C\u95F4\u6B47\u51FA\u73B0"],
  [3, "\u7ECF\u5E38\uFF0C\u591A\u6570\u65F6\u5019"],
  [4, "\u51E0\u4E4E\u603B\u662F"],
  ["UNSURE", "\u8BB0\u4E0D\u6E05\uFF0F\u65E0\u6CD5\u5224\u65AD"],
  ["NOT_APPLICABLE", "\u8FD9\u9053\u9898\u4E0D\u9002\u7528"],
  ["DECLINED", "\u4E0D\u613F\u56DE\u7B54"]
];
function scoreAssessment(answers, version = questionnaire_default.id, scoreVersion = questionnaire_default.scoreVersion) {
  if (version !== questionnaire_default.id || scoreVersion !== questionnaire_default.scoreVersion || !Array.isArray(answers)) throw new Error("\u95EE\u5377\u7248\u672C\u4E0D\u53D7\u652F\u6301");
  const values = /* @__PURE__ */ new Map();
  for (const answer of answers) {
    if (!answer || !questionnaire_default.questions.some((q) => q.id === answer.id) || values.has(answer.id) || !options.some(([v]) => v === answer.value)) throw new Error("\u5B58\u5728\u65E0\u6548\u6216\u91CD\u590D\u7B54\u6848");
    values.set(answer.id, answer.value);
  }
  const missing = questionnaire_default.order.filter((id) => !values.has(id));
  if (missing.length) return { status: "incomplete", missing, classification: null, agentEligible: false };
  const dimensions = {};
  for (const dimension of new Set(questionnaire_default.questions.map((q) => q.dimension))) {
    const items = questionnaire_default.questions.filter((q) => q.dimension === dimension);
    const excluded = items.filter((q) => typeof values.get(q.id) !== "number").map((q) => ({ id: q.id, reason: values.get(q.id) }));
    dimensions[dimension] = excluded.length ? { status: "unscorable", excluded } : { status: "scorable", mean: items.reduce((sum, q) => sum + values.get(q.id), 0) / items.length };
  }
  return { status: "pilot_reference", questionnaireVersion: version, scoreVersion, dimensions, classification: null, agentEligible: false, reviewStatus: "pending" };
}
function assessmentRecord(answers) {
  const result = scoreAssessment(answers);
  if (result.status !== "pilot_reference") throw new Error("\u8BF7\u5148\u5B8C\u6210\u5168\u90E8\u9898\u76EE");
  return { id: createId(), answers: structuredClone(answers), result, createdAt: (/* @__PURE__ */ new Date()).toISOString(), useConditions: "\u6210\u4EBA\u53EF\u7406\u89E3\u6027\u8BD5\u6D4B\uFF1B\u672A\u7ECF\u6D4B\u91CF\u9A8C\u8BC1", questionnaireVersion: questionnaire_default.id };
}

// src/client/storage.js
var DB_NAME = "zhiyang-local-v2";
var stores = ["profile", "favorites", "plans", "assessments", "drafts", "meta", "meals", "dietSettings"];
async function openStorage(factory = globalThis.indexedDB, legacy = globalThis.localStorage) {
  if (!factory) throw new Error("\u6B64\u6D4F\u89C8\u5668\u65E0\u6CD5\u4F7F\u7528\u672C\u673A\u5B58\u50A8");
  const db = await new Promise((resolve, reject) => {
    const req = factory.open(DB_NAME, 2);
    req.onupgradeneeded = () => {
      const db2 = req.result;
      for (const name of stores) if (!db2.objectStoreNames.contains(name)) db2.createObjectStore(name);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error("\u8BF7\u5173\u95ED\u5176\u4ED6\u65E7\u7248\u9875\u9762\u540E\u91CD\u8BD5"));
  });
  db.onversionchange = () => db.close();
  const transact = (names, work, mode = "readwrite") => new Promise((resolve, reject) => {
    let result, failure;
    const tx = db.transaction(names, mode);
    const set = (value) => {
      result = value;
    };
    const abort = (error) => {
      failure = error;
      tx.abort();
    };
    tx.oncomplete = () => resolve(result);
    tx.onabort = tx.onerror = () => reject(failure || tx.error || new Error("\u4FDD\u5B58\u672A\u5B8C\u6210"));
    try {
      work(tx, set, abort);
    } catch (error) {
      abort(error);
    }
  });
  try {
    await transact(stores, (tx, _set, abort) => {
      const meta = tx.objectStore("meta");
      const req = meta.get("legacy-v1");
      req.onsuccess = () => {
        if (req.result) return;
        let raw = null;
        try {
          raw = legacy?.getItem("zhiyang-demo-v1");
        } catch {
          abort(new Error("\u65E7\u7248\u8BB0\u5F55\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u5B58\u50A8\u8BBE\u7F6E\u540E\u91CD\u8BD5"));
          return;
        }
        const imported = migrateLegacy(raw);
        tx.objectStore("profile").put(imported.profile, "current");
        imported.saved.forEach((key) => tx.objectStore("favorites").put(key, key));
        imported.plans.forEach((plan) => tx.objectStore("plans").put(plan, plan.id));
        meta.put(true, "legacy-v1");
      };
    });
  } catch (error) {
    db.close();
    throw error;
  }
  return {
    close: () => db.close(),
    load: () => transact(stores, (tx, set) => {
      const state2 = emptyState();
      set(state2);
      for (const [store, field, key] of [["profile", "profile", "current"], ["favorites", "saved"], ["plans", "plans"], ["assessments", "assessments"], ["drafts", "draft", "current"], ["meals", "meals"], ["dietSettings", "dietSettings", "current"]]) {
        const req = key ? tx.objectStore(store).get(key) : tx.objectStore(store).getAll();
        req.onsuccess = () => {
          if (req.result === void 0) return;
          if (field === "profile") state2.profile = cleanProfile(req.result);
          else if (field === "dietSettings") {
            try {
              state2.dietSettings = cleanDietSettings(req.result);
            } catch {
            }
          } else if (field === "meals") state2.meals = req.result.filter((meal) => {
            try {
              validateMeal(meal);
              return true;
            } catch {
              return false;
            }
          });
          else state2[field] = req.result;
        };
      }
    }, "readonly"),
    profile: (input) => transact(["profile"], (tx) => tx.objectStore("profile").put(cleanProfile(input), "current")),
    favorite: (key) => {
      if (!validFavorite(key)) return Promise.reject(new Error("\u6536\u85CF\u5185\u5BB9\u4E0D\u5B58\u5728"));
      return transact(["favorites"], (tx) => {
        const s = tx.objectStore("favorites"), req = s.get(key);
        req.onsuccess = () => req.result ? s.delete(key) : s.put(key, key);
      });
    },
    plan: (draft) => transact(["plans"], (tx, set, abort) => {
      const s = tx.objectStore("plans"), req = s.get(draft.id);
      req.onsuccess = () => {
        try {
          const record = nextPlanRecord(draft, req.result);
          s.put(record, record.id);
          set(record);
        } catch (error) {
          abort(error);
        }
      };
    }),
    removePlan: (id) => transact(["plans"], (tx) => tx.objectStore("plans").delete(id)),
    assessment: (record) => {
      const checked = { ...record, result: scoreAssessment(record.answers, record.questionnaireVersion, record.result.scoreVersion) };
      if (checked.result.status !== "pilot_reference") return Promise.reject(new Error("\u7B54\u9898\u5C1A\u672A\u5B8C\u6210"));
      return transact(["assessments", "drafts"], (tx) => {
        tx.objectStore("assessments").put(checked, checked.id);
        tx.objectStore("drafts").delete("current");
      });
    },
    removeAssessment: (id) => transact(["assessments"], (tx) => tx.objectStore("assessments").delete(id)),
    draft: (draft) => {
      if (draft && draft.questionnaireVersion !== questionnaire_default.id) return Promise.reject(new Error("\u8349\u7A3F\u7248\u672C\u4E0D\u5339\u914D"));
      return transact(["drafts"], (tx) => draft ? tx.objectStore("drafts").put(draft, "current") : tx.objectStore("drafts").delete("current"));
    },
    saveMeal: (meal) => transact(["meals"], (tx, set, abort) => {
      try {
        const record = validateMeal(meal);
        tx.objectStore("meals").put(record, record.id);
        set(record);
      } catch (error) {
        abort(error);
      }
    }),
    removeMeal: (id) => transact(["meals"], (tx) => tx.objectStore("meals").delete(id)),
    dietSettings: (input) => transact(["dietSettings"], (tx, set, abort) => {
      try {
        const record = cleanDietSettings(input);
        tx.objectStore("dietSettings").put(record, "current");
        set(record);
      } catch (error) {
        abort(error);
      }
    }),
    clear: async () => {
      legacy?.removeItem("zhiyang-demo-v1");
      await transact(stores, (tx) => {
        stores.forEach((name) => tx.objectStore(name).clear());
        tx.objectStore("meta").put(true, "legacy-v1");
      });
    }
  };
}

// src/client/assessment-ui.js
var escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
function createAssessmentUI({ show, storage: storage2, changed, notify }) {
  let answers = [], step = 0, result = null, running = false, epoch = 0, writing = Promise.resolve();
  const questions = questionnaire_default.order.map((id) => questionnaire_default.questions.find((q) => q.id === id));
  const body = (html) => show(`<div class="detail-body assessment-body">${html}</div>`, "\u65E5\u5E38\u611F\u53D7\u8BD5\u6D4B");
  const draft = () => ({ questionnaireVersion: questionnaire_default.id, answers: structuredClone(answers), step, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
  const saveDraft = () => {
    const snapshot = draft(), current = epoch;
    writing = writing.catch(() => {
    }).then(() => current === epoch ? storage2().draft(snapshot) : void 0);
    return writing;
  };
  function intro(saved) {
    running = false;
    body(`<span class="tag">32 \u9053\u5019\u9009\u9898 \xB7 \u8BD5\u6D4B\u9636\u6BB5</span><h2>\u56DE\u987E\u4E00\u5E74\u7684\u65E5\u5E38\u611F\u53D7</h2><p class="detail-lead">\u4E0D\u662F\u53EA\u770B\u4ECA\u5929\uFF0C\u4E5F\u4E0D\u7528\u731C\u6D4B\u75C5\u56E0\u3002\u6309\u81EA\u5DF1\u7684\u771F\u5B9E\u611F\u53D7\u9009\u62E9\uFF0C\u8BB0\u4E0D\u6E05\u3001\u4E0D\u9002\u7528\u6216\u4E0D\u613F\u56DE\u7B54\u90FD\u53EF\u4EE5\u3002</p><div class="gentle-note">\u672C\u8F6E\u7528\u4E8E\u6210\u4EBA\u7406\u89E3\u9898\u76EE\u7684\u8BD5\u6D4B\u3002\u65B0\u95EE\u5377\u5C1A\u672A\u5B8C\u6210\u4E13\u4E1A\u5BA1\u6838\u4E0E\u6D4B\u91CF\u9A8C\u8BC1\uFF0C\u65E0\u6CD5\u636E\u6B64\u6B63\u5F0F\u5224\u5B9A\u4E2A\u4EBA\u4F53\u8D28\u3002</div><p>\u7B54\u9898\u8349\u7A3F\u53EA\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u3002\u5B8C\u6210\u540E\uFF0C\u53EF\u4EE5\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u4FDD\u5B58\u611F\u53D7\u8BB0\u5F55\u3002\u65E0\u9700\u6D4B\u8BC4\uFF0C\u4E5F\u53EF\u4EE5\u54A8\u8BE2\u52A9\u624B\u3002</p><p class="small muted">\u5982\u679C\u6B64\u523B\u6709\u660E\u663E\u7D27\u6025\u4E0D\u9002\uFF0C\u8BF7\u7ACB\u5373\u8054\u7CFB\u5F53\u5730\u6025\u6551\u670D\u52A1\uFF08\u4E2D\u56FD\u5927\u9646 120\uFF09\uFF0C\u4E0D\u8981\u7EE7\u7EED\u6D4B\u8BC4\u3002</p><div class="button-row">${saved ? `<button class="primary-button" data-assessment="resume">\u7EE7\u7EED\u672C\u673A\u8349\u7A3F\uFF08${saved.answers.length}/32\uFF09</button>` : ""}<button class="${saved ? "outline" : "primary"}-button" data-assessment="start">${saved ? "\u91CD\u65B0\u5F00\u59CB\u8BD5\u6D4B" : "\u4E86\u89E3\u5E76\u5F00\u59CB\u8BD5\u6D4B"}</button></div>`);
  }
  function draw() {
    const q = questions[step], selected = answers.find((a) => a.id === q.id)?.value;
    body(`<span class="tag">\u56DE\u60F3\u8FC7\u53BB\u4E00\u5E74 \xB7 \u8BD5\u6D4B\u53C2\u8003</span><h2>\u8BA4\u8BC6\u81EA\u5DF1\u7684\u8EAB\u4F53\u611F\u53D7</h2><div class="quiz-progress"><span>\u7B2C ${step + 1} \u9898 / 32 \u9898</span><span>\u5DF2\u7B54 ${answers.length} \u9898</span></div><progress class="assessment-progress" max="32" value="${answers.length}" aria-label="\u7B54\u9898\u5B8C\u6210\u8FDB\u5EA6"></progress><h3 class="quiz-question" tabindex="-1">${escape(q.text)}</h3><div class="quiz-options">${options.map(([value, label]) => `<button data-assessment-answer="${value}" class="${value === selected ? "selected" : ""}" aria-pressed="${value === selected}"><span>${label}</span>${value === selected ? "\u2713" : ""}</button>`).join("")}</div><div class="button-row"><button class="text-button" data-assessment="back" ${step === 0 ? "disabled" : ""}>\u2190 \u4E0A\u4E00\u9898</button><button class="outline-button" data-assessment="next">${step === 31 ? "\u67E5\u770B\u7B54\u9898\u5E76\u63D0\u4EA4" : "\u4E0B\u4E00\u9898 \u2192"}</button><button class="text-button" data-assessment="pause">\u4FDD\u5B58\u8349\u7A3F\u5E76\u9000\u51FA</button></div><p class="small muted" id="draft-status" role="status">\u9009\u62E9\u7B54\u6848\u540E\u81EA\u52A8\u4FDD\u5B58\u672C\u673A\u8349\u7A3F\u3002</p>`);
    document.querySelector(".quiz-question")?.focus({ preventScroll: true });
  }
  function review() {
    const missing = questions.filter((q) => !answers.some((a) => a.id === q.id));
    body(`<span class="tag">\u63D0\u4EA4\u524D\u6838\u5BF9</span><h2>${missing.length ? `\u8FD8\u6709 ${missing.length} \u9053\u672A\u7B54\u9898` : "\u5DF2\u5B8C\u6210\u5168\u90E8 32 \u9053\u9898"}</h2><p>\u53EF\u4EE5\u8FD4\u56DE\u4FEE\u6539\u4EFB\u4F55\u4E00\u9898\uFF0C\u4E5F\u53EF\u4EE5\u9009\u62E9\u201C\u8BB0\u4E0D\u6E05\u201D\u201C\u4E0D\u9002\u7528\u201D\u6216\u201C\u4E0D\u613F\u56DE\u7B54\u201D\u3002</p><div class="question-jump">${questions.map((q, i) => `<button class="${answers.some((a) => a.id === q.id) ? "answered" : ""}" data-assessment-jump="${i}" aria-label="${i + 1} \u9898${answers.some((a) => a.id === q.id) ? "\u5DF2\u7B54" : "\u672A\u7B54"}">${i + 1}</button>`).join("")}</div><button class="primary-button full-button" data-assessment="submit" ${missing.length ? "disabled" : ""}>\u63D0\u4EA4\u5E76\u67E5\u770B\u611F\u53D7\u8BB0\u5F55</button>`);
  }
  function resultView(record, saved = false) {
    running = false;
    result = record;
    const frequent = record.answers.filter((a) => typeof a.value === "number" && a.value >= 3);
    body(`<span class="tag">\u8BD5\u6D4B\u53C2\u8003 \xB7 \u65E0\u4F53\u8D28\u5224\u5B9A</span><h2>\u4F60\u7684\u65E5\u5E38\u611F\u53D7\u8BB0\u5F55</h2><p class="detail-lead">\u4EE5\u4E0B\u6574\u7406\u4F60\u9009\u62E9\u201C\u7ECF\u5E38\u201D\u6216\u201C\u51E0\u4E4E\u603B\u662F\u201D\u7684\u611F\u53D7\u3002\u5B83\u4E0D\u662F\u8BCA\u65AD\uFF0C\u4E5F\u4E0D\u80FD\u636E\u6B64\u81EA\u52A8\u63A8\u8350\u8336\u65B9\u3002</p>${frequent.length ? `<ul class="step-list">${frequent.map((a) => `<li>${escape(questions.find((q) => q.id === a.id).text)} <span class="muted">\u2014 ${options.find(([v]) => v === a.value)[1]}</span></li>`).join("")}</ul>` : '<div class="gentle-note">\u4F60\u6CA1\u6709\u9009\u62E9\u201C\u7ECF\u5E38\u201D\u6216\u201C\u51E0\u4E4E\u603B\u662F\u201D\u7684\u9879\u76EE\u3002\u8FD9\u4E0D\u4EE3\u8868\u5DF2\u5224\u5B9A\u4E3A\u5E73\u548C\u8D28\uFF0C\u4E5F\u4E0D\u7B49\u4E8E\u5065\u5EB7\u8BC4\u4F30\u901A\u8FC7\u3002</div>'}<details class="source-details"><summary>\u67E5\u770B\u5168\u90E8 32 \u9053\u56DE\u7B54</summary>${questions.map((q) => `<p><strong>${escape(q.text)}</strong><br>${options.find(([v]) => v === record.answers.find((a) => a.id === q.id)?.value)?.[1] || "\u672A\u7B54"}</p>`).join("")}</details><p class="small muted">\u5019\u9009\u9898 v0.1 \xB7 \u5BA1\u6838\u5F85\u5B8C\u6210 \xB7 \u6B64\u7ED3\u679C\u4E0D\u81EA\u52A8\u53D1\u9001\u7ED9\u54A8\u8BE2\u52A9\u624B</p><div class="button-row">${saved ? '<span class="tag">\u5DF2\u4FDD\u5B58\u4E8E\u672C\u673A</span>' : '<button class="primary-button" data-assessment="save">\u4FDD\u5B58\u8FD9\u4EFD\u611F\u53D7\u8BB0\u5F55</button>'}<button class="outline-button" data-action="constitutions">\u4E5D\u79CD\u4F53\u8D28\u79D1\u666E</button><button class="text-button" data-close="detail">\u5173\u95ED</button></div>`);
  }
  return {
    async open() {
      const state2 = await storage2().load();
      intro(state2.draft?.questionnaireVersion === questionnaire_default.id ? state2.draft : null);
    },
    view: (record) => resultView(record, true),
    async reset() {
      epoch++;
      running = false;
      answers = [];
      result = null;
      await writing.catch(() => {
      });
    },
    async action(button) {
      const data = button.dataset;
      if (!("assessment" in data || "assessmentAnswer" in data || "assessmentJump" in data)) return false;
      try {
        if ("assessmentAnswer" in data && running) {
          const value = /^\d$/.test(data.assessmentAnswer) ? Number(data.assessmentAnswer) : data.assessmentAnswer;
          if (!options.some(([v]) => v === value)) return true;
          const id = questions[step].id;
          answers = [...answers.filter((a) => a.id !== id), { id, value }];
          draw();
          await saveDraft();
          const status = document.getElementById("draft-status");
          if (status) status.textContent = "\u8349\u7A3F\u5DF2\u4FDD\u5B58\u5728\u672C\u673A";
        } else if ("assessmentJump" in data) {
          step = Number(data.assessmentJump);
          running = true;
          draw();
        } else switch (data.assessment) {
          case "start":
            epoch++;
            answers = [];
            step = 0;
            result = null;
            running = true;
            await saveDraft();
            draw();
            break;
          case "resume": {
            const state2 = await storage2().load();
            const d = state2.draft;
            if (!d || d.questionnaireVersion !== questionnaire_default.id) throw new Error("\u6CA1\u6709\u53EF\u7EE7\u7EED\u7684\u8349\u7A3F");
            answers = d.answers;
            step = Math.min(31, Math.max(0, d.step));
            running = true;
            draw();
            break;
          }
          case "back":
            step = Math.max(0, step - 1);
            draw();
            break;
          case "next":
            if (step === 31) review();
            else {
              step++;
              draw();
            }
            break;
          case "pause":
            await saveDraft();
            await changed();
            document.getElementById("detail-dialog").close();
            notify("\u8349\u7A3F\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4ECE\u201C\u6211\u7684\u201D\u7EE7\u7EED");
            break;
          case "submit":
            result = assessmentRecord(answers);
            resultView(result);
            break;
          case "save":
            if (result) {
              button.disabled = true;
              await writing;
              await storage2().assessment(result);
              await changed();
              resultView(result, true);
              notify("\u611F\u53D7\u8BB0\u5F55\u5DF2\u4FDD\u5B58\u4E8E\u672C\u673A");
            }
            break;
        }
      } catch (error) {
        button.disabled = false;
        notify(error.message || "\u4FDD\u5B58\u672A\u5B8C\u6210\uFF0C\u7B54\u6848\u4ECD\u4FDD\u7559\u5728\u5F53\u524D\u9875\u9762");
        const status = document.getElementById("draft-status");
        if (status) status.textContent = "\u672C\u6B21\u4FDD\u5B58\u5931\u8D25\uFF0C\u7B54\u6848\u4ECD\u4FDD\u7559\u5728\u9875\u9762\u3002\u8BF7\u91CD\u8BD5\u4FDD\u5B58\u8349\u7A3F\u3002";
      }
      return true;
    }
  };
}

// src/client/diet-client.js
async function post(path, body, signal) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ requestId: createId(), ...body }),
    signal,
    cache: "no-store"
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "\u8FD9\u6B21\u6CA1\u6709\u5B8C\u6210");
  if (payload.mode === "urgent_help") return payload;
  return payload;
}
async function fetchCatalog() {
  const response = await fetch("/api/diet/catalog", { cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(Array.isArray(payload.details) ? payload.details.join("\uFF1B") : payload.error || "\u98DF\u7269\u8868\u6682\u65F6\u8BFB\u4E0D\u51FA\u6765");
  return payload;
}
function urgentIfNeeded(text) {
  if (text && isExplicitUrgent(text)) return { ...urgentResponse(createId()), items: [], recipe: null, advice: "" };
  return null;
}
var recognizeMeal = (body, signal) => urgentIfNeeded(body.text) || post("/api/diet/recognize", body, signal);
var calculateItems = (body, signal) => post("/api/diet/calculate", body, signal);
var requestReport = (body, signal) => post("/api/diet/report", body, signal);
var requestRecommendation = (body, signal) => post("/api/diet/recommend", body, signal);

// src/client/diet-page.js
var mealNames = { breakfast: "\u65E9\u9910", lunch: "\u5348\u9910", dinner: "\u665A\u9910", snack: "\u52A0\u9910" };
var mealOrder = ["breakfast", "lunch", "dinner", "snack"];
var RING_R = 52;
var RING_C = 2 * Math.PI * RING_R;
function createDietPages(ctx) {
  let catalog = null;
  let catalogError = "";
  let draft = null;
  let busy = false;
  let report = null;
  let recommendation = null;
  let excludeIds = [];
  let inflight = "";
  let urgent = null;
  let composeText = "";
  let composeMeal = "";
  let composeError = "";
  let photoName = "";
  let pendingFile = null;
  let libraryFilter = "all";
  document.addEventListener("input", (event) => {
    const el = event.target;
    if (!(el instanceof HTMLTextAreaElement)) return;
    if (el.name === "text" && el.closest("#meal-form")) composeText = el.value;
  });
  document.addEventListener("change", (event) => {
    const el = event.target;
    if (!(el instanceof HTMLElement)) return;
    if (el.id === "meal-photo") {
      pendingFile = el.files?.[0] || null;
      photoName = pendingFile ? pendingFile.name : "";
      const hint = document.querySelector("[data-photo-name]");
      if (hint) hint.textContent = photoName ? `\u5DF2\u9009 ${photoName}` : "";
      return;
    }
    if (el.name === "meal" && el.closest("#meal-form")) {
      composeMeal = el.value;
      return;
    }
    if (el.dataset.dietFood != null) void changeFood(el.dataset.dietFood, el.value).catch((error) => ctx.toast(friendlyMessage(error.message, "\u8FD9\u6B21\u6CA1\u6709\u6539\u6210\uFF0C\u8BF7\u518D\u8BD5\u4E00\u6B21")));
    if (el.dataset.dietGrams != null) void changeGrams(el.dataset.dietGrams, el.value).catch((error) => ctx.toast(friendlyMessage(error.message, "\u8FD9\u6B21\u6CA1\u6709\u6539\u6210\uFF0C\u8BF7\u518D\u8BD5\u4E00\u6B21")));
  });
  async function loadCatalog() {
    try {
      catalog = await fetchCatalog();
      catalogError = "";
    } catch (error) {
      catalog = null;
      catalogError = friendlyMessage(error.message, "\u98DF\u8C31\u6682\u65F6\u6253\u4E0D\u5F00\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
    }
  }
  function record() {
    const state2 = ctx.getState();
    const todayMeals = mealsOn(state2, localDateString());
    const meal = composeMeal || defaultMeal();
    const status = busy ? "\u6B63\u5728\u770B\u8FD9\u4E00\u9910" : photoName ? `\u5DF2\u9009 ${photoName}` : "";
    const side = todayMeals.length ? `<aside class="quiet-card today-side"><div class="quiet-copy"><h2>\u4ECA\u5929\u5DF2\u7ECF\u8BB0\u4E0B</h2><p>\u8F7B\u8F7B\u8BB0\u4E00\u7B14\uFF0C\u517B\u6210\u66F4\u597D\u7684\u8282\u594F\u3002</p></div><div class="quiet-meals">${todayMeals.map((item) => mealCard(item, true)).join("")}</div><button class="pill-link" data-page="today">\u770B\u4ECA\u5929 ${ctx.icon("arrow")}</button></aside>` : `<aside class="quiet-card today-side is-empty"><div class="quiet-art" aria-hidden="true">${bowlArt()}</div><div class="quiet-copy"><h2>\u4ECA\u5929\u8FD8\u6CA1\u8BB0</h2><p>\u8F7B\u8F7B\u8BB0\u4E00\u7B14\uFF0C\u517B\u6210\u66F4\u597D\u7684\u8282\u594F\u3002</p></div><button class="pill-link" data-page="today">\u770B\u4ECA\u5929 ${ctx.icon("arrow")}</button></aside>`;
    return `<div class="diet-page diet-record">${catalogError ? `<div class="storage-error" role="alert">${ctx.esc(catalogError)}</div>` : ""}${urgent ? urgentBanner(urgent) : ""}
      <section class="hero-card">
        <div class="hero-wash" aria-hidden="true"></div>
        <div class="hero-copy"><h1>\u8BB0\u4E0B\u8FD9\u4E00\u9910</h1><p>\u62CD\u4E00\u5F20\uFF0C\u6216\u5199\u4E00\u53E5\u8BDD</p></div>
        <form id="meal-form" class="composer ${busy ? "is-busy" : ""}">
          <label class="meal-chip"><span class="sr-only">\u8FD9\u4E00\u9910</span>
            <select name="meal" aria-label="\u8FD9\u4E00\u9910">${mealOrder.map((key) => `<option value="${key}" ${key === meal ? "selected" : ""}>${mealNames[key]}</option>`).join("")}</select>
          </label>
          <div class="composer-box">
            <textarea name="text" maxlength="1500" rows="2" placeholder="\u8BB0\u5F55\u98DF\u7269\u3001\u611F\u53D7\u6216\u62CD\u7167\u2026" aria-label="\u5199\u4E0B\u5403\u4E86\u4EC0\u4E48">${ctx.esc(composeText)}</textarea>
            <div class="composer-actions">
              <label class="icon-hit">
                <span class="sr-only">\u62CD\u7167\u6216\u4E0A\u4F20\u7167\u7247</span>
                <input id="meal-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" capture="environment">
                ${ctx.icon("camera")}
              </label>
              <button class="icon-hit send" type="submit" aria-label="${busy ? "\u6B63\u5728\u8BC6\u522B" : "\u8BC6\u522B\u8FD9\u4E00\u9910"}" aria-busy="${busy ? "true" : "false"}" ${busy ? "disabled" : ""}>${ctx.icon("send")}</button>
            </div>
          </div>
          <p class="composer-status" role="status" data-photo-name>${ctx.esc(status)}</p>
          ${composeError ? `<p class="composer-error" role="alert">${ctx.esc(composeError)}</p>` : ""}
        </form>
      </section>
      ${draft ? editor(draft) : ""}
      ${side}
    </div>`;
  }
  function today2() {
    scheduleToday();
    const state2 = ctx.getState();
    const meals = mealsOn(state2, localDateString());
    const body = meals.length ? `${reportBlock()}${mealStrip(meals)}${recommendBlock()}${adviceCard()}` : `<div class="empty-hero"><div class="quiet-art" aria-hidden="true">${bowlArt()}</div><div><h2>\u4ECA\u5929\u8FD8\u6CA1\u8BB0</h2><p>\u8F7B\u8F7B\u8BB0\u4E00\u7B14\uFF0C\u8FD9\u91CC\u624D\u4F1A\u51FA\u73B0\u5408\u8BA1\u3002</p><button class="primary-button" data-page="home">\u53BB\u8BB0\u4E00\u9910</button></div></div>`;
    return `${heading("\u4ECA\u65E5", "\u770B\u770B\u4ECA\u5929\u5927\u7EA6\u5403\u4E86\u591A\u5C11\u3002")}<div class="diet-page diet-today">${urgent ? urgentBanner(urgent) : ""}${body}</div>`;
  }
  function library2() {
    if (!catalog) return `${heading("\u98DF\u8C31", "\u6309\u73B0\u5728\u7684\u8BB0\u5F55\uFF0C\u6311\u4E0B\u4E00\u9910")}<div class="diet-page">${catalogError ? `<div class="storage-error">${ctx.esc(catalogError)}</div>` : '<p class="empty-copy">\u6B63\u5728\u51C6\u5907\u98DF\u8C31\u3002</p>'}</div>`;
    const filters = [["all", "\u5168\u90E8"], ["light", "\u6E05\u6DE1"], ["home", "\u5BB6\u5E38"], ["breakfast", "\u65E9\u9910"], ["lunch", "\u5348\u9910"], ["dinner", "\u665A\u9910"]];
    const list = catalog.recipes.filter((recipe) => matchLibrary(recipe, libraryFilter));
    return `${heading("\u98DF\u8C31", "\u6309\u73B0\u5728\u7684\u8BB0\u5F55\uFF0C\u6311\u4E0B\u4E00\u9910")}<div class="diet-page diet-library-page"><div class="filter-row" aria-label="\u98DF\u8C31\u7B5B\u9009">${filters.map(([id, label]) => `<button type="button" class="filter-chip ${libraryFilter === id ? "active" : ""}" data-diet-action="library-filter" data-diet-filter="${id}" aria-pressed="${libraryFilter === id}">${label}</button>`).join("")}</div><div class="recipe-list">${list.length ? list.map(recipeRow).join("") : '<p class="empty-copy">\u8FD9\u4E00\u7C7B\u91CC\u8FD8\u6CA1\u6709\u98DF\u8C31\u3002</p>'}</div><p class="library-foot">\u8BB0\u4E0B\u4ECA\u65E5\u996E\u98DF\uFF0C\u9047\u89C1\u66F4\u5408\u9002\u7684\u98DF\u8C31</p></div>`;
  }
  function settings() {
    const settingsState = ctx.getState().dietSettings;
    const targets = settingsState.targets;
    const flags = settingsState.flags;
    return `${heading("\u6211\u7684", "\u76EE\u6807\u548C\u8BB0\u5F55\u90FD\u5728\u8FD9\u53F0\u624B\u673A\u4E0A\u3002")}<div class="diet-page diet-settings"><section class="diet-card"><h2>\u6BCF\u65E5\u76EE\u6807</h2><p class="small muted">\u6309\u81EA\u5DF1\u7684\u4E60\u60EF\u586B\u3002\u7559\u7A7A\u7684\u9879\u76EE\u4E0D\u53C2\u4E0E\u5BF9\u6BD4\u3002</p><form id="target-form"><div class="target-grid"><label class="form-label">\u70ED\u91CF\uFF08\u5343\u5361\uFF09<input name="kcal" inputmode="numeric" min="0" max="10000" value="${targets.kcal ?? ""}"></label><label class="form-label">\u86CB\u767D\u8D28\uFF08\u514B\uFF09<input name="protein" inputmode="numeric" min="0" max="500" value="${targets.protein ?? ""}"></label><label class="form-label">\u8102\u80AA\uFF08\u514B\uFF09<input name="fat" inputmode="numeric" min="0" max="500" value="${targets.fat ?? ""}"></label><label class="form-label">\u78B3\u6C34\uFF08\u514B\uFF09<input name="carb" inputmode="numeric" min="0" max="500" value="${targets.carb ?? ""}"></label></div><label class="check-line"><input type="checkbox" name="confirm" ${targets.confirmed ? "checked" : ""}> \u628A\u8FD9\u4E9B\u6570\u5B57\u5F53\u4F5C\u6211\u7684\u6BCF\u65E5\u76EE\u6807</label><button class="primary-button" type="submit">\u4FDD\u5B58\u76EE\u6807</button></form></section><section class="diet-card"><h2>\u8FD9\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u5EFA\u8BAE\u4F1A\u66F4\u8C28\u614E</h2><p class="small muted">\u52FE\u9009\u540E\uFF0C\u4E0D\u4F1A\u6309\u5403\u5F97\u5C11\u6765\u50AC\u4F60\uFF0C\u4E5F\u4E0D\u4F1A\u56E0\u4E3A\u86CB\u767D\u8D28\u4E0D\u591F\u5C31\u63A8\u8350\u9AD8\u86CB\u767D\u7684\u83DC\u3002</p><form id="flags-form">${flagBox("pregnancy", "\u5B55\u671F\u6216\u5907\u5B55", flags.pregnancy)}${flagBox("lactation", "\u54FA\u4E73", flags.lactation)}${flagBox("minor", "\u672A\u6210\u5E74", flags.minor)}${flagBox("kidney", "\u80BE\u75C5", flags.kidney)}${flagBox("diabetes", "\u7CD6\u5C3F\u75C5", flags.diabetes)}${flagBox("hypertension", "\u9AD8\u8840\u538B", flags.hypertension)}${flagBox("eatingDisorder", "\u5403\u996D\u8BA9\u6211\u5F88\u75DB\u82E6\uFF0C\u6216\u51FA\u73B0\u50AC\u5410\u3001\u7EDD\u98DF", flags.eatingDisorder)}<label class="check-line"><input type="checkbox" name="confirm" ${settingsState.flagsConfirmed ? "checked" : ""}> \u6309\u8FD9\u4E9B\u60C5\u51B5\u8C03\u6574\u6587\u5B57\u5EFA\u8BAE</label><button class="primary-button" type="submit">\u4FDD\u5B58</button></form></section><section class="settings-list" aria-label="\u66F4\u591A"><button class="settings-row" type="button" data-action="privacy"><span><strong>\u9690\u79C1\u4E0E\u8BF4\u660E</strong><small>\u8BB0\u5F55\u53EA\u7559\u5728\u8FD9\u53F0\u624B\u673A\u4E0A\u3002\u70ED\u91CF\u662F\u4F30\u7B97\u3002</small></span>${ctx.icon("arrow")}</button><button class="settings-row" type="button" data-action="reset"><span><strong>\u6E05\u9664\u8FD9\u53F0\u624B\u673A\u4E0A\u7684\u8BB0\u5F55</strong><small>\u996E\u98DF\u8BB0\u5F55\u548C\u6BCF\u65E5\u76EE\u6807\u4F1A\u4E00\u8D77\u6E05\u6389\u3002</small></span>${ctx.icon("arrow")}</button></section></div>`;
  }
  async function onClick(button) {
    const action = button.dataset.dietAction;
    if (!action) return false;
    if (action === "portion") await changePortion(button.dataset.dietItem, button.dataset.dietSize);
    else if (action === "save-draft") await saveDraft();
    else if (action === "discard") {
      draft = null;
      urgent = null;
      ctx.render();
    } else if (action === "delete-meal") {
      await ctx.writeStore((storage2) => storage2.removeMeal(button.dataset.dietId));
      invalidateToday();
      ctx.toast("\u5DF2\u5220\u9664\u8FD9\u4E00\u9910");
    } else if (action === "edit-meal") beginEdit(button.dataset.dietId);
    else if (action === "library-filter") {
      libraryFilter = button.dataset.dietFilter || "all";
      ctx.render();
    } else if (action === "recipe") openRecipe(button.dataset.dietId);
    else if (action === "another") await anotherRecipe();
    else if (action === "retry-today") {
      invalidateToday();
      ctx.render();
    } else return false;
    return true;
  }
  async function onSubmit(event) {
    if (event.target.id === "meal-form") {
      event.preventDefault();
      await submitMeal(event.target);
      return true;
    }
    if (event.target.id === "target-form") {
      event.preventDefault();
      await saveTargets(event.target);
      return true;
    }
    if (event.target.id === "flags-form") {
      event.preventDefault();
      await saveFlags(event.target);
      return true;
    }
    return false;
  }
  async function submitMeal(form) {
    const data = new FormData(form);
    const text = String(data.get("text") || "").trim();
    const meal = String(data.get("meal") || composeMeal || defaultMeal());
    const file = form.querySelector("#meal-photo")?.files?.[0] || pendingFile;
    composeText = String(data.get("text") || "");
    composeMeal = meal;
    if (file) {
      pendingFile = file;
      photoName = file.name;
    }
    if (!text && !file) {
      composeError = "\u5199\u4E00\u53E5\u8BDD\uFF0C\u6216\u62CD\u4E00\u5F20\u8FD9\u4E00\u9910\u7684\u7167\u7247\u3002";
      ctx.render();
      return;
    }
    busy = true;
    urgent = null;
    composeError = "";
    ctx.render();
    try {
      const imageDataUrl = file ? await compressImage(file) : "";
      const result = await recognizeMeal({ text, imageDataUrl });
      if (result.mode === "urgent_help") {
        draft = null;
        urgent = result;
        composeText = "";
        pendingFile = null;
        photoName = "";
        return;
      }
      draft = {
        id: createId(),
        date: localDateString(),
        meal,
        inputType: file ? "photo" : "text",
        rawText: text,
        stub: result.stub === true,
        notice: result.notice || "",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        items: result.items.map((item) => ({ ...item, clientId: createId() }))
      };
      composeText = "";
      pendingFile = null;
      photoName = "";
      composeError = "";
    } catch (error) {
      composeError = friendlyMessage(error.message, "\u6682\u65F6\u65E0\u6CD5\u8BC6\u522B\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u6216\u6539\u4E3A\u6253\u5B57\u8BB0\u5F55");
      ctx.toast(composeError);
    } finally {
      busy = false;
      ctx.render();
    }
  }
  function editor(current) {
    return `<section class="draft-editor" aria-label="\u6838\u5BF9\u8FD9\u4E00\u9910"><div class="draft-head"><h2>\u6838\u5BF9\u8FD9\u4E00\u9910</h2><p class="small muted">${ctx.esc(gentleNotice(current.notice))}</p></div>${current.items.map((item) => itemCard(item)).join("")}<div class="button-row"><button class="primary-button" type="button" data-diet-action="save-draft">\u8BB0\u4E0B\u6765</button><button class="outline-button" type="button" data-diet-action="discard">\u5148\u4E0D\u8BB0</button></div></section>`;
  }
  function itemCard(item) {
    const nutrition = item.nutrition;
    const shown = displaySource(nutrition);
    const kcal = nutrition ? `<p class="food-kcal"><span class="num">${nutrition.kcal}</span><small>\u7EA6\u5343\u5361</small></p>` : '<p class="food-kcal food-kcal-soft"><span>\u6682\u65F6\u7B97\u4E0D\u51FA\u6765</span><small>\u53EF\u4EE5\u6539\u9009\uFF0C\u6216\u5148\u7559\u7740</small></p>';
    return `<article class="food-card">
      <header class="food-card-head"><div><h3>${ctx.esc(item.name || item.inputName)}</h3>${item.inputName && item.inputName !== item.name ? `<p class="small muted">\u8BC6\u522B\u4E3A ${ctx.esc(item.inputName)}</p>` : ""}</div>${kcal}</header>
      <div class="chip-row">${shown ? `<span class="chip">${shown.label}</span>` : '<span class="chip chip-soft">\u6682\u65F6\u7B97\u4E0D\u51FA\u6765</span>'}${item.portionLabel ? `<span class="chip chip-quiet">${ctx.esc(item.portionLabel)}</span>` : ""}</div>
      ${foodSelect(item)}
      <div class="portion-row" role="group" aria-label="\u4FEE\u6B63\u5206\u91CF">
        ${portionButton(item, "small", "\u5C0F")}${portionButton(item, "medium", "\u4E2D")}${portionButton(item, "large", "\u5927")}
        <label class="grams-field">\u514B\u6570<input data-diet-grams="${ctx.esc(item.clientId)}" type="number" min="1" max="5000" inputmode="numeric" value="${item.grams ?? ""}" aria-label="\u514B\u6570"></label>
      </div>
      ${nutrition ? `${macroPills(nutrition)}${shown.detail ? `<details class="source-fold"><summary>\u6570\u636E\u6765\u6E90</summary><p>${ctx.esc(shown.label)}\u3002${ctx.esc(shown.detail)}</p></details>` : `<details class="source-fold"><summary>\u6570\u636E\u6765\u6E90</summary><p>${ctx.esc(shown.label)}</p></details>`}` : `<div class="unestimated-panel"><p>${unestimatedCopy(item.reason)}</p></div>`}
    </article>`;
  }
  function portionButton(item, size, label) {
    const active = item.portionLabel === label;
    return `<button type="button" data-diet-action="portion" data-diet-item="${ctx.esc(item.clientId)}" data-diet-size="${size}" class="${active ? "active" : ""}" aria-pressed="${active}">${label}</button>`;
  }
  function foodSelect(item) {
    if (!catalog) return "";
    const extras = [];
    const push = (option) => {
      if (option?.id && !extras.some((entry) => entry.id === option.id)) extras.push(option);
    };
    if (item.nutrition && item.foodId) push({ id: item.foodId, name: item.name });
    for (const candidate of item.candidates || []) push(candidate);
    const local = catalog.foods.filter((food2) => food2.calculable && !extras.some((entry) => entry.id === food2.id));
    const options2 = [...extras, ...local];
    const selected = item.nutrition ? item.foodId : "";
    const asking = item.status === "ambiguous" && !item.nutrition;
    const prompt = asking ? "\u8BF7\u9009\u62E9" : "\u5148\u4E0D\u7B97";
    return `<label class="form-label food-pick">${asking ? "\u8FD9\u51E0\u9879\u90FD\u53EF\u80FD\uFF0C\u9009\u4E00\u4E2A" : "\u6362\u6210\u522B\u7684"}<select data-diet-food="${ctx.esc(item.clientId)}" aria-label="${asking ? "\u9009\u62E9\u5BF9\u5E94\u7684\u98DF\u7269" : "\u6539\u98DF\u7269"}"><option value="">${prompt}</option>${options2.map((option) => `<option value="${ctx.esc(option.id)}" ${option.id === selected ? "selected" : ""}>${ctx.esc(option.branded ? `${option.name}\uFF08\u54C1\u724C\u5305\u88C5\uFF09` : option.name)}</option>`).join("")}</select></label>`;
  }
  async function changePortion(clientId, size) {
    const item = draft?.items.find((entry) => entry.clientId === clientId);
    if (!item) return;
    const food2 = catalog?.foods.find((entry) => entry.id === item.foodId);
    const portion = food2?.portion || { small: 100, medium: 150, large: 250 };
    item.grams = portion[size];
    item.portionLabel = size === "small" ? "\u5C0F" : size === "large" ? "\u5927" : "\u4E2D";
    item.userAdjusted = true;
    await recalculate();
  }
  async function changeGrams(clientId, value) {
    const item = draft?.items.find((entry) => entry.clientId === clientId);
    if (!item) return;
    item.grams = Number(value);
    item.portionLabel = "\u81EA\u5B9A\u4E49";
    item.userAdjusted = true;
    await recalculate();
  }
  async function changeFood(clientId, foodId) {
    const item = draft?.items.find((entry) => entry.clientId === clientId);
    if (!item) return;
    item.userAdjusted = true;
    if (!foodId) {
      item.foodId = null;
      item.forceUnestimated = true;
      item.status = "unestimated";
    } else {
      item.foodId = foodId;
      item.forceUnestimated = false;
      item.name = catalog?.foods.find((food2) => food2.id === foodId)?.name || item.name;
    }
    await recalculate();
  }
  async function recalculate() {
    if (!draft) return;
    const result = await calculateItems({ items: draft.items.map((item) => ({ name: item.inputName || item.name, inputName: item.inputName, foodId: item.forceUnestimated ? "" : item.foodId, grams: item.grams, portionLabel: item.portionLabel, forceUnestimated: item.forceUnestimated === true })) });
    if (result.mode === "urgent_help") {
      urgent = result;
      draft = null;
      ctx.render();
      return;
    }
    draft.items = draft.items.map((item, index) => {
      const next = result.items[index];
      return { ...item, ...next, candidates: next.candidates?.length ? next.candidates : item.candidates, clientId: item.clientId, userAdjusted: item.userAdjusted, forceUnestimated: item.forceUnestimated === true && !next.nutrition };
    });
    ctx.render();
  }
  async function saveDraft() {
    if (!draft?.items.length) return;
    const record2 = validateMeal({ ...draft, rawText: draft.rawText || "" });
    await ctx.writeStore((storage2) => storage2.saveMeal(record2));
    draft = null;
    invalidateToday();
    ctx.toast("\u5DF2\u8BB0\u5728\u8FD9\u53F0\u8BBE\u5907\u4E0A");
    ctx.render();
  }
  function beginEdit(id) {
    const meal = ctx.getState().meals.find((item) => item.id === id);
    if (!meal) return;
    draft = { ...meal, items: meal.items.map((item) => ({ ...item, clientId: createId(), inputName: item.inputName || item.name })), notice: "\u6B63\u5728\u4FEE\u6539\u5DF2\u4FDD\u5B58\u7684\u4E00\u9910\u3002", stub: meal.stub };
    urgent = null;
    ctx.navigate("home");
  }
  function scheduleToday() {
    const key = cacheKey();
    if (report?.key === key && recommendation?.key === key || inflight === key) return;
    inflight = key;
    queueMicrotask(() => loadToday(key));
  }
  async function loadToday(key) {
    try {
      const meals = mealsOn(ctx.getState(), localDateString());
      if (cacheKey() !== key) return;
      if (!meals.length) {
        report = { key, mode: "empty" };
        recommendation = { key, empty: true, reason: "\u5148\u8BB0\u4E0B\u4ECA\u5929\u5403\u4E86\u4EC0\u4E48\uFF0C\u518D\u4ECE\u98DF\u8C31\u5E93\u91CC\u9009\u4E0B\u4E00\u9910\u3002", reasonKept: true };
        excludeIds = [];
        return;
      }
      const body = requestBody(meals);
      const nextReport = { key, ...await requestReport(body) };
      if (cacheKey() !== key) return;
      report = nextReport;
      if (report.mode === "urgent_help") {
        urgent = report;
        recommendation = { key, empty: true, reason: "", reasonKept: true };
        return;
      }
      excludeIds = [];
      const nextRecommendation = { key, ...await requestRecommendation({ ...body, excludeIds }) };
      if (cacheKey() !== key) return;
      recommendation = nextRecommendation;
      if (recommendation.mode === "urgent_help") urgent = recommendation;
    } catch (error) {
      if (cacheKey() !== key) return;
      report = { key, mode: "error", adviceNote: friendlyMessage(error.message, "\u4ECA\u5929\u7684\u5408\u8BA1\u6682\u65F6\u51FA\u4E0D\u6765\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5") };
      recommendation = { key, empty: true, reason: "", reasonKept: false };
    } finally {
      if (inflight === key) inflight = "";
      ctx.render();
    }
  }
  async function anotherRecipe() {
    if (!recommendation?.recipe) return;
    excludeIds = [...excludeIds, recommendation.recipe.id];
    const meals = mealsOn(ctx.getState(), localDateString());
    const key = cacheKey();
    recommendation = { key, ...await requestRecommendation({ ...requestBody(meals), excludeIds }) };
    ctx.render();
  }
  function requestBody(meals) {
    const settingsState = ctx.getState().dietSettings;
    return {
      meals: meals.map((meal) => ({ rawText: meal.rawText, items: meal.items.map((item) => ({ name: item.name, inputName: item.inputName, foodId: item.foodId, grams: item.grams, status: item.status, portionLabel: item.portionLabel })) })),
      texts: meals.map((meal) => meal.rawText).filter(Boolean),
      targets: settingsState.targets,
      flags: settingsState.flags,
      flagsConfirmed: settingsState.flagsConfirmed
    };
  }
  function reportBlock() {
    if (!report || report.mode === "empty") return '<section class="diet-card dash-loading"><p class="composer-status">\u6B63\u5728\u6C47\u603B\u4ECA\u5929\u7684\u70ED\u91CF\u3002</p></section>';
    if (report.mode === "error") return `<div class="storage-error" role="alert">${ctx.esc(report.adviceNote)} <button class="text-button diet-link" data-diet-action="retry-today">\u91CD\u8BD5</button></div>`;
    if (report.mode === "urgent_help") return "";
    const totals = report.totals;
    if (!totals) return "";
    const target = report.targets;
    const gap = target?.kcal != null ? target.kcal - totals.kcal : null;
    const ratio = target?.kcal ? totals.kcal / target.kcal : null;
    const tone = ratio != null && ratio > 1 ? "over" : "under";
    const center = totals.counted ? String(totals.kcal) : "\u2014";
    const aria = gap == null ? totals.counted ? `\u4ECA\u65E5\u7EA6 ${totals.kcal} \u5343\u5361\uFF0C\u8FD8\u6CA1\u6709\u786E\u8BA4\u6BCF\u65E5\u76EE\u6807` : "\u4ECA\u5929\u8FD8\u6CA1\u6709\u53EF\u8BA1\u7B97\u7684\u70ED\u91CF" : `\u4ECA\u65E5\u7EA6 ${totals.kcal} \u5343\u5361\uFF0C\u76EE\u6807 ${target.kcal} \u5343\u5361\uFF0C${gap >= 0 ? `\u5927\u7EA6\u8FD8\u5C11 ${gap} \u5343\u5361` : `\u5927\u7EA6\u591A\u4E86 ${Math.abs(gap)} \u5343\u5361`}`;
    const gapCopy = gap == null ? '<p class="dash-gap">\u8FD8\u6CA1\u786E\u8BA4\u6BCF\u65E5\u76EE\u6807\uFF0C\u8FD9\u91CC\u53EA\u663E\u793A\u5408\u8BA1\u3002</p>' : `<p class="dash-gap ${gap < 0 ? "over" : ""}">\u76EE\u6807 <span class="num">${target.kcal}</span> \u5343\u5361 \xB7 ${gap >= 0 ? `\u8FD8\u5DEE <span class="num">${gap}</span> \u5343\u5361` : `\u591A\u4E86 <span class="num">${Math.abs(gap)}</span> \u5343\u5361`}</p>`;
    const ringLabel = ratio == null ? `<strong class="ring-word">\u5408\u8BA1</strong><span>${totals.counted ? "\u672A\u8BBE\u76EE\u6807" : "\u6CA1\u6709\u53EF\u8BA1\u7B97\u7684\u70ED\u91CF"}</span>` : `<span class="ring-kicker">\u4ECA\u65E5\u8FDB\u5EA6</span><strong class="num">${Math.min(999, Math.round(ratio * 100))}%</strong><span>${ratio > 1 ? "\u8D85\u8FC7\u76EE\u6807" : "\u5BF9\u7167\u76EE\u6807"}</span>`;
    return `<section class="dash" aria-label="\u4ECA\u65E5\u70ED\u91CF">
      <div class="dash-main"><p class="eyebrow">\u4ECA\u65E5\u6444\u5165</p><p class="kcal-hero"><span class="num">${center}</span>${totals.counted ? "<small>\u5343\u5361</small>" : ""}</p>${gapCopy}${report.skipped?.length ? `<p class="small muted">\u8FD8\u6CA1\u7B97\u8FDB\u53BB\uFF1A${report.skipped.map((name) => ctx.esc(name)).join("\u3001")}\u3002</p>` : ""}</div>
      <div class="ring-wrap" role="img" aria-label="${ctx.esc(aria)}">${ringSvg(ratio, tone)}<div class="ring-center">${ringLabel}</div></div>
    </section>
    ${macroTiles(totals, target)}`;
  }
  function adviceCard() {
    if (!report || report.mode !== "report") return "";
    const advice = report.adviceKept && report.advice ? `<p>${ctx.esc(report.advice)}</p>` : report.adviceNote ? `<p class="small muted">${ctx.esc(gentleNotice(report.adviceNote))}</p>` : "";
    return advice ? `<section class="diet-card advice-card"><h2>\u4ECA\u5929\u7684\u5EFA\u8BAE</h2>${advice}</section>` : "";
  }
  function recommendBlock() {
    if (!recommendation) return '<section class="diet-card next-wait"><p class="composer-status">\u6B63\u5728\u9009\u4E0B\u4E00\u9910\u3002</p></section>';
    if (!recommendation.recipe) return `<section class="diet-card next-wait"><h2>\u4E0B\u4E00\u9910\u5EFA\u8BAE</h2><p>${ctx.esc(gentleNotice(recommendation.reason || recommendation.reasonNote || "\u4ECA\u5929\u5148\u4ECE\u98DF\u8C31\u91CC\u81EA\u5DF1\u6311\u4E00\u9053\u5427\u3002"))}</p><button class="pill-link" data-page="library">\u53BB\u770B\u98DF\u8C31 ${ctx.icon("arrow")}</button></section>`;
    const recipe = recommendation.recipe;
    const blurb = recommendation.reasonKept && recommendation.reason ? recommendation.reason : recommendation.reasonNote ? gentleNotice(recommendation.reasonNote) : visibleNote(recipe.note) || `${mealNames[recipe.meal] || "\u5BB6\u5E38"} \xB7 \u7EA6 ${recipe.nutrition.kcal} \u5343\u5361`;
    return `<article class="next-meal"><div class="next-meal-copy"><p class="eyebrow">\u4E0B\u4E00\u9910\u5EFA\u8BAE</p><h2>${ctx.esc(recipe.name)}</h2><p class="next-kcal"><span class="num">${recipe.nutrition.kcal}</span> \u7EA6\u5343\u5361</p><p class="next-blurb">${ctx.esc(blurb)}</p><div class="next-actions"><button class="primary-button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}">\u67E5\u770B\u8FD9\u9053 ${ctx.icon("arrow")}</button><button class="text-button" data-diet-action="another">\u6362\u4E00\u9053</button></div></div>${recipePhoto(recipe, "next")}</article>`;
  }
  function mealStrip(meals) {
    return `<section class="diet-section meal-strip"><div class="section-row"><h2>\u9910\u6B21\u8BB0\u5F55</h2></div><div class="meal-scroll">${meals.map((item) => mealCard(item, true)).join("")}</div></section>`;
  }
  function mealCard(meal, compact = false) {
    const estimated = meal.items.filter((item) => item.nutrition);
    const kcal = estimated.reduce((sum, item) => sum + item.nutrition.kcal, 0);
    const names = meal.items.map((item) => item.name).filter(Boolean).join("\u3001");
    if (compact) {
      return `<article class="meal-tile"><div class="meal-tile-top"><span class="meal-mark" aria-hidden="true"></span><div><p class="meal-kicker">${mealNames[meal.meal]}</p><p class="meal-kcal">${estimated.length ? `<span class="num">${kcal}</span> \u5343\u5361` : "\u6682\u65F6\u7B97\u4E0D\u51FA\u6765"}</p></div></div><p class="meal-names">${ctx.esc(names)}</p><span class="meal-actions"><button class="text-button" data-diet-action="edit-meal" data-diet-id="${ctx.esc(meal.id)}">\u4FEE\u6539</button><button class="text-button" data-diet-action="delete-meal" data-diet-id="${ctx.esc(meal.id)}">\u5220\u9664</button></span></article>`;
    }
    return `<article class="saved-meal"><div class="section-mini"><span>${mealNames[meal.meal]} \xB7 <span class="num">${ctx.esc(meal.date)}</span></span><span class="meal-actions"><button class="text-button" data-diet-action="edit-meal" data-diet-id="${ctx.esc(meal.id)}">\u4FEE\u6539</button><button class="text-button" data-diet-action="delete-meal" data-diet-id="${ctx.esc(meal.id)}">\u5220\u9664</button></span></div><ul class="meal-lines">${meal.items.map((item) => `<li><span>${ctx.esc(item.name)}</span><span class="num">${item.grams ?? "\u2014"} \u514B</span><span class="num">${item.nutrition ? `\u7EA6 ${item.nutrition.kcal} \u5343\u5361` : "\u6682\u65F6\u7B97\u4E0D\u51FA\u6765"}</span></li>`).join("")}</ul><p class="small muted">${estimated.length ? `\u8FD9\u4E00\u9910\u5927\u7EA6 <span class="num">${kcal}</span> \u5343\u5361` : "\u8FD9\u4E00\u9910\u8FD8\u6CA1\u6709\u7B97\u51FA\u70ED\u91CF"}</p></article>`;
  }
  function recipePhoto(recipe, variant) {
    const src = `/recipes/${encodeURIComponent(recipe.id)}.jpg`;
    const frame = variant === "cover" ? "recipe-cover" : variant === "next" ? "next-meal-art" : "recipe-swatch";
    const alt = variant === "cover" ? ctx.esc(recipe.name) : "";
    return `<span class="${frame} recipe-photo meal-${ctx.esc(recipe.meal)}"><img src="${ctx.esc(src)}" alt="${alt}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('is-fallback')">${ctx.icon("bowl")}</span>`;
  }
  function recipeRow(recipe) {
    const note = visibleNote(recipe.note);
    return `<button class="recipe-row" type="button" data-diet-action="recipe" data-diet-id="${ctx.esc(recipe.id)}">${recipePhoto(recipe, "row")}<span class="recipe-row-body"><strong>${ctx.esc(recipe.name)}</strong><span class="recipe-facts"><span class="num">\u7EA6 ${recipe.nutrition.kcal} \u5343\u5361</span><span>${mealNames[recipe.meal] || "\u5BB6\u5E38"}</span>${recipe.blockedByHerbs ? "<span>\u5148\u4E0D\u4E3B\u52A8\u63A8\u8350</span>" : ""}</span>${note ? `<span class="recipe-line">${ctx.esc(note)}</span>` : ""}</span><span class="recipe-chevron" aria-hidden="true">${ctx.icon("arrow")}</span></button>`;
  }
  function openRecipe(id) {
    const recipe = catalog?.recipes.find((item) => item.id === id) || recommendation?.recipe;
    if (!recipe || recipe.id !== id && recommendation?.recipe?.id !== id) return;
    const chosen = recipe.id === id ? recipe : recommendation.recipe;
    const note = visibleNote(chosen.note);
    ctx.openDetail(`${recipePhoto(chosen, "cover")}<div class="detail-body"><span class="chip">\u98DF\u8C31</span><h2>${ctx.esc(chosen.name)}</h2><p class="small muted">${mealNames[chosen.meal] || "\u5BB6\u5E38"}</p><p class="food-kcal"><span class="num">${chosen.nutrition.kcal}</span><small>\u7EA6\u5343\u5361</small></p>${macroPills(chosen.nutrition)}<h3>\u539F\u6599\u548C\u514B\u6570</h3><div class="ingredient-list">${chosen.ingredients.map((item) => `<span>${ctx.esc(item.name)} <span class="num">${item.grams}</span> \u514B</span>`).join("")}</div><h3>\u505A\u6CD5</h3><ol class="step-list">${chosen.steps.map((step) => `<li>${ctx.esc(step)}</li>`).join("")}</ol>${note ? `<p class="gentle-note">${ctx.esc(note)}</p>` : ""}${chosen.avoid?.includes("kidney_high_protein") ? '<p class="boundary-note">\u8FD9\u9053\u86CB\u767D\u8D28\u6BD4\u8F83\u9AD8\u3002\u6709\u80BE\u75C5\u60C5\u51B5\u65F6\uFF0C\u4E0D\u4F1A\u56E0\u4E3A\u86CB\u767D\u8D28\u4E0D\u591F\u5C31\u63A8\u8350\u5B83\u3002</p>' : ""}</div>`, "\u98DF\u8C31");
  }
  async function saveTargets(form) {
    const data = new FormData(form);
    if (!data.get("confirm")) {
      ctx.toast("\u8BF7\u5148\u52FE\u9009\u786E\u8BA4\uFF0C\u518D\u4FDD\u5B58\u76EE\u6807");
      return;
    }
    const current = ctx.getState().dietSettings;
    await ctx.writeStore((storage2) => storage2.dietSettings({ ...current, targets: { kcal: blank(data.get("kcal")), protein: blank(data.get("protein")), fat: blank(data.get("fat")), carb: blank(data.get("carb")), source: "user", confirmed: true }, flagsConfirmed: current.flagsConfirmed }));
    invalidateToday();
    ctx.toast("\u6BCF\u65E5\u76EE\u6807\u5DF2\u4FDD\u5B58\u5728\u672C\u673A");
  }
  async function saveFlags(form) {
    const data = new FormData(form);
    if (!data.get("confirm")) {
      ctx.toast("\u8BF7\u5148\u52FE\u9009\u786E\u8BA4\uFF0C\u518D\u4FDD\u5B58\u8FD9\u4E9B\u60C5\u51B5");
      return;
    }
    const current = ctx.getState().dietSettings;
    const flags = Object.fromEntries(["pregnancy", "lactation", "minor", "kidney", "diabetes", "hypertension", "eatingDisorder"].map((key) => [key, data.get(key) === "on"]));
    await ctx.writeStore((storage2) => storage2.dietSettings({ ...current, flags, flagsConfirmed: true }));
    invalidateToday();
    ctx.toast("\u5DF2\u4FDD\u5B58\u3002\u4E4B\u540E\u7684\u62A5\u544A\u4F1A\u6309\u8FD9\u4E9B\u60C5\u51B5\u653E\u5BBD\u5EFA\u8BAE");
  }
  function invalidateToday() {
    report = null;
    recommendation = null;
    excludeIds = [];
    inflight = "";
  }
  function cacheKey() {
    const state2 = ctx.getState();
    const meals = mealsOn(state2, localDateString());
    return JSON.stringify({ meals: meals.map((meal) => [meal.id, meal.updatedAt, meal.items.map((item) => [item.foodId, item.grams, item.status])]), targets: state2.dietSettings.targets, flags: state2.dietSettings.flags, flagsConfirmed: state2.dietSettings.flagsConfirmed });
  }
  return { loadCatalog, record, today: today2, library: library2, settings, onClick, onSubmit };
}
function mealsOn(state2, date) {
  return (state2.meals || []).filter((meal) => meal.date === date).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}
function defaultMeal() {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  if (hour < 10) return "breakfast";
  if (hour < 15) return "lunch";
  return hour < 21 ? "dinner" : "snack";
}
function heading(title, sub) {
  return `<header class="page-heading diet-heading"><div><h1>${title}</h1><p>${sub}</p></div></header>`;
}
function matchLibrary(recipe, filter) {
  if (!filter || filter === "all") return true;
  if (filter === "breakfast" || filter === "lunch" || filter === "dinner" || filter === "snack") return recipe.meal === filter;
  const note = `${recipe.note || ""}`;
  if (filter === "light") return note.includes("\u6E05\u6DE1");
  if (filter === "home") return note.includes("\u5BB6\u5E38");
  return true;
}
function bowlArt() {
  return '<svg viewBox="0 0 72 56" fill="none" aria-hidden="true"><ellipse cx="36" cy="44" rx="24" ry="7" fill="#E6D9C8"/><path d="M14 28h44c0 12-9 18-22 18S14 40 14 28z" fill="#FFFCF8" stroke="#C9B8A4" stroke-width="1.4"/><path d="M24 27c1.5-7 6-11 12-11s10.5 4 12 11" stroke="#7FA38E" stroke-width="1.5" stroke-linecap="round"/><path d="M30 18c2-4 5-6 8-6" stroke="#A8C5B5" stroke-width="1.4" stroke-linecap="round"/></svg>';
}
function friendlyMessage(message, fallback = "\u8BF7\u7A0D\u540E\u518D\u8BD5") {
  const text = String(message || "").trim();
  if (!text || /模型|密钥|API|DASHSCOPE|USDA|测试替身|未配置|大模型|千问|百炼|Demo|演示|示例/.test(text)) return fallback;
  return text;
}
function gentleNotice(notice) {
  return friendlyMessage(notice, "\u8BF7\u6838\u5BF9\u98DF\u7269\u548C\u5206\u91CF\uFF0C\u518D\u8BB0\u4E0B\u6765\u3002");
}
function displaySource(nutrition) {
  if (!nutrition) return null;
  if (nutrition.source === "\u8584\u8377\u5065\u5EB7") {
    const code = String(nutrition.sourceNote || "").match(/编码\s*(\S+)/);
    return { label: "\u8584\u8377\u5065\u5EB7", detail: code ? `\u98DF\u7269\u7F16\u7801 ${code[1]}` : "" };
  }
  const fdc = String(nutrition.sourceNote || "").match(/FDC\s*(\d+)/);
  return { label: "\u77E5\u517B\u98DF\u7269\u5E93", detail: fdc ? `\u53C2\u8003\u7F16\u53F7 FDC ${fdc[1]}` : "" };
}
function visibleNote(note) {
  return String(note || "").split(/(?<=[。！？])/).map((part) => part.trim()).filter((part) => part && !/USDA|FDC|待审核|示例|Demo|大模型|API|密钥|测试/.test(part)).join("");
}
function urgentBanner(result) {
  return `<div class="urgent-help" role="alert"><strong>\u8BF7\u7ACB\u5373\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9</strong><p>${result.text}</p></div>`;
}
function unestimatedCopy(reason) {
  if (reason === "too_vague") return "\u8FD9\u4E2A\u8BF4\u6CD5\u6709\u70B9\u7B3C\u7EDF\u3002\u5199\u6210\u5177\u4F53\u7684\u83DC\uFF0C\u6BD4\u5982\u300C\u7C73\u996D\u3001\u9752\u83DC\u548C\u9E21\u817F\u300D\uFF0C\u624D\u80FD\u4F30\u7B97\u3002";
  return "\u8FD9\u9053\u6682\u65F6\u7B97\u4E0D\u51FA\u6765\u3002\u53EF\u4EE5\u6362\u6210\u4E0A\u9762\u7684\u98DF\u7269\uFF0C\u6216\u5148\u7559\u7740\u3002\u4E0D\u4F1A\u968F\u4FBF\u586B\u4E00\u4E2A\u70ED\u91CF\u3002";
}
function flagBox(name, label, checked) {
  return `<label class="check-line"><input type="checkbox" name="${name}" ${checked ? "checked" : ""}> ${label}</label>`;
}
function blank(value) {
  const text = String(value ?? "").trim();
  return text === "" ? null : Number(text);
}
function macroShares(nutrition) {
  const protein = Number(nutrition?.protein) || 0;
  const fat = Number(nutrition?.fat) || 0;
  const carb = Number(nutrition?.carb) || 0;
  const total = protein + fat + carb || 1;
  return { protein: protein / total * 100, fat: fat / total * 100, carb: carb / total * 100 };
}
function macroPills(nutrition) {
  const share = macroShares(nutrition);
  return `<div class="macro-stack" aria-hidden="true"><i class="protein" style="width:${share.protein.toFixed(1)}%"></i><i class="fat" style="width:${share.fat.toFixed(1)}%"></i><i class="carb" style="width:${share.carb.toFixed(1)}%"></i></div><p class="macro-pills"><span>\u86CB\u767D\u8D28 <b class="num">${nutrition.protein}</b> \u514B</span><span>\u8102\u80AA <b class="num">${nutrition.fat}</b> \u514B</span><span>\u78B3\u6C34 <b class="num">${nutrition.carb}</b> \u514B</span></p>`;
}
function macroTiles(totals, targets) {
  const rows = [
    ["\u86CB\u767D\u8D28", "protein", totals.protein, targets?.protein],
    ["\u78B3\u6C34\u5316\u5408\u7269", "carb", totals.carb, targets?.carb],
    ["\u8102\u80AA", "fat", totals.fat, targets?.fat]
  ];
  return `<div class="macro-tiles">${rows.map(([label, kind, value, target]) => {
    const amount = Number(value) || 0;
    const hasTarget = target != null && Number(target) > 0;
    const note = hasTarget ? `\u76EE\u6807 ${target} \u514B` : "\u672A\u8BBE\u76EE\u6807";
    return `<article class="macro-tile"><span class="macro-ico ${kind}" aria-hidden="true">${macroGlyph(kind)}</span><p>${label}</p><strong class="num">${amount}<small>\u514B</small></strong><p class="small">${note}</p></article>`;
  }).join("")}</div>`;
}
function macroGlyph(kind) {
  const open = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  if (kind === "protein") return `${open}<path d="M19 4C11 4 6 8 6 14a5 5 0 0 0 5 5c7 0 11-5 8-15Z"/><path d="M9 19c2-5 5-8 10-10"/></svg>`;
  if (kind === "carb") return `${open}<path d="M5 14c2-6 5-8 7-8s5 2 7 8"/><path d="M7 14h10c0 4-2.5 6-5 6s-5-2-5-6Z"/></svg>`;
  return `${open}<path d="M12 3.5c2.2 4 5 6.8 5 10.2a5 5 0 0 1-10 0c0-3.4 2.8-6.2 5-10.2Z"/></svg>`;
}
function ringSvg(ratio, tone) {
  const dash = ratio == null ? RING_C : Math.max(0, Math.min(ratio, 1)) * RING_C;
  const shown = dash.toFixed(2);
  const rest = (RING_C - dash).toFixed(2);
  return `<svg class="kcal-ring ${tone}" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="${RING_R}" class="ring-track"/><circle cx="70" cy="70" r="${RING_R}" class="ring-value" stroke-dasharray="${shown} ${rest}" transform="rotate(-90 70 70)"/></svg>`;
}
async function compressImage(file) {
  if (!file.type.startsWith("image/")) throw new Error("\u8BF7\u9009\u62E9\u56FE\u7247");
  if (file.size > 8 * 1024 * 1024) throw new Error("\u56FE\u7247\u592A\u5927\uFF0C\u8BF7\u6362\u4E00\u5F20\u8F83\u5C0F\u7684\u7167\u7247");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1024 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.72));
  if (!blob) throw new Error("\u7167\u7247\u5904\u7406\u5931\u8D25");
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = "";
  for (let index = 0; index < bytes.length; index += 32768) binary += String.fromCharCode(...bytes.subarray(index, index + 32768));
  return `data:image/jpeg;base64,${btoa(binary)}`;
}

// src/client/app.js
var icons = { home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/>', note: '<path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M15 3v5h5M9 13h6M9 17h4"/>', leaf: '<path d="M20 3c-9-1-16 3-16 10a7 7 0 0 0 7 7C18 20 21 12 20 3Z"/><path d="m4 21 11-12"/>', heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>', spark: '<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6Z"/>', arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>', close: '<path d="m6 6 12 12M18 6 6 18"/>', bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>', moon: '<path d="M21 13A9 9 0 0 1 11 3 9 9 0 1 0 21 13Z"/>', wind: '<path d="M3 8h12a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h5"/>', scale: '<path d="M4 5h16v16H4z"/><path d="M8 9a5 5 0 0 1 8 0M12 8v3"/>', bowl: '<path d="M3 12h18c0 6-5 8-9 8s-9-2-9-8Z"/><path d="M7 5v3m5-5v5m5-3v3"/>', check: '<path d="m5 12 4 4L19 6"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', back: '<path d="m14 5-7 7 7 7"/>', book: '<path d="M3 3h6a4 4 0 0 1 3 2 4 4 0 0 1 3-2h6v17h-6a4 4 0 0 0-3 2 4 4 0 0 0-3-2H3zM12 5v17"/>', cup: '<path d="M4 7h13v8a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 8h2a3 3 0 0 1 0 6h-2M7 3v1m4-1v1m4-1v1"/>', camera: '<path d="M4 8h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="3.2"/>', send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>' };
var icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.leaf}</svg>`;
var esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
var dietPages = createDietPages({ getState: () => state, writeStore, toast, navigate, openDetail, icon, esc, render: () => render() });
var state = emptyState();
var page = "home";
var foodTab = "\u5168\u90E8";
var careTab = "\u5168\u90E8";
var day = "\u4ECA\u65E5";
var homeMode = "\u4E09\u9910";
var toastTimer;
var chatBusy = false;
var history = [];
var chatVersion = 0;
var storage = null;
var storageError = "";
var dataEpoch = 0;
var clearing = false;
var writeQueue = Promise.resolve();
var requestController = null;
var activePlan = null;
var contentRef = null;
var urgentSession = false;
async function refreshState() {
  const epoch = dataEpoch;
  const next = await storage.load();
  if (epoch === dataEpoch) {
    state = next;
    render();
  }
}
async function writeStore(action) {
  if (!storage || clearing) throw new Error("\u672C\u673A\u5B58\u50A8\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
  const epoch = dataEpoch;
  const task = writeQueue.catch(() => {
  }).then(() => {
    if (epoch !== dataEpoch) throw new Error("\u64CD\u4F5C\u5DF2\u53D6\u6D88");
    return action(storage);
  });
  writeQueue = task;
  const value = await task;
  if (epoch === dataEpoch) await refreshState();
  return value;
}
async function bootStorage() {
  try {
    storage = await openStorage();
    storageError = "";
  } catch {
    storageError = "\u672C\u6D4F\u89C8\u5668\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6216\u4FDD\u5B58\u672C\u673A\u8BB0\u5F55\u3002\u4F60\u4ECD\u53EF\u6D4F\u89C8\u5185\u5BB9\uFF1B\u8BF7\u91CD\u8BD5\u5B58\u50A8\u6216\u68C0\u67E5\u6D4F\u89C8\u5668\u8BBE\u7F6E\u3002";
  }
  await dietPages.loadCatalog();
  if (storage) await refreshState();
  else render();
}
var pendingPlans = /* @__PURE__ */ new Map();
var main = document.getElementById("main");
var detail = document.getElementById("detail-dialog");
var chat = document.getElementById("chat-dialog");
var assessment = createAssessmentUI({ show: openDetail, storage: () => {
  if (!storage || clearing) throw new Error("\u672C\u673A\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u6682\u65F6\u65E0\u6CD5\u4FDD\u5B58");
  return storage;
}, changed: refreshState, notify: toast });
function toast(s) {
  clearTimeout(toastTimer);
  const el = document.getElementById("toast");
  el.textContent = s;
  el.classList.add("show");
  toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
}
function paintIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => el.innerHTML = icon(el.dataset.icon));
}
function chineseDate(now = /* @__PURE__ */ new Date()) {
  const week = ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"][now.getDay()];
  return `${now.getMonth() + 1}\u6708${now.getDate()}\u65E5 \xB7 ${week}`;
}
function heading2(title, sub, english = "YOUR WELLNESS SPACE") {
  const now = /* @__PURE__ */ new Date();
  const week = ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"][now.getDay()];
  return `<div class="page-heading"><div><p class="eyebrow">${english}</p><h1>${title}</h1><p>${sub}</p></div><div class="date-stamp"><strong>${now.getMonth() + 1}\u6708${now.getDate()}\u65E5</strong><span>${week}</span></div></div>`;
}
function sectionHead(title, label, button = "") {
  return `<div class="section-heading"><div><span class="eyebrow">${label}</span><h2>${title}</h2></div>${button}</div>`;
}
function recipeCard(r, compact = false) {
  return `<button class="recipe-tile ${compact ? "compact" : ""}" data-recipe="${r.id}">${r.image ? `<img src="${r.image}" alt="${r.title}\u98DF\u7269\u793A\u610F" loading="lazy">` : `<div class="recipe-type-art ${r.id === "breakfast" ? "amber" : ""}">${icon(r.id === "tea" ? "cup" : "bowl")}<span>${r.time}</span></div>`}<div class="recipe-tile-body"><span class="tag">${r.tag}</span><h3>${r.title}</h3><p>${r.desc}</p><div class="recipe-meta"><span>${r.duration}</span><span>\u67E5\u770B\u642D\u914D ${icon("arrow")}</span></div></div></button>`;
}
function articleCard(a) {
  return `<button class="article-card" data-article="${a.id}"><img src="${a.image}" alt="${a.label}\u914D\u56FE" loading="lazy"><div><span class="article-label">${a.label}</span><h3>${a.title}</h3><span class="small muted">${a.read}\u9605\u8BFB \xB7 \u5185\u5BB9\u793A\u4F8B</span></div></button>`;
}
function home() {
  return dietPages.record();
}
function today() {
  return dietPages.today();
}
function library() {
  return dietPages.library();
}
function food() {
  const options2 = ["\u5168\u90E8", "\u4E09\u9910\u642D\u914D", "\u98DF\u517B\u8336\u996E", "\u8D77\u5C45\u5EFA\u8BAE", "\u6587\u7AE0"];
  const visible = recipes.filter((r) => foodTab === "\u5168\u90E8" || r.category === foodTab);
  return `${heading2("\u4E00\u65E5\u4E09\u9910\uFF0C\u4E00\u70B9\u98DF\u517B\u3002", "\u628A\u9002\u5408\u81EA\u5DF1\u7684\u642D\u914D\uFF0C\u6162\u6162\u653E\u8FDB\u751F\u6D3B\u3002", "FOOD & EVERYDAY LIVING")}<div class="food-banner"><img src="assets/lunch.jpg" alt="\u4E2D\u5F0F\u4E09\u9910\u642D\u914D\u793A\u610F"><div><span class="subtle-label">\u4ECE\u5BB6\u5E38\u996D\u5F00\u59CB</span><h2>\u597D\u597D\u5403\u996D\uFF0C\u662F\u6BCF\u5929\u7684\u5C0F\u4E8B\u3002</h2><p>\u98DF\u8C31\u3001\u8336\u996E\u548C\u8D77\u5C45\u53C2\u8003\uFF0C<br>\u4E5F\u53EF\u4EE5\u4EA4\u7ED9\u77E5\u517B\u4E00\u8D77\u5E2E\u4F60\u9009\u3002</p><button class="primary-button" data-chat="\u5E2E\u6211\u5B89\u6392\u4E00\u65E5\u4E09\u9910">${icon("spark")} \u5E2E\u6211\u5B89\u6392\u4E09\u9910</button></div></div><div class="filter-row" aria-label="\u98DF\u517B\u5206\u7C7B">${options2.map((x) => `<button data-food-tab="${x}" class="filter-chip ${foodTab === x ? "active" : ""}" aria-pressed="${foodTab === x}">${x}</button>`).join("")}</div>${foodTab === "\u4E09\u9910\u642D\u914D" ? `<div class="inline-heading"><h2>${day}\u4E09\u9910\u53C2\u8003</h2><div class="segmented"><button data-day="\u4ECA\u65E5" class="${day === "\u4ECA\u65E5" ? "active" : ""}">\u4ECA\u65E5</button><button data-day="\u660E\u65E5" class="${day === "\u660E\u65E5" ? "active" : ""}">\u660E\u65E5</button></div></div><p class="muted section-note">\u793A\u4F8B\u5B89\u6392\uFF0C\u53EF\u6309\u4F60\u7684\u504F\u597D\u66FF\u6362\uFF1B\u4EFD\u91CF\u672A\u505A\u4E2A\u4EBA\u8BA1\u7B97\u3002</p>` : ""}${foodTab === "\u6587\u7AE0" ? `<div class="article-grid">${articles.map(articleCard).join("")}</div>` : foodTab === "\u8D77\u5C45\u5EFA\u8BAE" ? `<div class="routine-card"><span class="routine-icon">${icon("moon")}</span><div><span class="tag">\u665A\u95F4\u8D77\u5C45</span><h3>${lifestyle.title}</h3><p>${lifestyle.desc}</p></div><button class="primary-button" data-lifestyle="sleep">\u67E5\u770B\u5EFA\u8BAE</button></div>` : `<div class="food-grid">${(foodTab === "\u4E09\u9910\u642D\u914D" && day === "\u660E\u65E5" ? [recipes[0], { ...recipes[2], time: "\u5348\u9910" }, { ...recipes[1], time: "\u665A\u9910" }] : visible).map((r) => recipeCard(r)).join("")}</div>`}<div class="small-notice">${icon("book")} \u672C\u9875\u4E3A\u5185\u5BB9\u4E0E\u4EA4\u4E92\u793A\u4F8B\u3002\u53EF\u5728\u8BE6\u60C5\u4E2D\u67E5\u770B\u53C2\u8003\u6765\u6E90\u548C\u9002\u7528\u8BF4\u660E\u3002</div>`;
}
function care() {
  const groups = ["\u5168\u90E8", "\u65E5\u5E38\u72B6\u6001", "\u547C\u5438\u4E0E\u54BD\u5589", "\u813E\u80C3\u4E0E\u6D88\u5316", "\u4F5C\u606F\u4E0E\u60C5\u7EEA"];
  return `${heading2("\u8EAB\u4F53\u7684\u5C0F\u4FE1\u53F7\uFF0C\u8BA4\u771F\u542C\u3002", "\u4ECE\u4F60\u7684\u611F\u53D7\u51FA\u53D1\uFF0C\u770B\u770B\u65E5\u5E38\u751F\u6D3B\u53EF\u4EE5\u600E\u6837\u8C03\u6574\u3002", "CARE & DAILY WELLBEING")}<div class="care-intro"><span class="care-intro-icon">${icon("heart")}</span><div><h2>\u65E5\u5E38\u8C03\u517B\uFF0C\u4E5F\u8981\u6709\u5206\u5BF8\u3002</h2><p>\u4EE5\u4E0B\u4E3A\u4E00\u822C\u751F\u6D3B\u3001\u996E\u98DF\u4E0E\u4F11\u606F\u53C2\u8003\uFF0C\u4E0D\u7528\u4E8E\u8BCA\u65AD\u6216\u6CBB\u7597\u3002<br>\u6D89\u53CA\u533B\u7597\u7528\u9014\uFF0C\u8BF7\u54A8\u8BE2\u533B\u751F\uFF1B\u6301\u7EED\u6216\u660E\u663E\u4E0D\u9002\u65F6\uFF0C\u4F18\u5148\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9\u3002</p></div><button class="outline-button" data-chat="\u6211\u60F3\u804A\u804A\u6700\u8FD1\u7684\u8EAB\u4F53\u611F\u53D7">${icon("spark")} \u548C\u52A9\u624B\u804A\u804A</button></div><section class="section">${sectionHead("\u5F53\u4E0B\u70ED\u95E8", "COMMON CONCERNS")}<div class="filter-row">${groups.map((x) => `<button class="filter-chip ${careTab === x ? "active" : ""}" data-care-tab="${x}" aria-pressed="${careTab === x}">${x}</button>`).join("")}</div><div class="care-grid">${topics.filter((t) => careTab === "\u5168\u90E8" || t.group === careTab).map((t) => `<button class="care-tile" data-topic="${t.id}"><span class="topic-symbol ${t.accent}">${icon(t.icon)}</span><span class="small muted">${t.group}</span><h3>${t.title}</h3><p>${t.subtitle}</p><span class="meal-link">\u751F\u6D3B\u5EFA\u8BAE \xB7 \u98DF\u517B\u53C2\u8003 ${icon("arrow")}</span></button>`).join("")}</div></section><div class="feature-line"><div><span class="eyebrow">KNOW YOURSELF</span><h3>\u6E7F\u6C14\u91CD\uFF0C\u5C31\u662F\u75F0\u6E7F\u8D28\u5417\uFF1F</h3><p>\u65E5\u5E38\u611F\u53D7\u4E0E\u6B63\u5F0F\u4F53\u8D28\u5224\u5B9A\u6709\u533A\u522B\u3002\u5148\u4E86\u89E3\u4E5D\u79CD\u57FA\u672C\u7C7B\u578B\u3002</p></div><button class="outline-button" data-action="constitutions">\u4E86\u89E3\u4E5D\u79CD\u4F53\u8D28 ${icon("arrow")}</button></div>`;
}
function profile() {
  return dietPages.settings();
}
function render() {
  document.querySelectorAll("[data-page]").forEach((b) => {
    b.classList.toggle("active", b.dataset.page === page && b.classList.contains("nav-item"));
    if (b.classList.contains("nav-item")) b.setAttribute("aria-current", b.dataset.page === page ? "page" : "false");
  });
  main.classList.remove("is-entering");
  main.innerHTML = (storageError ? `<div class="storage-error" role="alert">${esc(storageError)} <button class="text-button" data-action="retry-storage">\u91CD\u8BD5\u5B58\u50A8</button></div>` : "") + ({ home, today, library, food, care, profile }[page] || home)();
  const label = document.querySelector(".topbar-label");
  if (label) label.textContent = "\u77E5\u517B";
  const slot = document.getElementById("date-slot");
  if (slot) slot.textContent = chineseDate();
  void main.offsetWidth;
  main.classList.add("is-entering");
  paintIcons();
}
function navigate(next, replace = false) {
  if (!["home", "today", "library", "profile"].includes(next)) return;
  page = next;
  render();
  historyAPI(replace);
  window.scrollTo({ top: 0, behavior: "instant" });
}
function historyAPI(replace) {
  window.history[replace ? "replaceState" : "pushState"]({}, "", `#${page}`);
}
window.addEventListener("popstate", () => {
  page = location.hash.slice(1) || "home";
  if (!["home", "today", "library", "profile"].includes(page)) page = "home";
  render();
});
function detailHeader(label) {
  return `<div class="dialog-toolbar"><span>${label}</span><button class="icon-button" data-close="detail" aria-label="\u5173\u95ED\u8BE6\u60C5">${icon("close")}</button></div>`;
}
function openDetail(html, label = "\u5185\u5BB9\u8BE6\u60C5") {
  document.getElementById("detail-content").innerHTML = detailHeader(label) + html;
  detail.setAttribute("aria-label", label);
  if (!detail.open) detail.showModal();
  detail.scrollTop = 0;
}
var sourceHtml = (key) => sources[key] ? `<details class="source-details"><summary>\u53C2\u8003\u6765\u6E90\u4E0E\u5185\u5BB9\u8BF4\u660E</summary><p>\u9875\u9762\u6587\u6848\u4E3A Demo \u7F16\u6392\u793A\u4F8B\uFF0C\u672A\u7ECF\u8FC7\u5B8C\u6574\u4E13\u4E1A\u5BA1\u6838\u3002\u4E0B\u5217\u6765\u6E90\u63D0\u4F9B\u76F8\u5173\u4E00\u822C\u539F\u5219\uFF0C\u4E0D\u662F\u5BF9\u672C\u65B9\u6848\u7684\u9A8C\u8BC1\u3002</p><a href="${sources[key].url}" target="_blank" rel="noopener noreferrer">${sources[key].title} \u2197</a></details>` : "";
function recipeDetail(id) {
  const r = recipes.find((x) => x.id === id);
  if (!r) return;
  const saved = state.saved.includes("recipe:" + id);
  openDetail(`${r.image ? `<img class="detail-cover" src="${r.image}" alt="${r.title}\u793A\u610F\u56FE">` : ""}<div class="detail-body"><span class="tag">${r.category} \xB7 \u793A\u4F8B</span><h2>${r.title}</h2><p class="detail-lead">${r.desc}</p><div class="detail-meta">${icon("clock")} ${r.duration}<span>\xB7</span>\u65E5\u5E38\u98DF\u517B\u53C2\u8003</div><h3>\u51C6\u5907\u8FD9\u4E9B\u98DF\u6750</h3><div class="ingredient-list">${r.ingredients.map((x) => `<span>${x}</span>`).join("")}</div><h3>\u53EF\u4EE5\u8FD9\u6837\u642D\u914D</h3><ol class="step-list">${r.steps.map((x) => `<li>${x}</li>`).join("")}</ol><div class="gentle-note">${r.note}</div>${sourceHtml(r.source)}<div class="detail-actions"><button class="primary-button" data-ref-type="recipe" data-ref-id="${r.id}" data-detail-chat="${r.id === "tea" ? "\u63A8\u8350\u4E00\u676F\u517B\u751F\u8336" : `\u8FD9\u9053${r.title}\u600E\u4E48\u52A0\u5165\u6211\u7684\u4E09\u9910\uFF1F`}">${icon("spark")} \u7ED3\u5408\u6211\u7684\u60C5\u51B5\u95EE\u95EE AI</button><button class="outline-button" data-save="recipe:${r.id}">${icon("bookmark")} ${saved ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF"}</button></div></div>`, "\u98DF\u517B\u8BE6\u60C5");
}
function topicDetail(id) {
  const t = topics.find((x) => x.id === id);
  if (!t) return;
  openDetail(`<div class="detail-body"><span class="topic-symbol ${t.accent}">${icon(t.icon)}</span><span class="tag">${t.group} \xB7 \u4E13\u9898\u793A\u4F8B</span><h2>${t.title}</h2><p class="detail-lead">${t.subtitle}</p><div class="boundary-note"><strong>\u5148\u770B\u9002\u7528\u8FB9\u754C</strong><p>${t.boundary}</p></div><h3>\u65E5\u5E38\u751F\u6D3B\u53EF\u4EE5\u5148\u7559\u610F</h3><ol class="step-list">${t.tips.map((x) => `<li>${x}</li>`).join("")}</ol>${t.related ? `<h3>\u76F8\u5173\u98DF\u517B\u7075\u611F</h3><p class="small muted">\u4EC5\u4E3A\u5185\u5BB9\u5173\u8054\u793A\u4F8B\uFF0C\u4E0D\u4EE3\u8868\u5BF9\u8FD9\u4E00\u75C7\u72B6\u6709\u6548\u3002</p><button class="related-card" data-recipe="${t.related}">${icon("bowl")}<span>${recipes.find((r) => r.id === t.related).title}</span>${icon("arrow")}</button>` : ""}${sourceHtml(t.source)}<div class="detail-actions"><button class="primary-button" data-ref-type="topic" data-ref-id="${t.id}" data-detail-chat="${t.title}">${icon("spark")} \u628A\u6211\u7684\u60C5\u51B5\u544A\u8BC9 AI</button></div></div>`, "\u65E5\u5E38\u8C03\u517B");
}
function articleDetail(id) {
  const a = articles.find((x) => x.id === id);
  if (!a) return;
  openDetail(`<img class="detail-cover" src="${a.image}" alt="${a.label}\u914D\u56FE"><article class="detail-body article-body"><span class="tag">${a.label}</span><h2>${a.title}</h2><p class="small muted">\u77E5\u517B\u5185\u5BB9\u793A\u4F8B \xB7 ${a.read}\u9605\u8BFB</p><p class="detail-lead">${a.intro}</p>${a.paragraphs.map(([h, p]) => `<h3>${h}</h3><p>${p}</p>`).join("")}${sourceHtml(a.source)}<div class="detail-actions"><button class="primary-button" data-ref-type="article" data-ref-id="${a.id}" data-detail-chat="\u5982\u4F55\u628A${a.label}\u7528\u5230\u6211\u7684\u4E00\u65E5\u4E09\u9910\uFF1F">${icon("spark")} \u548C\u52A9\u624B\u804A\u804A\u8FD9\u7BC7\u6587\u7AE0</button><button class="outline-button" data-save="article:${a.id}">${icon("bookmark")} ${state.saved.includes("article:" + id) ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF"}</button></div></article>`, "\u98DF\u517B\u6587\u7AE0");
}
function lifestyleDetail() {
  openDetail(`<div class="detail-body"><span class="topic-symbol purple">${icon("moon")}</span><span class="tag">\u8D77\u5C45\u5EFA\u8BAE</span><h2>${lifestyle.title}</h2><p class="detail-lead">${lifestyle.desc}</p><ol class="step-list">${lifestyle.points.map((p) => `<li>${p}</li>`).join("")}</ol><div class="gentle-note">\u5B89\u6392\u8981\u7B26\u5408\u4F60\u7684\u771F\u5B9E\u4F5C\u606F\u3002\u6301\u7EED\u7761\u7720\u56F0\u6270\u5E94\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9\u3002</div><button class="primary-button" data-detail-chat="\u5E2E\u6211\u8C03\u6574\u4F5C\u606F">${icon("spark")} \u5E2E\u6211\u5B89\u6392\u4ECA\u665A</button></div>`, "\u665A\u95F4\u8D77\u5C45");
}
function editProfile() {
  const p = state.profile;
  openDetail(`<div class="detail-body"><span class="tag">\u4EC5\u5728\u672C\u6D4F\u89C8\u5668\u4FDD\u5B58</span><h2>\u8BA9\u5EFA\u8BAE\uFF0C\u66F4\u8D34\u8FD1\u4F60\u7684\u751F\u6D3B</h2><p class="detail-lead">\u8FD9\u91CC\u53EF\u4EE5\u4F7F\u7528\u865A\u6784\u4FE1\u606F\u4F53\u9A8C\uFF0C\u4E0D\u5FC5\u586B\u5199\u771F\u5B9E\u5065\u5EB7\u8D44\u6599\u3002</p><form id="profile-form"><label class="form-label">\u600E\u4E48\u79F0\u547C\u4F60<input name="name" maxlength="20" value="${esc(p.name)}" required autocomplete="off"></label><label class="form-label">\u5F53\u524D\u6700\u60F3\u5173\u6CE8\u7684\u76EE\u6807<select name="goal">${["\u5747\u8861\u996E\u98DF", "\u5065\u5EB7\u51CF\u91CD", "\u5065\u5EB7\u589E\u91CD", "\u89C4\u5F8B\u4F5C\u606F"].map((v) => `<option ${v === p.goal ? "selected" : ""}>${v}</option>`).join("")}</select></label><label class="form-label">\u5E73\u65F6\u600E\u6837\u5403\u996D<select name="habit">${["\u81EA\u5DF1\u505A\u996D\u4E0E\u5916\u98DF\u90FD\u6709", "\u4E3B\u8981\u81EA\u5DF1\u505A\u996D", "\u4E3B\u8981\u5728\u5916\u5403\u996D"].map((v) => `<option ${v === p.habit ? "selected" : ""}>${v}</option>`).join("")}</select></label><label class="form-label">\u996E\u98DF\u504F\u597D<select name="preference">${["\u6682\u65E0\u504F\u597D", "\u504F\u7231\u5BB6\u5E38\u4E2D\u9910", "\u66F4\u559C\u6B22\u6E05\u6DE1\u53E3\u5473", "\u4E0D\u559C\u6B22\u5403\u9C7C"].map((v) => `<option ${v === p.preference ? "selected" : ""}>${v}</option>`).join("")}</select></label><p class="small muted">\u6B64\u5904\u6CA1\u6709\u91C7\u96C6\u75BE\u75C5\u3001\u7528\u836F\u548C\u8FC7\u654F\u53F2\uFF0C\u4E5F\u4E0D\u4F1A\u636E\u6B64\u751F\u6210\u771F\u5B9E\u4E2A\u4EBA\u5904\u65B9\u3002</p><button class="primary-button full-button" type="submit">\u4FDD\u5B58\u6863\u6848 ${icon("check")}</button></form></div>`, "\u7F16\u8F91\u6211\u7684\u6863\u6848");
}
function constitutionList() {
  openDetail(`<div class="detail-body"><span class="tag">\u4F53\u8D28\u79D1\u666E</span><h2>\u8BA4\u8BC6\u4E2D\u533B\u4E5D\u79CD\u4F53\u8D28</h2><p class="detail-lead">\u4EE5\u4E0B\u662F\u4E5D\u79CD\u57FA\u672C\u7C7B\u578B\u3002\u4E0B\u9762\u7684\u63D0\u793A\u8BCD\u4EC5\u5E2E\u52A9\u6D4F\u89C8\uFF0C\u4E0D\u662F\u8BCA\u65AD\u4F9D\u636E\uFF0C\u4E5F\u4E0D\u80FD\u9760\u5355\u4E2A\u611F\u53D7\u7ED9\u81EA\u5DF1\u5B9A\u578B\u3002</p><div class="constitution-grid">${constitutions.map(([n, d], i) => `<div class="constitution-type"><span>${String(i + 1).padStart(2, "0")}</span><h3>${n}</h3><p>${d}</p></div>`).join("")}</div><p class="gentle-note">\u201C\u6E7F\u6C14\u91CD\u201D\u662F\u65E5\u5E38\u63CF\u8FF0\uFF0C\u4E0D\u7B49\u4E8E\u5DF2\u7ECF\u5224\u5B9A\u4E3A\u201C\u75F0\u6E7F\u8D28\u201D\u3002\u6B63\u5F0F\u5224\u5B9A\u5E94\u4F7F\u7528\u5B8C\u6574\u6807\u51C6\u91CF\u8868\u53CA\u76F8\u5E94\u8BA1\u5206\u65B9\u6CD5\u3002</p>${sourceHtml("constitution")}<button class="primary-button full-button" data-action="quiz">\u5F00\u59CB\u65E5\u5E38\u611F\u53D7\u8BD5\u6D4B ${icon("arrow")}</button></div>`, "\u4E2D\u533B\u4E5D\u79CD\u4F53\u8D28");
}
function about() {
  openDetail(`<div class="detail-body"><div class="about-list"><p>\u8BB0\u5F55\u53EA\u5B58\u5728\u8FD9\u53F0\u624B\u673A\u7684\u6D4F\u89C8\u5668\u91CC\u3002\u6362\u4E00\u53F0\u8BBE\u5907\uFF0C\u6216\u6E05\u9664\u6D4F\u89C8\u5668\u6570\u636E\u540E\uFF0C\u5C31\u627E\u4E0D\u5230\u4E86\u3002</p><p>\u4F60\u5199\u4E0B\u7684\u6587\u5B57\u548C\u62CD\u7684\u7167\u7247\uFF0C\u4F1A\u53D1\u9001\u7ED9\u7B2C\u4E09\u65B9\u670D\u52A1\uFF0C\u7528\u6765\u8BC6\u522B\u5403\u4E86\u4EC0\u4E48\u3001\u5927\u7EA6\u591A\u5C11\u514B\u3002</p><p>\u98DF\u7269\u540D\u79F0\u4F1A\u7528\u4E8E\u5728\u8584\u8377\u5065\u5EB7\u67E5\u8BE2\u8425\u517B\u3002\u67E5\u4E0D\u5230\u7684\uFF0C\u5C31\u6807\u6210\u6682\u65F6\u7B97\u4E0D\u51FA\u6765\uFF0C\u4E0D\u4F1A\u7F16\u4E00\u4E2A\u6570\u5B57\u3002</p><p>\u9875\u9762\u4E0A\u7684\u300C\u7EA6 X \u5343\u5361\u300D\u662F\u4F30\u7B97\u3002</p><p>\u8FD9\u4E9B\u5185\u5BB9\u4E0D\u7528\u4E8E\u8BCA\u65AD\u6216\u6CBB\u7597\u3002\u8EAB\u4F53\u4E0D\u8212\u670D\u65F6\uFF0C\u8BF7\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9\u3002</p><p>\u70B9\u5F00\u98DF\u7269\u4E0A\u7684\u300C\u6570\u636E\u6765\u6E90\u300D\uFF0C\u53EF\u4EE5\u770B\u5230\u5B83\u6765\u81EA\u77E5\u517B\u98DF\u7269\u5E93\u8FD8\u662F\u8584\u8377\u5065\u5EB7\uFF0C\u4EE5\u53CA\u66F4\u7EC6\u7684\u7F16\u53F7\u3002</p></div><button class="primary-button full-button" data-close="detail">\u77E5\u9053\u4E86</button></div>`, "\u9690\u79C1\u4E0E\u8BF4\u660E");
}
async function toggleSave(key) {
  const was = state.saved.includes(key);
  await writeStore((s) => s.favorite(key));
  toast(was ? "\u5DF2\u53D6\u6D88\u6536\u85CF" : "\u5DF2\u6536\u85CF\uFF0C\u53EF\u5728\u201C\u6211\u7684\u201D\u67E5\u770B");
  document.querySelectorAll("[data-save]").forEach((b) => {
    if (b.dataset.save === key) b.innerHTML = icon("bookmark") + (was ? " \u6536\u85CF" : " \u5DF2\u6536\u85CF");
  });
}
function cancelRequest() {
  chatVersion++;
  requestController?.abort();
  requestController = null;
  chatBusy = false;
  document.querySelectorAll(".message.is-loading").forEach((el) => el.remove());
  const cancel = document.getElementById("chat-cancel");
  if (cancel) cancel.hidden = true;
  const submit = document.getElementById("chat-submit");
  if (submit) submit.disabled = false;
}
function newChat() {
  cancelRequest();
  history = [];
  pendingPlans.clear();
  activePlan = null;
  contentRef = null;
  urgentSession = false;
  document.getElementById("chat-content").innerHTML = "";
}
function openChat(query = "") {
  if (detail.open) detail.close();
  if (!document.getElementById("chat-messages")) {
    document.getElementById("chat-content").innerHTML = `<div class="chat-header"><span class="chat-avatar">${icon("spark")}</span><div><h2>\u77E5\u517B AI</h2><p>\u4E2D\u5F0F\u98DF\u517B \xB7 \u8D77\u5C45 \xB7 \u8EAB\u5FC3\u8C03\u517B</p></div><button class="icon-button" data-action="new-chat" aria-label="\u91CD\u65B0\u5F00\u59CB\u5BF9\u8BDD">${icon("book")}</button><button class="icon-button" data-close="chat" aria-label="\u5173\u95ED\u54A8\u8BE2">${icon("close")}</button></div><div class="chat-demo-note">\u6A21\u62DF\u4F53\u9A8C \xB7 \u771F\u5B9E\u6A21\u578B\u5C1A\u672A\u63A5\u5165</div><div class="chat-context">${activePlan ? `\u6B63\u5728\u8C03\u6574\uFF1A${esc(activePlan.title)} \xB7 \u4FEE\u8BA2 ${activePlan.revision}` : contentRef ? "\u5DF2\u9644\u5E26\u5F53\u524D\u5185\u5BB9\uFF0C\u65B9\u4FBF\u7EE7\u7EED\u8BA8\u8BBA" : "\u996E\u98DF\u504F\u597D\u6309\u9700\u4F7F\u7528\uFF0C\u6D4B\u8BC4\u539F\u59CB\u7B54\u6848\u4E0D\u4F1A\u81EA\u52A8\u53D1\u9001\u3002"}</div><div id="chat-messages" class="chat-messages" role="log" aria-label="\u54A8\u8BE2\u5BF9\u8BDD" aria-live="polite"><div class="welcome"><span>${icon("spark")}</span><h3>${activePlan ? "\u7EE7\u7EED\u5B8C\u5584\u8FD9\u4EFD\u65B9\u6848" : "\u4ECA\u5929\uFF0C\u60F3\u4ECE\u54EA\u91CC\u5F00\u59CB\uFF1F"}</h3><p>${activePlan ? activePlan.kind === "routine" ? "\u8BB0\u5F55\u4F60\u81EA\u5DF1\u9009\u62E9\u7684\u51C6\u5907\u65F6\u95F4\uFF1B\u4FDD\u5B58\u4F1A\u66F4\u65B0\u539F\u5B89\u6392\u3002" : "\u5F53\u524D\u53EF\u6F14\u793A\u628A\u9C7C\u7C7B\u642D\u914D\u6362\u4E3A\u8C46\u8150\uFF1B\u4FDD\u5B58\u4F1A\u66F4\u65B0\u539F\u65B9\u6848\u3002" : "\u6B22\u8FCE\u8BA8\u8BBA\u5404\u7C7B\u5065\u5EB7\u517B\u751F\u95EE\u9898\u3002<br>\u5F53\u524D\u5148\u4F53\u9A8C\u9884\u8BBE\u573A\u666F\uFF0C\u81EA\u7531\u95EE\u7B54\u7B49\u5F85\u6A21\u578B\u63A5\u5165\u3002"}</p><div class="welcome-grid">${(activePlan ? activePlan.kind === "routine" ? [["\u628A\u51C6\u5907\u65F6\u95F4\u6539\u4E3A22:30", "\u628A\u51C6\u5907\u65F6\u95F4\u6539\u4E3A22:30"]] : [["\u4E0D\u5403\u9C7C\uFF0C\u6362\u6210\u8C46\u8150", "\u4E0D\u5403\u9C7C\uFF0C\u6362\u6210\u8C46\u8150"]] : [["\u6211\u6700\u8FD1\u80D6\u4E86\uFF0C\u5E94\u8BE5\u600E\u4E48\u5403\uFF1F", "\u6211\u60F3\u5065\u5EB7\u51CF\u91CD"], ["\u60F3\u589E\u91CD\uFF0C\u4E09\u9910\u600E\u4E48\u5B89\u6392\uFF1F", "\u6211\u60F3\u5065\u5EB7\u589E\u91CD"], ["\u4E86\u89E3\u65E5\u5E38\u8336\u996E", "\u63A8\u8350\u4E00\u676F\u517B\u751F\u8336"], ["\u4F5C\u606F\u6709\u70B9\u4E71\uFF0C\u600E\u4E48\u8C03\u6574\uFF1F", "\u6211\u6700\u8FD1\u4F5C\u606F\u6709\u70B9\u4E71"]]).map(([t, q]) => `<button data-chat-send="${q}">${t} ${icon("arrow")}</button>`).join("")}</div></div></div><label class="chat-consent"><input id="use-profile" type="checkbox"> \u4F7F\u7528\u6211\u7684\u996E\u98DF\u76EE\u6807\u3001\u4E60\u60EF\u548C\u504F\u597D</label><form id="chat-form" class="chat-compose"><label class="sr-only" for="chat-input">\u8F93\u5165\u4F60\u60F3\u54A8\u8BE2\u7684\u95EE\u9898</label><textarea id="chat-input" maxlength="1500" rows="1" placeholder="\u804A\u804A\u996E\u98DF\u3001\u8D77\u5C45\uFF0C\u6216\u4F60\u60F3\u4E86\u89E3\u7684\u95EE\u9898"></textarea><button type="submit" aria-label="\u53D1\u9001\u54A8\u8BE2" id="chat-submit">${icon("arrow")}</button></form><div class="chat-footer-note">\u53D1\u9001\u4F1A\u5C06\u95EE\u9898\u4E0E\u5F53\u524D\u5BF9\u8BDD\u4EA4\u7ED9\u672C\u7F51\u7AD9\u670D\u52A1\u7AEF\u3002<button class="text-button" data-action="cancel-request" id="chat-cancel" hidden>\u53D6\u6D88\u672C\u6B21\u56DE\u590D</button></div>`;
  }
  chat.setAttribute("aria-label", "\u77E5\u517B AI \u6A21\u62DF\u54A8\u8BE2");
  if (!chat.open) chat.showModal();
  if (query) send(query);
  else if (matchMedia("(min-width:761px)").matches) document.getElementById("chat-input").focus();
}
function appendMessage(type, html) {
  const el = document.createElement("div");
  el.className = `message ${type}`;
  el.innerHTML = type === "assistant" ? `<span class="message-avatar">${icon("spark")}</span><div class="message-body">${html}</div>` : `<div class="user-bubble">${html}</div>`;
  document.getElementById("chat-messages").append(el);
  el.scrollIntoView({ block: "end", behavior: "instant" });
  return el;
}
async function send(text) {
  text = String(text).trim().slice(0, 1500);
  if (!text) return;
  if (chatBusy) cancelRequest();
  document.querySelector(".welcome")?.remove();
  document.getElementById("chat-input").value = "";
  appendMessage("user", esc(text));
  chatBusy = true;
  document.getElementById("chat-cancel").hidden = false;
  const loading = appendMessage("assistant", '<span class="typing"><i></i><i></i><i></i></span>');
  loading.classList.add("is-loading");
  const current = chatVersion, requestId = createId();
  requestController = new AbortController();
  const ownController = requestController;
  const timeout = setTimeout(() => ownController.abort(), 15e3);
  const profileContext = document.getElementById("use-profile").checked ? { goal: state.profile.goal, habit: state.profile.habit, preference: state.profile.preference } : {};
  const request = { requestId, message: text, history: history.slice(-16), safetyContext: { urgent: urgentSession || history.filter((h) => h.role === "user").some((h) => isExplicitUrgent(h.content)), sensitive: history.filter((h) => h.role === "user").some((h) => isSensitive(h.content)) }, profileContext, ...activePlan ? { activePlan: structuredClone(activePlan) } : {}, ...contentRef ? { contentRef } : {} };
  history.push({ role: "user", content: text });
  try {
    const reply = await getAgentReply(request, { signal: requestController.signal });
    if (current !== chatVersion) return;
    loading.remove();
    let content = `<p>${esc(reply.text).replace(/\n/g, "<br>")}</p>`;
    if (reply.mode === "urgent_help") {
      urgentSession = true;
      pendingPlans.clear();
      document.querySelectorAll(".chat-plan,.chat-recipes,.chat-choices,.message [data-save-plan]").forEach((el) => el.remove());
      content = `<div class="urgent-help" role="alert"><strong>\u8BF7\u7ACB\u5373\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9</strong>${content}</div>`;
    }
    if (reply.planDraft && !urgentSession) {
      const plan = reply.planDraft;
      pendingPlans.set(plan.id, plan);
      content += `<div class="chat-plan"><span class="tag">\u642D\u914D\u793A\u4F8B \xB7 \u5185\u5BB9\u5F85\u5BA1\u6838</span><h3>${esc(plan.title)}</h3><dl>${plan.meals.map((m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join("")}</dl><p class="small muted">${esc(plan.note)}</p><button class="primary-button" data-save-plan="${esc(plan.id)}">${icon("bookmark")} ${plan.baseRevision ? "\u4FDD\u5B58\u5BF9\u539F\u65B9\u6848\u7684\u8C03\u6574" : "\u4FDD\u5B58\u5230\u6211\u7684\u65B9\u6848"}</button></div>`;
    }
    if (reply.contentRefs.length && !urgentSession) content += `<div class="chat-recipes">${reply.contentRefs.filter((ref) => ref.type === "recipe").map(({ id }) => {
      const r = recipes.find((x) => x.id === id);
      return `<button data-chat-recipe="${r.id}">${r.image ? `<img src="${r.image}" alt="${r.title}\u793A\u610F">` : `<span class="chat-recipe-icon">${icon("bowl")}</span>`}<span><strong>${r.title}</strong><small>\u5185\u5BB9\u793A\u4F8B \xB7 \u67E5\u770B\u9002\u7528\u8BF4\u660E</small></span>${icon("arrow")}</button>`;
    }).join("")}</div>`;
    if (reply.followUpQuestions.length && !urgentSession) content += `<div class="chat-choices">${reply.followUpQuestions.map((q) => `<button data-chat-send="${esc(q)}">${esc(q)}</button>`).join("")}</div>`;
    appendMessage("assistant", content);
    history.push({ role: "assistant", content: reply.text });
  } catch (error) {
    if (current === chatVersion) {
      loading.remove();
      appendMessage("assistant", `<p>${esc(error.name === "AbortError" ? "\u56DE\u590D\u8D85\u65F6\uFF0C\u5C1A\u672A\u4FDD\u5B58\u4EFB\u4F55\u65B9\u6848\u3002" : error.message || "\u8FD9\u6B21\u56DE\u590D\u672A\u5B8C\u6210\u3002")}</p><button class="outline-button" data-chat-send="${esc(text)}">\u91CD\u8BD5\u8FD9\u6B21\u54A8\u8BE2</button>`);
      document.getElementById("chat-input").value = text;
    }
  } finally {
    clearTimeout(timeout);
    if (current === chatVersion) {
      chatBusy = false;
      requestController = null;
      document.getElementById("chat-cancel").hidden = true;
      document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
    }
  }
}
async function savePlan(id) {
  if (urgentSession) return;
  const p = pendingPlans.get(id);
  if (!p) return;
  const saved = await writeStore((s) => s.plan(p));
  pendingPlans.delete(id);
  if (activePlan?.id === id) activePlan = saved;
  document.querySelectorAll("[data-save-plan]").forEach((b) => {
    if (b.dataset.savePlan === id) {
      b.innerHTML = icon("check") + " \u5DF2\u4FDD\u5B58";
      b.disabled = true;
    }
  });
  toast("\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u5728\u201C\u6211\u7684\u65B9\u6848\u201D\u4E2D\u7EE7\u7EED\u8C03\u6574");
}
document.addEventListener("click", async (e) => {
  const b = e.target.closest("button,a.brand,a.topbar-brand");
  if (!b) return;
  const d = b.dataset;
  if (await assessment.action(b)) return;
  try {
    if (await dietPages.onClick(b)) return;
    if (b.classList.contains("brand") || b.classList.contains("topbar-brand")) {
      e.preventDefault();
      navigate("home");
    } else if (d.page) navigate(d.page);
    else if (b.hasAttribute("data-chat")) {
      if (activePlan || contentRef) newChat();
      openChat(d.chat);
    } else if (d.foodTab) {
      foodTab = d.foodTab;
      navigate("food");
    } else if (d.careTab) {
      careTab = d.careTab;
      render();
    } else if (d.homeMode) {
      homeMode = d.homeMode;
      render();
    } else if (d.day) {
      day = d.day;
      render();
    } else if (d.recipe) recipeDetail(d.recipe);
    else if (d.topic) topicDetail(d.topic);
    else if (d.article) articleDetail(d.article);
    else if (d.lifestyle) lifestyleDetail();
    else if (d.close) (d.close === "chat" ? chat : detail).close();
    else if (d.detailChat) {
      newChat();
      contentRef = d.refId ? { type: d.refType, id: d.refId } : null;
      openChat(d.detailChat);
    } else if (d.chatSend) await send(d.chatSend);
    else if (d.chatRecipe) {
      chat.close();
      recipeDetail(d.chatRecipe);
    } else if (d.save) await toggleSave(d.save);
    else if (d.savePlan) {
      b.disabled = true;
      try {
        await savePlan(d.savePlan);
      } catch (error) {
        b.disabled = false;
        throw error;
      }
    } else if (d.adjustPlan) {
      await refreshState();
      const plan = state.plans.find((p) => p.id === d.adjustPlan);
      if (!plan) throw new Error("\u8FD9\u4EFD\u65B9\u6848\u5DF2\u88AB\u5220\u9664");
      newChat();
      activePlan = structuredClone(plan);
      openChat();
    } else if (d.removePlan) {
      await writeStore((s) => s.removePlan(d.removePlan));
      toast("\u5DF2\u79FB\u9664\u8FD9\u4EFD\u65B9\u6848");
    } else if (d.viewAssessment) {
      const record = state.assessments.find((r) => r.id === d.viewAssessment);
      if (record) assessment.view(record);
    } else if (d.deleteAssessment) {
      await writeStore((s) => s.removeAssessment(d.deleteAssessment));
      toast("\u5DF2\u5220\u9664\u8FD9\u4EFD\u611F\u53D7\u8BB0\u5F55");
    } else if (d.action) {
      switch (d.action) {
        case "about":
        case "privacy":
          about();
          break;
        case "ack-privacy":
          try {
            localStorage.setItem("zhiyang-privacy-ack", "1");
          } catch {
          }
          document.getElementById("first-run").hidden = true;
          break;
        case "edit-profile":
          editProfile();
          break;
        case "constitutions":
          constitutionList();
          break;
        case "quiz":
          await assessment.open();
          break;
        case "new-chat":
          newChat();
          openChat();
          break;
        case "cancel-request":
          cancelRequest();
          appendMessage("assistant", "<p>\u5DF2\u53D6\u6D88\u672C\u6B21\u56DE\u590D\uFF0C\u5C1A\u672A\u4FDD\u5B58\u65B9\u6848\u3002</p>");
          break;
        case "retry-storage":
          await bootStorage();
          break;
        case "reset":
          openDetail('<div class="detail-body"><h2>\u6E05\u9664\u672C\u673A\u8BB0\u5F55\uFF1F</h2><p class="detail-lead">\u5C06\u6E05\u9664\u8FD9\u53F0\u624B\u673A\u4E0A\u7684\u996E\u98DF\u8BB0\u5F55\u548C\u6BCF\u65E5\u76EE\u6807\u3002\u6E05\u9664\u540E\u627E\u4E0D\u56DE\u6765\u3002</p><div class="button-row"><button class="outline-button" data-close="detail">\u5148\u4FDD\u7559</button><button class="primary-button" data-action="confirm-reset">\u786E\u8BA4\u6E05\u9664</button></div></div>', "\u6E05\u9664\u672C\u673A\u8BB0\u5F55");
          break;
        case "confirm-reset": {
          if (!storage) throw new Error("\u672C\u673A\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u786E\u8BA4\u5DF2\u6E05\u9664");
          b.disabled = true;
          clearing = true;
          dataEpoch++;
          newChat();
          await assessment.reset();
          try {
            await writeQueue.catch(() => {
            });
            await storage.clear();
            state = emptyState();
            detail.close();
            navigate("profile");
            toast("\u8FD9\u53F0\u624B\u673A\u4E0A\u7684\u8BB0\u5F55\u5DF2\u6E05\u9664");
          } finally {
            clearing = false;
            b.disabled = false;
          }
          break;
        }
      }
    }
  } catch (error) {
    toast(friendlyMessage(error.message, "\u8FD9\u6B21\u6CA1\u6709\u5B8C\u6210\uFF0C\u8BF7\u518D\u8BD5\u4E00\u6B21"));
  }
});
document.addEventListener("submit", async (e) => {
  try {
    if (await dietPages.onSubmit(e)) return;
  } catch (error) {
    toast(error.message || "\u6CA1\u6709\u4FDD\u5B58");
    return;
  }
  if (e.target.id === "profile-form") {
    e.preventDefault();
    const form = e.target, button = form.querySelector("[type=submit]"), f = new FormData(form);
    button.disabled = true;
    try {
      await writeStore((s) => s.profile({ name: String(f.get("name")).trim() || "\u4F53\u9A8C\u7528\u6237", goal: String(f.get("goal")), habit: String(f.get("habit")), preference: String(f.get("preference")), updated: (/* @__PURE__ */ new Date()).toISOString() }));
      detail.close();
      toast("\u6863\u6848\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u5728\u54A8\u8BE2\u65F6\u9009\u62E9\u4F7F\u7528\u996E\u98DF\u504F\u597D");
    } catch (error) {
      toast(error.message || "\u4FDD\u5B58\u5931\u8D25\uFF0C\u8F93\u5165\u4ECD\u4FDD\u7559");
    } finally {
      button.disabled = false;
    }
  } else if (e.target.id === "chat-form") {
    e.preventDefault();
    send(document.getElementById("chat-input").value);
  }
});
chat.addEventListener("close", cancelRequest);
document.addEventListener("keydown", (e) => {
  if (e.target.id === "chat-input" && e.key === "Enter" && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    send(e.target.value);
  }
});
for (const dialog of [detail, chat]) dialog.addEventListener("click", (e) => {
  if (e.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});
var width = innerWidth;
window.addEventListener("resize", () => {
  if (width <= 760 !== innerWidth <= 760) {
    document.querySelector(".topbar-label").textContent = "\u77E5\u517B";
  }
  width = innerWidth;
});
page = ["home", "today", "library", "profile"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
render();
try {
  if (!localStorage.getItem("zhiyang-privacy-ack")) document.getElementById("first-run").hidden = false;
} catch {
}
historyAPI(true);
await bootStorage();
var context = document.modelContext;
if (context?.registerTool) {
  const life = new AbortController();
  const tools = [{ name: "get_wellness_demo_overview", title: "\u8BFB\u53D6\u5F53\u524D\u9875\u9762\u6982\u89C8", description: "Read the current page and counts of saved plans and content. Does not expose chat or personal profile data.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length) throw new Error("Expected an empty object");
    return { page, mode: "mock", savedPlans: state.plans.length, savedItems: state.saved.length };
  } }, { name: "navigate_wellness_demo", title: "\u5207\u6362\u9875\u9762", description: "Navigate to an existing page. Does not send a message, assess health, or save a plan.", inputSchema: { type: "object", properties: { page: { type: "string", enum: ["home", "today", "library", "food", "care", "profile"] } }, required: ["page"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) {
    if (!input || Object.keys(input).length !== 1 || !["home", "today", "library", "food", "care", "profile"].includes(input.page)) throw new Error("Invalid page");
    navigate(input.page);
    return { page };
  } }];
  for (const tool of tools) {
    try {
      Promise.resolve(context.registerTool(tool, { signal: life.signal })).catch(() => {
      });
    } catch {
    }
  }
  window.addEventListener("pagehide", () => life.abort(), { once: true });
}
