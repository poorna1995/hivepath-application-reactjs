import React from "react";
import {
  //   MuiDrawer,

  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import {
  MdChevronRight,
  MdChevronLeft,
  MdCalendarToday,
  MdTimer,
} from "react-icons/md";
import hivepathLogo from "assets/svg/logo.svg";
import hivepathOnlyLogo from "assets/images/hivepath-logo.png";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as OfferingsIcon } from "assets/svg/admin-icons/Offering.svg";

import { ReactComponent as SlotPlannerIcon } from "assets/svg/admin-icons/SlotPlanner.svg";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
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

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const AdminDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { currentUser } = useSelector(mapState);

  const userImage = currentUser?.image_url;
  const userName = `${currentUser.firstname} ${currentUser.lastname}`;

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Drawer variant="permanent" open={open} sx={{ overflow: "visibe" }}>
        <DrawerHeader>
          <Link to="/">
            {open ? (
              <img
                src={hivepathLogo}
                alt="Logo"
                style={{
                  width: "200px",
                  height: "46px",
                  objectFit: "contain",
                  paddingTop: "8px",
                }}
              />
            ) : (
              <img
                src={hivepathOnlyLogo}
                alt="Logo"
                style={{
                  width: "50px",
                  height: "46px",
                  objectFit: "contain",
                  paddingTop: "8px",
                }}
              />
            )}
          </Link>
        </DrawerHeader>
        {/* <Divider /> */}
        <List sx={{ overflow: "visibe" }}>
          <ListItem
            component={Link}
            to="/admin"
            style={{ position: "relative" }}
          >
            <ListItemIcon>
              <Avatar src={userImage} />
            </ListItemIcon>
            <ListItemText primary={userName} secondary="Admin" />
          </ListItem>
          <IconButton
            onClick={handleDrawer}
            style={{
              position: "absolute",
              right: "-5px",
              top: "-10px",
              borderRadius: "10px",
              border: "1px solid",
              padding: "4px",
            }}
          >
            {!open ? <MdChevronRight /> : <MdChevronLeft />}
          </IconButton>

          {["Offerings", "Slot Planner"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <OfferingsIcon /> : <SlotPlannerIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                style={{ fontSize: "16px", fontWeight: "600" }}
              />
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
    </div>
  );
};

export default AdminDrawer;
