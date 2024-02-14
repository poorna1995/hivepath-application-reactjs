import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { borderRadius, Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchDraftKnowledgeSessionStart,
  setDraftKnowledgeSession,
  setDraftSessionPrerequisites,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import { makeStyles } from "@mui/styles";
import { FaCheckCircle } from "react-icons/fa";
import yesImage from "assets/svg/all/new-icons/ks-onboarding/create-offering/prerequisites/yes.svg";

import noImage from "assets/svg/all/new-icons/ks-onboarding/create-offering/prerequisites/no.svg";
import SelectableCard from "components/Common/Cards/SelectableCard";

import { ReactComponent as DeleteIcon } from "assets/svg/all/new-icons/ks-onboarding/preferences/delete-icon.svg";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const useStyles = makeStyles((theme) => ({
  root: {},
  contentContainer: {
    // paddingTop: "64px",

    [theme.breakpoints.down("sm")]: {
      padding: "8px",
      paddingTop: "16px",
      maxWidth: "360px !important",
    },
  },
}));

const mapState = ({ user, view, sessions }) => ({
  currentUser: user.currentUser,
  currentPath: view.knowledgeSessionCurrentPath,
  draftSession: sessions.draftKnowledgeSession,
});

const PrerequisitesSection = ({ nextURL, prevURL }) => {
  const classes = useStyles();
  const { currentUser, currentPath, draftSession } = useSelector(mapState);
  const USER_ID = currentUser.user_id;

  const prerequisitesFromState = draftSession.prerequisites || [];
  // console.log({ prerequisitesFromState });
  const dispatch = useDispatch();
  const history = useHistory();
  const showYes = prerequisitesFromState.length > 0;

  const [showOptions, setShowOptions] = useState(showYes || false);

  const handleShow = () => setShowOptions(true);
  const handleHide = () => {
    setShowOptions(false);
    dispatch(setDraftSessionPrerequisites([]));
  };

  const fieldsFromState = prerequisitesFromState.map((item) => {
    return {
      value: item,
    };
  }) || [{ value: null }];
  // console.log({ fieldsFromState });
  const [fields, setFields] = useState(fieldsFromState || [{ value: null }]);

  // useState(() => {
  //   if (fields.length > 0) return setShowOptions(false);
  // }, [fields.length]);

  useEffect(() => {
    if (fieldsFromState.length === 0 || fields.length === 0)
      return setFields([{ value: null }]);
  }, []);
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  // console.log({ fields });
  // console.log()
  const list = fields?.map((item) => {
    const { value } = item;
    if (value === "") return null;
    return value;
  });
  // console.log({ list });

  useEffect(() => {
    if (!draftSession.session_id) return history.push(prevURL);
  }, []);
  const handleSubmit = () => {
    const url = KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING;
    const data = {
      user_id: USER_ID,
      session_id: draftSession.session_id,
      // category: draftSession.category,
      prerequisites: showOptions ? list : [],
      current_offering_stage: {
        prev_stage: currentPath,
        next_stage: nextURL,
      },
      type: "one-one",
      action: "draft",
    };
    // dispatch(fetchDraftKnowledgeSessionStart({ url, data }));
    // history.push(nextURL);
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          dispatch(setDraftKnowledgeSession(json.result));
          history.push(nextURL);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleOnBlurMethod();
    if (list.length === 0) handleHide();
  }, [fields]);
  const handleOnBlurMethod = () => {
    dispatch(setDraftSessionPrerequisites(showOptions ? list : []));
  };

  return (
    <Box>
      <Container
        // maxWidth="sm"
        style={{
          maxWidth: "800px",
          // paddingTop: "64px",
          paddingBottom: "64px",
        }}
        className={classes.contentContainer}
      >
        <OnboardingSectionHeadings
          title={`Prerequisites`}
          headingStyles={{
            textAlign: "center",
          }}
          description={`If your session is for a specific topic catering to a definite group of individuals then you can choose to provide a set of prerequisites.`}
          descriptionStyles={{
            marginTop: "16px",
          }}
        />
        <Typography
          style={{
            fontWeight: " 500",
            fontSize: "18px",
            lineHeight: "23px",

            color: "#515151",
            marginTop: "16px",
          }}
        >
          Whether it's experience, job role, skill, or any other provisions,
          please include them all here.
          <br />
          {/* <p
            style={{
              paddingTop: "16px",
            }}
          >
            <b>Note:</b> Prerequisites listed by the Host must be acknowledged
            by the Attendee for a successful booking of the session
          </p> */}
        </Typography>

        <Grid
          container
          spacing={2}
          paddingTop={"16px"}
          sx={{
            // display: "flex",
            // justifyContent: "space-between",
            // flex: 1,
            // marginTop: "8px",
            maxWidth: { md: "500px", xs: "360px" },
            margin: "auto",
          }}
        >
          <Grid item xs={6}>
            <SelectableCard
              imgBackgroundColor={"rgba(241, 255, 229, 1)"}
              title={"Yes, I ‘d like to add some prerequisites."}
              imgSrc={yesImage}
              onClickCard={handleShow}
              selectState={showOptions}
              fontSize={"16px"}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectableCard
              imgBackgroundColor={"rgba(255, 231, 230, 1)"}
              title={"No, I’d like to skip the prerequisites. "}
              imgSrc={noImage}
              onClickCard={handleHide}
              selectState={!showOptions}
              fontSize={"16px"}
            />
          </Grid>
        </Grid>
        {showOptions && (
          <div
            style={{ paddingTop: "32px", maxWidth: "600px", margin: "auto" }}
          >
            <Typography
              style={{
                fontWeight: " bold",
                fontSize: "16px",
                lineHeight: "21px",
                marginBottom: "8px",
              }}
            >
              Prerequisites
            </Typography>
            {fields.map((field, idx) => {
              return (
                <div key={`${field}-${idx}`} style={{ paddingBottom: "8px" }}>
                  <OutlinedInput
                    value={field.value || ""}
                    onChange={(e) => handleChange(idx, e)}
                    onBlur={handleOnBlurMethod}
                    placeholder="Enter Prerequisites"
                    fullWidth
                    endAdornment={
                      <>
                        {" "}
                        {fields.length > 1 &&
                          field.value &&
                          field.value.length > 0 && (
                            <IconButton onClick={() => handleRemove(idx)}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                      </>
                    }
                  />
                </div>
              );
            })}

            {fields.length < 3 && fields.length > 0 && (
              <Button
                onClick={handleAdd}
                style={{ marginTop: "8px", textTransform: "capitalize" }}
              >
                Add More
              </Button>
            )}
          </div>
        )}
      </Container>
      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={prevURL}
        nextURL={nextURL}
        onClickPrimaryButton={handleSubmit}
      />
    </Box>
  );
};

export default PrerequisitesSection;
