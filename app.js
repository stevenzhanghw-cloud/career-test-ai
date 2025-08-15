// ====== 扩展题库（18题） ======
const questions = [
  // S 社交/销售/沟通
  "我喜欢与人交流并帮助别人解决问题。",
  "我在公共场合表达或说服他人时感到自如。",
  "我乐于组织活动、协调资源推进事情。",
  // R 现实/动手/现场
  "我喜欢动手制作、修理或安装东西。",
  "我喜欢在不同环境（户外/现场）处理具体事务。",
  "我对工具、设备、规范操作感兴趣。",
  // I 调研/分析/逻辑
  "我喜欢分析数据、解决复杂的逻辑问题。",
  "我享受独立钻研新知识并形成结构化结论。",
  "我愿意为了找到答案而耐心查阅资料和做实验。",
  // A 艺术/创意/表达
  "我喜欢创作（写作、绘画、音乐、设计等）。",
  "我对审美、排版或交互体验比较敏感。",
  "我愿意把抽象想法变成作品或原型。",
  // C 常规/流程/稳定
  "我喜欢在稳定的规则和流程下工作。",
  "我做事细致谨慎，愿意反复核对。",
  "我偏好明确目标、计划和可预测的节奏。",
  // 通用价值/环境
  "我希望工作有较高的收入潜力，即使压力较大。",
  "我更享受团队合作，而不是独立完成任务。",
  "我愿意不断学习新知识以适应职业变化。"
];

// 分组：RIASEC 映射（含额外题）
const groups = {
  S: [0,1,2,16],    // 社交/销售/团队
  R: [3,4,5],       // 现实/动手
  I: [6,7,8,17],    // 调研/分析/持续学习
  A: [9,10,11],     // 艺术/创意
  C: [12,13,14,15]  // 常规/流程/收入偏好
};

// 扩展职业库（含前端开发、护理、营销、项目管理等）
const groupMeta = {
  S: {name:"社交/销售", careers:["客户经理","销售顾问","职业教练","社区运营","市场专员","项目经理"]},
  R: {name:"现实/动手", careers:["电工/技工","施工管理","物流操作","设备维护","护理"]},
  I: {name:"调研/分析", careers:["数据分析师","业务分析","测试工程师","前端开发"]},
  A: {name:"艺术/创意", careers:["平面设计","UI/UX","新媒体/短视频","文案/编辑"]},
  C: {name:"常规/流程", careers:["财务/出纳","行政/运营","供应链文员","报关/记录管理员","项目经理"]}
};

