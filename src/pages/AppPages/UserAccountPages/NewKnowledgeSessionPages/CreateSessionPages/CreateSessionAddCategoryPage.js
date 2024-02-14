import React from "react";
import CreateSessionPagesLayout from "Layouts/AppLayouts/UserAccountPageLayout/CreateSessionPagesLayout";
import CreateSessionAddCategorySection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/CreateSessionPagesSection/CreateSessionAddCategorySection";
import NewSelectOfferingTypeSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/SelectOfferingTypeSection/NewSelectOfferingTypeSection";

const CreateSessionAddCategoryPage = () => {
  const nextURL = "/offering/create/offering-details";

  return (
    <CreateSessionPagesLayout>
      {/* <CreateSessionAddCategorySection /> */}
      <NewSelectOfferingTypeSection nextURL={nextURL} />
    </CreateSessionPagesLayout>
  );
};

export default CreateSessionAddCategoryPage;
