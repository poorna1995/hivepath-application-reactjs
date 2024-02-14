import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import AppHeader from "components/AppHeader";
import Seo from "components/Seo";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import OfferingOnboardingDrawer from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/components/OfferingOnboardingDrawer";

const EditSessionPageLayout = ({ pageTitle, children }) => {
  const editSession = useSelector((state) => state.sessions.editSession);
  console.log(editSession);
  const sessionID = editSession.session_id;
  const history = useHistory();
  useEffect(() => {
    if (!sessionID) return history.push("/u/account/manage-sessions");
  }, [sessionID, history]);

  const editSessionLinksData = [
    {
      title: "Edit Offering",
      url: `/offering/${sessionID}/edit/`,
      id: 0,
      subMenu: [
        {
          title: "Types of Offering",
          url: `/offering/${sessionID}/edit/category`,
        },
        {
          title: "About Offering",
          url: `/offering/${sessionID}/edit/offering-details`,
        },
        {
          title: "Related Topics",
          url: `/offering/${sessionID}/edit/related-topics`,
        },
        {
          title: "Prerequisites",
          url: `/offering/${sessionID}/edit/prerequisites`,
        },
        {
          title: "Photos",
          url: `/offering/${sessionID}/edit/thumbnails`,
        },
      ],
    },
  ];

  return (
    <Box>
      <AppHeader isSettings position={"fixed"} />
      <Toolbar />
      <Seo title={pageTitle} />
      <OfferingOnboardingDrawer
        // id={id}
        links={editSessionLinksData}
        drawerTitle={"Manage Session"}
        goBackToPage={`/offering/${sessionID}`}
      >
        {children}
      </OfferingOnboardingDrawer>
    </Box>
  );
};

export default EditSessionPageLayout;
