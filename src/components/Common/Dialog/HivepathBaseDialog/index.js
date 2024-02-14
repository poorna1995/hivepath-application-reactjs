import { Dialog, IconButton } from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";

const HivepathBaseDialog = ({
  open,
  handleClose,
  popupStyles,
  hideButton,
  children,
  scroll,
}) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style:
          //  popupStyles
          //   ? popupStyles
          //   :
          {
            borderRadius: "15px",

            position: "relative",
            maxWidth: "700px",
            margin: "auto",
            minWidth: "400px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "32px",
            paddingBottom: "32px",
            minHeight: "160px",
            ...popupStyles,
          },
      }}
      BackdropProps={{
        style: {
          opacity: "1",
        },
      }}
      onClose={handleClose}
      scroll={scroll || "paper"}
    >
      {!hideButton && (
        <IconButton
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: "10",
          }}
          sx={{
            color: "black",
            bgcolor: "rgba(0,0,0,0.1)",
            // opacity: "10%",
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}
          onClick={handleClose}
        >
          <MdClose />
        </IconButton>
      )}
      {children}
    </Dialog>
  );
};

export default HivepathBaseDialog;
