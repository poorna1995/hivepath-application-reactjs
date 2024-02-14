import LoginPage from "pages/AuthenticationPages/LoginPage";
import ResetLinkPage from "pages/AuthenticationPages/ResetLinkPage";
import ResetPasswordPage from "pages/AuthenticationPages/ResetPasswordPage";
import VerifyResetPasswordTokenPage from "pages/AuthenticationPages/ResetPasswordPage/VerifyResetPasswordTokenPage";
import SetNewPasswordPage from "pages/AuthenticationPages/SetNewPasswordPage";
import SignUpPage from "pages/AuthenticationPages/SignUpPage";
import VerifySignUpTokenPage from "pages/AuthenticationPages/SignUpPage/VerifySignUpToken";
import VerificationPage from "pages/AuthenticationPages/VerificationPage";
import React from "react";

// const VerifySignUpTokenPage = React.lazy(() =>
//   import("../../pages/AuthenticationPages/SignUpPage/VerifySignUpToken")
// );
// const VerifyResetPasswordTokenPage = React.lazy(() =>
//   import(
//     "../../pages/AuthenticationPages/ResetPasswordPage/VerifyResetPasswordTokenPage"
//   )
// );
// const LoginPage = React.lazy(() =>
//   import("../../pages/AuthenticationPages/LoginPage/index")
// );
// const SignUpPage = React.lazy(() =>
//   import("../../pages/AuthenticationPages/SignUpPage/index")
// );
// const ResetPasswordPage = React.lazy(() =>
//   import("../../pages/AuthenticationPages/ResetPasswordPage/index")
// );
// const VerificationPage = React.lazy(() =>
//   import("../../pages/AuthenticationPages/VerificationPage/index")
// );
// const ResetLinkPage = React.lazy(() =>
//   import("../../pages/AuthenticationPages/ResetLinkPage/index")
// );
// const SetNewPasswordPage = React.lazy(() =>
//   import("../../pages/AuthenticationPages/SetNewPasswordPage/index")
// );

const authenticationRoutes = [
  {
    path: "/auth/verifyRegistration/id/:id",
    component: VerifySignUpTokenPage,
  },
  {
    path: "/auth/resetPassword/id/:id",
    component: VerifyResetPasswordTokenPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/sign-up",
    component: SignUpPage,
  },
  {
    path: "/reset-password",
    component: ResetPasswordPage,
  },
  {
    path: "/verify",
    component: VerificationPage,
  },
  {
    path: "/reset-link",
    component: ResetLinkPage,
  },
  {
    path: "/set-new-password",
    component: SetNewPasswordPage,
  },
];

export default authenticationRoutes;
