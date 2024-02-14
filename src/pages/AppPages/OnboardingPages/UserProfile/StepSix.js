// import classes from "./StepOne.module.css";
import { Container, Grid, Paper, Typography } from "@mui/material";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout";
import UserProfileOnboardingLayout from "Layouts/UserLayout/UserProfileOnboardingLayout";
import ReviewSection from "sections/AppPages/OnboardingPages/UserProfile/StepSixSections/ReviewSection";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import PaperBase from "components/Common/PaperBase/PaperBase";
import SuccessPage from "./SuccessPage";
import GradientText from "components/Common/Typography/GradientText";

import { setProfileOnboardingStatus } from "store/User/user.actions";
import {
  fetchUserProfile,
  submitProfile,
} from "sections/AppPages/OnboardingPages/UserProfile/utils/fetchOnboarding";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const StepSix = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSuccess = () => {
    setIsSuccess(false);
    history.push("/");
  };

  const enqueueSnackbar = useEnquequeSnackbar();
  const { currentUser } = useSelector(mapState);

  const [stageState, setStageState] = useState({
    education: 0,
    experience: 0,
    skills: 0,
    social_media_links: 0,
  });

  const updateStageData = (data) => {
    const { education, experience, skills, social_media_links } = data;
    setStageState({
      education: education && education.length > 0 ? true : false,
      experience: experience && experience.length > 0 ? true : false,
      skills: skills && skills.length > 0 ? true : false,
      social_media_links:
        social_media_links && social_media_links.length > 0 ? true : false,
    });
  };

  const fetchProfileHandler = () => {
    setIsLoading(true);
    fetchUserProfile({ user_id: currentUser.user_id }).then((response) => {
      setIsLoading(false);
      if (response.result) {
        const { social_media_links, error } = response.result.profile_data;
        if (!error) {
          updateStageData(response.result.profile_data);
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

  const submitForm = () => {
    const defaultTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    setIsLoading(true);
    submitProfile({
      user_id: currentUser.user_id,
      default_timezone: defaultTimezone,
    }).then((response) => {
      setIsLoading(false);
      const { status, error } = response;
      if (status === "success") {
        dispatch(setProfileOnboardingStatus(true));
        setIsSuccess(true);
        // history.push("success");
      } else {
        enqueueSnackbar(
          error || "There was a problem in submitting the profile",
          { variant: "error" }
        );
        return false;
      }
    });
  };

  useEffect(() => {
    fetchProfileHandler();
  }, []);

  return (
    <UserProfileLayout title="User Profile Onboarding | Hivepath">
      <LoadingBackdrop open={isLoading} />

      <SuccessPage open={isSuccess} handleClose={handleSuccess} />

      <Container
        sx={{ pt: "16px" }}
        className="center"
        style={{ marginBottom: "120px" }}
      >
        <UserProfileOnboardingLayout active={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} align="center">
              <GradientText style={{ fontSize: "36px", fontWeight: "700" }}>
                Congratulations!
              </GradientText>
              <Typography
                variant="h6"
                fontWeight="800"
                sx={{
                  fontSize: { md: "24px", xs: "20px" },
                  width: "60%",
                }}
                mb={4}
              >
                All your details have been updated! <br />
                Press the submit button below to complete your onboarding.
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <ReviewSection stageData={stageState} submitForm={submitForm} />
            </Grid>
          </Grid>
        </UserProfileOnboardingLayout>
      </Container>
    </UserProfileLayout>
  );
};

export default StepSix;
