import React, { createContext, useState, useContext } from "react";
import ProductUpdateDialog from "../Dialogs/ProductUpdateDialog/ProductUpdateDialog";
import UserUpdateDialog from "../Dialogs/UserUpdateDialog/userUpdateDialog";

const dialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [dialogdata, setDialogdata] = useState("");
  const [dialogtype, setDialogtype] = useState("");

  const handleClose = () => {
    setShow(false);
    setDialogdata("");
    setDialogtype("");
  };
  const handleShow = (dialogtype, dialogdata) => {
    setShow(true);
    setDialogdata(dialogdata);
    setDialogtype(dialogtype);
  };
  const contextValue = {
    handleShow,
    handleClose,
  };

  return (
    <dialogContext.Provider value={contextValue}>
      {children}

      {dialogtype === "productUpdate" && (
        <ProductUpdateDialog
          show={show}
          handleClose={handleClose}
          productId={dialogdata}
        />
      )}

      {dialogtype === "userUpdate" && (
        <UserUpdateDialog
          show={show}
          handleClose={handleClose}
          userId={dialogdata}
        />
      )}
    </dialogContext.Provider>
  );
};

const useDialog = () => {
  return useContext(dialogContext);
};

export { DialogProvider, useDialog };
