import classes from "pages/AppPages/UserAccountPages/EditProfile/StepOne.module.css";
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
    },
    "& .MuiTextField-root": {
      width: "50%",
    },
    "& .MuiInputBase-root": {
      //   height: "20px",
      backgroundColor: "white",
      borderRadius: "10px",
      //   width: "50%",
    },
  },
}));

const skillLevelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
];

const UPSkillForm = (props) => {
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
              <Grid item xs={4} md={4}>
                <strong>{skill_name}</strong>
              </Grid>
              <Grid item xs={4} md={4}>
                {/* {!showAction && ( */}
                <Chip
                  label={<strong>{rating.label}</strong>}
                  className={`${classes[rating.label]}`}
                  style={{ height: "40px" }}
                />
                {/* )} */}
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // visibility: showAction ? "visible" : "hidden",
                    display: showAction ? "block" : "none",
                  }}
                >
                  <IconButton onClick={() => setIsEdit(true)}>
                    <img src={editIcon} height="24px" />
                  </IconButton>
                  <IconButton onClick={openDeleteModal}>
                    <img src={bin} height="24px" />
                  </IconButton>
                </div> */}
              </Grid>
              <Grid
                item
                xs={4}
                md={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                  //   visibility: showAction ? "visible" : "hidden",
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
              </Grid>
            </Grid>
          </Paper>
        )}

        {isEdit && (
          <form onSubmit={updateHandler}>
            <Grid
              container
              spacing={2}
              style={{ padding: "15px 15px 15px 0px" }}
            >
              <Grid item xs={12} md={10} style={{ display: "flex" }}>
                <TextField
                  name={"skill_name"}
                  defaultValue={skill_name}
                  placeholder="Eg: React"
                  //   className={classes.inputFieldFat}
                  //   error={skillError}
                  //   helperText={skillError ? "Skill name is required" : ""}
                />
                <Select
                  defaultValue={rating}
                  name={"rating"}
                  id={id}
                  styles={
                    customStylesDropdown
                    // levelError
                    //   ? customStylesDropdownError
                    //   : customStylesDropdown
                  }
                  //   closeMenuOnSelect
                  options={skillLevelOptions}
                  //   onChange={(target) => onDropdownChange(target, id)}
                />
              </Grid>
              {/* <Grid item xs={12} md={5} align="left">
              </Grid> */}
              <Grid item xs={12} md={2}>
                <IconButton type="submit">
                  <img src={checkIcon} height="26px" />
                </IconButton>

                <IconButton onClick={() => setIsEdit(false)}>
                  <img src={closeIcon} height="16px" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Grid>

      {/* <Grid item xs={12} md={2} align="center">
        {!isEdit && (
          <IconButton onClick={openDeleteModal}>
            <img src={bin} height="24px" />
          </IconButton>
        )}
        {object_id && !isEdit && (
          <IconButton onClick={() => setIsEdit(true)}>
            <img src={editIcon} height="24px" />
          </IconButton>
        )}

        {object_id && isEdit && (
          <IconButton onClick={updateHandler} style={{ background: "black" }}>
            <img src={checkIcon} height="14px" />
          </IconButton>
        )}
      </Grid> */}
    </Grid>
  );
};

export default UPSkillForm;
