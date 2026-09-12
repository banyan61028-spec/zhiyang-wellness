/** Mock adapter. Replace this exported interface with a same-origin server API later.
 * Never place provider API keys in this browser module.
 * Input: { message, profile, history, scenario }; output: { scenario, text, choices?, recipes?, plan?, safety? }.
 * All outputs here are scripted demonstrations, not clinical assessments.
 */
export async function getAgentReply({message,scenario='general',profile={}}){
 await new Promise(r=>setTimeout(r,550));
 const text=String(message).slice(0,1500);
 if(/呼吸困难|无法吞咽|喘不过气|胸痛|呕血|自杀|不想活/.test(text))return{scenario:'safety',safety:true,text:'你提到的情况需要优先寻求及时的专业帮助。请联系当地急救服务或就近就医，不要等待茶饮或饮食调整起效。\n此处演示高风险内容的分流，不构成诊断。'};
 if(/怀孕|孕妇|孕期|哺乳|未成年|儿童|糖尿病|肾病|吃药|服药|药物|过敏|便血|腹痛|突然瘦|不明原因|无意.*瘦/.test(text))return{scenario:'boundary',text:'这类情况需要结合更完整的信息与专业评估。这个 Demo 暂不继续生成个人饮食目标或草本茶方案。\n你仍可以浏览一般生活知识，或把关心的问题整理后咨询医生、药师或营养专业人员。',choices:['了解一般饮食搭配']};
 if(/体质/.test(text))return{scenario:'general',text:'中医体质常用九种基本类型。你可以先看科普或体验测评的页面流程。\n本 Demo 的五题问答不是正式量表，展示的结果卡明确为固定示例，不是你的体质判定。',constitution:true};
 let intent=scenario;
 if(/减肥|减重|胖|低热量|控制饮食/.test(text))intent='loss';
 else if(/增重|增肥|太瘦/.test(text))intent='gain';
 else if(/睡|作息|熬夜/.test(text))intent='sleep';
 else if(/便秘|排便/.test(text))intent='bowel';
 else if(/嗓|咽喉/.test(text))intent='throat';
 else if(/茶|湿气|祛湿|消肿/.test(text))intent='tea';
 else if(/三餐|饮食搭配|食物搭配/.test(text))intent='balance';
 const follow=/外食|做饭|示例|搭配|简单|换|可以|好的|不喜欢/.test(text);
 if((intent==='loss'||intent==='gain')&&!follow&&scenario!==intent)return{scenario:intent,text:intent==='loss'?'可以，我们先从三餐怎么安排聊起。\n正式咨询会先了解是否适合调整体重、近期变化和饮食习惯。这次先体验一个一般成年人的示例：你平时更多是自己做饭，还是在外吃？':'可以，我们可以一起看正餐和加餐怎么安排。\n正式咨询会先了解体重变化、食欲和是否适合自行调整。这里先演示一般成年人的饮食搭配，你平时自己做饭多吗？',choices:['我经常在外吃','我主要自己做饭','先看方案示例']};
 const goal=profile.goal||'均衡饮食';
 if(intent==='balance')return{scenario:'balance',text:'可以，先看看一份家常三餐的搭配示例。主食、蔬菜和适合自己的蛋白质食物都可以有位置，食材也可以替换。\n这里没有设置减重或增重目标，份量需要结合你的实际情况调整。',plan:{id:'balance-plan',title:'我的家常三餐参考',goal:'均衡饮食',meals:[{label:'早餐',value:'小米粥、鸡蛋和一份水果'},{label:'午餐',value:/换|豆腐|不喜欢/.test(text)?'菌菇豆腐、时蔬与米饭':'清蒸鱼、时蔬与米饭'},{label:'晚餐',value:'菌菇豆腐、蔬菜与适合自己的主食份量'}],note:'一般饮食搭配示例，尚未计算个人能量与营养需求。'},recipes:['lunch','dinner'],choices:['午餐换成豆腐搭配','再看看茶饮参考']};
 if(intent==='loss'||intent==='gain'){
  const gain=intent==='gain';const outside=/外食|在外/.test(text)||(!/自己做饭/.test(text)&&profile.habit==='主要在外吃饭');const alternative=/换|不喜欢|豆腐/.test(text);
  return{scenario:intent,text:gain?'先用“规律正餐 + 合适加餐”的方式，体验一份饮食安排。下面未计算你的个人能量目标，不能当作定量增重处方。':'先用“正餐搭配 + 减少不必要的额外摄入”的方式，体验一份饮食安排。这里没有按你的身体数据计算热量，也不建议极端节食。',plan:{id:gain?'gain-plan':'loss-plan',title:gain?'我的增重饮食参考':'我的体重管理饮食参考',goal:gain?'健康增重':'健康减重',meals:[{label:'早餐',value:gain?'燕麦、奶或适合的替代品，再搭配鸡蛋':'山药小米粥，搭配鸡蛋和水果'},{label:'午餐',value:alternative?'菌菇豆腐、绿叶菜和一份主食':outside?'在现有菜品中，搭配主食、蔬菜和一份适合的蛋白质食物':'清蒸鱼、时蔬与米饭'},{label:gain?'加餐':'晚餐',value:gain?'正餐之外，可选燕麦酸奶等加餐':'菌菇豆腐、蔬菜与适合自己的主食份量'}],note:outside?'已演示“在外吃”的调整方式。':'示例搭配，食材与份量仍需结合个人情况核对。'},recipes:[alternative?'dinner':'lunch',gain?'oats':'dinner'],choices:['午餐换成豆腐搭配','再看看茶饮参考']};
 }
 if(intent==='tea')return{scenario:intent,text:'可以先看看这款陈皮红枣温饮的风味示例。\n“湿气重”不能直接作为配方依据。这一版只展示固定的茶饮内容，不根据一句描述判断体质，也不自行配药。茶饮不承担减脂、消肿或治疗作用。',recipes:['tea'],choices:['看看我的九种体质参考','我想调整三餐']};
 if(intent==='sleep')return{scenario:intent,text:'我们先给今晚留一个容易做到的小调整。这里展示的是生活安排，不评估失眠或其他疾病。',plan:{id:'sleep-plan',title:'我的晚间起居参考',goal:'规律作息',meals:[{label:'先准备',value:'选择一个符合实际生活的睡前准备时间'},{label:'少惦记',value:'把明天要做的事记下来'},{label:'再调整',value:'第二天记录是否做得到，再调整安排'}],note:'持续睡眠困扰需要专业帮助。'},choices:['今天很忙，安排简单一点','看看饮食搭配']};
 if(intent==='bowel')return{scenario:intent,text:'先了解排便变化的时间、饮食和饮水习惯，会比直接推荐某种茶更有帮助。\n一般生活参考包括：在耐受的情况下逐步增加食物中的纤维，保持适合自己的饮水、活动和如厕习惯。若有便血、持续腹痛、体重无意下降或问题反复，请咨询医生。',topic:'bowel',choices:['看看相关食物搭配']};
 if(intent==='throat')return{scenario:intent,text:'这里可以提供一般生活照护的参考：适当饮水、选择可以舒适吞咽的食物、休息并避开烟雾刺激。\n如果呼吸困难、无法吞咽或迅速加重，请立即寻求医疗帮助。这个 Demo 不判断原因，也不提供药物或草药治疗。',topic:'throat',choices:['查看嗓子不舒服专题']};

 return{scenario:'general',text:`我看到了你的问题。当前是预设场景的模拟助手，暂时不能像真实大模型一样理解所有问题。\n你可以先体验健康减重、健康增重、茶饮或作息咨询。你的档案目标是“${goal}”。`,choices:['我想健康减重','我想健康增重','推荐一杯养生茶','我最近作息有点乱']};
}
