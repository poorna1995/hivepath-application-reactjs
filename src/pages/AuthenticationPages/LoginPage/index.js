import { Checkbox, FormControlLabel } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthenticationLayout from "../../../Layouts/AuthenticationLayout";
import PasswordInput from "../../../components/Common/Inputs/PasswordInput";
import PrimaryButton from "../../../components/Common/Buttons/PrimaryButton";
import { Link, useHistory } from "react-router-dom";
import AuthFormDivider from "../../../components/Common/AuthFormDivider";
import SocialAuthButtonGroup from "../../../components/Common/SocialAuthButtonGroup";

import { useDispatch, useSelector } from "react-redux";
import authFetch from "../../../utils/authFetch";
import { signInSuccess } from "../../../store/User/user.actions";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import EmailInput from "../../../components/Common/Inputs/EmailInput";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import LogoutButton from "components/Common/Buttons/LogoutButton";
import { useCookies } from "react-cookie";
import signinImage from "assets/svg/auth-pages/signin.svg";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
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
    marginTop: "9%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
    },
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
const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useSelector(mapState);
  const [rememberMe, setRememberMe] = useState(false);

  const [cookies, setCookie] = useCookies(["huid", "htoken"]);
  // const
  // console.log(cookies);

  const [loading, setLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();

  const data = {
    email: email,
    password: password,
  };

  const handleCheckbox = () => {
    setRememberMe(true);
  };
  useEffect(() => {
    if (currentUser) history.push("/");
  }, [currentUser, history]);

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();

    // fetch authentication
    authFetch("https://auth.hivepath.io/api/login", data)
      .then((json) => {
        if (json.status === "success") {
          // console.log(json);
          enqueueSnackbar(json.message, {
            variant: "success",
          });
          // set user data to redux store currentUser

          // if (json.user_data.onboarding_done) return history.push("/");

          console.log(json.user_data.user_id);

          console.log(json.user_data.login_token);
          const USER_UID = json.user_data.user_id;
          const HUToken = json.user_data.login_token;
          console.log({ user_id: USER_UID, token: HUToken });
          setCookie("huid", USER_UID, {
            path: "/",
            domain: process.env.NODE_ENV === "production" && ".hivepath.io",
          });
          setCookie("htoken", HUToken, { path: "/" });

          dispatch(signInSuccess(json.user_data));

          setLoading(false);
          //  return  history.push("/add-info");
        } else {
          //   alert(json.message);
          console.log(json);
          setLoading(false);
          enqueueSnackbar(json.message, {
            variant: "error",
          });

          // alert(json.message);
          if (json.resend_verification) {
            authFetch("https://auth.hivepath.io/api/sendVerification", {
              email: email,
            })
              .then((json) => {
                if (json.status === "success") enqueueSnackbar(json.message);
                // console.log(json);
              })
              .catch((error) => console.log(error));
          }
        }
      })
      .catch((error) => console.log("error: ", error));
  };
  return (
    <AuthenticationLayout
      //   isLoginPage
      title="Login | Hivepath"
      backgroundTitle="Welcome to Hivepath"
      imgSrc={signinImage}
    >
      <div className={classes.container}>
        {/* <LogoutButton /> */}
        <div style={{ marginBottom: "24px" }}>
          {/* <LogoutButton /> */}
          <Typography
            variant="h3"
            component="h1"
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              marginBottom: "40px",
            }}
            color="#484A9E"
          >
            Log in to continue
          </Typography>

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
                <Link to="/reset-password">Forgot Password?</Link>
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

          <SocialAuthButtonGroup title="Log in with a click!" /> */}

          <div style={{ alignSelf: "center" }}>
            <Typography
              style={{ marginTop: "32px" }}
              variant="body1"
              align="center"
            >
              New user? Sign up <Link to="/sign-up">here!</Link>
              {/* New User?  SignUp */}
            </Typography>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default LoginPage;
