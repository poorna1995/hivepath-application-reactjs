import { Container, Grid } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ButtonRow from "sections/AppPages/OnboardingPages/KnowledgeSession/ButtonRow";
// import MultiStepProgress from "sections/AppPages/OnboardingPages/KnowledgeSession/MultiStepProgress";
import KSOnboardingProgressBar from "sections/AppPages/OnboardingPages/KnowledgeSession/ProgressBar";
import AddNewSession from "sections/AppPages/OnboardingPages/KnowledgeSession/StepOneSections/AddNewSession";
import SuggestedSessions from "sections/AppPages/OnboardingPages/KnowledgeSession/StepOneSections/SuggestedSessions";
import YourSessions from "sections/AppPages/OnboardingPages/KnowledgeSession/StepOneSections/YourSessions";

const mapState = ({ sessions }) => ({
  mySessions: sessions.mySessions,
});

const KnowledgeSessionOnboardingStepOne = () => {
  const { mySessions } = useSelector(mapState);
  const history = useHistory();
  const handleClick = () => {
    history.push("/onboarding/knowledge-session/step-two");
  };
  return (
    <div style={{ height: "100vh" }}>
      <AppHeader maxWidth="xl" />
      {/* Progress bar */}
      <Container style={{ paddingTop: "8px" }}>
        <KSOnboardingProgressBar progressValue={0} />
        {/* <MultiStepProgress /> */}
      </Container>
      {/* Editor */}
      <Container
        maxWidth="xl"
        style={{ height: "68vh", marginBottom: "32px", paddingTop: "16px" }}
      >
        <Grid container spacing={2} style={{ height: "inherit" }}>
          <Grid item xs={12} md={7} style={{ height: "inherit" }}>
            <YourSessions />

            {/* <AddNewSession /> */}
          </Grid>
          <Grid item xs={12} md={5} style={{ height: "inherit" }}>
            <SuggestedSessions />
          </Grid>
        </Grid>
      </Container>
      {/* Suggestion */}
      {/*  */}
      <ButtonRow disabled={mySessions.length < 4} handleClick={handleClick} />
    </div>
  );
};

export default KnowledgeSessionOnboardingStepOne;
