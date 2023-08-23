import CatchAsyncErros from "../middleware/catchAsyncErrors.js";
import OrderModel from "../model/orderModel.js";

export const createNewOrder = CatchAsyncErros(async (req, resp, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  resp.status(201).json({
    success: true,
    order,
  });
});

export const myOrder = CatchAsyncErros(async (req, resp, next) => {
  const order = await OrderModel.find({ user: req.user._id }).populate(
    "User",
    "name email" // populate will check user and give data of name and email of that user
  );
  if (!order) {
    return next(new ErrorHandler("Order not Found", 400));
  }
  resp.status(200).json({ success: true, message: "My orders fetched" });
});
