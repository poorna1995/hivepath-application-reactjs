import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import hivepathLogo from "assets/svg/logo.svg";
import { MdSearch, MdSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { signOutUserSuccess } from "store/User/user.actions";
import authFetch from "utils/authFetch";
import MenuContainer from "./DropDownMenu/MenuContainer";
import DropDownMenuItemLink from "./DropDownMenu/DropDownMenuItemLink";
// import { ReactComponent as SettingsIcon } from "assets/svg/dropdown/settings-icon.svg";

// import { ReactComponent as ReferIcon } from "assets/svg/dropdown/refer-icon.svg";
import LogoutDialog from "components/Common/Dialog/LogoutDialog";

import HeaderNotificationContainer from "sections/AppPages/NotificationSections/Components/HeaderComponents/HeaderNotificationContainer";

import {
  setNotifications,
  updateNotification,
  setMarkAsReadAll,
} from "store/notifications/notifications.actions";
import { convertArrayToObject } from "sections/AppPages/LandingPageSections/utils/arrayToObjects";
import useNotificationService from "sections/AppPages/NotificationSections/customHook/useNotificationService";
import { markAllAsReadService } from "sections/AppPages/NotificationSections/utils/notificationService";
// import { ReactComponent as BookmarkIcon } from "assets/svg/landing-page/bookmark.svg";
// import menuNavigationData from "./menuNavigationData";
import UserProfileMenuItem from "./DropDownMenu/ProfileMenuItem";
import DropDownMenuItemButton from "./DropDownMenu/DropDownMenuItemButton";

import { ReactComponent as BookmarkIcon } from "assets/svg/all/new-icons/dropdown-menu/bookmark-icon.svg";

import { ReactComponent as NotificationIcon } from "assets/svg/all/new-icons/dropdown-menu/notifications-icon.svg";

import { ReactComponent as HelpIcon } from "assets/svg/all/new-icons/dropdown-menu/help-icon.svg";

import { ReactComponent as KnowledgeSessionIcon } from "assets/svg/all/new-icons/dropdown-menu/my-sessions-icon.svg";
import { ReactComponent as ManageSessionIcon } from "assets/svg/all/new-icons/dropdown-menu/manage-sessions.svg";

import { ReactComponent as LogoutIcon } from "assets/svg/all/new-icons/dropdown-menu/logout-icon.svg";
import { ReactComponent as ProfileIcon } from "assets/svg/all/new-icons/dropdown-menu/profile-icon.svg";

import { ReactComponent as SettingsIcon } from "assets/svg/all/new-icons/dropdown-menu/settings-icon.svg";

import { ReactComponent as ReferIcon } from "assets/svg/all/new-icons/dropdown-menu/refer-icon.svg";
import { ReactComponent as CalendarIcon } from "assets/svg/all/new-icons/dropdown-menu/calendar.svg";

import { useTheme } from "@mui/styles";
import SuggestionDrawer from "components/Common/Drawers/SuggestionDrawer";
import MenuIcon from "@mui/icons-material/Menu";

import ReferCodeCopyComponent from "./ReferCodeCopy/index";

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: " 0px 0px 3px rgba(0, 0, 0, 0.25) !important",
    background: "#fff !important",
    height: "80px",

    paddingTop: "8px",
    // paddingBottom: "8px",
    [theme.breakpoints.down("sm")]: {
      height: "72px",
    },
  },
  navigation: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // flexDirection: "row",
  },
  icon: {
    // background: "rgba(243, 243, 243, 1)",
    marginLeft: theme.spacing(1),
  },
  explore: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  grow: {
    flex: 1,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  hideOnMobileNavigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logo: {
    width: "160px",
    height: "40px",
    marginLeft: "-24px",
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      width: "160px",
      height: "36px",
    },
  },
  viewMore: {
    color: theme.palette.primary.main,
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
  // backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: "black",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: 'inherit',
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    // background:
    //   "linear-gradient(94.66deg, #183DFF 2.48%, #5D1EAE 39.58%, #F74B35 97.47%)",
  },
}));

const mapState = ({ user, notifications }) => ({
  currentUser: user?.currentUser,
  onboarding_data: user?.onboarding_data,
  notificationsState: notifications,
});

