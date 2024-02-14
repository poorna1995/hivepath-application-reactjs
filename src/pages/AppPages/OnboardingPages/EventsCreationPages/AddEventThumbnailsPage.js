import EventsOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/EventsOnboardingLayout";
import React from "react";
import AddEventThumbnailsPageSections from "sections/AppPages/OnboardingPages/EventsCreationPageSections/AddEventThumbnailsPageSections";

const AddEventThumbnailsPage = () => {
  return (
    <EventsOnboardingLayout>
      <AddEventThumbnailsPageSections />
    </EventsOnboardingLayout>
  );
};

export default AddEventThumbnailsPage;
