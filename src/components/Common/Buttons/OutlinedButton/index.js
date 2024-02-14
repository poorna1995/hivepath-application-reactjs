import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "capitalize",
    width: "auto",
    height: "50px",
    borderRadius: "10px",
    // border: "2px solid ",
    color: "#222222",
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: "600",
    background: "#ececec",
    paddingLeft: "24px",
    paddingRight: "24px",

    // borderColor: theme.palette.primary.main,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      height: "42px",
      // width: "100px",
      fontWeight: "500",
    },
  },
}));
const OutlinedButton = ({ title, hideTitle, ...props }) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} {...props}>
      {!hideTitle && title}
    </Button>
  );
};

export default OutlinedButton;
