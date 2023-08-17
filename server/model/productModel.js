import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " Please Feel Product Name"],
  },
  price: {
    type: Number,
    required: [true, " Please Feel Product Price"],
  },
  description: {
    required: [true, " Please Feel Product Description"],
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    required: [true, " Please Feel Product Category"],
    type: String,
  },
  stock: {
    required: [true, " Please Feel Product Category"],
    type: Number,
    default: 0,
    maxLength: [4, "Stock should not exceed 4 character"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        required: true,
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("Products", productSchema);
export default ProductModel;
