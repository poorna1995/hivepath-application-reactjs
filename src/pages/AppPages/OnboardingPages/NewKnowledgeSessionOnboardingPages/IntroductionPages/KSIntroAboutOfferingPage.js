import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import AboutOfferingSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/IntroductionSections/AboutOfferingSection";
import NewIntroKSOnboardingSteOneSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/NewIntroductionSection/StepOneSection";

const KSIntroAboutOfferingPage = () => {
  return (
    <KnowledgeSessionOnboardingLayout>
      {/* <AboutOfferingSection /> */}
    <NewIntroKSOnboardingSteOneSection />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default KSIntroAboutOfferingPage;
