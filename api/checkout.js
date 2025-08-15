export default async function handler(req, res){
  // Placeholder: You can wire Stripe Checkout here.
  // For now just return 501 with instructions.
  return res.status(501).json({error:"Not Implemented", hint:"Create a Stripe Checkout session on server and redirect URL here."});
}
