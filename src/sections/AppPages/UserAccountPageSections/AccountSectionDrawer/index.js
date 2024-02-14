import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  MdChevronLeft,
  MdChevronRight,
  MdInbox,
  MdMail,
  MdMenu,
} from "react-icons/md";
import SettingsContainer from "../SettingsSections/SettingsContainer";
import AppHeader from "components/AppHeader";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as HelpIcon } from "assets/svg/all/new-icons/dropdown-menu/help-icon.svg";

// import { ReactComponent as BookmarkIcon } from "assets/svg/landing-page/bookmark.svg";
// import { ReactComponent as HomeIcon } from "assets/svg/landing-page/home.svg";
// import { ReactComponent as NotificationIcon } from "assets/svg/notifications/notification.svg";

import { ReactComponent as KnowledgeSessionIcon } from "assets/svg/all/new-icons/dropdown-menu/my-sessions-icon.svg";
import { ReactComponent as ManageSessionIcon } from "assets/svg/all/new-icons/dropdown-menu/manage-sessions.svg";

import { ReactComponent as LogoutIcon } from "assets/svg/all/new-icons/dropdown-menu/logout-icon.svg";
import { ReactComponent as ProfileIcon } from "assets/svg/all/new-icons/dropdown-menu/profile-icon.svg";

import { ReactComponent as SettingsIcon } from "assets/svg/all/new-icons/dropdown-menu/settings-icon.svg";

import { ReactComponent as ReferIcon } from "assets/svg/all/new-icons/dropdown-menu/refer-icon.svg";
import { ReactComponent as BookmarkIcon } from "assets/svg/all/new-icons/dropdown-menu/bookmark-icon.svg";

import { ReactComponent as NotificationIcon } from "assets/svg/all/new-icons/dropdown-menu/notifications-icon.svg";
import { ReactComponent as HomeIcon } from "assets/svg/all/new-icons/dropdown-menu/home-icon.svg";

import { useDispatch, useSelector } from "react-redux";
import { setUserAccountDrawerOpen } from "store/views/view.actions";
import LogoutDialog from "components/Common/Dialog/LogoutDialog";
import { Tooltip, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FaRegBell } from "react-icons/fa";
import { ReactComponent as CalendarIcon } from "assets/svg/all/new-icons/dropdown-menu/calendar.svg";

// import { ReactComponent as ManageSessionIcon } from "assets/svg/all/new-icons/dropdown-menu/manage-sessions.svg";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "visible",
  borderRight: "none",

  background: "#F7f7f7",
  // boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  borderRight: "none",
  // boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
  overflow: "visible",
  paddingLeft: "8px",
  paddingRight: "8px",
  // paddingLeft: "8px",
  // marginLeft: "-24px",

  background: "#F7f7f7",

  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    overflow: "visible",
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  borderRight: "none",
  // overflow: "visible",
  boxSizing: "border-box",
  position: "relative",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),

    // overflow: "visible",
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),

    // overflow: "visible",
  }),
}));

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      // display: "none",
      // maxWidth: "100%",
    },
  },
  drawer: {
    [theme.breakpoints.down("sm")]: {
      // display: "none",
    },
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    marginLeft: "16px",
    marginRight: "16px",
    "&:hover": {
      borderRadius: "10px",
      background: "rgba(0,0,0,0.04)",
      "& > div:first-child": {
        // background: "rgba(229, 79, 109, 0.1)",
      },
      "&>svg": {
        opacity: 1,

        fill: "rgba(56, 91, 215, 1)",
        color: "rgba(56, 91, 215, 1)",
      },
    },
  },
  listItemIcon: {
    // background: "#F8F8F8",
    padding: "8px",
    borderRadius: "7px",
    marginRight: "8px",
    "&:hover": {
      // background: "rgba(229, 79, 109, 0.1)",
    },
  },
  activeLink: {
    color: "#484a9e !important",
    background: "rgba(0,0,0,0.04)",
    fontWeight: "700 !important",
    fill: "#484a9e !important",
    borderRadius: "10px",
    // background:'#484a9e'
  },
  link: {
    color: "black",
  },
  icon: {
    // marginLeft: "8px",
    width: "20px",
    height: "20px",
  },
  activeIcon: {
    fill: "#484a9e",
  },
  mainContent: {
    flexGrow: 1,
    paddingLeft: "24px",
    paddingTop: "24px",
    background: "white",
    // bgcolor: "white",
    [theme.breakpoints.down("sm")]: {
      // flexGrow: 0,
      paddingLeft: "8px",
      paddingTop: "8px",
    },
  },
}));

