import { Alert, Box, Grid, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SlotPlannerCalendar from "../AdminPageSections/SlotPlannerSections/SlotPlannerCalendar";
import SyncExternalCalendarSections from "../AdminPageSections/SlotPlannerSections/SyncExternalCalendarSection";
import MySessionsCalendarView from "../UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/MySessionsSection/CalendarView";
import GlobalCalendarView from "./components/Calendar";
import SelectCalendarViewCheckbox from "./components/SelectCheckbox";

const mapState = ({ slotsData, user, view, calendarSlots }) => ({
  slots: calendarSlots.slots,
  appTimezone: slotsData.timezone,
  currentUser: user.currentUser,
  hostView: view.userType,
  calendarViewTypes: view.calendarViewTypes,
  user,
});

const GlobalCalendarSections = () => {
  const { hostView, calendarViewTypes, user, currentUser } =
    useSelector(mapState);
  const availability = "availability";
  const sessions = "sessions";
  const USER_ONBOARDING_DONE = currentUser.profile_onboarding_done;
  const KNOWLEDGE_SESSION_ONBOARDING_DONE =
    currentUser.knowledge_session_onboarding_done;

  const [calendarType, setCalendarType] = useState(availability);
  const handleChange = (e, type) => {
    setCalendarType(type);
  };

  const isAvailability = calendarType === availability;
  const isSessions = calendarType === sessions;
  return (
    <Box>
      <Grid container style={{ paddingTop: "16px", paddingBottom: "16px" }}>
        <Grid item xs={12} md={9} sm={9} sx={{ paddingLeft: "16px" }}>
          {isAvailability && (
            <GlobalCalendarView
              calendarHeight={"88vh"}
              style={{}}
              containerStyles={{
                position: "sticky",
                top: "100px",
                paddingBottom: "0px",
              }}
            />
          )}
          {isSessions && <MySessionsCalendarView height={"88vh"} />}
        </Grid>
        <Grid item xs={12} md={3} sm={3} sx={{ paddingLeft: "32px" }}>
          {/* <Alert severity="warning" sx={{ marginBottom: "32px" }}>
            <Typography>
              This is work in progress!
              <br />
              Filters Fixed.
             <br />
            Drawer added => working on UI improvements
            </Typography>
          </Alert> */}

          <SelectCalendarViewCheckbox />
          {KNOWLEDGE_SESSION_ONBOARDING_DONE && (
            <SyncExternalCalendarSections />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GlobalCalendarSections;
