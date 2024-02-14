import { Container, Grid, Typography } from "@mui/material";
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
import KSOnboardingButtonRow from "../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../components/Typography/SectionHeadings";
import { useTheme } from "@mui/styles";
const mapState = ({ calendarSlots }) => ({
  slots: calendarSlots.slots,
});
const AvailabilitySection = () => {
  const { slots } = useSelector(mapState);
  const theme = useTheme();
  const disableNext = slots.length < 2;
  return (
    <div
      style={
        theme.breakpoints.down("sm")
          ? { padding: "8px", paddingTop: "16px" }
          : {}
      }
    >
      <OnboardingSectionHeadings title={`Add Availability`} />
      {/* <Typography variant="caption">
        {" "}
        Add atleast 2 slots to continue
      </Typography> */}
      <Grid container style={{ height: "inherit" }}>
        <Grid
          item
          xs={12}
          md={9}
          sm={12}
          style={{
            paddingRight: "16px",
            // borderRight: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <SlotPlannerCalendar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{
            borderLeft: "1px solid rgba(0,0,0,0.1)",
            // marginLeft: "16px",
          }}
        >
          <SyncExternalCalendarSections />
        </Grid>
      </Grid>
      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={"/onboarding/ks/create/preview-sessions"}
        nextURL={"/onboarding/ks/preferences"}
        disablePrimary={disableNext}
      />
    </div>
  );
};

export default AvailabilitySection;
