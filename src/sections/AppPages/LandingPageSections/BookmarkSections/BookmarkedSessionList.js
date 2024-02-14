import "index.css";

import img1 from "assets/images/placeholder-images/img1.png";
import backIcon from "assets/svg/sessions/chevron-left.svg";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, Paper, IconButton, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import SessionCategoryTabs from "./Components/SessionCategoryTabs";
import ProfileCategoryTabs from "./Components/ProfileCategoryTabs";

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

const mapState = ({ landingPage }) => ({
  bookmarkedSessionData: landingPage.bookmarks.sessions || {},
  bookmarkedProfileData: landingPage.bookmarks.profiles || {},
});

const BookmarkedSessionList = ({ setCategory, category, data, ...props }) => {
  const { bookmarkedSessionData, bookmarkedProfileData } =
    useSelector(mapState);
  let activeTab = 0;
  if (
    category in bookmarkedProfileData &&
    !(category in bookmarkedSessionData)
  ) {
    activeTab = 1;
  }
  const [value, setValue] = useState(activeTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} pt={2}>
      <Grid
        item
        xs={12}
        md={12}
        style={{
          position: "-webkit-sticky",
          position: "sticky",
          top: 70,
          zIndex: 5,
          background: "white",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Typography
            variant="h6"
            fontWeight="600"
            onClick={() => setCategory(null)}
            style={{ cursor: "pointer" }}
          >
            <IconButton>
              <img src={backIcon} />
            </IconButton>
            Bookmarks
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{ width: "100%" }}
          >
            <Tab
              key={`scatb10`}
              label={<strong>Knowledge Session</strong>}
              {...a11yProps(0)}
              style={{ textTransform: "none" }}
            />
            <Tab
              key={`scatb11`}
              label={<strong>Profiles</strong>}
              {...a11yProps(1)}
              style={{ textTransform: "none" }}
            />
          </Tabs>
        </Box>
      </Grid>

      <Grid item xs={12} md={12} style={{ padding: "0" }}>
        <TabPanel value={value} index={0} key={`scatempty0`}>
          <SessionCategoryTabs category={category} />
        </TabPanel>
        <TabPanel value={value} index={1} key={`scatempty1`}>
          <ProfileCategoryTabs category={category} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default BookmarkedSessionList;
