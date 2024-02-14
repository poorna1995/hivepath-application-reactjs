import { Container, Paper, Typography } from "@mui/material";
import AppHeader from "components/AppHeader";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import { useHistory } from "react-router";
import KSOnboardingProgressBar from "sections/AppPages/OnboardingPages/KnowledgeSession/ProgressBar";
import { ReactComponent as CheckCircleIcon } from "assets/svg/onboarding-pages/knowledge-session/check-green-gradient.svg";

import { ReactComponent as CheckIcon } from "assets/svg/onboarding-pages/knowledge-session/check.svg";
import { useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import { useState } from "react";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const KnowledgeSessionOnboardingStepFour = () => {
  let history = useHistory();
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const url = KNOWLEDGE_SESSIONS_SERVICES.SUBMIT_OFFERING_ONBOARDING;
    const data = {
      user_id: USER_ID,
      type: "one-one",
    };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        setLoading(false);
        history.push("/onboarding/knowledge-session/success");
      }

      console.log(json);
    });
  };
  return (
    <div>
      <AppHeader />
      {/* Progress bar */}
      <Container style={{ paddingTop: "8px" }}>
        <KSOnboardingProgressBar progressValue={75} />
      </Container>

      {/* Component for confirming */}
      <Container
        maxWidth="md"
        style={{ paddingTop: "24px", paddingBottom: "32px" }}
      >
        <Paper
          style={{
            textAlign: "center",
            paddingTop: "32px",
            background: "rgba(255, 255, 255, 0.6)",
            border: "2px solid #FFFFFF",
            boxSizing: " border-box",
            boxShadow: "0px 4px 50px 4px rgba(72, 74, 158, 0.03)",
            borderRadius: "15px",
          }}
        >
          <div>
            <CheckCircleIcon />
          </div>
          <Typography
            style={{
              fontSize: "28px",
              fontWeight: "700",
              textAlign: "center",
              margin: "auto",
              maxWidth: "600px",
              paddingTop: "32px",
              paddingBottom: "32px",
              // background: "rgba(255, 239, 227, 1)",
            }}
          >
            Awesome, you are one step away for becoming a host for knowledge
            session
          </Typography>

          <Container
            style={{
              borderRadius: "14px",
              paddingTop: "32px",
              textAlign: "left",
              margin: "auto",
              maxWidth: "500px",
            }}
          >
            <Typography
              maxWidth="sm"
              style={{
                fontSize: "24px",
                fontWeight: "600",
                margin: "auto",
              }}
            >
              <CheckIcon style={{ marginRight: "16px" }} />
              Created your Knowledge Sessions
            </Typography>

            <Typography
              maxWidth="sm"
              style={{
                fontSize: "24px",
                fontWeight: "600",
                margin: "auto",
              }}
            >
              <CheckIcon style={{ marginRight: "16px" }} />
              Marked your Availability{" "}
            </Typography>

            <Typography
              maxWidth="sm"
              style={{
                fontSize: "24px",
                fontWeight: "600",
                margin: "auto",
              }}
            >
              <CheckIcon style={{ marginRight: "16px" }} />
              Provided your preferences
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "32px",
                paddingBottom: "32px",
              }}
            >
              <PrimaryButton
                onClick={handleClick}
                style={{ width: "200px", textAlign: "center" }}
                title="Submit for Approval"
              />
            </div>
          </Container>
        </Paper>
      </Container>
      <LoadingBackdrop open={loading} handleClose={() => setLoading(false)} />
    </div>
  );
};

export default KnowledgeSessionOnboardingStepFour;
