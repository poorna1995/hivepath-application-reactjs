import { Alert, Box, Card, Container, Grid, Typography } from "@mui/material";
import GradientText from "components/Common/Typography/GradientText";
import React from "react";

import imageOne from "assets/svg/all/new-icons/ks-onboarding/success/one.svg";

import imageTwo from "assets/svg/all/new-icons/ks-onboarding/success/two.svg";
import imageThree from "assets/svg/all/new-icons/ks-onboarding/success/three.svg";
import KSOnboardingButtonRow from "../components/KSOnboardingButtonRow";
import { useState } from "react";
import SuccessThankYouModal from "./SuccessThankYouModal";
import authFetch from "utils/authFetch";
import { useSelector, useDispatch } from "react-redux";
import { setKnowledgeSessionOnboardingStatus } from "store/User/user.actions";
import sessionsRoutes from "routes/appRoutes/sessionsRoutes";
import { setOfferingHeadline } from "store/knowledge-sessions/knowledgeSessionsSlice";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";
import firstImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-three/one.svg";
import secondImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-three/two.svg";
import thirdImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-three/three.svg";
import CheckIcon from "assets/svg/all/new-icons/ks-onboarding/success/filled-check.svg";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "16px",
    paddingBottom: "80px",
  },
}));

const mapState = ({ user, sessions }) => ({
  currentUser: user.currentUser,
  offeringHeadline: sessions.offeringHeadline,
});

const KSonboardingSuccessPageSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { currentUser, offeringHeadline } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const disablePrimary = !offeringHeadline || offeringHeadline.length < 10;

  const handlePrimaryButton = () => {
    setLoading(true);
    const url = KNOWLEDGE_SESSIONS_SERVICES.SUBMIT_OFFERING_ONBOARDING;
    const data = {
      user_id: USER_ID,
      type: "one-one",

      // knowledge_session_headline_description: offeringHeadline,
      knowledge_session_consent: true,
    };
    authFetch(url, data)
      .then((json) => {
        console.log(json);
        setLoading(false);
        if (json.status === "success") {
          setOpen(true);
          handleGoToHome();

          // history.push("/onboarding/knowledge-session/success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleGoToHome = () => {
    const url = "https://auth.hivepath.io/api/fetchUserOnboarding";
    const data = {
      user_id: USER_ID,
      type: "one-one",
    };
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          dispatch(
            setKnowledgeSessionOnboardingStatus(json.result.onboarding_done)
          );

          // history.push("/");
          // handleClose();
        }
      })
      .catch((error) => console.log(error));
  };
  const handleCloseModal = () => {
    setOpen(false);
    dispatch(setOfferingHeadline(""));
  };

  const cardData = [
    {
      title: "Added details",
      imgSrc: firstImage,
      bgColor: "#FBF7FF",
    },
    {
      title: "Marked availabilities",
      imgSrc: secondImage,
      bgColor: "#EFF9FF",
    },
    {
      title: " Provided preferences",
      imgSrc: thirdImage,
      bgColor: "#FFF7F1",
    },
  ];

  return (
    <Box
      className={classes.root}
      style={
        {
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // flexDirection: "column",
          // // height: "90%",
        }
      }
    >
      {/* <div
        style={{
          maxWidth: "600px",
          paddingBottom: "32px",
        }}
      >
        {/* {disablePrimary && (
          <Alert severity="error">
            Please add Offering Headline!{" "}
            <Link to="/onboarding/ks/add-headline">Click Here to Add</Link>
          </Alert>
        )} */}
      {/* </div> */}
      <Container
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container style={{ textAlign: "center", maxWidth: "800px" }}>
          <GradientText
            style={{
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            Congratulations!
          </GradientText>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: " 27px",
              color: "#333333",
            }}
          >
            You are just a click away from becoming a Host now!
            <br /> Press the submit button below and wait for our approval!
          </Typography>
        </Container>

        <Grid
          container
          spacing={2}
          style={{ marginTop: "16px", maxWidth: "800px" }}
        >
          {cardData.map((item) => {
            const { title, imgSrc, bgColor } = item;

            return (
              <Grid item xs={12} md={4}>
                <div
                  style={{
                    boxShadow: "none",
                    borderRadius: "20px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    background: "#FFFFFF",
                    paddingBottom: "16px",
                    position: "relative",
                  }}
                >
                  <img
                    src={CheckIcon}
                    alt=""
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                    }}
                  />

                  <img
                    src={imgSrc}
                    alt=""
                    style={{
                      width: "100%",
                      height: "150px",
                      background: bgColor,
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  />
                  <Typography
                    style={{
                      padding: "16px",
                      fontWeight: " bold",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    {title}
                  </Typography>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <KSOnboardingButtonRow
        showSecondary
        showPrimary
        backURL={"/onboarding/ks/preferences"}
        // nextURL={""}
        primaryText={
          theme.breakpoints.down("sm") ? "Submit" : "Submit  for approval"
        }
        onClickPrimaryButton={handlePrimaryButton}
        // disablePrimary={disablePrimary}
      />
      <SuccessThankYouModal open={open} handleClose={handleCloseModal} />
    </Box>
  );
};

export default KSonboardingSuccessPageSection;
