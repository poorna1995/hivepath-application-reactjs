import React from "react";

import { makeStyles } from "@mui/styles";

import {
  Avatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { ReactComponent as ArrowIcon } from "assets/svg/all/new-icons/dropdown-menu/arrow-out-icon.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "8px",
    marginLeft: "16px",
    marginRight: "16px",
    "&:hover": {
      borderRadius: "10px",
      background: "#f7f7f7",
      "& > div:first-child": {
        // background: "rgba(229, 79, 109, 0.1)",
      },
      "& > div>span>a>p": {
        "&::after": {
          transform: "scaleX(1)",
          opacity: 1,
          transition: "0.4s cubic-bezier(0.24, 1.08, 0.7, 0.86)",
        },
      },
      "&>svg": {
        opacity: 1,
      },
    },
  },
  listItemIcon: {
    // background: "#F8F8F8",
    padding: "8px",
    borderRadius: "7px",
    marginRight: "8px",
    "&:hover": {
      //   background: "rgba(229, 79, 109, 0.1)",
    },
  },

  icon: {
    // marginLeft: "8px",
    width: "20px",
    height: "20px",
  },
  primaryText: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "26px",
    // letterSpacing: "-0.03em",
    backgroundColor: "rgba(24, 61, 255, 1)",
    backgroundImage:
      "linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    display: "inline-block",
    WebkitTextFillColor: "transparent",
    backgroundRepeat: "repeat",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
    position: "relative",
    "&::after": {
      content: '""',
      position: " absolute",
      height: "2px",
      backgroundColor: " rgba(24, 61, 255, 1)",
      backgroundImage:
        "linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%)",

      left: 0,
      right: 0,
      bottom: "0px",
      opacity: 0,
      transform: "scaleX(0)",
      transformOrigin: "left center",
    },
    "&:hover": {
      "&::after": {
        transform: "scaleX(1)",
        opacity: 1,
        transition: "0.8s cubic-bezier(.49,0,.67,1.06)",
      },
    },
  },
  secondaryText: {
    fontWeight: "500",
    color: "#515151",
    fontSize: "10px",
    lineHeight: "13px",
  },
  arrowIcon: {
    opacity: 0,
    marginLeft: "4px",
  },
}));

const UserProfileMenuItem = ({
  userImage,
  userName,
  slug_id,
  USER_PROFILE_ONBOARDING_DONE,
}) => {
  const classes = useStyles();
  let url = "/onboarding/user-profile/step-one";
  if (USER_PROFILE_ONBOARDING_DONE) {
    url = `/u/${slug_id}`;
  }

  return (
    <MenuItem
      className={classes.root}
      component={Link}
      to={url}
      target="_blank"
    >
      <ListItemIcon className={classes.listItemIcon}>
        <Avatar src={userImage} style={{ width: "46px", height: "46px" }} />
      </ListItemIcon>
      <ListItemText
        className={classes.listItemText}
        primary={
          <Link to={url} target="_blank">
            <Typography className={classes.primaryText}>{userName}</Typography>
          </Link>
        }
        secondary={
          USER_PROFILE_ONBOARDING_DONE ? "View profile" : "Complete onboarding"
        }
        secondaryTypographyProps={{
          style: {
            color: "#222222",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "17px",
            letterSpacing: "-0.02em",
          },
        }}
      />
      <ArrowIcon className={classes.arrowIcon} />
    </MenuItem>
  );
};

export default UserProfileMenuItem;
