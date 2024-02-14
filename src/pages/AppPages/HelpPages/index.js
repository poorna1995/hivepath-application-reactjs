import { Route, Switch } from "react-router-dom";
import { Toolbar, Paper, useMediaQuery, Typography } from "@mui/material";
import AppHeader from "components/AppHeader";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";

import HelpSections from "sections/AppPages/HelpSections";
// import UserGuidePage from "./UserGuidePage";
// import FaqPage from "./FaqPage";
// import ContactUsPage from "./ContactUsPage";
// import FeedbackPage from "./FeedbackPage";
import useTheme from "@mui/styles/useTheme";

const HelpPages = () => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  return (
    <div>
      <AppHeader position="fixed" />
      <Toolbar />
      {matches ? (
        <div style={{ paddingTop: "20px" }}>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              lineHeight: "28px",
              /* identical to box height, or 117% */

              // letterSpacing: -0.03em;

              color: "#333333",
              paddingLeft: "16px",
              paddingTop: "16px",
            }}
          >
            How can we help you?
          </Typography>
          <HelpSections />
        </div>
      ) : (
        <MiniDrawer>
          {/* <Container> */}
          <Paper style={{ minHeight: "85vh", padding: "20px 5px 0 20px" }}>
            <HelpSections />
          </Paper>

          {/* </Container> */}
        </MiniDrawer>
      )}
    </div>
  );
};

export default HelpPages;
