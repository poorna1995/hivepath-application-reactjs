import hivepathIcon from "assets/svg/notifications/hivepathNoification.svg";
import bellIcon from "assets/svg/notifications/bell.svg";
import unreadIcon from "assets/svg/notifications/unreadSymbol.svg";

import { formatDistanceToNow } from "date-fns";
import changeTimeZone from "utils/changeTimeZone";
import enUS from "date-fns/locale/en-US";

import { useDispatch, useSelector } from "react-redux";
import { updateNotificationService } from "../utils/notificationService";
import {
  updateNotification,
  setNotifications,
} from "store/notifications/notifications.actions";

import { Grid, Typography, Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";

const mapState = ({ slotsData, notifications }) => ({
  slotsData: slotsData,
  notificationsState: notifications,
});

const NotificationCardUser = ({ data, isReadAll, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slotsData, notificationsState } = useSelector(mapState);
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

  const isRead = isReadAll || read;
  let icon = host_data?.image_url;
  if (user_type === "host") {
    icon = attendee_data?.image_url;
  }

  //   ####################################
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

  //   const handleNavigation = () => {
  //     history.push("/notifications/" + object_id);
  //   };

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
    history.push(redirection_page || "/notifications");
  };

  return (
    <Grid
      sx={{
        paddingLeft: {
          xs: "8px",
          md: "0px",
        },
        alignItems: {
          xs: "center",
        },
      }}
      container
      spacing={2}
      onClick={markAsRead}
    >
      {/* <Grid
        item
        xs={1}
        md={1}
        sx={{
          display: "flex",
          alignItems: { md: "baseline", xs: "center" },
          justifyContent: "right",
        }}
      >
        {!isRead && (
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
        )}
        <Avatar
          src={icon}
          sx={{
            width: { xs: "30px", md: "50px" },
            height: { xs: "30px", md: "50px" },
          }}
        />
      </Grid> */}
      <Grid
        item
        xs={11}
        md={9}
        // sx={
        //   notification_type === "general"
        //     ? { display: "flex", alignItems: "center" }
        //     : {}
        // }
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          src={icon}
          sx={{
            width: { xs: "30px", md: "50px" },
            height: { xs: "30px", md: "50px" },
            marginRight: "10px",
          }}
        />

        {/* <Typography
          variant="h6"
          fontWeight="bold"
          fontSize="16px"
          color="#484A9E"
        >
          {sub_title || description}
        </Typography> */}
        <Typography variant="h6" fontWeight="bold" fontSize="16px">
          {title}
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        md={2}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
        align="right"
      >
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

export default NotificationCardUser;
