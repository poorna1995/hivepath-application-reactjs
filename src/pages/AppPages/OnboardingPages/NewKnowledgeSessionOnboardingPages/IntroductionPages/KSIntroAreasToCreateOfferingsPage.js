import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import IntroGetStartedSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/IntroductionSections/IntroGetStartedSection";
import NewIntroKSOnboardingStepTwoSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/NewIntroductionSection/StepTwoSection";

const KSIntroAreasToCreateOfferingsPage = () => {
  return (
    <KnowledgeSessionOnboardingLayout>
      {/* <IntroGetStartedSection /> */}
    <NewIntroKSOnboardingStepTwoSection />
    
    </KnowledgeSessionOnboardingLayout>
  );
};

export default KSIntroAreasToCreateOfferingsPage;
