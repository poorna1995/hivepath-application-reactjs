import React from "react";
import CreateSessionPagesLayout from "Layouts/AppLayouts/UserAccountPageLayout/CreateSessionPagesLayout";
import CreateSessionAddOfferingDetailsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/CreateSessionPagesSection/CreateSessionAddOfferingDetailsSection";
import AddOfferingDetailsSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/AddOfferingDetailsSection";

const CreateSessionAboutOfferingPage = () => {
  const prevURL = "/offering/create/category";
  const nextURL = "/offering/create/related-topics";

  return (
    <CreateSessionPagesLayout>
      {/* <CreateSessionAddOfferingDetailsSection /> */}
      <AddOfferingDetailsSection nextURL={nextURL} prevURL={prevURL} />
    </CreateSessionPagesLayout>
  );
};

export default CreateSessionAboutOfferingPage;
