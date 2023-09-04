import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInUser } from "../../Api/AuthRequest";

// Async thunk for fetching posts
export const loginUserAction = createAsyncThunk(
  "loginUser",
  async (formData) => {
    try {
      const response = await logInUser(formData); // Call your API function here
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);
