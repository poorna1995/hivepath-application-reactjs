import { Container, Typography, Chip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchDraftKnowledgeSessionStart,
  setDraftKnowledgeSession,
  setDraftRelatedTopics,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";

import { makeStyles } from "@mui/styles";
import img from "assets/svg/all/new-icons/ks-onboarding/create-offering/related-topics/img.svg";
import lodash from "lodash";
// import CreatableSelectInput from "./CreatableSelectInput";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import { ReactComponent as RemoveIcon } from "assets/svg/all/new-icons/ks-onboarding/remove-icon.svg";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import CreatableSelectInput from "components/Common/Inputs/SelectInput/CreatableSelectInput";
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
}));

const mapState = ({ user, view, sessions }) => ({
  currentUser: user.currentUser,
  currentPath: view.knowledgeSessionCurrentPath,
  draftSession: sessions.draftKnowledgeSession,
});

const selectInputStyles = {
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "10px",
    ":hover": {
      //   border: "1px",
    },
  }),
  indicatorsContainer: (base) => ({
    ...base,
    display: "none",
  }),
};

const AddRelatedTopicSection = ({ nextURL, prevURL }) => {
  const classes = useStyles();
  const { currentUser, currentPath, draftSession } = useSelector(mapState);
  const USER_ID = currentUser.user_id;

  const relatedTopicsFromState = draftSession.related_topics || [];
  const relatedTopicsWithLabel = relatedTopicsFromState.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  // console.log({ relatedTopicsWithLabel });

  const dispatch = useDispatch();
  const history = useHistory();

  const [types, setTypes] = useState();
  const [list, setList] = useState(relatedTopicsWithLabel || []);
  const [options, setOptions] = useState([]);
  // console.log({ types });

  // let createTypesList = [];

  const handleChange = (e) => {
    setTypes({});
    // console.log({ e });
    setList((prevState) => [...prevState, e]);
  };

  const itemsList = [types];
  const typeList = lodash.uniq(lodash.map(list, "value"));
  console.log({ typeList });
  const handleBlurRelatedTopics = () => {
    dispatch(setDraftRelatedTopics(typeList));
  };

  useEffect(() => {
    handleBlurRelatedTopics();
  }, [list]);
  // console.log({ topics: draftSession.related_topics });
  //  list.map((item) => {
  //   const { value } = item;
  //   return value;
  // });
  // .filter(item => !typeList.inclues(item))
  // console.log({ list, typeList });
  // const uniqueItems = lodash.uniq(lodash.map(list, "value"));
  // console.log({ uniqueItems });

  useEffect(() => {
    if (!draftSession.session_id) return history.push(prevURL);
  }, []);

  const fetchRelatedTopics = () => {
    const url = "https://utils.hivepath.io/api/fetchExpertiseList";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setOptions(json.result);
        }
      });

    // console.log(json);
  };
  useEffect(() => {
    fetchRelatedTopics();
    // const url = "https://utils.hivepath.io/api/fetchNewSessionCategories";
    // const data = {};

    // authFetch(url, data)
    //   .then((json) => {
    //     setOptions(json.result);
    //     console.log({ json });
    //   })
    //   .catch((error) => console.log(error));
  }, []);
  // console.log({ options });
  const optionsWithLabel =
    (options &&
      options.map((item) => {
        return {
          label: item,
          value: item,
        };
      })) ||
    [];

  const handleSubmit = () => {
    dispatch(setSectionLoading(true));
    const url = KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING;
    const data = {
      user_id: USER_ID,
      session_id: draftSession.session_id,
      // category: draftSession.category,
      related_topics: typeList,

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
        dispatch(setSectionLoading(false));
        if (json.status === "success") {
          dispatch(setDraftKnowledgeSession(json.result));
          history.push(nextURL);
        }
      })
      .catch((err) => console.error(err));
  };
  const removeItem = (e, item) => {
    const removed = lodash.remove(types, function (value) {
      return value.label === item;
    });

    setTypes(types);
    // console.log({ removed, types });
  };

  const handleDelete = (chipToDelete) => () => {
    setList((prevState) =>
      prevState.filter((prev) => prev.label !== chipToDelete)
    );
  };

  return (
    <Box>
      <Container
        maxWidth={`sm`}
        style={{}}
        className={classes.contentContainer}
      >
        <OnboardingSectionHeadings
          title={`Related Keywords`}
          // description={}
          headingStyles={{
            textAlign: "center",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <img src={img} alt="" />
          <div
            style={{
              marginLeft: "16px",
            }}
          >
            <Typography
              style={{
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "23px",
                color: "#515151",
              }}
            >
              You can expand your session to a wider audience by choosing topics
              that are related to your session and its relevant fields.
            </Typography>
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "18px",
                lineHeight: "23px",

                color: "#515151",
                marginTop: "16px",
              }}
            >
              For example - #contentmarketing #contentcreator #digitalmarketing
              #creativewriting and so on.
            </Typography>
          </div>
        </div>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: " 21px",
            marginTop: "32px",
            marginBottom: "8px",
          }}
        >
          Add Keywords
        </Typography>

        <CreatableSelectInput
          noPadding
          options={optionsWithLabel}
          value={types}
          onChange={handleChange}
          onBlur={handleBlurRelatedTopics}
          styles={selectInputStyles}
          placeholder="Add keywords"
        />

        {/* <CreatableInputField
          types={types}
          // setTypes={setTypes}
          handleChange={handleChange}
          options={optionsWithLabel}
        /> */}
        {/* <CreatableSelectInput
        options={optionsWithLabel}

        
        /> */}

        {Array.isArray(typeList) && typeList.length > 0 && (
          <div
            style={{
              marginTop: "16px",
            }}
          >
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                lineHeight: "16px",
                color: "#333333",
                paddingBottom: "8px",
              }}
            >
              Keywords added
            </Typography>
            <div
              style={{
                background: "#E0F5E3",
                padding: "8px",
                borderRadius: "10px",
                paddingBottom: "16px",
              }}
            >
              {typeList.map((item) => {
                return (
                  <Chip
                    label={`# ${item}`}
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      lineHeight: "20px",
                      marginRight: "16px",
                      marginTop: "8px",
                      background: "white",
                      color: "#141414",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                    deleteIcon={
                      <RemoveIcon
                        style={{
                          marginLeft: "8px",
                        }}
                      />
                    }
                    onDelete={handleDelete(item)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Container>
      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={prevURL}
        nextURL={nextURL}
        onClickPrimaryButton={handleSubmit}
        disablePrimary={list.length < 1}
      />
    </Box>
  );
};

export default AddRelatedTopicSection;
