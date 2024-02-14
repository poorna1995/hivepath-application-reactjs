import EventsOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/EventsOnboardingLayout";
import React from "react";
import AddEventAttendeePageSections from "sections/AppPages/OnboardingPages/EventsCreationPageSections/AddEventAttendeesPageSection";

const AddEventAttendeesPage = () => {
  return (
    <EventsOnboardingLayout>
      <AddEventAttendeePageSections />
    </EventsOnboardingLayout>
  );
};

export default AddEventAttendeesPage;
