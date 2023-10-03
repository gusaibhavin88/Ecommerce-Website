import React, { useState } from "react";

function useDialog() {
  const [dialogs, setDialogs] = useState([]);

  const openDialog = (dialogType, dialogData) => {
    // Create and add a new dialog to the list of open dialogs
    const newDialog = { type: dialogType, data: dialogData, visible: true };
    setDialogs((prevDialogs) => [...prevDialogs, newDialog]);
  };

  // Other dialog-related functions

  return {
    dialogs,
    openDialog,
    // Other dialog-related functions
  };
}

export default useDialog;
