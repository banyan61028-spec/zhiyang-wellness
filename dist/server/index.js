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

// src/shared/meals.js
var defaultDietSettings = () => ({
  targets: { kcal: null, protein: null, fat: null, carb: null, source: "user", confirmed: false },
  flags: { pregnancy: false, lactation: false, minor: false, kidney: false, diabetes: false, hypertension: false, eatingDisorder: false },
  flagsConfirmed: false
});
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

// src/shared/nutrition/catalog.json
var catalog_default = {
  version: "example-2026-10-03",
  portionDefaults: {
    small: 100,
    medium: 150,
    large: 250
  },
  foods: [
    {
      id: "rice-cooked",
      name: "\u7C73\u996D",
      aliases: [
        "\u767D\u996D",
        "\u84B8\u7C73\u996D",
        "\u5927\u7C73\u996D"
      ],
      per100g: {
        kcal: 130,
        protein: 2.7,
        fat: 0.3,
        carb: 28.2
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 100,
        medium: 150,
        large: 200
      }
    },
    {
      id: "rice-porridge",
      name: "\u767D\u7CA5",
      aliases: [
        "\u5927\u7C73\u7CA5",
        "\u7CA5"
      ],
      per100g: {
        kcal: 46,
        protein: 0.9,
        fat: 0.1,
        carb: 9.7
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 200,
        medium: 300,
        large: 400
      }
    },
    {
      id: "noodle-cooked",
      name: "\u9762\u6761",
      aliases: [
        "\u716E\u9762\u6761",
        "\u6302\u9762",
        "\u9633\u6625\u9762"
      ],
      per100g: {
        kcal: 138,
        protein: 4.5,
        fat: 2.1,
        carb: 25.2
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 150,
        medium: 250,
        large: 350
      }
    },
    {
      id: "oat-cooked",
      name: "\u71D5\u9EA6\u7CA5",
      aliases: [
        "\u71D5\u9EA6",
        "\u9EA6\u7247\u7CA5"
      ],
      per100g: {
        kcal: 71,
        protein: 2.5,
        fat: 1.5,
        carb: 12
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 150,
        medium: 200,
        large: 280
      }
    },
    {
      id: "millet-cooked",
      name: "\u5C0F\u7C73\u7CA5",
      aliases: [
        "\u716E\u5C0F\u7C73"
      ],
      per100g: {
        kcal: 119,
        protein: 3.5,
        fat: 1,
        carb: 23.7
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 200,
        medium: 250,
        large: 350
      }
    },
    {
      id: "sweet-potato",
      name: "\u7EA2\u85AF",
      aliases: [
        "\u5730\u74DC",
        "\u70E4\u7EA2\u85AF"
      ],
      per100g: {
        kcal: 90,
        protein: 2,
        fat: 0.2,
        carb: 20.7
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 100,
        medium: 150,
        large: 250
      }
    },
    {
      id: "corn-cooked",
      name: "\u7389\u7C73",
      aliases: [
        "\u7389\u7C73\u7C92",
        "\u751C\u7389\u7C73"
      ],
      per100g: {
        kcal: 96,
        protein: 3.4,
        fat: 1.5,
        carb: 21
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 150,
        large: 200
      }
    },
    {
      id: "potato-cooked",
      name: "\u571F\u8C46",
      aliases: [
        "\u9A6C\u94C3\u85AF"
      ],
      per100g: {
        kcal: 87,
        protein: 1.9,
        fat: 0.1,
        carb: 20.1
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 100,
        medium: 150,
        large: 250
      }
    },
    {
      id: "egg-whole",
      name: "\u9E21\u86CB",
      aliases: [
        "\u86CB",
        "\u716E\u9E21\u86CB",
        "\u8377\u5305\u86CB"
      ],
      per100g: {
        kcal: 143,
        protein: 12.6,
        fat: 9.5,
        carb: 0.7
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 40,
        medium: 50,
        large: 60
      }
    },
    {
      id: "egg-white",
      name: "\u9E21\u86CB\u767D",
      aliases: [
        "\u86CB\u767D",
        "\u86CB\u6E05"
      ],
      per100g: {
        kcal: 52,
        protein: 10.9,
        fat: 0.2,
        carb: 0.7
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 30,
        medium: 33,
        large: 40
      }
    },
    {
      id: "chicken-breast",
      name: "\u9E21\u80F8\u8089",
      aliases: [
        "\u9E21\u80F8",
        "\u719F\u9E21\u80F8"
      ],
      per100g: {
        kcal: 165,
        protein: 31,
        fat: 3.6,
        carb: 0
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 120,
        large: 180
      }
    },
    {
      id: "pork-lean",
      name: "\u732A\u7626\u8089",
      aliases: [
        "\u7626\u8089",
        "\u91CC\u810A"
      ],
      per100g: {
        kcal: 197,
        protein: 27.3,
        fat: 9,
        carb: 0
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 50,
        medium: 80,
        large: 120
      }
    },
    {
      id: "beef-cooked",
      name: "\u725B\u8089",
      aliases: [
        "\u7626\u725B\u8089",
        "\u719F\u725B\u8089"
      ],
      per100g: {
        kcal: 250,
        protein: 26,
        fat: 15,
        carb: 0
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 50,
        medium: 80,
        large: 120
      }
    },
    {
      id: "salmon",
      name: "\u4E09\u6587\u9C7C",
      aliases: [
        "\u9C91\u9C7C"
      ],
      per100g: {
        kcal: 208,
        protein: 20,
        fat: 13,
        carb: 0
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 100,
        large: 150
      }
    },
    {
      id: "shrimp",
      name: "\u867E\u4EC1",
      aliases: [
        "\u867E",
        "\u719F\u867E"
      ],
      per100g: {
        kcal: 99,
        protein: 24,
        fat: 0.3,
        carb: 0.2
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 60,
        medium: 100,
        large: 150
      }
    },
    {
      id: "tofu-firm",
      name: "\u5317\u8C46\u8150",
      aliases: [
        "\u8C46\u8150",
        "\u8001\u8C46\u8150"
      ],
      per100g: {
        kcal: 76,
        protein: 8.1,
        fat: 4.8,
        carb: 1.9
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 150,
        large: 200
      }
    },
    {
      id: "tofu-silken",
      name: "\u5185\u916F\u8C46\u8150",
      aliases: [
        "\u5AE9\u8C46\u8150"
      ],
      per100g: {
        kcal: 55,
        protein: 4.8,
        fat: 2.7,
        carb: 2
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 150,
        large: 200
      }
    },
    {
      id: "edamame",
      name: "\u6BDB\u8C46",
      aliases: [
        "\u719F\u6BDB\u8C46"
      ],
      per100g: {
        kcal: 121,
        protein: 11.9,
        fat: 5.2,
        carb: 8.9
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 50,
        medium: 80,
        large: 120
      }
    },
    {
      id: "milk",
      name: "\u725B\u5976",
      aliases: [
        "\u7EAF\u725B\u5976"
      ],
      per100g: {
        kcal: 61,
        protein: 3.2,
        fat: 3.3,
        carb: 4.8
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 200,
        medium: 250,
        large: 300
      }
    },
    {
      id: "yogurt",
      name: "\u539F\u5473\u9178\u5976",
      aliases: [
        "\u9178\u5976"
      ],
      per100g: {
        kcal: 63,
        protein: 5.3,
        fat: 1.6,
        carb: 7
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 100,
        medium: 150,
        large: 200
      }
    },
    {
      id: "broccoli",
      name: "\u897F\u5170\u82B1",
      aliases: [
        "\u7EFF\u82B1\u83DC"
      ],
      per100g: {
        kcal: 34,
        protein: 2.8,
        fat: 0.4,
        carb: 6.6
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 150,
        large: 200
      }
    },
    {
      id: "spinach",
      name: "\u83E0\u83DC",
      aliases: [],
      per100g: {
        kcal: 23,
        protein: 2.9,
        fat: 0.4,
        carb: 3.6
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 150,
        large: 200
      }
    },
    {
      id: "tomato",
      name: "\u756A\u8304",
      aliases: [
        "\u897F\u7EA2\u67FF"
      ],
      per100g: {
        kcal: 18,
        protein: 0.9,
        fat: 0.2,
        carb: 3.9
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 100,
        medium: 150,
        large: 250
      }
    },
    {
      id: "cucumber",
      name: "\u9EC4\u74DC",
      aliases: [
        "\u9752\u74DC"
      ],
      per100g: {
        kcal: 15,
        protein: 0.7,
        fat: 0.1,
        carb: 3.6
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 150,
        large: 200
      }
    },
    {
      id: "carrot",
      name: "\u80E1\u841D\u535C",
      aliases: [
        "\u7EA2\u841D\u535C"
      ],
      per100g: {
        kcal: 41,
        protein: 0.9,
        fat: 0.2,
        carb: 9.6
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 50,
        medium: 100,
        large: 150
      }
    },
    {
      id: "cabbage",
      name: "\u5927\u767D\u83DC",
      aliases: [
        "\u767D\u83DC"
      ],
      per100g: {
        kcal: 13,
        protein: 1.5,
        fat: 0.2,
        carb: 2.2
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 100,
        medium: 150,
        large: 250
      }
    },
    {
      id: "eggplant",
      name: "\u8304\u5B50",
      aliases: [],
      per100g: {
        kcal: 25,
        protein: 1,
        fat: 0.2,
        carb: 5.9
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 150,
        large: 200
      }
    },
    {
      id: "shiitake",
      name: "\u9999\u83C7",
      aliases: [
        "\u9C9C\u9999\u83C7"
      ],
      per100g: {
        kcal: 34,
        protein: 2.2,
        fat: 0.5,
        carb: 6.8
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 50,
        medium: 80,
        large: 120
      }
    },
    {
      id: "lettuce",
      name: "\u751F\u83DC",
      aliases: [],
      per100g: {
        kcal: 15,
        protein: 1.4,
        fat: 0.2,
        carb: 2.9
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 50,
        medium: 80,
        large: 120
      }
    },
    {
      id: "pumpkin",
      name: "\u5357\u74DC",
      aliases: [],
      per100g: {
        kcal: 20,
        protein: 0.7,
        fat: 0.1,
        carb: 4.9
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 150,
        large: 200
      }
    },
    {
      id: "apple",
      name: "\u82F9\u679C",
      aliases: [],
      per100g: {
        kcal: 52,
        protein: 0.3,
        fat: 0.2,
        carb: 13.8
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 100,
        medium: 150,
        large: 200
      }
    },
    {
      id: "banana",
      name: "\u9999\u8549",
      aliases: [],
      per100g: {
        kcal: 89,
        protein: 1.1,
        fat: 0.3,
        carb: 22.8
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 80,
        medium: 120,
        large: 150
      }
    },
    {
      id: "orange",
      name: "\u6A59\u5B50",
      aliases: [
        "\u6A58\u5B50",
        "\u6A59"
      ],
      per100g: {
        kcal: 47,
        protein: 0.9,
        fat: 0.1,
        carb: 11.8
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 100,
        medium: 150,
        large: 200
      }
    },
    {
      id: "peanut",
      name: "\u82B1\u751F",
      aliases: [
        "\u719F\u82B1\u751F"
      ],
      per100g: {
        kcal: 567,
        protein: 25.8,
        fat: 49.2,
        carb: 16.1
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 15,
        medium: 25,
        large: 40
      }
    },
    {
      id: "oil",
      name: "\u98DF\u7528\u6CB9",
      aliases: [
        "\u6CB9",
        "\u690D\u7269\u6CB9"
      ],
      per100g: {
        kcal: 884,
        protein: 0,
        fat: 100,
        carb: 0
      },
      source: "USDA FoodData Central\uFF08\u793A\u4F8B\uFF09",
      sourceNote: "\u793A\u4F8B\u3002\u53C2\u8003 USDA FoodData Central \u516C\u5F00\u9886\u57DF\u6570\u636E\u7684\u5E38\u89C1\u6570\u503C\u624B\u5DE5\u5F55\u5165\u5E76\u56DB\u820D\u4E94\u5165\uFF1B\u6CA1\u6709\u8054\u7F51\u6293\u53D6\uFF0C\u4E5F\u4E0D\u662F\u4E2D\u56FD\u98DF\u7269\u6210\u5206\u8868\u3002\u6B63\u5F0F\u4F7F\u7528\u8BF7\u66FF\u6362\u3002",
      version: "example-2026-10-03",
      calculable: true,
      example: true,
      portion: {
        small: 5,
        medium: 10,
        large: 15
      }
    },
    {
      id: "beef-noodle",
      name: "\u725B\u8089\u9762",
      aliases: [
        "\u725B\u8089\u62C9\u9762"
      ],
      per100g: null,
      source: "\u793A\u4F8B\u5360\u4F4D",
      sourceNote: "\u793A\u4F8B\u5360\u4F4D\u3002\u6CA1\u6709\u53EF\u8BA1\u7B97\u7684\u6BCF100\u514B\u8425\u517B\u6570\u636E\uFF1B\u5339\u914D\u5230\u4E5F\u4F1A\u6807\u4E3A\u65E0\u6CD5\u4F30\u7B97\uFF0C\u4E0D\u4F1A\u7F16\u9020\u70ED\u91CF\u3002",
      version: "example-2026-10-03",
      calculable: false,
      example: true,
      portion: {
        small: 300,
        medium: 450,
        large: 600
      }
    },
    {
      id: "steamed-bun",
      name: "\u9992\u5934",
      aliases: [],
      per100g: null,
      source: "\u793A\u4F8B\u5360\u4F4D",
      sourceNote: "\u793A\u4F8B\u5360\u4F4D\u3002\u6CA1\u6709\u53EF\u8BA1\u7B97\u7684\u6BCF100\u514B\u8425\u517B\u6570\u636E\uFF1B\u5339\u914D\u5230\u4E5F\u4F1A\u6807\u4E3A\u65E0\u6CD5\u4F30\u7B97\uFF0C\u4E0D\u4F1A\u7F16\u9020\u70ED\u91CF\u3002",
      version: "example-2026-10-03",
      calculable: false,
      example: true,
      portion: {
        small: 50,
        medium: 100,
        large: 150
      }
    },
    {
      id: "dumpling",
      name: "\u997A\u5B50",
      aliases: [
        "\u6C34\u997A"
      ],
      per100g: null,
      source: "\u793A\u4F8B\u5360\u4F4D",
      sourceNote: "\u793A\u4F8B\u5360\u4F4D\u3002\u6CA1\u6709\u53EF\u8BA1\u7B97\u7684\u6BCF100\u514B\u8425\u517B\u6570\u636E\uFF1B\u5339\u914D\u5230\u4E5F\u4F1A\u6807\u4E3A\u65E0\u6CD5\u4F30\u7B97\uFF0C\u4E0D\u4F1A\u7F16\u9020\u70ED\u91CF\u3002",
      version: "example-2026-10-03",
      calculable: false,
      example: true,
      portion: {
        small: 100,
        medium: 200,
        large: 300
      }
    },
    {
      id: "takeout-combo",
      name: "\u5916\u5356\u5957\u9910",
      aliases: [
        "\u5957\u9910"
      ],
      per100g: null,
      source: "\u793A\u4F8B\u5360\u4F4D",
      sourceNote: "\u793A\u4F8B\u5360\u4F4D\u3002\u6CA1\u6709\u53EF\u8BA1\u7B97\u7684\u6BCF100\u514B\u8425\u517B\u6570\u636E\uFF1B\u5339\u914D\u5230\u4E5F\u4F1A\u6807\u4E3A\u65E0\u6CD5\u4F30\u7B97\uFF0C\u4E0D\u4F1A\u7F16\u9020\u70ED\u91CF\u3002",
      version: "example-2026-10-03",
      calculable: false,
      example: true,
      portion: {
        small: 300,
        medium: 450,
        large: 600
      }
    }
  ],
  recipes: [
    {
      id: "egg-rice",
      name: "\u9E21\u86CB\u7C73\u996D",
      meal: "breakfast",
      ingredients: [
        {
          foodId: "egg-whole",
          grams: 50
        },
        {
          foodId: "rice-cooked",
          grams: 150
        }
      ],
      steps: [
        "\u7C73\u996D\u84B8\u719F\u3002",
        "\u9E21\u86CB\u716E\u719F\u6216\u714E\u719F\uFF0C\u548C\u7C73\u996D\u4E00\u8D77\u5403\u3002"
      ],
      note: "\u5BB6\u5E38\u65E9\u9910\u3002\u8425\u517B\u7531\u539F\u6599\u8BA1\u7B97\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "oat-milk",
      name: "\u71D5\u9EA6\u725B\u5976",
      meal: "breakfast",
      ingredients: [
        {
          foodId: "oat-cooked",
          grams: 200
        },
        {
          foodId: "milk",
          grams: 200
        }
      ],
      steps: [
        "\u71D5\u9EA6\u716E\u719F\u6216\u7528\u70ED\u725B\u5976\u62CC\u5300\u3002",
        "\u653E\u6E29\u540E\u98DF\u7528\u3002"
      ],
      note: "\u6CA1\u6709\u989D\u5916\u52A0\u7CD6\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "millet-egg",
      name: "\u5C0F\u7C73\u7CA5\u914D\u86CB",
      meal: "breakfast",
      ingredients: [
        {
          foodId: "millet-cooked",
          grams: 250
        },
        {
          foodId: "egg-whole",
          grams: 50
        }
      ],
      steps: [
        "\u5C0F\u7C73\u71AC\u6210\u7CA5\u3002",
        "\u914D\u4E00\u4E2A\u716E\u9E21\u86CB\u3002"
      ],
      note: "\u7CA5\u6BD4\u8F83\u6E29\u548C\uFF0C\u4ECD\u7136\u662F\u793A\u4F8B\u642D\u914D\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "sweet-potato-egg",
      name: "\u7EA2\u85AF\u9E21\u86CB",
      meal: "breakfast",
      ingredients: [
        {
          foodId: "sweet-potato",
          grams: 200
        },
        {
          foodId: "egg-whole",
          grams: 50
        }
      ],
      steps: [
        "\u7EA2\u85AF\u84B8\u719F\u6216\u70E4\u719F\u3002",
        "\u914D\u4E00\u4E2A\u9E21\u86CB\u3002"
      ],
      note: "\u53EF\u4EE5\u5F53\u65E9\u9910\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "tomato-egg-rice",
      name: "\u756A\u8304\u9E21\u86CB\u76D6\u996D",
      meal: "lunch",
      ingredients: [
        {
          foodId: "egg-whole",
          grams: 100
        },
        {
          foodId: "tomato",
          grams: 150
        },
        {
          foodId: "oil",
          grams: 8
        },
        {
          foodId: "rice-cooked",
          grams: 150
        }
      ],
      steps: [
        "\u756A\u8304\u5207\u5757\u7092\u8F6F\u3002",
        "\u6253\u5165\u9E21\u86CB\u7092\u5300\uFF0C\u5C11\u653E\u6CB9\u3002",
        "\u76D6\u5728\u7C73\u996D\u4E0A\u3002"
      ],
      note: "\u5BB6\u5E38\u5348\u996D\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "chicken-broccoli",
      name: "\u9E21\u80F8\u897F\u5170\u82B1\u996D",
      meal: "lunch",
      ingredients: [
        {
          foodId: "chicken-breast",
          grams: 120
        },
        {
          foodId: "broccoli",
          grams: 150
        },
        {
          foodId: "rice-cooked",
          grams: 150
        },
        {
          foodId: "oil",
          grams: 5
        }
      ],
      steps: [
        "\u9E21\u80F8\u8089\u716E\u719F\u6216\u714E\u719F\u3002",
        "\u897F\u5170\u82B1\u712F\u719F\u3002",
        "\u914D\u7C73\u996D\uFF0C\u6CB9\u53EA\u7B97\u70F9\u8C03\u7528\u7684\u8FD9\u4E00\u4EFD\u3002"
      ],
      note: "\u86CB\u767D\u8D28\u8F83\u9AD8\u3002",
      avoid: [
        "kidney_high_protein"
      ],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "beef-broccoli",
      name: "\u725B\u8089\u897F\u5170\u82B1\u996D",
      meal: "lunch",
      ingredients: [
        {
          foodId: "beef-cooked",
          grams: 80
        },
        {
          foodId: "broccoli",
          grams: 120
        },
        {
          foodId: "rice-cooked",
          grams: 150
        },
        {
          foodId: "oil",
          grams: 8
        }
      ],
      steps: [
        "\u725B\u8089\u716E\u719F\u540E\u548C\u897F\u5170\u82B1\u4E00\u8D77\u5403\u3002",
        "\u914D\u4E00\u4EFD\u7C73\u996D\u3002"
      ],
      note: "\u86CB\u767D\u8D28\u548C\u8102\u80AA\u90FD\u4E0D\u4F4E\u3002",
      avoid: [
        "kidney_high_protein"
      ],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "salmon-spinach",
      name: "\u4E09\u6587\u9C7C\u83E0\u83DC\u996D",
      meal: "lunch",
      ingredients: [
        {
          foodId: "salmon",
          grams: 100
        },
        {
          foodId: "spinach",
          grams: 100
        },
        {
          foodId: "rice-cooked",
          grams: 150
        }
      ],
      steps: [
        "\u4E09\u6587\u9C7C\u714E\u719F\u6216\u70E4\u719F\u3002",
        "\u83E0\u83DC\u712F\u4E00\u4E0B\u3002",
        "\u914D\u7C73\u996D\u3002"
      ],
      note: "\u9C7C\u7C7B\u793A\u4F8B\uFF0C\u8FC7\u654F\u5C31\u4E0D\u8981\u505A\u3002",
      avoid: [
        "kidney_high_protein"
      ],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "shrimp-cucumber",
      name: "\u867E\u4EC1\u9EC4\u74DC\u996D",
      meal: "lunch",
      ingredients: [
        {
          foodId: "shrimp",
          grams: 100
        },
        {
          foodId: "cucumber",
          grams: 120
        },
        {
          foodId: "rice-cooked",
          grams: 150
        },
        {
          foodId: "oil",
          grams: 6
        }
      ],
      steps: [
        "\u867E\u4EC1\u716E\u719F\u3002",
        "\u9EC4\u74DC\u53EF\u751F\u98DF\u6216\u712F\u4E00\u4E0B\u3002",
        "\u914D\u7C73\u996D\u3002"
      ],
      note: "\u86CB\u767D\u8D28\u4E3B\u8981\u6765\u81EA\u867E\u4EC1\u3002",
      avoid: [
        "kidney_high_protein"
      ],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "tofu-cabbage",
      name: "\u8C46\u8150\u767D\u83DC\u996D",
      meal: "dinner",
      ingredients: [
        {
          foodId: "tofu-firm",
          grams: 150
        },
        {
          foodId: "cabbage",
          grams: 150
        },
        {
          foodId: "rice-cooked",
          grams: 120
        },
        {
          foodId: "oil",
          grams: 6
        }
      ],
      steps: [
        "\u8C46\u8150\u548C\u767D\u83DC\u4E00\u8D77\u716E\u719F\u3002",
        "\u914D\u5C11\u91CF\u7C73\u996D\u3002"
      ],
      note: "\u665A\u996D\u53EF\u4EE5\u505A\u6E05\u6DE1\u4E00\u4E9B\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "shiitake-tofu",
      name: "\u9999\u83C7\u8C46\u8150\u996D",
      meal: "dinner",
      ingredients: [
        {
          foodId: "tofu-firm",
          grams: 150
        },
        {
          foodId: "shiitake",
          grams: 80
        },
        {
          foodId: "rice-cooked",
          grams: 150
        },
        {
          foodId: "oil",
          grams: 6
        }
      ],
      steps: [
        "\u9999\u83C7\u548C\u8C46\u8150\u716E\u719F\u6216\u7096\u719F\u3002",
        "\u914D\u4E00\u4EFD\u7C73\u996D\u3002"
      ],
      note: "\u5BB6\u5E38\u8C46\u8150\u83DC\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "pumpkin-tofu",
      name: "\u5357\u74DC\u8C46\u8150\u996D",
      meal: "dinner",
      ingredients: [
        {
          foodId: "pumpkin",
          grams: 150
        },
        {
          foodId: "tofu-firm",
          grams: 120
        },
        {
          foodId: "rice-cooked",
          grams: 120
        },
        {
          foodId: "oil",
          grams: 5
        }
      ],
      steps: [
        "\u5357\u74DC\u548C\u8C46\u8150\u716E\u8F6F\u3002",
        "\u914D\u7C73\u996D\u3002"
      ],
      note: "\u5473\u9053\u6DE1\uFF0C\u505A\u6CD5\u7B80\u5355\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "potato-pork",
      name: "\u571F\u8C46\u7626\u8089\u996D",
      meal: "dinner",
      ingredients: [
        {
          foodId: "potato-cooked",
          grams: 150
        },
        {
          foodId: "pork-lean",
          grams: 70
        },
        {
          foodId: "oil",
          grams: 8
        },
        {
          foodId: "rice-cooked",
          grams: 100
        }
      ],
      steps: [
        "\u571F\u8C46\u716E\u719F\uFF0C\u7626\u8089\u716E\u719F\u6216\u7092\u719F\u3002",
        "\u6CB9\u6309\u8FD9\u4E00\u5C0F\u4EFD\u8BA1\u7B97\u3002",
        "\u914D\u5C11\u91CF\u7C73\u996D\u3002"
      ],
      note: "\u5BB6\u5E38\u665A\u996D\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "tomato-egg",
      name: "\u756A\u8304\u7092\u86CB",
      meal: "dinner",
      ingredients: [
        {
          foodId: "egg-whole",
          grams: 120
        },
        {
          foodId: "tomato",
          grams: 200
        },
        {
          foodId: "oil",
          grams: 10
        }
      ],
      steps: [
        "\u756A\u8304\u7092\u8F6F\u540E\u52A0\u5165\u9E21\u86CB\u3002",
        "\u53EF\u4EE5\u5355\u72EC\u5403\uFF0C\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u52A0\u4E3B\u98DF\u3002"
      ],
      note: "\u8FD9\u9053\u6CA1\u6709\u628A\u7C73\u996D\u7B97\u8FDB\u53BB\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "yogurt-apple",
      name: "\u9178\u5976\u82F9\u679C",
      meal: "snack",
      ingredients: [
        {
          foodId: "yogurt",
          grams: 150
        },
        {
          foodId: "apple",
          grams: 100
        }
      ],
      steps: [
        "\u82F9\u679C\u6D17\u51C0\u5207\u5757\u3002",
        "\u62CC\u5165\u539F\u5473\u9178\u5976\u3002"
      ],
      note: "\u52A0\u9910\u793A\u4F8B\uFF0C\u9ED8\u8BA4\u4E0D\u52A0\u7CD6\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "banana-oat",
      name: "\u9999\u8549\u71D5\u9EA6",
      meal: "snack",
      ingredients: [
        {
          foodId: "banana",
          grams: 100
        },
        {
          foodId: "oat-cooked",
          grams: 150
        }
      ],
      steps: [
        "\u71D5\u9EA6\u716E\u597D\u540E\u62CC\u5165\u9999\u8549\u5E76\u653E\u6E29\u3002"
      ],
      note: "\u9002\u5408\u5C11\u91CF\u52A0\u9910\u3002\u6C34\u679C\u6309\u53EF\u98DF\u90E8\u8BA1\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "edamame-egg",
      name: "\u6BDB\u8C46\u9E21\u86CB",
      meal: "snack",
      ingredients: [
        {
          foodId: "edamame",
          grams: 80
        },
        {
          foodId: "egg-whole",
          grams: 50
        }
      ],
      steps: [
        "\u6BDB\u8C46\u716E\u719F\u3002",
        "\u914D\u4E00\u4E2A\u9E21\u86CB\u3002"
      ],
      note: "\u690D\u7269\u86CB\u767D\u52A0\u9E21\u86CB\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    },
    {
      id: "cucumber-tofu",
      name: "\u9EC4\u74DC\u62CC\u8C46\u8150",
      meal: "any",
      ingredients: [
        {
          foodId: "tofu-silken",
          grams: 120
        },
        {
          foodId: "cucumber",
          grams: 150
        }
      ],
      steps: [
        "\u9EC4\u74DC\u62CD\u788E\uFF0C\u5AE9\u8C46\u8150\u62CC\u5300\u3002",
        "\u53EF\u4EE5\u4E0D\u52A0\u70F9\u8C03\u6CB9\u3002"
      ],
      note: "\u5206\u91CF\u4E0D\u5927\uFF0C\u9002\u5408\u4F5C\u4E3A\u6E05\u6DE1\u7684\u4E00\u9053\u3002",
      avoid: [],
      sourceNote: "\u793A\u4F8B\u98DF\u8C31\u3002\u70ED\u91CF\u548C\u4E09\u5927\u8425\u517B\u7D20\u4E0D\u624B\u5199\uFF0C\u7531\u539F\u6599\u514B\u6570\u548C\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
      example: true
    }
  ]
};

// src/shared/nutrition/parse.js
var FOOD_HEADERS = ["id", "name", "aliases", "kcal_per_100g", "protein_g_per_100g", "fat_g_per_100g", "carb_g_per_100g", "source", "source_note", "version", "calculable", "example", "portion_small_g", "portion_medium_g", "portion_large_g"];
var RECIPE_HEADERS = ["id", "name", "meal", "ingredients", "steps", "note", "avoid", "source_note", "example"];
var MEALS = /* @__PURE__ */ new Set(["breakfast", "lunch", "dinner", "snack", "any"]);
var AVOID = /* @__PURE__ */ new Set(["kidney_high_protein"]);
var ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function parseCsv(text) {
  const source = String(text ?? "").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"') {
        if (source[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else quoted = false;
      } else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((columns) => columns.some((column) => column.trim() !== ""));
}
function parseNutritionFiles({ foodsCsv, recipesCsv, config }) {
  const errors = [];
  const warnings = [];
  const portionDefaults = normalizePortions(config?.portionDefaults, errors);
  const foods = parseFoods(foodsCsv, portionDefaults, errors, warnings);
  const recipes2 = parseRecipes(recipesCsv, foods, errors);
  if (!errors.length) warnDuplicateAliases(foods, warnings);
  return {
    errors,
    warnings,
    catalog: errors.length ? null : {
      version: config?.catalogVersion || "unversioned",
      portionDefaults,
      foods,
      recipes: recipes2
    }
  };
}
function parseFoods(text, portionDefaults, errors, warnings) {
  const table = parseTable("foods.csv", text, FOOD_HEADERS, errors);
  const foods = [];
  const seen = /* @__PURE__ */ new Set();
  for (const { line, record } of table) {
    const id = record.id.trim();
    const where = `foods.csv \u7B2C ${line} \u884C`;
    if (!ID_PATTERN.test(id)) errors.push(`${where}\uFF1A\u7F16\u53F7\u65E0\u6548`);
    if (seen.has(id)) errors.push(`${where}\uFF1A\u7F16\u53F7 ${id} \u91CD\u590D`);
    seen.add(id);
    const name = record.name.trim();
    if (!name || name.length > 30) errors.push(`${where}\uFF1A\u98DF\u7269\u540D\u9700\u8981 1 \u5230 30 \u4E2A\u5B57`);
    const calculable = booleanField(record.calculable, `${where}\uFF1Acalculable`, errors);
    const example = booleanField(record.example, `${where}\uFF1Aexample`, errors);
    const sourceNote = record.source_note.trim();
    const version = record.version.trim();
    if (!sourceNote) errors.push(`${where}\uFF1A\u7F3A\u5C11 source_note`);
    if (!version) errors.push(`${where}\uFF1A\u7F3A\u5C11 version`);
    const source = record.source.trim();
    let per100g = null;
    if (calculable === true) {
      if (!source) errors.push(`${where}\uFF1A\u53EF\u8BA1\u7B97\u7684\u98DF\u7269\u5FC5\u987B\u586B\u5199 source`);
      per100g = {
        kcal: numberField(record.kcal_per_100g, `${where}\uFF1Akcal_per_100g`, errors, 0, 950),
        protein: numberField(record.protein_g_per_100g, `${where}\uFF1Aprotein_g_per_100g`, errors, 0, 100),
        fat: numberField(record.fat_g_per_100g, `${where}\uFF1Afat_g_per_100g`, errors, 0, 100),
        carb: numberField(record.carb_g_per_100g, `${where}\uFF1Acarb_g_per_100g`, errors, 0, 100)
      };
    } else if (calculable === false) {
      for (const key of ["kcal_per_100g", "protein_g_per_100g", "fat_g_per_100g", "carb_g_per_100g"]) {
        if (record[key].trim()) errors.push(`${where}\uFF1A\u4E0D\u53EF\u8BA1\u7B97\u7684\u98DF\u7269\u4E0D\u8981\u586B\u5199 ${key}`);
      }
    }
    const portion = {
      small: optionalNumber(record.portion_small_g, portionDefaults.small, `${where}\uFF1Aportion_small_g`, errors),
      medium: optionalNumber(record.portion_medium_g, portionDefaults.medium, `${where}\uFF1Aportion_medium_g`, errors),
      large: optionalNumber(record.portion_large_g, portionDefaults.large, `${where}\uFF1Aportion_large_g`, errors)
    };
    if ([portion.small, portion.medium, portion.large].some((value) => value != null && (value <= 0 || value > 2e3))) errors.push(`${where}\uFF1A\u4EFD\u91CF\u514B\u6570\u9700\u8981\u5728 1 \u5230 2000 \u4E4B\u95F4`);
    const aliases = record.aliases.split("|").map((alias) => alias.trim()).filter(Boolean);
    if (aliases.some((alias) => alias.length > 30)) errors.push(`${where}\uFF1A\u522B\u540D\u8FC7\u957F`);
    if (aliases.includes(name)) warnings.push(`${where}\uFF1A\u522B\u540D\u548C\u98DF\u7269\u540D\u91CD\u590D\uFF0C\u5DF2\u5FFD\u7565`);
    foods.push({
      id,
      name,
      aliases: aliases.filter((alias) => alias !== name),
      per100g,
      source,
      sourceNote,
      version,
      calculable: calculable === true,
      example: example === true,
      portion
    });
  }
  return foods;
}
function parseRecipes(text, foods, errors) {
  const table = parseTable("recipes.csv", text, RECIPE_HEADERS, errors);
  const foodById = new Map(foods.map((food) => [food.id, food]));
  const recipes2 = [];
  const seen = new Set(foods.map((food) => food.id));
  for (const { line, record } of table) {
    const where = `recipes.csv \u7B2C ${line} \u884C`;
    const id = record.id.trim();
    if (!ID_PATTERN.test(id)) errors.push(`${where}\uFF1A\u7F16\u53F7\u65E0\u6548`);
    if (seen.has(id)) errors.push(`${where}\uFF1A\u7F16\u53F7 ${id} \u4E0E\u5DF2\u6709\u98DF\u7269\u6216\u98DF\u8C31\u91CD\u590D`);
    seen.add(id);
    const name = record.name.trim();
    if (!name || name.length > 40) errors.push(`${where}\uFF1A\u83DC\u540D\u9700\u8981 1 \u5230 40 \u4E2A\u5B57`);
    const meal = record.meal.trim();
    if (!MEALS.has(meal)) errors.push(`${where}\uFF1Ameal \u53EA\u80FD\u662F breakfast\u3001lunch\u3001dinner\u3001snack \u6216 any`);
    const example = booleanField(record.example, `${where}\uFF1Aexample`, errors);
    if (!record.source_note.trim()) errors.push(`${where}\uFF1A\u7F3A\u5C11 source_note`);
    const ingredients = [];
    const used = /* @__PURE__ */ new Set();
    for (const part of record.ingredients.split("|").map((item) => item.trim()).filter(Boolean)) {
      const matched = part.match(/^([a-z0-9]+(?:-[a-z0-9]+)*):(\d+(?:\.\d+)?)$/);
      if (!matched) {
        errors.push(`${where}\uFF1A\u539F\u6599\u300C${part}\u300D\u5E94\u4E3A \u98DF\u7269\u7F16\u53F7:\u514B\u6570`);
        continue;
      }
      const foodId = matched[1];
      const grams = Number(matched[2]);
      const food = foodById.get(foodId);
      if (!food) errors.push(`${where}\uFF1A\u539F\u6599 ${foodId} \u4E0D\u5728\u98DF\u7269\u8868\u4E2D`);
      else if (!food.calculable) errors.push(`${where}\uFF1A\u539F\u6599 ${foodId} \u4E0D\u53EF\u8BA1\u7B97\uFF0C\u4E0D\u80FD\u5199\u8FDB\u98DF\u8C31`);
      if (used.has(foodId)) errors.push(`${where}\uFF1A\u539F\u6599 ${foodId} \u91CD\u590D\uFF0C\u8BF7\u5408\u5E76\u514B\u6570`);
      used.add(foodId);
      if (!(grams > 0 && grams <= 2e3)) errors.push(`${where}\uFF1A\u539F\u6599 ${foodId} \u7684\u514B\u6570\u65E0\u6548`);
      ingredients.push({ foodId, grams });
    }
    if (!ingredients.length) errors.push(`${where}\uFF1A\u81F3\u5C11\u9700\u8981\u4E00\u79CD\u539F\u6599`);
    const steps = record.steps.split("|").map((step) => step.trim()).filter(Boolean);
    if (!steps.length) errors.push(`${where}\uFF1A\u81F3\u5C11\u9700\u8981\u4E00\u6761\u505A\u6CD5`);
    const avoid = record.avoid.split("|").map((item) => item.trim()).filter(Boolean);
    for (const flag of avoid) if (!AVOID.has(flag)) errors.push(`${where}\uFF1A\u65E0\u6CD5\u8BC6\u522B\u7684 avoid\u300C${flag}\u300D`);
    recipes2.push({
      id,
      name,
      meal,
      ingredients,
      steps,
      note: record.note.trim(),
      avoid,
      sourceNote: record.source_note.trim(),
      example: example === true
    });
  }
  return recipes2;
}
function parseTable(filename, text, headers, errors) {
  const rows = parseCsv(text);
  if (!rows.length) {
    errors.push(`${filename}\uFF1A\u6587\u4EF6\u662F\u7A7A\u7684`);
    return [];
  }
  const header = rows[0].map((column) => column.trim());
  if (header.join(",") !== headers.join(",")) errors.push(`${filename}\uFF1A\u8868\u5934\u5E94\u4E3A ${headers.join(",")}`);
  return rows.slice(1).map((columns, index) => {
    const record = Object.fromEntries(headers.map((key, column) => [key, columns[column] ?? ""]));
    return { line: index + 2, record };
  });
}
function booleanField(value, label, errors) {
  const text = value.trim();
  if (text === "true") return true;
  if (text === "false") return false;
  errors.push(`${label} \u53EA\u80FD\u662F true \u6216 false`);
  return null;
}
function numberField(value, label, errors, min, max) {
  const text = value.trim();
  if (!text || Number.isNaN(Number(text)) || !Number.isFinite(Number(text))) {
    errors.push(`${label} \u4E0D\u662F\u6570\u5B57`);
    return null;
  }
  const number = Number(text);
  if (number < min || number > max) errors.push(`${label} \u8D85\u51FA ${min} \u5230 ${max}`);
  return number;
}
function optionalNumber(value, fallback, label, errors) {
  if (!value.trim()) return fallback;
  return numberField(value, label, errors, 1, 2e3);
}
function normalizePortions(value, errors) {
  const source = value || {};
  const portion = {
    small: Number(source.small ?? 100),
    medium: Number(source.medium ?? 150),
    large: Number(source.large ?? 250)
  };
  if ([portion.small, portion.medium, portion.large].some((item) => !Number.isFinite(item) || item <= 0)) errors.push("config.json\uFF1A\u4EFD\u91CF\u9ED8\u8BA4\u514B\u6570\u65E0\u6548");
  return portion;
}
function warnDuplicateAliases(foods, warnings) {
  const owners = /* @__PURE__ */ new Map();
  for (const food of foods) {
    for (const label of [food.name, ...food.aliases]) {
      const key = label.normalize("NFKC").trim().toLowerCase();
      const list = owners.get(key) || [];
      list.push(food.id);
      owners.set(key, list);
    }
  }
  for (const [label, ids] of owners) {
    if (ids.length > 1) warnings.push(`\u522B\u540D\u6216\u540D\u79F0\u300C${label}\u300D\u540C\u65F6\u5C5E\u4E8E ${ids.join("\u3001")}\u3002\u4F7F\u7528\u65F6\u4F1A\u8BF7\u7528\u6237\u9009\u62E9\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u4F30\u7B97\u3002`);
  }
}

// src/shared/nutrition/calculate.js
var MAX_GRAMS = 5e3;
function roundNutrient(value) {
  return Math.round(value);
}
function calculateNutrition(food, grams) {
  if (!food || food.calculable !== true || !food.per100g) return null;
  if (!food.source || !food.sourceNote || !food.version) return null;
  if (!Number.isFinite(grams) || grams <= 0 || grams > MAX_GRAMS) throw new Error("\u514B\u6570\u65E0\u6548");
  const factor = grams / 100;
  const per = food.per100g;
  return {
    kcal: roundNutrient(per.kcal * factor),
    protein: roundNutrient(per.protein * factor),
    fat: roundNutrient(per.fat * factor),
    carb: roundNutrient(per.carb * factor),
    grams,
    per100g: { kcal: per.kcal, protein: per.protein, fat: per.fat, carb: per.carb },
    source: food.source,
    sourceNote: food.sourceNote,
    version: food.version,
    foodId: food.id,
    foodName: food.name
  };
}
function sumNutrition(items) {
  const list = Array.isArray(items) ? items : [];
  const total = { kcal: 0, protein: 0, fat: 0, carb: 0, counted: 0, skipped: 0 };
  for (const item of list) {
    if (!item?.nutrition) {
      total.skipped += 1;
      continue;
    }
    total.kcal += item.nutrition.kcal;
    total.protein += item.nutrition.protein;
    total.fat += item.nutrition.fat;
    total.carb += item.nutrition.carb;
    total.counted += 1;
  }
  return total;
}
function sumIngredientNutrition(ingredients, getFood) {
  const items = ingredients.map((ingredient) => {
    const food = getFood(ingredient.foodId);
    return { nutrition: calculateNutrition(food, ingredient.grams) };
  });
  if (items.some((item) => !item.nutrition)) return null;
  return sumNutrition(items);
}

// src/shared/nutrition/source.js
function createNutritionSource(catalog) {
  const foods = catalog.foods.map((food) => ({ ...food, aliases: [...food.aliases], portion: { ...food.portion }, per100g: food.per100g ? { ...food.per100g } : null }));
  const byId = new Map(foods.map((food) => [food.id, food]));
  const recipes2 = catalog.recipes.map((recipe) => {
    const ingredientNames = recipe.ingredients.map((item) => byId.get(item.foodId)?.name).filter(Boolean);
    const herbs = checkHerbs({ ingredients: ingredientNames });
    return {
      ...recipe,
      ingredients: recipe.ingredients.map((item) => ({ ...item })),
      steps: [...recipe.steps],
      avoid: [...recipe.avoid],
      ingredientNames,
      nutrition: sumIngredientNutrition(recipe.ingredients, (id) => byId.get(id)),
      blockedByHerbs: herbs.status === "blocked",
      herbConflicts: herbs.conflicts
    };
  });
  return {
    version: catalog.version,
    foods,
    recipes: recipes2,
    getFood: (id) => byId.get(id) || null,
    getRecipe: (id) => recipes2.find((recipe) => recipe.id === id) || null
  };
}
function publicCatalog(source) {
  return {
    version: source.version,
    foods: source.foods.map((food) => ({
      id: food.id,
      name: food.name,
      aliases: food.aliases,
      calculable: food.calculable,
      per100g: food.per100g,
      source: food.source,
      sourceNote: food.sourceNote,
      version: food.version,
      portion: food.portion,
      example: food.example
    })),
    recipes: source.recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      meal: recipe.meal,
      ingredients: recipe.ingredients.map((item) => ({
        foodId: item.foodId,
        name: source.getFood(item.foodId)?.name || item.foodId,
        grams: item.grams,
        source: source.getFood(item.foodId)?.source || "",
        sourceNote: source.getFood(item.foodId)?.sourceNote || ""
      })),
      steps: recipe.steps,
      note: recipe.note,
      avoid: recipe.avoid,
      sourceNote: recipe.sourceNote,
      example: recipe.example,
      nutrition: recipe.nutrition,
      blockedByHerbs: recipe.blockedByHerbs
    }))
  };
}

