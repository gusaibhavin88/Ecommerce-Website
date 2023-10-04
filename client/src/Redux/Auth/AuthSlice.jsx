import { createSlice, current } from "@reduxjs/toolkit";
import {
  getMyProfile,
  logOutProfile,
  loginUserAction,
  registerUserAction,
} from "./AuthAction";
import { updatePasswordAction } from "../User/UserAction";

// Define the initial state
const initialState = {
  isAuthenticated: null,
  status: "idle",
  error: null,
  message: null,
  loading: false,
  user: null,
  isUpdated: null,
};

// Create a slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear the error by returning null or an empty string
    },
    clearMessage: (state) => {
      state.message = null; // Clear the error by returning null or an empty string
    },
    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload.data.user,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUserAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(getMyProfile.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logOutProfile.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(logOutProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logOutProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updatePasswordAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updatePasswordAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(updatePasswordAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export const { clearError, updateProfile } = authSlice.actions; // Export the clearError action
// Export the async thunks to use in components
