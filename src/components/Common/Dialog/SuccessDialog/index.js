import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";

import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

const SuccessDialog = ({ open, handleClose, description, fail }) => {
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ textAlign: "center" }}
    >
      <DialogTitle id="alert-dialog-title" style={{ paddingTop: "32px" }}>
        {fail === true ? (
          <MdError style={{ color: "#22B04A", fontSize: "48px" }} />
        ) : (
          <FaCheckCircle style={{ color: "#22B04A", fontSize: "48px" }} />
        )}{" "}
      </DialogTitle>
      <DialogContent style={{ paddingBottom: "32px" }}>
        {description && (
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        )}{" "}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
