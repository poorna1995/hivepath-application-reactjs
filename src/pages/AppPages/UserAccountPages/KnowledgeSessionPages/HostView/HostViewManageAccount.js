import { Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import HostViewManageContainer from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSHostViewSections/HostViewManageContainer";
import HostViewManageSection from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSHostViewSections/ManageSection/HostViewManageSection";

const HostViewManageAccount = () => {
  return (
    <div>
      <AppHeader position="fixed" />
      {/* this toolbar is added to add margin betweeen the header and content */}
      <Toolbar />
      <MiniDrawer>
        <HostViewManageContainer />
        {/* <HostViewContainer /> */}
      </MiniDrawer>
    </div>
  );
};

export default HostViewManageAccount;
