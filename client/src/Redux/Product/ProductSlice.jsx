import { createSlice } from "@reduxjs/toolkit";
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
  loading: false,
  productCount: 0,
};

// Create a slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
        state.product = action.payload.data;
        state.loading = false;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
    // .addCase(createproduct.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(createproduct.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.products = action.payload;
    // })
    // .addCase(createproduct.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // })
    // .addCase(updateproduct.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(updateproduct.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.products = action.payload;
    // })
    // .addCase(updateproduct.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // })
    // .addCase(deleteproduct.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(deleteproduct.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.products = action.payload;
    // })
    // .addCase(deleteproduct.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // });

    // Similar cases for createproduct, updateproduct, and deleteproduct
  },
});

export default productSlice.reducer;

// Export the async thunks to use in components

<img
  src="//www.html.am/images/image-codes/milford_sound_t.jpg"
  width="225"
  height="151"
  alt="Photo of Milford Sound in New Zealand"
/>;
