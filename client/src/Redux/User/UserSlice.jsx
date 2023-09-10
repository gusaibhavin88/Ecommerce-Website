import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./UserAction";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload.data.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export const { clearError, clearMessage } = userSlice.actions; // Export the clearError action
// Export the async thunks to use in components
