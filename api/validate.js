import crypto from 'crypto';

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const {code} = req.body || {};
  const expectedHash = process.env.ACCESS_CODE_SHA256 || ""; // hex
  if (!expectedHash) return res.status(503).json({error:'no code configured'});
  if (!code) return res.status(400).json({error:'no code'});
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  const valid = (hash === expectedHash);
  return res.status(200).json({valid});
}
