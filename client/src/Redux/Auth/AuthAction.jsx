import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInUser, registerUser } from "../../Api/AuthRequest";

// Async thunk for fetching posts
export const loginUserAction = createAsyncThunk(
  "loginUser",
  async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const response = await logInUser(formData, config); // Call your API function here
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

// Async thunk for fetching posts
export const registerUserAction = createAsyncThunk(
  "registerUser",
  async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    try {
      const response = await registerUser(formData, config); // Call your API function here
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);

// Async thunk for fetching posts
export const getMyProfile = createAsyncThunk("getMyProfile", async () => {
  try {
    const response = await getMyProfile(); // Call your API function here
    console.log(response);
    return response; // Assuming the response contains data field with posts
  } catch (error) {
    throw error.response.data; // Assuming the response contains data field with posts
  }
});
