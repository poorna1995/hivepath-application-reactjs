import { Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import AppHeader from "components/AppHeader";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import Seo from "components/Seo";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OfferingOnboardingDrawer from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/components/OfferingOnboardingDrawer";
import {
  fetchDraftKnowledgeSessionStart,
  setDraftKnowledgeSession,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import { setSectionLoading } from "store/loaders/loadersSlice";
import authFetch from "utils/authFetch";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";

const mapState = ({ user, sessions, loaders }) => ({
  user: user,
  sessions: sessions,
  loading: loaders.sectionLoader,
});

const CreateSessionPagesLayout = ({ pageTitle, children }) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const { user, sessions, loading } = useSelector(mapState);
  const KNOWLEDGE_SESSION_ONBOARDING =
    user.currentUser.knowledge_session_onboarding_done;

  const draftSession = sessions.draftKnowledgeSession;
  const USER_ID = user.currentUser.user_id;
  const history = useHistory();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const enquequeSnackbar = useEnqueueSnackbar();
  const {
    session_id,
    title,
    description,
    prerequisites,
    related_topics,
    thumbnails,
  } = draftSession;

  const handleClickSaveButton = () => {
    dispatch(setSectionLoading(true));

    const url = KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING;
    // "https://auth.hivepath.io/api/updateUserOffering";
    const data = {
      user_id: USER_ID,
      session_id: draftSession.session_id,
      // category: draftSession.category,
      title: title,
      description: description,
      prerequisites,
      thumbnails,
      related_topics,

      // description:
      //   // (sessionDescription.length > 2000 &&
      //   // sessionDescription.substring(0, 2000)) ||
      //   sessionDescription,
      current_offering_stage: {
        // prev_stage: currentPath,
        // next_stage: nextURL,
      },
      type: "one-one",
      action: "draft",
    };

    // if (draftSession.session_id) {
    authFetch(url, data)
      .then((json) => {
        dispatch(setSectionLoading(false));
        if (json.status === "success") {
          dispatch(setDraftKnowledgeSession(json.result));
          history.push("/u/account/manage-sessions");
          enquequeSnackbar(json.message);
        }
      })
      .catch((err) => console.error(err));
    // } else {
    // }

    // dispatch(fetchDraftKnowledgeSessionStart({ url, data }));
    // dispatch(setSessionDetailsFromSuggestions({}));
    // history.push("/");
  };
  const handleOpenDialog = () => {
    if (draftSession.session_id) {
      setOpenModal(true);
    } else {
      history.push("/u/account/manage-sessions");
    }
  };
  const handleCloseDialog = () => {
    setOpenModal(false);
  };

  const createSessionLinksData = [
    {
      title:  <>
      Create Knowledge
      <br /> Session
    </>,
      url: `/offering/create`,
      id: 0,
      subMenu: [
        {
          title: "Session type",
          url: `/offering/create/category`,
        },
        {
          title: "Session details",
          url: `/offering/create/offering-details`,
          disabled: !session_id,
        },
        {
          title: "Related Keywords",
          url: `/offering/create/related-topics`,
          disabled: !session_id || !title || !description,
        },
        {
          title: "Prerequisites",
          url: `/offering/create/prerequisites`,
          disabled:
            !session_id || !title || !description || !related_topics.length > 0,
        },
        {
          title: "Photos",
          url: `/offering/create/thumbnails`,
          disabled:
            !session_id ||
            !title ||
            !description ||
            !related_topics.length > 0 ||
            !prerequisites,
        },
        {
          title: "Preview & Publish",
          url: "/offering/create/preview-session",
          disabled:
            !session_id ||
            !title ||
            !description ||
            !related_topics.length > 0 ||
            !prerequisites ||
            !thumbnails.length > 0,
        },
      ],
    },
  ];

  return (
    <Box>
      <AppHeader
        isSettings
        position={"fixed"}
        isOnboarding
        showButton={true}
        onClickSaveButton={() => handleOpenDialog()}
      />
      <Toolbar />
      <Seo title={pageTitle} />

      {matches ? (
        <div>
          <Typography
            sx={{
              // paddingBottom: "16px",
              fontSize: "24px",
              fontWeight: 700,
              paddingTop: "32px",
              paddingLeft: "8px",
            }}
          >
            Create a New Offering
          </Typography>
          {children}
        </div>
      ) : (
        <OfferingOnboardingDrawer
          // id={id}
          links={createSessionLinksData}
          drawerTitle={"Create a New Offering"}
          // goBackToPage={"/u/account/manage-sessions"}
          handleClickBackButton={handleOpenDialog}
          // disabledButton={!draftSession.session_id}
        >
          {children}
        </OfferingOnboardingDrawer>
      )}
      <LoadingBackdrop open={loading} />
      <SaveAndExitDialog
        open={openModal}
        handleClose={handleCloseDialog}
        handlePrimaryAction={handleClickSaveButton}
      />
    </Box>
  );
};

export default CreateSessionPagesLayout;

const SaveAndExitDialog = ({ open, handleClose, handlePrimaryAction }) => {
  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <div
        style={{
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        <Typography
          style={{
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          Do you want to save and exit?
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PrimaryButton
          title={"Save"}
          onClick={handlePrimaryAction}
          style={{ marginRight: "16px" }}
        />
        <OutlinedButton title={"Cancel"} onClick={handleClose} />
      </div>
    </HivepathBaseDialog>
  );
};
