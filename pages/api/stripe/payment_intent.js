import { EnvConfig } from "../constants";
import Stripe from "stripe";

export default async function handler(req, res) {
  try {
    const stripe = new Stripe(EnvConfig.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: "usd",
      payment_method_types: ["card"],
    });
    
    res.status(200).json({ data: paymentIntent });
  } catch (error) {
    res.status(500).json({ error });
  }
}
