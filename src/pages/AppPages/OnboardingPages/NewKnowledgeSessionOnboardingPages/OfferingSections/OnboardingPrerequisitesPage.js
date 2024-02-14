import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import PrerequisitesSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/PrerequisitesSection";

const OnboardingPrerequisitesPage = () => {
  const nextURL = "/onboarding/ks/create/add-images";
  const prevURL = "/onboarding/ks/create/related-topics";

  return (
    <KnowledgeSessionOnboardingLayout showButton>
      <PrerequisitesSection  nextURL={nextURL} prevURL={prevURL} />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default OnboardingPrerequisitesPage;
