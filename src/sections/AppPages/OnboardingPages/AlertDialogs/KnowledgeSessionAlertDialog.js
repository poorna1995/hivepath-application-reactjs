import React from "react";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog/index";
import GradientText from "components/Common/Typography/GradientText";
import { Paper, Typography } from "@mui/material";

import stepOneImage from "assets/images/dialogs/profile-step-one-dialog.png";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";

const KnowledgeSessionAlertDialog = ({ open, handleClose }) => {
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
          {" "}
          <img src={stepOneImage} style={{ width: "100%" }} alt="" />
          <GradientText
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              lineHeight: "28px",
              marginTop: "16px",
            }}
          >
            Congratulations!
          </GradientText>
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
            Your request for Knowledge Sessions has been approved! You are a
            Host now!
          </Typography>
          <PrimaryButton
            title={"Explore"}
            onClick={handleClose}
            style={{
              margin: "16px",
            }}
          />
        </Paper>
      </div>
    </HivepathBaseDialog>
  );
};

export default KnowledgeSessionAlertDialog;
