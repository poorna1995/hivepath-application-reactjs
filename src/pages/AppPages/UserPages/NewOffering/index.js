import { Container, Grid, Box, useMediaQuery } from "@mui/material";
import NewOfferingSection from "sections/AppPages/UserPages/NewOfferingSections";

import Seo from "components/Seo";
import React from "react";
import AppHeader from "components/AppHeader";
import { useTheme } from "@mui/styles";

const NewOffering = () => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  return (
    <div style={{ background: "white" }}>
      <AppHeader />
      <Seo title={"Offering | Hivepath"} />

      {matches ? (
        <Container>
          <NewOfferingSection />
        </Container>
      ) : (
        <Container style={{ maxWidth: "calc(76.56rem)" }}>
          {/* "1440px" */}
          {/* <Box> */}
          <NewOfferingSection />
          {/* </Box> */}
        </Container>
      )}
    </div>
  );
};

export default NewOffering;
