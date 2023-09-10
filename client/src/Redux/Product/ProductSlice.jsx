import { createSlice, current } from "@reduxjs/toolkit";
import {
  createProductReview,
  fetchProducts,
  fetchproductDetails,
} from "./ProductAction";

// Define the initial state
const initialState = {
  products: [],
  product: {},
  status: "idle",
  error: null,
  message: null,
  loading: false,
  isUpdated: false,
  productCount: 0,
};

// Create a slice
const productSlice = createSlice({
  name: "products",
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
    updateReview: (state, action) => {
      console.log(action);
      const { id } = action.payload;
      // Find the product by ID and update it
      const productIndex = state.product.findIndex(
        (product) => product.id === id
      );

      console.log(productIndex);
      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...updatedProduct,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
        state.loading = false;
        state.productCount = action.payload.productCount;
        state.filteredCount = action.payload.filteredProducts;
        state.resultPerPages = action.payload.resultPerPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchproductDetails.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchproductDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchproductDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createProductReview.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.message = action.payload.data.message;
        state.isUpdated = true;
        console.log(current(state.product)); // Current required to get the value of Product
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const { clearError, clearMessage, clearIsUpdate, updateReview } =
  productSlice.actions; // Export the clearError action
// Export the async thunks to use in components
