import { createSlice, current } from "@reduxjs/toolkit";
import {
  createProductAction,
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
      const { review } = action.payload.data;
      console.log(review);
      // Find the product by ID and update it

      const productIndex = state.product.reviews.findIndex(
        (product) => product._id === review._id
      );

      if (productIndex !== -1) {
        state.product.reviews[productIndex] = {
          ...state.product.reviews[productIndex],
          ...review,
        };
      } else {
        state.product.reviews.push(review);
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
        state.product = action.payload.data.product;
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
        state.isUpdated = true;
        // console.log(current(state.product)); // Current required to get the value of Product
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        // state.error = action.error.message;
      })
      .addCase(createProductAction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createProductAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload.message;
        console.log(action);
        // console.log(current(state.product)); // Current required to get the value of Product
      })
      .addCase(createProductAction.rejected, (state, action) => {
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
