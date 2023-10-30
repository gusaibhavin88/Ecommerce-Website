import stripePackage from "stripe";
import CatchAsyncErrors from "../middleware/catchAsyncErrors.js";
// import Razorpay from "raz";

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

// ---------------------  RezoprocessPayment  ---------------------

// export const rezoPayCreateOrder = async (req, res) => {
//   try {
//     const amount = req.body.amount * 100;
//     const options = {
//       amount: amount,
//       currency: "INR",
//       receipt: "razorUser@gmail.com",
//     };

//     razorpayInstance.orders.create(options, (err, order) => {
//       if (!err) {
//         res.status(200).send({
//           success: true,
//           msg: "Order Created",
//           order_id: order.id,
//           amount: amount,
//           key_id: RAZORPAY_ID_KEY,
//           product_name: req.body.name,
//           description: req.body.description,
//           contact: "8567345632",
//           name: "Sandeep Sharma",
//           email: "sandeep@gmail.com",
//         });
//       } else {
//         res.status(400).send({ success: false, msg: "Something went wrong!" });
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// // ---------------------  sendStripApiKey  ---------------------

// export const sendRezoApiKey = CatchAsyncErrors(async (req, resp, next) => {
//   resp.status(200).json({
//     sendStripApiKey: process.env.STRIPE_API_KEY,
//   });
// });
