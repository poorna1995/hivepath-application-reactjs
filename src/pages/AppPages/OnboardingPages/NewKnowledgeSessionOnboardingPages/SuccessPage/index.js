import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import KSonboardingSuccessPageSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/SuccessPageSection";

const NewKnowledgeSessionSuccessPage = () => {
  return (
    <KnowledgeSessionOnboardingLayout>
      <KSonboardingSuccessPageSection />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default NewKnowledgeSessionSuccessPage;
