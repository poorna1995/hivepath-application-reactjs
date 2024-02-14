import { Typography } from "@mui/material";
import React from "react";
import InfoSetUpLayout from "../../../Layouts/InfoSetUpLayout";
import Welcome from "../../../sections/InfoPage/Welcome";
import { makeStyles } from "@mui/styles";

import welcomeImage from "assets/svg/general-onboarding/welcome.svg";
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
const WelcomePage = () => {
  const classes = useStyles();
  return (
    <InfoSetUpLayout
      title="Welcome"
      imgSrc={welcomeImage}
      backgroundTitle={"Welcome!"}
    >
      <Welcome />
    </InfoSetUpLayout>
  );
};

export default WelcomePage;
