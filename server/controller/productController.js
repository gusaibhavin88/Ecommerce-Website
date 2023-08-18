import ProductModel from "../model/productModel.js";
import ErrorHandler from "../utilities/errorHandler.js";
import CatchAsyncErros from "../middleware/catchAsyncErrors.js";
import Apifeatures from "../utilities/apiFeatures.js";

export const getAllProduct = CatchAsyncErros(async (req, resp, next) => {
  const apifeatures = new Apifeatures(ProductModel.find(), req.query)
    .search()
    .filter();
  const products = await apifeatures.query;

  try {
    if (!products) {
      return next(new ErrorHandler("Products Not Found", 401));
    } else {
      resp.status(200).json({
        success: true,
        data: products,
        message: "Products fetched successfully",
      });
    }
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
});

export const createProduct = CatchAsyncErros(async (req, resp, next) => {
  const { name } = req.body;

  let product = await ProductModel.findOne({ name: name });

  if (product) {
    return next(new ErrorHandler("Product name already exist", 401));
  } else {
    product = await ProductModel.create(req.body);
    resp.status(200).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  }
  try {
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
});

export const updateProduct = CatchAsyncErros(async (req, resp, next) => {
  const { id } = req.params;

  try {
    let product = await ProductModel.findById(id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 401));
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated data against the model's schema
    });

    resp.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
});

export const getProduct = CatchAsyncErros(async (req, resp, next) => {
  const { id } = req.params;

  try {
    let product = await ProductModel.findById(id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 401));
    }

    resp.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
});

export const deleteProduct = CatchAsyncErros(async (req, resp, next) => {
  const { id } = req.params;

  let product = await ProductModel.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }

  product = await ProductModel.deleteOne({ _id: id });

  resp.status(200).json({
    success: true,
    data: product,
    message: "Product deleted successfully",
  });
});
