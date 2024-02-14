import { Box, Container, Typography } from "@mui/material";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import YSCategories from "sections/AppPages/OnboardingPages/KnowledgeSession/StepOneSections/YourSessions/YSComponents/Categories";
import {
  fetchDraftKnowledgeSessionStart,
  setDraftKnowledgeSession,
  setSessionCategoryType,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import { makeStyles } from "@mui/styles";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    maxWidth: "400px",
    margin: "auto",
    paddingTop: "64px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "16px",
    },
  },
}));

const mapState = ({ user, view, sessions }) => ({
  currentUser: user.currentUser,
  currentPath: view.knowledgeSessionCurrentPath,
  draftSession: sessions.draftKnowledgeSession,
  sessions: sessions,
});

const SelectOfferingTypeSection = ({
  // nextURL, prevURL
  ...props
}) => {
  const classes = useStyles();
  const { currentUser, currentPath, draftSession, sessions } =
    useSelector(mapState);
  const USER_ID = currentUser.user_id;

  const categoryFromState = {
    label: draftSession.category,
    value: draftSession.category,
  };
  console.log(categoryFromState);

  const dispatch = useDispatch();
  const history = useHistory();
  const [category, setCategory] = useState(categoryFromState || "");

  useEffect(() => {
    setCategory(category);
  }, [category]);

  const [categories, setCategories] = useState([]);
  const nextURL = "/onboarding/ks/create/add-offering";
  const snackbar = useEnqueueSnackbar();
  useEffect(() => {
    const url = "https://utils.hivepath.io/api/fetchNewSessionCategories";
    const data = {};

    authFetch(url, data)
      .then((json) => {
        console.log("json categories", json);
        setCategories(json.result);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log({ categories });

  const options =
    Array.isArray(categories) &&
    categories.length > 0 &&
    categories.map((item) => {
      return {
        label: item.category,
        value: item.category,
      };
    });

  const getType =
    categories.length > 0 &&
    categories
      .filter((item) => {
        if (item.category === category.value) return item.type;
        return null;
      })
      .map((item) => item.type);
  console.log({ getType });

  const handleChange = (e) => {
    setCategory(e);
  };
  useEffect(() => {
    dispatch(setSessionCategoryType(getType[0]));
  }, [getType]);

  console.log(category.value);

  const handleCreateOfferingStart = () => {
    const url = draftSession.session_id
      ? KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING
      : KNOWLEDGE_SESSIONS_SERVICES.CREATE_USER_OFFERING;
    const data = {
      type: "one-one",
      user_id: USER_ID,
      category: category.value,
      offering_type: getType[0],

      session_id: draftSession.session_id && draftSession.session_id,
      current_offering_stage: {
        prev_stage: currentPath,
        next_stage: nextURL,
      },
      action: "draft",
    };
    const location = nextURL;
    // dispatch(fetchDraftKnowledgeSessionStart({ url, data, location }));

    // history.push(nextURL);
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          console.log(json);
          dispatch(setDraftKnowledgeSession(json.result));
          history.push(nextURL);
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <div className={classes.container}>
        <OnboardingSectionHeadings
          title={`Session Type`}
          description={`Please select the type of Knowledge Session you wish to host depending on your area of expertise, category, interests, and comfort.`}
        />
        <Typography
          style={{
            fontWeight: " 500",
            fontSize: "14px",
            lineHeight: "18px",

            color: "#515151",
            marginTop: "16px",
          }}
        >
          From Career advice to Portfolio review, choose the one that best fits
          the session motive.
        </Typography>
        <FormSelectInput
          title="Add Category"
          labelStyles={{
            marginTop: "32px",
            fontWeight: " bold",
            fontSize: "16px",
            lineHeight: " 21px",
            color: "#333333",
            marginBottom: "8px",
          }}
          options={options}
          value={category}
          onChange={handleChange}
          noPadding
          {...props}
        />
      </div>
      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={"/onboarding/ks/intro/get-started"}
        // nextURL={"/onboarding/ks/create/add-offering"}
        onClickPrimaryButton={handleCreateOfferingStart}
        // disablePrimary={!category.value}
      />
    </Box>
  );
};

export default SelectOfferingTypeSection;
