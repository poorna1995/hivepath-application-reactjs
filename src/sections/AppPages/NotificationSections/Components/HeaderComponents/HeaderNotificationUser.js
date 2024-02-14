import bellIcon from "assets/svg/notifications/bell.svg";
import hivepathIcon from "assets/svg/notifications/hivepathNoification.svg";
import unreadIcon from "assets/svg/notifications/unreadSymbol.svg";

import { formatDistanceToNow } from "date-fns";
import changeTimeZone from "utils/changeTimeZone";
import enUS from "date-fns/locale/en-US";

import { Grid, Typography, Avatar, Divider } from "@mui/material";
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

const HeaderNotificationUser = ({ data, isReadAll, ...props }) => {
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
    attendee_data,
    host_data,
    user_type,
    tagged_user_id,
    session_data,
    redirection_page,
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

  const isRead = isReadAll || read;
  let icon = host_data?.image_url;

  if (user_type === "host") {
    icon = attendee_data?.image_url;
  }

  const markAsRead = () => {
    const { notifications, unread, markAsReadAll } = notificationsState;
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
          //     setNotifications({
          //       ...notificationsState,
          //       unread: unread - 1,
          //     })
          //   );
        } else {
          // error handling needs to be done here
        }
      });
    }

    history.push(`/${redirection_page}` || "/notifications");
    // const booking_id = session_data.booking_id;
    // const url = `/sessions/${booking_id}`;
    // history.push(url || "/");
  };

  return (
    <Grid
      onClick={markAsRead}
      container
      spacing={2}
      // mb={2}
    >
      <Grid
        item
        xs={2}
        md={2}
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "left",
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
            alt=""
          />
        )} */}
        <Avatar src={icon} style={{ width: "50px", height: "50px" }} />
      </Grid>
      <Grid item xs={10} md={10}>
        <Typography
          variant="h6"
          fontWeight="bold"
          fontSize="16px"
          onClick={markAsRead}
          style={{ cursor: "pointer" }}
        >
          {title}
        </Typography>
        {/* <Typography
          variant="h6"
          fontWeight="bold"
          fontSize="16px"
          color="#484A9E"
        >
          {sub_title || description}
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

export default HeaderNotificationUser;
