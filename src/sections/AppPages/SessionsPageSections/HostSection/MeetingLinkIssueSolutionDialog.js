import { Typography } from "@mui/material";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import React from "react";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import LinkGoogleMeet from "sections/AppPages/OnboardingPages/KnowledgeSession/StepThreeSections/LinkGoogleMeet";

const MeetingLinkIssueSolutionDialog = ({ open, handleClose }) => {
  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <div style={{ padding: "16px", maxWidth: "500px" }}>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "26px",
            lineHeight: "34px",
          }}
        >
          Facing issue with creating a meeting link!
        </Typography>

        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "22px",
            lineHeight: "28px",
            paddingBottom: "16px",
            marginTop: "32px",
          }}
        >
          Try linking your account again. Click on Add account to sync account.
        </Typography>
        {/* <Typography>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
            </li>
          </ul>
        </Typography> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <PrimaryButton title={`Resync Google Account`}  /> */}
          <LinkGoogleMeet noImage />
        </div>
      </div>
    </HivepathBaseDialog>
  );
};

export default MeetingLinkIssueSolutionDialog;
