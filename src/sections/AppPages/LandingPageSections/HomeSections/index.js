import classes from "pages/AppPages/LandingPages/LandingPage.module.css";
import { Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import RecommendedOfferingCard from "./Components/RecommendedOfferingCard";
import BookmarkDialog from "./BookmarkDialog";

import UserProfilesList from "./UserProfilesList";
import AttendeeSessionList from "./AttendeeSessionList";
import HostSessionList from "./HostSessionList";
import RecommendedOfferingList from "./RecommendedOfferingList";
import OnboardingAlerts from "./Components/OnboardingAlerts";
import LandingPageOnboardingAlertDialog from "./Components/OnboardingAlerts/Dialogs";
import KSOnboardingDialog from "sections/AppPages/OnboardingPages/AlertDialogs/KSOnboardingDialog";
import KnowledgeSessionAlertDialog from "sections/AppPages/OnboardingPages/AlertDialogs/KnowledgeSessionAlertDialog";
import LandingPageFab from "./Components/Fab/LandingPageFab";
import { setLandingPageProfilePopUpOpen } from "store/views/view.actions";

const mapState = ({ user, landingPage, view }) => ({
  showBookmark: landingPage.showBookmark,
  currentUser: user.currentUser,
  popUpShow: view.landingPageProfileDialogOpen,
});
const HomeSections = (props) => {
  const { showBookmark, currentUser, popUpShow } = useSelector(mapState);
  const PROFILE_OBOARDING_DONE = currentUser.profile_onboarding_done;
  const KNOWLEDGE_SESSION_ONBOARDING_DONE =
    currentUser.knowledge_session_onboarding_done;
  const dispatch = useDispatch();
  const showPopup = () => {
    if (!PROFILE_OBOARDING_DONE) return popUpShow;
    return false;
  };

  const [open, setOpen] = React.useState(showPopup);

  const handleClose = () => {
    setOpen(false);
    dispatch(setLandingPageProfilePopUpOpen(false));
  };

  return (
    <>
      <BookmarkDialog open={showBookmark.open || false} />
      <LandingPageOnboardingAlertDialog open={open} handleClose={handleClose} />
      <LandingPageFab />
      {/* <KSOnboardingDialog open={open} handleClose={() => setOpen(false)} /> */}
      {/* <KnowledgeSessionAlertDialog
        open={open}
        handleClose={() => setOpen(false)}
      /> */}
      <OnboardingAlerts />
      {/* // upcoming session host */}
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <HostSessionList />
        </Grid>
      </Grid> */}

      {/* // upcoming session attendee */}
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <AttendeeSessionList />
        </Grid>
      </Grid> */}

      {/* recommended offerings  */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={12}>
          <RecommendedOfferingList />
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={12}>
          <UserProfilesList creator={true} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <UserProfilesList />
        </Grid>
      </Grid>
    </>
  );
};

export default HomeSections;
