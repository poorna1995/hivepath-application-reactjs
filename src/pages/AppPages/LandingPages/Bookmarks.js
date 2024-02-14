import React from "react";
import PropTypes from "prop-types";
import LandingPageLayout from "Layouts/AppLayouts/LandingPageLayout";
import BookmarkSections from "sections/AppPages/LandingPageSections/BookmarkSections";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import AppHeader from "components/AppHeader";
import { Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

const Bookmarks = (props) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  return (
    <>
      <AppHeader position={"fixed"} />
      <Toolbar />
      {matches ? (
        <div>
          <BookmarkSections />
        </div>
      ) : (
        <MiniDrawer>
          <BookmarkSections />
        </MiniDrawer>
      )}
    </>
  );
};

Bookmarks.propTypes = {};

export default Bookmarks;
