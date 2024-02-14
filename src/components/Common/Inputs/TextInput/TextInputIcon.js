import classes from "./TextInputIcon.module.css";

import { InputLabel, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const TextInputIcon = ({ title, required, ...props }) => {
  return (
    <div className={classes.container}>
      <div className={`center ${classes.imgContainer}`}>
        <img src={props.icon} />
      </div>
      <div className={`center ${classes.inputContainer}`}>
        <input placeholder={props.placeholder} {...props} />
      </div>
    </div>
  );
};

export default TextInputIcon;
