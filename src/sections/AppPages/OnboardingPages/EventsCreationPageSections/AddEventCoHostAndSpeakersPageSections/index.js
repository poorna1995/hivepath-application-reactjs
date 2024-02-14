import React from "react";
import { Box, Container } from "@mui/material";
import OnboardingSectionHeadings from "../../NewKnowledgeSessionPageSections/components/Typography/SectionHeadings";
import KSOnboardingButtonRow from "../../NewKnowledgeSessionPageSections/components/KSOnboardingButtonRow";

const AddEventCoHostAndSpeakersPageSections = () => {
  return (
    <Box>
      <Container maxWidth="xs">
        <OnboardingSectionHeadings
          title={`Add Co-Hosts`}
          description={`Add Co-hosts for the event.`}
        />
        <KSOnboardingButtonRow
        // showPrimary
        // showSecondary
        // backURL={"/onboarding/ks/create/prerequisites"}
        // nextURL={"/onboarding/ks/create/preview-sessions"}
        // onClickPrimaryButton={handleSubmit}
        // disablePrimary={!img || img.length < 1}
        />
      </Container>
    </Box>
  );
};

export default AddEventCoHostAndSpeakersPageSections;
