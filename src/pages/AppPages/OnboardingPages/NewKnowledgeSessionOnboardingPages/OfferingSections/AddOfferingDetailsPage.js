import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import AddOfferingDetailsSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/AddOfferingDetailsSection";

const AddOfferingDetailsPage = () => {
  const prevURL = "/onboarding/ks/create/add-category";
  const nextURL = "/onboarding/ks/create/related-topics";
  
  return (
    <KnowledgeSessionOnboardingLayout showButton>
      <AddOfferingDetailsSection nextURL={nextURL} prevURL={prevURL} />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default AddOfferingDetailsPage;
