import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(240, 240, 254, 1)",
    // width: "100%",
    // color: theme.palette.common.white,
    // paddingLeft:'8px'
    // padding: 0,
  },
}));

const SPCustomEventWrapper = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default SPCustomEventWrapper;
