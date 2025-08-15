const crypto = require('crypto');
exports.handler = async function(event, context){
  if (event.httpMethod !== 'POST') return {statusCode:405, body:'Method not allowed'};
  const {code} = JSON.parse(event.body||"{}");
  const expected = process.env.ACCESS_CODE_SHA256 || "";
  if (!expected) return {statusCode:503, body:JSON.stringify({error:'no code configured'})};
  if (!code) return {statusCode:400, body:JSON.stringify({error:'no code'})};
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  const valid = (hash === expected);
  return {statusCode:200, body:JSON.stringify({valid})};
};