import backIcon from "assets/svg/sessions/chevron-left.svg";
import { Grid, Typography, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

import WelcomeNotification from "./Components/HivapathNotificationsList/WelcomeNotification";
import UserProfileNotification from "./Components/HivapathNotificationsList/UserProfileNotification";
import KnowledgeSessionNotification from "./Components/HivapathNotificationsList/KnowledgeSessionNotification";
import ReferralNotification from "./Components/HivapathNotificationsList/ReferralNotification";
import { updateNotificationService } from "./utils/notificationService";
import { updateNotification } from "store/notifications/notifications.actions";

const mapState = ({ notifications }) => ({
  notificationsState: notifications,
});

const ExpandedNotification = ({ ...props }) => {
  const { notificationId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { notificationsState } = useSelector(mapState);

  const updateAsRead = () => {
    const { notifications } = notificationsState;
    const notificationItem = notifications[notificationId];

    if (notificationItem && !notificationItem.read) {
      const { object_id } = notificationItem;
      updateNotificationService({ object_id: object_id }).then((res) => {
        const { status } = res.result;
        if (status === "success") {
          dispatch(
            updateNotification({
              ...notifications[object_id],
              read: true,
            })
          );
        } else {
          // error handling needs to be done here
        }
      });
    }
  };

  let renderComponent = <p>Oops, looks like nothing to see here</p>;
  if (notificationsState.notifications[notificationId]) {
    const { redirection_page } =
      notificationsState.notifications[notificationId];

    switch (redirection_page) {
      case "welcome":
        renderComponent = <WelcomeNotification />;
        break;
      case "profile_onboarded_completion_page":
        renderComponent = <UserProfileNotification />;
        break;
      case "knowledge_session_completion_page":
        renderComponent = <KnowledgeSessionNotification />;
        break;
      case "referral_page":
        renderComponent = <ReferralNotification />;
        break;
    }
  }

  useEffect(() => {
    updateAsRead();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontWeight="600">
          <IconButton onClick={() => history.push("/notifications")}>
            <img src={backIcon} />
          </IconButton>
          Notifications
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} m={2} mt={3} style={{ maxWidth: "800px" }}>
        {renderComponent}
      </Grid>
    </Grid>
  );
};

export default ExpandedNotification;
