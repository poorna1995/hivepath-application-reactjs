import WithAuth from "hoc/withAuth";
import AppPage from "pages/AppPages";
import LandingPage from "pages/AppPages/LandingPages/Home";

import sessionsRoutes from "./sessionsRoutes";
import initialOnboardingRoutes from "./onboardingRoutes/initialOnboardingRoutes";
import knowledgeSessionOnboardingRoutes from "./onboardingRoutes/knowledgeSessionOnboardingRoutes";
import userProfileOnboardingRoutes from "./onboardingRoutes/userProfileOnboardingRoutes";
import adminRoutes from "./adminRoutes";
import accountRoutes from "./accountRoutes";
import landingRoutes from "./landingRoutes";
import GlobalCalendar from "pages/AppPages/AdminPages/GlobalCalendar";
import referralRoutes from "./referralRoutes";
import TwitterAuth from "pages/AuthenticationPages/TwitterAuth";
import newKnowledgeSessionRoutes from "./onboardingRoutes/newKnowledgeSessionRoutes";
import eventsRoutes from "./onboardingRoutes/eventsRoutes";
import editSessionRoutes from "./sessionsRoutes/editSessionRoutes";
import createSessionRoutes from "./sessionsRoutes/createSessionRoutes";
import NewLandingPage from "pages/AppPages/LandingPages/NewLandingPage";

// const AppPage = React.lazy(() => import("../../pages/AppPages/index"));

const allAppRoutes = [
  {
    path: "/",
    component: NewLandingPage,
  },
  {
    path: "/explore",
    component: NewLandingPage,
  },
  {
    path: "/profiles",
    component: NewLandingPage,
  },
  {
    path: "/twitter",
    component: TwitterAuth,
  },
  {
    path: "/global-calendar",
    component: GlobalCalendar,
  },
  landingRoutes,
  initialOnboardingRoutes,
  userProfileOnboardingRoutes,
  adminRoutes,
  sessionsRoutes,
  accountRoutes,
  referralRoutes,
  newKnowledgeSessionRoutes,
  eventsRoutes,
  editSessionRoutes,
  createSessionRoutes,
];

const appRoutes = allAppRoutes.flat();

export default appRoutes;
