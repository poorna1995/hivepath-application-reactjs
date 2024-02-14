import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import PaperBase from "components/Common/PaperBase/PaperBase";
import BookmarkedProfilesList from "./BookmarkedProfilesList";
import BookmarkedCategoryList from "./BookmarkedCategoryList";
import BookmarkedSessionList from "./BookmarkedSessionList";
import LPSidebar from "sections/AppPages/LandingPageSections/Components/LPSidebar";

import {
  fetchBookmarkedSessions,
  fetchBookmarkedProfiles,
} from "../utils/homeService";

import { convertArrayToObject } from "../utils/arrayToObjects";
import { setBookmarks } from "store/landing-page/landingPageSlice";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const mapState = ({ user, landingPage }) => ({
  currentUser: user.currentUser,
});

export default function BookmarkSection() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [profilesLoading, setProfilesLoading] = useState(false);

  const { currentUser } = useSelector(mapState);
  const enqueueSnackbar = useEnquequeSnackbar();

  const [value, setValue] = useState(0);
  const [category, setCategory] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchBookmarkedSessionsHandler = () => {
    setIsLoading(true);
    fetchBookmarkedSessions({ user_id: currentUser.user_id })
      .then((res) => {
        setIsLoading(false);
        const { error, result } = res;
        if (!error) {
          const modifiedSessionData = convertArrayToObject(
            result,
            "bookmark_name"
          );
          dispatch(setBookmarks({ sessions: modifiedSessionData }));

          // do stuff here
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      })
      .catch((res) => {
        setIsLoading(false);
        enqueueSnackbar("An error occured", { variant: "error" });
        return;
      });
  };

  const fetchBookmarkedProfilessHandler = () => {
    setProfilesLoading(true);
    fetchBookmarkedProfiles({ user_id: currentUser.user_id })
      .then((res) => {
        setProfilesLoading(false);
        const { error, result } = res;
        console.log(result);
        if (!error) {
          const modifiedSessionData = convertArrayToObject(
            result,
            "bookmark_name"
          );
          dispatch(setBookmarks({ profiles: modifiedSessionData }));
          // do stuff here
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      })
      .catch((res) => {
        setProfilesLoading(false);
        enqueueSnackbar("An error occured", { variant: "error" });
        return;
      });
  };

  useEffect(() => {
    fetchBookmarkedSessionsHandler();
    fetchBookmarkedProfilessHandler();
  }, []);

  return (
    // <MiniDrawer>
    <Grid container>
      <Grid
        item
        xs={12}
        md={12}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ width: "100%", maxWidth: "1440px" }}>
          <PaperBase
            style={{
              minHeight: "90vh",
              //   position: "fixed",
              width: "100%",
              boxShadow: "none",
              paddingBottom: "0",
              padding: "0",
              border: "none",
            }}
          >
            {!category && category !== 0 && (
              <BookmarkedCategoryList
                setCategory={setCategory}
                isLoading={isLoading}
              />
            )}
            {(category || category === 0) && (
              <BookmarkedSessionList
                category={category}
                setCategory={setCategory}
              />
            )}
          </PaperBase>
        </Box>
      </Grid>
    </Grid>
    // </MiniDrawer>
  );
}
