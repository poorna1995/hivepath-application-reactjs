import { Typography } from "@mui/material";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import PaperBase from "components/Common/PaperBase/PaperBase";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import SessionList from "./SessionList";
import { Switch, Route } from "react-router-dom";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import attendeeViewAllSessionsEmpty from "assets/svg/all/new-icons/empty-states/sessions-view/all.svg";

import attendeeViewPastSessionsEmpty from "assets/svg/all/new-icons/empty-states/sessions-view/past.svg";
import attendeeViewPendingSessionsEmpty from "assets/svg/all/new-icons/empty-states/sessions-view/pending.svg";
import attendeeViewUpcomingSessionsEmpty from "assets/svg/all/new-icons/empty-states/sessions-view/upcoming.svg";
import { SCHEDULE_SERVICES } from "constants/API_URLS";
// import hostViewAllSessionsEmpty from "assets/svg/all/new-icons/empty-states/host-view/all.svg";

// import hostViewPastSessionsEmpty from "assets/svg/all/new-icons/empty-states/host-view/past.svg";
// import hostViewPendingSessionsEmpty from "assets/svg/all/new-icons/empty-states/host-view/pending.svg";
// import hostViewUpcomingSessionsEmpty from "assets/svg/all/new-icons/empty-states/host-view/upcoming.svg";

const mapState = ({ user, view }) => ({
  currentUser: user.currentUser,
  hostView: view.host,
});

const MySessionsView = ({ host }) => {
  const { currentUser, hostView } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [mySessions, setMySessions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const url = SCHEDULE_SERVICES.AGGREGATED_SESSION_VIEW;
    const data = {
      user_id: USER_ID,
      view_type: hostView ? "host" : "attendee",
    };
    authFetch(url, data)
      .then((json) => {
        setLoading(false);
        setMySessions(json.result || []);
      })
      .catch((error) => console.error(error));
  }, [hostView]);
  console.log(mySessions);
  const sessions = mySessions.filter((item) => {
    const sessionData = item?.session_data;
    const title = item?.session_data?.title;

    if (sessionData || title) return item;
    return null;
  });

  console.log(sessions);
  const upcomingData = sessions?.filter((item) => {
    const bookingStatus = item.booking_status;
    if (bookingStatus === "approved") return item;
    return null;
  });
  console.log({ upcomingData });
  const pendingData = sessions?.filter((item) => {
    const bookingStatus = item.booking_status;
    if (bookingStatus === "pending") return item;
    return null;
  });
  const pastData = sessions?.filter((item) => {
    const bookingStatus = item.booking_status;
    if (bookingStatus === "completed" || bookingStatus === "feedback pending")
      return item;
    return null;
  });
  const allData = [upcomingData, pendingData, pastData].flat();

  const data = [
    {
      id: 0,
      label: "All",
      component: (
        <SessionList
          hostView={hostView}
          data={sessions}
          loading={loading}
          component={
            <BaseEmptyStateComponent
              imgSrc={attendeeViewAllSessionsEmpty}
              buttonTitle={"Explore"}
              message={
                hostView
                  ? " Oops! looks like you've no more bookings."
                  : "Oops! Looks like you didn't book any sessions."
              }
              shortDescription={
                hostView
                  ? "Create a new session instead?"
                  : "Would you like to book one?"
              }
            />
          }
        />
      ),
      url: "/u/account/knowledge-session/host/my-sessions/all",
    },
    {
      id: 1,
      label: "Upcoming",
      component: (
        <SessionList
          hostView={hostView}
          data={upcomingData}
          loading={loading}
          component={
            <BaseEmptyStateComponent
              imgSrc={attendeeViewUpcomingSessionsEmpty}
              buttonTitle={"Explore"}
              message={
                hostView
                  ? " Oops! looks like you've no more bookings."
                  : "Oops! Looks like you didn't book any sessions."
              }
              shortDescription={
                hostView
                  ? "Create a new session instead?"
                  : "Would you like to book one?"
              }
            />
          }
        />
      ),
      url: "/u/account/knowledge-session/host/my-sessions/upcoming",
    },
    {
      id: 2,
      label: "Pending",
      component: (
        <SessionList
          hostView={hostView}
          data={pendingData}
          loading={loading}
          component={
            <BaseEmptyStateComponent
              imgSrc={attendeeViewPendingSessionsEmpty}
              message={
                hostView
                  ? " Oops! looks like you've no more bookings."
                  : "Oops! Looks like you didn't book any sessions."
              }
              shortDescription={
                hostView
                  ? "Create a new session instead?"
                  : "Would you like to book one?"
              }
              buttonTitle={"Explore"}
            />
          }
        />
      ),

      url: "/u/account/knowledge-session/host/my-sessions/pending",
    },
    {
      id: 3,
      label: "Past",
      component: (
        <SessionList
          hostView={hostView}
          data={pastData}
          loading={loading}
          component={
            <BaseEmptyStateComponent
              imgSrc={attendeeViewPastSessionsEmpty}
              buttonTitle={"Explore"}
              message={
                hostView
                  ? " Oops! looks like you've no more bookings."
                  : "Oops! Looks like you didn't book any sessions."
              }
              shortDescription={
                hostView
                  ? "Create a new session instead?"
                  : "Would you like to book one?"
              }
            />
          }
        />
      ),
      url: "/u/account/knowledge-session/host/my-sessions/past",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <PaperBase
      // style={{ position: "fixed", width:'75vw', height:'100%' }}
      >
        <Typography fontWeight="700" fontSize="28px">
          My Sessions {hostView ? "(Host)" : "(Attendee)"}
        </Typography>

        <BasicTabs data={data} />

        <Switch>
          <Route path="/u/account/knowledge-session/host/my-sessions/upcoming">
            <SessionList data={upcomingData} loading={loading} />,
          </Route>
        </Switch>
      </PaperBase>
    </div>
  );
};

export default MySessionsView;
