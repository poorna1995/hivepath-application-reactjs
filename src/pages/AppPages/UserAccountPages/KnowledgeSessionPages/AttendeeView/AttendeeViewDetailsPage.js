import { Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import AttendeeViewDetailsSection from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSAttendeeViewSections/AttendeeViewDetailsSection";

const AttendeeViewDetailsPage = () => {
  return (
    <div>
      <AppHeader position="fixed" />
      {/* this toolbar is added to add margin betweeen the header and content */}
      <Toolbar />
      <MiniDrawer>
        <AttendeeViewDetailsSection />
        {/* <HostViewContainer /> */}
      </MiniDrawer>
    </div>
  );
};

export default AttendeeViewDetailsPage;
