import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "28px",
  },
  gradientText: {
    fontWeight: "700",
  },
}));
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  user: user,
});

const OnboardingAlerts = () => {
  const classes = useStyles();
  const { currentUser, user } = useSelector(mapState);
  const PROFILE_OBOARDING_DONE = currentUser.profile_onboarding_done;
  const KNOWLEDGE_SESSION_ONBOARDING_DONE =
    user.knowledgeSessionOnboardingDone ||
    currentUser.knowledge_session_onboarding_done;
  return (
    <>
      {(KNOWLEDGE_SESSION_ONBOARDING_DONE !== true ||
        PROFILE_OBOARDING_DONE !== true) && (
        <Box
          style={{
            background: "rgba(229, 243, 199, 1)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "110%",
            margin: "-20px",
            marginLeft: "-16px",
            // marginRight:'-20px',
            padding: "16px",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {!PROFILE_OBOARDING_DONE && (
              <p className={classes.text} style={{ marginRight: "32px" }}>
                Complete your{" "}
                <Link
                  to="/onboarding/user-profile/step-one"
                  className={classes.gradientText}
                >
                  public profile
                </Link>
              </p>
            )}
            {!KNOWLEDGE_SESSION_ONBOARDING_DONE && (
              <p className={classes.text}>
                Become a Host on Hivepath,{" "}
                <Link
                  to="/onboarding/ks/intro"
                  className={classes.gradientText}
                >
                  {" "}
                  Knowledge Session Onboarding
                </Link>
              </p>
            )}
          </div>{" "}
        </Box>
      )}
    </>
  );
};

export default OnboardingAlerts;
