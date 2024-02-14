// import classes from "pages/AppPages/UserAccountPages/EditProfile/StepOne.module.css";
import cameraIcon from "assets/svg/onboarding-pages/user-profile/camera.svg";
import {
  Grid,
  InputLabel,
  Paper,
  TextField,
  IconButton,
  Button,
  Typography,
  ClickAwayListener,
  useMediaQuery,
  Avatar,
  Skeleton,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import Picker from "emoji-picker-react";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import EPCoverComponent from "./EPCoverComponent/index";
import coverPlaceholder from "assets/svg/onboarding-pages/user-profile/cover.svg";
import PaperBase from "components/Common/PaperBase/PaperBase";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import { debounceFunction } from "sections/AppPages/OnboardingPages/UserProfile/utils/debounce";
import { fetchCountries } from "sections/AppPages/UserAccountPageSections/EditProfileSections/utils/fetchOnboarding";
import UPOTip1 from "sections/AppPages/OnboardingPages/UserProfile/components/Tips/UPOTip1";
import Popper from "@mui/material/Popper";
import { makeStyles, useTheme } from "@mui/styles";

// import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  root: {},
  customForm: {
    "& label": {
      fontWeight: " bold !important",
      marginTop: "10px",
      marginLeft: "25px",
      color: "black !important",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "8px",
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    "& .DraftEditor-editorContainer": {
      zIndex: "0",
    },
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
  errorText: {
    color: "#b00020",
    fontWeight: "400",
    fontSize: "0.75rem",
    lineHeight: "1.66",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: "0",
    marginLeft: "14px",
  },
}));
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
    borderRadius: "10px",
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
    borderRadius: "10px",
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

