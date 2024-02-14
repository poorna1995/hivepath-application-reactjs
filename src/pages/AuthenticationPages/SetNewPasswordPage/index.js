/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SuccessDialog from "components/Common/Dialog/SuccessDialog";
import PasswordInput from "components/Common/Inputs/PasswordInput";
import AuthenticationLayout from "Layouts/AuthenticationLayout";
import { setResetPasswordToken } from "store/User/user.actions";
import authFetch from "utils/authFetch";
import resetPasswordImage from "assets/svg/auth-pages/resetPassword.svg";

const mapState = ({ user }) => ({
  resetPasToken: user.resetPasswordToken,
});

const useStyles = makeStyles((theme) => ({
  formContainer: {
    maxWidth: "600px",
    margin: "auto",
    marginLeft: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
  },
}));

const SetNewPasswordPage = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { resetPasToken } = useSelector(mapState);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const description =
    "You are all set to begin your Networking journey. Welcome back!  Please don't forget your password and save it somewhere safe.";

  const enqueueSnackbar = useEnquequeSnackbar();

  const data = {
    password: password,
    confirm_password: confirmPassword,
    token: resetPasToken,
  };
  const handleMatchPasswords = () => {
    if (password !== confirmPassword) {
      return setError(true);
    } else {
      setError(false);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError(true);
    }
    authFetch("https://auth.hivepath.io/api/resetPassword", data)
      .then((json) => {
        if (json.status === "success") {
          setOpen(true);
        } else {
          // alert(json.message);
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }

        //
      })
      .catch((error) => {
        //
      });
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setResetPasswordToken(""));
    enqueueSnackbar("Login To your account to continue!", {
      variant: "info",
    });
    history.push("/login");
  };

  // useEffect(() => {
  //   if (!resetPasToken) history.push("/reset-password");
  // }, [resetPasToken]);

  return (
    <AuthenticationLayout
      //   isLoginPage
      title="Set a new Password for your Account"
      backgroundTitle="Welcome to Hivepath"
      imgSrc={resetPasswordImage}
    >
      <div className={classes.formContainer}>
        <div>
          <form onSubmit={handleFormSubmit}>
            <Typography
              variant="h3"
              component="h1"
              style={{ marginBottom: "16px", fontWeight: 500 }}
            >
              Set New Password{" "}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "21px",

                color: "#000000",
              }}
            >
              Please set a new password for your Hivepath account to continue
              your networking journey. Make sure you use a strong password to
              keep your account safe.
            </Typography>
            <div style={{ marginTop: "32px", marginBottom: "16px" }}>
              <PasswordInput
                required
                error={error}
                value={password}
                title="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ marginTop: "32px" }}>
                <PasswordInput
                  required
                  error={error}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleMatchPasswords}
                  title="Confirm New Password"
                  helperText={error && `Passwords don't match`}
                />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <PrimaryButton
                title="Reset Password"
                type="submit"
                // onClick={handleClickOpen}
              />
            </div>
          </form>
        </div>
      </div>
      <SuccessDialog
        handleClose={handleClose}
        open={open}
        description={description}
      />
    </AuthenticationLayout>
  );
};

export default SetNewPasswordPage;