// src/shared/nutrition/match.js
function normalizeFoodName(value) {
  return String(value ?? "").normalize("NFKC").trim().toLowerCase().replace(/\s+/g, "").replace(/[，。、,.!！?？·]/g, "");
}
function matchFood(name, source) {
  const key = normalizeFoodName(name);
  if (!key) return { status: "unestimated", reason: "empty", candidates: [] };
  const hits = source.foods.filter((food2) => normalizeFoodName(food2.name) === key || food2.aliases.some((alias) => normalizeFoodName(alias) === key));
  if (hits.length === 0) return { status: "unestimated", reason: "no_match", candidates: [] };
  if (hits.length > 1) return { status: "ambiguous", reason: "ambiguous", candidates: hits.map((food2) => ({ id: food2.id, name: food2.name })) };
  const food = hits[0];
  if (food.calculable !== true) return { status: "unestimated", reason: "not_calculable", foodId: food.id, foodName: food.name, candidates: [] };
  return { status: "matched", reason: "matched", food, candidates: [] };
}
function resolveMealItem(raw, source, { trustFoodId = false } = {}) {
  const inputName = String(raw?.name ?? raw?.inputName ?? "").trim().slice(0, 40);
  const portionLabel = String(raw?.portionLabel ?? "").trim().slice(0, 20);
  const parsedGrams = Number(raw?.grams);
  let grams = Number.isFinite(parsedGrams) ? Math.round(parsedGrams) : null;
  if (raw?.forceUnestimated) {
    if (grams == null || grams <= 0) grams = gramsFromPortion(portionLabel, { small: 100, medium: 150, large: 250 });
    return baseItem({ inputName, name: inputName || "\u672A\u547D\u540D\u98DF\u7269", portionLabel, grams, status: "unestimated", reason: "user", foodId: null });
  }
  const matched = trustFoodId && raw?.foodId ? matchById(raw.foodId, source) : matchFood(inputName, source);
  if (matched.status === "matched") {
    if (grams == null || grams <= 0) grams = gramsFromPortion(portionLabel, matched.food.portion);
    let nutrition = null;
    try {
      nutrition = calculateNutrition(matched.food, grams);
    } catch {
      nutrition = null;
    }
    if (!nutrition) return baseItem({ inputName, name: inputName, portionLabel, grams, status: "unestimated", reason: "bad_grams" });
    return baseItem({ inputName, name: matched.food.name, portionLabel, grams, status: "matched", reason: "matched", foodId: matched.food.id, nutrition });
  }
  if (grams == null || grams <= 0) {
    const known2 = matched.foodId ? source.getFood(matched.foodId) : null;
    grams = gramsFromPortion(portionLabel, known2?.portion || { small: 100, medium: 150, large: 250 });
  }
  if (matched.status === "ambiguous") {
    return baseItem({ inputName, name: inputName, portionLabel, grams, status: "ambiguous", reason: "ambiguous", candidates: matched.candidates });
  }
  return baseItem({
    inputName,
    name: inputName,
    portionLabel,
    grams,
    status: "unestimated",
    reason: matched.reason || "no_match",
    foodId: matched.foodId || null
  });
}
function gramsFromPortion(portionLabel, portion) {
  if (portionLabel === "\u5C0F") return portion.small;
  if (portionLabel === "\u5927") return portion.large;
  if (portionLabel === "\u4E00\u4E2A") return portion.medium;
  return portion.medium;
}
function matchById(foodId, source) {
  const food = source.getFood(foodId);
  if (!food) return { status: "unestimated", reason: "no_match", candidates: [] };
  if (food.calculable !== true) return { status: "unestimated", reason: "not_calculable", foodId: food.id, foodName: food.name, candidates: [] };
  return { status: "matched", reason: "matched", food, candidates: [] };
}
function baseItem(fields) {
  return {
    inputName: fields.inputName,
    name: fields.name,
    portionLabel: fields.portionLabel,
    grams: fields.grams,
    status: fields.status,
    reason: fields.reason,
    foodId: fields.foodId || null,
    nutrition: fields.nutrition || null,
    candidates: fields.candidates || [],
    userAdjusted: false
  };
}

