import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import AuthFormDivider from "components/Common/AuthFormDivider";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import EmailInput from "components/Common/Inputs/EmailInput";
import PasswordInput from "components/Common/Inputs/PasswordInput";
import TextInput from "components/Common/Inputs/TextInput";
import SocialAuthButtonGroup from "components/Common/SocialAuthButtonGroup";
import AuthenticationLayout from "Layouts/AuthenticationLayout";
import { signUpUserStart, signUpUserSuccess } from "store/User/user.actions";
import authFetch from "utils/authFetch";
import signupImage from "assets/svg/auth-pages/signup.svg";
import AccessCodeInput from "components/Common/Inputs/AccessCodeInput";

const mapState = ({ user, referralDetails }) => ({
  currentUser: user.currentUser,
  referLink: referralDetails.referralLink,
});
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    maxWidth: "600px",
    height: "100%",
    width: "100%",
    margin: "auto",
    marginLeft: "10%",
    marginTop: "6%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
    },
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

const SignUpPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const dispatch = useDispatch();

  const [disableButton, setDisableButton] = useState(true);
  const { currentUser, referLink } = useSelector(mapState);
  // console.log(referLink);
  const enqueueSnackbar = useEnquequeSnackbar();

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

  useEffect(() => {
    if (currentUser) history.push("/");
  });

  useEffect(() => {
    checkPassword(password, strongRegex);
    // console.log(checkPassword(password, strongRegex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);
  const handleFormSubmit = (e) => {
    setDisableButton(true);
    e.preventDefault();
    const signUpData = {
      firstname,
      lastname,
      email,
      password,
      referred_by_link: referLink,
      joining_access_code: accessCode,
      default_timezone:Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    // console.log(signUpData);
    authFetch("https://auth.hivepath.io/api/registration", signUpData)
      .then((json) => {
        // dispatch(signUpUserStart(email));
        setDisableButton(false);
        if (json.status === "success") {
          dispatch(signUpUserStart(email));
          dispatch(signUpUserSuccess(json.user_data));
          enqueueSnackbar(json.message, {
            variant: "success",
          });
          // history.push("/verify");
          setDisableButton(false);
        } else {
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
        // console.log(json);
      })
      .catch((error) => {
        setDisableButton(false);
        console.log(error);
      });
  };

  return (
    <AuthenticationLayout
      //   isLoginPage
      title="Create a new Account - Hivepath"
      backgroundTitle="Welcome to Hivepath"
      imgSrc={signupImage}
    >
      <div className={classes.container}>
        <div>
          <Typography
            variant="h3"
            component="h1"
            style={{ fontWeight: "bold", fontSize: "28px" }}
            color="#484A9E"
            mb={2}
          >
            Sign up for a hassle-free networking journey
          </Typography>

          <form onSubmit={handleFormSubmit} style={{ marginBottom: "24px" }}>
            <div>
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
                  {/* <TextInput
                    required
                    title="Email"
                    placeholder="eg:harsh@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  /> */}
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
                  // style={
                  //   disableButton
                  //     ? {
                  //         color: "white",
                  //         background: "rgba(235, 235, 235, 1)",
                  //       }
                  //     : {}
                  // }
                />
              </div>
            </div>
          </form>

          {/* <AuthFormDivider />

          <SocialAuthButtonGroup title="Log in with a click!" /> */}

          <Typography
            style={{ marginTop: "16px" }}
            variant="body1"
            align="center"
          >
            Already a user? Log in <Link to="/login">here!</Link>
          </Typography>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default SignUpPage;
