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

import authFetch from "utils/authFetch";
import { signUpUserStart, signUpUserSuccess } from "store/User/user.actions";
import {
  setShowSignup,
  setShowSignin,
} from "store/user-profile/userProfileSlice";

import { makeStyles } from "@mui/styles";
import AccessCodeInput from "components/Common/Inputs/AccessCodeInput";
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

  firstRow: {
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      paddingRight: 0,
    },
  },
  helperText: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
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

const SignupModal = ({ open }) => {
  const classes = useStyles();
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const handleClose = () => {
    dispatch(setShowSignup(false));
  };

  const showSinginModal = () => {
    handleClose();
    dispatch(setShowSignin(true));
  };

  const [disableButton, setDisableButton] = useState(true);
  const handleFormSubmit = (e) => {
    setDisableButton(true);
    e.preventDefault();
    const signUpData = {
      firstname,
      lastname,
      email,
      password,
      joining_access_code: accessCode,
      default_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    authFetch("https://auth.hivepath.io/api/registration", signUpData)
      .then((json) => {
        setDisableButton(false);
        if (json.status === "success") {
          dispatch(signUpUserSuccess(json.user_data));
          dispatch(signUpUserStart(email));
          enqueueSnackbar(json.message, {
            variant: "success",
          });

          // history.push("/verify");
        } else {
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  // 37FC92
  useEffect(() => {
    checkPassword(password, strongRegex);
  }, [password]);

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const checkPassword = (str, regex) => {
    if (regex.test(str)) {
      setDisableButton(false);
      return "enable button";
    } else {
      setDisableButton(true);
      return "disable button";
    }
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
        Register
      </BootstrapDialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <div className={classes.root}>
            <Grid container>
              <Grid item xs={12} md={6} className={classes.firstRow}>
                <TextInput
                  required
                  title="First name"
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  required
                  title="Last name"
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <EmailInput email={email} setEmail={setEmail} />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  required
                  helperText={
                    "Use 8 or more characters with a mix of letters, numbers & symbols"
                  }
                  FormHelperTextProps={{
                    className: classes.helperText,
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <AccessCodeInput
                  title={`Invitation code`}
                  required
                  value={accessCode.toUpperCase()}
                  onChange={(e) => setAccessCode(e)}

                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div style={{ alignSelf: "center", paddingTop: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <PrimaryButton
                disabled={
                  disableButton ||
                  !firstname ||
                  !lastname ||
                  !email ||
                  accessCode.length < 6
                }
                type="submit"
                title="Sign Up"
                loading={disableButton}
                style={
                  disableButton
                    ? {
                        color: "white",
                        background: "rgba(235, 235, 235, 1)",
                      }
                    : {}
                }
              />
            </div>
          </div>
        </form>

        {/* <AuthFormDivider /> */}
        <div style={{ width: "100%", marginBottom: "24px" }}>
          {/* <SocialAuthButtonGroup title="Sign up with one click" /> */}

          <Typography
            style={{ marginTop: "16px" }}
            variant="body1"
            align="center"
            mb={1}
          >
            Already Registered?{" "}
            <Link to="#" onClick={showSinginModal}>
              {" "}
              Login
            </Link>
          </Typography>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default SignupModal;
