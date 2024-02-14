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

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import EmailInput from "components/Common/Inputs/EmailInput";
import PasswordInput from "components/Common/Inputs/PasswordInput";
import TextInput from "components/Common/Inputs/TextInput";
import AuthFormDivider from "components/Common/AuthFormDivider";
import SocialAuthButtonGroup from "components/Common/SocialAuthButtonGroup";
import { signInSuccess } from "store/User/user.actions";
import authFetch from "utils/authFetch";
import { useCookies } from "react-cookie";

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
    fontWeight: theme.typography.fontWeightBold,
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
  logInButton: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
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
    width: "500px",
    maxWidth: "500px",
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
            color: "black",
            bgcolor: "rgba(0,0,0,0.1)",
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },
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

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SigninModal = ({ open }) => {
  const classes = useStyles();
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useSelector(mapState);
  const [rememberMe, setRememberMe] = useState(false);
  const [cookies, setCookie] = useCookies(["huid", "htoken"]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(setShowSignin(false));
  };

  const showSingupModal = () => {
    handleClose();
    dispatch(setShowSignup(true));
  };

  const showForgotPasswordModal = () => {
    handleClose();
    dispatch(setShowForgotPassword(true));
  };

  const data = {
    email: email,
    password: password,
  };

  const handleCheckbox = () => {
    setRememberMe(true);
  };

  useEffect(() => {
    if (currentUser) return;
  }, [currentUser]);

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();

    // fetch authentication
    authFetch("https://auth.hivepath.io/api/login", data)
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message, {
            variant: "success",
          });

          const USER_UID = json.user_data.user_id;
          const HUToken = json.user_data.login_token;

          setCookie("huid", USER_UID, {
            path: "/",
            domain: process.env.NODE_ENV === "production" && ".hivepath.io",
          });
          setCookie("htoken", HUToken, { path: "/" });

          dispatch(signInSuccess(json.user_data));

          setLoading(false);
        } else {
          setLoading(false);
          enqueueSnackbar(json.message, {
            variant: "error",
          });

          if (json.resend_verification) {
            authFetch("https://auth.hivepath.io/api/sendVerification", {
              email: email,
            })
              .then((json) => {
                if (json.status === "success") enqueueSnackbar(json.message);
              })
              .catch((error) => console.log(error));
          }
        }
      })
      .catch((error) => console.log("error: ", error));
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
        Login
      </BootstrapDialogTitle>
      <DialogContent>
        <div className={classes.container}>
          <div style={{ marginBottom: "24px" }} className={classes.root}>
            <form onSubmit={handleLogin} style={{ marginBottom: "24px" }}>
              <EmailInput email={email} setEmail={setEmail} />
              <PasswordInput
                isLoginPage
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  style={{ fontSize: "16px" }}
                  control={
                    <Checkbox
                      color="primary"
                      value={rememberMe}
                      onChange={handleCheckbox}
                      icon={<MdCheckBoxOutlineBlank fontSize="16px" />}
                      checkedIcon={<MdCheckBox fontSize="16px" />}
                    />
                  }
                  label={"Remember me"}
                />

                <Typography variant="body2">
                  <Link to="#" onClick={showForgotPasswordModal}>
                    Forgot Password?
                  </Link>
                </Typography>
              </div>
              <div
                style={{ textAlign: "center" }}
                className={classes.logInButton}
              >
                <PrimaryButton
                  type="submit"
                  title="Log In"
                  disabled={loading}
                  loading={loading}
                  // style={{ opacity: "0.5" }}
                />
              </div>
            </form>
            {/* <AuthFormDivider />

            <SocialAuthButtonGroup title="Login with one click" /> */}

            <div style={{ alignSelf: "center" }}>
              <Typography
                style={{ marginTop: "32px" }}
                variant="body1"
                align="center"
              >
                New User?{" "}
                <Link to="#" onClick={showSingupModal}>
                  {" "}
                  SignUp
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default SigninModal;
