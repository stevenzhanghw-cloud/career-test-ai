export default function handler(req, res) {
  if (process.env.OPENAI_API_KEY) return res.status(200).json({ok:true});
  return res.status(503).json({ok:false});
}
