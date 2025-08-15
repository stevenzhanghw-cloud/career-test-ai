const fetch = require('node-fetch');

exports.handler = async function(event, context){
  if (event.httpMethod !== 'POST') return {statusCode:405, body:'Method not allowed'};
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return {statusCode:503, body:JSON.stringify({error:'OpenAI key not set'})};
  try{
    const {question, city, scores, recs} = JSON.parse(event.body||"{}");
    const systemPrompt = `你是一名职业顾问。用中文回答，结构化清晰，给出可执行步骤。
不提供法律/移民/医疗等专业意见。
地区优先考虑 ${city||'Calgary, AB'} 的求职环境。`;

    const messages = [
      {role:'system', content: systemPrompt},
      {role:'user', content: `测评分数（S/R/I/A/C %）：${JSON.stringify(scores)}；推荐职业：${(recs||[]).join('、')}。
问题：${question}`}
    ];

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {"Content-Type":"application/json","Authorization":`Bearer ${apiKey}`},
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", temperature:0.7, messages })
    });
    const text = await resp.text();
    if (!resp.ok) return {statusCode:502, body:JSON.stringify({error:'LLM upstream', detail:text})};
    const data = JSON.parse(text);
    const answer = data?.choices?.[0]?.message?.content || "（没有生成答案）";
    return {statusCode:200, body:JSON.stringify({answer})};
  }catch(e){
    return {statusCode:500, body:JSON.stringify({error:String(e)})};
  }
};