import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createNewOrder,
  getMyOrder,
  getMyOrders,
} from "../../Api/OrderRequest";
import { addOrder } from "./orderSlice";
import { clearCart } from "../Cart/CartSlice";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// fetchproductDetails
export const createNewOrderAction = createAsyncThunk(
  "createNewOrderAction",
  async ({ functions }, { dispatch, getState }) => {
    const { onComplete, onError, formdata } = functions;
    const response = await createNewOrder(formdata); // Call your API function here
    dispatch(addOrder(response));
    dispatch(clearCart());
    if (onComplete) {
      onComplete(response);
    }
    return response.data; // Assuming the response contains data field with posts
  }
);

// fetchproductDetails
export const getMyOrdersAction = createAsyncThunk(
  "getMyOrdersAction",
  async (_, { dispatch, getState }) => {
    const response = await getMyOrders(); // Call your API function here
    dispatch(addOrder(response));

    return response.data; // Assuming the response contains data field with posts
  }
);

export const getMyOrderAction = createAsyncThunk(
  "getMyOrderAction",
  async (id) => {
    const response = await getMyOrder(id); // Call your API function here
    return response.data; // Assuming the response contains data field with posts
  }
);
