import { Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import HostViewMyAttendeeSection from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSHostViewSections/HostViewMyAttendeeSection";

const HostViewMyAttendee = () => {
  return (
    <div>
      {" "}
      <AppHeader position="fixed" />
      {/* this toolbar is added to add margin betweeen the header and content */}
      <Toolbar />
      <MiniDrawer>
        <HostViewMyAttendeeSection />
        {/* <HostViewContainer /> */}
      </MiniDrawer>
    </div>
  );
};

export default HostViewMyAttendee;
