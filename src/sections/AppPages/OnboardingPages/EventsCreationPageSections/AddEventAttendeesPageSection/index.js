import React from "react";
import { Box, Container } from "@mui/material";
import OnboardingSectionHeadings from "../../NewKnowledgeSessionPageSections/components/Typography/SectionHeadings";

const AddEventAttendeePageSections = () => {
  return (
    <Box>
      <Container maxWidth="xs">
        <OnboardingSectionHeadings
          title={`Attendees`}
          description={`Add the number of people who can register for the event.`}
        />
      </Container>
    </Box>
  );
};

export default AddEventAttendeePageSections;
