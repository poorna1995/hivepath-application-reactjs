import AppHeader from "components/AppHeader";
import HivepathCalendar from "components/HivepathCalendarUI/HivepathCalendar";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import changeTimezone from "utils/changeTimeZone";
import authFetch from "utils/authFetch";
import { Alert, Box, Grid, Toolbar, Typography } from "@mui/material";
import { SCHEDULE_SERVICES } from "constants/API_URLS";
import { CalendarView } from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/ManageSessionsView/ManageSection/HostViewManageSection";
import MySessionsCalendarView from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/MySessionsSection/CalendarView";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { Primary } from "stories/Button.stories";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import UserAccountPageLayout from "Layouts/AppLayouts/UserAccountPageLayout";
import SlotPlannerCalendar from "sections/AppPages/AdminPageSections/SlotPlannerSections/SlotPlannerCalendar";
import SyncExternalCalendarSections from "sections/AppPages/AdminPageSections/SlotPlannerSections/SyncExternalCalendarSection";
import GlobalCalendarSections from "sections/AppPages/GlobalCalendarSections";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";

const mapState = ({ slotsData, user, view, calendarSlots,loaders }) => ({
  slots: calendarSlots.slots,
  appTimezone: slotsData.timezone,
  currentUser: user.currentUser,
  hostView: view.userType,
  
  loading: loaders.sectionLoader,
});
const GlobalCalendar = ({ data }) => {
  const {loading} = useSelector(mapState)
  return (
    <Box>
      <AppHeader position={"fixed"} />
      <Toolbar sx={{ height: "80px" }} />
      <GlobalCalendarSections />
      <LoadingBackdrop open={loading} />
    </Box>
  );
};

export default GlobalCalendar;
