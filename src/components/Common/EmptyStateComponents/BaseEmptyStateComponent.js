import { Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import PrimaryButton from "../Buttons/PrimaryButton";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "400px",
    alignItems: "center",

    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  shortDescription: {
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "27px",
  },
  message: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "27px",
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  image: {
    height: "250px",
  },
}));

const BaseEmptyStateComponent = ({
  imgSrc,
  message,
  height,
  shortDescription,
  shortDescriptionStyles,
  messageStyles,
  imageStyles,
  containerStyles,
  buttonTitle,
  onButtonClick,
  customComponent,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={containerStyles}>
      <img src={imgSrc} alt="" className={classes.image} style={imageStyles} />

      <Typography className={classes.message} style={messageStyles}>
        {message}
      </Typography>
      {shortDescription && (
        <Typography
          className={classes.shortDescription}
          style={shortDescriptionStyles}
        >
          {shortDescription}
        </Typography>
      )}
      {buttonTitle && (
        <PrimaryButton
          title={buttonTitle || "explore"}
          onClick={onButtonClick}
          style={{
            borderRadius: "10px",
            marginTop: "16px",
          }}
        />
      )}
      {customComponent && customComponent}
    </div>
  );
};

export default BaseEmptyStateComponent;
