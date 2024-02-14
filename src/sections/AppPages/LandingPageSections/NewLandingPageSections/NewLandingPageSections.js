import { Container, Grid, useMediaQuery } from "@mui/material";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import LinkTabs from "components/Common/Navigation/LinkTabs";
// import LinkTabs from "components/Common/Navigation/LinkTabs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLandingPageProfilePopUpOpen } from "store/views/view.actions";
import BookmarkDialog from "../HomeSections/BookmarkDialog";
import LandingPageFab from "../HomeSections/Components/Fab/LandingPageFab";
import OnboardingAlerts from "../HomeSections/Components/OnboardingAlerts";
import LandingPageOnboardingAlertDialog from "../HomeSections/Components/OnboardingAlerts/Dialogs";
import ExploreSessions from "./components/ExploreSessions";
import OnboardingStatusTasks from "./components/OnboardingStatusTasks";
import RecommendedHostsList from "./components/RecommendedHostsList";
import RecommendedOfferingsSliderList from "./components/RecommendedOfferingsSliderList";
import welcomeGIF from "assets/gifs/landing-page/welcome.gif";
import NewLandingPageProfileSection from "./components/UserProfileSection";
import { useTheme } from "@mui/styles";
import VerifyEmailInfo from "sections/AppPages/UserPages/NewOfferingSections/Components/VerifyEmailInfo";

const mapState = ({ user, landingPage, view }) => ({
  showBookmark: landingPage.showBookmark,
  currentUser: user.currentUser,
  popUpShow: view.landingPageProfileDialogOpen,
  drawerOpen: view.ua_drawer_open,
});

const NewLandingPageSections = () => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const { showBookmark, currentUser, popUpShow, drawerOpen } =
    useSelector(mapState);
  const PROFILE_OBOARDING_DONE = currentUser.profile_onboarding_done;
  const KNOWLEDGE_SESSION_ONBOARDING_DONE =
    currentUser.knowledge_session_onboarding_done;
  const dispatch = useDispatch();
  const showPopup = () => {
    if (!PROFILE_OBOARDING_DONE) return popUpShow;
    return false;
  };

  const [open, setOpen] = React.useState(showPopup);
  const showVerifyEmail = !currentUser.email_verification || !currentUser.profile_onboarding_done;

  const handleClose = () => {
    setOpen(false);
    dispatch(setLandingPageProfilePopUpOpen(false));
  };

  const data = [
    {
      id: 0,
      label: "Home",
      link: "/",
      component: (
        <div
          style={
            {
              // paddingRight: "16px",
            }
          }
        >
          {showVerifyEmail && <VerifyEmailInfo />}
          <OnboardingStatusTasks />
          <Grid
            container
            paddingTop={2}
            style={{
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <RecommendedOfferingsSliderList />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={3}
              style={
                matches
                  ? {}
                  : {
                      borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
                      paddingLeft: "16px",
                    }
              }
            >
              <RecommendedHostsList />
            </Grid>
          </Grid>
        </div>
      ),
    },
    {
      id: 1,
      label: "Offering",
      component: (
        <>
          {" "}
          <ExploreSessions />
        </>
      ),
      link: "/explore",
    },
    {
      id: 2,
      label: "Network",
      component: (
        <>
          <NewLandingPageProfileSection />
        </>
      ),
      link: "/profiles",
    },
  ];

  return (
    <div
      style={{
        maxWidth: !matches && drawerOpen ? "85vw" : "95vw",
        margin: "auto",
        paddingRight: matches ? "0px" : "16px",
        marginTop: "-8px",

        // zIndex: "0",
        // background: `url(${welcomeGIF}) `,
      }}
    >
      <BookmarkDialog open={showBookmark.open || false} />
      <LandingPageOnboardingAlertDialog open={open} handleClose={handleClose} />
      {/* <div
        style={{
          position: "absolute",
          top: "0px",
          right: "20px",
          zIndex: "1200",
        }}
      >
        <img src={welcomeGIF} alt="" />
      </div> */}
      <Container maxWidth="xl">
        <LinkTabs
          data={data}
          tabsStyles={{
            // borderBottom: "none",
            textTransform: "initial",
            position: "sticky",
            top: matches ? "72px" : "80px",
            zIndex: "200",
            background: "white",
          }}
          tabstyles={{
            fontSize: "18px",
          }}
        />
      </Container>
    </div>
  );
};

export default NewLandingPageSections;
