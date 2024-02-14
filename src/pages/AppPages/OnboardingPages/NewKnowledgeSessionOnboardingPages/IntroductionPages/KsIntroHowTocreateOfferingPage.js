import React from "react";
import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import KSIntroHowToCreateOfferingSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/IntroductionSections/IntroHowToCreateSection";
import NewIntroKSOnboardingStepThreeSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/NewIntroductionSection/StepThreeSection";

const KsIntroHowTocreateOfferingPage = () => {
  return (
    <KnowledgeSessionOnboardingLayout>
      {/* <KSIntroHowToCreateOfferingSection /> */}
    <NewIntroKSOnboardingStepThreeSection/>
    </KnowledgeSessionOnboardingLayout>
  );
};

export default KsIntroHowTocreateOfferingPage;
