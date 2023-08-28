import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getProductDetails } from "../../Api/ProductRequest";

// Async thunk for fetching posts
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await getAllProducts(); // Call your API function here
  return response.data; // Assuming the response contains data field with posts
});
export const fetchproductDetails = createAsyncThunk(
  "fetchproductDetails",
  async (id) => {
    console.log(id);
    const response = await getProductDetails(id); // Call your API function here
    console.log(response);
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
