import stripePackage from "stripe";
import CatchAsyncErros from "../middleware/catchAsyncErrors.js";

const stripe = stripePackage(process.env.SECRET_KEY);

export const processPayment = CatchAsyncErros(async (req, resp, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  resp.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

export const sendStripApiKey = CatchAsyncErros(async (req, resp, next) => {
  resp.status(200).json({
    sendStripApiKey: process.env.STRIPE_API_KEY,
  });
});
