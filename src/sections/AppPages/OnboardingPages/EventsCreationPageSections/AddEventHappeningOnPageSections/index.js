import { Box, Container } from "@mui/material";
import React from "react";
import OnboardingSectionHeadings from "../../NewKnowledgeSessionPageSections/components/Typography/SectionHeadings";

const AddEventHappeningOnPageSections = () => {
  return (
    <Box>
      <Container maxWidth="xs">
        <OnboardingSectionHeadings title={"Happening on"} />
      </Container>
    </Box>
  );
};

export default AddEventHappeningOnPageSections;