// src/shared/nutrition/boohee.js
var BOOHEE_SOURCE_NAME = "\u8584\u8377\u5065\u5EB7";
function booheeFoodId(code) {
  return `boohee:${code}`;
}
function booheeCodeFromId(id) {
  const match = /^boohee:([A-Za-z0-9_-]{1,64})$/.exec(String(id || ""));
  return match ? match[1] : "";
}
function isBrandedBooheeName(name) {
  return /\s/.test(String(name || "").trim());
}
function scoreBooheeName(query, name) {
  const key = normalizeFoodName(query);
  const text = String(name || "").trim();
  const normalized = normalizeFoodName(text);
  if (!key || !normalized) return 0;
  const branded = isBrandedBooheeName(text);
  if (!branded && normalized === key) return 100;
  if (!branded && normalized.includes(key)) return 50;
  const parts = text.split(/\s+/).some((part) => normalizeFoodName(part) === key);
  if (branded && (normalized.includes(key) || parts)) return 10;
  return 0;
}
function foodFromBooheeRecord(record) {
  const code = String(record?.code || "").trim();
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(code)) return null;
  const name = String(record?.name || "").trim();
  if (!name) return null;
  const per100g = {
    kcal: readNutrient(record?.calories),
    protein: readNutrient(record?.protein),
    fat: readNutrient(record?.fat),
    carb: readNutrient(record?.carbohydrate)
  };
  if (Object.values(per100g).some((value) => !Number.isFinite(value) || value < 0 || value > 1e3)) return null;
  return {
    id: booheeFoodId(code),
    name: [...name].slice(0, 40).join(""),
    aliases: [],
    calculable: true,
    per100g,
    source: BOOHEE_SOURCE_NAME,
    sourceNote: `\u8584\u8377\u5065\u5EB7\u5F00\u653E\u5E73\u53F0\uFF0C\u98DF\u7269\u7F16\u7801 ${code}`,
    version: "boohee",
    example: false,
    portion: { small: 100, medium: 150, large: 250 },
    booheeCode: code
  };
}
function rankBooheeFoods(query, records) {
  const ranked = (Array.isArray(records) ? records : []).map((record) => ({ record, food: foodFromBooheeRecord(record) })).filter((item) => item.food).map((item) => ({ ...item, score: scoreBooheeName(query, item.food.name), branded: isBrandedBooheeName(item.record.name) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || Number(a.branded) - Number(b.branded) || a.food.name.length - b.food.name.length);
  const exact = ranked.filter((item) => item.score === 100);
  const candidates = (chosenCode) => ranked.filter((item) => item.food.booheeCode !== chosenCode).slice(0, 8).map((item) => ({ id: item.food.id, name: item.food.name, branded: item.branded }));
  if (exact.length === 1) return { status: "matched", food: exact[0].food, candidates: candidates(exact[0].food.booheeCode) };
  if (!ranked.length) return { status: "empty", candidates: [] };
  return { status: "ambiguous", candidates: candidates("") };
}
function readNutrient(value) {
  if (value && typeof value === "object") return Number(value.value);
  return Number(value);
}

// src/server/boohee.js
var DEFAULT_BASE = "https://api.boohee.com/open-apis";
var CACHE_LIMIT = 100;
function createBooheeClient({
  apiKey = "",
  baseUrl = DEFAULT_BASE,
  fetch: fetchImpl = globalThis.fetch,
  timeoutMs = 8e3,
  cacheTtlMs = 10 * 60 * 1e3,
  now = Date.now,
  log = defaultLog
} = {}) {
  const enabled = Boolean(apiKey);
  const root = String(baseUrl || DEFAULT_BASE).replace(/\/$/, "");
  const searchCache = /* @__PURE__ */ new Map();
  const codeCache = /* @__PURE__ */ new Map();
  function remember(food) {
    codeCache.set(food.booheeCode, { at: now(), food });
    trim(codeCache);
  }
  async function request(endpoint, url) {
    const started = now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, {
        method: "GET",
        headers: { "X-Api-Key": apiKey, accept: "application/json" },
        redirect: "error",
        signal: controller.signal
      });
      if (!response.ok) {
        logCall(log, { endpoint, outcome: "http_error", durationMs: now() - started, httpStatus: response.status, resultCount: null });
        throw failure("failed");
      }
      const payload = await response.json().catch(() => null);
      if (!payload || payload.code !== 0) {
        logCall(log, { endpoint, outcome: "bad_response", durationMs: now() - started, httpStatus: response.status, resultCount: null });
        throw failure("failed");
      }
      return { payload, durationMs: now() - started, httpStatus: response.status };
    } catch (error) {
      if (error?.code === "failed") throw error;
      const outcome = controller.signal.aborted || error?.name === "AbortError" || error?.name === "TimeoutError" ? "timeout" : "failed";
      logCall(log, { endpoint, outcome, durationMs: now() - started, httpStatus: null, resultCount: null });
      throw failure(outcome);
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    enabled,
    async matchName(keyword) {
      const query = [...String(keyword || "").trim()].slice(0, 30).join("");
      if (!query) return { status: "empty", candidates: [] };
      if (!enabled) {
        logCall(log, { endpoint: "food/search", outcome: "no_key", durationMs: 0, httpStatus: null, resultCount: 0 });
        return { status: "no_key", candidates: [] };
      }
      const cacheKey = normalizeFoodName(query);
      const cached = searchCache.get(cacheKey);
      if (cached && now() - cached.at < cacheTtlMs) {
        logCall(log, { endpoint: "food/search", outcome: "cache", durationMs: 0, httpStatus: null, resultCount: cached.resultCount });
        return cached.result;
      }
      const url = new URL(`${root}/v1/food/search`);
      url.searchParams.set("keyword", query);
      url.searchParams.set("page", "1");
      url.searchParams.set("per_page", "20");
      try {
        const { payload, durationMs, httpStatus } = await request("food/search", url);
        const records = Array.isArray(payload.data?.foods) ? payload.data.foods.slice(0, 20) : [];
        for (const food of records.map(foodFromBooheeRecord).filter(Boolean)) remember(food);
        const result = rankBooheeFoods(query, records);
        searchCache.set(cacheKey, { at: now(), result, resultCount: records.length });
        trim(searchCache);
        logCall(log, { endpoint: "food/search", outcome: "ok", durationMs, httpStatus, resultCount: records.length });
        return result;
      } catch (error) {
        return { status: "failed", reason: error.code === "timeout" ? "timeout" : "failed", candidates: [] };
      }
    },
    async foodByCode(code) {
      if (!/^[A-Za-z0-9_-]{1,64}$/.test(String(code || ""))) return { status: "empty" };
      if (!enabled) {
        logCall(log, { endpoint: "food/detail", outcome: "no_key", durationMs: 0, httpStatus: null, resultCount: 0 });
        return { status: "no_key" };
      }
      const cached = codeCache.get(code);
      if (cached && now() - cached.at < cacheTtlMs) {
        logCall(log, { endpoint: "food/detail", outcome: "cache", durationMs: 0, httpStatus: null, resultCount: 1 });
        return { status: "ok", food: cached.food };
      }
      const url = new URL(`${root}/v1/food/detail`);
      url.searchParams.set("code", code);
      try {
        const { payload, durationMs, httpStatus } = await request("food/detail", url);
        const food = foodFromBooheeRecord(payload.data);
        if (!food || food.booheeCode !== code) {
          logCall(log, { endpoint: "food/detail", outcome: "bad_response", durationMs, httpStatus, resultCount: 0 });
          return { status: "empty" };
        }
        remember(food);
        logCall(log, { endpoint: "food/detail", outcome: "ok", durationMs, httpStatus, resultCount: 1 });
        return { status: "ok", food };
      } catch (error) {
        return { status: "failed", reason: error.code === "timeout" ? "timeout" : "failed" };
      }
    }
  };
}
var clients = /* @__PURE__ */ new Map();
function booheeFromEnv(env = {}) {
  if (env.booheeClient) return env.booheeClient;
  const apiKey = env.BOOHEE_API_KEY || "";
  const baseUrl = env.BOOHEE_BASE_URL || DEFAULT_BASE;
  const cacheKey = `${baseUrl}
${apiKey}`;
  if (!clients.has(cacheKey)) clients.set(cacheKey, createBooheeClient({ apiKey, baseUrl }));
  return clients.get(cacheKey);
}
function logCall(log, entry) {
  log({
    component: "boohee",
    endpoint: entry.endpoint,
    outcome: entry.outcome,
    durationMs: entry.durationMs,
    httpStatus: entry.httpStatus,
    resultCount: entry.resultCount
  });
}
function defaultLog(entry) {
  console.info(JSON.stringify(entry));
}
function failure(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}
function trim(cache) {
  while (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value);
}

// src/shared/nutrition/recommend.js
function chooseRecipes({ recipes: recipes2, totals, targets, caution, excludeIds = [], limit = 3 }) {
  const excluded = new Set(excludeIds);
  let pool = recipes2.filter((recipe) => recipe?.nutrition && recipe.blockedByHerbs !== true && !excluded.has(recipe.id));
  if (caution?.kidney) pool = pool.filter((recipe) => !recipe.avoid?.includes("kidney_high_protein"));
  const gentle = Boolean(caution?.eatingDisorder || caution?.pregnancy || caution?.lactation || caution?.minor || caution?.diabetes || caution?.hypertension);
  const useGap = !gentle && targets?.confirmed === true && Number.isFinite(Number(targets.kcal));
  return pool.map((recipe) => ({ recipe, score: scoreRecipe(recipe, { useGap, totals, targets }) })).sort((a, b) => b.score - a.score || a.recipe.id.localeCompare(b.recipe.id)).slice(0, limit).map((item) => item.recipe);
}
function scoreRecipe(recipe, { useGap, totals, targets }) {
  const kcal = recipe.nutrition.kcal;
  if (!useGap) return -Math.abs(kcal - 450) / 10;
  const remain = Math.round(Number(targets.kcal) - totals.kcal);
  let score = 0;
  if (remain <= 150) score -= kcal / 5;
  else {
    const targetMeal = Math.min(remain, 700);
    score -= Math.abs(kcal - targetMeal) / 8;
    if (kcal <= remain + 80) score += 20;
  }
  if (Number.isFinite(Number(targets.protein))) {
    const gap = Number(targets.protein) - totals.protein;
    if (gap > 10) score += recipe.nutrition.protein * 2;
  }
  return score;
}
function programReason(recipe, { totals, targets, caution }) {
  if (!recipe) return "\u98DF\u8C31\u5E93\u91CC\u6CA1\u6709\u66F4\u5408\u9002\u7684\u4E00\u9053\u3002\u53EF\u4EE5\u4ECE\u73B0\u6709\u98DF\u8C31\u91CC\u53E6\u9009\uFF0C\u8FD9\u91CC\u4E0D\u4F1A\u65B0\u7F16\u4E00\u9053\u83DC\u3002";
  if (caution?.eatingDisorder || caution?.pregnancy || caution?.lactation || caution?.minor) {
    return `\u4ECE\u98DF\u8C31\u5E93\u9009\u4E86\u300C${recipe.name}\u300D\uFF0C\u53EA\u4F5C\u4E3A\u5BB6\u5E38\u642D\u914D\uFF0C\u4E0D\u662F\u6309\u70ED\u91CF\u7F3A\u53E3\u5B89\u6392\u7684\u5C11\u5403\u65B9\u6848\u3002`;
  }
  if (caution?.kidney) return `\u4ECE\u98DF\u8C31\u5E93\u9009\u4E86\u300C${recipe.name}\u300D\u3002\u6CA1\u6709\u6309\u86CB\u767D\u8D28\u7F3A\u53E3\u6311\u9AD8\u86CB\u767D\u83DC\uFF0C\u80BE\u75C5\u996E\u98DF\u8BF7\u4EE5\u533B\u5631\u4E3A\u51C6\u3002`;
  if (caution?.diabetes || caution?.hypertension) return `\u4ECE\u98DF\u8C31\u5E93\u9009\u4E86\u300C${recipe.name}\u300D\u3002\u8FD9\u662F\u5BB6\u5E38\u642D\u914D\uFF0C\u4E0D\u662F\u6CBB\u7597\u81B3\u98DF\u3002`;
  if (!targets?.confirmed || targets.kcal == null) return `\u4ECE\u98DF\u8C31\u5E93\u9009\u4E86\u300C${recipe.name}\u300D\u3002\u6BCF\u65E5\u76EE\u6807\u8FD8\u6CA1\u586B\u5199\uFF0C\u6240\u4EE5\u6CA1\u6709\u6309\u7F3A\u53E3\u7B5B\u9009\u3002`;
  const remain = Math.round(Number(targets.kcal) - totals.kcal);
  if (Number.isFinite(Number(targets.protein)) && Number(targets.protein) - totals.protein > 10 && !caution?.kidney) {
    const gap = Math.round(Number(targets.protein) - totals.protein);
    return `\u4ECA\u5929\u86CB\u767D\u8D28\u5927\u7EA6\u8FD8\u5C11 ${gap} \u514B\uFF0C\u6240\u4EE5\u4ECE\u98DF\u8C31\u5E93\u9009\u4E86\u300C${recipe.name}\u300D\u3002\u8FD9\u9053\u83DC\u5927\u7EA6 ${recipe.nutrition.kcal} \u5343\u5361\u3001\u86CB\u767D\u8D28 ${recipe.nutrition.protein} \u514B\u3002`;
  }
  if (remain > 0) return `\u8DDD\u79BB\u4F60\u586B\u7684\u70ED\u91CF\u76EE\u6807\u8FD8\u5C11 ${remain} \u5343\u5361\uFF0C\u6240\u4EE5\u4ECE\u98DF\u8C31\u5E93\u9009\u4E86\u300C${recipe.name}\u300D\uFF0C\u8FD9\u9053\u83DC\u5927\u7EA6 ${recipe.nutrition.kcal} \u5343\u5361\u3002`;
  return `\u4ECA\u5929\u70ED\u91CF\u5DF2\u7ECF\u4E0D\u4F4E\uFF0C\u6240\u4EE5\u4ECE\u98DF\u8C31\u5E93\u9009\u4E86\u5206\u91CF\u66F4\u5C0F\u7684\u300C${recipe.name}\u300D\uFF0C\u5927\u7EA6 ${recipe.nutrition.kcal} \u5343\u5361\u3002`;
}

// src/shared/nutrition/advice.js
var numberPattern = /\d+(?:\.\d+)?/g;
function collectAllowedNumbers(totals, targets) {
  const numbers = [totals.kcal, totals.protein, totals.fat, totals.carb, totals.counted, totals.skipped];
  if (targets?.confirmed) {
    for (const key of ["kcal", "protein", "fat", "carb"]) {
      if (targets[key] == null || !Number.isFinite(Number(targets[key]))) continue;
      const target = Math.round(Number(targets[key]));
      const actual = totals[key];
      numbers.push(target, target - actual, Math.abs(target - actual));
    }
  }
  return [...new Set(numbers.filter((value) => Number.isFinite(value)).map((value) => Math.round(value)))];
}
function numbersConflict(text, allowed) {
  const allowedSet = new Set(allowed.map((value) => String(value)));
  const found = String(text ?? "").match(numberPattern) || [];
  return found.some((token) => {
    const asNumber = String(Number(token));
    return !allowedSet.has(token) && !allowedSet.has(asNumber);
  });
}
function sanitizeAdvice(text, allowed) {
  const sentences = String(text ?? "").trim().split(/(?<=[。！？])/).map((part) => part.trim()).filter(Boolean).slice(0, 2);
  const joined = sentences.join("");
  if (!joined || numbersConflict(joined, allowed)) return { text: "", kept: false };
  return { text: joined, kept: true };
}
function programAdvice({ totals, targets, caution }) {
  if (!totals.counted && totals.skipped) return "\u4ECA\u5929\u8BB0\u4E0B\u7684\u98DF\u7269\u6682\u65F6\u90FD\u65E0\u6CD5\u4F30\u7B97\uFF0C\u6240\u4EE5\u6CA1\u6709\u70ED\u91CF\u5408\u8BA1\u3002";
  if (caution.eatingDisorder) return "\u8BB0\u5F55\u5DF2\u7ECF\u7559\u4E0B\u3002\u8FD9\u91CC\u4E0D\u6309\u70ED\u91CF\u7F3A\u53E3\u9F13\u52B1\u5C11\u5403\u3002\u5982\u679C\u5403\u996D\u8BA9\u4F60\u5F88\u75DB\u82E6\uFF0C\u8BF7\u5BFB\u6C42\u4E13\u4E1A\u5E2E\u52A9\u3002";
  if (caution.pregnancy || caution.lactation || caution.minor) return "\u4ECA\u5929\u7684\u5408\u8BA1\u53EA\u4F5C\u8BB0\u5F55\u3002\u8FD9\u4E0D\u662F\u51CF\u91CD\u76EE\u6807\uFF0C\u4E0B\u4E00\u9910\u4E5F\u53EA\u4ECE\u5BB6\u5E38\u83DC\u91CC\u4F5C\u4E00\u822C\u642D\u914D\u3002\u5177\u4F53\u8BF7\u54A8\u8BE2\u533B\u751F\u6216\u8425\u517B\u4E13\u4E1A\u4EBA\u5458\u3002";
  if (caution.kidney) return "\u4ECA\u5929\u7684\u5408\u8BA1\u53EF\u4EE5\u770B\u3002\u4E0D\u4F1A\u6309\u86CB\u767D\u8D28\u7F3A\u53E3\u63A8\u8350\u9AD8\u86CB\u767D\u83DC\u3002\u80BE\u75C5\u76F8\u5173\u996E\u98DF\u8BF7\u4EE5\u533B\u5631\u4E3A\u51C6\u3002";
  if (caution.diabetes || caution.hypertension) return "\u4ECA\u5929\u7684\u5408\u8BA1\u53EA\u4F9B\u8BB0\u5F55\uFF0C\u4E0D\u662F\u6CBB\u7597\u81B3\u98DF\u3002\u5177\u4F53\u5403\u4EC0\u4E48\u4EE5\u533B\u5631\u4E3A\u51C6\u3002";
  if (!targets?.confirmed || targets.kcal == null) return "\u4ECA\u5929\u53EA\u663E\u793A\u5DF2\u7ECF\u7B97\u51FA\u7684\u5408\u8BA1\u3002\u6BCF\u65E5\u76EE\u6807\u8FD8\u6CA1\u586B\u5199\uFF0C\u6240\u4EE5\u6CA1\u6709\u548C\u76EE\u6807\u5BF9\u6BD4\u3002";
  const allowed = collectAllowedNumbers(totals, targets);
  const gaps = [
    ["\u86CB\u767D\u8D28", targets.protein, totals.protein],
    ["\u8102\u80AA", targets.fat, totals.fat],
    ["\u78B3\u6C34", targets.carb, totals.carb]
  ].filter(([, target]) => target != null && Number.isFinite(Number(target)));
  const short = gaps.map(([label, target, actual]) => ({ label, gap: Math.round(Number(target) - actual) })).filter((item) => item.gap > 5).sort((a, b) => b.gap - a.gap)[0];
  const kcalGap = Math.round(targets.kcal - totals.kcal);
  let sentence = `\u4ECA\u5929\u5927\u7EA6\u5403\u4E86 ${totals.kcal} \u5343\u5361\u3002`;
  if (kcalGap > 0) sentence += `\u8DDD\u79BB\u4F60\u586B\u7684\u76EE\u6807\u8FD8\u5C11 ${kcalGap} \u5343\u5361\u3002`;
  else if (kcalGap < 0) sentence += `\u5DF2\u7ECF\u6BD4\u4F60\u586B\u7684\u76EE\u6807\u591A ${Math.abs(kcalGap)} \u5343\u5361\u3002`;
  else sentence += "\u548C\u4F60\u586B\u7684\u70ED\u91CF\u76EE\u6807\u4E00\u6837\u3002";
  if (short && allowed.includes(short.gap)) sentence += `${short.label}\u5927\u7EA6\u8FD8\u5C11 ${short.gap} \u514B\u3002`;
  const checked = sanitizeAdvice(sentence, allowed);
  return checked.kept ? checked.text : "\u4ECA\u5929\u7684\u5408\u8BA1\u5DF2\u7ECF\u6309\u98DF\u7269\u8868\u7B97\u597D\u3002";
}
function inferCaution(texts, flags = {}) {
  const blob = `${Array.isArray(texts) ? texts.join("\u3002") : ""}`;
  return {
    eatingDisorder: flags.eatingDisorder === true || /催吐|绝食|暴瘦|只喝茶|不吃饭/.test(blob),
    pregnancy: flags.pregnancy === true || /怀孕|孕妇|孕期|备孕/.test(blob),
    lactation: flags.lactation === true || /哺乳/.test(blob),
    minor: flags.minor === true || /未成年|婴儿|宝宝|儿童/.test(blob),
    kidney: flags.kidney === true || /肾病/.test(blob),
    diabetes: flags.diabetes === true || /糖尿病/.test(blob),
    hypertension: flags.hypertension === true || /高血压/.test(blob)
  };
}
function sanitizeReason(text, recipe, recipes2, allowed) {
  const joined = String(text ?? "").trim().split(/(?<=[。！？])/).map((part) => part.trim()).filter(Boolean).slice(0, 2).join("");
  if (!joined || !recipe) return { text: "", kept: false };
  const otherNames = recipes2.filter((item) => item.id !== recipe.id).map((item) => item.name).filter((name) => name && name.length >= 2);
  if (otherNames.some((name) => joined.includes(name))) return { text: "", kept: false };
  if (numbersConflict(joined, allowed)) return { text: "", kept: false };
  return { text: joined, kept: true };
}

// src/server/qwen.js
var DEFAULT_BASE2 = "https://dashscope.aliyuncs.com/compatible-mode/v1";
function qwenConfig(env = {}) {
  const key = env.DASHSCOPE_API_KEY || "";
  return {
    apiKey: key,
    enabled: Boolean(key),
    baseUrl: (env.DASHSCOPE_BASE_URL || DEFAULT_BASE2).replace(/\/$/, ""),
    visionModel: env.DASHSCOPE_VISION_MODEL || "qwen3-vl-flash",
    textModel: env.DASHSCOPE_TEXT_MODEL || "qwen-plus"
  };
}
function extractJson(text) {
  const fenced = String(text ?? "").match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : String(text ?? "");
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("\u6A21\u578B\u6CA1\u6709\u8FD4\u56DE\u53EF\u89E3\u6790\u7684\u7ED3\u679C");
  return JSON.parse(raw.slice(start, end + 1));
}
function readModelItems(payload) {
  const items = payload?.items;
  if (!Array.isArray(items) || !items.length || items.length > 12) throw new Error("\u6A21\u578B\u8FD4\u56DE\u7684\u98DF\u7269\u5217\u8868\u65E0\u6548");
  return items.map((item) => {
    const name = String(item?.name ?? "").trim().slice(0, 40);
    if (!name) throw new Error("\u6A21\u578B\u8FD4\u56DE\u7684\u98DF\u7269\u540D\u4E3A\u7A7A");
    const grams = Number(item?.grams);
    return {
      name,
      portionLabel: String(item?.portionLabel ?? "").trim().slice(0, 20),
      grams: Number.isFinite(grams) ? Math.round(grams) : null
    };
  });
}
async function qwenChat({ config, model, messages }) {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: { authorization: `Bearer ${config.apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ model, messages, temperature: 0.2 }),
    signal: AbortSignal.timeout(25e3)
  });
  if (!response.ok) throw new Error("\u6A21\u578B\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528");
  const body = await response.json();
  const text = body?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) throw new Error("\u6A21\u578B\u6CA1\u6709\u8FD4\u56DE\u5185\u5BB9");
  return text;
}
function stubParseText(text) {
  const normalized = String(text).replace(/加个/g, "\uFF0C\u4E00\u4E2A").replace(/加一/g, "\uFF0C\u4E00").replace(/加/g, "\uFF0C");
  const chunks = normalized.split(/，|、|和|配|以及|\+/).map((part) => part.trim()).filter(Boolean);
  const items = chunks.map((chunk) => {
    let rest = chunk.replace(/^(今天|刚刚|早上|早晨|中午|晚上|凌晨|早餐|午餐|晚餐|加餐|我吃了|吃了|来了)/, "").trim();
    const explicit = rest.match(/(\d+(?:\.\d+)?)\s*(克|g|Ｇ)/i);
    let grams = explicit ? Math.round(Number(explicit[1])) : null;
    let portionLabel = "\u4E00\u4EFD";
    if (/小碗|小份/.test(rest)) portionLabel = "\u5C0F";
    else if (/大碗|大份/.test(rest)) portionLabel = "\u5927";
    else if (/中碗|中份|一碗|一中碗/.test(rest)) portionLabel = "\u4E2D";
    else if (/一个|一只|一枚/.test(rest)) {
      portionLabel = "\u4E00\u4E2A";
      if (grams == null) grams = 50;
    }
    if (grams == null && portionLabel === "\u4E00\u4EFD") grams = 150;
    rest = rest.replace(/(\d+(?:\.\d+)?)\s*(克|g|Ｇ)/ig, "");
    rest = rest.replace(/小碗|中碗|大碗|小份|中份|大份|一碗|一个|一只|一枚|一份|这碗|这盘/g, "");
    const name = rest.replace(/^[的了呢吧啊呀]+|[的了呢吧啊呀]+$/g, "").trim();
    return { name, portionLabel, grams };
  }).filter((item) => item.name);
  if (!items.length) throw new Error("\u6CA1\u6709\u4ECE\u8FD9\u53E5\u8BDD\u91CC\u62C6\u51FA\u98DF\u7269");
  return items.slice(0, 12);
}
function stubImageItems() {
  return [
    { name: "\u7C73\u996D", portionLabel: "\u4E2D", grams: 150 },
    { name: "\u9E21\u86CB", portionLabel: "\u4E00\u4E2A", grams: 50 }
  ];
}

// src/server/diet.js
var json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" }
});
function loadNutrition(env = {}) {
  if (env.NUTRITION_FOODS_CSV || env.NUTRITION_RECIPES_CSV) {
    let config = catalog_default.portionDefaults ? { catalogVersion: catalog_default.version, portionDefaults: catalog_default.portionDefaults } : {};
    if (env.NUTRITION_CONFIG) {
      try {
        config = JSON.parse(env.NUTRITION_CONFIG);
      } catch {
        return { errors: ["config.json \u65E0\u6CD5\u89E3\u6790"], source: null };
      }
    }
    const parsed = parseNutritionFiles({ foodsCsv: env.NUTRITION_FOODS_CSV || "", recipesCsv: env.NUTRITION_RECIPES_CSV || "", config });
    if (parsed.errors.length) return { errors: parsed.errors, source: null };
    return { errors: [], source: createNutritionSource(parsed.catalog) };
  }
  return { errors: [], source: createNutritionSource(catalog_default) };
}
async function handleDiet(request, env, url) {
  const loaded = loadNutrition(env);
  if (url.pathname === "/api/diet/catalog" && request.method === "GET") {
    if (loaded.errors.length) return json({ error: "\u98DF\u7269\u6570\u636E\u672A\u901A\u8FC7\u6821\u9A8C", details: loaded.errors }, 500);
    return json(publicCatalog(loaded.source));
  }
  if (request.method !== "POST") return json({ error: "\u8BF7\u4F7F\u7528 POST \u8BF7\u6C42" }, 405);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ error: "\u8BF7\u6C42\u9700\u4E3A JSON" }, 415);
  const maxBytes = url.pathname === "/api/diet/recognize" ? 2 * 1024 * 1024 : 256 * 1024;
  let body;
  try {
    body = await readJson(request, maxBytes);
  } catch (error) {
    return json({ error: error.message === "size" ? "\u8BF7\u6C42\u5185\u5BB9\u8FC7\u957F" : "\u8BF7\u6C42\u6216\u56DE\u590D\u6821\u9A8C\u672A\u901A\u8FC7" }, error.message === "size" ? 413 : 400);
  }
  try {
    if (loaded.errors.length) return json({ error: "\u98DF\u7269\u6570\u636E\u672A\u901A\u8FC7\u6821\u9A8C", details: loaded.errors }, 500);
    const result = await dispatchDiet(url.pathname, body, env, loaded.source);
    await assertDietResult(result, loaded.source, booheeFromEnv(env));
    return json(result);
  } catch (error) {
    if (error.message === "size") return json({ error: "\u8BF7\u6C42\u5185\u5BB9\u8FC7\u957F" }, 413);
    const safe = /* @__PURE__ */ new Set(["\u6CA1\u6709\u4ECE\u8FD9\u53E5\u8BDD\u91CC\u62C6\u51FA\u98DF\u7269", "\u6CA1\u6709\u8BC6\u522B\u51FA\u98DF\u7269", "\u6A21\u578B\u6CA1\u6709\u8FD4\u56DE\u53EF\u89E3\u6790\u7684\u7ED3\u679C", "\u6A21\u578B\u8FD4\u56DE\u7684\u98DF\u7269\u5217\u8868\u65E0\u6548", "\u6A21\u578B\u8FD4\u56DE\u7684\u98DF\u7269\u540D\u4E3A\u7A7A", "\u6A21\u578B\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528", "\u6A21\u578B\u6CA1\u6709\u8FD4\u56DE\u5185\u5BB9", "\u7167\u7247\u683C\u5F0F\u65E0\u6548", "\u7F3A\u5C11\u9910\u98DF\u5185\u5BB9", "\u98DF\u7269\u9879\u65E0\u6548", "\u76EE\u6807\u65E0\u6548", "\u8BF7\u6C42\u7F16\u53F7\u65E0\u6548", "\u8DEF\u5F84\u65E0\u6548"]);
    return json({ error: safe.has(error.message) ? error.message : "\u8BF7\u6C42\u6216\u56DE\u590D\u6821\u9A8C\u672A\u901A\u8FC7" }, 400);
  }
}
async function dispatchDiet(pathname, body, env, source) {
  const requestId = cleanId(body?.requestId);
  if (pathname === "/api/diet/recognize") return recognizeMeal(body, env, source, requestId);
  if (pathname === "/api/diet/calculate") return calculateItems(body, source, requestId, env);
  if (pathname === "/api/diet/report") return buildReport(body, env, source, requestId);
  if (pathname === "/api/diet/recommend") return buildRecommendation(body, env, source, requestId);
  throw new Error("\u8DEF\u5F84\u65E0\u6548");
}
async function recognizeMeal(body, env, source, requestId) {
  const text = typeof body?.text === "string" ? body.text.trim().slice(0, 1500) : "";
  const image = normalizeImage(body?.imageDataUrl);
  if (!text && !image) throw new Error("\u7F3A\u5C11\u9910\u98DF\u5185\u5BB9");
  if (isExplicitUrgent(text)) return urgentOnly(requestId);
  const config = qwenConfig(env);
  let parsed;
  let stub = false;
  if (!config.enabled) {
    stub = true;
    parsed = image && !text ? stubImageItems() : stubParseText(text || "\u7C73\u996D\u548C\u9E21\u86CB");
  } else {
    const content = await qwenChat({
      config,
      model: image ? config.visionModel : config.textModel,
      messages: mealMessages({ text, image, source })
    });
    parsed = readModelItems(extractJson(content));
  }
  const boohee = booheeFromEnv(env);
  const items = (await Promise.all(parsed.map((item) => resolveRecordedItem(item, source, boohee, { allowSearch: true })))).filter((item) => item.inputName || item.name);
  if (!items.length) throw new Error("\u6CA1\u6709\u8BC6\u522B\u51FA\u98DF\u7269");
  const lookedUp = items.some((item) => item.nutrition?.source === "\u8584\u8377\u5065\u5EB7" || item.candidates?.some((candidate) => String(candidate.id).startsWith("boohee:")));
  const notice = stub ? "\u672A\u914D\u7F6E DASHSCOPE_API_KEY\uFF0C\u8FD9\u6B21\u7531\u6D4B\u8BD5\u66FF\u8EAB\u62C6\u5206\u98DF\u7269\u548C\u5206\u91CF\u3002\u8BF7\u6838\u5BF9\u540E\u518D\u4FDD\u5B58\u3002" : "\u98DF\u7269\u540D\u548C\u5206\u91CF\u6765\u81EA\u5343\u95EE\u3002\u70ED\u91CF\u6309\u5DF2\u5339\u914D\u7684\u6570\u636E\u8BA1\u7B97\uFF0C\u6A21\u578B\u7ED9\u51FA\u7684\u8425\u517B\u6570\u5B57\u4E0D\u4F1A\u88AB\u91C7\u7528\u3002";
  return {
    requestId,
    mode: "meal_draft",
    stub,
    notice: lookedUp ? `${notice} \u672C\u5730\u8868\u6CA1\u6709\u7684\u98DF\u7269\u540D\u79F0\u5DF2\u53D1\u7ED9\u8584\u8377\u5065\u5EB7\u67E5\u8BE2\u3002` : notice,
    items
  };
}
async function calculateItems(body, source, requestId, env = {}) {
  const text = typeof body?.text === "string" ? body.text : "";
  if (isExplicitUrgent(text)) return urgentOnly(requestId);
  if (!Array.isArray(body?.items) || body.items.length > 12) throw new Error("\u98DF\u7269\u9879\u65E0\u6548");
  const boohee = booheeFromEnv(env);
  const items = await Promise.all(body.items.map((item) => resolveRecordedItem({
    name: item?.name || item?.inputName,
    inputName: item?.inputName,
    foodId: item?.foodId,
    grams: item?.grams,
    portionLabel: item?.portionLabel,
    forceUnestimated: item?.forceUnestimated === true
  }, source, boohee, { trustFoodId: Boolean(item?.foodId) && item?.forceUnestimated !== true, allowSearch: true })));
  return { requestId, mode: "calculated", items };
}
async function buildReport(body, env, source, requestId) {
  const texts = collectTexts(body);
  if (texts.some(isExplicitUrgent)) return urgentOnly(requestId);
  const meals = await recomputeMeals(body?.meals, source, booheeFromEnv(env));
  if (!meals.length) return { requestId, mode: "empty", text: "\u4ECA\u5929\u8FD8\u6CA1\u6709\u8BB0\u5F55\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u751F\u6210\u4E00\u4EFD\u62A5\u544A\u3002", totals: null, advice: "", adviceKept: false };
  const totals = sumNutrition(meals.flatMap((meal) => meal.items));
  const targets = cleanTargets(body?.targets);
  const caution = inferCaution(texts, body?.flagsConfirmed === true ? body.flags : {});
  const allowed = collectAllowedNumbers(totals, targets);
  const config = qwenConfig(env);
  let advice = "";
  let adviceKept = false;
  let stub = !config.enabled;
  if (!totals.counted && totals.skipped) {
    advice = programAdvice({ totals, targets, caution });
    adviceKept = true;
    stub = true;
  } else if (!config.enabled) {
    advice = programAdvice({ totals, targets, caution });
    const checked = sanitizeAdvice(advice, allowed);
    advice = checked.text;
    adviceKept = checked.kept;
  } else {
    try {
      const content = await qwenChat({
        config,
        model: config.textModel,
        messages: [{ role: "system", content: '\u4F60\u53EA\u6839\u636E\u7ED9\u5B9A\u7684\u5408\u8BA1\u5199\u4E00\u4E24\u53E5\u4E2D\u6587\u5EFA\u8BAE\u3002\u4E0D\u8981\u65B0\u589E\u6570\u5B57\u3001\u98DF\u7269\u6216\u83DC\u8C31\u3002\u4E0D\u8981\u9F13\u52B1\u6781\u7AEF\u5C11\u5403\uFF0C\u4E0D\u8981\u63D0\u4F9B\u6CBB\u7597\u65B9\u6848\u3002\u53EA\u8FD4\u56DE JSON\uFF1A{"advice":"..."}' }, { role: "user", content: JSON.stringify({ totals, targets: targets.confirmed ? targets : null, caution }) }]
      });
      const checked = sanitizeAdvice(extractJson(content).advice, allowed);
      advice = checked.text;
      adviceKept = checked.kept;
      stub = false;
    } catch {
      advice = "";
      adviceKept = false;
    }
  }
  return {
    requestId,
    mode: "report",
    stub,
    totals,
    targets: targets.confirmed ? targets : null,
    caution,
    advice,
    adviceKept,
    adviceNote: adviceKept ? "" : "\u8FD9\u53E5\u5EFA\u8BAE\u6CA1\u6709\u901A\u8FC7\u6838\u5BF9\uFF0C\u5DF2\u9690\u85CF\u3002\u4E0A\u9762\u7684\u6570\u5B57\u6765\u81EA\u98DF\u7269\u8868\u8BA1\u7B97\u3002",
    skipped: meals.flatMap((meal) => meal.items).filter((item) => !item.nutrition).map((item) => item.name)
  };
}
async function buildRecommendation(body, env, source, requestId) {
  const texts = collectTexts(body);
  if (texts.some(isExplicitUrgent)) return urgentOnly(requestId);
  const meals = await recomputeMeals(body?.meals, source, booheeFromEnv(env));
  const totals = sumNutrition(meals.flatMap((meal) => meal.items));
  const targets = cleanTargets(body?.targets);
  const caution = inferCaution(texts, body?.flagsConfirmed === true ? body.flags : {});
  const excludeIds = Array.isArray(body?.excludeIds) ? body.excludeIds.filter((id) => typeof id === "string").slice(0, 30) : [];
  const [recipe] = chooseRecipes({ recipes: source.recipes, totals, targets, caution, excludeIds, limit: 1 });
  if (!recipe) {
    return { requestId, mode: "recommendation", recipe: null, reason: "\u98DF\u8C31\u5E93\u91CC\u6CA1\u6709\u66F4\u5408\u9002\u7684\u4E00\u9053\u3002\u53EF\u4EE5\u4ECE\u73B0\u6709\u98DF\u8C31\u91CC\u53E6\u9009\uFF0C\u8FD9\u91CC\u4E0D\u4F1A\u65B0\u7F16\u4E00\u9053\u83DC\u3002", reasonKept: true, reasonSource: "program", empty: true };
  }
  const allowed = [...collectAllowedNumbers(totals, targets), recipe.nutrition.kcal, recipe.nutrition.protein, recipe.nutrition.fat, recipe.nutrition.carb];
  const config = qwenConfig(env);
  let reason = "";
  let reasonKept = false;
  let reasonSource = "dropped";
  if (!config.enabled) {
    const checked = sanitizeReason(programReason(recipe, { totals, targets, caution }), recipe, source.recipes, allowed);
    reason = checked.text;
    reasonKept = checked.kept;
    reasonSource = "program";
  } else {
    try {
      const content = await qwenChat({
        config,
        model: config.textModel,
        messages: [{ role: "system", content: '\u98DF\u8C31\u5DF2\u7ECF\u9009\u5B9A\u3002\u53EA\u7528\u4E00\u4E24\u53E5\u8BDD\u89E3\u91CA\u4E3A\u4EC0\u4E48\u662F\u8FD9\u9053\u3002\u4E0D\u8981\u63D0\u5230\u5176\u4ED6\u83DC\u540D\uFF0C\u4E0D\u8981\u7F16\u9020\u505A\u6CD5\u6216\u8425\u517B\u6570\u5B57\u3002\u53EA\u8FD4\u56DE JSON\uFF1A{"reason":"..."}' }, { role: "user", content: JSON.stringify({ recipe: { id: recipe.id, name: recipe.name, nutrition: recipe.nutrition }, totals, targets: targets.confirmed ? targets : null, caution }) }]
      });
      const checked = sanitizeReason(extractJson(content).reason, recipe, source.recipes, allowed);
      reason = checked.text;
      reasonKept = checked.kept;
      reasonSource = checked.kept ? "model" : "dropped";
    } catch {
      reason = "";
      reasonKept = false;
    }
  }
  return {
    requestId,
    mode: "recommendation",
    empty: false,
    recipe: publicRecipe(recipe, source),
    reason,
    reasonKept,
    reasonSource,
    reasonNote: reasonKept ? "" : "\u63A8\u8350\u7406\u7531\u6CA1\u6709\u901A\u8FC7\u6838\u5BF9\uFF0C\u5DF2\u9690\u85CF\u3002\u8FD9\u9053\u83DC\u4ECD\u6765\u81EA\u98DF\u8C31\u5E93\uFF0C\u8425\u517B\u662F\u6309\u539F\u6599\u7B97\u7684\u3002"
  };
}
function mealMessages({ text, image, source }) {
  const names = source.foods.map((food) => food.aliases.length ? `${food.name}\uFF08${food.aliases.join("\u3001")}\uFF09` : food.name).join("\u3001");
  const instruction = `\u53EA\u628A\u9910\u98DF\u62C6\u6210\u98DF\u7269\u540D\u79F0\u3001\u5206\u91CF\u8BF4\u6CD5\u548C\u4F30\u8BA1\u514B\u6570\u3002\u4E0D\u8981\u8F93\u51FA\u70ED\u91CF\u6216\u8425\u517B\u7D20\u3002\u540D\u79F0\u5C3D\u91CF\u6CBF\u7528\u8FD9\u4E9B\u98DF\u7269\uFF1A${names}\u3002\u5BF9\u4E0D\u4E0A\u5C31\u4FDD\u7559\u770B\u5230\u7684\u540D\u5B57\u3002\u53EA\u8FD4\u56DE JSON\uFF1A{"items":[{"name":"","portionLabel":"","grams":0}]}`;
  if (!image) return [{ role: "system", content: instruction }, { role: "user", content: text }];
  return [{ role: "system", content: instruction }, { role: "user", content: [{ type: "image_url", image_url: { url: image } }, { type: "text", text: text || "\u8BF7\u8BC6\u522B\u8FD9\u5F20\u9910\u98DF\u7167\u7247\u91CC\u7684\u98DF\u7269\u548C\u5927\u81F4\u514B\u6570\u3002" }] }];
}
async function recomputeMeals(meals, source, boohee) {
  if (!Array.isArray(meals)) return [];
  const resolved = [];
  for (const meal of meals.slice(0, 12)) {
    const raws = Array.isArray(meal?.items) ? meal.items.slice(0, 12) : [];
    const items = await Promise.all(raws.map((item) => resolveRecordedItem({
      name: item?.name,
      inputName: item?.inputName,
      foodId: item?.status === "matched" || item?.foodId ? item.foodId : "",
      grams: item?.grams,
      portionLabel: item?.portionLabel
    }, source, boohee, { trustFoodId: Boolean(item?.foodId) && item?.status !== "unestimated" && item?.status !== "ambiguous", allowSearch: false })));
    if (items.length) resolved.push({ items });
  }
  return resolved;
}
async function resolveRecordedItem(raw, source, boohee, options = {}) {
  const code = booheeCodeFromId(raw?.foodId);
  if (options.trustFoodId && code) return resolveBooheeCode(raw, boohee, code);
  const local = resolveMealItem(raw, source, options);
  if (!(options.allowSearch && local.status === "unestimated" && local.reason === "no_match")) return local;
  const outcome = await boohee.matchName(local.inputName);
  if (outcome.status === "matched") return withBooheeFood(local, outcome.food, outcome.candidates);
  if (outcome.status === "ambiguous") return { ...local, status: "ambiguous", reason: "ambiguous", foodId: null, nutrition: null, candidates: outcome.candidates };
  if (outcome.status === "no_key") return { ...local, reason: "no_key" };
  if (outcome.status === "failed") return { ...local, reason: "lookup_failed" };
  return local;
}
async function resolveBooheeCode(raw, boohee, code) {
  const found = await boohee.foodByCode(code);
  const base = resolveMealItem({ ...raw, forceUnestimated: true }, { foods: [], getFood: () => null }, {});
  if (found.status === "ok") return withBooheeFood({ ...base, inputName: raw.inputName || raw.name || found.food.name, grams: numberGrams(raw.grams) || base.grams, portionLabel: raw.portionLabel || base.portionLabel }, found.food, []);
  return { ...base, inputName: String(raw.inputName || raw.name || "").trim().slice(0, 40), name: String(raw.name || raw.inputName || "").trim().slice(0, 40) || base.name, reason: found.status === "no_key" ? "no_key" : "lookup_failed" };
}
function withBooheeFood(local, food, candidates) {
  let nutrition = null;
  try {
    nutrition = calculateNutrition(food, local.grams);
  } catch {
    nutrition = null;
  }
  if (!nutrition) return { ...local, status: "unestimated", reason: "bad_grams", foodId: null, nutrition: null, candidates };
  return { ...local, name: food.name, status: "matched", reason: "matched", foodId: food.id, nutrition, candidates };
}
function numberGrams(value) {
  const grams = Number(value);
  return Number.isFinite(grams) ? Math.round(grams) : null;
}
function publicRecipe(recipe, source) {
  return publicCatalog({ ...source, recipes: [recipe], foods: source.foods, getFood: source.getFood }).recipes[0];
}
function cleanTargets(input) {
  try {
    return cleanDietSettings({ targets: input, flagsConfirmed: false }).targets;
  } catch {
    throw new Error("\u76EE\u6807\u65E0\u6548");
  }
}
function collectTexts(body) {
  const texts = [];
  if (typeof body?.text === "string") texts.push(body.text);
  if (Array.isArray(body?.texts)) texts.push(...body.texts.filter((item) => typeof item === "string"));
  if (Array.isArray(body?.meals)) {
    for (const meal of body.meals) if (typeof meal?.rawText === "string") texts.push(meal.rawText);
  }
  return texts.map((item) => item.slice(0, 1500));
}
function cleanId(id) {
  if (typeof id !== "string" || !/^[\w-]{1,100}$/.test(id)) throw new Error("\u8BF7\u6C42\u7F16\u53F7\u65E0\u6548");
  return id;
}
function normalizeImage(value) {
  if (value == null || value === "") return "";
  if (typeof value !== "string") throw new Error("\u7167\u7247\u683C\u5F0F\u65E0\u6548");
  const compact = value.replace(/\s/g, "");
  if (compact.length > 18e5) throw new Error("size");
  if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(compact)) throw new Error("\u7167\u7247\u683C\u5F0F\u65E0\u6548");
  return compact;
}
function urgentOnly(requestId) {
  return { ...urgentResponse(requestId), items: [], recipe: null, advice: "", planDraft: void 0 };
}
async function assertDietResult(result, source, boohee = booheeFromEnv({})) {
  if (!result || result.mode === "urgent_help") {
    if (result?.text !== urgentText || result.items?.length || result.recipe || result.advice) throw new Error("\u7D27\u6025\u6C42\u52A9\u56DE\u590D\u672A\u901A\u8FC7\u6821\u9A8C");
    return result;
  }
  if (result.mode === "meal_draft" || result.mode === "calculated") {
    for (const item of result.items) await assertItem(item, source, boohee);
  }
  if (result.mode === "recommendation" && result.recipe) {
    if (!source.getRecipe(result.recipe.id) || source.getRecipe(result.recipe.id).blockedByHerbs) throw new Error("\u63A8\u8350\u4E0D\u5728\u98DF\u8C31\u5E93\u4E2D");
  }
  if (result.advice && result.adviceKept === false) throw new Error("\u672A\u901A\u8FC7\u6838\u5BF9\u7684\u5EFA\u8BAE\u4E0D\u80FD\u8FD4\u56DE");
  if (result.reason && result.reasonKept === false) throw new Error("\u672A\u901A\u8FC7\u6838\u5BF9\u7684\u7406\u7531\u4E0D\u80FD\u8FD4\u56DE");
  return result;
}
async function assertItem(item, source, boohee) {
  if (item.nutrition && item.status !== "matched") throw new Error("\u65E0\u6CD5\u4F30\u7B97\u7684\u98DF\u7269\u4E0D\u80FD\u5E26\u70ED\u91CF");
  if (item.status !== "matched") return;
  const again = await resolveRecordedItem({ name: item.name, foodId: item.foodId, grams: item.grams, portionLabel: item.portionLabel }, source, boohee, { trustFoodId: true, allowSearch: false });
  if (!again.nutrition || again.nutrition.kcal !== item.nutrition.kcal || again.nutrition.protein !== item.nutrition.protein || again.nutrition.fat !== item.nutrition.fat || again.nutrition.carb !== item.nutrition.carb) {
    throw new Error("\u70ED\u91CF\u6821\u9A8C\u672A\u901A\u8FC7");
  }
}
async function readJson(request, maxBytes) {
  if (Number(request.headers.get("content-length")) > maxBytes) throw new Error("size");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("input");
  const chunks = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxBytes) {
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

// src/server/index.js
var MAX_BYTES = 48 * 1024;
var buckets = /* @__PURE__ */ new Map();
var json2 = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
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
    const diet = url.pathname.startsWith("/api/diet");
    if (!diet && url.pathname !== "/api/agent") return env.ASSETS ? env.ASSETS.fetch(request) : new Response("Not found", { status: 404 });
    if (request.headers.get("origin") && request.headers.get("origin") !== url.origin) return json2({ error: "\u8BF7\u6C42\u6765\u6E90\u4E0D\u5339\u914D" }, 403);
    if (request.method !== "POST" && !(diet && request.method === "GET")) return json2({ error: "\u8BF7\u4F7F\u7528 POST \u8BF7\u6C42" }, 405);
    if (request.method === "POST" && !diet && !request.headers.get("content-type")?.startsWith("application/json")) return json2({ error: "\u8BF7\u6C42\u9700\u4E3A JSON" }, 415);
    const key = request.headers.get("cf-connecting-ip") || "local";
    const now = Date.now();
    for (const [key2, value] of buckets) if (now - value.start > 6e4) buckets.delete(key2);
    const bucket = buckets.get(key) || { start: now, count: 0 };
    bucket.count++;
    if (buckets.size >= 1e3 && !buckets.has(key)) return json2({ error: "\u670D\u52A1\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" }, 429);
    buckets.set(key, bucket);
    if (bucket.count > 40) return json2({ error: "\u8BF7\u6C42\u8F83\u591A\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" }, 429);
    try {
      return diet ? handleDiet(request, env, url) : json2(respond(await boundedJSON(request)));
    } catch (error) {
      return json2({ error: error.message === "size" ? "\u8BF7\u6C42\u5185\u5BB9\u8FC7\u957F" : "\u8BF7\u6C42\u6216\u56DE\u590D\u6821\u9A8C\u672A\u901A\u8FC7" }, error.message === "size" ? 413 : 400);
    }
  }
};
export {
  index_default as default
};
