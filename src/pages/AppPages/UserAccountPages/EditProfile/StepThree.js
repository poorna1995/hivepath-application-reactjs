// import classes from "./StepOne.module.css";
// import addIcon from "assets/svg/onboarding-pages/user-profile/add.svg";
import addIcon from "assets/svg/onboarding-pages/user-profile/addBlack.svg";

import {
  Container,
  Grid,
  Paper,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

// import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout";
// import UserProfileOnboardingLayout from "Layouts/UserLayout/UserProfileOnboardingLayout";
// import PrimaryButton from "components/Common/Buttons/PrimaryButton";
// import OutlinedButton from "components/Common/Buttons/OutlinedButton";

import ExperienceSection from "sections/AppPages/UserAccountPageSections/EditProfileSections/StepThreeSections/";
import PaperBase from "components/Common/PaperBase/PaperBase";

import {
  addUserProfile,
  updateUserProfile,
  fetchUserProfile,
  deleteUserProfileSection,
} from "sections/AppPages/OnboardingPages/UserProfile/utils/fetchOnboarding";
import { getMonthName } from "sections/AppPages/OnboardingPages/UserProfile/utils/getYears";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import UPOTip3 from "sections/AppPages/OnboardingPages/UserProfile/components/Tips/UPOTip3";
import { useTheme } from "@mui/styles";
import CustomFab from "components/Common/Buttons/CustomFab";
import ShowTipsDrawer from "components/Common/Drawers/ShowTipsDrawer";

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

const StepThree = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const [expCards, setExpCards] = useState([]);
  const [showExpForm, setShowExpForm] = useState(true);
  const [formData, setFormData] = useState(null);
  const [expObjectId, setExpObjectId] = useState(null);

  const { currentUser } = useSelector(mapState);

  const enqueueSnackbar = useEnquequeSnackbar();

  const updateExpCards = (data) => {
    setExpCards(
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
          employment_status: {
            label: item.employment_status,
            value: item.employment_status,
          },
        };
      })
    );
  };

  const submitForm = async (data, isUpdate) => {
    setIsLoading(true);
    if (isUpdate) {
      // update data
      const res = await updateUserProfile(data).then((response) => {
        setIsLoading(false);
        const { result, error } = response;
        if (!error) {
          setExpObjectId(null);
          setFormData(null);
          setShowExpForm(false);
          updateExpCards(result.experience);
          return true;
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return false;
        }
      });
      return res;
    } else {
      const res = await addUserProfile(data).then((response) => {
        setIsLoading(false);
        const { result, error } = response;
        if (error) {
          enqueueSnackbar(error, { variant: "error" });
          return false;
        } else {
          // move to next step here
          // adding the recently added education to state
          setShowExpForm(false);
          updateExpCards(result.experience);
          return true;
        }
      });
      return res;
    }
  };

  const fetchProfileHandler = () => {
    setIsLoading(true);
    fetchUserProfile({ user_id: currentUser.user_id }).then((response) => {
      setIsLoading(false);
      if (response.result) {
        const { experience, error } = response.result.profile_data;
        if (experience.length > 0) {
          setShowExpForm(false);
        }

        if (!error) {
          updateExpCards(experience);
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

  const deleteExperience = (object_id) => {
    setIsLoading(true);
    deleteUserProfileSection({
      user_id: currentUser.user_id,
      delete_key: "experience",
      object_id: object_id,
    }).then((response) => {
      setIsLoading(false);
      const { result, status, error } = response;
      if (!error) {
        if (status === "success") {
          updateExpCards(result.experience);
          if (result.experience.length === 0) {
            setShowExpForm(true);
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
    });
  };

  // used to set the experience in state that needs to get edited
  const editExperience = (object_id) => {
    const selectedExp = expCards.filter((item) => item.object_id === object_id);

    if (selectedExp.length === 1) {
      setExpObjectId(object_id);
      setFormData({ ...selectedExp[0] });
      setShowExpForm(true);
    } else {
      enqueueSnackbar("No such education found", { variant: "error" });
      return;
    }
  };

  const confirmHandler = () => {
    if (expCards.length > 0) {
      history.push("step-four");
    } else {
      enqueueSnackbar("Add atleast one experience or skip", {
        variant: "error",
      });
      return false;
    }
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
        sx={{ pt: "16px", maxWidth: "1330px!important" }}
        style={{
          marginBottom: "120px",
          marginLeft: "0",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} pb={1}>
            <ExperienceSection
              submitForm={submitForm}
              expCards={expCards}
              onDelete={deleteExperience}
              expObjectId={expObjectId}
              showExpForm={showExpForm}
              setShowExpForm={setShowExpForm}
              editExperience={editExperience}
              editData={formData}
            />

            <PaperBase
              style={{
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
                paddingLeft: "0",
                marginLeft: "-10px",
                paddingTop: "0",
                border: "none",
              }}
            >
              <InputLabel
                style={{
                  color: "black",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  background: "#ECECEC",
                  cursor: "pointer",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "500",
                }}
                onClick={() => setShowExpForm(true)}
              >
                {" "}
                <img
                  src={addIcon}
                  alt="add btn"
                  style={{ marginRight: "10px" }}
                />{" "}
                Add Experience{" "}
              </InputLabel>
            </PaperBase>
          </Grid>

          {/* <Grid
            item
            xs={12}
            md={4}
            pb={1}
            style={{ paddingTop: "5px" }}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <UPOTip3 />
          </Grid> */}
        </Grid>
        {matches && (
          <>
            <CustomFab title={`Tips`} handleClick={handleFabClick} />

            <ShowTipsDrawer
              open={openDrawer}
              handleClose={() => setOpenDrawer(false)}
              component={<UPOTip3 noBoxShadow />}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default StepThree;
