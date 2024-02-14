import { Typography } from "@mui/material";
import { useState } from "react";
import InfoSetUpLayout from "../../../Layouts/InfoSetUpLayout";
import StepOne from "../../../sections/InfoPage/StepOne";
import { makeStyles } from "@mui/styles";

import stepOneImage from "assets/svg/general-onboarding/step-one-card.svg";
import WelcomePage from "../WelcomePage";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "480px",
    margin: "auto",
    paddingTop: "16px",
  },
  row: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    paddingTop: "8px",
  },
}));
const StepOnePage = () => {
  const classes = useStyles();
  // const [showStageOne, setShowStageOne] = useState(false);

  // if (!showStageOne) {
  //   return <WelcomePage setShowStageOne={setShowStageOne} />;
  // }

  return (
    <InfoSetUpLayout
      title="Add Profile Data"
      imgSrc={stepOneImage}
      backgroundTitle={"Tell us about yourself"}
    >
      <StepOne />
    </InfoSetUpLayout>
  );
};

export default StepOnePage;
