import VerifyReferPage from "pages/AuthenticationPages/VerifyReferPage";
import UserAccountReferralPage from "pages/AppPages/UserAccountPages/ReferralPage";

const referralRoutes = [
  {
    path: "/u/account/referral",
    component: UserAccountReferralPage,
  },
  // {
  //   path: "/refer/:referralID",
  //   component: VerifyReferPage,
  // },
];
export default referralRoutes;
