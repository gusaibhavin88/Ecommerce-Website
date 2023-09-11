import ProductModel from "../model/productModel.js";
import ErrorHandler from "../utilities/errorHandler.js";
import CatchAsyncErros from "../middleware/catchAsyncErrors.js";
import Apifeatures from "../utilities/apiFeatures.js";

export const getAllProduct = CatchAsyncErros(async (req, resp, next) => {
  const resultPerPages = 8;
  const productCount = await ProductModel.countDocuments();

  const apifeatures = new Apifeatures(ProductModel.find(), req.query)
    .search()
    .filter();
  // Calculate the filtered product count before pagination
  const filteredProducts = await ProductModel.countDocuments(apifeatures.query);

  apifeatures.pagination(resultPerPages);

  const products = await apifeatures.query;

  if (!products) {
    return next(new ErrorHandler("Products Not Found", 401));
  } else {
    resp.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
      productCount,
      filteredProducts,
      resultPerPages,
    });
  }
});

export const createProduct = CatchAsyncErros(async (req, resp, next) => {
  const { name } = req.body;
  req.body.user = req.user;

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
  const productId = await ProductModel.findById(req.params.id);
  try {
    let product = await ProductModel.findById(productId);

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

// createProductReview

export const createProductReview = CatchAsyncErros(async (req, resp, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    name: req.user.name,
    comment,
  };

  // const product = await ProductModel.findById(productId);

  const product = await ProductModel.findById(productId).populate({
    path: "reviews.user",
    select: "avatar.url", // Specify the fields you want to populate
  });
  const isReviewed = product.reviews.find(
    (rev) => rev.user._id.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user._id.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.rating = avg / product.reviews.length;

  const MyReview = product.reviews.find(
    // (rev) => rev.user.toString() === req.user._id.toString()
    (rev) => rev.user._id.toString() === req.user._id.toString()
  );

  await product.save({ validateBeforeSave: false });

  resp.status(200).json({
    success: true,
    message: "Reviewd successfully",
    review: MyReview,
  });
});

export const deleteReview = CatchAsyncErros(async (req, resp, next) => {
  const product = await ProductModel.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await ProductModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  resp
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});
