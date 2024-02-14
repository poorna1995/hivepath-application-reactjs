import React from "react";
import CreateSessionPagesLayout from "Layouts/AppLayouts/UserAccountPageLayout/CreateSessionPagesLayout";
import CreateSessionAddRelatedTopicsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/CreateSessionPagesSection/CreateSessionAddRelatedTopicsSection";
import AddRelatedTopicSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/AddRelatedTopicSection";

const CreateSessionAddRelatedTopicsPage = () => {
  const nextURL = "/offering/create/prerequisites";
  const prevURL = "/offering/create/offering-details";

  return (
    <CreateSessionPagesLayout>
      {/* <CreateSessionAddRelatedTopicsSection /> */}
      <AddRelatedTopicSection nextURL={nextURL} prevURL={prevURL}/>
   
    </CreateSessionPagesLayout>
  );
};

export default CreateSessionAddRelatedTopicsPage;
