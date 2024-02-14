import { Container, Toolbar, Typography, useMediaQuery } from "@mui/material";

import LandingPageLayout from "Layouts/AppLayouts/LandingPageLayout";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import NotificationSections from "sections/AppPages/NotificationSections";
import { useTheme } from "@mui/styles";

const NotificationPage = () => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  return (
    <LandingPageLayout>
      <div>
        <NotificationSections />
      </div>
      {/* {matches ? (
        <div>
          <NotificationSections />
        </div>
      ) : (
        <MiniDrawer>
          <NotificationSections />
        </MiniDrawer>
      )} */}
    </LandingPageLayout>
  );
};

export default NotificationPage;
