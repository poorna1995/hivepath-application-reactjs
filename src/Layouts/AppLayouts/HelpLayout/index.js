import React from "react";
import { useTheme } from "@mui/styles";
import { Toolbar, Paper, useMediaQuery } from "@mui/material";

import UserGuideSections from "sections/AppPages/HelpSections/UserGuideSections";
import HelpHeader from "components/HelpHeader";
import HelpDrawer from "sections/AppPages/HelpSections/Components/HelpDrawer";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import FaqSections from "sections/AppPages/HelpSections/FaqSections";
import ContactUsSections from "sections/AppPages/HelpSections/ContactUsSections";
import FeedbackSections from "sections/AppPages/HelpSections/FeedbackSections";

const HelpLayout = ({ children }) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const data = [
    { id: 0, label: "User Guide", component: <UserGuideSections /> },
    { id: 1, label: "FAQs", component: <FaqSections /> },
    { id: 2, label: "Contact Us", component: <ContactUsSections /> },
    { id: 3, label: "Feedback", component: <FeedbackSections /> },
  ];

  return (
    <div>
      {" "}
      <HelpHeader position="fixed" />
      <Toolbar />
      {matches ? (
        <div
          style={{
            paddingTop: "32px",
          }}
        >
          {" "}
          <BasicTabs data={data} />
        </div>
      ) : (
        <HelpDrawer>
          <Paper style={{ minHeight: "85vh", padding: "20px 5px 0 20px" }}>
            {children}
          </Paper>
        </HelpDrawer>
      )}
    </div>
  );
};

export default HelpLayout;
