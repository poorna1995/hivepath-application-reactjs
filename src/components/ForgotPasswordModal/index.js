import { Checkbox, FormControlLabel } from "@mui/material";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { IconButton, Grid, Typography } from "@mui/material";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";

import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import EmailInput from "components/Common/Inputs/EmailInput";

import authFetch from "utils/authFetch";

import {
  setShowSignin,
  setShowSignup,
  setShowForgotPassword,
} from "store/user-profile/userProfileSlice";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-root": {
      color: "#333333",
    },
    "& .MuiOutlinedInput-root": {
      height: "50px",
      boxSizing: "border-box",
      borderRadius: "10px",
    },
  },
  formContainer: {
    // maxWidth: "600px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  //   "& .MuiPaper-elevation": {
  //     width: "800px",
  //     maxWidth: "800px",
  //   },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "100%",
    maxHeight: "600px",
    padding: "10px 30px 0 30px",
  },
  "& .MuiPaper-root": {
    borderRadius: "15px",
    width: "600px",
    maxWidth: "600px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ForgotPasswordModal = ({ open }) => {
  const classes = useStyles();
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const data = {
    email,
  };
  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    authFetch("https://auth.hivepath.io/api/forgotPassword", data)
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message, {
            variant: "success",
          });
          setLoading(false);
          showSinginModal();
          //   history.push("/reset-link");
        } else {
          setLoading(false);
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }

        //
      })
      .catch((error) => {
        //
      });
    // history.push("/reset-link");
  };

  const handleClose = () => {
    dispatch(setShowForgotPassword(false));
  };

  const showSingupModal = () => {
    handleClose();
    dispatch(setShowSignup(true));
  };

  const showSinginModal = () => {
    handleClose();
    dispatch(setShowSignin(true));
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        align="left"
        sx={{ fontWeight: "bold", fontSize: "24px" }}
      >
        Reset your password
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mb={2}>
          <div className={classes.formContainer}>
            <div className={classes.root}>
              <form onSubmit={handleResetPassword}>
                <div style={{ marginTop: "16px", marginBottom: "16px" }}>
                  <EmailInput email={email} setEmail={setEmail} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <PrimaryButton
                    type="submit"
                    title="Reset Password"
                    disabled={!email || loading}
                    loading={loading}
                    // onClick={handleResetPassword}
                  />
                </div>
              </form>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "32px",
                }}
              >
                <Typography variant="body1">
                  Remember your Password?{" "}
                  <Link to="#" onClick={showSinginModal}>
                    Login
                  </Link>
                </Typography>
                {/* <Typography variant="body1">
                  New User?{" "}
                  <Link to="#" onClick={showSingupModal}>
                    SignUp
                  </Link>
                </Typography> */}
              </div>
            </div>
          </div>
        </Grid>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ForgotPasswordModal;
