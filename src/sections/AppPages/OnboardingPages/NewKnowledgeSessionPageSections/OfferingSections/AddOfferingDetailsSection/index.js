import { Box, Container, Button, Collapse, useMediaQuery } from "@mui/material";
import React from "react";
import { useState } from "react";
import DescriptionEditor from "sections/AppPages/OnboardingPages/KnowledgeSession/StepOneSections/YourSessions/YSComponents/DescriptionEditor";
import YSTitleField from "sections/AppPages/OnboardingPages/KnowledgeSession/StepOneSections/YourSessions/YSComponents/TitleField";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import {
  fetchDraftKnowledgeSessionStart,
  setDraftKnowledgeSession,
  setDraftSessionDescription,
  setDraftSessionTitle,
  setSessionDetailsFromSuggestions,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import OfferingSuggestionsSection from "./OfferingSuggestionsSection";
import { makeStyles, useTheme } from "@mui/styles";
import SuggestionDrawer from "components/Common/Drawers/SuggestionDrawer";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import { setSectionLoading } from "store/loaders/loadersSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
  },
  contentContainer: {
    position: "sticky ",
    top: "100px",

    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },
  editContent: {
    position: "sticky ",
    top: "100px",
    // [theme.breakpoints.down("sm")]: {
    //   // position: "static",
    //   // top:'0px',
    //   paddingTop: "24px",
    // },
  },
  heading: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    // position: "sticky ",
    // top: "100px",
  },
}));

const mapState = ({ user, view, sessions }) => ({
  currentUser: user.currentUser,
  currentPath: view.knowledgeSessionCurrentPath,
  draftSession: sessions.draftKnowledgeSession,
  sessionFromSuggestions: sessions.sessionDetailsFromSuggestions,
});

const AddOfferingDetailsSection = ({ nextURL, prevURL }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const { currentUser, currentPath, draftSession, sessionFromSuggestions } =
    useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [openSuggestions, setOpenSuggestions] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionTitle =
    (sessionFromSuggestions.title && sessionFromSuggestions.title) ||
    (draftSession.title && draftSession.title) ||
    "";

  const [title, setTitle] = useState(sessionTitle);

  const description =
    (sessionFromSuggestions.description &&
      sessionFromSuggestions.description) ||
    (draftSession.description && draftSession.description) ||
    "";

  const blocksFromHTML = convertFromHTML(description);
  const sessionContent = ContentState.createFromBlockArray(blocksFromHTML);
  var myEditorState =
    EditorState.createWithContent(sessionContent) || EditorState.createEmpty();

  const [editorState, setEditorState] = useState(myEditorState);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  useEffect(() => {
    if (!draftSession.session_id) return history.push(prevURL);
  }, []);
  useEffect(() => {
    setTitle(sessionTitle);
    setEditorState(myEditorState);
  }, [sessionFromSuggestions]);

  // console.log(title);
  // console.log(
  //   draftToHtml(convertToRaw(editorState.getCurrentContent())).length
  // );

  const sessionDescription = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const handleBlurTitle = (e) => {
    dispatch(setDraftSessionTitle(title));
  };
  const handleBlurDescription = () => {
    dispatch(setDraftSessionDescription(sessionDescription));
  };
  // console.log({ title: draftSession.title });

  const handleSubmit = () => {
    dispatch(setSectionLoading(true));
    const url = KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING;
    const data = {
      user_id: USER_ID,
      session_id: draftSession.session_id,
      category: draftSession.category,
      title: (title.length > 70 && title.substring(0, 70)) || title,
      description:
        // (sessionDescription.length > 2000 &&
        // sessionDescription.substring(0, 2000)) ||
        sessionDescription,
      current_offering_stage: {
        prev_stage: currentPath,
        next_stage: nextURL,
      },
      type: "one-one",
      action: "draft",
    };

    authFetch(url, data)
      .then((json) => {
        dispatch(setSectionLoading(false));
        if (json.status === "success") {
          // console.log(json);
          dispatch(setDraftKnowledgeSession(json.result));
          dispatch(setSessionDetailsFromSuggestions({}));
          history.push(nextURL);
        } else {
        }
      })
      .catch((err) => console.log(err));

    // dispatch(fetchDraftKnowledgeSessionStart({ url, data }));
    // dispatch(setSessionDetailsFromSuggestions({}));
    // history.push(nextURL);
  };
  // console.log(title.length);

  const handleOpenSuggestions = () => {
    setOpenSuggestions(true);
  };
  const handleCloseSuggestions = () => {
    setOpenSuggestions(false);
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="md" className={classes.contentContainer}>
        <div
          style={{
            position: "sticky",
            top: "100px",
          }}
        >
          <div className={classes.heading}>
            <OnboardingSectionHeadings
              title={`Session Details`}
              description={`Please fill out the following details to create a Knowledge Session.  `}
              containerStyles={{ flex: 1 }}
            />
            <Button
              onClick={handleOpenSuggestions}
              style={{
                background: "rgba(236, 236, 236, 1)",
                borderRadius: "10px",
                textTransform: "capitalize",
                color: "rgba(34, 34, 34, 1)",
              }}
            >
              Suggestion
            </Button>
          </div>

          <YSTitleField
            title={title}
            handleChange={(e) => setTitle(e.target.value)}
            error={title.length > 70}
            // disabled={title.length > 70}
            helperText={
              title.length > 70 && "Title should not be more than 70 characters"
            }
            placeholder={`Provide a title for your Knowledge Session`}
            onBlur={(e) => handleBlurTitle(e)}
          />
          <DescriptionEditor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            editorHeight={"400px"}
            onBlur={handleBlurDescription}
            placeholder={`Description -
Tell us what your knowledge session is about. Describe it according to your experiences so that users know what to expect in the offering.
            
Provide the main objective of the session.
List out topics you will be discussing.
Describe the benefits of the session.
Write about your achievements or anything special that you’d like to share.
           
You can also add a personal note at the end of your description for your attendees, to infuse positivity and comfort.
            `}
            // helperText={
            //   sessionDescription.length > 2000 &&
            //   "Description Should be less than 2000 characters!"
            // }
          />
        </div>
      </Container>
      {!matches && (
        <>
          {openSuggestions && (
            <Collapse in={openSuggestions}>
              <OfferingSuggestionsSection
                show={openSuggestions}
                handleClick={handleCloseSuggestions}
                category={draftSession.category}
              />
            </Collapse>
          )}
        </>
      )}

      {matches && (
        <>
          <SuggestionDrawer
            anchor={"right"}
            open={openSuggestions}
            closeDrawer={handleCloseSuggestions}
            component={
              <OfferingSuggestionsSection
                show={openSuggestions}
                handleClick={handleCloseSuggestions}
                category={draftSession.category}
              />
            }
          />
        </>
      )}

      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={prevURL}
        nextURL={nextURL}
        onClickPrimaryButton={handleSubmit}
        disablePrimary={
          title.length < 5 || title.length > 70
          // sessionDescription.length < 10 ||
          // sessionDescription.length > 2000
        }
      />
    </Box>
  );
};

export default AddOfferingDetailsSection;
