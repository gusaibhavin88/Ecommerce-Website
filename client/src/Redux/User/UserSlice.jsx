import { createSlice } from "@reduxjs/toolkit";
import { updateProfileAction } from "./UserAction";

// Define the initial state
const initialState = {
  status: "idle",
  error: null,
  message: null,
  loading: false,
  isUpdated: false,
};

// Create a slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear the error by returning null or an empty string
    },
    clearMessage: (state) => {
      state.message = null; // Clear the error by returning null or an empty string
    },
    clearIsUpdate: (state) => {
      state.isUpdated = false; // Clear the error by returning null or an empty string
    },
    updateProfile: (state, action) => {
      const { review } = action.payload.data;
      // Find the product by ID and update it

      const productIndex = state.product.reviews.findIndex(
        (product) => product._id === review._id
      );

      if (productIndex !== -1) {
        state.product.reviews[productIndex] = {
          ...state.product.reviews[productIndex],
          ...review,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload.data.message;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export const { clearError, clearMessage } = userSlice.actions; // Export the clearError action
// Export the async thunks to use in components
