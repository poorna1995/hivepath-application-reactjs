import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "@mui/material";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import EmailInput from "components/Common/Inputs/EmailInput";
import TextInput from "components/Common/Inputs/TextInput";
import AuthenticationLayout from "Layouts/AuthenticationLayout";
import resetPasswordImage from "assets/svg/auth-pages/resetPassword.svg";

import authFetch from "utils/authFetch";
import { useDispatch } from "react-redux";
import { setResetPasswordEmail } from "store/User/user.actions";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    maxWidth: "600px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      marginTop: "32px",
    },
  },
  otherLinks: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "32px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

const ResetPasswordPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
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
          dispatch(setResetPasswordEmail(email));
          history.push("/reset-link");
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
  return (
    <AuthenticationLayout
      //   isLoginPage
      title="Reset Your Password - Hivepath"
      backgroundTitle="Welcome to Hivepath"
      imgSrc={resetPasswordImage}
    >
      <div className={classes.formContainer}>
        <div>
          <form onSubmit={handleResetPassword}>
            <Typography
              variant="h3"
              component="h1"
              style={{ marginBottom: "16px", fontWeight: 500 }}
              color="#484A9E"
            >
              Reset password
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "21px",
                color: "#000000",
              }}
            >
              Looks like you forgot your password, no worries! <br />
              <br />
              Just drop us your registered email below and follow the link
              attached to generate a new password for your Hivepath account.
            </Typography>
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              {/* <TextInput
                title="Email Address"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eg:harsh@gmail.com"
              /> */}
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

          <div className={classes.otherLinks} style={{}}>
            <Typography variant="body1">
              Remember password? <Link to="/login">Log in</Link>
            </Typography>
            <Typography variant="body1">
              New user? <Link to="/sign-up">Sign up</Link>
            </Typography>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default ResetPasswordPage;
