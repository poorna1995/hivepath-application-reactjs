import React, { useState, forwardRef, useCallback } from "react";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";
import { SnackbarContent } from "notistack";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FaCheck } from "react-icons/fa";
import { ReactComponent as SuccessIcon } from "assets/svg/all/new-icons/snackbars/success.svg";
import { ReactComponent as ErrorIcon } from "assets/svg/all/new-icons/snackbars/error.svg";
import { ReactComponent as CloseIcon } from "assets/svg/all/new-icons/snackbars/close-icon.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    // boxShadow: "0px 4px 24px rgba(72, 74, 158, 0.1)",
    [theme.breakpoints.up("sm")]: {
      minWidth: "360px !important",
    },
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    boxShadow: "0px 4px 24px rgba(72, 74, 158, 0.1)",
    borderRadius: "10px",
  },
  typography: {
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "28px",
  },
  actionRoot: {
    padding: "16px 16px 16px 16px",
    justifyContent: "space-between",
  },
  icons: {
    marginLeft: "auto",
  },
  expand: {
    padding: "8px 8px",
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  collapse: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    color: "#b3b3b3",
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: "none",
  },
}));

const SnackMessage = forwardRef((props, ref) => {
  const classes = useStyles();

  const handleDismiss = () => {
    props.closeSnackbar(props.id);
  };

  // console.log({ props });
  // console.log(closeSnackbar(props.id))
  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          {props?.variant === "success" && (
            <>
              {props.iconVariant ? (
                props.iconVariant
              ) : (
                <SuccessIcon style={{ marginRight: "12px" }} />
              )}
            </>
          )}
          {props?.variant === "error" && (
            <>
              {props.iconVariant ? (
                props.iconVariant
              ) : (
                <ErrorIcon style={{ marginRight: "12px" }} />
              )}
            </>
          )}
          <Typography variant="subtitle2" className={classes.typography}>
            {props.message}
          </Typography>
          <div className={classes.icons}>
            <IconButton className={classes.expand} onClick={handleDismiss}>
              <CloseIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </SnackbarContent>
  );
});

export default SnackMessage;
