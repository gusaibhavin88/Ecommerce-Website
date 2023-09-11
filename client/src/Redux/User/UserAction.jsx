import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserProfile } from "../../Api/UserRequest";

// Async thunk for fetching posts
export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ functions }) => {
    const { onComplete, onError, formData } = functions;
    console.log(formData);
    try {
      const response = await updateUserProfile(formData); // Call your API function here
      // console.log(response);
      updateReview;
      return response; // Assuming the response contains data field with posts
    } catch (error) {
      throw error.response.data; // Assuming the response contains data field with posts
    }
  }
);
