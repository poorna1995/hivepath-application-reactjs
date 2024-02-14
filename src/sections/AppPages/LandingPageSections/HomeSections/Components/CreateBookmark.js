import "./style.css";
import cameraIcon from "assets/svg/onboarding-pages/user-profile/camera.svg";

import { ReactComponent as BackIcon } from "assets/svg/sessions/chevron-left.svg";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField, IconButton, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import {
  createBookmark,
  uploadBookmarkImage,
  updateBookmark,
} from "../../utils/homeService";
import { useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import EPUploadComponent from "sections/AppPages/UserAccountPageSections/EditProfileSections/StepOneSections/EPCoverComponent/EPUploadComponent";
import BookmarkImagesContainer from "./BookmarkImagesContainer";

import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      height: "45px",
      fontSize: "0.875rem",
    },
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
    // padding: theme.spacing(2),
    // width: "500px",
    // maxHeight: "600px",
    // padding: "30px",
    // paddingTop: "10px",
  },
  "& .MuiButtonBase-root": {
    textTransform: "none",
  },
}));

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
  showBookmark: landingPage.showBookmark,
});

export default function CreateBookmark({
  fetchBookmark,
  updateData,
  backHandler,
  // isLoading,
}) {
  const { currentUser, showBookmark } = useSelector(mapState);
  const { createBookmark: createBookmarkCheck } = showBookmark;

  const muiClasses = useStyles();
  const [bookmarkImage, setBookmarkImage] = useState(null);
  const [bookmarkImageUrl, setBookmarkImageUrl] = useState(
    updateData ? updateData.imageUrl : ""
  );
  const bookmarkName = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const enqueueSnackbar = useEnquequeSnackbar();

  const [value, setValue] = useState(updateData ? 1 : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const uploadImageHandler = async (isUpdate) => {
    setIsLoading(true);
    if (!bookmarkImage) {
      if (isUpdate) {
        // update here
        updateBookmarkHandler(bookmarkImageUrl);
        return;
      }
      // else we create
      createBookmarkHandler(bookmarkImageUrl);
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", bookmarkImage);
    uploadBookmarkImage(uploadData, currentUser.user_id)
      .then((res) => {
        const { file_path } = res.result;
        if (!res.error) {
          if (isUpdate) {
            // we update
            updateBookmarkHandler(file_path);
          } else {
            createBookmarkHandler(file_path);
          }
        } else {
          enqueueSnackbar(res.error, {
            variant: "error",
          });
          return false;
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res);
        enqueueSnackbar("There was a problem in uploading the image", {
          variant: "error",
        });
        return false;
      });
  };

  const setBookmarkImageUrlHandler = (image_url) => {
    setBookmarkImage(null);
    setBookmarkImageUrl(image_url);
  };

  const setBookmarkImageHandler = (data) => {
    setBookmarkImage(data);
    setBookmarkImageUrl(null);
  };

  const createBookmarkHandler = (image_url) => {
    const title = bookmarkName.current.value;
    if (!title) {
      enqueueSnackbar("Bookmark name cannot be empty", { variant: "error" });

      setIsLoading(false);
      return false;
    }
    const requestData = {
      user_id: currentUser.user_id,
      bookmark_name: title,
      image_url: image_url,
    };
    createBookmark(requestData).then((res) => {
      const { error, message } = res;
      if (!error) {
        backHandler();
        fetchBookmark();
        setIsLoading(false);
        enqueueSnackbar("Bookmark created Successfully", {
          variant: "success",
        });
        return;
      }

      setIsLoading(false);
      enqueueSnackbar(error, { variant: "error" });
      return;
    });
  };

  const updateBookmarkHandler = (image_url) => {
    const title = bookmarkName.current.value;
    if (!title) {
      enqueueSnackbar("Bookmark name cannot be empty", { variant: "error" });
      return false;
    }

    const requestData = {
      object_id: updateData.object_id,
      bookmark_name: title,
      image_url: image_url,
    };
    updateBookmark(requestData).then((res) => {
      const { error, message } = res;
      if (!error) {
        backHandler();
        fetchBookmark();
        setIsLoading(false);
        enqueueSnackbar("Bookmark updated Successfully", {
          variant: "success",
        });
        return;
      }

      setIsLoading(false);
      enqueueSnackbar(error, { variant: "error" });
      return;
    });
  };

  return (
    <Box sx={{ width: "100%" }} className={muiClasses.root}>
      <Box>
        {!createBookmarkCheck && (
          <Typography
            variant="subtitle2"
            fontWeight="600"
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => backHandler()}
              sx={{
                color: "black",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <BackIcon style={{ marginRight: "10px" }} />
              Back
            </Button>
          </Typography>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Group name"
            // multiline
            // rows={2}
            // maxRows={4}
            style={{ width: "85%", margin: "10px" }}
            inputRef={bookmarkName}
            defaultValue={updateData ? updateData.title : ""}
            inputProps={{ maxLength: 50 }}
          />
          <Typography
            variant="subtitle2"
            color="rgba(0, 0, 0, 0.5)"
            align="left"
            mb={2}
            style={{
              marginLeft: "35px",
              marginRight: "auto",
              fontSize: "0.875rem",
            }}
          >
            Please provide a suitable group name for your bookmark.
            <br />
            Maximum word limit: 50 characters.
          </Typography>
        </div>

        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Thumbnails" {...a11yProps(0)} />
          <Tab label="Custom" {...a11yProps(1)} />
        </StyledTabs>
      </Box>

      <TabPanel value={value} index={0}>
        <BookmarkImagesContainer
          selectedImage={bookmarkImageUrl}
          setImageUrl={setBookmarkImageUrlHandler}
        />
      </TabPanel>
      <TabPanel value={value} index={1} align="center">
        {/* {!bookmarkImage && !bookmarkImageUrl && ( */}
        {/* <div
          style={{
            display: bookmarkImage || bookmarkImageUrl ? "none" : "",
          }}
        > */}
        <EPUploadComponent
          size="1920 x 270"
          onChange={setBookmarkImageHandler}
        />
        {/* </div> */}
        {/* )} */}

        {/* {(bookmarkImage || bookmarkImageUrl) && (
          <label htmlFor="file-coverInput" style={{ position: "relative" }}>
            <div className="profileOverlay">
              <img src={cameraIcon} alt="camera" />
            </div>
            <img
              src={
                bookmarkImageUrl
                  ? bookmarkImageUrl
                  : URL.createObjectURL(bookmarkImage)
              }
              alt="profile"
              style={{ height: "168px", width: "168px", borderRadius: "10px" }}
            />
          </label>
        )} */}
      </TabPanel>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {isLoading && <CircularProgress />}

        {!isLoading && !updateData && (
          <PrimaryButton
            title="Create"
            onClick={() => uploadImageHandler(false)}
          />
        )}

        {!isLoading && updateData && (
          <PrimaryButton
            title="Update"
            onClick={() => uploadImageHandler(true)}
          />
        )}
      </div>
    </Box>
  );
}
