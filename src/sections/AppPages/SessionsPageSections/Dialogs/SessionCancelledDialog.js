import { Paper, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import GradientText from "components/Common/Typography/GradientText";
import React from "react";

const SessionCancelledDialog = ({ open, handleClose }) => {
  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <div
        style={{
          margin: "-16px",
          marginTop: "-64px",
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            //   height: 50,
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              lineHeight: "28px",
              marginTop: "16px",
            }}
          >
            Session Cancelled!
          </Typography>
          <Typography
            style={{
              fontWeight: "500",
              fontSize: "16px",
              lineHeight: "28px",
              marginTop: "24px",
              marginLeft: "32px",
              marginRight: "32px",
            }}
          >
            What are the important skill sets that you think one must possess to
            be successful in your field?{" "}
          </Typography>
        </Paper>
      </div>
    </HivepathBaseDialog>
  );
};

export default SessionCancelledDialog;
