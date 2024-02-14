import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import addThumbnailImage from "assets/svg/all/new-icons/ks-onboarding/create-offering/add-thumbnail.svg";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import { useState } from "react";
import SelectThumbnailsFromPresets from "./SelectThumbnailsFromPresets";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import authFetch from "utils/authFetch";
import {
  deleteDraftSessionThumbnails,
  fetchDraftKnowledgeSessionStart,
  removeDraftSessionThumbnails,
  setDraftKnowledgeSession,
  setDraftSessionThumbnail,
  setSelectedThumbnail,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import HivepathImage from "components/Common/HivepathImage";
import HivepathImageEditor from "components/Common/HivepathImageEditor";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import convertCanvasToImage from "utils/imageOptimizeUtils/convertCanvasToImage";
import { ReactComponent as DeleteIcon } from "assets/svg/onboarding-pages/knowledge-session/delete-icon.svg";
import { makeStyles, useTheme } from "@mui/styles";
import SuggestionDrawer from "components/Common/Drawers/SuggestionDrawer";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import { setSectionLoading } from "store/loaders/loadersSlice";
const useStyles = makeStyles((theme) => ({
  root: {},
  contentContainer: {
    // paddingTop: "64px",

    [theme.breakpoints.down("sm")]: {
      padding: "8px",
      paddingTop: "16px",
    },
  },
  imageStyle: {
    borderRadius: "16px",
    maxWidth: "100%",
    width: "100%",
    height: "240px",
    maxHeight: "240px",
    // marginLeft:  "16px",
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px !important",
    },
  },
}));

