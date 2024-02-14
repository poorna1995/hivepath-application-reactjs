import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { Link, NavLink } from "react-router-dom";

import { ReactComponent as Contact } from "assets/svg/help-page/contact.svg";
import { ReactComponent as Faq } from "assets/svg/help-page/faq.svg";
import { ReactComponent as Feedback } from "assets/svg/help-page/feedback.svg";
import { ReactComponent as UserGuide } from "assets/svg/help-page/user-guide.svg";

import { ReactComponent as HomeIcon } from "assets/svg/landing-page/home.svg";
import { ReactComponent as NotificationIcon } from "assets/svg/notifications/notification.svg";

import { ReactComponent as KnowledgeSessionIcon } from "assets/svg/all/new-icons/dropdown-menu/my-sessions-icon.svg";

import { ReactComponent as LogoutIcon } from "assets/svg/all/new-icons/dropdown-menu/logout-icon.svg";
import { ReactComponent as ProfileIcon } from "assets/svg/all/new-icons/dropdown-menu/profile-icon.svg";

import { useDispatch, useSelector } from "react-redux";
import { setUserAccountDrawerOpen } from "store/views/view.actions";
import LogoutDialog from "components/Common/Dialog/LogoutDialog";
import { MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderRight: "2px solid #FFFFFF",

  background: "rgba(255, 255, 255, 0.4)",
  boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  borderRight: "2px solid #FFFFFF",
  boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
  // marginLeft: "-24px",

  background: "rgba(255, 255, 255, 0.4)",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  borderRight: "none",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles((theme) => ({
  root: {},
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
        background: "rgba(229, 79, 109, 0.1)",
      },
      "&>svg": {
        opacity: 1,

        fill: "rgba(56, 91, 215, 1)",
        color: "rgba(56, 91, 215, 1)",
      },
    },
  },
  listItemIcon: {
    background: "#F8F8F8",
    padding: "8px",
    borderRadius: "7px",
    marginRight: "8px",
    "&:hover": {
      background: "rgba(229, 79, 109, 0.1)",
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
}));

const mapState = ({ view }) => ({
  drawerOpen: view.ua_drawer_open,
});
export default function HelpDrawer({ children }) {
  const classes = useStyles();
  const { drawerOpen } = useSelector(mapState);
  const theme = useTheme();
  const [open, setOpen] = React.useState(drawerOpen);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDrawerState = () => {
    setOpen(!open);
    dispatch(setUserAccountDrawerOpen(!open));
  };

  const handleDialogOpen = () => setDialogOpen(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        open={open}
        style={{ position: "relative", overflow: "visible" }}
      >
        {/* <DrawerHeader></DrawerHeader> */}
        <Toolbar style={{ height: "80px" }} />
        <Divider />
        <IconButton
          style={{
            marginTop: "8px",
            padding: "0",
            border: "1px solid",
            width: "25px",
            height: "25px",
            position: "absolute",
            top: "90px",
            right: "0px",
            overflow: "visible",
          }}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          onClick={handleDrawerState}
        >
          {open ? <MdChevronLeft /> : <MdChevronRight />}
        </IconButton>

        <List style={{ marginTop: "32px" }}>
          {links?.map((item, index) => {
            const { url, title, icon: Icon, exact } = item;

            return (
              <MenuItem
                component={NavLink}
                activeClassName={classes.activeLink}
                className={classes.menuItem}
                to={url && url}
                exact={exact && exact}
                key={item.title}
                style={{
                  margin: "8px",
                }}
                // className={classes.link}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {Icon && <Icon className={classes.icon} />}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    // color: "black",
                    fontWeight: 600,
                    marginLeft: "8px",
                  }}
                />
              </MenuItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
      <LogoutDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
    </Box>
  );
}

const links = [
  {
    title: "User Guide",
    url: "/help/user-guide",
    icon: UserGuide,
    exact: true,
  },
  {
    title: "FAQ",
    url: "/help/faq",
    icon: Faq,
  },

  {
    title: "Contact Us",
    url: "/help/contact",
    icon: Contact,
  },
  {
    title: "Feedback",
    url: "/help/feedback",
    icon: Feedback,
  },
];
