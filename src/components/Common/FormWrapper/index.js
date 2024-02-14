import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    maxWidth: "600px",
    height: "100%",
    width: "100%",
    margin: "auto",
  },
  label: {
    fontWeight: 500,
    color: "black",
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  socialAuth: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "flex-start",
    paddingTop: theme.spacing(2),
  },
}));

const FormWrapper = ({ title, children, titleFontSize }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography
        variant="h3"
        component="h1"
        style={{ fontWeight: "500", fontSize: `${titleFontSize}` }}
      >
        {title}
      </Typography>
      <div className={classes.formContainer}>{children}</div>
    </div>
  );
};

export default FormWrapper;
