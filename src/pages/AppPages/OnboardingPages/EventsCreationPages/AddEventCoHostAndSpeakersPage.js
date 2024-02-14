import EventsOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/EventsOnboardingLayout";
import React from "react";
import AddEventCoHostAndSpeakersPageSections from "sections/AppPages/OnboardingPages/EventsCreationPageSections/AddEventCoHostAndSpeakersPageSections";

const AddEventCoHostAndSpeakersPage = () => {
  return (
    <EventsOnboardingLayout>
      <AddEventCoHostAndSpeakersPageSections />
    </EventsOnboardingLayout>
  );
};

export default AddEventCoHostAndSpeakersPage;
