import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Redux/Product/ProductSlice";

const store = configureStore({
  reducer: {
    products: ProductSlice, // Add your reducer(s) here
  },
});

export default store;
