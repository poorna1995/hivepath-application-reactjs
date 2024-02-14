import { Container } from "@mui/material";
import Seo from "components/Seo";
import React from "react";
import AppHeader from "components/AppHeader";

const SettingsLayout = ({ title, children }) => {
  return (
    <div>
      <AppHeader isSettings />
      <Seo title={title} />

      <Container>{children}</Container>
    </div>
  );
};

export default SettingsLayout;
