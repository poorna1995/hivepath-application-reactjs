// import classes from "./StepOne.module.css";
import {
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

// import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout";
// import UserProfileOnboardingLayout from "Layouts/UserLayout/UserProfileOnboardingLayout";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import SocialMediaSection from "sections/AppPages/UserAccountPageSections/EditProfileSections/StepFiveSections/";
import PaperBase from "components/Common/PaperBase/PaperBase";
import UPOTip5 from "sections/AppPages/OnboardingPages/UserProfile/components/Tips/UPOTip5";

import {
  addUserProfile,
  fetchUserProfile,
  updateUserProfile,
} from "sections/AppPages/OnboardingPages/UserProfile/utils/fetchOnboarding";
import { useTheme } from "@mui/styles";
import CustomFab from "components/Common/Buttons/CustomFab";
import ShowTipsDrawer from "components/Common/Drawers/ShowTipsDrawer";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const initState = {
  facebook: { media_type: "personal", link: "", object_id: null, error: null },
  instagram: { media_type: "personal", link: "", object_id: null, error: null },
  twitter: { media_type: "personal", link: "", object_id: null, error: null },
  linkedin: {
    media_type: "professional",
    link: "",
    object_id: null,
    error: null,
  },
  portfolio: {
    media_type: "professional",
    link: "",
    object_id: null,
    error: null,
  },
  github: {
    media_type: "professional",
    link: "",
    object_id: null,
    error: null,
  },
  website: {
    media_type: "professional",
    link: "",
    object_id: null,
    error: null,
  },
};

const StepFive = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const [mediaLinks, setMediaLinks] = useState(initState);
  const { currentUser } = useSelector(mapState);
  const isDisabled =
    Object.keys(mediaLinks).filter((item) => mediaLinks[item].error).length > 0;

  const updateMediaLinks = (data) => {
    let modifiedData = {};
    for (let item of data) {
      modifiedData[item.social_media_name] = { ...item };
    }

    setMediaLinks((state) => {
      return { ...state, ...modifiedData };
    });
  };

  const fetchProfileHandler = () => {
    setIsLoading(true);
    fetchUserProfile({ user_id: currentUser.user_id }).then((response) => {
      setIsLoading(false);
      if (response.result) {
        const { social_media_links, error } = response.result.profile_data;
        if (!error) {
          updateMediaLinks(social_media_links);
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      } else {
        enqueueSnackbar("Error Occured", { variant: "error" });
        return;
      }
    });
  };

  const changeHandler = (e) => {
    let input = { [e.target.name]: e.target.value };
    let updatedState = {
      ...mediaLinks,
      [e.target.name]: { ...mediaLinks[e.target.name], link: e.target.value },
    };

    setMediaLinks((state) => {
      return updatedState;
    });
  };

  const submitForm = (data) => {
    if (isDisabled) {
      enqueueSnackbar("Please fill in the correct URLs", { variant: "error" });
      return false;
    }

    let linksData = [];
    for (let item in mediaLinks) {
      if (!mediaLinks[item].object_id) {
        linksData.push({ social_media_name: item, ...mediaLinks[item] });
      }
    }

    if (linksData.length > 0) {
      setIsLoading(true);

      let requestData = {
        user_id: currentUser.user_id,
        social_media_links: linksData,
      };

      const res = addUserProfile(requestData).then((response) => {
        setIsLoading(false);
        const { result, error } = response;
        if (error) {
          enqueueSnackbar(error, { variant: "error" });
          return false;
        } else {
          // adding the recently added skills to state
          updateMediaLinks(result.social_media_links);
          return true;
        }
      });
    } else {
      enqueueSnackbar("Details saved", { variant: "success" });
      return true;
    }
  };

  const updateMediaLink = async (object_id, name) => {
    const updateObj = mediaLinks[name];
    if (updateObj) {
      const { link } = updateObj;
      let requestObj = {
        user_id: currentUser.user_id,
        update: "social_media_links",
        link: link,
        social_media_name: name,
        // media_type: "",
        object_id: object_id,
      };

      setIsLoading(true);
      updateUserProfile(requestObj).then((response) => {
        setIsLoading(false);
        if (response.result) {
          const { result, error } = response;
          const { social_media_links } = result;

          if (!error) {
            enqueueSnackbar("Link updated succesfully", { variant: "success" });
            updateMediaLinks(social_media_links);
            return true;
          } else {
            enqueueSnackbar(error, { variant: "error" });
            return false;
          }
        } else {
          enqueueSnackbar("Error Occured", { variant: "error" });
          return false;
        }
      });
    } else {
      enqueueSnackbar("No such media link found", { variant: "error" });
      return false;
    }
  };

  const validateLinks = (name, status) => {
    let modifiedData = {};
    modifiedData[name] = { ...mediaLinks[name], error: status };

    setMediaLinks((state) => {
      return { ...state, ...modifiedData };
    });
  };

  useEffect(() => {
    fetchProfileHandler();
  }, []);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleFabClick = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <LoadingBackdrop open={isLoading} />
      <Container
        sx={{
          pt: "16px",
          maxWidth: "1330px!important",
        }}
        style={{ marginBottom: "120px", marginLeft: "0" }}
      >
        <Grid container spacing={2}>
          {/* <Grid item xs={12} md={12}>
            <Typography
              variant="h6"
              fontWeight="800"
              style={{ fontSize: "26px", marginBottom: "5px" }}
            >
              Social Media Profiles
            </Typography>
            <p>
              Enter in any URLs/Username you'd like to display on your profile.
            </p>
          </Grid> */}

          <Grid item xs={12} md={8}>
            <SocialMediaSection
              formData={mediaLinks}
              submitForm={submitForm}
              onInputChange={changeHandler}
              onUpdate={updateMediaLink}
              validateLinks={validateLinks}
            />

            <div style={{ display: "flex", justifyContent: "left" }}>
              <PrimaryButton
                title="Update"
                style={{ width: "100px", height: "50px" }}
                onClick={submitForm}
              />
            </div>
          </Grid>
          {/* <Grid
            item
            xs={12}
            md={4}
            style={{ paddingTop: "5px" }}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <UPOTip5 />
          </Grid> */}
        </Grid>
        {matches && (
          <>
            <CustomFab title={`Tips`} handleClick={handleFabClick} />
            <ShowTipsDrawer
              open={openDrawer}
              handleClose={() => setOpenDrawer(false)}
              component={<UPOTip5 noBoxShadow />}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default StepFive;
