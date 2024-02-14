import KnowldgeSessionHostPage from "pages/AppPages/SessionPages/Host/KnowldgeSessionHostPage";
import KnowledgeSessionAttendeePage from "pages/AppPages/SessionPages/Attendee/KnowledgeSessionAttendeePage";
import SessionPage from "pages/AppPages/SessionPages/SessionPage";
const sessionsRoutes = [
  {
    path: "/sessions/:bookingID",
    component: SessionPage,
  },
  {
    path: "/sessions/:bookingID/attendee",
    component: KnowledgeSessionAttendeePage,
  },

  {
    path: "/sessions/:bookingID/host",
    component: KnowldgeSessionHostPage,
  },
];

export default sessionsRoutes;
