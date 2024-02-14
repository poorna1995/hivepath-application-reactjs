import { InputLabel, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    maxWidth: "600px",
    height: "100%",
    width: "100%",
    margin: "auto",
  },
  label: {
    color: "black",
    margin: theme.spacing(1),
    marginLeft: 0,
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "19px",
    letterSpacing: "-3%",
  },
}));

const TextInput = ({ title, required, noMargin, ...props }) => {
  const classes = useStyles();
  return (
    // no margin change made by swastik, this should be fixed
    <div
      style={{ marginTop: noMargin ? "" : "24px" }}
      className={props.customStyle ? classes.container : ""}
    >
      {title && (
        <InputLabel required={required} className={classes.label}>
          {title}
        </InputLabel>
      )}
      <TextField
        inputProps={{
          style: {
            paddingTop: "15px",
            paddingBottom: "14px",
            borderRadius: "10px",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        }}
        fullWidth
        variant="outlined"
        {...props}
      />
    </div>
  );
};

export default TextInput;
