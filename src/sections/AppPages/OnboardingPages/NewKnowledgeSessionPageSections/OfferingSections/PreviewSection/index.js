import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import PreviewOfferingItem from "./PreviewOfferingItem";
import suggestionImage from "assets/svg/all/new-icons/ks-onboarding/suggestions.svg";
import { Link, useHistory } from "react-router-dom";
import {
  completeKnowledgeSessionOnboarding,
  fetchDraftKnowledgeSessionStart,
  setDraftKnowledgeSession,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import { makeStyles } from "@mui/styles";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import { setSectionLoading } from "store/loaders/loadersSlice";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import SessionCreatedSuccessfulDialog from "./SessionCreatedSuccessfulDialog";
const useStyles = makeStyles((theme) => ({
  root: {},
  contentContainer: {
    paddingTop: "16px",

    [theme.breakpoints.down("sm")]: {
      padding: "8px",
      paddingTop: "16px",
    },
  },
}));

const mapState = ({ user, view, sessions }) => ({
  currentUser: user.currentUser,
  currentPath: view.knowledgeSessionCurrentPath,
  draftSession: sessions.draftKnowledgeSession,
});
const PreviewOfferingSection = ({ nextURL, prevURL, primaryButtonText }) => {
  const classes = useStyles();
  const { currentUser, currentPath, draftSession } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [sessions, setSessions] = useState([]);
  const enqueueSnackbar = useEnquequeSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const previewSession = draftSession || {};

  //
  const dispatch = useDispatch();
  const history = useHistory();

  const disablePrimary =
    !draftSession.session_id ||
    !draftSession.category ||
    !draftSession.thumbnails.length > 0 ||
    !draftSession.title ||
    !draftSession.description;

  useEffect(() => {
    if (!draftSession.session_id) return history.push(prevURL);
  }, []);
  const handleModalClose = () => {
    setOpenModal(false);
    history.push(nextURL);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleSubmit = () => {
    dispatch(setSectionLoading(true));
    const url = KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING;
    const data = {
      user_id: USER_ID,
      session_id: draftSession.session_id,
      // category: draftSession.category,
      current_offering_stage: {
        prev_stage: currentPath,
        next_stage: nextURL,
      },
      type: "one-one",
      action: "submit",
    };

    // dispatch(fetchDraftKnowledgeSessionStart({ url, data }));

    // dispatch(completeKnowledgeSessionOnboarding({ url, data }));
    // history.push(nextURL);

    authFetch(url, data)
      // dispatch(setDraftKnowledgeSession({}));
      .then((json) => {
        dispatch(setSectionLoading(false));

        if (json.status === "success") {
          dispatch(setDraftKnowledgeSession({}));
          enqueueSnackbar("Offering created successfully!");
          // dispatch(setDraftSessionThumbnail(""));
          handleModalOpen();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box className={classes.root}>
      <div className={classes.contentContainer}>
        <OnboardingSectionHeadings
          title={`Preview & Publish`}
          description={
            <p
              style={{ fontSize: "18px", lineHeight: "23px", color: "#515151" }}
            >
              Here's the final look!
              <br />
              <br /> Based on all the details provided by you, this is what your
              Knowledge Session will look like for the public view -
            </p>
          }
          descriptionStyles={{
            fontSize: "18px",
            lineHeight: "23px",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        />
      </div>

      {/* <Grid container style={{ paddingTop: "20px" }}> */}
      {previewSession && draftSession.title && (
        // <Grid item md={4} >
        <>
          {" "}
          <PreviewOfferingItem
            title={draftSession.title}
            imgSrc={draftSession.thumbnails && draftSession?.thumbnails}
            data={draftSession}
          />
          <Typography
            style={{
              fontSize: "18px",
              lineHeight: "23px",
              color: "#515151",
            }}
          >
            Please edit/remove any details that are not required.
          </Typography>
        </>
        // </Grid>
      )}
      {/* </Grid> */}

      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={prevURL}
        // nextURL={"/onboarding/ks/availability"}
        onClickPrimaryButton={handleSubmit}
        disablePrimary={disablePrimary}
        primaryText={primaryButtonText}
      />
      <SessionCreatedSuccessfulDialog
        open={openModal}
        handleClose={handleModalClose}
      />
    </Box>
  );
};

export default PreviewOfferingSection;
