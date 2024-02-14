import { Container, Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import OfferingSessionPreview from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/PreviewSection/OfferingSessionPreview";

const OfferingSessionPreviewPage = () => {
  return (
    <>
      <AppHeader position={"fixed"} isSettings />
      <Toolbar style={{ height: "80px" }} />
      <div
        style={{
          background: "white",
        }}
      >
        {/* <PreviewOfferingSection /> */}
        <Container style={{ paddingTop: "16px" }}>
          <OfferingSessionPreview />
        </Container>
      </div>
    </>
  );
};

export default OfferingSessionPreviewPage;
