import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import AppHeader from "components/AppHeader";
import Seo from "components/Seo";
import React from "react";
import OfferingOnboardingDrawer from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/components/OfferingOnboardingDrawer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import {
  fetchDraftKnowledgeSessionStart,
  setDraftKnowledgeSession,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import authFetch from "utils/authFetch";
import { setSectionLoading } from "store/loaders/loadersSlice";

const useStyles = makeStyles((theme) => ({
  root: {},
  sideNavDrawer: {},
}));

const mapState = ({ user, sessions, loaders }) => ({
  user: user,
  sessions: sessions,
  loading: loaders.sectionLoader,
});

const KnowledgeSessionOnboardingLayout = ({ children, id, pageTitle, showButton }) => {
  const { user, sessions, loading } = useSelector(mapState);
  const KNOWLEDGE_SESSION_ONBOARDING =
    user.currentUser.knowledge_session_onboarding_done;

  const KNOWLEDGE_SESSION_ONBOARDING_DATA =
    user.currentUser.knowledge_session_onboarding_data &&
    user.currentUser.knowledge_session_onboarding_data;

  const completeStatus = "complete";
  const stage1Status =
    KNOWLEDGE_SESSION_ONBOARDING_DATA.stage1 &&
    KNOWLEDGE_SESSION_ONBOARDING_DATA.stage1.status === completeStatus;
  const stage2Status =
    KNOWLEDGE_SESSION_ONBOARDING_DATA.stage2 &&
    KNOWLEDGE_SESSION_ONBOARDING_DATA.stage2.status === completeStatus;
  const stage3Status =
    KNOWLEDGE_SESSION_ONBOARDING_DATA.stage3 &&
    KNOWLEDGE_SESSION_ONBOARDING_DATA.stage3.status === completeStatus;
  const stage4Status =
    KNOWLEDGE_SESSION_ONBOARDING_DATA.stage4 &&
    KNOWLEDGE_SESSION_ONBOARDING_DATA.stage4.status === completeStatus;

  const draftSession = sessions.draftKnowledgeSession;
  const USER_ID = user.currentUser.user_id;
  const history = useHistory();
  const dispatch = useDispatch();

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
    const data = {
      user_id: USER_ID,
      session_id,
      title,
      description,
      prerequisites,
      related_topics,
      thumbnails,

      type: "one-one",
      action: "draft",
    };

    authFetch(url, data)
      .then((json) => {
        dispatch(setSectionLoading(false));
        if (json.status === "success") {
          dispatch(setDraftKnowledgeSession(json.result));
          history.push("/");
        }
      })
      .catch((err) => console.error(err));
  };
  // React.useEffect(() => {
  //   if (KNOWLEDGE_SESSION_ONBOARDING) return history.push("/");
  // }, [KNOWLEDGE_SESSION_ONBOARDING, history]);
  const ksOnboardingLinks = [
    {
      title: "Introduction",
      url: "/onboarding/ks/intro",
      id: 0,
      subMenu: [
        {
          title: "About ",
          url: "/onboarding/ks/intro/about",
        },
        {
          title: "How to?",
          url: "/onboarding/ks/intro/how-to-create",
        },
      ],
    },
    {
      title: (
        <>
          Create Knowledge
          <br /> Session
        </>
      ),
      url: "/onboarding/ks/create",
      id: 1,
      subMenu: [
        {
          title: "Session type",
          url: "/onboarding/ks/create/add-category",
        },
        {
          title: "Session details",
          url: "/onboarding/ks/create/add-offering",
          disabled: !session_id,
        },
        {
          title: "Related Keywords",
          url: "/onboarding/ks/create/related-topics",
          disabled: !session_id || !title || !description,
        },
        {
          title: "Prerequisites",
          url: "/onboarding/ks/create/prerequisites",
          disabled:
            !session_id || !title || !description || !related_topics.length > 0,
        },
        {
          title: "Photos",
          url: "/onboarding/ks/create/add-images",
          disabled:
            !session_id ||
            !title ||
            !description ||
            !related_topics.length > 0 ||
            !prerequisites,
        },
        {
          title: "Preview & Publish",
          url: "/onboarding/ks/create/preview-sessions",
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
    {
      title: "Availability",
      url: "/onboarding/ks/availability/",
      // disabled: true,
      id: 2,
      subMenu: [
        {
          title: "Add Availability",
          url: "/onboarding/ks/availability/add-availability",
          disabled: !stage1Status,
        },
      ],
    },
    {
      title: "Settings",
      url: "/onboarding/ks/preferences",
      // disabled: true,
      id: 3,
      subMenu: [
        {
          title: "Preferences",
          url: "/onboarding/ks/preferences/add-preferences",
          disabled: !stage2Status,
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
        showButton={showButton}
        onClickSaveButton={handleClickSaveButton}
      />
      <Toolbar />
      <Seo title={pageTitle} />
      <OfferingOnboardingDrawer
        id={id}
        links={ksOnboardingLinks}
        drawerTitle={"Become a Networking Host"}
      >
        {children}
      </OfferingOnboardingDrawer>
      <LoadingBackdrop open={loading} />
    </Box>
  );
};

export default KnowledgeSessionOnboardingLayout;

// {
//   "completion_percentage": 100,
//   "current_stage": "",
//   "current_status": "complete",
//   "stage1": {
//       "status": "complete"
//   },
//   "stage2": {
//       "status": "complete"
//   },
//   "stage3": {
//       "status": "complete"
//   },
//   "stage4": {
//       "status": "complete"
//   }
// }
