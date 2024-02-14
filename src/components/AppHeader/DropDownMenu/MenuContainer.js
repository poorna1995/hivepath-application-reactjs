import React from "react";
import { ReactComponent as HelpIcon } from "assets/svg/dropdown/help.svg";

import { ReactComponent as KnowledgeSessionIcon } from "assets/svg/dropdown/knowledge-session.svg";

import { ReactComponent as LogoutIcon } from "assets/svg/dropdown/logout.svg";
import { ReactComponent as ProfileIcon } from "assets/svg/dropdown/profile.svg";

import { ReactComponent as SettingsIcon } from "assets/svg/dropdown/settings.svg";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import DropDownMenuItemButton from "./DropDownMenuItemButton";
import DropDownMenuItemLink from "./DropDownMenuItemLink";
import { Link } from "react-router-dom";

const MenuContainer = ({
  userName,
  userImage,
  anchorEl,
  open,
  handleClose,
  handleLogout,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        style: {
          paddingTop: "16px",
          paddingBottom: "16px",
          width: "290px",
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
      <MenuItem component={Link} to="/user">
        <ListItemIcon style={{ marginRight: "8px" }}>
          <Avatar src={userImage} style={{ width: "46px", height: "46px" }} />
        </ListItemIcon>
        <ListItemText
          primary={userName}
          primaryTypographyProps={{
            style: {
              fontSize: "18px",
              fontWeight: 800,
              lineHeight: "22px",
              letterSpacing: "-0.03em",
              backgroundColor: "rgba(24, 61, 255, 1)",
              backgroundImage:
                "linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",

              WebkitTextFillColor: "transparent",
              backgroundRepeat: "repeat",
              MozBackgroundClip: "text",
              MozTextFillColor: "transparent",
            },
          }}
          secondary="View public Profile"
          secondaryTypographyProps={{
            style: {
              color: "black",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "17px",
              letterSpacing: "-0.02em",
            },
          }}
        />
      </MenuItem>

      {menuData.map((item) => {
        const { url, icon, title, hasDivider } = item;
        return (
          <DropDownMenuItemLink
            url={url}
            icon={icon}
            title={title}
            hasDivider={hasDivider}
          />
        );
      })}
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default MenuContainer;

const menuData = [
  {
    url: "/user",
    icon: ProfileIcon,
    title: "Profile",
  },
  {
    url: "/settings",
    icon: SettingsIcon,
    title: "Account Settings",
    hasDivider: true,
  },
  {
    url: "/onboarding/knowledge-session/step-one",
    icon: KnowledgeSessionIcon,
    title: "Knowledge Sessions",
    hasDivider: true,
  },
  {
    url: "",
    icon: HelpIcon,
    title: "Help",
  },
];
