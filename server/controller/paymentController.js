import stripePackage from "stripe";
import CatchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Razorpay from "razorpay";
import crypto from "crypto"

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


// ---------------------  RezoApiKeySend ---------------------

export const getRezoKey = CatchAsyncErrors(async (req, resp, next) => {
  resp.status(200).json({
    sendStripApiKey: process.env.REZO_API_KEY,
  });
});


// // ---------------------  Create Order  ---------------------


export const checkout = async (req, res) => {

  const razorpayInstance = new Razorpay({
    key_id: process.env.REZO_API_KEY,
    key_secret:  process.env.REZO_SECRET_KEY
});


  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await razorpayInstance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};


// ---------------------  Rezoprocess Payment  ---------------------

export const paymentVarification = async (req, res) => {
  console.log("first")
  console.log(req.body)

const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto
.createHmac("sha256", process.env.REZO_SECRET_KEY)
.update(body.toString())
.digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;

if (isAuthentic) {
// Database comes here

await order.create({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
});

res.redirect(
  `http://localhost:5000/paymentsuccess?reference=${razorpay_payment_id}`
);
} else {
res.status(400).json({
  success: false,
});
}

};


