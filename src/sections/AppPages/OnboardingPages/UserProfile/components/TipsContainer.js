import React from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#F3F3F3",
    // border: "1px solid rgba(72, 74, 158, 0.1)",
    // boxShadow: "0px 0px 50px 5px rgba(72, 74, 158, 0.06)",
    borderRadius: "20px",
    width: "100%",
    padding: "16px 16px 10px 16px",
    // paddingLeft: "20px",

    "& ul": { paddingLeft: "20px" },
    "& ol": { paddingLeft: "20px" },
    "& li": {
      marginBottom: "15px",
      marginTop: "10px",
    },
  },
}));

const TipsContainer = (props) => {
  const classes = useStyles();
  const { noBoxShadow } = props;

  return (
    <div
      className={classes.root}
      style={{
        boxShadow: noBoxShadow && "none",
        border: noBoxShadow && "none",
      }}
    >
      {props.children}
    </div>
  );
};

export default TipsContainer;
