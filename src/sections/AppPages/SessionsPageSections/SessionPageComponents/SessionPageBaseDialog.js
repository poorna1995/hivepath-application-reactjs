import { Dialog } from "@mui/material";
import React from "react";

const SessionPageBaseDialog = ({ open, handleClose, children }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: "15px",

          position: "relative",
          maxWidth: "700px",
          margin: "auto",
          minWidth: "400px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "32px",
          paddingBottom: "32px",
          minHeight: "200px",
        },
      }}
      BackdropProps={{
        style: {
          opacity: "1",
        },
      }}
      onClose={handleClose}
      scroll="paper"
    >
      {children}
    </Dialog>
  );
};

export default SessionPageBaseDialog;
