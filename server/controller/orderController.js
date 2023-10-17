import CatchAsyncErrors from "../middleware/catchAsyncErrors.js";
import OrderModel from "../model/orderModel.js";
import ProductModel from "../model/productModel.js";
import UserModel from "../model/userModel.js";
import ErrorHandler from "../utilities/errorHandler.js";

// ---------------------  createNewOrder  ---------------------

export const createNewOrder = CatchAsyncErrors(async (req, resp, next) => {
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

// ---------------------  myOrder  ---------------------

export const myOrder = CatchAsyncErrors(async (req, resp, next) => {
  const order = await OrderModel.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not Found", 400));
  }
  resp.status(200).json({ success: true, order, message: "My orders fetched" });
});

// ---------------------  getAllOrders  ---------------------

export const getAllOrders = CatchAsyncErrors(async (req, resp, next) => {
  const orders = await OrderModel.find();
  if (!orders) {
    return next(new ErrorHandler("Order not Found", 400));
  }

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount = totalAmount + order.totalPrice;
  });

  resp
    .status(200)
    .json({ success: true, orders, totalAmount, message: "My orders fetched" });
});

// ---------------------  findMyOrder  ---------------------

export const findMyOrder = CatchAsyncErrors(async (req, resp, next) => {
  const { id } = req.params;
  const myOrder = await OrderModel.findById(id);
  if (!myOrder) {
    return next(new ErrorHandler("Order not Found", 400));
  }

  resp
    .status(200)
    .json({ success: true, order: myOrder, message: "My order fetched" });
});

// ---------------------  findMyOrder  --------------------- Admin

export const updateOrder = CatchAsyncErrors(async (req, resp, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order already delivered", 400));
  }

  const updateStock = async (id, quantity) => {
    const product = await ProductModel.findById(id);
    if (product) {
      product.stock = product.stock - quantity;
      await product.save({ validateBeforeSave: false });
    }
  };

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  resp
    .status(200)
    .json({ success: true, message: "Order updated successfuly" });
});

// ---------------------  deleteOrder  --------------------- Admin

export const deleteOrder = CatchAsyncErrors(async (req, res, next) => {
  const order = await OrderModel.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404)); // 404 for "Not Found"
  }

  res
    .status(200)
    .json({ success: true, message: "Order deleted successfully" });
});

// ---------------------  DashboardDetails  --------------------- Admin

export const DashboardDetails = CatchAsyncErrors(async (req, resp, next) => {
  const orderCount = await OrderModel.countDocuments();
  const productCount = await ProductModel.countDocuments();
  const userCount = await UserModel.countDocuments();
  const allOrders = await OrderModel.find();
  const allProducts = await ProductModel.find();

  let totalAmount = 0;
  allOrders.map((item) => {
    const addAmount = item.totalPrice;
    totalAmount = totalAmount + addAmount;
  });

  let outOfStock = 0;

  allProducts.map((item) => {
    if (item.stock < 1) {
      outOfStock++;
    }
  });

  resp.status(200).json({
    success: true,
    message: "Dashboard data fetched successfuly",
    orderCount: orderCount,
    productCount: productCount,
    userCount: userCount,
    totalAmount: totalAmount,
    outOfStock: outOfStock,
  });
});

export const updateOrderStatus = CatchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Validate the updated data against the model's schema
  });

  if (!order) {
    return next(new ErrorHandler("Order not found", 404)); // 404 for "Not Found"
  }

  res
    .status(200)
    .json({ success: true, message: "Order status updated successfully" });
});