const AppHeader = ({
  isAdmin,
  isSettings,
  maxWidth,
  height,
  position,
  isOnboarding,
  onClickSaveButton,
  showButton,
}) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("md");
  const matches = useMediaQuery(mobileView);
  const { currentUser, onboarding_data, notificationsState } =
    useSelector(mapState);

  const [isLoading, error, data, fetchData] = useNotificationService({
    user_id: currentUser.user_id,
  });

  const KS_ONBOARDING_DONE = currentUser.knowledge_session_onboarding_done;
  const USER_PROFILE_ONBOARDING_DONE = currentUser.profile_onboarding_done;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationEl, setNotificationEl] = React.useState(null);
  let slug_id = null;
  if (currentUser.public_profile) {
    slug_id = currentUser.public_profile.slug_id;
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const { notifications, markAsReadAll } = notificationsState;
  const unread = Object.keys(notifications).filter(
    (item) => !notifications[item].read
  ).length;

  const userName = `${currentUser?.firstname} ${currentUser?.lastname}`;
  const userImage =
    onboarding_data?.onboarding_data?.stage2?.image_url ||
    currentUser?.image_url;
  const USER_ID = currentUser?.user_id;
  const enqueueSnackbar = useEnquequeSnackbar();
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openNotification = Boolean(notificationEl);
  const notificationHandleClick = (event) => {
    // fetchData();
    setNotificationEl(event.currentTarget);
  };
  const notificationHandleClose = () => {
    setNotificationEl(null);
  };

  const handleLogoutDialogOpen = () => setLogoutDialogOpen(true);
  const handleLogoutDialogClose = () => setLogoutDialogOpen(false);

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

  const menuNavigationData = [
    {
      url: "/u/account/edit-profile/1",
      icon: ProfileIcon,
      title: "Profile",
      description: "Edit or update your public user profile",
      show: USER_PROFILE_ONBOARDING_DONE,
    },
    {
      url: "/notifications",
      icon: NotificationIcon,
      title: "Notifications",
      description: "View notifications",
      show: matches,
    },
    {
      url: "/u/account/bookmarks",
      icon: BookmarkIcon,
      title: "Bookmarks",
      description: "Access your bookmarks",
      show: matches,
    },

    {
      url: "/u/account/referral",
      icon: ReferIcon,
      title: "Share the word!",
      description: "Refer Hivepath to your network",
      show: USER_PROFILE_ONBOARDING_DONE,
      // show: true,
    },

    // {
    //   url: "/settings",
    //   icon: SettingsIcon,
    //   title: "Account Settings",
    //   description: "Update or change your account information",
    //   show: true,
    // },

    {
      url: "/u/account/sessions",
      icon: KnowledgeSessionIcon,
      title: "My Sessions",
      description: "View your list of sessions and details",
      show: true,
    },
    {
      title: "My Calendar",
      url: "/global-calendar",
      icon: CalendarIcon,
      description: "View your sessions and details in calendar",

      // show: USER_PROFILE_ONBOARDING_DONE,
      show: matches,
    },

    {
      url: "/u/account/manage-sessions",
      icon: ManageSessionIcon,
      title: "Manage Sessions",
      description: "Update your session details or preferences",
      show: KS_ONBOARDING_DONE,
    },

    // {
    //   url: "/help",
    //   icon: HelpIcon,
    //   title: "Help",
    //   description: "Change your account and preferences",
    //   show: true,
    // },
  ];

  const filteredLinks = menuNavigationData
    .map((item, index) => {
      const { title, icon, show, url, exact, hasDivider, description } = item;

      return {
        title,
        icon,
        show,
        url,
        exact,
        hasDivider,
        description,
      };
    })
    .filter((item, index) => {
      const { title, icon, show, url, exact, hasDivider, description } =
        item && item;
      if (show)
        return {
          title,
          icon,
          show,
          url,
          exact,
          hasDivider,
          description,
        };
      return null;
    });

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appbar}
        position="static"
        style={{ height: height, position: position }}
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box className={classes.navigation}>
            {!isAdmin && (
              <>
                {" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {matches && (
                    <IconButton onClick={handleToggleDrawer}>
                      <MenuIcon />
                    </IconButton>
                  )}

                  <Link to="/">
                    <img
                      src={hivepathLogo}
                      alt="Logo"
                      className={classes.logo}
                      style={{}}
                    />
                  </Link>
                </div>
                {/* {!isSettings && (
                  <Search>
                    <SearchIconWrapper>
                      <MdSearch />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search by name, Topic, Offering"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                )} */}
              </>
            )}
            <div className={classes.grow} />

            <div style={{}} className={classes.hideOnMobileNavigation}>
              {isOnboarding && showButton && (
                <>
                  <Button
                    style={{
                      textTransform: "initial",
                    }}
                    onClick={onClickSaveButton}
                  >
                    Save and exit
                  </Button>
                </>
              )}
              {!isOnboarding && (
                <>
                  {
                    <Tooltip title="Calendar">
                      <IconButton
                        className={classes.icon}
                        component={Link}
                        to="/global-calendar"
                      >
                        <CalendarIcon
                          style={{ width: "28px", height: "28px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  }
                  <Tooltip title="Bookmarks">
                    <IconButton
                      sx={{ color: "primary.main" }}
                      className={classes.icon}
                      component={Link}
                      to="/u/account/bookmarks"
                    >
                      <BookmarkIcon style={{ width: "28px", height: "28px" }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Notifications">
                    <IconButton
                      className={classes.icon}
                      sx={{ color: "#121212" }}
                      onClick={notificationHandleClick}
                    >
                      {!markAsReadAll && (
                        <StyledBadge color="primary" badgeContent={unread}>
                          <NotificationIcon
                            style={{ width: "28px", height: "28px" }}
                          />
                        </StyledBadge>
                      )}
                      {markAsReadAll && (
                        <NotificationIcon
                          style={{ width: "28px", height: "28px" }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {/* <IconButton onClick={handleProfileMenuOpen}>
                            <Avatar src="https://source.unsplash.com/random" />
                        </IconButton> */}
            </div>
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar src={userImage} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          style: {
            boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
            borderRadius: "15px",
            marginTop: "14px",
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <div>
          <UserProfileMenuItem
            userName={userName}
            userImage={userImage}
            slug_id={slug_id}
            USER_PROFILE_ONBOARDING_DONE={USER_PROFILE_ONBOARDING_DONE}
          />
          <ReferCodeCopyComponent
            referral_link={currentUser.public_access_code}
          />

          {!matches && (
            <>
              {filteredLinks.map((item) => {
                const { url, icon, title, hasDivider, description } = item;

                return (
                  <DropDownMenuItemLink
                    key={title + url}
                    url={url}
                    icon={icon}
                    title={title}
                    hasDivider={hasDivider}
                    description={description}
                  />
                );
              })}
            </>
          )}

          <DropDownMenuItemButton
            title={"Logout "}
            description={`Sign out of your Hivepath account`}
            icon={LogoutIcon}
            onClick={handleLogoutDialogOpen}
          />
        </div>
      </Menu>

      {/* notification menu */}
      <Menu
        anchorEl={notificationEl}
        open={openNotification}
        onClose={notificationHandleClose}
        onClick={notificationHandleClose}
        PaperProps={{
          elevation: 0,
          style: {
            paddingTop: "16px",
            // paddingBottom: "16px",
            width: "450px",
            boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
            borderRadius: "15px",
            marginTop: "14px",
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        sx={{ maxHeight: "600px" }}
      >
        {/* <MenuItem> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              color: "black",
              fontSize: "24px",
              paddingLeft: "14px",
            }}
          >
            Notifications {markAsReadAll || (unread > 0 && `(${unread})`)}
          </Typography>
          {markAsReadAll ||
            (unread > 0 && (
              <Typography
                variant="subtitle2"
                align="right"
                fontWeight="bold"
                sx={{
                  paddingRight: "24px",
                  cursor: "pointer",
                  color: (theme) => theme.palette.primary.main,
                }}
                onClick={markAsReadAllHandler}
              >
                {" "}
                Mark all as read
              </Typography>
            ))}
        </div>
        <Divider />

        <HeaderNotificationContainer />

        {/* <Divider /> */}
        <MenuItem
          sx={{ display: "flex", justifyContent: "center" }}
          onClick={() => history.push("/notifications")}
        >
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "15px",
              paddingBottom: "15px",
              height: "20px",
              cursor: "pointer",
            }}
            onClick={() => history.push("/notifications")}
          > */}
          <Typography fontWeight="600" variant="subtitle2">
            <Link to="/notifications" className={classes.viewMore}>
              View More
            </Link>
          </Typography>
          {/* </div> */}
        </MenuItem>
      </Menu>

      <LogoutDialog
        open={logoutDialogOpen}
        handleClose={handleLogoutDialogClose}
      />
      {/* <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: "16px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <MenuItem component={Link} to="/user">
          <ListItemIcon>
            <Avatar src={userImage} />
          </ListItemIcon>
          <ListItemText
            primary={userName}
            primaryTypographyProps={{
              fontSize: "1rem",
              fontWeight: "medium",
              letterSpacing: 0,
            }}
            secondary="View public Profile"
            secondaryTypographyProps={{
              color: "primary",
              fontWeight: "medium",
              variant: "body2",
              fontSize: "0.8rem",
            }}
          />
        </MenuItem>

        <Divider />
        <MenuItem component={Link} to="/schedule/slot">
          <ListItemIcon>
            <FaFirstOrder />
          </ListItemIcon>
          My Orders
        </MenuItem>

        <MenuItem
          component={Link}
          to="/onboarding/knowledge-session/step-one"
        >
          <ListItemIcon>
            <MdSettings />
          </ListItemIcon>
          Settings & Privacy
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/admin/slot-planner/week">
          <ListItemIcon>
            <FaUserPlus />
          </ListItemIcon>
          Admin Dashboard
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <FaUser />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu> */}
      {matches && (
        <SuggestionDrawer
          anchor={"left"}
          open={openDrawer}
          closeDrawer={handleCloseDrawer}
          component={
            <div>
              {/* <UserProfileMenuItem
                userName={userName}
                userImage={userImage}
                slug_id={slug_id}
                USER_PROFILE_ONBOARDING_DONE={USER_PROFILE_ONBOARDING_DONE}
              /> */}

              {filteredLinks.map((item) => {
                const { url, icon, title, hasDivider, description } = item;

                return (
                  <DropDownMenuItemLink
                    key={title + url}
                    url={url}
                    icon={icon}
                    title={title}
                    hasDivider={hasDivider}
                    description={description}
                  />
                );
              })}

              {/* <DropDownMenuItemButton
                title={"Logout "}
                icon={LogoutIcon}
                onClick={handleLogoutDialogOpen}
              /> */}
            </div>
          }
        />
      )}
    </div>
  );
};

export default AppHeader;
