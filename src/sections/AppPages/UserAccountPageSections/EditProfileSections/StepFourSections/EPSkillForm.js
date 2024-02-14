import classes from "pages/AppPages/UserAccountPages/EditProfile/StepOne.module.css";
// import bin from "assets/svg/scheduler-icons/bin.svg";
import bin from "assets/svg/onboarding-pages/user-profile/Delete.svg";
// import editIcon from "assets/svg/onboarding-pages/user-profile/edit.svg";
import editIcon from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";
import checkIcon from "assets/svg/user-account/edit-profile/check.svg";
import closeIcon from "assets/svg/user-account/edit-profile/close.svg";

// import checkIcon from "assets/svg/check.svg";
import dragIcon from "assets/svg/user-account/edit-profile/dragIcon.svg";

import { Grid, TextField, IconButton, Paper, Chip } from "@mui/material";
import Select from "react-select";
import { useState } from "react";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import ConfirmDialog from "components/Common/Dialog/ConfirmDialog";

import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .css-b62m3t-container": {
      width: "49%",
      marginLeft: "10px",
      height: "60px",
      "& .css-dnb535-control": {
        height: "100%",
      },
    },
    "& .MuiTextField-root": {
      width: "50%",
      height: "60px",
    },
    "& .MuiInputBase-root": {
      backgroundColor: "white",
      borderRadius: "10px",
      height: "100%",
    },
  },
}));

const skillLevelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
];

const SkillForm = (props) => {
  const muiClasses = useStyles();

  const {
    customStylesDropdown,
    customStylesDropdownError,
    onDelete,
    id,
    onInputChange,
    onDropdownChange,
    data,
    onUpdate,
    isValidate,
  } = props;

  const [openDelModal, setOpenDelModal] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const enqueueSnackbar = useEnquequeSnackbar();
  const { rating, skill_name, object_id } = data;

  const [isEdit, setIsEdit] = useState(false);
  let skillError = false;
  let levelError = false;
  if (isValidate) {
    if (skill_name === "") {
      skillError = true;
    }
    if (rating === "") {
      levelError = true;
    }
  }

  const openDeleteModal = () => {
    setOpenDelModal(true);
  };

  const deleteSkill = () => {
    onDelete(id);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    const skill = event.target.elements.skill_name.value;
    const rating = event.target.elements.rating.value;

    if (skill === "" || rating === "") {
      enqueueSnackbar("Skill and level cannot be empty", {
        variant: "error",
      });
      return false;
    }

    onUpdate({ skill_name: skill, rating: rating }, object_id).then((res) => {
      setIsEdit(false);
    });
  };

  return (
    <Grid
      container
      spacing={2}
      mb={3}
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
      pr={2}
      style={{ marginBottom: "0" }}
      className={` ${muiClasses.root}`}
    >
      <ConfirmDialog
        open={openDelModal}
        setOpen={setOpenDelModal}
        onConfirm={deleteSkill}
        message="Are you sure you want to delete the skill?"
      />
      {/* <Grid item xs={1} md={1} style={{ display: "flex" }}>
        <IconButton>
          <img src={dragIcon} height="24px" />
        </IconButton>
      </Grid> */}

      <Grid item xs={12} md={12}>
        {!isEdit && (
          <Paper
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "none",

              borderRadius: "15px",
              padding: "15px",
              paddingLeft: "20px",
              minHeight: "80px",
            }}
          >
            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={4} md={4} style={{ fontSize: "17px" }}>
                <strong>{skill_name}</strong>
              </Grid>

              <Grid item xs={4} md={4}>
                {/* {!showAction && ( */}
                <Chip
                  label={<strong>{rating.label}</strong>}
                  className={`${classes[rating.label]}`}
                  style={{ height: "40px" }}
                />
              </Grid>
              <Grid
                item
                xs={4}
                md={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // display: showAction ? "block" : "none",
                  }}
                >
                  <IconButton
                    onClick={openDeleteModal}
                    style={{
                      marginRight: "10px",
                      height: "40px",
                      width: "40px",
                      background: "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <img src={bin} height="24px" />
                  </IconButton>

                  <IconButton
                    onClick={() => setIsEdit(true)}
                    style={{
                      height: "40px",
                      width: "40px",
                      background: "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <img src={editIcon} height="24px" />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Paper>
        )}

        {isEdit && (
          <form onSubmit={updateHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={10} style={{ display: "flex" }}>
                <TextField
                  name={"skill_name"}
                  defaultValue={skill_name}
                  placeholder="Eg: React"
                  className={classes.inputFieldFat}
                />
                <Select
                  defaultValue={rating}
                  name={"rating"}
                  id={id}
                  styles={customStylesDropdown}
                  options={skillLevelOptions}
                />
              </Grid>

              <Grid
                item
                xs={2}
                md={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <IconButton
                  type="submit"
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    height: "26px",
                    width: "26px",
                  }}
                >
                  <img src={checkIcon} />
                </IconButton>

                <IconButton
                  onClick={() => setIsEdit(false)}
                  style={{ height: "26px", width: "26px" }}
                >
                  <img src={closeIcon} />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Grid>
    </Grid>
  );
};

export default SkillForm;
