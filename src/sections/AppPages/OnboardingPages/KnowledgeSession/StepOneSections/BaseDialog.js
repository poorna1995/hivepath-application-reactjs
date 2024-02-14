import React from "react";
import { Dialog } from "@mui/material";

const KnowledgeSessionBaseDialog = ({ open, handleClose, children }) => {
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

export default KnowledgeSessionBaseDialog;
