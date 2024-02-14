import { Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import KSAttendeeViewSection from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSAttendeeViewSections";

const KSAttendeeViewPage = () => {
  return (
    <div>
      <AppHeader position="fixed" />
      {/* this toolbar is added to add margin betweeen the header and content */}
      <Toolbar />
      <MiniDrawer>
        <KSAttendeeViewSection />
      </MiniDrawer>
    </div>
  );
};

export default KSAttendeeViewPage;
