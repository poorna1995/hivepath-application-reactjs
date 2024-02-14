import React from "react";
import { Toolbar, Paper, useMediaQuery } from "@mui/material";

import UserGuideSections from "sections/AppPages/HelpSections/UserGuideSections";
import HelpHeader from "components/HelpHeader";
import HelpDrawer from "sections/AppPages/HelpSections/Components/HelpDrawer";
import { useTheme } from "@mui/styles";
import HelpLayout from "Layouts/AppLayouts/HelpLayout";

const UserGuidePage = () => {
  return (
    <HelpLayout>
      <UserGuideSections />
    </HelpLayout>
  );
};

export default UserGuidePage;
