import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import SelectOfferingTypeSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/SelectOfferingTypeSection";
import NewSelectOfferingTypeSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/SelectOfferingTypeSection/NewSelectOfferingTypeSection";

const OfferingAddCategoryPage = () => {
  return (
    <KnowledgeSessionOnboardingLayout showButton>
      {/* <SelectOfferingTypeSection /> */}
      <NewSelectOfferingTypeSection
        nextURL={`/onboarding/ks/create/add-offering`}
      />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default OfferingAddCategoryPage;
