import React from "react";
import { Toolbar, Paper, useMediaQuery } from "@mui/material";
import ContactUsSections from "sections/AppPages/HelpSections/ContactUsSections";
import HelpHeader from "components/HelpHeader";
import HelpDrawer from "sections/AppPages/HelpSections/Components/HelpDrawer";
import { useTheme } from "@mui/styles";
import HelpLayout from "Layouts/AppLayouts/HelpLayout";

const ContactUsPage = () => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  return (
    <HelpLayout>
      <ContactUsSections />
    </HelpLayout>
  );
};

export default ContactUsPage;
