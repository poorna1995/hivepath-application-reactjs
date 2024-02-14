// import addIcon from "assets/svg/onboarding-pages/user-profile/addPurple.svg";
// import classes from "./StepOne.module.css";

import {
  Container,
  Grid,
  Paper,
  Typography,
  InputLabel,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import addIcon from "assets/svg/onboarding-pages/user-profile/addBlack.svg";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout";
import UserProfileOnboardingLayout from "Layouts/UserLayout/UserProfileOnboardingLayout";
import EducationDetailsSection from "sections/AppPages/OnboardingPages/UserProfile/StepTwoSections/EducationDetailsSection";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import {
  addUserProfile,
  updateUserProfile,
  fetchUserProfile,
  deleteUserProfileSection,
} from "sections/AppPages/OnboardingPages/UserProfile/utils/fetchOnboarding";
import { getMonthName } from "sections/AppPages/OnboardingPages/UserProfile/utils/getYears";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import PaperBase from "components/Common/PaperBase/PaperBase";
import UPOTip2 from "sections/AppPages/OnboardingPages/UserProfile/components/Tips/UPOTip2";
import CustomFab from "components/Common/Buttons/CustomFab";
import ShowTipsDrawer from "components/Common/Drawers/ShowTipsDrawer";
import { useTheme } from "@mui/styles";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  footerContainer: {
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "120px",
  },
  footer: {
    backgroundColor: "white",
    paddingTop: "0 !important",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  },
}));

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const StepTwo = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [educationCards, setEducationCards] = useState([]);
  const [showEducationForm, setShowEducationForm] = useState(true);
  const [formData, setFormData] = useState(null);
  const [eduObjectId, setEduObjectId] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { currentUser } = useSelector(mapState);
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const enqueueSnackbar = useEnquequeSnackbar();

  const updateEducationCards = (data) => {
    setEducationCards(
      data.map((item) => {
        let startDateSplit = item.start_date.split("-");
        let endDateSplit = item.end_date.split("-");
        return {
          ...item,
          start_month: {
            label: getMonthName(startDateSplit[1]),
            value: startDateSplit[1],
          },
          end_month: {
            label: getMonthName(endDateSplit[1]),
            value: endDateSplit[1],
          },
          start_year: {
            label: startDateSplit[0],
            value: startDateSplit[0],
          },
          end_year: { label: endDateSplit[0], value: endDateSplit[0] },
        };
      })
    );
  };

  const submitForm = async (data, updateId) => {
    setIsLoading(true);
    if (updateId) {
      // update data
      const res = await updateUserProfile(data).then((response) => {
        const { result, error } = response;
        setIsLoading(false);
        if (!error) {
          setEduObjectId(null);
          setFormData(null);
          setShowEducationForm(false);
          updateEducationCards(result.education);
          return true;
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return false;
        }
      });
      return res;
    } else {
      const res = await addUserProfile(data).then((response) => {
        const { result, error } = response;
        setIsLoading(false);
        if (error) {
          enqueueSnackbar(error, { variant: "error" });
          return false;
        } else {
          // move to next step here
          // adding the recently added education to state
          setShowEducationForm(false);
          updateEducationCards(result.education);
          return true;
        }
      });
      return res;
    }
  };

  const fetchProfileHandler = () => {
    setIsLoading(true);
    fetchUserProfile({ user_id: currentUser.user_id }).then((response) => {
      if (response.result) {
        const { education, error } = response.result.profile_data;
        if (education.length > 0) {
          setShowEducationForm(false);
        }

        if (!error) {
          updateEducationCards(education);
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      } else {
        enqueueSnackbar("Error Occured", { variant: "error" });
        return;
      }
      setIsLoading(false);
    });
  };

  const deleteEducation = (object_id) => {
    setIsLoading(true);
    deleteUserProfileSection({
      user_id: currentUser.user_id,
      delete_key: "education",
      object_id: object_id,
    }).then((response) => {
      const { result, status, error } = response;
      if (!error) {
        if (status === "success") {
          updateEducationCards(result.education);
          if (result.education.length === 0) {
            setShowEducationForm(true);
          }
        } else {
          enqueueSnackbar("There was a problem in deleting the education", {
            variant: "error",
          });
          return;
        }
      } else {
        enqueueSnackbar(error, { variant: "error" });
        return;
      }
      setIsLoading(false);
    });
  };

  // used to set the education in state that needs to get edited
  const editEducation = (object_id) => {
    const selectedEdu = educationCards.filter(
      (item) => item.object_id === object_id
    );

    if (selectedEdu.length === 1) {
      setEduObjectId(object_id);
      setFormData({ ...selectedEdu[0] });
      setShowEducationForm(true);
    } else {
      enqueueSnackbar("No such education found", { variant: "error" });
      return;
    }
  };

  const confirmHandler = () => {
    if (educationCards.length > 0) {
      history.push("step-three");
    } else {
      enqueueSnackbar("Add atleast one education or skip", {
        variant: "error",
      });
      return false;
    }
  };

  const showEducationFormHandler = () => {
    setShowEducationForm(false);
    setEduObjectId(null);
    setFormData(null);
  };

  useEffect(() => {
    fetchProfileHandler();
  }, []);
  const handleFabClick = () => {
    setOpenDrawer(true);
  };

  return (
    <UserProfileLayout title="User Profile Onboarding | Hivepath">
      <LoadingBackdrop open={isLoading} />
      <Container
        sx={{ pt: "16px" }}
        className="center"
        style={{ marginBottom: "120px" }}
      >
        <UserProfileOnboardingLayout active={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <EducationDetailsSection
                submitForm={submitForm}
                educationCards={educationCards}
                onDelete={deleteEducation}
                eduObjectId={eduObjectId}
                showEducationForm={showEducationForm}
                showFormHandler={showEducationFormHandler}
                editEducation={editEducation}
                editData={formData}
              />

              <PaperBase
                style={{ boxShadow: "none", paddingLeft: "0", border: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowEducationForm(true)}
                >
                  <InputLabel
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      display: "inline-block",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",

                      background: "#ECECEC",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      fontWeight: "500",
                    }}
                  >
                    <img
                      src={addIcon}
                      style={{ cursor: "pointer", marginRight: "5px" }}
                    />{" "}
                    Add Education
                  </InputLabel>
                </div>
              </PaperBase>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              mt={1}
              sx={{
                display: {
                  md: "block",
                  xs: "none",
                },
              }}
            >
              <UPOTip2 />
            </Grid>
          </Grid>
        </UserProfileOnboardingLayout>
      </Container>
      <Grid container spacing={2} className={classes.footerContainer}>
        <Grid
          item
          xs={12}
          md={12}
          mt={5}
          align="center"
          className={`center ${classes.footer}`}
        >
          {educationCards.length === 0 && (
            <OutlinedButton
              title="Skip"
              style={{ width: "100px", height: "50px" }}
              onClick={() => history.push("step-three")}
            />
          )}
          <PrimaryButton
            title="Continue"
            style={{ width: "100px", height: "50px", marginLeft: "10px" }}
            onClick={confirmHandler}
            disabled={educationCards.length === 0}
          />
        </Grid>
      </Grid>
      {matches && (
        <>
          <CustomFab title={`Tips`} handleClick={handleFabClick} />
          <ShowTipsDrawer
            open={openDrawer}
            handleClose={() => setOpenDrawer(false)}
            component={<UPOTip2 noBoxShadow />}
          />
        </>
      )}
    </UserProfileLayout>
  );
};

export default StepTwo;
