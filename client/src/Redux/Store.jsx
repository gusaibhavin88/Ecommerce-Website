import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./PersistConfig";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AuthSlice from "./Auth/AuthSlice";
import ProductSlice from "./Product/ProductSlice";
import UserSlice from "./User/UserSlice";
import CartSlice from "./Cart/CartSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    products: ProductSlice,
    user: UserSlice,
    cart: CartSlice,
    // Use persistedReducer as the reducer for the "persist" key
    persist: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
