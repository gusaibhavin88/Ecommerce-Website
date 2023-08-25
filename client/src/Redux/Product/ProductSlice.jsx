import { createSlice } from "@reduxjs/toolkit";
import { fetchproducts } from "./ProductAction";

// Define the initial state
const initialState = {
  products: [],
  status: "idle",
  error: null,
  loading: false,
};

// Create a slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchproducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchproducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchproducts.rejected, (state, action) => {
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
