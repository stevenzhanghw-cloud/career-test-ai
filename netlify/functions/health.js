exports.handler = async function(event, context){
  if (process.env.OPENAI_API_KEY) return {statusCode:200, body:JSON.stringify({ok:true})};
  return {statusCode:503, body:JSON.stringify({ok:false})};
};