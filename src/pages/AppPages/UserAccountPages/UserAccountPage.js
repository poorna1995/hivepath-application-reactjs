import { Toolbar } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import SelectView from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/CommonComponents/SelectView";
import KSAttendeeViewPage from "./KnowledgeSessionPages/AttendeeView";
import AttendeeViewMyHostPage from "./KnowledgeSessionPages/AttendeeView/AttendeeViewMyHostPage";
import UAPHostView from "./KnowledgeSessionPages/HostView";
import HostViewManageAccount from "./KnowledgeSessionPages/HostView/HostViewManageAccount";
import HostViewMyAttendee from "./KnowledgeSessionPages/HostView/HostViewMyAttendee";
import OpenKnowldgeSessionDetails from "./KnowledgeSessionPages/HostView/OpenKnowldgeSessionDetails";

const mapState = ({ view }) => ({
  hostView: view.host,
});
const UserAccountPage = () => {
  const { hostView } = useSelector(mapState);
  // const {view_type} = useParams()
  // console.log(view_type)
  return (
    <div>
      {hostView ? (
        <Redirect
          from="/u/account/knowledge-session"
          to="/u/account/knowledge-session/host"
        />
      ) : (
        <Redirect
          from="/u/account/knowledge-session"
          to="/u/account/knowledge-session/attendee/"
        />
      )}

      <AppHeader position="fixed" />

      <Toolbar />
      <MiniDrawer>
        <SelectView />
      </MiniDrawer>
    </div>
  );
};

export default UserAccountPage;
