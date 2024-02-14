import EventsOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/EventsOnboardingLayout";
import React from "react";
import AddEventRelatedTopicsPageSections from "sections/AppPages/OnboardingPages/EventsCreationPageSections/AddEventRelatedTopicsPageSections";

const AddEventRelatedTopicsPage = () => {
  return (
    <EventsOnboardingLayout>
      <AddEventRelatedTopicsPageSections />
    </EventsOnboardingLayout>
  );
};

export default AddEventRelatedTopicsPage;
