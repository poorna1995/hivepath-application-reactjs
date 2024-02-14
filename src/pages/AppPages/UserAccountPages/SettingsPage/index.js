import { Container, Toolbar, Typography } from "@mui/material";
import AppHeader from "components/AppHeader";
import SettingsLayout from "Layouts/AppLayouts/SettingsLayout";
import UserAccountPageLayout from "Layouts/AppLayouts/UserAccountPageLayout";
import React from "react";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import SettingsContainer from "sections/AppPages/UserAccountPageSections/SettingsSections/SettingsContainer";

const SettingsPage = () => {
  return (
    <UserAccountPageLayout>
      <Container>
        <SettingsContainer />
      </Container>
    </UserAccountPageLayout>
  );
};

export default SettingsPage;
