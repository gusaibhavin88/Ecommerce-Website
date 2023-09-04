import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Redux/Product/ProductSlice";
import AuthSlice from "./Redux/Auth/AuthSlice";

const store = configureStore({
  reducer: {
    products: ProductSlice, // Add your reducer(s) here
    auth: AuthSlice,
  },
});

export default store;
