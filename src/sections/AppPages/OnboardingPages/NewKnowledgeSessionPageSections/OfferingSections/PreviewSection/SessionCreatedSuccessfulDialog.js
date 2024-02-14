import { Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import GradientText from "components/Common/Typography/GradientText";
import React from "react";

const SessionCreatedSuccessfulDialog = ({ open, handleClose }) => {
  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <GradientText style={{ fontSize: "28px", fontWeight: "700" }}>
          Thank you!
        </GradientText>
        <Typography style={{ fontSize: "24px", fontWeight: "700" }}>
          Your offering has been created!
        </Typography>
      </div>
      {/* <div>
        <PrimaryButton title={`Close`} onClick={handleClose} />
      </div> */}
    </HivepathBaseDialog>
  );
};

export default SessionCreatedSuccessfulDialog;
