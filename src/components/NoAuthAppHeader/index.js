import { AppBar, Badge, Box, Toolbar, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import hivepathLogo from "assets/svg/logo.svg";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import SignupModal from "components/SignupModal";
import SigninModal from "components/SigninModal";
import ForgotPasswordModal from "components/ForgotPasswordModal";

import {
  setShowSignup,
  setShowSignin,
} from "store/user-profile/userProfileSlice";

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: " 0px 0px 3px rgba(0, 0, 0, 0.25) !important",
    background: "#fff !important",
    height: "80px",

    paddingTop: "8px",
    // paddingBottom: "8px",
  },
  navigation: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // flexDirection: "row",
  },
  icon: {
    background: "rgba(243, 243, 243, 1)",
    marginLeft: theme.spacing(1),
  },
  explore: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  grow: {
    flex: 1,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
  // backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: "black",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: 'inherit',
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const mapState = ({ userProfile }) => ({
  userProfile: userProfile || {},
});

const AppHeader = ({ isAdmin, isSettings, maxWidth, height, position }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //   const history = useHistory();
  const { userProfile } = useSelector(mapState);
  const { showSignup, showSignin, showForgotPassword } = userProfile;

  const signupModalHandler = () => {
    dispatch(setShowSignup(!showSignup));
  };
  const signinModalHandler = () => {
    dispatch(setShowSignin(!showSignin));
  };

  return (
    <div className={classes.root}>
      <SignupModal open={showSignup} />
      <SigninModal open={showSignin} />
      <ForgotPasswordModal open={showForgotPassword} />

      <AppBar
        className={classes.appbar}
        position="fixed"
        style={{ height: height, position: position }}
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box className={classes.navigation}>
            {!isAdmin && (
              <>
                {" "}
                <div>
                  <a href="https://hivepath.io/">
                    <img
                      src={hivepathLogo}
                      alt="Logo"
                      style={{
                        width: "200px",
                        height: "46px",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                </div>
              </>
            )}
            <div className={classes.grow} />

            <OutlinedButton
              title="Login"
              style={{ height: "40px", width: "110px", marginRight: "10px" }}
              onClick={signinModalHandler}
            />
            <PrimaryButton
              title="Sign up"
              style={{ height: "40px", width: "110px" }}
              onClick={signupModalHandler}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppHeader;
// 61cc13e9a838519167bc45fb
