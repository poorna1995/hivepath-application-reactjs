import React from "react";
import CreateSessionPagesLayout from "Layouts/AppLayouts/UserAccountPageLayout/CreateSessionPagesLayout";
import CreateSessionAddPrerequisitesSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/CreateSessionPagesSection/CreateSessionAddPrerequisiteSection";
import PrerequisitesSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/PrerequisitesSection";

const CreateSessionAddPrerequisitesPage = () => {
  const nextURL = "/offering/create/thumbnails";
  const prevURL = "/offering/create/related-topics";

  return (
    <CreateSessionPagesLayout>
      {/* <CreateSessionAddPrerequisitesSection /> */}
      <PrerequisitesSection nextURL={nextURL} prevURL={prevURL} />
   
    </CreateSessionPagesLayout>
  );
};

export default CreateSessionAddPrerequisitesPage;
