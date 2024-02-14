import React from "react";
import CreateSessionPagesLayout from "Layouts/AppLayouts/UserAccountPageLayout/CreateSessionPagesLayout";
import CreateSessionAddThumbnailsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/CreateSessionPagesSection/CreateSessionAddThumbnailsSection";
import AddThumbnailsSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/AddThumbnailsSection";

const CreateSessionAddThumbnailsPage = () => {
  const nextURL = "/offering/create/preview-session";
  const prevURL = "/offering/create/prerequisites";
  
  return (
    <CreateSessionPagesLayout>
      {/* <CreateSessionAddThumbnailsSection /> */}
      <AddThumbnailsSection nextURL={nextURL} prevURL={prevURL}/>
    </CreateSessionPagesLayout>
  );
};

export default CreateSessionAddThumbnailsPage;
