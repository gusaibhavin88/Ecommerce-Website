import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Slices/ProductSlice";

const store = configureStore({
  reducer: {
    counter: ProductSlice, // Add your reducer(s) here
  },
});

export default store;
