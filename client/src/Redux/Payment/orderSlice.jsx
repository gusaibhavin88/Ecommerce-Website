import { createSlice, current } from "@reduxjs/toolkit";
import { createNewOrderAction, getMyOrderAction } from "./orderAction";

// Define the initial state
const initialState = {
  myOrders: [],
  order: null,
  error: null,
  message: null,
};

// Create a slice
const orderSlice = createSlice({
  name: "orders",
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
    addOrder: (state, action) => {
      state.myOrders = [...state.myOrders, action.payload.data.order];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrderAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createNewOrderAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(createNewOrderAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getMyOrderAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getMyOrderAction.fulfilled, (state, action) => {
        console.log(action);
        state.status = "succeeded";
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getMyOrderAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
export const { clearError, clearMessage, clearIsUpdate, addOrder } =
  orderSlice.actions; // Export the clearError action
// Export the async thunks to use in components
