import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import AppHeader from "components/AppHeader";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import SlotPlannerCalendar from "sections/AppPages/AdminPageSections/SlotPlannerSections/SlotPlannerCalendar";
import SyncExternalCalendarSections from "sections/AppPages/AdminPageSections/SlotPlannerSections/SyncExternalCalendarSection";
import ButtonRow from "sections/AppPages/OnboardingPages/KnowledgeSession/ButtonRow";
import KSOnboardingProgressBar from "sections/AppPages/OnboardingPages/KnowledgeSession/ProgressBar";

const mapState = ({ slotsData }) => ({
  slots: slotsData.slots,
});

const KnowledgeSessionOnboardingStepTwo = ({ hide }) => {
  const { slots } = useSelector(mapState);
  let history = useHistory();

  const handleClick = () => {
    history.push("/onboarding/knowledge-session/step-three");
  };

  return (
    <div style={{ height: "100vh" }}>
      {!hide && (
        <>
          <AppHeader maxWidth="xl" />
          {/* Progressbar */}
          <Container style={{ paddingBottom: "8px", paddingTop: "8px" }}>
            <KSOnboardingProgressBar progressValue={25} />
          </Container>
        </>
      )}

      {/* Calendar */}
      <Container maxWidth="xl" style={{ height: "68vh", marginBottom: "8px" }}>
        <Grid container style={{ height: "inherit" }}>
          <Grid
            item
            xs={12}
            md={9}
            sm={12}
            style={{ height: "inherit", paddingBottom: "16px" }}
          >
            <Container
              sx={{
                pb: "8px",
                background: " rgba(255, 255, 255, 0.6)",
                // marginTop: "16px",
                borderRadius: "15px",
                boxShadow: "0px 4px 50px 4px rgba(72, 74, 158, 0.03)",
                height: "inherit",
                boxSizing: "border-box",
                border: "2px solid #FFFFFF",
                // pl:'32px'
              }}
            >
              <SlotPlannerCalendar />
            </Container>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <SyncExternalCalendarSections />
          </Grid>
        </Grid>
      </Container>
      {!hide && (
        <ButtonRow disabled={slots.length < 4} handleClick={handleClick} />
      )}
    </div>
  );
};

export default KnowledgeSessionOnboardingStepTwo;
