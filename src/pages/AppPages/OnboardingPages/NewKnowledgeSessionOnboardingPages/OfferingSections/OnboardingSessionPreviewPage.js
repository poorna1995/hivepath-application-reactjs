import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import PreviewOfferingSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/PreviewSection";

const OnboardingSessionPreviewPage = () => {
  const nextURL = "/onboarding/ks/availability";
  const prevURL = "/onboarding/ks/create/add-images";

  return (
    <KnowledgeSessionOnboardingLayout showButton>
      <PreviewOfferingSection nextURL={nextURL} prevURL={prevURL} />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default OnboardingSessionPreviewPage;
