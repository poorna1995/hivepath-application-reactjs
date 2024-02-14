import AddEventAttendeesPage from "pages/AppPages/OnboardingPages/EventsCreationPages/AddEventAttendeesPage";
import AddEventCoHostAndSpeakersPage from "pages/AppPages/OnboardingPages/EventsCreationPages/AddEventCoHostAndSpeakersPage";
import AddEventHappeningOnPage from "pages/AppPages/OnboardingPages/EventsCreationPages/AddEventHappeningOnPage";
import AddEventPreferencesPage from "pages/AppPages/OnboardingPages/EventsCreationPages/AddEventPreferencesPage";
import AddEventPreviewPage from "pages/AppPages/OnboardingPages/EventsCreationPages/AddEventPreviewPage";
import AddEventRelatedTopicsPage from "pages/AppPages/OnboardingPages/EventsCreationPages/AddEventRelatedTopicsPage";
import AddEventsDetailsPage from "pages/AppPages/OnboardingPages/EventsCreationPages/AddEventsDetailsPage";
import AddEventThumbnailsPage from "pages/AppPages/OnboardingPages/EventsCreationPages/AddEventThumbnailsPage";

const eventsRoutes = [
  {
    path: "/onboarding/event/",
    component: AddEventsDetailsPage,
  },
  {
    path: "/onboarding/event/add-details",
    component: AddEventsDetailsPage,
  },
  {
    path: "/onboarding/event/happening-on",
    component: AddEventHappeningOnPage,
  },
  {
    path: "/onboarding/event/thumbnails",
    component: AddEventThumbnailsPage,
  },
  {
    path: "/onboarding/event/add-related-topics",
    component: AddEventRelatedTopicsPage,
  },
  {
    path: "/onboarding/event/add-co-hosts",
    component: AddEventCoHostAndSpeakersPage,
  },
  {
    path: "/onboarding/event/add-attendees",
    component: AddEventAttendeesPage,
  },
  {
    path: "/onboarding/event/add-preferences",
    component: AddEventPreferencesPage,
  },
  {
    path: "/onboarding/event-preview",
    component: AddEventPreviewPage,
  },
];
export default eventsRoutes;
