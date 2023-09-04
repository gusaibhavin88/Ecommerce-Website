// persistConfig.js
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./RootReducer";

const persistConfig = {
  key: "root", // key in local storage
  storage, // the storage engine to use
  whitelist: ["products", "auth"], // the reducers you want to persist
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
