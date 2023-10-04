import React, { createContext, useState, useContext } from "react";
import ProductUpdateDialog from "../Dialogs/ProductUpdateDialog/ProductUpdateDialog";

const dialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState("");

  const handleClose = () => {
    setShow(false);
    setProductId("");
  };
  const handleShow = (dialogtype, dialogdata) => {
    setShow(true);
    setProductId(dialogdata);
  };
  const contextValue = {
    handleShow,
    handleClose,
  };

  return (
    <dialogContext.Provider value={contextValue}>
      {children}
      <ProductUpdateDialog
        show={show}
        handleClose={handleClose}
        productId={productId}
      />
    </dialogContext.Provider>
  );
};

const useDialog = () => {
  return useContext(dialogContext);
};

export { DialogProvider, useDialog };