const mapState = ({ user, view, sessions }) => ({
  currentUser: user.currentUser,
  currentPath: view.knowledgeSessionCurrentPath,
  draftSession: sessions.draftKnowledgeSession,
  sessionThumbnails: sessions.draftSessionThumbnails,

  selectedThumbnail: sessions.selectedThumbnail,
  sessions: sessions,
});
const AddThumbnailsSection = ({ nextURL, prevURL }) => {
  const classes = useStyles();
  const {
    currentUser,
    currentPath,
    draftSession,
    sessionThumbnails,
    selectedThumbnail,
    sessions,
  } = useSelector(mapState);
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const USER_ID = currentUser.user_id;
  const [showEditor, setShowEditor] = useState(false);
  const getSrc = selectedThumbnail;
  const inputRef = React.useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const thumbnailCategory = draftSession.category;

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = React.useState("");
  const [showSelectedFile, setShowSelectedFile] = useState(false);
  useEffect(() => {
    if (getSrc) setShowEditor(true);
  }, [getSrc]);

  const handleCloseEditor = () => {
    setShowEditor(false);
    dispatch(setSelectedThumbnail(""));
  };

  const thumbnailFromState =
    (draftSession.thumbnails && draftSession.thumbnails) || [];
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleShowSuggestions = () => {
    return setShowSuggestions(!showSuggestions);
  };
  const handleCloseSuggestions = () => {
    return setShowSuggestions(false);
  };

  const handleUploadImage = (newURL) => {
    setLoading(true);

    const myFile = convertCanvasToImage(newURL.canvas);
    console.log({ myFile });
    handleSessionPictureUpload(myFile);
    return false;
  };

  const handleSessionPictureUpload = (file) => {
    // setLoading(true);
    const formData = new FormData();

    formData.append("file", file);

    const url = `https://utils.hivepath.io/api/fileUpload?user_id=${USER_ID}&type=session_document&category=session_document
    `;
    fetch(url, {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("File Upload", json);

        if (json.status === "success") {
          dispatch(setDraftSessionThumbnail(json.file_path));
          dispatch(setSelectedThumbnail(""));
          setLoading(false);
        } else {
          setLoading(false);
        }
        //
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        // // enqueueSnackbar("Cannot complete action", {
        //   variant: "error",
        // });
      });
  };

  const handleBackdropClose = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!draftSession?.session_id) return history.push(prevURL);
  }, []);

  const thumbnails = [...thumbnailFromState, ...sessionThumbnails];
  const handleSubmit = () => {
    dispatch(setSectionLoading(true));
    const url = KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING;
    const data = {
      user_id: USER_ID,
      session_id: draftSession.session_id,
      // category: draftSession.category,
      thumbnails: thumbnails && thumbnails,
      current_offering_stage: {
        prev_stage: currentPath,
        next_stage: nextURL,
      },
      type: "one-one",
      action: "draft",
    };

    // dispatch(fetchDraftKnowledgeSessionStart({ url, data }));
    // dispatch(removeDraftSessionThumbnails());
    // history.push(nextURL);
    authFetch(url, data)
      .then((json) => {
        dispatch(setSectionLoading(false));
        if (json.status === "success") {
          dispatch(setDraftKnowledgeSession(json.result));
          dispatch(removeDraftSessionThumbnails());
          history.push(nextURL);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    setShowSelectedFile(true);
  };
  // console.log(selectedFile);

  const handleDeleteThumbnail = (e, file_url) => {
    const url = "https://utils.hivepath.io/api/deleteThumbnailImage";
    const data = { file_url: file_url, user_id: USER_ID };
    // let arr = thumbnails.filter((item) => item !== file_url);

    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          dispatch(deleteDraftSessionThumbnails(file_url));
        }

        console.log(json);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Box style={{ display: "flex", flex: 1 }}>
      <Container
        maxWidth={thumbnails.length > 0 ? "lg" : "sm"}
        style={
          {
            // paddingTop: "64px",
          }
        }
        className={classes.contentContainer}
      >
        <div
          style={{
            position: "sticky",
            top: "150px",

            // position: "-webkit-sticky",
          }}
        >
          <div
            style={{
              marginRight: "16px",
              // textAlign: "center",
            }}
          >
            <Container maxWidth="sm">
              <OnboardingSectionHeadings
                title={`Add Photos`}
                description={`Make your Knowledge Session both informative and visually pleasing with the help of stunning images!`}
                headingStyles={{
                  textAlign: "center",
                }}
                containerStyles={{ marginBottom: "16px" }}
                descriptionStyles={{
                  fontSize: "18px",
                  color: "#515151",
                }}
              />
              <Typography
                style={{
                  fontWeight: " 500",
                  fontSize: "18px",
                  lineHeight: "23px",

                  color: "#515151",
                  paddingBottom: "16px",
                }}
              >
                You can either choose to dive in and get creative with our
                presets or directly upload from your device.
                <br />
                {/* <p
                style={{
                  paddingTop: "16px",
                  paddingBottom: "16px",
                }}
              >
                Add at least one image
              </p> */}
              </Typography>
            </Container>
            <p
              style={{
                paddingTop: "16px",
                paddingBottom: "16px",
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: 500,
              }}
            >
              Add at least one image
            </p>{" "}
            <Grid container style={{ paddingBottom: "128px" }}>
              <Grid
                item
                xs={12}
                md={thumbnails.length > 0 ? 6 : 12}
                style={{
                  background: "#FFFFFF",
                  border: "1px dashed rgba(0, 0, 0, 0.3)",
                  borderRadius: "10px",
                  display: "grid",
                  justifyContent: "center",
                  textAlign: "center",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  marginBottom: "16px",
                  // marginRight: "16px",
                }}
              >
                {" "}
                <img
                  src={addThumbnailImage}
                  alt=""
                  style={{ width: "100%", height: "80px" }}
                />
                <p>Add Thumbnails</p>
                <Button
                  style={{
                    background: "rgba(236, 236, 236, 1)",
                    color: "black",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                  }}
                  disabled={thumbnails.length >= 5}
                  onClick={handleShowSuggestions}
                >
                  Upload From Presets
                </Button>
                <p>Or </p>
                {/* <label for="upload-image">Browse File</label>
                <input
                  type={"image"}
                  alt="selected image"
                  name="upload-image"
                  id="upload-image"
                  disabled={img.length >= 5}
                /> */}
                <label
                  class="custom-file-upload"
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    cursor: "pointer",
                    color: "#484A9E",
                  }}
                >
                  <input
                    type="file"
                    style={{
                      display: "none",
                    }}
                    disabled={thumbnails.length >= 5}
                    ref={inputRef}
                    // value={selectedFile}
                    onChange={(e) => handleFileSelect(e)}
                  />
                  Browse File
                </label>
                {/* <Button disabled={img.length >= 5}>Browse File</Button> */}
              </Grid>
              {thumbnails.length > 0 && (
                <>
                  {thumbnails.map((item, index) => (
                    <Grid item xs={12} md={6}>
                      <div style={{ position: "relative" }}>
                        <HivepathImage
                          className={classes.imageStyle}
                          src={item}
                          alt=""
                          style={{
                            marginLeft: index % 2 === 0 ? "16px" : "0px",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        >
                          <Tooltip title={`Delete Image`}>
                            <IconButton
                              style={{ background: "white" }}
                              onClick={(e) => handleDeleteThumbnail(e, item)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>{" "}
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </div>
        </div>
      </Container>

      {!matches && (
        <div style={{ maxWidth: "30%" }}>
          {showSuggestions && (
            <Collapse in={showSuggestions}>
              <SelectThumbnailsFromPresets
                show={showSuggestions}
                handleClick={handleCloseSuggestions}
                category={thumbnailCategory}
              />
            </Collapse>
          )}
        </div>
      )}

      {matches && (
        <>
          <SuggestionDrawer
            anchor={"right"}
            open={showSuggestions}
            closeDrawer={handleCloseSuggestions}
            component={
              <SelectThumbnailsFromPresets
                show={showSuggestions}
                handleClick={handleCloseSuggestions}
                category={thumbnailCategory}
              />
            }
          />
        </>
      )}

      <HivepathImageEditor
        show={showEditor}
        src={getSrc}
        onClose={handleCloseEditor}
        onComplete={handleUploadImage}
      />
      <HivepathImageEditor
        show={showSelectedFile}
        src={selectedFile}
        onClose={() => setShowSelectedFile(false)}
        onComplete={handleUploadImage}
      />

      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={prevURL}
        nextURL={nextURL}
        onClickPrimaryButton={handleSubmit}
        disablePrimary={!thumbnails || thumbnails.length < 1}
      />
      <LoadingBackdrop open={loading} handleClose={handleBackdropClose} />
    </Box>
  );
};

export default AddThumbnailsSection;
