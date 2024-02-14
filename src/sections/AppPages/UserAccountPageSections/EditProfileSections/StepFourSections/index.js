// import classes from "pages/AppPages/UserAccountPages/EditProfile/StepOne.module.css";
// import addPurple from "assets/svg/onboarding-pages/user-profile/addPurple.svg";
import addIcon from "assets/svg/onboarding-pages/user-profile/addBlack.svg";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  InputLabel,
  Paper,
  Typography,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Select from "react-select";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import { useRef } from "react";
import EPSkillForm from "./EPSkillForm";
import PaperBase from "components/Common/PaperBase/PaperBase";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useTheme } from "@mui/styles";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      borderRadius: "10px",
      height: "60px",
    },
  },
  inputFieldFat: {
    "& input": {
      height: "20px !important",
      backgroundColor: "white",
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
    width: "100%",
    height: "60px",
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
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

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

    submitForm([{ skill_name: skill, rating: rating }]).then((res) => {
      if (res) {
        event.target.elements.skill_name.value = "";
        setSkillLevel({ label: "Beginner", value: "Beginner" });
      }
    });
  };

  const skillLevelChangeHandler = (e) => {
    setSkillLevel(e);
  };

  return (
    <Grid container spacing={2} className={muiClasses.root}>
      <Grid item xs={12} md={12} style={{ padding: "0" }}>
        <PaperBase
          style={{
            boxShadow: "none",
            paddingBottom: "0",
            border: "none",
          }}
        >
          <Grid container spacing={2} mb={4}>
            <Grid
              item
              xs={12}
              md={12}
              align="left"
              style={{ paddingLeft: "0", paddingTop: "0" }}
            >
              <Typography
                variant="h6"
                fontWeight="800"
                style={{ fontSize: "26px" }}
              >
                Expertise
              </Typography>

              <Typography>
                Add <strong>new skills</strong> to your profile. Please remember
                to add skills according to the level of expertise you hold in
                them.
                {/* When we say expertise, we are usually referring to skillsets
                that you’ve learned and acquired so far in your respective
                fields of interest.
                <br />
                <br />
                Please provide us with 3 or more such skills with the level of
                expertise you hold in them. */}
              </Typography>
            </Grid>

            {Object.keys(skills).map((item) => {
              if (skills[item].rating && skills[item].rating !== "") {
                return (
                  <Grid item xs={12} md={10} style={{ paddingLeft: "0" }}>
                    <EPSkillForm
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
            paddingLeft: "0",
            paddingTop: "0",
            border: "none",
          }}
        >
          <Grid container spacing={2}>
            {!showForm && (
              <Grid
                item
                xs={12}
                md={8}
                align="left"
                style={{ paddingTop: "0" }}
              >
                <InputLabel
                  style={{
                    marginLeft: "0",
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
                  <span style={{ color: "black" }}>Add Expertise</span>
                </InputLabel>
              </Grid>
            )}

            {showForm && (
              <form
                ref={skillFormRef}
                onSubmit={addSkillHandler}
                style={{ width: "100%" }}
              >
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      name={"skill_name"}
                      placeholder="Eg: React"
                      className={muiClasses.inputFieldFat}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Select
                      name={"rating"}
                      styles={customStylesDropdown}
                      options={skillLevelOptions}
                      onChange={skillLevelChangeHandler}
                      value={skillLevel}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} align="right">
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
