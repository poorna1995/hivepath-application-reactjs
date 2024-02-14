import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
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
  MdExpandLess,
  MdExpandMore,
  MdInbox,
  MdMail,
  MdMenu,
} from "react-icons/md";
import AppHeader from "components/AppHeader";
import { Link, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  setUserAccountDrawerOpen,
  setKSonboardingDrawerItemIndex,
  setKSOnboardingCurrentPath,
} from "store/views/view.actions";
import LogoutDialog from "components/Common/Dialog/LogoutDialog";
import {
  Tooltip,
  MenuItem,
  Collapse,
  ListItemButton,
  Accordion,
  Button,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import KSOnboardingButtonRow from "./KSOnboardingButtonRow";
import { useState } from "react";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
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
      //   "& > div:first-child": {
      //     background: "rgba(229, 79, 109, 0.1)",
      //   },
      //   "&>svg": {
      //     opacity: 1,

      //     fill: "rgba(56, 91, 215, 1)",
      //     color: "rgba(56, 91, 215, 1)",
      //   },
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
    wordBreak: "break-word",
  },
  icon: {
    // marginLeft: "8px",
    width: "24px",
    height: "24px",
  },
  activeIcon: {
    fill: "#484a9e",
  },
  borderBottom: {
    marginTop: "-8px",
    marginLeft: "-24px",
    marginRight: "-24px",
    marginBottom: "8px",
    position: "sticky",
    top: "80px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  contentContainer: {
    background: "white",
    minHeight: "91vh",
    padding: "24px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      // display: "none",
      padding: "8px",
      paddingTop: "24px",
      // minHeight: "100vh",
    },
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 3,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#EDEDED",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: "linear-gradient(94.66deg, #667EEA 2.48%, #FA709A 97.47%)",
    display: "inline-block",
  },
}));

const mapState = ({ view }) => ({
  id: view.ksOnboardingDrawerItemIndex,
  currentPath: view.knowledgeSessionCurrentPath,
});

const OfferingOnboardingDrawer = ({
  children,
  buttonRow,
  drawerTitle,
  links = [],
  goBackToPage,
  handleClickBackButton,
  disabledButton,
}) => {
  const classes = useStyles();
  const { id, currentPath } = useSelector(mapState);
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = React.useState(id);
  const [open, setOpen] = useState(false);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(() => !open);
    dispatch(setKSonboardingDrawerItemIndex(index));
  };
  const expand = open && selectedIndex === id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const pathname = window.location.pathname;
    // setCurrentURL(pathname);
    dispatch(setKSOnboardingCurrentPath(pathname));
    // setSelectedIndex()
    // console.log({ pathname });
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }} className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "2px solid #FFFFFF",
            boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
            bgcolor: "rgba(247, 247, 247, 1)",
          },
        }}
        variant="permanent"
        open
      >
        <Toolbar style={{ height: "80px" }} />

        {goBackToPage && (
          <Button
            component={Link}
            to={goBackToPage}
            onClick={handleClickBackButton}
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              lineHeight: "18px",

              color: "#222222",
              marginTop: "16px",
              textTransform: "capitalize",
              textAlign: "left",
              width: "100px",
              marginLeft: "8px",
            }}
            startIcon={<FaChevronLeft />}
          >
            Go Back
          </Button>
        )}
        {handleClickBackButton && (
          <Button
            onClick={handleClickBackButton}
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              lineHeight: "18px",

              color: "#222222",
              marginTop: "16px",
              textTransform: "capitalize",
              textAlign: "left",
              width: "100px",
              marginLeft: "8px",
            }}
            startIcon={<FaChevronLeft />}
          >
            Go Back
          </Button>
        )}

        <Typography
          style={{
            margin: "16px",
            fontWeight: "bold",
            fontSize: "24px",
            lineHeight: "31px",
            color: "#222222",
          }}
        >
          {drawerTitle && drawerTitle}
        </Typography>

        <List>
          {links?.map((item, index) => {
            const { exact, subMenu, url, id } = item;

            return (
              <>
                <MenuItem
                  component={url && NavLink}
                  to={url && url}
                  activeClassName={classes.activeLink}
                  key={index}
                  onClick={(event) => handleListItemClick(event, index)}
                  className={classes.link}
                  sx={{
                    // wordBreak: "break-word",
                  }}
                >
                  <ListItemIcon>
                    {currentPath && currentPath.includes(url) ? (
                      <MdExpandLess />
                    ) : (
                      <MdExpandMore />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      // color: "black",
                      fontWeight: 600,
                    }}
                  />
                </MenuItem>
                <Collapse
                  in={currentPath && currentPath.includes(url)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {subMenu &&
                      subMenu.map((menu) => {
                        const { title, url, disabled } = menu;
                        return (
                          <MenuItem
                            component={NavLink}
                            // component={Link}
                            activeClassName={classes.activeLink}
                            className={classes.menuItem}
                            to={url && `${url}`}
                            exact={exact && exact}
                            key={menu.title}
                            disabled={disabled && disabled}
                            // className={classes.link}
                          >
                            <ListItemText
                              primary={title}
                              primaryTypographyProps={{
                                // color: "black",
                                fontWeight: 600,
                              }}
                              style={{
                                paddingLeft: "16px",
                              }}
                            />
                          </MenuItem>
                        );
                      })}
                  </List>
                </Collapse>
              </>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
        className={classes.contentContainer}
      >
        <BorderLinearProgress
          className={classes.borderBottom}
          variant="determinate"
          value={60}
        />
        {children}
      </Box>
    </Box>
  );
};

export default OfferingOnboardingDrawer;

// const links = [
//   {
//     title: "Introduction",
//     url: "/onboarding/ks/intro",
//     id: 0,
//     subMenu: [
//       {
//         title: "About Offering",
//         url: "/onboarding/ks/intro/about",
//       },
//       {
//         title: "Sample Offerings",
//         url: "/onboarding/ks/intro/samples",
//       },
//       {
//         title: "Create a Category",
//         url: "/onboarding/ks/intro/category",
//       },
//     ],
//   },
//   {
//     title: "Offering Page",
//     url: "/onboarding/ks/create",
//     id: 1,
//     subMenu: [
//       {
//         title: "Types of Offering",
//         url: "/onboarding/ks/create/add-category",
//       },
//       {
//         title: "About Offering",
//         url: "/onboarding/ks/create/add-offering",
//       },
//       {
//         title: "Related Topics",
//         url: "/onboarding/ks/create/related-topics",
//       },
//       {
//         title: "Prerequisites",
//         url: "/onboarding/ks/create/prerequisites",
//       },
//       {
//         title: "Photos",
//         url: "/onboarding/ks/create/add-images",
//       },
//       {
//         title: "Preview",
//         url: "/onboarding/ks/create/preview-sessions",
//       },
//     ],
//   },
//   {
//     title: "Availability",
//     url: "/onboarding/ks/availability/",
//     id: 2,
//     subMenu: [
//       {
//         title: "Add Availability",
//         url: "/onboarding/ks/availability/add-availability",
//       },
//     ],
//   },
//   {
//     title: "Settings",
//     url: "/onboarding/ks/preferences",
//     id: 3,
//     subMenu: [
//       {
//         title: "Preferences",
//         url: "/onboarding/ks/preferences/add-preferences",
//       },
//     ],
//   },
// ];
