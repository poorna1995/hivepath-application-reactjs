import SlotPlannerPage from "pages/AppPages/AdminPages/SlotPlannerPage";
import SettingsPage from "pages/AppPages/UserAccountPages/SettingsPage";
// import UserProfilePage from "pages/AppPages/UserProfilePage";
import EditProfile from "pages/AppPages/UserProfilePage/EditProfile";
import EditProfileForm from "pages/AppPages/UserProfilePage/EditProfileForm";
import NotificationPage from "pages/AppPages/NotificationPages";

// const UserProfilePage = React.lazy(()=> import('../../pages/AppPages/UserProfilePage/index'))
// const EditProfile = React.lazy(()=> import('../../pages/AppPages/UserProfilePage/EditProfile'))
// const EditProfileForm = React.lazy(()=> import('../../pages/AppPages/UserProfilePage/EditProfileForm'))
// const SlotPlannerPage = React.lazy(()=> import('../../pages/AppPages/AdminPages/SlotPlannerPage/index'))
// const SettingsPage = React.lazy(()=> import('../../pages/AppPages/SettingsPage/index'))

const adminRoutes = [
  //   {
  //     path: "/user/:slug_id?",
  //     component: UserProfilePage,
  //   },
  //   {
  //     path: "/user/:user_id?",
  //     component: UserProfilePage,
  //   },
  {
    path: "/profile",
    component: EditProfile,
  },
  {
    path: "/profile/update-profile",
    component: EditProfileForm,
  },
  {
    path: "/admin/slot-planner/week",
    component: SlotPlannerPage,
  },
  {
    path: "/settings",
    component: SettingsPage,
  },
  {
    path: "/notifications/:notificationId?",
    component: NotificationPage,
  },
];

export default adminRoutes;
