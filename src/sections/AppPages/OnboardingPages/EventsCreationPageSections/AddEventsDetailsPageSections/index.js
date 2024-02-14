import { Box, Button, Container } from "@mui/material";
import React from "react";
import DescriptionEditor from "../../KnowledgeSession/StepOneSections/YourSessions/YSComponents/DescriptionEditor";
import YSTitleField from "../../KnowledgeSession/StepOneSections/YourSessions/YSComponents/TitleField";
import KSOnboardingButtonRow from "../../NewKnowledgeSessionPageSections/components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../NewKnowledgeSessionPageSections/components/Typography/SectionHeadings";

const AddEventsDetailsPageSections = () => {
  return (
    <Box style={{ display: "flex", flex: 1 }}>
      <Container maxWidth="md">
        <div style={{ position: "sticky", top: "100px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
          >
            <OnboardingSectionHeadings
              title={`About Event`}
              description={`Make it descriptive and unique so that attendee will understand what you're offering.`}
              containerStyles={{ flex: 1 }}
            />
            <Button
              // onClick={handleOpenSuggestions}
              style={{
                background: "rgba(236, 236, 236, 1)",
                borderRadius: "10px",
                textTransform: "capitalize",
                color: "rgba(34, 34, 34, 1)",
              }}
            >
              Suggestion
            </Button>
          </div>

          <YSTitleField
            placeholder="Title of the Event"
            // title={title}
            // handleChange={(e) => setTitle(e.target.value)}
            // error={title.length > 70}
            // disabled={title.length > 70}
            // helperText={
            //   title.length > 70 && "Title should not be more than 70 characters"
            // }
          />
          <DescriptionEditor
            placeholder={`About the event`}
            // editorState={editorState}
            // onEditorStateChange={onEditorStateChange}
            editorHeight={"400px"}
            // helperText={
            //   sessionDescription.length > 2000 &&
            //   "Description Should be less than 2000 characters!"
            // }
          />
        </div>
      </Container>

      {/* {openSuggestions && (
    <Collapse in={openSuggestions}>
      <OfferingSuggestionsSection
        show={openSuggestions}
        handleClick={handleCloseSuggestions}
      />
    </Collapse>
  )} */}

      <KSOnboardingButtonRow
      // showPrimary
      // showSecondary
      // backURL={"/onboarding/ks/create/add-category"}
      // nextURL={"/onboarding/ks/create/related-topics"}
      // onClickPrimaryButton={handleSubmit}
      // disablePrimary={
      //   title.length < 5 ||
      //   title.length > 70 ||
      //   sessionDescription.length < 10 ||
      //   sessionDescription.length > 2000
      // }
      />
    </Box>
  );
};
export default AddEventsDetailsPageSections;
