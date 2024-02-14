import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
import leftArrow from "assets/svg/onboarding-pages/user-profile/leftArrow.svg";

import { Grid, Tabs, Tab, Box, IconButton } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import UPCoverCategories from "./UPCoverCategories";
import UPCoverImages from "./UPCoverImages";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import UPUploadComponent from "./UPUploadComponent";

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
          {/* <Typography> */}
          {children}
          {/* </Typography> */}
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

const UPCoverComponent = (props) => {
  const [value, setValue] = useState(0);
  const [showPicks, setShowPicks] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data,
    setCoverImageHandler,
    setShowCoverContainer,
    onCoverChange,
    uploadCoverImage,
    coverFileImg,
  } = props;

  let categoryImages = data.filter((item) => item.category === showPicks);
  if (categoryImages.length > 0) {
    categoryImages = categoryImages[0].files;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // this is for saving suggestions
  const saveCoverHandler = () => {
    setCoverImageHandler(selectedImage);
    setShowCoverContainer();
  };

  const cancelOperation = () => {
    setShowPicks(null);
    setSelectedImage(null);
    setShowCoverContainer();
    onCoverChange(null);
  };

  const uploadCoverHandler = () => {
    uploadCoverImage();
    setShowCoverContainer();
  };

  const showPicksHandler = (image) => {
    setShowPicks(image);
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        background: "white",
        width: "600px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "left",
          paddingRight: "20px",
          position: "relative",
        }}
      >
        {showPicks && (
          <span
            onClick={() => setShowPicks(false)}
            style={{
              position: "absolute",
              left: "10px",
              height: "100%",
              cursor: "pointer",
              paddingTop: "10px",
            }}
          >
            <IconButton style={{ width: "35px", marginTop: "-2px" }}>
              <img src={leftArrow} alt="back" />
            </IconButton>
            <span>Back</span>
          </span>
        )}
        {!showPicks && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label="Presets"
              {...a11yProps(1)}
              style={{ textTransform: "none" }}
            />
            <Tab
              label="Upload"
              {...a11yProps(0)}
              style={{ textTransform: "none" }}
            />
          </Tabs>
        )}
      </Box>
      <TabPanel value={value} index={1}>
        <UPUploadComponent
          size={"1920 x 270 px"}
          onChange={onCoverChange}
          setShowCoverContainer={setShowCoverContainer}
        />
        {coverFileImg && (
          <Grid container spacing={2} p={3} pb={0}>
            <Grid item xs={12} md={6} align="right">
              <OutlinedButton
                title="Cancel"
                style={{ height: "40px", width: "100px" }}
                onClick={() => cancelOperation()}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PrimaryButton
                title="Save"
                onClick={uploadCoverHandler}
                style={{ height: "40px", width: "100px" }}
              />
            </Grid>
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={0}>
        {!showPicks && (
          <UPCoverCategories data={data} onCategoryChange={showPicksHandler} />
        )}

        {showPicks && (
          <UPCoverImages
            data={categoryImages}
            category={showPicks}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setShowPicks={setShowPicks}
          />
        )}
        {selectedImage && showPicks && (
          <Grid container spacing={2} p={3} pb={0}>
            <Grid item xs={12} md={6} align="right">
              <OutlinedButton
                title="Cancel"
                style={{ height: "40px", width: "100px" }}
                onClick={() => setShowCoverContainer()}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PrimaryButton
                title="Save"
                onClick={saveCoverHandler}
                style={{ height: "40px", width: "100px" }}
              />
            </Grid>
          </Grid>
        )}
      </TabPanel>
    </Box>
  );
};

export default UPCoverComponent;
