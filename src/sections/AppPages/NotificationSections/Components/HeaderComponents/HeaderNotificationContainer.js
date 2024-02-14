import React from "react";
import { useSelector } from "react-redux";
import { Divider, MenuItem, Skeleton } from "@mui/material";
import HeaderNotificationItem from "./HeaderNotificationItem";
import HeaderNotificationUser from "./HeaderNotificationUser";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import noNotifications from "assets/svg/all/new-icons/empty-states/notifications/no-notifications.svg";

const mapState = ({ notifications }) => ({
  notificationsState: notifications,
});

const HeaderNotificationContainer = () => {
  const { notificationsState } = useSelector(mapState);
  const { notifications, markAsReadAll, isLoading } = notificationsState;

  return (
    <div
      className="notificationContent"
      style={{
        maxHeight: "400px",
        overflowY: "scroll",
        width: "100%",
        // padding: "10px",
        // paddingLeft: "30px",
      }}
    >
      {isLoading && (
        <>
          <Skeleton
            variant="rectangular"
            style={{ width: "100%", height: "40px", marginBottom: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            style={{ width: "100%", height: "40px", marginBottom: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            style={{ width: "100%", height: "40px", marginBottom: "20px" }}
          />
        </>
      )}

      {!isLoading && Object.keys(notifications).length === 0 && (
        <BaseEmptyStateComponent
          imgSrc={noNotifications}
          imageStyles={{
            height: "150px",
          }}
          containerStyles={{ textAlign: "center" }}
          message={`Oops! You currently don’t have any new notifications!`}
        />
      )}

      {Object.keys(notifications)
        .reverse()
        .map((item) => {
          const { notification_type, object_id, read } = notifications[item];
          const isRead = markAsReadAll || read;

          if (notification_type === "user_specific") {
            return (
              <MenuItem
                key={`containItem${object_id}`}
                style={{
                  whiteSpace: "normal",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  paddingTop: "10px",
                  paddingLeft: "30px",
                  background: !isRead && "rgba(72, 74, 158, 0.05)",
                }}
              >
                <HeaderNotificationUser
                  key={object_id}
                  data={notifications[item]}
                  isReadAll={markAsReadAll}
                />
              </MenuItem>
            );
          } else {
            return (
              <MenuItem
                key={`containItem${object_id}`}
                style={{
                  whiteSpace: "normal",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  paddingTop: "10px",
                  paddingLeft: "30px",
                  background: !isRead && "rgba(72, 74, 158, 0.05)",
                }}
              >
                <HeaderNotificationItem
                  key={object_id}
                  data={notifications[item]}
                  isReadAll={markAsReadAll}
                />
              </MenuItem>
            );
          }
        })}
    </div>
  );
};

export default HeaderNotificationContainer;

{
  /* <Divider
                  style={{ marginBottom: "10px" }}
                  key={`divider${object_id}`}
                /> */
}
