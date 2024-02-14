import { Button, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React, { useEffect } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { ReactComponent as EnvelopeIcon } from "assets/svg/auth-pages/envelope.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import Seo from "components/Seo";

import logo from "assets/svg/logo.svg";

import AuthenticationLayout from "Layouts/AuthenticationLayout";
import authFetch from "utils/authFetch";

const mapState = ({ user }) => ({
  signUpEmail: user.signUpEmail,
});

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
  },
  button: {
    color: "primary",
    "&:hover": {
      background: "transparent",
    },
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {},
//   button: {
//     color: "primary",
//     "&:hover": {
//       background: "transparent",
//     },
//   },
// }));
const VerificationPage = () => {
  const classes = useStyles();
  const { signUpEmail } = useSelector(mapState);
  const history = useHistory();
  const enqueueSnackbar = useEnquequeSnackbar();
  useEffect(() => {
    if (!signUpEmail) history.push("/login");
  });
  const handleResend = (e) => {
    e.preventDefault();
    authFetch("https://auth.hivepath.io/api/sendVerification", {
      email: signUpEmail,
    })
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message, {
            variant: "success",
          });
        }
        // console.log(json);
      })

      .catch((error) => console.log(error));
  };

  return (
    <div className={classes.root}>
      <Seo title={"Verify your email address"} />
      <header className={classes.header}>
        <Container
          maxWidth="lg"
          style={{
            display: "flex",
            marginLeft: "0",
            alignItems: "start",
          }}
        >
          <Link to="/">
            <img src={logo} alt="" className={classes.logo} />
          </Link>

          {/* <OutlinedButton onClick={handleLogout} title="Logout" /> */}
        </Container>
      </header>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          width: "40%",
          margin: "0 auto",
        }}
      >
        <div>
          <EnvelopeIcon fontSize="64px" />
          <Typography
            variant="h3"
            component="h1"
            style={{ marginBottom: "16px" }}
            fontWeight="bold"
          >
            Verify your email address
          </Typography>{" "}
          <Typography
            variant="body1"
            style={{ marginBottom: "16px" }}
            fontWeight="500"
          >
            We just sent you an email on{" "}
            <span style={{ color: "blue" }}>{signUpEmail}</span> for
            verification. Click on the link to kickstart your journey with
            Hivepath.
          </Typography>{" "}
          <Typography variant="body1" fontWeight="500">
            Didn’t receive an email?{" "}
            <Button
              className={classes.button}
              onClick={handleResend}
              style={{
                textTransform: "capitalize",
                color: "blue",
              }}
            >
              {" "}
              Resend
            </Button>
          </Typography>
        </div>
      </div>
    </div>

    // <AuthenticationLayout title="Verify your Email Address" isVerificationPage>
    //   <div
    //     style={{
    //       maxWidth: "600px",
    //       margin: "auto",
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-around",
    //       height: "100%",
    //     }}
    //   >
    //     <div>
    //       <FaRegEnvelope fontSize="64px" />
    //       <Typography
    //         variant="h3"
    //         component="h1"
    //         style={{ marginBottom: "16px" }}
    //       >
    //         Verify Your Email
    //       </Typography>{" "}
    //       <Typography variant="body1" style={{ marginBottom: "16px" }}>
    //         We just sent you an email on{" "}
    //         <span style={{ color: "blue" }}>{signUpEmail}</span> for
    //         verification. Click on the link to kickstart your journey with
    //         Hivepath.
    //       </Typography>{" "}
    //       <Typography variant="body1">
    //         Didn’t receive an email?{" "}
    //         <Button
    //           className={classes.button}
    //           onClick={handleResend}
    //           style={{
    //             textTransform: "capitalize",
    //             color: "blue",
    //           }}
    //         >
    //           {" "}
    //           Resend
    //         </Button>
    //       </Typography>
    //     </div>
    //   </div>
    // </AuthenticationLayout>
  );
};

export default VerificationPage;
