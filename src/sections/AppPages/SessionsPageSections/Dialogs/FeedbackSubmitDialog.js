import { Paper, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import GradientText from "components/Common/Typography/GradientText";
import React from "react";
import feedbackSubmit from "assets/images/dialogs/feedback-submit.png";

const FeedbackSubmitDialog = ({ open, handleClose, userName }) => {
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
          <img src={feedbackSubmit} style={{ width: "100%" }} alt="" />
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
            Your valuable feedback helps{" "}
            <GradientText
              style={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "28px",
              }}
            >
              {userName}
            </GradientText>{" "}
            learn & improve.
            <br />
            Keep helping one another!{" "}
          </Typography>
          <PrimaryButton
            title={"Go to Home"}
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

export default FeedbackSubmitDialog;
