// import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
// import addPurple from "assets/svg/onboarding-pages/user-profile/addPurple.svg";
import addIcon from "assets/svg/onboarding-pages/user-profile/addBlack.svg";

import { useSelector } from "react-redux";
import {
  Grid,
  InputLabel,
  Paper,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import Select from "react-select";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import UPSkillForm from "./UPSkillForm";
import PaperBase from "components/Common/PaperBase/PaperBase";

import { useState } from "react";
import { useRef } from "react";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: "10px",
    },
  },
  customForm: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    "& label": {
      fontWeight: "bold !important",
      marginTop: "10px",
      marginLeft: "25px",
      color: "black !important",
    },
    "& textarea": {
      width: "100%",
      height: "150px",
      padding: "5px 10px",
      fontFamily: "inherit",
    },
  },
}));

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const customStylesDropdown = {
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "10px",
    height: "55px",
    ":hover": {
      borderColor: "black",
    },
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};
const customStylesDropdownError = {
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "10px",
    borderColor: "#b00020",
    ":hover": {
      borderColor: "#b00020",
    },
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};

const skillLevelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
];

const SkillSection = (props) => {
  const muiClasses = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [skillLevel, setSkillLevel] = useState({
    label: "Beginner",
    value: "Beginner",
  });
  const skillFormRef = useRef();
  const enqueueSnackbar = useEnquequeSnackbar();

  const {
    submitForm,
    skills,
    addSkillInput,
    deleteInput,
    onInputChange,
    onDropdownChange,
    onUpdate,
    isValidate,
  } = props;
  const { currentUser } = useSelector(mapState);

  const addSkillHandler = (event) => {
    event.preventDefault();
    const skill = event.target.elements.skill_name.value;
    const rating = event.target.elements.rating.value;

    if (skill === "" || rating === "") {
      enqueueSnackbar("Name and level cannot be empty", {
        variant: "error",
      });
      return false;
    }

    addSkillInput(skill, rating);
    event.target.elements.skill_name.value = "";
    setSkillLevel({ label: "Beginner", value: "Beginner" });
  };

  const skillLevelChangeHandler = (e) => {
    setSkillLevel(e);
  };

  return (
    <Grid
      container
      spacing={2}
      className={`${muiClasses.root} ${muiClasses.customForm}`}
    >
      <Grid item xs={12} md={12}>
        <PaperBase
          style={{
            boxShadow: "none",
            paddingBottom: "0",
            border: "none",
          }}
        >
          <Grid container spacing={2} pl={1} mb={4}>
            <Grid item xs={12} md={12} align="left">
              <Typography
                variant="h6"
                fontWeight="800"
                style={{ fontSize: "26px" }}
              >
                Expertise
              </Typography>

              <Typography mb={2}>
                When we say expertise, we are usually referring to skillsets
                that you’ve learned and acquired so far in your respective
                fields of interest.
              </Typography>
              <Typography>
                Please provide us with 3 or more such skills with the level of
                expertise you hold in them.{" "}
              </Typography>
            </Grid>

            {Object.keys(skills).map((item) => {
              if (skills[item].rating && skills[item].rating !== "") {
                return (
                  <Grid item xs={12} md={12}>
                    <UPSkillForm
                      key={item}
                      data={skills[item]}
                      id={item}
                      onDelete={deleteInput}
                      customStylesDropdown={customStylesDropdown}
                      customStylesDropdownError={customStylesDropdownError}
                      onInputChange={onInputChange}
                      onDropdownChange={onDropdownChange}
                      onUpdate={onUpdate}
                      isValidate={isValidate}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </PaperBase>

        <PaperBase
          style={{
            boxShadow: "none",
            // paddingLeft: "0",
            paddingTop: "0",
            border: "none",
          }}
        >
          <Grid container spacing={2}>
            {!showForm && (
              <Grid
                item
                xs={12}
                md={12}
                align="left"
                style={{ paddingTop: "0" }}
              >
                <InputLabel
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "fit-content",
                    background: "#ECECEC",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontWeight: "500",
                  }}
                  onClick={() => setShowForm(true)}
                >
                  {" "}
                  <img
                    src={addIcon}
                    alt="add icon"
                    style={{ marginRight: "10px" }}
                  />{" "}
                  <span style={{ color: "black" }}>Add expertise</span>
                </InputLabel>
              </Grid>
            )}

            {showForm && (
              <form
                ref={skillFormRef}
                onSubmit={addSkillHandler}
                style={{ width: "100%" }}
              >
                <Grid container spacing={2} p={2} style={{ marginLeft: "0" }}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      name={"skill_name"}
                      placeholder="Eg: React"
                      //   className={classes.inputFieldFat}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Select
                      name={"rating"}
                      styles={customStylesDropdown}
                      options={skillLevelOptions}
                      onChange={skillLevelChangeHandler}
                      value={skillLevel}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <PrimaryButton title="Save" type="submit" />
                    <OutlinedButton
                      title="Cancel"
                      style={{ marginLeft: "10px" }}
                      onClick={() => setShowForm(false)}
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>
        </PaperBase>
      </Grid>
    </Grid>
  );
};

export default SkillSection;
