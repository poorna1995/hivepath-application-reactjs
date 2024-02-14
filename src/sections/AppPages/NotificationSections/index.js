import backIcon from "assets/svg/sessions/chevron-left.svg";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Grid,
  IconButton,
  Typography,
  Box,
  Paper,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import PaperBase from "components/Common/PaperBase/PaperBase";
import LPSidebar from "sections/AppPages/LandingPageSections/Components/LPSidebar";
import HivepathNotificationCard from "./Components/HivepathNotificationCard";
import NotificationCardUser from "./Components/NotificationCardUser";
import ExpandedNotification from "./ExpandedNotification";
import noNotifications from "assets/svg/all/new-icons/empty-states/notifications/no-notifications.svg";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import {
  setMarkAsReadAll,
  updateNotification,
} from "store/notifications/notifications.actions";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import { markAllAsReadService } from "./utils/notificationService";

const mapState = ({ user, notifications }) => ({
  currentUser: user?.currentUser,
  onboarding_data: user?.onboarding_data,
  notificationsState: notifications,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 3 }}>
        <Box sx={{ p: 3, paddingLeft: "0" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const NotificationSections = () => {
  const history = useHistory();
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const { notificationId } = useParams();

  const { notificationsState, currentUser } = useSelector(mapState);
  const { notifications, markAsReadAll, isLoading } = notificationsState;

  const unread = Object.keys(notifications).filter(
    (item) => !notifications[item].read
  ).length;

  const [value, setValue] = useState(0);
  const [showNotification, setShowNotification] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = [];
  const ksData = [];

  Object.keys(notifications)
    .reverse()
    .map((item) => {
      const {
        notification_type,
        notification_category,
        notificaiton_tag,
        object_id,
        read,
      } = notifications[item];
      const isRead = markAsReadAll || read;
      let notificationItem = null;
      if (notification_type === "user_specific") {
        notificationItem = (
          <NotificationCardUser
            data={notifications[item]}
            isReadAll={markAsReadAll}
          />
        );
      } else {
        notificationItem = (
          <HivepathNotificationCard
            data={notifications[item]}
            isReadAll={markAsReadAll}
          />
        );
      }
      notificationItem = (
        <MenuItem
          key={`containItemN${object_id}`}
          style={{
            whiteSpace: "normal",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            // paddingLeft: "8px",
            paddingTop: "16px",
            paddingBottom: "16px",
            background: !isRead && "rgba(72, 74, 158, 0.05)",
          }}
        >
          {notificationItem}
        </MenuItem>
      );
      data.push(notificationItem);
      //   if (notificaiton_tag === "knowledge_session") {
      //     ksData.push(notificationItem);
      //   }
    });

  //   const expandNotification = (object_id) => {
  //     // do an api call here to update the read status
  //     dispatch(
  //       updateNotification({
  //         ...notifications[object_id],
  //         read: true,
  //       })
  //     );
  //     history.push("/notifications/" + object_id);
  //   };

  const markAsReadAllHandler = () => {
    // do an api call here for mark all as read
    markAllAsReadService({ user_id: currentUser.user_id }).then((res) => {
      const { error } = res;
      if (!error) {
        dispatch(setMarkAsReadAll(true));
      } else {
        enqueueSnackbar(error, { variant: "error" });
      }
    });
  };

  return (
    <Grid container>
      {/* <Grid item xs={2} md={2}>
        <LPSidebar />
      </Grid> */}
      <Grid
        item
        xs={12}
        md={12}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ width: "100%", maxWidth: "1440px" }}>
          <PaperBase
            style={{
              height: "100%",
              width: "100%",
              marginRight: "10%",
              minHeight: "85vh",
              boxShadow: "none",
              border: "none",
              padding: "0",
              paddingRight: "10px",
            }}
          >
            {notificationId && <ExpandedNotification />}
            {!notificationId && (
              <>
                <Box mb={2}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontSize="34px"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",

                      fontSize: {
                        xs: "24px",
                      },
                    }}
                  >
                    Notifications{" "}
                    {markAsReadAll || (unread > 0 && `(${unread})`)}
                    {markAsReadAll ||
                      (unread > 0 && (
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          align="right"
                          sx={{
                            color: (theme) => theme.palette.primary.main,
                            cursor: "pointer",
                          }}
                          onClick={markAsReadAllHandler}
                        >
                          Mark all as read
                        </Typography>
                      ))}
                  </Typography>
                </Box>

                <>
                  {isLoading && (
                    <>
                      <Skeleton
                        variant="rectangular"
                        style={{
                          width: "100%",
                          height: "40px",
                          marginBottom: "20px",
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        style={{
                          width: "100%",
                          height: "40px",
                          marginBottom: "20px",
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        style={{
                          width: "100%",
                          height: "40px",
                          marginBottom: "20px",
                        }}
                      />
                    </>
                  )}

                  {!isLoading && data.length === 0 && (
                    <BaseEmptyStateComponent
                      imgSrc={noNotifications}
                      imageStyles={{ width: "200px" }}
                      message={`Oops! You currently don’t have any new notifications!`}
                    />
                  )}

                  {!isLoading && data.length > 0 && data}
                </>
              </>
            )}
          </PaperBase>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NotificationSections;

{
  /* <Box>
		<Typography
		variant="h6"
		fontWeight="bold"
		fontSize="34px"
		sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",

			fontSize: {
			xs: "24px",
			},
		}}
		>
		Notifications{" "}
		{markAsReadAll || (unread > 0 && `(${unread})`)}
		{markAsReadAll ||
			(unread > 0 && (
			<Typography
				variant="subtitle2"
				fontWeight="bold"
				align="right"
				color="#484A9E"
				sx={{ cursor: "pointer" }}
				onClick={markAsReadAllHandler}
			>
				Mark all as read
			</Typography>
			))}
		</Typography>
		<Tabs
		value={value}
		onChange={handleChange}
		aria-label="basic tabs example"
		>
		<Tab
			label="All"
			{...a11yProps(0)}
			style={{
			fontWeight: "bold",
			textTransform: "none",
			fontSize: "16px",
			}}
		/>
		<Tab
			label="Knowledge session"
			{...a11yProps(1)}
			style={{
			fontWeight: "bold",
			textTransform: "none",
			fontSize: "16px",
			}}
		/>
		</Tabs>
	</Box>
	<TabPanel value={value} index={0}>
		<>
		{isLoading && (
			<>
			<Skeleton
				variant="rectangular"
				style={{
				width: "100%",
				height: "40px",
				marginBottom: "20px",
				}}
			/>
			<Skeleton
				variant="rectangular"
				style={{
				width: "100%",
				height: "40px",
				marginBottom: "20px",
				}}
			/>
			<Skeleton
				variant="rectangular"
				style={{
				width: "100%",
				height: "40px",
				marginBottom: "20px",
				}}
			/>
			</>
		)}

		{!isLoading && data.length === 0 && (
			<BaseEmptyStateComponent
			imgSrc={noNotifications}
			imageStyles={{ width: "200px" }}
			message={`Oops! You currently don’t have any new notifications!`}
			/>
		)}

		{!isLoading && data.length > 0 && data}
		</>
	</TabPanel>
	<TabPanel value={value} index={1}>
		{isLoading && <p>Loading...</p>}

		{!isLoading && ksData.length === 0 && (
		<BaseEmptyStateComponent
			imgSrc={noNotifications}
			imageStyles={{ width: "200px" }}
			message={`Oops! You currently don’t have any new notifications!`}
		/>
		)}

		{!isLoading && ksData.length > 0 && ksData}
	</TabPanel>{" "} */
}
