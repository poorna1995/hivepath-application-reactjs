import CreateSessionPagesLayout from "Layouts/AppLayouts/UserAccountPageLayout/CreateSessionPagesLayout";
import React from "react";
import PreviewOfferingSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/PreviewSection";
import CreateSessionPreviewSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/CreateSessionPagesSection/CreateSessionPreviewSection";

const CreateSessionPreviewPage = () => {
  const nextURL = "/u/account/manage-sessions";
  const prevURL = `/offering/create/thumbnails`;

  return (
    <CreateSessionPagesLayout>
      {/* <CreateSessionPreviewSection /> */}
      <PreviewOfferingSection
        nextURL={nextURL}
        prevURL={prevURL}
        primaryButtonText="Submit"
      />
    </CreateSessionPagesLayout>
  );
};

export default CreateSessionPreviewPage;
