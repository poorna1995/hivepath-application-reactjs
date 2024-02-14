import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React from "react";
import AvailabilitySection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/AvailabilitySections";

const AddAvailabilityPage = () => {
  return (
    <KnowledgeSessionOnboardingLayout>
      <AvailabilitySection />
    </KnowledgeSessionOnboardingLayout>
  );
};

export default AddAvailabilityPage;
