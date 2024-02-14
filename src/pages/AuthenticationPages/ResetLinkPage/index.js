import { Typography, Container, Button } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
// import { FaRegEnvelope } from "react-icons/fa";
import { ReactComponent as EnvelopeIcon } from "assets/svg/auth-pages/envelope.svg";
import AuthenticationLayout from "Layouts/AuthenticationLayout";
import { Link, useHistory } from "react-router-dom";
import Seo from "components/Seo";
import logo from "assets/svg/logo.svg";
import { useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";

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
  contentContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    width: "40%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: "16px",
    },
  },
}));

const mapState = ({ user }) => ({
  user,
});
const ResetLinkPage = () => {
  const classes = useStyles();
  const { user } = useSelector(mapState);
  const email = user.resetPassswordEmail;
  const enqueueSnackbar = useEnqueueSnackbar();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleResendClick = () => {
    setLoading(true);
    const data = { email };
    authFetch("https://auth.hivepath.io/api/forgotPassword", data)
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message, {
            variant: "success",
          });
          setLoading(false);
          // dispatch(setResetPasswordEmail(email));
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
        setLoading(false);
      });
  };
  return (
    <div className={classes.root}>
      <Seo title={"Notification Successfully sent - Hivepath"} />
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
        </Container>
      </header>
      <div className={classes.contentContainer} style={{}}>
        <div>
          <EnvelopeIcon fontSize="64px" />
          <Typography
            variant="h3"
            component="h1"
            style={{ marginBottom: "16px" }}
            fontWeight="500"
          >
            Password reset link sent!
          </Typography>{" "}
          <Typography variant="body1" style={{ marginBottom: "16px" }}>
            We just sent you an email at{" "}
            <span style={{ color: "#484a9e" }}>{email}</span> to reset your
            password. Please follow the link to set a new password and continue
            growing your network with Hivepath.
            {/* We just sent you an email with a link to reset your password. Follow
            the link to set a New Password and start growing your network. */}
          </Typography>{" "}
          <Typography>
            Didn’t receive an email? Click{" "}
            <Button
              sx={{
                textTransform: "initial",
                marginLeft: "-8px",

                fontSize: "14px",
                fontWeight: "500",
                "&:hover": {
                  background: "transparent",
                },
              }}
              onClick={handleResendClick}
              disabled={loading}
            >
              resend
            </Button>
          </Typography>
        </div>
      </div>
    </div>
    // <AuthenticationLayout
    //   title="Notification Successfully sent - Hivepath"
    //   isVerificationPage
    // >
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
    //         Password Reset Link
    //       </Typography>{" "}
    //       <Typography variant="body1" style={{ marginBottom: "16px" }}>
    //         We just sent you an email with a link to reset your password. Follow
    //         the link to set a New Password and start growing your network.
    //       </Typography>{" "}
    //     </div>
    //   </div>{" "}
    // </AuthenticationLayout>
  );
};

export default ResetLinkPage;
