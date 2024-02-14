import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import { FaCheck, FaCheckSquare } from "react-icons/fa";
import LPStatusCardBase from "./LPStatusCardBase";
import { ReactComponent as CheckIcon } from "assets/svg/all/new-icons/landing-page/check-square.svg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    "& path": {
      fill: theme.palette.success.dark,
    },
  },
}));

const iconStyle = {
  height: "16px",
  width: "16px",
};
const ProfileOnboardingStatusCard = () => {
  const classes = useStyles();
  const list = [
    {
      icon: <CheckIcon className={classes.icon} style={iconStyle} />,
      title: "Complete your user profile ",
      component: (
        <PrimaryButton title={`Complete`} style={{ height: "32px" }} />
      ),
    },
    {
      icon: <CheckIcon style={iconStyle} />,
      title: "Book Your first 1:1 session with a host",
      component: "",
    },
    {
      icon: <CheckIcon style={iconStyle} />,
      title: "Inivte your network and share the word",
      component: "",
    },
  ];
  return (
    <LPStatusCardBase
      title={`Let's start with `}
      list={list}
    ></LPStatusCardBase>
  );
};

export default ProfileOnboardingStatusCard;
