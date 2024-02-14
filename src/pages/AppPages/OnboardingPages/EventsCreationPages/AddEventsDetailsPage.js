import EventsOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/EventsOnboardingLayout";
import React from "react";
import AddEventsDetailsPageSections from "sections/AppPages/OnboardingPages/EventsCreationPageSections/AddEventsDetailsPageSections";

const AddEventsDetailsPage = () => {
  return (
    <EventsOnboardingLayout>
      <AddEventsDetailsPageSections />
    </EventsOnboardingLayout>
  );
};

export default AddEventsDetailsPage;
