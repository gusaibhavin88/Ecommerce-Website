import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductDetails,
  productReview,
} from "../../Api/ProductRequest";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Async thunk for fetching posts
export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    rating = 0,
    category = "",
  }) => {
    let link = `/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}&page=${currentPage}`;
    if (category === "Reset") {
      link = `/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}&page=${currentPage}`;
    }
    if (category && category !== "Reset") {
      link = `/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}&page=${currentPage}&category=${category}`;
    }

    const response = await API.get(link); // Call your API function here
    return response.data; // Assuming the response contains data field with posts
  }
);
export const fetchproductDetails = createAsyncThunk(
  "fetchproductDetails",
  async (id) => {
    const response = await getProductDetails(id); // Call your API function here
    return response.data; // Assuming the response contains data field with posts
  }
);

export const createProductReview = createAsyncThunk(
  "createreview",
  async (formdata) => {
    console.log(formdata);
    const response = await productReview(formdata); // Call your API function here
    return response.data; // Assuming the response contains data field with posts
  }
);

// export const createTask = createAsyncThunk(
//   "tasks/createTask",
//   async (newTask) => {
//     const response = await tasksAPI.createTask(newTask);
//     return response.data;
//   }
// );

// export const updateTask = createAsyncThunk(
//   "tasks/updateTask",
//   async (updatedTask) => {
//     const response = await tasksAPI.updateTask(updatedTask);
//     return response.data;
//   }
// );

// export const deleteTask = createAsyncThunk(
//   "tasks/deleteTask",
//   async (taskId) => {
//     await tasksAPI.deleteTask(taskId);
//     return taskId;
//   }
// );
