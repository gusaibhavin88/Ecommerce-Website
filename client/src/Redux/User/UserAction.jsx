import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsers,
  updateUserPassword,
  updateUserProfile,
  updateUserRole,
} from "../../Api/UserRequest";
import { updateProfile } from "../Auth/AuthSlice";
import { logOutProfile } from "../Auth/AuthAction";
import { logOut } from "../../Api/AuthRequest";
import { updateUser } from "./UserSlice";

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

export const getAllUsesrAction = createAsyncThunk(
  "getAllUsersAction",
  async () => {
    try {
      const response = await getAllUsers(); // Call your API function here
      return response; // Assuming the response contains the data you need
    } catch (error) {
      throw error.response.data; // Assuming the response contains error data
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "updateUserAction",
  async ({ functions }, { dispatch }) => {
    const { formData, id, onError, onComplete } = functions;
    try {
      const response = await updateUserRole(id, formData); // Call your API function here
      dispatch(updateUser(response));
      return response; // Assuming the response contains the data you need
    } catch (error) {
      throw error.response.data; // Assuming the response contains error data
    }
  }
);
