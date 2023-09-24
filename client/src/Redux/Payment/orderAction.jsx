import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetails } from "../../Api/ProductRequest";
import axios from "axios";
import { createNewOrder } from "../../Api/OrderRequest";
import { addOrder } from "./orderSlice";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// fetchproductDetails
export const createNewOrderAction = createAsyncThunk(
  "createNewOrderAction",
  async ({ functions }, { dispatch, getState }) => {
    const { onComplete, onError, formdata } = functions;
    const response = await createNewOrder(formdata); // Call your API function here
    dispatch(addOrder(formdata));
    if (onComplete) {
      onComplete(response);
    }
    return response.data; // Assuming the response contains data field with posts
  }
);
