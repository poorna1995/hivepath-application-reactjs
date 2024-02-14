import KnowldgeSessionHostPage from "pages/AppPages/SessionPages/Host/KnowldgeSessionHostPage";
import SessionPage from "pages/AppPages/SessionPages/SessionPage";
import UAPHostView from "pages/AppPages/UserAccountPages/KnowledgeSessionPages/HostView";
import OpenKnowldgeSessionDetails from "pages/AppPages/UserAccountPages/KnowledgeSessionPages/HostView/OpenKnowldgeSessionDetails";
import UserAccountPage from "pages/AppPages/UserAccountPages/UserAccountPage";
import EditProfile from "pages/AppPages/UserAccountPages/EditProfile";
import KSAttendeeViewPage from "pages/AppPages/UserAccountPages/KnowledgeSessionPages/AttendeeView";
import HostViewMyAttendee from "pages/AppPages/UserAccountPages/KnowledgeSessionPages/HostView/HostViewMyAttendee";
import AttendeeViewMyHostPage from "pages/AppPages/UserAccountPages/KnowledgeSessionPages/AttendeeView/AttendeeViewMyHostPage";
import HostViewManageAccount from "pages/AppPages/UserAccountPages/KnowledgeSessionPages/HostView/HostViewManageAccount";
import AttendeeViewDetailsPage from "pages/AppPages/UserAccountPages/KnowledgeSessionPages/AttendeeView/AttendeeViewDetailsPage";
import UserAccountReferralPage from "pages/AppPages/UserAccountPages/ReferralPage/index";
import Bookmarks from "pages/AppPages/LandingPages/Bookmarks";
import ManageKnowledgeSessionsPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/ManageKnowledgeSessionPages";
import MySessionsPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/MySessionsPage";
import SessionLifecyclePage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/SessionLifecyclePage";

const accountRoutes = [
  // {
  //   path: "/u/account/knowledge-session",
  //   component: UserAccountPage,
  // },
  // {
  //   path: "/u/account/knowledge-session/host",
  //   component: UAPHostView,
  // },
  // {
  //   path: "/u/account/knowledge-session/host/my-attendees",
  //   component: HostViewMyAttendee,
  // },

  // {
  //   path: "/u/account/knowledge-session/host/my-sessions",
  //   component: UAPHostView,
  // },
  // {
  //   path: "/u/account/knowledge-session/host/manage",
  //   component: HostViewManageAccount,
  // },
  // {
  //   path: "/u/account/knowledge-session/host/my-sessions/:bookingID",
  //   component: OpenKnowldgeSessionDetails,
  // },
  {
    path: "/u/account/edit-profile/:step?",
    component: EditProfile,
  },
  // {
  //   path: "/u/account/knowledge-session/attendee/my-sessions",
  //   component: KSAttendeeViewPage,
  // },
  // {
  //   path: "/u/account/knowledge-session/attendee/my-hosts",
  //   component: AttendeeViewMyHostPage,
  // },

  // {
  //   path: "/u/account/knowledge-session/attendee/my-sessions/:bookingID",
  //   component: AttendeeViewDetailsPage,
  // },
  {
    path: "/u/account/bookmarks",
    component: Bookmarks,
  },
  {
    path: "/u/account/manage-sessions",
    component: ManageKnowledgeSessionsPage,
  },
  {
    path: "/u/account/sessions",
    component: MySessionsPage,
  },
  {
    path: "/u/account/sessions/:bookingID",
    component: SessionLifecyclePage,
  },
  {
    path: "/u/account/calendar-view",
    component: MySessionsPage,
  },
  {
    path: "/u/account/my-users",
    component: MySessionsPage,
  },
];

export default accountRoutes;
