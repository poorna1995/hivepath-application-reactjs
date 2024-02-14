import { Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import MySessionsView from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/CommonComponents/MySessionsView";
import HostViewContainer from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSHostViewSections/HostViewContainer";
import KSAttendeeViewPage from "../AttendeeView";
import AttendeeViewMyHostPage from "../AttendeeView/AttendeeViewMyHostPage";
import HostViewManageAccount from "./HostViewManageAccount";
import HostViewMyAttendee from "./HostViewMyAttendee";
import OpenKnowldgeSessionDetails from "./OpenKnowldgeSessionDetails";

// UserAccountPagesHostView for Knowledge Session
const UAPHostView = () => {
  let { path, url } = useRouteMatch();
  // console.log({ path, url });

  return (
    <div>
      {/* <Redirect
        from="/u/account/knowledge-session/host"
        to="/u/account/knowledge-session/host/my-sessions"
      /> */}
      <AppHeader position="fixed" />
      {/* this toolbar is added to add margin betweeen the header and content */}
      <Toolbar />
      <MiniDrawer>
        {/* <Switch>
          {routes.map((route) => (
            <Route exact path={route.path} component={route.component} />
          ))}
        </Switch> */}
        <HostViewContainer />
      </MiniDrawer>
    </div>
  );
};

export default UAPHostView;

const routes = [
  // {
  //   path: "/u/account",
  //   component: UserAccountPage,
  // },

  {
    path: "/u/account/knowledge-session/host/my-attendees",
    component: HostViewMyAttendee,
  },

  {
    path: "/u/account/knowledge-session/host/my-sessions",
    component: UAPHostView,
  },
  {
    path: "/u/account/knowledge-session/host/manage",
    component: HostViewManageAccount,
  },
  {
    path: "/u/account/knowledge-session/host/my-sessions/:bookingID",
    component: OpenKnowldgeSessionDetails,
  },
  {
    path: "/u/account/knowledge-session/attendee/my-sessions",
    component: KSAttendeeViewPage,
  },
  {
    path: "/u/account/knowledge-session/attendee/my-hosts",
    component: AttendeeViewMyHostPage,
  },
];
