import { Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "auto",
    // minWidth: "150px",
    height: "48px",
    background: "#484A9E",
    textTransform: "capitalize",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    paddingLeft: "24px",
    paddingRight: "24px",
    borderRadius: "10px",
    "&:hover": {
      background: "rgba(72, 74, 158, 0.8)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "42px",
      // width: "130px",
      fontWeight: "500",
    },
  },
}));
const PrimaryButton = ({ title, disabled, ...props }) => {
  const classes = useStyles();

  return (
    <>
      {disabled === true ? (
        <Button
          disabled
          disableRipple
          className={classes.button}
          sx={{
            color: "#c2c2c2 !important ",
            backgroundColor: "rgba(235, 235, 235, 1) !important",
          }}
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

export default PrimaryButton;
