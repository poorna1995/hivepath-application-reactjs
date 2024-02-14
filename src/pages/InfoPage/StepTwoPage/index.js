import { Typography } from "@mui/material";
import React from "react";
import InfoSetUpLayout from "../../../Layouts/InfoSetUpLayout";

import StepTwo from "../../../sections/InfoPage/StepTwo";

import stepOneImage from "assets/svg/general-onboarding/step-two-card.svg";

const StepTwoPage = () => {
  return (
    <InfoSetUpLayout
      title="Add Profile Data"
      imgSrc={stepOneImage}
      backgroundTitle={`Update your details `}
    >
      <StepTwo />
    </InfoSetUpLayout>
  );
};

export default StepTwoPage;
