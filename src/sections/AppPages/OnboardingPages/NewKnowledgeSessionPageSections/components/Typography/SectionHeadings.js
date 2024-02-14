import { Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  headingText: {
    fontWeight: "bold",
    fontSize: "36px",
    lineHeight: "47px",
    color: "#484A9E",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
      lineHeight: "32px",
    },
  },
  descriptionText: {
    fontWeight: "500",
    fontSize: " 18px",
    lineHeight: "26px",
    /* identical to box height, or 144% */

    color: " #333333",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      lineHeight: "22px",
    },
  },
}));

const OnboardingSectionHeadings = ({
  title,
  description,
  containerStyles,
  headingStyles,
  descriptionStyles,
}) => {
  const classes = useStyles();
  return (
    <div style={containerStyles}>
      {title && (
        <Typography
          variant="h3"
          className={classes.headingText}
          style={headingStyles}
        >
          {title}
        </Typography>
      )}
      {description && (
        <Typography
          className={classes.descriptionText}
          style={descriptionStyles}
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

export default OnboardingSectionHeadings;
