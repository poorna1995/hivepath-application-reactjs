import React from "react";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog/index";
import GradientText from "components/Common/Typography/GradientText";
import { Typography } from "@mui/material";
import dialogBackground from "assets/svg/all/new-icons/dialog-backgrounds.png";
import DialogSlideshow from "components/Common/Slideshow/DialogSlideshow";

import stepOneImage from "assets/images/dialogs/profile-step-one-dialog.png";

import stepTwoImage from "assets/images/dialogs/profile-step-two-dialog.png";
import { useHistory } from "react-router-dom";

const LandingPageOnboardingAlertDialog = ({ open, handleClose }) => {
  const history = useHistory();
  const handleCompleteClick = () => {
    history.push("/onboarding/user-profile/step-one");
  };

  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      {/* <img src='' alt="" /> */}
      <DialogSlideshow
        steps={steps}
        completeButtonTitle={"Profile"}
        gradientText
        onClickSkip={handleClose}
        onClickComplete={handleCompleteClick}
      />
      {/* <GradientText  >

        </GradientText>
        <Typography>
        Welcome to Hivepath!
        </Typography>
        <Typography>
        Let us connect, share, and create a world full of information together.
        </Typography> */}
    </HivepathBaseDialog>
  );
};

export default LandingPageOnboardingAlertDialog;

const steps = [
  {
    label: "Welcome to Hivepath!",
    imgSrc: stepOneImage,
    message:
      "Let us connect, share, and create a world full of information together.",
  },
  {
    label: "Let everyone know you!",
    imgSrc: stepTwoImage,
    message:
      "Provide your information and connect with professionals around the world. ",
  },
];
