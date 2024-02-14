import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import AppHeader from "components/AppHeader";
import Seo from "components/Seo";
import eventsOnboardingLinks from "data/onboardingNavLinksData/eventsOnboardingLinks";

import React from "react";
import OfferingOnboardingDrawer from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/components/OfferingOnboardingDrawer";

const EventsOnboardingLayout = ({ children, id, pageTitle }) => {
  return (
    <Box>
      <AppHeader isSettings position={"fixed"} />
      <Toolbar />
      <Seo title={pageTitle} />
      <OfferingOnboardingDrawer
        id={id}
        links={eventsOnboardingLinks}
        drawerTitle={"Create An Event"}
      >
        {children}
      </OfferingOnboardingDrawer>
    </Box>
  );
};

export default EventsOnboardingLayout;
