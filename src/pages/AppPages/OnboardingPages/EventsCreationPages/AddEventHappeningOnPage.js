import EventsOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/EventsOnboardingLayout";
import React from "react";
import AddEventHappeningOnPageSections from "sections/AppPages/OnboardingPages/EventsCreationPageSections/AddEventHappeningOnPageSections";

const AddEventHappeningOnPage = () => {
  return (
    <EventsOnboardingLayout>
      <AddEventHappeningOnPageSections />
    </EventsOnboardingLayout>
  );
};

export default AddEventHappeningOnPage;
