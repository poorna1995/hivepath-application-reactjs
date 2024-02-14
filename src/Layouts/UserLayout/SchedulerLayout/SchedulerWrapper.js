import { Container } from "@mui/material";
import Seo from "components/Seo";
import React from "react";
import AppHeader from "components/AppHeader";

const SchedulerWrapper = ({ title, children }) => {
  return (
    <div style={{ background: "white" }}>
      <AppHeader isSettings />
      <Seo title={title} />

      <Container
        style={{
          width: "100%",
          paddingLeft: "0",
          paddingRight: "0",
          maxWidth: "none",
        }}
      >
        {children}
      </Container>
    </div>
  );
};

export default SchedulerWrapper;
