import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { SnackbarProvider } from "./components/context/SnackbarContext.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/Store.jsx";
import { DialogProvider } from "./components/context/dialogContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DialogProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </DialogProvider>
    </PersistGate>
  </Provider>
);
