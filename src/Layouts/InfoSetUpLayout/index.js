import { Container, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Seo from "../../components/Seo";
import logo from "../../assets/svg/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserSuccess } from "../../store/User/user.actions";
import OutlinedButton from "../../components/Common/Buttons/OutlinedButton";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import authFetch from "utils/authFetch";
import { useEffect } from "react";
import { Box } from "@mui/system";

import backgroundImage from "assets/svg/general-onboarding/background.svg";

import hivepathLogoWhite from "assets/svg/general-onboarding/hivepath-logo-white.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "white",
    minHeight: "100vh",
  },
  children: {
    maxWidth: "600px",
    margin: "auto",
    height: "100%",
    flex: 0.65,
    paddingBottom: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      flex: 1,
      // marginTop:'32px'
    },
  },

  logo: {
    width: "200px",
    height: "50px",
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      height: "40px",
      width: "160px",
    },
  },
  header: {
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    padding: theme.spacing(1),
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      paddingLeft: 0,
    },
  },
  backgroundImage: {
    position: "relative",
    flex: 0.35,
    background: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    minHeight: "100vh",
    // height: "100%",
    top: "0px",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logoContainer: {
    position: "sticky",
    top: "50px",
    left: "50px",
  },
  textContainer: {
    top: "35vh",
    position: "sticky",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textStyle: {
    fontWeight: " bold",
    fontSize: "36px",
    lineHeight: "44px",
    color: "white",
    textAlign: "center",
  },
}));
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const STAGES = {
  ONE: "stage1",
  TWO: "stage2",
};
const InfoSetUpLayout = ({ title, imgSrc, backgroundTitle, children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const enqueueSnackbar = useEnquequeSnackbar();

  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser?.user_id;
  // const
  const ONBOARDING_DONE = currentUser?.onboarding_done;
  const ONBOARDING_DATA = currentUser.onboarding_data;

  const ONBOARDING_STAGE_ONE_COMPLETE =
    ONBOARDING_DATA?.stage1?.status === "complete";
  const ONBOARDING_STAGE_TWO_COMPLETE =
    ONBOARDING_DATA?.stage2?.status === "complete";

  const history = useHistory();
  const [currentPageURL, setCurrentPageURL] = React.useState("");
  const location = useLocation();
  const pathname = location.pathname;
  const handleLogout = () => {
    authFetch("https://auth.hivepath.io/api/logout", {
      user_id: USER_ID,
    })
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json?.message, {
            variant: "success",
          });
          dispatch(signOutUserSuccess(USER_ID));
          return history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (currentUser && ONBOARDING_DONE) {
    // return
    history.push("/");
    // }

    // if (currentUser && !ONBOARDING_STAGE_ONE_COMPLETE) {
    //   // if (pathname !== "/add-info/step-one") return;
    //   return history.push("/add-info/step-one");
    // }
    // if (currentUser && !ONBOARDING_STAGE_TWO_COMPLETE) {
    //   // if (ONBOARDING_STAGE_ONE_COMPLETE) return;
    //   // if (pathname !== "/add-info/step-two") return;

    //   return history.push("/add-info/step-two");
    // }
  }, [
    currentUser,
    ONBOARDING_DONE,
    history,
    ONBOARDING_STAGE_ONE_COMPLETE,
    ONBOARDING_STAGE_TWO_COMPLETE,
    pathname,
  ]);
  useEffect(() => {
    // setCurrentPageURL()
    const url = window.location.pathname;
    setCurrentPageURL(url);
  }, [currentPageURL]);

  // useEffect

  return (
    <div className={classes.root}>
      <Seo title={title} />
      <header className={classes.header}>
        <Container
          maxWidth="lg"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Link to="/add-info/step-one"> */}
          <img src={logo} alt="" className={classes.logo} />
          {/* </Link> */}
          {/* <OutlinedButton onClick={handleLogout} title="Logout" /> */}
          <span style={{ fontSize: "14px", fontWeight: "700" }}>
            logged in as: {currentUser.email}
          </span>
        </Container>
      </header>
      <span
        style={{
          fontSize: "14px",
          fontWeight: "700",
          position: "absolute",
          // position: "fixed",
          top: "10px",
          right: "50px",
        }}
      >
        logged in as: {currentUser.email}
      </span>

      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "start",
        }}
      >
        <div className={classes.backgroundImage}>
          {/* <img src={backgroundImage} alt="onboarding bg" /> */}

          <Link to={currentPageURL} className={classes.logoContainer}>
            <img src={hivepathLogoWhite} alt="" className={classes.logo} />
          </Link>
          <div className={classes.textContainer}>
            <Typography className={classes.textStyle}>
              {backgroundTitle}
            </Typography>
            <img src={imgSrc} alt="" style={{ maxWidth: "100%" }} />
          </div>
        </div>

        <Container className={classes.children}>{children}</Container>
      </div>
    </div>
  );
};

export default InfoSetUpLayout;
