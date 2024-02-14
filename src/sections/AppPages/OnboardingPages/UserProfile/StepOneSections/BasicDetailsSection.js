// import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
import cameraIcon from "assets/svg/onboarding-pages/user-profile/camera.svg";
import {
  Grid,
  InputLabel,
  Paper,
  TextField,
  IconButton,
  Typography,
  Box,
  ClickAwayListener,
  Avatar,
  Skeleton,
} from "@mui/material";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";

import { useSelector } from "react-redux";
import RoundCornersButton from "components/Common/Buttons/RoundCornersButton";
import UPCoverComponent from "./UPCoverComponent/index";
import { useState } from "react";
import coverPlaceholder from "assets/svg/onboarding-pages/user-profile/cover.svg";
import PaperBase from "components/Common/PaperBase/PaperBase";

import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { autoSuggest } from "sections/AppPages/OnboardingPages/UserProfile/utils/fetchOnboarding";
import { debounceFunction } from "sections/AppPages/OnboardingPages/UserProfile/utils/debounce";
import UPOTip1 from "../components/Tips/UPOTip1";

import Popper from "@mui/material/Popper";
import CustomFab from "components/Common/Buttons/CustomFab";
import ShowTipsDrawer from "components/Common/Drawers/ShowTipsDrawer";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  customForm: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    "& label": {
      fontWeight: "bold !important",
      marginTop: "10px",
      marginLeft: "25px",
      color: "black !important",
    },
  },
  "& textarea": {
    width: "100%",
    height: "150px",
    padding: "5px 10px",
    fontFamily: "inherit",
  },

  paperComponent: {
    marginTop: "30px",
    padding: "50px 50px 50px 25px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.4)",
    border: "2px solid #ffffff",
    boxSizing: "border-box",
    boxShadow: "0px 0px 50px 5px rgba(72, 74, 158, 0.06)",
    borderRadius: "20px",
    "& form": { width: "100%" },
    "& label": {
      fontWeight: "bold !important",
      marginTop: "10px",
      marginLeft: "25px",
      color: "black !important",
    },
    "& textarea": {
      width: "100%",
      height: "150px",
      padding: "5px 10px",
      fontFamily: "inherit",
    },
  },
  coverPicture: {
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    "& img": { borderRadius: "5px", height: "100%", width: "100%" },
  },

  coverHover: {
    visibility: "hidden",
    height: "100%",
    width: "100%",
    zIndex: "15",
    position: "absolute",
    "&:hover": { visibility: "visible" },
  },
  cameraIcon: {
    height: "50px",
    position: "absolute",
    width: "50px",
    left: "0",
    bottom: "0",
    marginLeft: "20px",
  },
  profilePicture: {
    height: "100px",
    width: "100px",
    position: "relative",
    "& label": { margin: "0" },
    "& input": { display: "none" },
  },
  profileOverlay: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    opacity: "0",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      opacity: "1",
      cursor: "pointer",
      backgroundColor: "#a4939366",
    },
    "& img": { height: "26px", width: "26px" },
  },
  inputField: {
    width: "100%",
    "& input": { height: "12px !important", backgroundColor: "white" },
  },
}));

// import TextField from '@mui/material/TextField';
const customStylesMultiSelect = {
  multiValueRemove: (styles) => ({
    ...styles,
    ":hover": {
      backgroundColor: "#484A9E",
      color: "white",
    },
  }),
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    ":hover": {
      borderColor: "black",
    },
  }),
};

