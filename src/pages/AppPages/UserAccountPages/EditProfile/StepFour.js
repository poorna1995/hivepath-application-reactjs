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

// import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout";
// import UserProfileOnboardingLayout from "Layouts/UserLayout/UserProfileOnboardingLayout";
// import PrimaryButton from "components/Common/Buttons/PrimaryButton";
// import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import SkillSection from "sections/AppPages/UserAccountPageSections/EditProfileSections/StepFourSections/";
import UPOTip4 from "sections/AppPages/OnboardingPages/UserProfile/components/Tips/UPOTip4";

import {
  addUserProfile,
  deleteUserProfileSection,
  fetchUserProfile,
  updateUserProfile,
} from "sections/AppPages/OnboardingPages/UserProfile/utils/fetchOnboarding";
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

const StepFour = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidate, setValidate] = useState(false);
  const [isSkillsAvailable, setIsSkillsAvailable] = useState(false);
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const [skills, setSkills] = useState({});
  const enqueueSnackbar = useEnquequeSnackbar();

  const { currentUser } = useSelector(mapState);

  //   console.log(skills);
  const updateSkills = (skills) => {
    let updatedSkills = {};
    for (let skill of skills) {
      updatedSkills[skill.object_id] = {
        ...skill,
        rating: { label: skill.rating, value: skill.rating },
      };
    }

    if (Object.keys(skills).length === 0) {
      addSkillInput();
    }
    // console.log(updatedSkills)

    setSkills(updatedSkills);
  };

  const addSkillInput = () => {
    const randomId = Math.random().toString(36).slice(2);
    const newInput = { [randomId]: { skill_name: "", rating: "" } };
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
                addSkillInput();
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
          if (skills.length === 0) {
            addSkillInput();
          } else {
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

  const submitForm = async (data) => {
    // event.preventDefault();
    // let skillsData = [];
    // if (data.skill_name === "" || data.rating === "") {
    //   enqueueSnackbar("Name and level cannot be empty", {
    //     variant: "error",
    //   });
    //   setValidate(true);
    //   return false;
    // }

    setIsLoading(true);
    let requestData = {
      user_id: currentUser.user_id,
      skills: data,
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
        updateSkills(result.skills);
        enqueueSnackbar("Succesfully updated details", { variant: "success" });
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
    let skill = data; //skills[object_id];
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
            enqueueSnackbar("Skill updated succesfully", {
              variant: "success",
            });
            updateSkills(skills);
            if (skills.length === 0) {
              addSkillInput();
            }
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
            <UPOTip4 />
          </Grid> */}
        </Grid>
      </Container>

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
    </>
  );
};

export default StepFour;
