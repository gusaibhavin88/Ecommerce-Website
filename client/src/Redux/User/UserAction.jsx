import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserPassword, updateUserProfile } from "../../Api/UserRequest";
import { updateProfile } from "../Auth/AuthSlice";
import { logOutProfile } from "../Auth/AuthAction";
import { logOut } from "../../Api/AuthRequest";

// Async thunk for updating user profile
export const updateProfileAction = createAsyncThunk(
  "updateProfile",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await updateUserProfile(formData, config); // Call your API function here
      dispatch(updateProfile(response));
      onComplete(response);
      return response; // Assuming the response contains the data you need
    } catch (error) {
      throw error.response.data; // Assuming the response contains error data
    }
  }
);

// Async thunk for updating user profile
export const updatePasswordAction = createAsyncThunk(
  "updatePassword",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await updateUserPassword(formData); // Call your API function here
      logOut();
      onComplete(response);
      return response; // Assuming the response contains the data you need
    } catch (error) {
      throw error.response.data; // Assuming the response contains error data
    }
  }
);
