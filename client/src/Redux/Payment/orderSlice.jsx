import { createSlice, current } from "@reduxjs/toolkit";
import {
  createNewOrderAction,
  deleteOrderAction,
  getAllOrdersAction,
  getMyOrderAction,
} from "./orderAction";

// Define the initial state
const initialState = {
  allOrders: [],
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
      state.myOrders = action.payload.data.order;
    },
    removeOrder: (state, action) => {
      const id = action.payload;
      // Create a new array without the order with the specified ID
      const updatedOrders = state.myOrders.filter((order) => order._id !== id);
      state.myOrders = updatedOrders;
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
        state.status = "succeeded";
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getMyOrderAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteOrderAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteOrderAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteOrderAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getAllOrdersAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAllOrdersAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.message = action.payload.message;
        state.allOrders = action.payload.orders;
      })
      .addCase(getAllOrdersAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
export const {
  clearError,
  clearMessage,
  clearIsUpdate,
  addOrder,
  removeOrder,
} = orderSlice.actions; // Export the clearError action
// Export the async thunks to use in components