// ====== 知识库（新增条目） ======
const KB = {
  "前端开发": {
    intro: "用 HTML/CSS/JavaScript 构建网站与Web应用前端界面。",
    skills: ["HTML/CSS/JS","Git","React/Vue","API对接","基本调试"],
    steps: [
      "第1周：HTML/CSS布局与响应式；",
      "第2周：JS基础（DOM/事件/异步）+ Git；",
      "第3周：React或Vue入门，做组件化页面；",
      "第4周：调用公开API做一个小应用并部署到Netlify/Vercel。"
    ],
    keywords: ["front end developer","javascript","react","vue"]
  },
  "护理": {
    intro: "在医疗场景为患者提供护理与照护，强调专业与同理心（需资质）。",
    skills: ["基础医学与护理","病患沟通","应急处理","职业伦理"],
    steps: ["查询本地护士注册与培训路径；","完成课程/临床实习；","准备资质考试；","优先从入门岗位积累经验。"],
    keywords: ["nurse","registered nurse","healthcare"]
  },
  "市场专员": {
    intro: "根据产品与受众制定营销方案，执行内容/活动/投放。",
    skills: ["文案与定位","数据看板","广告平台基础","活动策划"],
    steps: ["梳理目标人群与价值主张；","搭建内容日历；","投放A/B测试；","复盘数据优化。"],
    keywords: ["marketing specialist","digital marketing"]
  },
  "项目经理": {
    intro: "协调多方资源按期按质交付项目，强调沟通与计划。",
    skills: ["范围/进度/成本管理","风险控制","沟通协调","工具（Jira/Asana）"],
    steps: ["学习PM基础框架（如PMP）","搭建甘特/看板","小项目实战与复盘","形成模板与报告"],
    keywords: ["project manager","scrum master"]
  },
  "数据分析师": {
    intro: "处理与分析数据，为业务提供决策支持。",
    skills: ["Excel/Sheets","SQL","Python（Pandas）","Tableau/Power BI"],
    steps: ["Excel清洗","SQL查询","Pandas分析","做可视化仪表板项目"],
    keywords: ["data analyst","business intelligence"]
  },
  "UI/UX": {
    intro: "设计界面与交互，让产品更易用、美观。",
    skills: ["Figma","用户研究","原型设计","可用性测试"],
    steps: ["Figma基础","临摹规范","做完整原型","可用性测试"],
    keywords: ["ui designer","ux designer","product designer"]
  },
  "职业教练": {
    intro: "帮助他人职业规划与求职策略。",
    skills: ["沟通/共情","结构化分析","简历/面试辅导","目标拆解"],
    steps: ["打磨方法论","模拟咨询","制作模板","做公益案例"],
    keywords: ["career coach","career counselor"]
  },
  "电工/技工": {
    intro: "以实操为主的技术岗位，强调安全与标准。",
    skills: ["工具使用","电路/规范","安全意识","持证要求"],
    steps: ["了解认证与规范","跟随师傅实操","完成项目","准备考试"],
    keywords: ["electrician","apprentice","technician"]
  },
  "平面设计": {
    intro: "为品牌/营销制作视觉素材与版式。",
    skills: ["PS/AI","色彩/版式","品牌规范","交付格式"],
    steps: ["作品集","临摹拆解","接小单","迭代风格"],
    keywords: ["graphic designer","branding"]
  },
  "财务/出纳": {
    intro: "负责记录、核对与报表，注重准确与流程。",
    skills: ["记账软件","Excel","财税基础","合规意识"],
    steps: ["账务流程","掌握软件","编制报表","了解报税规范"],
    keywords: ["bookkeeper","accounting clerk"]
  },
  "物流操作": {
    intro: "在仓储与运输环节进行收发、分拣、调度。",
    skills: ["流程规范","设备操作","时间管理","安全意识"],
    steps: ["熟悉仓储流程","练习设备操作","KPI看板","安全培训"],
    keywords: ["warehouse","logistics"]
  }
};

// ====== 状态 & 工具 ======
let idx=0; let answers = new Array(questions.length).fill(null);
let resultCache = null; // 供AI使用
const $ = (id)=>document.getElementById(id);

// 对话额度与升级
const aiState = {
  freeLimit: 5,
  used: Number(localStorage.getItem("free_used")||0),
  unlimited: localStorage.getItem("unlimited")==="1",
  llmReady: false
};
function updateTurnsUI(){
  const left = aiState.unlimited ? "∞" : Math.max(aiState.freeLimit - aiState.used, 0);
  $("#turnsLeft").textContent = left;
}

// ====== 页面切换 ======
function showIntro(){ $("#screen-intro").classList.remove("hidden"); $("#screen-quiz").classList.add("hidden"); $("#screen-result").classList.add("hidden"); }
function showQuiz(){ $("#screen-intro").classList.add("hidden"); $("#screen-quiz").classList.remove("hidden"); $("#screen-result").classList.add("hidden"); renderQuestion(); }
function showResult(){
  $("#screen-intro").classList.add("hidden"); $("#screen-quiz").classList.add("hidden"); $("#screen-result").classList.remove("hidden");
  const r = computeScores(); resultCache = r;
  renderBars(r.sorted); renderRadar(r.totals); renderSummary(r); renderJobs(r);
  // 打开AI欢迎
  openAIPanel();
  botSay(`我已读取你的测评结果。你的突出方向是【${groupMeta[r.top2[0].k].name}】，推荐职业：${r.recs.slice(0,3).join("、")}。可以问我：入门路线、转行、简历、面试、学习资源、职位搜索。`);
}

// ====== 渲染题目 ======
function renderQuestion(){
  $("#qIndex").textContent = idx+1; $("#qTotal").textContent = questions.length;
  $("#qText").textContent = questions[idx];
  document.querySelectorAll(".opt").forEach(b=>b.classList.remove("active"));
  const val = answers[idx]; if (val) document.querySelector(`.opt[data-score="${val}"]`)?.classList.add("active");
  $("#progressBar").style.width = Math.round(idx/questions.length*100) + "%";
}
function pick(score){ answers[idx]=Number(score); document.querySelectorAll(".opt").forEach(b=>b.classList.remove("active")); document.querySelector(`.opt[data-score="${score}"]`)?.classList.add("active"); }
function next(){ if (answers[idx]==null){ alert("请先选择分值（1-5）。"); return; } if (idx<questions.length-1){ idx++; renderQuestion(); } else { showResult(); } }
function prev(){ if (idx>0){ idx--; renderQuestion(); } }

