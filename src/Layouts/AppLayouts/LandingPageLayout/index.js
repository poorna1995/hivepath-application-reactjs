import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import Seo from "components/Seo";
import LPSidebar from "sections/AppPages/LandingPageSections/Components/LPSidebar";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import { useTheme } from "@mui/styles";
import { Route, Switch, useHistory } from "react-router-dom";
import ExploreSessions from "sections/AppPages/LandingPageSections/NewLandingPageSections/components/ExploreSessions";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  onboarding_data: user.onboarding_data,
});

const STAGES = {
  ONE: "stage1",
  TWO: "stage2",
};

const LandingPageLayout = ({ title, children, paddingLeft }) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("md");
  const matches = useMediaQuery(mobileView);

  const { currentUser, onboarding_data } = useSelector(mapState);
  const USER_ID = currentUser?.user_id;
  const ONBOARDING_DONE = currentUser?.onboarding_done;
  const ONBOARDING_DATA = currentUser?.onboarding_data;

  const ONBOARDING_STAGE_ONE_COMPLETE =
    ONBOARDING_DATA?.stage1?.status === "complete";
  const ONBOARDING_STAGE_TWO_COMPLETE =
    ONBOARDING_DATA?.stage2?.status === "complete";

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (currentUser && ONBOARDING_DONE) {
    //   return;
    //   //  history.push("/");
    // }

    // if (
    //   currentUser &&
    //   (!ONBOARDING_DONE || !onboarding_data?.onboarding_done)
    // ) {
    //   if (!ONBOARDING_STAGE_ONE) return history.push("/add-info/step-one");
    //   if (!ONBOARDING_STAGE_TWO) return history.push("/add-info/step-two");
    // }
    // if (currentUser && !ONBOARDING_STAGE_ONE_COMPLETE) {
    //   // if (pathname !== "/add-info/step-one") return;
    //   return history.push("/add-info/step-one");
    // }
    // if (currentUser && !ONBOARDING_STAGE_TWO_COMPLETE) {
    //   // if (ONBOARDING_STAGE_ONE_COMPLETE) return;
    //   // if (pathname !== "/add-info/step-two") return;

    //   return history.push("/add-info/step-two");
    // }
  }, [
    currentUser,
    ONBOARDING_DONE,
    history,
    ONBOARDING_STAGE_ONE_COMPLETE,
    ONBOARDING_STAGE_TWO_COMPLETE,
  ]);

  return (
    <Box maxWidth="100%">
      <AppHeader position="fixed" />
      <Toolbar style={{ height: "80px" }} />

      <Seo title={title} />
      {matches ? (
        <Container style={{ overflow: "visible", padding: "0" }}>
          {children}
        </Container>
      ) : (
        <MiniDrawer paddingLeft={paddingLeft}>{children}</MiniDrawer>
      )}
    </Box>
  );
};

export default LandingPageLayout;
