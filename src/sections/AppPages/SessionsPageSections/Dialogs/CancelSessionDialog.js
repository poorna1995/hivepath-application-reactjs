import { DialogActions, DialogTitle } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import React from "react";

const CancelSessionDialog = ({ open, handleClose }) => {
  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <DialogTitle
        style={{
          fontSize: "28px",
          fontWeight: "700",
          lineHeight: "32px",
        }}
      >
        Do you want to cancel this session?
      </DialogTitle>
      <DialogActions
        style={{
          justifyContent: "center",
        }}
      >
        <OutlinedButton
          title={"No"}
          onClick={handleClose}
          style={{
            width: "70px",
          }}
        />
        <PrimaryButton
          title="Yes"
          onClick={handleClose}
          style={{
            width: "70px",
            background: "rgba(204, 47, 47, 1)",
          }}
        />
      </DialogActions>
    </HivepathBaseDialog>
  );
};

export default CancelSessionDialog;
