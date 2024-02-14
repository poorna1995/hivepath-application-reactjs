import React from "react";
import KnowledgeSessionOnboardingStepOnePage from "pages/AppPages/OnboardingPages/KnowledgeSession/StepOne";
import KnowledgeSessionOnboardingStepTwoPage from "pages/AppPages/OnboardingPages/KnowledgeSession/StepTwo";
import KnowledgeSessionOnboardingStepThreePage from "pages/AppPages/OnboardingPages/KnowledgeSession/StepThree";
import KnowledgeSessionOnboardingStepFourPage from "pages/AppPages/OnboardingPages/KnowledgeSession/StepFour";
import KnowledgeSessionOnboardingSuccessPage from "pages/AppPages/OnboardingPages/KnowledgeSession/SuccessPage";

// const KnowledgeSessionOnboardingStepOnePage = React.lazy(() =>
//   import("../../../pages/AppPages/OnboardingPages/KnowledgeSession/StepOne")
// );
// const KnowledgeSessionOnboardingStepTwoPage = React.lazy(() =>
//   import("../../../pages/AppPages/OnboardingPages/KnowledgeSession/StepTwo")
// );
// const KnowledgeSessionOnboardingStepThreePage = React.lazy(() =>
//   import("../../../pages/AppPages/OnboardingPages/KnowledgeSession/StepThree")
// );
// const KnowledgeSessionOnboardingStepFourPage = React.lazy(() =>
//   import("../../../pages/AppPages/OnboardingPages/KnowledgeSession/StepFour")
// );
// const KnowledgeSessionOnboardingSuccessPage = React.lazy(() =>
//   import("../../../pages/AppPages/OnboardingPages/KnowledgeSession/SuccessPage")
// );

const knowledgeSessionOnboardingRoutes = [
  {
    path: "/onboarding/knowledge-session/step-one",
    component: KnowledgeSessionOnboardingStepOnePage,
    exact: true,
  },
  {
    path: "/onboarding/knowledge-session/step-two",
    component: KnowledgeSessionOnboardingStepTwoPage,
    exact: true,
  },
  {
    path: "/onboarding/knowledge-session/step-three",
    component: KnowledgeSessionOnboardingStepThreePage,
    exact: true,
  },
  {
    path: "/onboarding/knowledge-session/step-four",
    component: KnowledgeSessionOnboardingStepFourPage,
    exact: true,
  },
  {
    path: "/onboarding/knowledge-session/success",
    component: KnowledgeSessionOnboardingSuccessPage,
    exact: true,
  },
];

export default knowledgeSessionOnboardingRoutes;
