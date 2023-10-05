import stripePackage from "stripe";
import CatchAsyncErrors from "../middleware/catchAsyncErrors.js";

const stripe = stripePackage(process.env.SECRET_KEY);

// ---------------------  processPayment  ---------------------

export const processPayment = CatchAsyncErrors(async (req, resp, next) => {
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

// ---------------------  sendStripApiKey  ---------------------

export const sendStripApiKey = CatchAsyncErrors(async (req, resp, next) => {
  resp.status(200).json({
    sendStripApiKey: process.env.STRIPE_API_KEY,
  });
});
