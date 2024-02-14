import { Toolbar, Box } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import ManageSessionsView from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/ManageSessionsView/ManageSessionsView";
import MySessionsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/MySessionsSection";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    minHeight: "100vh",
  },
}));

const UserAccountPageLayout = ({ title, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  // console.log({ mobileView, matches });
  return (
    <Box
      style={
        {
          //  maxWidth: "100%"
        }
      }
    >
      <AppHeader position="fixed" />
      {/* this toolbar is added to add margin betweeen the header and content */}
      <Toolbar style={{ height: "80px" }} />
      {matches ? <div>{children}</div> : <MiniDrawer>{children}</MiniDrawer>}
    </Box>
  );
};

export default UserAccountPageLayout;
