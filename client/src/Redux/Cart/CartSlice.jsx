import { createSlice, current } from "@reduxjs/toolkit";
import { fetchproductDetailsForCart } from "./CartAction";

// Define the initial state
const initialState = {
  cartList: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  error: null,
  message: null,
};

// Create a slice
const cartSlice = createSlice({
  name: "carts",
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
    updateCart: (state, action) => {
      state.cartList = [...state.cartList, { ...action.payload }];
      // state.cartList = false; // Clear the error by returning null or an empty string
    },

    removeCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartList = state.cartList.filter(
        (item, index) => index !== itemIdToRemove
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchproductDetailsForCart.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchproductDetailsForCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(fetchproductDetailsForCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
export const {
  clearError,
  clearMessage,
  clearIsUpdate,
  updateCart,
  removeCart,
} = cartSlice.actions; // Export the clearError action
// Export the async thunks to use in components
