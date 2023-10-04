import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAllReviews,
  getProductDetails,
  productReview,
  updateProduct,
} from "../../Api/ProductRequest";
import axios from "axios";
import { updateProducts, updateReview, editProduct } from "./ProductSlice";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// fetchProducts;
export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({
    keyword = "",
    currentPage = 1,
    price = [0, 10000000],
    rating = 0,
    category = "",
  }) => {
    let link = `/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}&page=${currentPage}`;
    if (category === "Reset Filter") {
      link = `/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}&page=${currentPage}`;
    }
    if (category && category !== "Reset Filter") {
      link = `/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}&page=${currentPage}&category=${category}`;
    }

    const response = await API.get(link); // Call your API function here
    return response.data; // Assuming the response contains data field with posts
  }
);

// fetchproductDetails
export const fetchproductDetails = createAsyncThunk(
  "fetchproductDetails",
  async ({ functions }) => {
    const { onComplete, onError, id } = functions;
    const response = await getProductDetails(id); // Call your API function here
    if (onComplete) {
      onComplete(response);
    }
    return response; // Assuming the response contains data field with posts
  }
);

// createProductReview
export const createProductReview = createAsyncThunk(
  "createreview",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await productReview(formData); // Call your API function here
      dispatch(updateReview(response));
      onComplete(response);
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      onError(error);
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

export const createProductAction = createAsyncThunk(
  "createProductAction",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await createProduct(formData, config); // Call your API function here
      return response.data; // Assuming the response contains data field with posts
    } catch (error) {
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

export const getAllReviewsAction = createAsyncThunk(
  "getAllReviewsAction",
  async (id) => {
    try {
      const response = await getAllReviews(id); // Call your API function here
      return response.data; // Assuming the response contains data field with posts
    } catch (error) {
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

export const deleteProductAction = createAsyncThunk(
  "deleteProductAction",
  async (id, { dispatch }) => {
    try {
      const response = await deleteProduct(id); // Call your API function here
      dispatch(updateProducts(id));
      return response.data; // Assuming the response contains data field with posts
    } catch (error) {
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

export const updateProductAction = createAsyncThunk(
  "updateProductAction",
  async ({ functions }, { dispatch }) => {
    const { formData, id, onError, onComplete } = functions;
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await updateProduct(id, formData, config); // Call your API function here
      onComplete(response);
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);
