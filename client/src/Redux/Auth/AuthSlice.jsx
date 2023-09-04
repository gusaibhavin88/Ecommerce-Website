import { createSlice } from "@reduxjs/toolkit";
import { loginUserAction } from "./AuthAction";

// Define the initial state
const initialState = {
  isAuthenticalted: false,
  status: "idle",
  error: null,
  loading: false,
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
        state.products = action.payload.data;
        state.loading = false;
        state.isAuthenticalted = true;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action);
        state.loading = false;
        state.isAuthenticalted = false;
      });
  },
});

export default authSlice.reducer;
export const { clearError } = authSlice.actions; // Export the clearError action
// Export the async thunks to use in components
