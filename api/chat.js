export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({error:'OpenAI key not set'});
  try{
    const {question, city, scores, recs, history=[]} = req.body || {};
    const systemPrompt = `你是一名职业顾问。用中文回答，结构化清晰，给出可执行步骤。
注意：不提供法律/移民/医疗等专业意见。
地区优先考虑 ${city||'Calgary, AB'} 的求职环境。`;

    // Compose messages for Chat Completions API
    const messages = [
      {role:'system', content: systemPrompt},
      {role:'user', content: `这是我的测评分数（S/R/I/A/C 百分比）：${JSON.stringify(scores)}；推荐职业：${(recs||[]).join('、')}。
问题：${question}`}
    ];

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.7,
        messages
      })
    });
    if (!resp.ok){
      const t = await resp.text();
      return res.status(502).json({error:'LLM upstream error', detail:t});
    }
    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content || "（没有生成答案）";
    return res.status(200).json({answer});
  }catch(e){
    return res.status(500).json({error:String(e)});
  }
}
