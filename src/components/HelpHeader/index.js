import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import hivepathLogo from "assets/svg/help-page/help_logo.svg";
import { ReactComponent as HelpIcon } from "assets/svg/dropdown/help.svg";

import { ReactComponent as KnowledgeSessionIcon } from "assets/svg/dropdown/knowledge-session.svg";

import { ReactComponent as LogoutIcon } from "assets/svg/all/new-icons/dropdown-menu/logout-icon.svg";
import { ReactComponent as SettingsIcon } from "assets/svg/dropdown/settings-icon.svg";

import { ReactComponent as ReferIcon } from "assets/svg/dropdown/refer-icon.svg";
import LogoutDialog from "components/Common/Dialog/LogoutDialog";
import menuNavigationData from "../AppHeader/menuNavigationData";

import DropDownMenuItemLink from "../AppHeader/DropDownMenu/DropDownMenuItemLink";
import UserProfileMenuItem from "../AppHeader/DropDownMenu/ProfileMenuItem";
import DropDownMenuItemButton from "../AppHeader/DropDownMenu/DropDownMenuItemButton";

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: " 0px 0px 3px rgba(0, 0, 0, 0.25) !important",
    background: "#fff !important",
    height: "80px",
    paddingTop: "8px",
  },
  icon: {
    color: theme.palette.primary.main,
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
}));

const mapState = ({ user, notifications }) => ({
  currentUser: user?.currentUser,
  onboarding_data: user?.onboarding_data,
  notificationsState: notifications,
});

const HelpHeader = ({ isAdmin, height, position }) => {
  const { currentUser, onboarding_data } = useSelector(mapState);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const userName = `${currentUser?.firstname} ${currentUser?.lastname}`;
  const userImage =
    onboarding_data?.onboarding_data?.stage2?.image_url ||
    currentUser?.image_url;
  const open = Boolean(anchorEl);

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutDialogOpen = () => setLogoutDialogOpen(true);
  const handleLogoutDialogClose = () => setLogoutDialogOpen(false);

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
            <div>
              <Link to="/">
                <img
                  src={hivepathLogo}
                  alt="Logo"
                  style={{
                    width: "200px",
                    height: "46px",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </div>

            <div className={classes.grow} />
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              marginLeft: "auto",
            }}
          >
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar src={userImage} />
              </IconButton>
            </Tooltip>
          </div>
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
            // paddingTop: "16px",
            // paddingBottom: "16px",
            // width: "310px",
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
        <UserProfileMenuItem userName={userName} userImage={userImage} />

        {menuNavigationData.map((item) => {
          const { url, icon, title, hasDivider, description } = item;
          return (
            <DropDownMenuItemLink
              url={url}
              icon={icon}
              title={title}
              hasDivider={hasDivider}
              description={description}
            />
          );
        })}

        <DropDownMenuItemButton
          title={"Logout "}
          icon={LogoutIcon}
          onClick={handleLogoutDialogOpen}
        />
      </Menu>

      <LogoutDialog
        open={logoutDialogOpen}
        handleClose={handleLogoutDialogClose}
      />
    </div>
  );
};

export default HelpHeader;

const menuData = [
  {
    url: "/u/account/knowledge-session",
    icon: KnowledgeSessionIcon,
    title: "Your Sessions",
    description: "",
    // hasDivider: true,
  },
  {
    url: "/u/account/referral",
    icon: ReferIcon,
    title: "Refer ",
    // hasDivider: true,
  },

  {
    url: "/settings",
    icon: SettingsIcon,
    title: "Account Settings",
    // hasDivider: true,
  },

  {
    url: "",
    icon: HelpIcon,
    title: "Help",
  },
];
