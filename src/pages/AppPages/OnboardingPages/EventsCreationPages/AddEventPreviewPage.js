import EventsOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/EventsOnboardingLayout";
import React from "react";
import AddEventPreviewPageSections from "sections/AppPages/OnboardingPages/EventsCreationPageSections/AddEventPreviewPageSections";

const AddEventPreviewPage = () => {
  return (
    <EventsOnboardingLayout>
      <AddEventPreviewPageSections />
    </EventsOnboardingLayout>
  );
};

export default AddEventPreviewPage;
