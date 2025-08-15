exports.handler = async function(event, context){
  // Placeholder for Stripe Checkout session creation.
  return {statusCode:501, body:JSON.stringify({error:"Not Implemented", hint:"Use Stripe SDK to create a checkout session and return a redirect URL."})};
};