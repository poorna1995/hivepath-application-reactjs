import WelcomePage from "pages/InfoPage/WelcomePage";
import StepOnePage from "pages/InfoPage/StepOnePage";
import StepThreePage from "pages/InfoPage/StepThreePage";
import StepTwoPage from "pages/InfoPage/StepTwoPage";
import React from "react";

// const StepOnePage = React.lazy(() =>
//   import("../../../pages/InfoPage/StepOnePage")
// );

// const StepTwoPage = React.lazy(() =>
//   import("../../../pages/InfoPage/StepTwoPage")
// );

// const StepThreePage = React.lazy(() =>
//   import("../../../pages/InfoPage/StepThreePage")
// );

const initialOnboardingRoutes = [
  {
    path: "/welcome",
    component: WelcomePage,
  },
  {
    path: "/add-info/step-one",
    component: StepOnePage,
  },
  {
    path: "/add-info/step-two",
    component: StepTwoPage,
  },
  {
    path: "/add-info/step-three",
    component: StepThreePage,
  },
];

export default initialOnboardingRoutes;
