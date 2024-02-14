import { Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "auto",
    textTransform: "none",
    height: "48px",
    background: "rgb(45, 45, 45) none repeat scroll 0% 0%",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    paddingLeft: "24px",
    paddingRight: "24px",
    borderRadius: "10px",
    "&:hover": {
      background: "#010113",
    },
    [theme.breakpoints.down("sm")]: {
      height: "42px",
      // width: "130px",
      fontWeight: "500",
    },
  },
}));
const NoDataButton = ({ title, disabled, ...props }) => {
  const classes = useStyles();

  return (
    <>
      {disabled === true ? (
        <Button
          disabled
          disableRipple
          className={classes.button}
          style={{ color: "white", background: "rgba(235, 235, 235, 1)" }}
          {...props}
        >
          {title}
        </Button>
      ) : (
        <Button disableRipple className={classes.button} {...props}>
          {title}
        </Button>
      )}
    </>
  );
};

export default NoDataButton;
