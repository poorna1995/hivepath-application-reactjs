import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import AddRelatedTopicSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/AddRelatedTopicSection";

const RelatedTopicsPage = () => {
  const nextURL = "/onboarding/ks/create/prerequisites";
  const prevURL = "/onboarding/ks/create/add-offering";

  return (
    <KnowledgeSessionOnboardingLayout showButton>
      <AddRelatedTopicSection nextURL={nextURL} prevURL={prevURL} />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default RelatedTopicsPage;
