import bellIcon from "assets/svg/notifications/bell.svg";
import hivepathIcon from "assets/svg/notifications/hivepathNoification.svg";
import unreadIcon from "assets/svg/notifications/unreadSymbol.svg";

import { formatDistanceToNow } from "date-fns";
import { Grid, Typography, Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateNotificationService } from "../../utils/notificationService";
import {
  updateNotification,
  setNotifications,
} from "store/notifications/notifications.actions";

const mapState = ({ slotsData, notifications }) => ({
  notificationsState: notifications,
  slotsData: slotsData,
});

const HeaderNotificationItem = ({ data, isReadAll, ...props }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { notificationsState, slotsData } = useSelector(mapState);

  const { timezone } = slotsData;

  const {
    title,
    sub_title,
    description,
    action_date_iso,
    read,
    object_id,
    notification_type,
    redirection_page,
    session_data,
  } = data;

  //   const duration = formatDistanceToNow(
  //     changeTimeZone(new Date(action_date_iso), enUS, timezone),
  //     {
  //       addSuffix: true,
  //     }
  //   );
  /*################################ */
  const dateSplit = action_date_iso.split("T")[0].split("-");
  const timeSplit = action_date_iso.split("T")[1].split(":");
  const utcDate = new Date(
    Date.UTC(
      dateSplit[0],
      parseInt(dateSplit[1]) - 1,
      dateSplit[2],
      timeSplit[0],
      timeSplit[1],
      timeSplit[2]
    )
  );

  const wordsToRemove = ["about", "over", "almost"];
  const duration = formatDistanceToNow(utcDate, {
    addSuffix: true,
  }).replace(new RegExp(wordsToRemove.join("|"), "g"), "");
  /*################################ */
  const app_pages = [
    "welcome",
    "profile_onboarded_completion_page",
    "knowledge_session_completion_page",
    "referral_page",
  ];

  const isRead = isReadAll || read;
  let icon = bellIcon;
  if (app_pages.indexOf(redirection_page) !== -1) {
    icon = hivepathIcon;
  }

  const handleNavigation = () => {
    history.push("/notifications/" + object_id);
  };

  const markAsRead = () => {
    const { notifications, unread } = notificationsState;
    const notificationItem = notifications[object_id];

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
          //   dispatch(
          //     setNotifications({ ...notificationsState, unread: unread - 1 })
          //   );
        } else {
          // error handling needs to be done here
        }
      });
    }

    // if (notification_type === "app_notification") {
    if (app_pages.indexOf(redirection_page) !== -1) {
      history.push("/notifications/" + object_id);
    } else {
      const modifiedUrl = redirection_page.replace("/app/", "/");
      history.push(`/${modifiedUrl}` || "/notifications");
      //   if (notification_tag === "knowledge_session") {
      //     history.push(url);
      //     return;
      //   }
      //   history.push("/notifications");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      //   mb={1}
      onClick={
        markAsRead
        // notification_type === "app_notification" ? handleNavigation : markAsRead
      }
    >
      <Grid
        item
        xs={2}
        md={2}
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "right",
        }}
      >
        {/* {!isRead && (
          <img
            src={unreadIcon}
            height="12px"
            width="12px"
            style={{
              marginRight: "10px",
              marginBottom: "auto",
              marginTop: "20px",
            }}
          />
        )} */}
        <Avatar src={icon} style={{ width: "50px", height: "50px" }} />
      </Grid>
      <Grid item xs={10} md={10}>
        <Typography variant="h6" fontWeight="bold" fontSize="16px">
          {title}
        </Typography>
        {/* <Typography
          variant="h6"
          fontWeight="bold"
          fontSize="16px"
          color="#484A9E"
        >
          {description}
        </Typography> */}
        <Typography
          variant="subtitle"
          fontWeight="bold"
          fontSize="12px"
          color="rgba(0, 0, 0, 0.4)"
        >
          {duration}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HeaderNotificationItem;
