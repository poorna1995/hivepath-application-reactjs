import { Card, Typography } from "@mui/material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#FBF7FF",
    borderRadius: "20px",
    boxShadow: "none",
    padding: "16px",
  },
  countText: {
    fontWeight: "bold",
    fontSize: "21px",
    lineHeight: "27px",
    color: "#515151",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "160px",
    objectFit: "contain",
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "31px",
    color: "#333333",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  description: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

const StepInfoCard = ({ count, title, description, imgSrc, alignTitle }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {count && (
        <Typography className={classes.countText}>Step {count}</Typography>
      )}
      {imgSrc && <img src={imgSrc} alt="" className={classes.img} />}

      <Typography
        className={classes.title}
        style={{
          textAlign: alignTitle,
        }}
      >
        {title}
      </Typography>
      <Typography className={classes.description}>{description}</Typography>
    </Card>
  );
};

export default StepInfoCard;
