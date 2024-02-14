import { Typography, Box, Grid } from "@mui/material";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import PaperBase from "components/Common/PaperBase/PaperBase";
import SlotPlannerPage from "pages/AppPages/AdminPages/SlotPlannerPage";
import KnowledgeSessionOnboardingStepThree from "pages/AppPages/OnboardingPages/KnowledgeSession/StepThree";
import KnowledgeSessionOnboardingStepTwo from "pages/AppPages/OnboardingPages/KnowledgeSession/StepTwo";
import React from "react";
import YourSessions from "sections/AppPages/OnboardingPages/KnowledgeSession/StepOneSections/YourSessions";
import SlotPlannerCalendar from "sections/AppPages/AdminPageSections/SlotPlannerSections/SlotPlannerCalendar";
import SyncExternalCalendarSections from "sections/AppPages/AdminPageSections/SlotPlannerSections/SyncExternalCalendarSection/index";
import KnowledgeSessionPreferencesSection from "./KnowledgeSessionPreferencesSection";
import KnowledgeSessionResourcesUploadSection from "./KnowledgeSessionResourcesUploadSection";

const HostViewManageSection = () => {
  return (
    <PaperBase
    //   style={{ position: "fixed", maxheight: "60vh", overflowY: "scroll" }}
    >
      <Typography fontWeight="700" fontSize="28px">
        Manage
      </Typography>
      <BasicTabs data={data} />
    </PaperBase>
  );
};

export default HostViewManageSection;

const CalendarView = () => {
  return (
    <Grid container>
      {" "}
      <Grid item xs={12} md={9} sm={9}>
        <SlotPlannerCalendar />
      </Grid>
      <Grid item xs={12} md={3} sm={3}>
        <SyncExternalCalendarSections />
      </Grid>
    </Grid>
  );
};

const data = [
  {
    id: 0,
    label: "Availability",
    component: <CalendarView />,
  },
  {
    id: 1,
    label: "Offerings",
    component: <YourSessions md={6} />,
  },
  {
    id: 2,
    label: "Preferences",
    component: <KnowledgeSessionPreferencesSection />,
  },
  {
    id: 3,
    label: "Resources",
    component: <KnowledgeSessionResourcesUploadSection />,
  },
];
