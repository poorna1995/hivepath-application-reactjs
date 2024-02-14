import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoadingBackdrop = ({ open, handleClose }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: 9999 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default LoadingBackdrop;
