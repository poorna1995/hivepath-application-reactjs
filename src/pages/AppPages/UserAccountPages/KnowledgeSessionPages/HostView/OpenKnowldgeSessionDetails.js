import { Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import HostViewContainer from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSHostViewSections/HostViewContainer";
import HostViewSessionDetails from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSHostViewSections/HostViewSessionDetails";

const OpenKnowldgeSessionDetails = () => {
  return (
    <div>
      <AppHeader position="fixed" />
      {/* this toolbar is added to add margin betweeen the header and content */}
      <Toolbar />
      <MiniDrawer>
        <HostViewSessionDetails />
      </MiniDrawer>
    </div>
  );
};

export default OpenKnowldgeSessionDetails;
