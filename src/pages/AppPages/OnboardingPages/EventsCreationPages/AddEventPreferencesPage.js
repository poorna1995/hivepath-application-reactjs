import EventsOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/EventsOnboardingLayout";
import React from "react";
import AddEventPreferencesPageSections from "sections/AppPages/OnboardingPages/EventsCreationPageSections/AddEventPreferencesPageSections";

const AddEventPreferencesPage = () => {
  return (
    <EventsOnboardingLayout>
      <AddEventPreferencesPageSections />
    </EventsOnboardingLayout>
  );
};

export default AddEventPreferencesPage;
