import { Typography, useTheme, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../Buttons/OutlinedButton";
import { FaFacebookSquare } from "react-icons/fa";
import { ReactComponent as GoogleIcon } from "../../../assets/svg/social-icons/google.svg";
import { ReactComponent as LinkedinIcon } from "../../../assets/svg/social-icons/linkedin.svg";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { LinkedIn } from "./LinkedinAuth/LinkedinComponent";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../../store/User/user.actions";
import authFetch from "../../../utils/authFetch";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import SocialButton from "../Buttons/SocialButton";
// import LinkedinAuthButton from "./LinkedinAuth/LinkedinAuthButton";
// import LinkedInComp from "./LinkedinAuth/Linkedin";
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
    fontWeight: 500,
    color: "black",
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  socialAuth: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
    },
  },
  // button: {
  //   [theme.breakpoints.down("xs")]: {
  //     marginTop:theme.spacing(1)
  //   }
  // }
}));

const SocialAuthButtonGroup = ({ title }) => {
  const classes = useStyles();
  const theme = useTheme();

  const googleClientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const facebookAppID = process.env.REACT_APP_FACEBOOK_APP_ID;
  const linkedinClientID = process.env.REACT_APP_LINKEDIN_AUTH_CLIENT_ID;

  const enqueueSnackbar = useEnquequeSnackbar();

  const history = useHistory();
  const dispatch = useDispatch();

  const ssoAuthAPI = `${process.env.REACT_APP_HIVEPATH_AUTH_API_URL}/ssoAuth`;

  // response from google onSuccess

  async function onGoogleSuccess(res) {
    console.log(res);
    const resFirstName = res?.profileObj.givenName;
    const reslastName = res?.profileObj.familyName;
    const resUserId = res?.profileObj.googleId;
    const resToken = res?.tokenObj.access_token;
    const resLoginType = "google";
    const resImageUrl = res?.profileObj.imageUrl;

    const resEmail = res?.profileObj.email;
    await handleLoginWithSSO({
      firstName: resFirstName,
      lastName: reslastName,
      email: resEmail,
      loginType: resLoginType,
      token: resToken,
      userId: resUserId,
      image_url: "",
    });
  }
  const onGoogleFailure = () => {
    // console.log(response);
  };

  // async function facebookLogin(res) {
  //   const resFirstName = res?.name?.split(" ")[0];
  //   const reslastName = res?.name?.split(" ")[1];
  //   const resUserId = res?.userID;
  //   const resToken = res?.accessToken;
  //   const resLoginType = "facebook";
  //   // const resImageUrl = res?.picture?.data?.url;
  //   const resEmail = res?.email;
  //   // console.log(res);

  //   await handleLoginWithSSO({
  //     firstName: resFirstName,
  //     lastName: reslastName,
  //     email: resEmail,
  //     loginType: resLoginType,
  //     token: resToken,
  //     userId: resUserId,
  //     image_url: "",
  //   });
  // }

  function handleLoginWithSSO({
    firstName,
    lastName,
    email,
    token,
    loginType,
    userId,
  }) {
    fetch(ssoAuthAPI, {
      method: "POST",
      headers: {
        mode: "no-cors",
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        token: token,
        login_type: loginType,
        sso_id: userId,
        image_url: "",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        if (json.status === "success") {
          enqueueSnackbar(json?.message, {
            variant: "success",
          });
          dispatch(signInSuccess(json.user_data));
          // console.log(json);
          // history.push("/add-info");
        } else {
          enqueueSnackbar(json?.message, {
            variant: "error",
          });
        }
      })
      .catch((error) => console.log(error));
  }

  const responseSuccessLinkedin = async (res) => {
    // console.log(res);
    const resToken = res?.code;
    const resRedirectUri = res?.redirectUri;
    await handleLinkedinSSOAuth({
      code: resToken,
      redirectUri: resRedirectUri,
    });
  };
  function handleLinkedinSSOAuth({ code, redirectUri }) {
    const data = {
      code,
      redirect_uri: redirectUri,
    };
    const url = `${process.env.REACT_APP_HIVEPATH_AUTH_API_URL}/linkedinssoAuth`;
    authFetch(`https://auth.hivepath.io/api/linkedinssoAuth`, data)
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message, {
            variant: "success",
          });
          dispatch(signInSuccess(json.user_data));
          // console.log(json);
          // history.push("/add-info");
        } else {
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
        console.log(json);
      })
      .catch((error) => console.log(error));
  }

  const responseFailedLinkedin = (error) => {
    // console.log(error);
  };

  return (
    <div>
      {title && (
        <Typography align="center" variant="body1">
          {title}
        </Typography>
      )}
      <div className={classes.socialAuth}>
        <GoogleLogin
          clientId={googleClientId}
          render={(renderProps) => (
            <SocialButton
              // className={classes.button}
              onClick={renderProps.onClick}
              // hideTitle={theme.breakpoints.down("xs")}

              startIcon={
                <GoogleIcon style={{ width: "20px", height: "20px" }} />
              }
              style={
                {
                  // height:'100px'
                }
              }
              title="Google"
            />
          )}
          onSuccess={onGoogleSuccess}
          onFailure={onGoogleFailure}
          cookiePolicy={"single_host_origin"}
        />

        <LinkedIn
          clientId={linkedinClientID}
          onFailure={responseFailedLinkedin}
          onSuccess={responseSuccessLinkedin}
          scope="r_emailaddress r_liteprofile w_member_social"
          redirectUri={`${process.env.REACT_APP_REDIRECT_URL}/linkedin`}
          renderElement={({ onClick, disabled }) => (
            <SocialButton
              // className={classes.button}

              onClick={onClick}
              disabled={disabled}
              // hideTitle={theme.breakpoints.down("xs")}
              startIcon={
                <LinkedinIcon style={{ width: "20px", height: "20px" }} />
              }
              title="Linkedin"
            ></SocialButton>
          )}
        />
        {/* <FacebookLogin
          appId={facebookAppID}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          callback={facebookLogin}
          render={(renderProps) => (
            <SocialButton
              // className={classes.button}
              // hideTitle={theme.breakpoints.down("xs")}
              // style={{ width: "120px" }}
              onClick={renderProps.onClick}
              startIcon={<FaFacebookSquare fill="#395185" />}
              title="Facebook"
            />
          )}
        /> */}
      </div>
    </div>
  );
};

export default SocialAuthButtonGroup;
