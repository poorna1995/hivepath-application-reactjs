import React from "react";
import UserProfileOnboardingStepOnePage from "pages/AppPages/OnboardingPages/UserProfile/StepOne";
import UserProfileOnboardingStepTwoPage from "pages/AppPages/OnboardingPages/UserProfile/StepTwo";
import UserProfileOnboardingStepThreePage from "pages/AppPages/OnboardingPages/UserProfile/StepThree";
import UserProfileOnboardingStepFourPage from "pages/AppPages/OnboardingPages/UserProfile/StepFour";
import UserProfileOnboardingStepFivePage from "pages/AppPages/OnboardingPages/UserProfile/StepFive";
import UserProfileOnboardingStepSixPage from "pages/AppPages/OnboardingPages/UserProfile/StepSix";
import UserProfileOnboardingSuccessPage from "pages/AppPages/OnboardingPages/UserProfile/SuccessPage";

const userProfileOnboardingRoutes = [
  {
    path: "/onboarding/user-profile/step-one",
    component: UserProfileOnboardingStepOnePage,
    exact: true,
  },
  {
    path: "/onboarding/user-profile/step-two",
    component: UserProfileOnboardingStepTwoPage,
    exact: true,
  },
  {
    path: "/onboarding/user-profile/step-three",
    component: UserProfileOnboardingStepThreePage,
    exact: true,
  },
  {
    path: "/onboarding/user-profile/step-four",
    component: UserProfileOnboardingStepFourPage,
    exact: true,
  },
  {
    path: "/onboarding/user-profile/step-five",
    component: UserProfileOnboardingStepFivePage,
    exact: true,
  },
  {
    path: "/onboarding/user-profile/step-six",
    component: UserProfileOnboardingStepSixPage,
    exact: true,
  },
  {
    path: "/onboarding/user-profile/success",
    component: UserProfileOnboardingSuccessPage,
    exact: true,
  },
];

export default userProfileOnboardingRoutes;
