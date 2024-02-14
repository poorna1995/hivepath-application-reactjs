import React from "react";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog/index";
import GradientText from "components/Common/Typography/GradientText";
import { Typography } from "@mui/material";
import DialogSlideshow from "components/Common/Slideshow/DialogSlideshow";
import stepOneImage from "assets/images/dialogs/ks-onboarding-one.png";

import stepTwoImage from "assets/images/dialogs/ks-onboarding-two.png";
import { useHistory } from "react-router-dom";

const KSOnboardingDialog = ({ open, handleClose }) => {
  const history = useHistory();
  const handleCompleteClick = () => {
    history.push("/onboarding/knowledge-session/step-one");
  };

  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <DialogSlideshow
        steps={steps}
        completeButtonTitle={"Onboarding"}
        gradientText
        onClickSkip={handleClose}
        onClickComplete={handleCompleteClick}
      />
    </HivepathBaseDialog>
  );
};

export default KSOnboardingDialog;

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