const EPBasicDetails = (props) => {
  const muiClasses = useStyles();
  const enqueueSnackbar = useEnquequeSnackbar();
  const { currentUser } = useSelector(mapState);
  const [countries, setCountries] = useState([]);
  const [headlineCur, setHeadlineCur] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElEmoji, setAnchorElEmoji] = useState(null);

  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCloseClick = () => {
    setAnchorEl(null);
  };

  const handleClickEmoji = (event) => {
    setAnchorElEmoji(anchorElEmoji ? null : event.currentTarget);
  };

  const handleCloseClickEmoji = () => {
    setAnchorElEmoji(null);
  };

  const open = Boolean(anchorEl);
  const openEmoji = Boolean(anchorElEmoji);

  const fetchCountriesHandler = () => {
    fetchCountries().then((response) => {
      const { result, error } = response;
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

  const {
    isSlugDisabled,
    language,
    changeHandler,
    changeEditorHandler,
    changeDropDownHandler,
    insertEmojiHeadline,
    formData,
    validateData,

    onProfileChange,
    onCoverChange,
    coverFileImg,
    profileImg,
    coverImages,
    setCoverImageHandler,
    slugDebounce,
    uploadCoverImage,
  } = props;

  let coverPic = null; //coverPlaceholder;
  if (formData.firstname !== "") {
    coverPic = formData.cover_url || coverPlaceholder;
  }

  let profilePic =
    "https://mhcd.org/wp-content/uploads/2017/12/placeholder-man.png";
  if (formData.image_url !== "") {
    profilePic = formData.image_url;
  }

  useEffect(() => {
    fetchCountriesHandler();
  }, []);

  const blocksFromHTML = convertFromHTML(formData.description);
  const description = ContentState.createFromBlockArray(blocksFromHTML);

  var myEditorState = EditorState.createWithContent(description);

  const [editorState, setEditorState] = useState(null);
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    const editorContent = editorState.getCurrentContent().hasText()
      ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
      : "";

    changeEditorHandler(editorContent);
  };

  useEffect(() => {
    if (!editorState && formData.description) {
      setEditorState(myEditorState);
    }
  }, [formData.description]);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={8}
        style={{ padding: "0", marginTop: "10px" }}
        className={muiClasses.customForm}
      >
        <Grid container spacing={2} mb={3}>
          <Grid
            item
            xs={12}
            md={12}
            align="left"
            // sx={{ marginLeft: { md: "25px", xs: "8px" } }}
          >
            <Typography
              variant="h6"
              fontWeight="800"
              style={{ fontSize: "26px" }}
            >
              Basic details
            </Typography>
            <Typography>
              Upload a <strong>new profile picture</strong> or{" "}
              <strong>cover image</strong> that brings out your personality. You
              can also try creating a <strong>new username</strong>, unique to
              you.
              {/* Let’s get started! Upload a <strong>profile picture</strong> &{" "}
              <strong>cover image</strong> that brings out your personality.
              Also, try creating a username that is unique to you, make it
              simple yet creative. */}
            </Typography>
          </Grid>
        </Grid>

        <PaperBase
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "none",
            paddingBottom: "0",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{ display: "flex", alignItems: "flex-start" }}
            mb={1}
          >
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Cover picture </InputLabel>
            </Grid>

            <Grid item xs={12} md={8} style={{ position: "relative" }}>
              <div className={muiClasses.coverPicture}>
                <div className={muiClasses.coverHover}></div>
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
                      className={muiClasses.cameraIcon}
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
                          <EPCoverComponent
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
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            style={{ display: "flex", alignItems: "center" }}
            mt={1}
          >
            <Grid item xs={12} md={4} align="left" style={{ paddingTop: "0" }}>
              <InputLabel>Profile picture </InputLabel>
            </Grid>

            <Grid item xs={12} md={8}>
              <div className={muiClasses.profilePicture}>
                <label htmlFor="file-input" className={muiClasses.profileOverlay}>
                  <div>
                    <img src={cameraIcon} alt="camera" />
                  </div>
                </label>

                {/* {!profileImg && <img src={profilePic} alt="profile" />} */}
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
                  style={{ display: "none" }}
                  type="file"
                  id="file-input"
                  name="profileImg"
                  accept="image/*"
                  onChange={(event) => {
                    onProfileChange(event.target.files[0]);
                  }}
                  accept="image/*"
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2} mb={3}>
            <Grid item xs={12} md={4} align="left">
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
                className={muiClasses.inputField}
                error={validateData.slug_id.isError}
                helperText={validateData.slug_id.message}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Name </InputLabel>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="firstname"
                value={formData.firstname}
                onChange={changeHandler}
                placeholder="Ray John"
                className={muiClasses.inputField}
                error={validateData.firstname.isError}
                helperText={
                  validateData.firstname.isError ? "Field is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={4} className="">
              <TextField
                // disabled={true}
                value={formData.lastname}
                name="lastname"
                placeholder="Abraham"
                className={muiClasses.inputField}
                onChange={changeHandler}
                error={validateData.lastname.isError}
                helperText={
                  validateData.lastname.isError ? "Field is required" : ""
                }
                // onBlur={() => {
                //   return true;
                // }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Email address </InputLabel>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                name="email"
                value={formData.email}
                placeholder="Rayjohn123@gmail.com"
                // helperText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla gravida tincidunt arcu, leo. Risus dui orci, convallis suscipit hendrerit. "
                className={muiClasses.inputField}
                disabled={true}
                onBlur={() => {
                  return true;
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4}>
              <InputLabel>Country </InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              {/* <TextField
                error={validateData.location.isError}
                helperText={
                  validateData.location.isError ? "Field is required" : " "
                }
                name="location"
                value={formData.location}
                placeholder="Banglore, India"
                className={muiClasses.inputField}
                required={true}
                onChange={changeHandler}
              /> */}
              <CreatableSelect
                name={"location"}
                options={countries}
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
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InputLabel>Job role </InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name="role"
                value={formData.role}
                onChange={changeHandler}
                placeholder="UX Designer at Amazon"
                className={muiClasses.inputField}
                error={validateData.role.isError}
                helperText={
                  validateData.role.isError ? "Field is required" : " "
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InputLabel>Profile headline </InputLabel>
            </Grid>
            <Grid item xs={12} md={8} mb={2}>
              <TextField
                variant="outlined"
                name="profile_headline_description"
				inputProps={{ maxLength: 60 }}
                value={formData.profile_headline_description}
                onChange={changeHandler}
                onBlur={(e) => setHeadlineCur(e.target.selectionStart)}
                placeholder="Profile description"
                className={muiClasses.inputField}
                error={validateData.profile_headline_description.isError}
                helperText={
                  validateData.profile_headline_description.isError
                    ? "Field is required"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickEmoji}
                        style={{ color: "black" }}
                        edge="end"
                      >
                        {" "}
                        {openEmoji ? "😃" : "🙂"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Popper
                open={openEmoji}
                anchorEl={anchorElEmoji}
                style={{ zIndex: "1" }}
              >
                <ClickAwayListener onClickAway={handleCloseClickEmoji}>
                  <div>
                    <Picker
                      disableSearchBar={true}
                      disableSkinTonePicker={true}
                      onEmojiClick={(e, emoji) =>
                        insertEmojiHeadline(e, emoji, headlineCur)
                      }
                      pickerStyle={{ width: "300px" }}
                    />
                  </div>
                </ClickAwayListener>
              </Popper>
            </Grid>
          </Grid>
        </PaperBase>

        <PaperBase
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "none",
            paddingBottom: "0",
          }}
        >
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
                  value={formData.languages}
                  onChange={changeDropDownHandler}
                  styles={
                    validateData.languages.isError
                      ? customStylesMultiSelectError
                      : customStylesMultiSelect
                  }
                />
                {validateData.languages.isError && (
                  <p className={muiClasses.errorText}>Field is required</p>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={4} align="left">
              <InputLabel>Bio</InputLabel>
            </Grid>
            <Grid item xs={12} md={8} mb={1}>
              {/* <TextField
                name="description"
                placeholder="Write something about yourself..."
                value={formData.description}
                multiline
                rows={4}
                onChange={changeHandler}
                inputProps={{ maxLength: 1500 }}
                style={{ width: "100%" }}
                error={validateData.description.isError}
                helperText={
                  validateData.description.isError ? "Field is required" : " "
                }
              /> */}
              <Editor
                value={description}
                placeholder="Add bio"
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                // toolbarCustomButtons={[<CustomOption />]}
                //  toolbarOnFocus

                editorStyle={{
                  height: "300px",
                  padding: "8px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  lineHeight: "24px",
                  fontSize: "18px",
                  borderRadius: "10px",
                  borderColor: validateData.description.isError
                    ? "#c74b62"
                    : "rgba(0,0,0,0.1)",
                  overflow: validateData.description.isError
                    ? "hidden"
                    : "auto",
                }}
                toolbarStyle={{
                  border: "none",
                  display: "none",
                }}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    // "fontSize",
                    // "fontFamily",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                    "emoji",
                  ],
                  blockType: {
                    inDropdown: true,
                    // component: (
                    //   <ul>
                    //     <li>Normal</li>
                    //   </ul>
                    // ),
                  },
                  textAlign: { inDropdown: true },
                  inline: {
                    inDropdown: true,
                    options: [
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "monospace",
                      "superscript",
                      "subscript",
                    ],
                    // monospace: { icon: code, className: undefined },
                  },
                  fontSize: {
                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
                  },
                  fontFamily: {
                    options: [
                      "Arial",
                      "Georgia",
                      "Impact",
                      "Tahoma",
                      "Times New Roman",
                      "Verdana",
                      "Inter",
                    ],
                  },
                  image: {
                    uploadEnabled: true,
                    alignmentEnabled: true,
                    uploadCallback: () => {},
                    previewImage: false,
                    inputAccept:
                      "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                    alt: { present: false, mandatory: false },
                    defaultSize: {
                      height: "auto",
                      width: "auto",
                    },
                  },
                }}
                {...props}
              />
              {validateData.description.isError && (
                <p style={{ color: "#B00020", fontSize: "0.75rem" }}>
                  Field is required{" "}
                </p>
              )}
            </Grid>
          </Grid>
        </PaperBase>
      </Grid>

      {/* <Grid
        item
        xs={4}
        md={4}
        style={{ paddingTop: "5px" }}
        sx={{
          display: {
            md: "block",
            xs: "none",
          },
        }}
      >
        <UPOTip1 />
      </Grid> */}
    </Grid>
  );
};

export default EPBasicDetails;
{
  /* <PaperBase
          style={{ border: "1px solid rgba(0, 0, 0, 0.1)", boxShadow: "none" }}
        >
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
                  <p className={muiClasses.errorText}>Field is required</p>
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
                <p className={muiClasses.errorText}>Field is required</p>
              )}
            </Grid>
          </Grid>
        </PaperBase> */
}
