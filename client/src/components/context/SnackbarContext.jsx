import React, { createContext, useState, useContext } from "react";
import CustomisedSnackbar from "../Snackbar/CustomisedSnackbar";
import { useSelector } from "react-redux";

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const { error } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = (severity, message = "") => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const contextValue = {
    handleClick,
    handleClose,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <CustomisedSnackbar
        open={open}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export { SnackbarProvider, useSnackbar };
