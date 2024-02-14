import React from "react";
import { Toolbar, Paper, useMediaQuery } from "@mui/material";
import FaqSections from "sections/AppPages/HelpSections/FaqSections";
import HelpHeader from "components/HelpHeader";
import HelpDrawer from "sections/AppPages/HelpSections/Components/HelpDrawer";
import { useTheme } from "@mui/styles";
import HelpLayout from "Layouts/AppLayouts/HelpLayout";

const FaqPage = () => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  return (
    <HelpLayout>
      <FaqSections />{" "}
    </HelpLayout>
  );
};

export default FaqPage;
