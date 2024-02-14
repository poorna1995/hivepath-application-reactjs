import React from "react";
import Seo from "../../components/Seo";

import { makeStyles } from "@mui/styles";
import loginImageBg from "../../assets/svg/login-image.svg";
import logo from "../../assets/svg/logo.svg";
import verifyImageBg from "../../assets/svg/verification.svg";
import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";

//--------------------
import backgroundImage from "assets/svg/general-onboarding/background.svg";
import hivepathLogoWhite from "assets/svg/general-onboarding/hivepath-logo-white.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "white",
    minHeight: "100vh",
  },
  children: {
    // maxWidth: "600px",
    margin: "auto",
    height: "100%",
    paddingBottom: theme.spacing(12),
    flex: 0.65,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      flex: 1,
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

const AuthenticationLayout = ({
  title,
  imgSrc,
  backgroundTitle,
  children,
  isLoginPage,
  isVerificationPage,
}) => {
  const classes = useStyles();
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
          <img src={logo} alt="" className={classes.logo} />

          {/* <OutlinedButton onClick={handleLogout} title="Logout" /> */}
        </Container>
      </header>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "start",
        }}
      >
        <div className={classes.backgroundImage}>
          {/* <img src={backgroundImage} alt="onboarding bg" /> */}

          <Link to="#" className={classes.logoContainer}>
            <img src={hivepathLogoWhite} alt="" className={classes.logo} />
          </Link>
          <div className={classes.textContainer}>
            <Typography className={classes.textStyle}>
              {backgroundTitle}
            </Typography>
            <img src={imgSrc} alt="" style={{ maxWidth: "100%" }} />
          </div>
        </div>
        <Container style={{}} className={classes.children}>
          {children}
        </Container>
      </div>
    </div>

    // <div className={classes.root}>
    //   <Seo title={title} />
    //   <div className={classes.content}>
    //     <Container className={classes.logoContainer}>
    //       <Link to="/">
    //         <img src={logo} alt="" className={classes.logo} />
    //       </Link>
    //     </Container>

    //     <Container className={classes.children}>{children}</Container>
    //   </div>
    //   <div className={classes.bgImage}>
    //     {isLoginPage && <div className={classes.loginImage} />}
    //     {isVerificationPage && <div className={classes.verifyImage} />}
    //   </div>
    // </div>
  );
};

export default AuthenticationLayout;
