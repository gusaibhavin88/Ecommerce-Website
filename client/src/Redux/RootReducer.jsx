// rootReducer.js
import { combineReducers } from "redux";
import ProductSlice from "./Product/ProductSlice";
import AuthSlice from "./Auth/AuthSlice";

const rootReducer = combineReducers({
  auth: ProductSlice,
  products: AuthSlice,
});

export default rootReducer;
