import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import PreferencesSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/PreferencesSections";

const OnboardingPreferencesPage = () => {
  return (
    <KnowledgeSessionOnboardingLayout>
      <PreferencesSection />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default OnboardingPreferencesPage;
