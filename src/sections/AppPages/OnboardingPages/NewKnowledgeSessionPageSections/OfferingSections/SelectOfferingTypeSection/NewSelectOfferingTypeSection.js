import {
  Box,
  Card,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
  CardContent,
} from "@mui/material";
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
  setDraftSessionCategory,
  setSessionCategoryType,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import { makeStyles } from "@mui/styles";
import CardThreeImage from "assets/svg/all/new-icons/landing-page/card-three.svg";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import categoryList from "../../constants/categoryList";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import { setSectionLoading } from "store/loaders/loadersSlice";
const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    //   maxWidth: "400px",
    maxWidth: "1000px",
    margin: "auto",
    paddingBottom: "64px",
    textAlign: "center",
    // paddingTop: "16px",

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

const NewSelectOfferingTypeSection = ({
  nextURL,
  prevURL,

  ...props
}) => {
  const classes = useStyles();
  const { currentUser, currentPath, draftSession, sessions } =
    useSelector(mapState);
  const USER_ID = currentUser.user_id;

  const dispatch = useDispatch();
  const history = useHistory();
  const [category, setCategory] = useState(draftSession.category || "");

  useEffect(() => {
    setCategory(draftSession.category);
  }, [draftSession.category]);
  const [categories, setCategories] = useState([]);
  // const nextURL = "/onboarding/ks/create/add-offering";
  const snackbar = useEnqueueSnackbar();

  const handleCreateOfferingStart = () => {
    dispatch(setSectionLoading(true));
    const url = draftSession.session_id
      ? KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING
      : KNOWLEDGE_SESSIONS_SERVICES.CREATE_USER_OFFERING;
    const data = {
      type: "one-one",
      user_id: USER_ID,
      category: category,
      offering_type: category,

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
        dispatch(setSectionLoading(false));
        if (json.status === "success") {
          console.log(json);
          dispatch(setDraftKnowledgeSession(json.result));
          history.push(nextURL);
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSelection = (e, title) => {
    setCategory(title);
    dispatch(setDraftSessionCategory(title));
  };

  return (
    <Box>
      <div className={classes.container}>
        <OnboardingSectionHeadings
          title={`Session Type`}
          description={`Please select the type of Knowledge Session you wish to host depending on your area of expertise, category, interests, and comfort.`}
        />

        <Grid container marginTop="24px">
          {categoryList.map((item) => {
            const { title, img, bgColor } = item;
            return (
              <Grid
                item
                xs={6}
                md={4}
                // padding="16px"
                sx={{
                  padding: {
                    md: "16px",
                    xs: "8px",
                  },
                }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      border: "1px solid #484a9e",
                      // transitionDelay:'1500ms',
                      transition: "transform 450ms,",
                    },
                    boxShadow: "none",
                    // bgcolor: item.bgColor,
                    // padding: "16px",
                    textAlign: "center",
                    borderRadius: "20px",
                    // border: "1px solid rgba(0, 0, 0, 0.1)",

                    border:
                      title === category
                        ? "1px solid #484a9e"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    boxSizing: "content-box",
                  }}
                  onClick={(e) => handleSelection(e, title)}
                >
                  {title === category ? (
                    <FaCheckCircle
                      style={{
                        //   color: "black",
                        fontSize: "24px",
                        padding: "8px",
                        fill: "rgba(72, 74, 158, 1)",
                        // width: "20px",
                        // height: "20px",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    />
                  ) : (
                    <FaCheckCircle
                      style={{
                        //   color: "black",
                        fontSize: "24px",
                        padding: "8px",
                        fill: "rgba(255, 255, 255, 1)",
                        // width: "20px",
                        // height: "20px",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    />
                  )}
                  <CardMedia
                    component={"img"}
                    src={item.img}
                    style={{
                      background: item.bgColor,
                      backgroundPosition: "cover",
                      width: "100%",
                      // height: "190px",
                      objectFit: "contain",
                    }}
                    sx={{
                      height: { md: "190px", xs: "120px" },
                    }}
                  />

                  <CardContent
                    sx={{
                      padding: {
                        md: "16px",
                        xs: "8px",
                      },
                      // bgcolor: title === category && "primary.main",
                      // color: title === category && "white",
                      // background: "no-repeat cover",
                    }}
                  >
                    <Typography
                      fontSize={`20px`}
                      fontWeight="700"
                      sx={{
                        fontSize: {
                          md: "20px",
                          xs: "16px",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={prevURL}
        // nextURL={"/onboarding/ks/create/add-offering"}
        onClickPrimaryButton={handleCreateOfferingStart}
        // disablePrimary={!category.value}
      />
    </Box>
  );
};

export default NewSelectOfferingTypeSection;
