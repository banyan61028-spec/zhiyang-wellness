// src/client/data.js
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

// src/shared/records.js
function validatePlan(plan) {
  if (!plan || typeof plan.id !== "string" || !plan.id || plan.id.length > 100 || !Number.isInteger(plan.revision) || plan.revision < 1 || typeof plan.title !== "string" || plan.title.length > 150 || typeof plan.goal !== "string" || typeof plan.note !== "string" || !Array.isArray(plan.meals) || !plan.meals.length || plan.meals.length > 12 || plan.meals.some((m) => !m || typeof m.label !== "string" || typeof m.value !== "string" || m.value.length > 500) || plan.provenance !== "demo") throw new Error("\u65B9\u6848\u6570\u636E\u4E0D\u5B8C\u6574");
  return plan;
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
function validateReply(reply2, requestId) {
  if (!reply2 || reply2.requestId !== requestId || !["answer", "clarify", "professional_help", "urgent_help", "unavailable"].includes(reply2.mode) || typeof reply2.text !== "string" || reply2.text.length > 6e3 || !Array.isArray(reply2.contentRefs) || !Array.isArray(reply2.followUpQuestions) || reply2.followUpQuestions.some((q) => typeof q !== "string" || q.length > 200) || !Array.isArray(reply2.sources) || reply2.ruleVersion !== ruleVersion) throw new Error("\u56DE\u590D\u683C\u5F0F\u6821\u9A8C\u672A\u901A\u8FC7");
  if (reply2.mode !== "answer" && (Object.hasOwn(reply2, "planDraft") || reply2.contentRefs.length)) throw new Error("\u6B64\u7C7B\u56DE\u590D\u7981\u6B62\u9644\u5E26\u65B9\u6848");
  if (reply2.mode === "urgent_help" && (reply2.followUpQuestions.length || reply2.sources.length || reply2.text !== urgentText)) throw new Error("\u7D27\u6025\u6C42\u52A9\u56DE\u590D\u672A\u901A\u8FC7\u6821\u9A8C");
  return reply2;
}

// rules/herbs.js
var herbRuleVersion = "zy-herb-blocks-v0.1";
var herbRules = [
  ["HB01", ["\u7518\u8349"], ["\u7518\u9042", "\u5927\u621F", "\u82AB\u82B1", "\u6D77\u85FB"]],
  ["HB02", ["\u5DDD\u4E4C", "\u8349\u4E4C", "\u9644\u5B50"], ["\u5DDD\u8D1D\u6BCD", "\u6D59\u8D1D\u6BCD", "\u5E73\u8D1D\u6BCD", "\u4F0A\u8D1D\u6BCD", "\u6E56\u5317\u8D1D\u6BCD", "\u74DC\u848C", "\u74DC\u848C\u5B50", "\u74DC\u848C\u76AE", "\u5929\u82B1\u7C89", "\u534A\u590F", "\u767D\u8539", "\u767D\u53CA"]],
  ["HB03", ["\u85DC\u82A6"], ["\u4EBA\u53C2", "\u4E39\u53C2", "\u6C99\u53C2", "\u7384\u53C2", "\u82E6\u53C2", "\u7EC6\u8F9B", "\u767D\u828D", "\u8D64\u828D"]],
  ["HB04", ["\u786B\u9EC4"], ["\u6734\u785D"]],
  ["HB05", ["\u6C34\u94F6"], ["\u7812\u971C"]],
  ["HB06", ["\u72FC\u6BD2"], ["\u5BC6\u9640\u50E7"]],
  ["HB07", ["\u5DF4\u8C46"], ["\u7275\u725B"]],
  ["HB08", ["\u4E01\u9999"], ["\u90C1\u91D1"]],
  ["HB09", ["\u5DDD\u4E4C", "\u8349\u4E4C"], ["\u7280\u89D2"]],
  ["HB10", ["\u7259\u785D"], ["\u4E09\u68F1"]],
  ["HB11", ["\u5B98\u6842"], ["\u77F3\u8102"]],
  ["HB12", ["\u4EBA\u53C2"], ["\u4E94\u7075\u8102"]]
].map(([id, left, right]) => ({ id, left, right, source: "S17", reviewStatus: "pending" }));
var known = new Set(herbRules.flatMap((r) => [...r.left, ...r.right]));
function checkHerbs({ ingredients = [], currentIngredients = [], identitiesComplete = false } = {}) {
  const all = [...ingredients, ...currentIngredients];
  const conflicts = herbRules.filter((r) => all.some((h) => r.left.includes(h)) && all.some((h) => r.right.includes(h))).map((r) => r.id);
  if (conflicts.length) return { status: "blocked", conflicts, ruleVersion: herbRuleVersion };
  return { status: "unverified", unknown: all.filter((h) => !known.has(h)), identitiesComplete, conflicts: [], ruleVersion: herbRuleVersion };
}

// src/server/agent.js
var reply = (requestId, mode, text, extra = {}) => ({ requestId, mode, text, followUpQuestions: [], contentRefs: [], sources: [], ruleVersion, demo: true, ...extra });
var personalUnavailable = (id) => reply(id, "professional_help", "\u8FD9\u7C7B\u60C5\u51B5\u9700\u8981\u7ED3\u5408\u4E2A\u4EBA\u72B6\u51B5\u3001\u7528\u836F\u548C\u4E13\u4E1A\u8BC4\u4F30\u3002\u672C\u6F14\u793A\u4E0D\u63D0\u4F9B\u4E2A\u4F53\u8336\u65B9\u3001\u836F\u6750\u7528\u91CF\u6216\u6CBB\u7597\u6027\u996E\u98DF\uFF0C\u4E5F\u4E0D\u5EFA\u8BAE\u81EA\u884C\u66F4\u6539\u836F\u7269\u3002\u8BF7\u5411\u533B\u751F\u3001\u836F\u5E08\u6216\u8425\u517B\u4E13\u4E1A\u4EBA\u5458\u786E\u8BA4\u9002\u7528\u7684\u751F\u6D3B\u8C03\u6574\u3002\u4F60\u4ECD\u53EF\u8BE2\u95EE\u4E00\u822C\u98DF\u517B\u77E5\u8BC6\u3002");
var selectedSource = { id: "demo-nutrition-2024", title: "\u4E2D\u56FD\u516C\u6C11\u5065\u5EB7\u7D20\u517B\uFF082024 \u5E74\u7248\uFF09", url: "https://www.nhc.gov.cn/xcs/c100123/202405/73a4927142f34152abed875634a3c13b.shtml" };
var knownNames = [...new Set(herbRules.flatMap((r) => [...r.left, ...r.right]))].sort((a, b) => b.length - a.length);
function validateRequest(body) {
  if (!body || typeof body !== "object" || typeof body.requestId !== "string" || !/^[\w-]{1,100}$/.test(body.requestId) || typeof body.message !== "string" || !body.message.trim() || body.message.length > 1500 || !Array.isArray(body.history) || body.history.length > 16 || body.history.some((m) => !m || !["user", "assistant"].includes(m.role) || typeof m.content !== "string" || m.content.length > 6e3)) throw new Error("\u8BF7\u6C42\u683C\u5F0F\u65E0\u6548");
  if (body.activePlan) validatePlan(body.activePlan);
  if (body.profileContext && ["goal", "habit", "preference"].some((k) => body.profileContext[k] != null && (typeof body.profileContext[k] !== "string" || body.profileContext[k].length > 80))) throw new Error("\u6863\u6848\u6458\u8981\u65E0\u6548");
  if (body.contentRef) {
    const list = { recipe: recipes, topic: topics, article: articles }[body.contentRef.type];
    if (!list?.some((r) => r.id === body.contentRef.id)) throw new Error("\u5173\u8054\u5185\u5BB9\u4E0D\u5B58\u5728");
  }
  return { requestId: body.requestId, message: body.message.trim(), history: body.history, profileContext: body.profileContext || {}, activePlan: body.activePlan, contentRef: body.contentRef, safetyContext: { urgent: body.safetyContext?.urgent === true, sensitive: body.safetyContext?.sensitive === true } };
}
function planExample(request, gain = false) {
  const noFish = request.profileContext.preference === "\u4E0D\u559C\u6B22\u5403\u9C7C";
  const lunch = noFish ? recipes.find((r) => r.id === "dinner") : recipes.find((r) => r.id === "lunch");
  return { id: crypto.randomUUID(), revision: 1, baseRevision: null, provenance: "demo", reviewStatus: "pending", goal: gain ? "\u5065\u5EB7\u589E\u91CD" : request.profileContext.goal || "\u5747\u8861\u996E\u98DF", title: gain ? "\u4E09\u9910\u4E0E\u52A0\u9910\u642D\u914D\u793A\u4F8B" : "\u5BB6\u5E38\u4E09\u9910\u642D\u914D\u793A\u4F8B", meals: [
    { label: "\u65E9\u9910", value: recipes[0].title, recipeId: "breakfast" },
    { label: "\u5348\u9910", value: lunch.title, recipeId: lunch.id },
    { label: "\u665A\u9910", value: recipes[2].title, recipeId: "dinner" },
    ...gain ? [{ label: "\u52A0\u9910", value: recipes[4].title, recipeId: "oats" }] : []
  ], note: "\u4EC5\u4F53\u9A8C\u65B9\u6848\u4FDD\u5B58\u548C\u8C03\u6574\uFF0C\u4E0D\u662F\u9488\u5BF9\u8EAB\u4F53\u60C5\u51B5\u751F\u6210\u7684\u5EFA\u8BAE\uFF1B\u672A\u8BA1\u7B97\u80FD\u91CF\u3001\u4EFD\u91CF\u6216\u533B\u7597\u9002\u7528\u6027\u3002" };
}
function runDemoAgent(raw) {
  const req = validateRequest(raw), { requestId: id, message, history } = req;
  const users = [...history.filter((h) => h.role === "user").map((h) => h.content), message];
  if (req.safetyContext.urgent || users.some(isExplicitUrgent)) return urgentResponse(id);
  const context = users.join("\u3002");
  const education = /什么是|科普|解释|是什么/.test(message) && !/我.{0,10}(怎么|能不能|可以|适合)|给我|用量|配方/.test(message);
  if (education) return reply(id, "answer", /十八反|十九畏/.test(message) ? "\u201C\u5341\u516B\u53CD\u3001\u5341\u4E5D\u754F\u201D\u662F\u4F20\u7EDF\u4E2D\u836F\u914D\u4F0D\u7981\u5FCC\u7684\u5F52\u7EB3\u3002\u672C\u4EA7\u54C1\u5C06\u5176\u4F5C\u4E3A\u7981\u914D\u68C0\u67E5\u7684\u4E00\u90E8\u5206\uFF0C\u8FD8\u9700\u8981\u6838\u5BF9\u539F\u6599\u8EAB\u4EFD\u3001\u73B0\u7528\u836F\u3001\u7279\u6B8A\u4EBA\u7FA4\u548C\u8BC1\u636E\u3002\u672A\u547D\u4E2D\u67D0\u7EC4\u7981\u5FCC\u4E0D\u7B49\u4E8E\u5B89\u5168\uFF0C\u4E5F\u4E0D\u636E\u6B64\u63D0\u4F9B\u81EA\u884C\u914D\u836F\u65B9\u6848\u3002" : "\u5065\u5EB7\u517B\u751F\u54A8\u8BE2\u53EF\u4EE5\u5E2E\u52A9\u7406\u89E3\u4E00\u822C\u98DF\u7269\u642D\u914D\u548C\u751F\u6D3B\u4E60\u60EF\uFF1B\u4F53\u8D28\u7C7B\u578B\u4E0D\u80FD\u51ED\u4E00\u4E2A\u75C7\u72B6\u6216\u672A\u7ECF\u9A8C\u8BC1\u7684\u95EE\u5377\u786E\u5B9A\u3002\u5F53\u524D\u662F\u9884\u8BBE\u6F14\u793A\uFF0C\u5C1A\u4E0D\u80FD\u68C0\u7D22\u548C\u56DE\u7B54\u4EFB\u610F\u4E13\u4E1A\u77E5\u8BC6\u3002");
  if (req.safetyContext.sensitive || isSensitive(context)) return personalUnavailable(id);
  const names = knownNames.filter((name) => context.includes(name));
  const herbs = checkHerbs({ ingredients: names });
  if (herbs.status === "blocked") return reply(id, "professional_help", "\u4F60\u63D0\u5230\u7684\u539F\u6599\u89E6\u53D1\u4E86\u672C\u4EA7\u54C1\u7684\u4E2D\u836F\u914D\u4F0D\u7981\u5FCC\u89C4\u5219\uFF0C\u672C\u52A9\u624B\u4E0D\u63D0\u4F9B\u8BE5\u642D\u914D\u6216\u53D8\u901A\u7528\u6CD5\u3002\u8BF7\u643A\u5E26\u5B8C\u6574\u539F\u6599\u548C\u7528\u836F\u4FE1\u606F\u54A8\u8BE2\u533B\u751F\u6216\u836F\u5E08\uFF1B\u7528\u91CF\u5C11\u3001\u9519\u5F00\u65F6\u95F4\u6216\u81EA\u884C\u627F\u62C5\u98CE\u9669\u90FD\u4E0D\u89E3\u9664\u6B64\u9650\u5236\u3002");
  if (/中药|药材|配方|十八反|十九畏|克数|几克|剂量|处方|停药|减药/.test(context) || names.length) return personalUnavailable(id);
  if (/暴瘦|只喝茶|不吃饭|绝食|催吐/.test(context)) return reply(id, "clarify", "\u4E0D\u63D0\u4F9B\u6781\u7AEF\u9650\u5236\u996E\u98DF\u3001\u53EA\u559D\u8336\u4EE3\u66FF\u6B63\u9910\u6216\u5FEB\u901F\u66B4\u7626\u7684\u8BA1\u5212\u3002\u53EF\u4EE5\u91CD\u65B0\u8BF4\u660E\u5E0C\u671B\u6539\u5584\u7684\u65E5\u5E38\u996E\u98DF\u4E60\u60EF\uFF1B\u5F53\u524D\u6F14\u793A\u4E5F\u4E0D\u8BA1\u7B97\u4E2A\u4EBA\u51CF\u91CD\u76EE\u6807\u3002");
  if (/头痛|头疼|肚子痛|不舒服|便秘|嗓子|咽喉|湿气|浮肿/.test(context)) return reply(id, "clarify", "\u6211\u7406\u89E3\u4F60\u60F3\u4ECE\u98DF\u517B\u4E0E\u751F\u6D3B\u4E60\u60EF\u89D2\u5EA6\u4E86\u89E3\u8FD9\u4E2A\u611F\u53D7\u3002\u901A\u5E38\u9700\u8981\u5148\u6F84\u6E05\u53D1\u751F\u65F6\u95F4\u3001\u662F\u5426\u6301\u7EED\u6216\u52A0\u91CD\uFF0C\u4EE5\u53CA\u76F8\u5173\u5065\u5EB7\u80CC\u666F\uFF1B\u4E0D\u80FD\u76F4\u63A5\u636E\u6B64\u63A8\u8350\u8336\u65B9\u3002\u5F53\u524D\u662F\u89C4\u5219\u6F14\u793A\uFF0C\u65E0\u6CD5\u5B8C\u6210\u4E2A\u4EBA\u8BC4\u4F30\u3002\u660E\u663E\u3001\u6301\u7EED\u6216\u52A0\u91CD\u7684\u4E0D\u9002\uFF0C\u8BF7\u54A8\u8BE2\u533B\u751F\u3002");
  if (req.contentRef && !/生成三餐示例|生成增重示例/.test(message)) {
    const item = { recipe: recipes, topic: topics, article: articles }[req.contentRef.type].find((r) => r.id === req.contentRef.id);
    return reply(id, "answer", `\u6B63\u5728\u8BA8\u8BBA\u300A${item.title}\u300B\u3002${item.note || item.boundary || item.intro} \u5F53\u524D\u53EF\u6D4F\u89C8\u5185\u5BB9\u548C\u4FDD\u5B58\u6536\u85CF\uFF0C\u7ED3\u5408\u4E2A\u4EBA\u5065\u5EB7\u80CC\u666F\u7684\u81EA\u7531\u89E3\u7B54\u7B49\u5F85\u771F\u5B9E\u6A21\u578B\u63A5\u5165\u3002`, { contentRefs: [req.contentRef] });
  }
  if (req.activePlan) {
    if (req.activePlan.kind === "routine") {
      const original = req.activePlan;
      const valid = original.meals.length === 3 && original.meals[0].value === lifestyle.points[0] && original.meals[2].value === lifestyle.points[1] && /^(按自己的作息安排|(?:[01]\d|2[0-3]):[0-5]\d)$/.test(original.meals[1].value);
      if (!valid) return reply(id, "unavailable", "\u8FD9\u4EFD\u8D77\u5C45\u8BB0\u5F55\u6682\u4E0D\u652F\u6301\u81EA\u52A8\u8C03\u6574\uFF0C\u8BF7\u4ECE\u5F53\u524D\u793A\u4F8B\u91CD\u65B0\u5EFA\u7ACB\u3002");
      const time = message.match(/(?:改为|改到)\s*((?:[01]\d|2[0-3]):[0-5]\d)/)?.[1];
      if (!time) return reply(id, "clarify", "\u53EF\u4EE5\u628A\u51C6\u5907\u65F6\u95F4\u6362\u6210\u4F60\u81EA\u5DF1\u9009\u7684\u65F6\u95F4\uFF0C\u4F8B\u5982\u201C\u628A\u51C6\u5907\u65F6\u95F4\u6539\u4E3A22:30\u201D\u3002\u8FD9\u662F\u4E2A\u4EBA\u65E5\u7A0B\u8BB0\u5F55\uFF0C\u4E0D\u4EE3\u8868\u9002\u5408\u6240\u6709\u4EBA\u7684\u7761\u7720\u5EFA\u8BAE\u3002", { followUpQuestions: ["\u628A\u51C6\u5907\u65F6\u95F4\u6539\u4E3A22:30"] });
      const planDraft = { ...structuredClone(original), baseRevision: original.revision };
      planDraft.meals[1].value = time;
      return reply(id, "answer", "\u5DF2\u8BB0\u5F55\u4F60\u9009\u62E9\u7684\u51C6\u5907\u65F6\u95F4\uFF0C\u5176\u4ED6\u5B89\u6392\u4FDD\u6301\u539F\u6837\u3002\u4FDD\u5B58\u540E\u66F4\u65B0\u8FD9\u4EFD\u8D77\u5C45\u8BB0\u5F55\u3002", { planDraft });
    }
    const supported = req.activePlan.meals.every((m) => recipes.some((r) => r.id === m.recipeId && r.title === m.value));
    if (!supported) return reply(id, "unavailable", "\u8FD9\u4EFD\u65E7\u7248\u6216\u975E\u6807\u51C6\u793A\u4F8B\u65B9\u6848\u6682\u4E0D\u652F\u6301\u81EA\u52A8\u8C03\u6574\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u56DE\u770B\u3002\u8BF7\u4ECE\u5F53\u524D\u4E09\u9910\u793A\u4F8B\u65B0\u5EFA\u4E00\u4EFD\u65B9\u6848\u4F53\u9A8C\uFF1B\u539F\u8BB0\u5F55\u4F1A\u4FDD\u7559\u3002");
    if (/换掉鱼|不吃鱼|不喜欢.*鱼|不要鱼|改成豆腐/.test(message)) {
      const draft = structuredClone(req.activePlan);
      draft.baseRevision = draft.revision;
      draft.meals = draft.meals.map((m) => m.recipeId === "lunch" || /鱼/.test(m.value) ? { ...m, value: recipes[2].title, recipeId: "dinner" } : m);
      if (JSON.stringify(draft.meals) === JSON.stringify(req.activePlan.meals)) return reply(id, "clarify", "\u8FD9\u4EFD\u65B9\u6848\u91CC\u5DF2\u7ECF\u6CA1\u6709\u9C7C\u7C7B\u642D\u914D\u3002\u5F53\u524D\u53EF\u6F14\u793A\u5C06\u9C7C\u6362\u6210\u8C46\u8150\uFF1B\u5176\u4ED6\u81EA\u7531\u8C03\u6574\u5F85\u63A5\u5165\u771F\u5B9E\u6A21\u578B\u540E\u652F\u6301\u3002");
      return reply(id, "answer", "\u5DF2\u5728\u4F60\u6253\u5F00\u7684\u8FD9\u4EFD\u65B9\u6848\u4E0A\uFF0C\u628A\u9C7C\u7C7B\u642D\u914D\u6362\u6210\u8C46\u8150\u793A\u4F8B\u3002\u4FDD\u5B58\u540E\u66F4\u65B0\u540C\u4E00\u4EFD\u65B9\u6848\uFF0C\u5176\u4ED6\u9910\u6B21\u4FDD\u7559\u3002", { planDraft: draft, contentRefs: [...new Set(draft.meals.map((m) => m.recipeId).filter(Boolean))].map((id2) => ({ type: "recipe", id: id2 })), sources: [selectedSource] });
    }
    return reply(id, "clarify", "\u6B63\u5728\u8C03\u6574\u4F60\u6253\u5F00\u7684\u65B9\u6848\u3002\u5F53\u524D\u53EF\u4F53\u9A8C\u201C\u4E0D\u5403\u9C7C\uFF0C\u6362\u6210\u8C46\u8150\u201D\uFF1B\u4EFB\u610F\u9700\u6C42\u8C03\u6574\u8981\u7B49\u771F\u5B9E\u6A21\u578B\u63A5\u5165\u3002", { followUpQuestions: ["\u4E0D\u5403\u9C7C\uFF0C\u6362\u6210\u8C46\u8150"] });
  }
  if (/生成作息示例/.test(message)) return reply(id, "answer", "\u53EF\u4EE5\u5148\u4FDD\u5B58\u4E00\u4EFD\u8D77\u5C45\u5B89\u6392\u793A\u4F8B\uFF0C\u518D\u4ECE\u201C\u6211\u7684\u65B9\u6848\u201D\u8BB0\u5F55\u81EA\u5DF1\u9009\u62E9\u7684\u51C6\u5907\u65F6\u95F4\u3002\u6301\u7EED\u7684\u7761\u7720\u56F0\u6270\u9700\u8981\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9\u3002", { planDraft: { id: crypto.randomUUID(), revision: 1, baseRevision: null, kind: "routine", provenance: "demo", reviewStatus: "pending", goal: "\u89C4\u5F8B\u4F5C\u606F", title: "\u665A\u95F4\u6536\u5C3E\u5B89\u6392\u793A\u4F8B", meals: [{ label: "\u7559\u51FA\u7A7A\u95F4", value: lifestyle.points[0] }, { label: "\u51C6\u5907\u65F6\u95F4", value: "\u6309\u81EA\u5DF1\u7684\u4F5C\u606F\u5B89\u6392" }, { label: "\u653E\u4E0B\u5F85\u529E", value: lifestyle.points[1] }], note: "\u65E5\u7A0B\u8BB0\u5F55\u793A\u4F8B\uFF0C\u4E0D\u8BC4\u4F30\u6216\u6CBB\u7597\u7761\u7720\u95EE\u9898\u3002\u8BF7\u6309\u771F\u5B9E\u4F5C\u606F\u8C03\u6574\u3002" } });
  if (/生成三餐示例|生成增重示例/.test(message)) {
    const plan = planExample(req, /增重/.test(message));
    return reply(id, "answer", "\u8FD9\u662F\u7528\u4E8E\u4F53\u9A8C\u4EA7\u54C1\u6D41\u7A0B\u7684\u9884\u8BBE\u642D\u914D\uFF0C\u5DF2\u6CBF\u7528\u4F60\u5141\u8BB8\u4F7F\u7528\u7684\u996E\u98DF\u504F\u597D\u3002\u53EF\u4EE5\u4FDD\u5B58\uFF0C\u518D\u4ECE\u201C\u6211\u7684\u65B9\u6848\u201D\u7EE7\u7EED\u8C03\u6574\u3002", { planDraft: plan, contentRefs: [...new Set(plan.meals.map((m) => m.recipeId))].map((id2) => ({ type: "recipe", id: id2 })), sources: [selectedSource] });
  }
  if (/三餐|减重|减肥|胖了|增重|增肥|怎么吃/.test(message)) return reply(id, "clarify", "\u53EF\u4EE5\u5148\u804A\u4F60\u7684\u996E\u98DF\u76EE\u6807\u548C\u7528\u9910\u4E60\u60EF\u3002\u5F53\u524D\u5C1A\u672A\u63A5\u5165\u771F\u5B9E\u6A21\u578B\uFF0C\u4F60\u53EF\u4EE5\u5148\u4F53\u9A8C\u4E00\u4EFD\u9884\u8BBE\u4E09\u9910\u793A\u4F8B\u7684\u4FDD\u5B58\u4E0E\u8C03\u6574\uFF1B\u5B83\u4E0D\u4F1A\u6839\u636E\u5065\u5EB7\u95EE\u9898\u7ED9\u51FA\u4E2A\u4EBA\u996E\u98DF\u5904\u65B9\u3002", { followUpQuestions: [/增重|增肥/.test(message) ? "\u751F\u6210\u589E\u91CD\u793A\u4F8B" : "\u751F\u6210\u4E09\u9910\u793A\u4F8B"] });
  if (/茶|食养/.test(message)) return reply(id, "answer", "\u8336\u996E\u53EF\u4EE5\u5148\u4ECE\u98CE\u5473\u3001\u539F\u6599\u4E0E\u9002\u7528\u8BF4\u660E\u4E86\u89E3\u3002\u5F53\u524D\u5185\u5BB9\u5C1A\u672A\u5B8C\u6210\u4E13\u4E1A\u5BA1\u6838\uFF0C\u56E0\u6B64\u53EA\u63D0\u4F9B\u8336\u996E\u9875\u9762\u793A\u4F8B\uFF0C\u4E0D\u751F\u6210\u4E2A\u6027\u5316\u4E2D\u836F\u8336\u65B9\u3002", { contentRefs: [{ type: "recipe", id: "tea" }] });
  if (/作息|睡眠|晚睡/.test(message)) return reply(id, "answer", "\u53EF\u4EE5\u5148\u8BB0\u5F55\u81EA\u5DF1\u7684\u4F5C\u606F\u4E0E\u7761\u7720\u673A\u4F1A\uFF0C\u770B\u770B\u662F\u5426\u5B58\u5728\u5BB9\u6613\u8C03\u6574\u7684\u751F\u6D3B\u5B89\u6392\u3002\u8FD9\u91CC\u662F\u4E00\u822C\u77E5\u8BC6\u793A\u4F8B\uFF0C\u6301\u7EED\u5F71\u54CD\u751F\u6D3B\u7684\u7761\u7720\u56F0\u6270\u5E94\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9\u3002", { followUpQuestions: ["\u751F\u6210\u4F5C\u606F\u793A\u4F8B"] });
  return reply(id, "unavailable", "\u4F60\u7684\u95EE\u9898\u53EF\u4EE5\u5C5E\u4E8E\u77E5\u517B\u672A\u6765\u627F\u63A5\u7684\u5065\u5EB7\u54A8\u8BE2\u8303\u56F4\u3002\u76EE\u524D\u771F\u5B9E\u6A21\u578B\u5C1A\u672A\u63A5\u5165\uFF0C\u6682\u65F6\u4E0D\u80FD\u7ED9\u51FA\u53EF\u9760\u7684\u81EA\u7531\u95EE\u7B54\u3002\u53EF\u4EE5\u4ECE\u9996\u9875\u7684\u793A\u4F8B\u4F53\u9A8C\u4E09\u9910\u5B89\u6392\u3001\u8336\u996E\u5185\u5BB9\u548C\u672C\u673A\u8BB0\u5F55\u529F\u80FD\u3002");
}
function respond(raw) {
  const result = runDemoAgent(raw);
  validateReply(result, raw.requestId);
  if (result.planDraft) validatePlan(result.planDraft);
  for (const ref of result.contentRefs) {
    if (!{ recipe: recipes, topic: topics, article: articles }[ref.type]?.some((c) => c.id === ref.id)) throw new Error("\u5185\u5BB9\u5F15\u7528\u65E0\u6548");
  }
  return result;
}

// src/server/index.js
var MAX_BYTES = 48 * 1024;
var buckets = /* @__PURE__ */ new Map();
var json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
async function boundedJSON(request) {
  if (Number(request.headers.get("content-length")) > MAX_BYTES) throw new Error("size");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("input");
  const chunks = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BYTES) {
      await reader.cancel();
      throw new Error("size");
    }
    chunks.push(value);
  }
  const joined = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(joined));
}
var index_default = {
  async fetch(request, env = {}) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/agent") return env.ASSETS ? env.ASSETS.fetch(request) : new Response("Not found", { status: 404 });
    if (request.method !== "POST") return json({ error: "\u8BF7\u4F7F\u7528 POST \u8BF7\u6C42" }, 405);
    if (request.headers.get("origin") && request.headers.get("origin") !== url.origin) return json({ error: "\u8BF7\u6C42\u6765\u6E90\u4E0D\u5339\u914D" }, 403);
    if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ error: "\u8BF7\u6C42\u9700\u4E3A JSON" }, 415);
    const key = request.headers.get("cf-connecting-ip") || "local";
    const now = Date.now();
    for (const [key2, value] of buckets) if (now - value.start > 6e4) buckets.delete(key2);
    const bucket = buckets.get(key) || { start: now, count: 0 };
    bucket.count++;
    if (buckets.size >= 1e3 && !buckets.has(key)) return json({ error: "\u670D\u52A1\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" }, 429);
    buckets.set(key, bucket);
    if (bucket.count > 40) return json({ error: "\u8BF7\u6C42\u8F83\u591A\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" }, 429);
    try {
      return json(respond(await boundedJSON(request)));
    } catch (error) {
      return json({ error: error.message === "size" ? "\u8BF7\u6C42\u5185\u5BB9\u8FC7\u957F" : "\u8BF7\u6C42\u6216\u56DE\u590D\u6821\u9A8C\u672A\u901A\u8FC7" }, error.message === "size" ? 413 : 400);
    }
  }
};
export {
  index_default as default
};
