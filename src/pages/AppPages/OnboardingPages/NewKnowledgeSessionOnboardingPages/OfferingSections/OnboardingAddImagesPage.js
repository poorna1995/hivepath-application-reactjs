import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import AddThumbnailsSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/AddThumbnailsSection";

const OnboardingAddImagesPage = () => {
  const nextURL = "/onboarding/ks/create/preview-sessions";
  const prevURL = "/onboarding/ks/create/prerequisites";

  return (
    <KnowledgeSessionOnboardingLayout showButton>
      <AddThumbnailsSection nextURL={nextURL} prevURL={prevURL} />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default OnboardingAddImagesPage;
