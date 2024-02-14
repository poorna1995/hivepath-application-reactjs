import React from "react";
import { Toolbar, Paper, useMediaQuery } from "@mui/material";
import FeedbackSections from "sections/AppPages/HelpSections/FeedbackSections";
import HelpHeader from "components/HelpHeader";
import HelpDrawer from "sections/AppPages/HelpSections/Components/HelpDrawer";
import { useTheme } from "@mui/styles";
import HelpLayout from "Layouts/AppLayouts/HelpLayout";

const FeedbackPage = () => {
  return (
    <HelpLayout>
      <FeedbackSections />
    </HelpLayout>
  );
};

export default FeedbackPage;