const mapState = ({ view, user }) => ({
  currentUser: user.currentUser,
  drawerOpen: view.ua_drawer_open,
});
export default function MiniDrawer({ children, paddingLeft }) {
  const classes = useStyles();
  const { drawerOpen, currentUser } = useSelector(mapState);
  const KS_ONBOARDING_DONE = currentUser.knowledge_session_onboarding_done;
  const USER_PROFILE_ONBOARDING_DONE = currentUser.profile_onboarding_done;
  const theme = useTheme();
  const [open, setOpen] = React.useState(drawerOpen);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDrawerState = () => {
    setOpen(!open);
    dispatch(setUserAccountDrawerOpen(!open));
  };

  const handleDialogOpen = () => setDialogOpen(true);

  const links = [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      exact: true,
      show: true,
    },
    {
      title: "Notifications",

      url: "/notifications",
      icon: NotificationIcon,
      show: true,
    },
    {
      title: "Bookmarks",
      url: "/u/account/bookmarks",
      icon: BookmarkIcon,
      show: true,
    },
    {
      title: "Share the word!",
      url: "/u/account/referral",
      icon: ReferIcon,
      hasDivider: true,

      show: USER_PROFILE_ONBOARDING_DONE,
    },

    {
      title: "Edit Profile",
      url: "/u/account/edit-profile/1",
      icon: ProfileIcon,
      show: USER_PROFILE_ONBOARDING_DONE,
    },
    {
      title: "My Sessions",
      url: "/u/account/sessions",
      icon: KnowledgeSessionIcon,
      // show: USER_PROFILE_ONBOARDING_DONE,
      show: true,
    },
    {
      title: "My Calendar",
      url: "/global-calendar",
      icon: CalendarIcon,
      // show: USER_PROFILE_ONBOARDING_DONE,
      show: true,
    },
    {
      title: "Manage",
      url: "/u/account/manage-sessions",
      icon: ManageSessionIcon,
      show: KS_ONBOARDING_DONE,
    },
    // {
    //   title: "Help",
    //   url: "/help",
    //   icon: HelpIcon,
    //   show: true,
    // },
    // {
    //   title: "Account Settings",
    //   url: "/settings",
    //   icon: SettingsIcon,
    //   show: true,
    // },
  ];
  const filteredLinks = links
    .map((item, index) => {
      const { title, icon, show, url, exact, hasDivider } = item;

      return {
        title,
        icon,
        show,
        url,
        exact,
        hasDivider,
      };
    })
    .filter((item, index) => {
      const { title, icon, show, url, exact, hasDivider } = item && item;
      if (show)
        return {
          title,
          icon,
          show,
          url,
          exact,
          hasDivider,
        };
      return null;
    });
  // console.log({ filteredLinks });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        open={open}
        style={{ position: "relative" }}
        className={classes.drawer}
      >
        {/* <DrawerHeader></DrawerHeader> */}
        <Toolbar style={{ height: "80px" }} />
        <Divider />
        <Tooltip
          title={open ? "Close drawer" : "Open drawer"}
          placement="right"
          arrow
        >
          <IconButton
            style={{
              marginTop: "8px",
              padding: "0",
              border: "1px solid",
              width: "25px",
              height: "25px",
              position: "absolute",
              top: "85px",
              right: "0px",
              // overflow: "visible",
            }}
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            onClick={handleDrawerState}
          >
            {open ? <MdChevronLeft /> : <MdChevronRight />}
          </IconButton>
        </Tooltip>

        <List style={{ marginTop: "32px" }}>
          {filteredLinks?.map((item, index) => {
            const { url, title, icon: Icon, exact, hasDivider, show } = item;

            return (
              <>
                <Tooltip
                  title={title}
                  placement="right"
                  // style={{ display: open ? "none" : "" }}
                  arrow
                >
                  <MenuItem
                    component={NavLink}
                    activeClassName={classes.activeLink}
                    className={classes.menuItem}
                    to={url && url}
                    exact={exact && exact}
                    key={item.title}
                    style={
                      open
                        ? {
                            margin: "8px",
                          }
                        : { margin: "0px" }
                    }
                    // className={classes.link}
                  >
                    <ListItemIcon
                      style={open ? {} : { marginLeft: "-12px" }}
                      className={classes.listItemIcon}
                    >
                      {Icon && <Icon className={classes.icon} />}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          // color: "black",
                          fontWeight: 600,
                          // marginLeft: "8px",
                        }}
                      />
                    )}
                  </MenuItem>
                </Tooltip>
                {hasDivider && <Divider />}
              </>
            );
          })}
          <Tooltip title="Logout" placement="right" arrow>
            <MenuItem
              style={open ? { margin: "8px" } : { margin: "0px" }}
              className={classes.menuItem}
              onClick={handleDialogOpen}
            >
              <ListItemIcon
                style={open ? {} : { marginLeft: "-12px" }}
                className={classes.listItemIcon}
              >
                <LogoutIcon className={classes.icon} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primaryTypographyProps={{
                    fontWeight: 600,
                    // marginLeft: "8px",
                  }}
                  primary="Logout"
                />
              )}
            </MenuItem>
          </Tooltip>
        </List>
      </Drawer>
      <Box
        component="main"
        style={{ paddingLeft: paddingLeft }}
        className={classes.mainContent}
      >
        {children}
      </Box>

      <LogoutDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
    </Box>
  );
}
