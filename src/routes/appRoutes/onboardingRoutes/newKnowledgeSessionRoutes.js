import KSIntroAboutOfferingPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/IntroductionPages/KSIntroAboutOfferingPage";
import KSIntroSampleOfferingsPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/IntroductionPages/KSIntroSampleOfferingsPage";
import KSIntroStepThreePage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/IntroductionPages/KSIntroAreasToCreateOfferingsPage";
import AddAvailabilityPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/AvailabilityPages/AddAvailabilityPage";
import AddOfferingDetailsPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/OfferingSections/AddOfferingDetailsPage";
import OfferingAddCategoryPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/OfferingSections/OfferingAddCategoryPage";
import OnboardingAddImagesPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/OfferingSections/OnboardingAddImagesPage";
import OnboardingPrerequisitesPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/OfferingSections/OnboardingPrerequisitesPage";
import OnboardingSessionPreviewPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/OfferingSections/OnboardingSessionPreviewPage";
import RelatedTopicsPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/OfferingSections/RelatedTopicsPage";
import OnboardingPreferencesPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/PreferencesPages/OnboardingPreferencesPage";
import OfferingSessionPreviewPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/OfferingSections/OfferingSessionPreviewPage";
import NewKnowledgeSessionSuccessPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/SuccessPage";
import AddHeadlinePage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/AddHeadlinePage";
import KSIntroOfferingRequirementsPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/IntroductionPages/KSIntroOfferingRequirementsPage";
import KsIntroHowTocreateOfferingPage from "pages/AppPages/OnboardingPages/NewKnowledgeSessionOnboardingPages/IntroductionPages/KsIntroHowTocreateOfferingPage";

const newKnowledgeSessionRoutes = [
  {
    path: "/onboarding/ks/intro/about",
    component: KSIntroAboutOfferingPage,
    exact: true,
  },

  {
    path: "/onboarding/ks/intro/samples",
    component: KSIntroSampleOfferingsPage,
    exact: true,
  },

  {
    path: "/onboarding/ks/intro/get-started",
    component: KSIntroStepThreePage,
    exact: true,
  },

  {
    path: "/onboarding/ks/intro/requirements",
    component: KSIntroOfferingRequirementsPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/intro/how-to-create",
    component: KsIntroHowTocreateOfferingPage,
    exact: true,
  },

  {
    path: "/onboarding/ks/availability/add-availability",
    component: AddAvailabilityPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/create/add-offering",
    component: AddOfferingDetailsPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/create/add-category",
    component: OfferingAddCategoryPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/create/add-images",
    component: OnboardingAddImagesPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/create/prerequisites",
    component: OnboardingPrerequisitesPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/create/preview-sessions",
    component: OnboardingSessionPreviewPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/create/preview-sessions/:sessionId",
    component: OfferingSessionPreviewPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/create/related-topics",
    component: RelatedTopicsPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/preferences/add-preferences",
    component: OnboardingPreferencesPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/success",
    component: NewKnowledgeSessionSuccessPage,
    exact: true,
  },
  {
    path: "/onboarding/ks/add-headline",
    component: AddHeadlinePage,
    exact: true,
  },
];

export default newKnowledgeSessionRoutes;
