import { createSlice } from "@reduxjs/toolkit";
import {
  getMyProfile,
  logOutProfile,
  loginUserAction,
  registerUserAction,
} from "./AuthAction";

// Define the initial state
const initialState = {
  isAuthenticated: false,
  status: "idle",
  error: null,
  loading: false,
  user: null,
};

// Create a slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear the error by returning null or an empty string
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
        console.log(action);
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
      });
  },
});

export default authSlice.reducer;
export const { clearError } = authSlice.actions; // Export the clearError action
// Export the async thunks to use in components
