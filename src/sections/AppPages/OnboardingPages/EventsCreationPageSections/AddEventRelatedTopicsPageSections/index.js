import { Box, Container, Typography } from "@mui/material";
import React from "react";
import KSOnboardingButtonRow from "../../NewKnowledgeSessionPageSections/components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../NewKnowledgeSessionPageSections/components/Typography/SectionHeadings";
import CreatableInputField from "../../NewKnowledgeSessionPageSections/OfferingSections/AddRelatedTopicSection/CreatableInputField";

const AddEventRelatedTopicsPageSections = () => {
  return (
    <Box>
      <Container
        maxWidth={`xs`}
        style={{
          paddingTop: "64px",
        }}
      >
        <OnboardingSectionHeadings
          title={`Add Related Topic`}
          description={`Choose the topics that best describes your 
        Event.`}
        />
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: " 21px",
            marginTop: "32px",
            marginBottom: "8px",
          }}
        >
          Add Topics
        </Typography>
        <CreatableInputField
        // types={types}
        // setTypes={setTypes}
        // options={optionsWithLabel}
        />
      </Container>
      <KSOnboardingButtonRow
      // showPrimary
      // showSecondary
      // backURL={"/onboarding/ks/create/add-offering"}
      // nextURL={"/onboarding/ks/create/prerequisites"}
      // onClickPrimaryButton={handleSubmit}
      // disablePrimary={typeList.length < 1}
      />
    </Box>
  );
};

export default AddEventRelatedTopicsPageSections;
