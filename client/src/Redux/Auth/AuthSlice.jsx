import { createSlice } from "@reduxjs/toolkit";
import { loginUserAction, registerUserAction } from "./AuthAction";

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
        console.log(action);
        state.status = "succeeded";
        state.products = action.payload.data;
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
        console.log(action);
        state.status = "succeeded";
        state.products = action.payload.data;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
export const { clearError } = authSlice.actions; // Export the clearError action
// Export the async thunks to use in components
