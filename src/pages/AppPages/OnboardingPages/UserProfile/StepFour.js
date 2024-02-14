// import classes from "./StepOne.module.css";
import {
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout";
import UserProfileOnboardingLayout from "Layouts/UserLayout/UserProfileOnboardingLayout";
import SkillSection from "sections/AppPages/OnboardingPages/UserProfile/StepFourSections/SkillSection";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";

import UPOTip4 from "sections/AppPages/OnboardingPages/UserProfile/components/Tips/UPOTip4";
import {
  addUserProfile,
  deleteUserProfileSection,
  fetchUserProfile,
  updateUserProfile,
} from "sections/AppPages/OnboardingPages/UserProfile/utils/fetchOnboarding";
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

const StepFour = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidate, setValidate] = useState(false);
  const [isSkillsAvailable, setIsSkillsAvailable] = useState(false);

  const [skills, setSkills] = useState({});
  const enqueueSnackbar = useEnquequeSnackbar();

  const { currentUser } = useSelector(mapState);
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  //   console.log(skills);
  const updateSkills = (resSkills) => {
    let updatedSkills = {};
    let localSkills = {};
    for (let skill of resSkills) {
      updatedSkills[skill.object_id] = {
        ...skill,
        rating: { label: skill.rating, value: skill.rating },
      };
    }

    if (Object.keys(resSkills).length === 0) {
      addSkillInput();
    }

    for (let skillKey of Object.keys(skills)) {
      if (!skills[skillKey].object_id) {
        let skill = skills[skillKey];
        localSkills[skillKey] = {
          ...skill,
        };
      }
    }
    // console.log(updatedSkills)

    setSkills({ ...updatedSkills, ...localSkills });
  };

  const addSkillInput = (skill_name, rating) => {
    const randomId = Math.random().toString(36).slice(2);
    const newInput = {
      [randomId]: {
        skill_name: skill_name,
        rating: { label: rating, value: rating },
      },
    };
    setSkills((state) => {
      return { ...state, ...newInput };
    });
  };

  const deleteInput = (id) => {
    setIsLoading(true);
    if (id in skills) {
      if ("object_id" in skills[id]) {
        // skill is on the server, will make api call here
        deleteUserProfileSection({
          user_id: currentUser.user_id,
          delete_key: "skills",
          object_id: skills[id]["object_id"],
        }).then((response) => {
          setIsLoading(false);
          const { result, status, error } = response;
          if (!error) {
            if (status === "success") {
              updateSkills(result.skills);
              if (result.skills.length === 0) {
                // addSkillInput();
              } else {
                setIsSkillsAvailable(true);
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
      } else {
        let updatedSkills = { ...skills };
        delete updatedSkills[id];
        setSkills((state) => updatedSkills);
      }
      setIsLoading(false);
    } else {
      enqueueSnackbar("No such question found", { variant: "error" });
      return;
    }
  };

  const fetchProfileHandler = () => {
    setIsLoading(true);
    fetchUserProfile({ user_id: currentUser.user_id }).then((response) => {
      setIsLoading(false);
      if (response.result) {
        const { skills, error } = response.result.profile_data;
        if (!error) {
          updateSkills(skills);
          if (skills.length > 0) {
            setIsSkillsAvailable(true);
          }
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
    // event.preventDefault();
    let skillsData = [];
    for (let item in skills) {
      if (!("object_id" in skills[item])) {
        if (skills[item].skill_name === "" || skills[item].rating === "") {
          enqueueSnackbar("Name and level cannot be empty", {
            variant: "error",
          });
          setValidate(true);
          return false;
        }
        skillsData.push({ ...skills[item], rating: skills[item].rating.value });
      }
    }

    setIsLoading(true);
    let requestData = {
      user_id: currentUser.user_id,
      skills: skillsData,
    };

    // console.log(skillsData);
    const res = addUserProfile(requestData).then((response) => {
      setIsLoading(false);
      const { result, error } = response;
      if (error) {
        enqueueSnackbar(error, { variant: "error" });
        return false;
      } else {
        // move to next step here
        // adding the recently added skills to state
        updateSkills(result.skills);
        history.push("step-five");
        return true;
      }
    });
    return res;
  };

  const changeHandler = (e) => {
    let input = { [e.target.name]: e.target.value };
    let updatedState = {
      ...skills,
      [e.target.id]: { ...skills[e.target.id], ...input },
    };

    setValidate(false);
    setSkills((state) => {
      return { ...updatedState };
    });
  };

  const changeDropDownHandler = (target, id) => {
    let updatedState = { ...skills, [id]: { ...skills[id], rating: target } };

    setSkills((state) => {
      return { ...updatedState };
    });
  };

  const confirmHandler = () => {
    if (Object.keys(skills).length > 0) {
      history.push("step-five");
    } else {
      enqueueSnackbar("Add atleast one skill or skip", { variant: "error" });
      return false;
    }
  };

  const updateSkillHandler = async (data, object_id) => {
    let skill = data;
    if (skill) {
      const { skill_name, rating } = skill;
      let requestObj = {
        user_id: currentUser.user_id,
        update: "skills",
        skill_name: skill_name,
        rating: rating,
        object_id: object_id,
      };

      setIsLoading(true);
      updateUserProfile(requestObj).then((response) => {
        setIsLoading(false);
        if (response.result) {
          const { result, error } = response;
          const { skills } = result;

          if (!error) {
            updateSkills(skills);
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
      enqueueSnackbar("No such skill found", { variant: "error" });
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
    <UserProfileLayout title="User Profile Onboarding | Hivepath">
      <LoadingBackdrop open={isLoading} />
      <Container
        sx={{ pt: "16px" }}
        className="center"
        style={{ marginBottom: "120px" }}
      >
        <UserProfileOnboardingLayout active={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <SkillSection
                submitForm={submitForm}
                skills={skills}
                addSkillInput={addSkillInput}
                deleteInput={deleteInput}
                onInputChange={changeHandler}
                onDropdownChange={changeDropDownHandler}
                onUpdate={updateSkillHandler}
                isValidate={isValidate}
              />
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
              <UPOTip4 />
            </Grid>
          </Grid>
        </UserProfileOnboardingLayout>
      </Container>
      <Grid
        container
        spacing={2}
        className={classes.footerContainer}
        style={{ height: "80px" }}
      >
        <Grid
          item
          xs={12}
          md={12}
          align="center"
          className={`center ${classes.footer}`}
        >
          {Object.keys(skills).length === 0 && (
            <OutlinedButton
              title="Skip"
              style={{ width: "100px", height: "50px", color: "black" }}
              onClick={() => {
                history.push("step-five");
              }}
            />
          )}
          <PrimaryButton
            title="Continue"
            style={{ width: "100px", height: "50px", marginLeft: "10px" }}
            onClick={submitForm}
            disabled={Object.keys(skills).length === 0}
          />
        </Grid>
      </Grid>
      {matches && (
        <>
          {" "}
          <CustomFab title={`Tips`} handleClick={handleFabClick} />
          <ShowTipsDrawer
            open={openDrawer}
            handleClose={() => setOpenDrawer(false)}
            component={<UPOTip4 noBoxShadow />}
          />
        </>
      )}
    </UserProfileLayout>
  );
};

export default StepFour;
