import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetails } from "../../Api/ProductRequest";
import axios from "axios";
import { updateCart } from "./CartSlice";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// fetchproductDetails
export const fetchproductDetailsForCart = createAsyncThunk(
  "fetchproductDetailsForCart",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, id, qty } = functions;
    console.log(qty);
    const response = await getProductDetails(id); // Call your API function here
    dispatch(updateCart({ ...response.data.product, qty: qty }));
    if (onComplete) {
      onComplete(response);
    }
    return response.data; // Assuming the response contains data field with posts
  }
);
