import { Container, Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import UserAccountPageLayout from "Layouts/AppLayouts/UserAccountPageLayout";
import React from "react";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import ReferralPageSections from "sections/AppPages/UserAccountPageSections/ReferralPageSections";

const UserAccountReferralPage = () => {
  return (
    <UserAccountPageLayout>
      <Container maxWidth="xl">
        <ReferralPageSections />
      </Container>
    </UserAccountPageLayout>
  );
};

export default UserAccountReferralPage;
