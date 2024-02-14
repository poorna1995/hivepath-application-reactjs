import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/system";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.primary.main,
    // border: "1px solid rgba(0,0,0,0.1)",
    // display: "none",
    // border: "1px solid black",
    position: "relative",
    "&:hover": {
      backgroundColor: "#F0F0FE",
      display: "flex",
    },
    "&>p": {
      position: "absolute",
      top: "0px",
      opacity: "0",

      display: "flex",
      "&:hover": {
        opacity: 1,
        // display: "block",
      },
    },
  },
  hoverText: {
    display: "none",
  },
}));

const SPCustomDateContainer = styled(Container)(({ theme }) => ({
  // background: theme.palette.primary.main,
  border: "1px solid rgba(0,0,0,0.1)",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    color: theme.palette.common.white,
    // content: "Mark as available",
  },
}));

const SPCustomDateCell = ({ children }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const showContent = (e) => {
    setShow(true);
  };
  const hideContent = () => {
    setShow(false);
  };

  return (
    <div className={classes.root}>
      <p>Mark as Available</p>
      {children}
    </div>
  );
};

export default SPCustomDateCell;