const customStylesMultiSelectError = {
  multiValueRemove: (styles) => ({
    ...styles,
    ":hover": {
      backgroundColor: "#484A9E",
      color: "white",
    },
  }),
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    borderColor: "#b00020",
    ":hover": {
      borderColor: "#b00020",
    },
  }),
};

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const BasicDetails = (props) => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const enqueueSnackbar = useEnquequeSnackbar();

  const { openDrawer, handleDrawerClose } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCloseClick = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const {
    isSlugDisabled,
    language,
    lookingFor,
    interests,
    changeHandler,
    changeDropDownHandler,
    formData,
    validateData,
    setUserName,
    onProfileChange,
    onCoverChange,
    coverFileImg,
    profileImg,
    coverImages,
    setCoverImageHandler,
    showCoverContainer,
    setShowCoverContainer,
    slugDebounce,
    uploadCoverImage,
  } = props;

  const [countries, setCountries] = useState([]);

  const countriesDebounce = (e) => {
    // // Debounces makeAPICall method
    if (e !== "") {
      debounceFunction(() => {
        return fetchCountries(e);
      }, 400);
    }
  };

  const fetchCountries = async (text) => {
    const payload = { type: "country", text: text };
    const res = autoSuggest(payload).then((response) => {
      const { result, error, status } = response;

      if (!error) {
        const inputData = result.map((item) => {
          return { label: item, value: item };
        });
        setCountries(inputData);
        return inputData;
      } else {
        enqueueSnackbar(error, { variant: "error" });
        return [];
      }
    });
  };

  const returnCountries = async () => {
    return countries;
  };

  let coverPic = null; //coverPlaceholder;
  if (formData.first_name !== "") {
    coverPic = formData.cover_url || coverPlaceholder;
  }

  let profilePic =
    "https://mhcd.org/wp-content/uploads/2017/12/placeholder-man.png";
  if (formData.image_url !== "") {
    profilePic = formData.image_url;
  }

  return (
    <Grid container spacing={2} className={` ${classes.customForm}`}>
      <Grid item xs={12} md={12} align="left" mb={2}>
        <Typography variant="h6" fontWeight="800" style={{ fontSize: "26px" }}>
          Basic details
        </Typography>
        <Typography variant="subtitle">
          Here you go! Upload a <strong>profile picture</strong> &{" "}
          <strong>cover image</strong> that brings out your personality. Also,
          try creating a username that is unique to you, make it simple yet
          creative.
          {/* Let’s get started! Upload a <strong>profile picture</strong> &{" "}
          <strong>cover image</strong> that brings out your personality. Also,
          try creating a username that is unique to you, make it simple yet
          creative. */}
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        {/* <form onSubmit={saveForm} method="POST"> */}
        <PaperBase
          className={classes.paperComponent}
          style={{
            boxShadow: "none",
            // paddingTop: "0",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              align="left"
              sx={{
                marginLeft: {
                  md: "auto",
                  xs: "-16px",
                },
              }}
            >
              <InputLabel>Cover picture </InputLabel>
            </Grid>

            <Grid item xs={12} md={8} mb={5} style={{ position: "relative" }}>
              <div className={classes.coverPicture}>
                <div className={classes.coverHover}></div>
                {!coverPic && (
                  <Skeleton
                    variant="rectangular"
                    height="100%"
                    style={{ borderRadius: "10px" }}
                  />
                )}
                {coverPic && (
                  <>
                    <img
                      src={coverPic}
                      alr="coverPic"
                      style={{ objectFit: "cover" }}
                    />

                    <IconButton
                      className={classes.cameraIcon}
                      onClick={handleClick}
                      //   onClick={() => setShowCoverContainer((state) => !state)}
                    >
                      <img src={cameraIcon} />
                    </IconButton>

                    <Popper
                      open={open}
                      anchorEl={anchorEl}
                      placement="bottom-start"
                      style={{ zIndex: "2" }}
                    >
                      <ClickAwayListener onClickAway={handleCloseClick}>
                        <div>
                          <UPCoverComponent
                            data={coverImages}
                            setCoverImageHandler={setCoverImageHandler}
                            onCoverChange={onCoverChange}
                            setShowCoverContainer={handleCloseClick}
                            uploadCoverImage={uploadCoverImage}
                            coverFileImg={coverFileImg}
                          />
                        </div>
                      </ClickAwayListener>
                    </Popper>
                  </>
                )}

                {/* {showCoverContainer && (
                  <UPCoverComponent
                    data={coverImages}
                    setCoverImageHandler={setCoverImageHandler}
                    onCoverChange={onCoverChange}
                    setShowCoverContainer={setShowCoverContainer}
                    uploadCoverImage={uploadCoverImage}
                    coverFileImg={coverFileImg}
                  />
                )} */}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              align="left"
              sx={{
                marginLeft: {
                  md: "auto",
                  xs: "-16px",
                },
              }}
            >
              <InputLabel>Profile picture </InputLabel>
            </Grid>

            <Grid item xs={12} md={8} mb={5}>
              <div className={classes.profilePicture}>
                <label htmlFor="file-input">
                  <div className={classes.profileOverlay}>
                    <img src={cameraIcon} alt="camera" />
                  </div>
                </label>

                {!profileImg && (
                  <Avatar
                    src={profilePic}
                    alt="profile"
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
                {profileImg && (
                  <Avatar
                    src={URL.createObjectURL(profileImg)}
                    alt="profile"
                    style={{ width: "100%", height: "100%" }}
                  />
                )}

                <input
                  type="file"
                  id="file-input"
                  name="profileImg"
                  onChange={(event) => {
                    onProfileChange(event.target.files[0]);
                  }}
                  accept="image/*"
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={3}>
            <Grid
              item
              xs={12}
              md={4}
              align="left"
              sx={{
                marginLeft: {
                  md: "auto",
                  xs: "-16px",
                },
              }}
            >
              <InputLabel>Username </InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                disabled={isSlugDisabled}
                name={"slug_id"}
                value={formData.slug_id}
                placeholder="Username"
                onChange={changeHandler}
                onKeyUp={slugDebounce}
                style={{ width: "100%" }}
                className={classes.inputField}
                error={validateData.slug_id.isError}
                helperText={validateData.slug_id.message}
              />

              {/* <TextField
                disabled={isSlugDisabled}
                name={"slug_id"}
                value={formData.slug_id}
                placeholder="Username"
                helperText={helperText}
                className={classes.inputField}
                onChange={changeHandler}
                onKeyUp={slugDebounce}
                required={true}
              /> */}
            </Grid>
          </Grid>
        </PaperBase>

        {/* <PaperBase> */}

        {/* <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Name </InputLabel>
            </Grid>

            <Grid item xs={12} md={4} className="">
              <TextField
                disabled={true}
                name="firstname"
                placeholder="Ray John"
                value={formData.first_name}
                className={classes.inputField}
                onBlur={() => {
                  return true;
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} className="">
              <TextField
                disabled={true}
                value={formData.last_name}
                name="lastname"
                placeholder="Abraham"
                className={classes.inputField}
                onBlur={() => {
                  return true;
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Email Address </InputLabel>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                name="email"
                value={formData.email}
                placeholder="Rayjohn123@gmail.com"
                // helperText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla gravida tincidunt arcu, leo. Risus dui orci, convallis suscipit hendrerit. "
                className={classes.inputField}
                disabled={true}
                onBlur={() => {
                  return true;
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4}>
              <InputLabel>
                Country{" "}
                <span
                  style={{
                    fontSize: "10px",
                    display: "block",
                    fontWeight: "100",
                  }}
                >
                  Where are you based?*
                </span>
              </InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <AsyncCreatableSelect
                name={"location"}
                loadOptions={returnCountries}
                styles={
                  validateData.location.isError
                    ? customStylesMultiSelectError
                    : customStylesMultiSelect
                }
                value={{
                  value: formData.location,
                  label: formData.location,
                }}
                onChange={changeDropDownHandler}
                onInputChange={countriesDebounce}
                isValidNewOption={() => false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4}>
              <InputLabel>Job Title </InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name="role"
                value={formData.role}
                onChange={changeHandler}
                placeholder="UX Designer at Amazon"
                className={classes.inputField}
                error={validateData.role.isError}
                helperText={
                  validateData.role.isError ? "Field is required" : " "
                }
              />
            </Grid>
          </Grid> */}
        {/* </PaperBase> */}

        {/* <PaperBase>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Expertise</InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid item xs={12} md={12}>
                <CreatableSelect
                  name={"expertise"}
                  isMulti
                  options={interests}
                  styles={
                    validateData.expertise.isError
                      ? customStylesMultiSelectError
                      : customStylesMultiSelect
                  }
                  value={formData.expertise}
                  onChange={changeDropDownHandler}
                />
                {validateData.expertise.isError && (
                  <p className={classes.errorText}>Field is required</p>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Looking for</InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <CreatableSelect
                name="looking_for"
                isMulti
                options={lookingFor}
                styles={customStylesMultiSelect}
                value={formData.looking_for}
                onChange={changeDropDownHandler}
                styles={
                  validateData.looking_for.isError
                    ? customStylesMultiSelectError
                    : customStylesMultiSelect
                }
              />
              {validateData.looking_for.isError && (
                <p className={classes.errorText}>Field is required</p>
              )}
            </Grid>
          </Grid>
        </PaperBase>

        <PaperBase>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Languages</InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid item xs={12} md={12}>
                <CreatableSelect
                  name="languages"
                  isMulti
                  options={language}
                  styles={customStylesMultiSelect}
                  value={formData.languages}
                  onChange={changeDropDownHandler}
                  styles={
                    validateData.languages.isError
                      ? customStylesMultiSelectError
                      : customStylesMultiSelect
                  }
                />
                {validateData.languages.isError && (
                  <p className={classes.errorText}>Field is required</p>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>About you</InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name="description"
                placeholder="Write something about yourself..."
                value={formData.description}
                multiline
                rows={4}
                onChange={changeHandler}
                inputProps={{ maxLength: 250 }}
                style={{ width: "100%" }}
                error={validateData.description.isError}
                helperText={
                  validateData.description.isError ? "Field is required" : " "
                }
              />
            </Grid>
          </Grid>
        </PaperBase> */}

        {/* </form> */}
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        mt={1}
        sx={{
          display: {
            md: "block",
            xs: "none",
          },
        }}
      >
        <UPOTip1 />
      </Grid>
      <ShowTipsDrawer
        open={openDrawer}
        handleClose={handleDrawerClose}
        component={<UPOTip1 noBoxShadow />}
      />
    </Grid>
  );
};

export default BasicDetails;