// ====== 结果计算与渲染 ======
function computeScores(){
  const totals={S:0,R:0,I:0,A:0,C:0}; const maxPerQ=5;
  for (const g in groups){
    const sum = groups[g].reduce((acc,i)=>acc+(answers[i]||0),0);
    const max = groups[g].length*maxPerQ; totals[g] = Math.round(sum/max*100);
  }
  const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);
  const top2 = sorted.slice(0,2).map(([k,v])=>({k,v}));
  const recs=[];
  for (const {k} of top2){ for (const c of groupMeta[k].careers){ if (recs.length<3 && !recs.includes(c)) recs.push(c);}}
  for (const [k] of sorted.slice(2)){ for (const c of groupMeta[k].careers){ if (recs.length<3 && !recs.includes(c)) recs.push(c);}}
  return {totals,sorted,top2,recs};
}
function renderBars(sorted){
  const bars=$("#scoreBars"); bars.innerHTML="";
  for (const [k,score] of sorted){
    const row=document.createElement("div"); row.className="bar";
    row.innerHTML = `<div class="bar-label">${groupMeta[k].name}</div>
    <div class="bar-track"><div class="bar-fill" style="width:${score}%"></div></div>
    <div class="bar-val">${score}%</div>`;
    bars.appendChild(row);
  }
}
function renderRadar(totals){
  const dims=["S","R","I","A","C"]; const size=320, cx=160, cy=160, radius=120;
  const levels=[.25,.5,.75,1], step=(Math.PI*2)/dims.length;
  const pts = dims.map((d,i)=>{ const ang=-Math.PI/2+i*step; const r=radius*(totals[d]/100); return [cx+r*Math.cos(ang), cy+r*Math.sin(ang)];});
  const polygon = pts.map(p=>p.join(",")).join(" ");
  let rings=""; for (const lv of levels){
    const rpts = dims.map((d,i)=>{ const ang=-Math.PI/2+i*step; const r=radius*lv; return [cx+r*Math.cos(ang), cy+r*Math.sin(ang)];}).map(p=>p.join(",")).join(" ");
    rings += `<polygon points="${rpts}" fill="none" stroke="#2b3442" stroke-dasharray="4,4"/>`;
  }
  let axes=""; for (let i=0;i<dims.length;i++){ const ang=-Math.PI/2+i*step; const x=cx+radius*Math.cos(ang), y=cy+radius*Math.sin(ang); axes+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#2b3442"/>`; }
  const labels = dims.map((d,i)=>{ const ang=-Math.PI/2+i*step; const x=cx+(radius+18)*Math.cos(ang), y=cy+(radius+18)*Math.sin(ang); return `<text x="${x}" y="${y}" fill="#a7f3d0" font-size="12" text-anchor="middle" dominant-baseline="middle">${groupMeta[d].name}</text>`;}).join("");
  const svg = `<svg viewBox="0 0 ${size} ${size}">${rings}${axes}<polygon points="${polygon}" fill="rgba(100,210,255,.2)" stroke="#64d2ff" stroke-width="2"/>${labels}</svg>`;
  $("#radar").innerHTML=svg;
}
function renderSummary(r){
  const [best]=r.top2;
  $("#summary").innerHTML=`
  <h3>你的职业倾向</h3>
  <p>最突出的方向：<strong>${groupMeta[best.k].name}</strong>（${best.v}%）</p>
  <h3>推荐尝试的职业</h3>
  <ol class="recs">${r.recs.map(x=>`<li>${x}</li>`).join("")}</ol>
  <h3>下一步建议</h3>
  <ul><li>查看目标职业的岗位要求，列出已具备/待补齐技能。</li>
  <li>制定4周学习计划（每周2-3个小目标）。</li>
  <li>用一个小项目/作品集证明能力。</li></ul>`;
}
function renderJobs(r){
  const city = $('#city').value || 'Calgary, AB';
  const div=$("#jobButtons"); div.innerHTML="";
  const top = r.recs.slice(0,3);
  for (const job of top){
    const indeed = `https://ca.indeed.com/jobs?q=${encodeURIComponent(job)}&l=${encodeURIComponent(city)}`;
    const linkedin = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job)}&location=${encodeURIComponent(city)}`;
    const el = document.createElement("div"); el.className="jobpair";
    el.innerHTML = `<span>${job}</span> <a class="btn" target="_blank" href="${indeed}">Indeed</a> <a class="btn" target="_blank" href="${linkedin}">LinkedIn</a>`;
    div.appendChild(el);
  }
}

// ====== AI 对话（真实LLM优先，本地兜底） ======
function addMsg(role, text){
  const box = $("#aiMessages");
  const div = document.createElement("div");
  div.className = "ai-bubble " + (role==="user"?"ai-user":"ai-bot");
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
function botSay(text){ setTimeout(()=>addMsg("bot", text), 200); }
function userSay(text){ addMsg("user", text); }

async function callLLM(question){
  try{
    const payload = {
      question,
      city: $('#city').value || 'Calgary, AB',
      scores: resultCache?.totals || null,
      recs: resultCache?.recs || []
    };
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('LLM HTTP '+res.status);
    const data = await res.json();
    if (data && data.answer) return data.answer;
    throw new Error('Invalid LLM payload');
  }catch(e){
    console.warn('LLM failed, fallback to local.', e);
    return null;
  }
}

// 本地兜底（关键词规则）
function localAdvice(userText){
  const r = resultCache;
  if (!r) return "请先完成上面的测评，再来咨询我喔。";
  const city = $('#city').value || 'Calgary, AB';
  const topGroup = groupMeta[r.top2[0].k].name;
  const topJobs = r.recs.slice(0,3);
  const lower = userText.toLowerCase();

  // 关键词触发
  if (/前端|frontend|react|vue/.test(lower)){
    const kb = KB["前端开发"];
    return `前端开发入门：
- 技能：${kb.skills.join("、")}
- 路线：${kb.steps.join("")}
- 关键词：${kb.keywords.join(", ")}
建议做一个小App并部署到Netlify/Vercel；职位搜索 “front end developer ${city}”。`;
  }
  if (/护理|护士|nurse/.test(lower)){
    const kb = KB["护理"];
    return `护理职业路径（需资质）：
- 核心：${kb.skills.join("、")}
- 步骤：${kb.steps.join("")}
- 关键词：${kb.keywords.join(", ")}
请查询本地注册要求与课程。`;
  }
  if (/市场|营销|marketing/.test(lower)){
    const kb = KB["市场专员"];
    return `市场专员入门：
- 能力：${kb.skills.join("、")}
- 实操：${kb.steps.join("")}
- 关键词：${kb.keywords.join(", ")}
先做一个活动落地或内容日历的小项目。`;
  }
  if (/项目经理|pm|project manager|scrum/.test(lower)){
    const kb = KB["项目经理"];
    return `项目经理路径：
- 核心：${kb.skills.join("、")}
- 实操：${kb.steps.join("")}
- 关键词：${kb.keywords.join(", ")}
建议从小项目练手，建立模板（WBS/看板/周报）。`;
  }

  // 通用规则（与V3类似）
  if (/入门|学习|起步|如何开始|how to start/.test(userText)){
    const target = topJobs[0];
    const kb = KB[target] || KB["数据分析师"];
    if (kb){
      return `基于你的倾向（${topGroup}），先从【${target}】入门：
- 需要技能：${kb.skills.join("、")}
- 4周路线：${kb.steps.join("")}
- 求职关键词：${kb.keywords.join(", ")}
建议做一个小项目并整理到作品集；搜索 “${target} ${city}”。`;
    }
  }
  if (/转行|零基础|没有经验|换行业|career change/.test(userText)){
    return `转行建议（结合你的倾向：${topGroup}）：
1) 先从【${topJobs.join(" / ")}】选1个切入；
2) 补齐入门技能+一个项目；
3) 简历突出可迁移能力（沟通/执行/自学/项目结果）；
4) 搜索 “${topJobs[0]} ${city}”，每周固定投递+复盘；
5) 给自己4–6周完成入门闭环。`;
  }
  if (/简历|resume|cv/.test(lower)){
    return `简历要点：顶部目标岗位+核心技能；STAR结构项目；关键词对齐JD；一页清晰；附作品集链接。`;
  }
  if (/面试|interview|问答|自我介绍/.test(lower)){
    return `面试准备：60秒自我介绍；3个代表项目；行为题（团队/冲突/压力）；反问（成功标准/前3个月目标）。`;
  }
  if (/薪资|工资|收入|salary|pay/.test(lower)){
    return `薪资受地区/经验/公司差异很大。建议用 Indeed/LinkedIn 搜索 “${topJobs[0]} ${city} salary range”，关注总包。`;
  }
  if (/课程|证书|certificate|cert/.test(lower)){
    return `学习资源：按目标职业补齐技能；证书可加分不必强求；优先做可展示项目；选课程看“项目含金量/作业反馈”。`;
  }
  if (/岗位|找工作|投递|招聘|职位|indeed|linkedin/.test(lower)){
    return `找工作路径：关键词 “${topJobs[0]} ${city}”；优先本地小公司；固定节奏投递与复盘；观察在职人士的技能与项目。`;
  }
  return `你的测评显示【${topGroup}】更突出，当前推荐：${topJobs.join("、")}。可以继续问我：入门路线、转行、简历、面试、课程、岗位搜索等。`;
}

// 发送逻辑（包含额度控制与兜底）
async function handleSend(){
  const t = $("#aiInput").value.trim(); if (!t) return;
  if (!aiState.unlimited && aiState.used >= aiState.freeLimit){
    openUpgrade(); return;
  }
  $("#aiInput").value="";
  userSay(t);
  if (!resultCache){ botSay("请先完成测评，我才能结合你的结果给出建议。"); return; }

  let answer = null;
  if (aiState.llmReady){
    answer = await callLLM(t);
  }
  if (!answer){
    answer = localAdvice(t);
  }
  botSay(answer);
  if (!aiState.unlimited){
    aiState.used += 1;
    localStorage.setItem("free_used", String(aiState.used));
    updateTurnsUI();
  }
}

// ====== 升级逻辑 ======
function openUpgrade(){ $("#upgradeModal").classList.remove("hidden"); }
function closeUpgrade(){ $("#upgradeModal").classList.add("hidden"); $("#upgradeMsg").textContent=""; }
async function useAccessCode(){
  const code = $("#accessCode").value.trim();
  if (!code){ $("#upgradeMsg").textContent="请输入访问码"; return; }
  try{
    const res = await fetch('/api/validate', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({code})});
    if (!res.ok){ $("#upgradeMsg").textContent="验证失败（服务未部署或访问码错误）"; return; }
    const data = await res.json();
    if (data.valid){
      aiState.unlimited = true; localStorage.setItem("unlimited","1");
      $("#upgradeMsg").textContent="验证成功，已解锁无限对话。";
      updateTurnsUI(); setTimeout(closeUpgrade, 600);
    }else{
      $("#upgradeMsg").textContent="访问码不正确。";
    }
  }catch(e){ $("#upgradeMsg").textContent="无法连接验证服务。"; }
}

// ====== LLM健康检查 ======
async function pingLLM(){
  try{
    const res = await fetch('/api/health');
    if (res.ok){
      aiState.llmReady = true;
      $("#llmBadge").textContent = "AI已连接";
      $("#llmBadge").style.color = "#a7f3d0";
    }else{
      throw new Error('not ok');
    }
  }catch{
    aiState.llmReady = false;
    $("#llmBadge").textContent = "AI未连接（将用本地兜底）";
    $("#llmBadge").style.color = "#f5b7b1";
  }
}

// ====== AI Widget 控制 ======
function openAIPanel(){ $("#aiPanel").classList.remove("hidden"); updateTurnsUI(); }
function closeAIPanel(){ $("#aiPanel").classList.add("hidden"); }

// ====== 事件绑定 ======
document.getElementById("startBtn").addEventListener("click", showQuiz);
document.getElementById("nextBtn").addEventListener("click", next);
document.getElementById("prevBtn").addEventListener("click", prev);
document.getElementById("retryBtn").addEventListener("click", ()=>{ idx=0; answers=new Array(questions.length).fill(null); showQuiz(); renderQuestion(); });
document.getElementById("printBtn").addEventListener("click", ()=>window.print());
document.querySelectorAll(".opt").forEach(btn=>btn.addEventListener("click",(e)=>pick(e.currentTarget.dataset.score)));

document.getElementById("aiToggle").addEventListener("click", ()=>{
  if (document.getElementById("aiPanel").classList.contains("hidden")) openAIPanel(); else closeAIPanel();
});
document.getElementById("aiClose").addEventListener("click", closeAIPanel);
document.getElementById("aiSend").addEventListener("click", handleSend);
document.getElementById("useCodeBtn").addEventListener("click", useAccessCode);
document.getElementById("closeUpgradeBtn").addEventListener("click", closeUpgrade);

// 初始化
showIntro();
pingLLM();
updateTurnsUI();
