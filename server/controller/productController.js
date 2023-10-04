import ProductModel from "../model/productModel.js";
import ErrorHandler from "../utilities/errorHandler.js";
import CatchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Apifeatures from "../utilities/apiFeatures.js";
import cloudinary from "cloudinary";

export const getAllProduct = CatchAsyncErrors(async (req, resp, next) => {
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
      products: products,
      message: "Products fetched successfully",
      productCount,
      filteredProducts,
      resultPerPages,
    });
  }
});

export const createProduct = CatchAsyncErrors(async (req, resp, next) => {
  req.body.user = req.user;

  let product = await ProductModel.findOne({ name: req.body.name });

  if (!req.body.avatar) {
    return next(new ErrorHandler("Please add Profile image", 401));
  }

  if (product) {
    return next(new ErrorHandler("Product name already exist", 401));
  } else {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Ecommerce-Site/Avatars",
      width: 150,
      crop: "scale",
    });
    product = await ProductModel.create({
      ...req.body,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    product.save();

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

export const updateProduct = CatchAsyncErrors(async (req, resp, next) => {
  const { id } = req.params;
  let myCloud = null;

  if (req.body.avatar) {
    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Ecommerce-Site/Avatars",
      width: 150,
      crop: "scale",
    });
  }

  let product = await ProductModel.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404)); // Change status code to 404 for resource not found
  }

  let updatedProduct;

  if (req.body.avatar) {
    console.log("fds");
    const { avatar, ...otherData } = req.body;
    otherData.image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    updatedProduct = await ProductModel.findByIdAndUpdate(id, otherData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated data against the model's schema
    });
  } else {
    const { image, reviews, ...otherData } = req.body;
    updatedProduct = await ProductModel.findByIdAndUpdate(id, otherData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated data against the model's schema
    });
  }

  console.log("first"); // Not sure why you have this log here

  resp.status(200).json({
    success: true,
    product: updatedProduct,
    message: "Product updated successfully",
  });
});

export const getProduct = CatchAsyncErrors(async (req, resp, next) => {
  const productId = await ProductModel.findById(req.params.id);
  try {
    let product = await ProductModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 401));
    }

    resp.status(200).json({
      success: true,
      product: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
});

export const deleteProduct = CatchAsyncErrors(async (req, resp, next) => {
  const { id } = req.params;

  let product = await ProductModel.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }

  product = await ProductModel.deleteOne({ _id: id });

  resp.status(200).json({
    success: true,
    product: product,
    message: "Product deleted successfully",
  });
});

// createProductReview

export const createProductReview = CatchAsyncErrors(async (req, resp, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: {
      _id: req.user._id,
      url: req.user.avatar.url,
    },
    rating: Number(rating),
    name: req.user.name,
    comment,
  };

  const product = await ProductModel.findById(productId);
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

  await product.save();

  const MyReview = product.reviews.find(
    // (rev) => rev.user.toString() === req.user._id.toString()
    (rev) => rev.user._id.toString() === req.user._id.toString()
  );

  resp.status(200).json({
    success: true,
    message: "Reviewd successfully",
    review: MyReview,
  });
});

export const deleteReview = CatchAsyncErrors(async (req, resp, next) => {
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

export const getAllReviews = CatchAsyncErrors(async (req, resp, next) => {
  const productId = await ProductModel.findById(req.params.id);
  try {
    let product = await ProductModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 401));
    }

    resp.status(200).json({
      success: true,
      reviews: product.reviews,
      message: "Product Reviews fetched successfully",
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
});
