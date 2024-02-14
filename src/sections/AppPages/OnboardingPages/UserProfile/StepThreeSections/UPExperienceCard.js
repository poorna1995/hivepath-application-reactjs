import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";

// import company from "assets/svg/user-profile/experienceIcon.svg";
import experienceIcon from "assets/svg/onboarding-pages/user-profile/Experience.svg";

import edit from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";
import close from "assets/svg/onboarding-pages/user-profile/Delete.svg";

import locationIcon from "assets/svg/onboarding-pages/user-profile/location.svg";

import { Grid, Paper, Typography, IconButton } from "@mui/material";
import { useState } from "react";

import { prettyDate } from "../utils/getYears";
import ConfirmDialog from "components/Common/Dialog/ConfirmDialog";
import PaperBase from "components/Common/PaperBase/PaperBase";
import UPExperienceForm from "./UPExperienceForm";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},

  imageContainer: {
    width: "50px",
    background: "#e9f6fe",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    marginLeft: "16px",
    borderRadius: "10px",
    marginRight: "10px",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: " space-between",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      alignItems: "start",
    },
  },
  image: {
    width: "80px",
    height: "80px",
    [theme.breakpoints.down("sm")]: {
      height: "36px",
      width: "36px",
    },
  },
}));

const UPExperienceCard = (props) => {
  const [openDelModal, setOpenDelModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const muiClasses = useStyles();
  const {
    company_name,
    responsibility,
    location,
    start_date,
    end_date,
    duration,
    object_id,
    currently_working_here,
  } = props.data;

  const { onDelete, onEdit, submitForm } = props;

  const onEditHandler = () => {
    // onEdit(object_id);
    setShowEdit(true);
  };

  const openDeleteModal = () => {
    setOpenDelModal(true);
  };

  const onDeleteHandler = () => {
    onDelete(object_id);
    setOpenDelModal(false);
  };

  const startDateFormat = prettyDate(start_date);
  const endDateFormat = prettyDate(end_date);

  let toDate = endDateFormat + " • " + duration;
  if (currently_working_here) {
    toDate = "Present";
  }

  return (
    <PaperBase
      style={{
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "none",
      }}
    >
      <ConfirmDialog
        open={openDelModal}
        setOpen={setOpenDelModal}
        onConfirm={onDeleteHandler}
        message="Are you sure you want to delete the experience?"
      />
      <Grid container spacing={2}>
        {/* <Grid item xs={1} md={1} align="right">
          <img src={experienceIcon} height="40px" />
        </Grid> */}
        <Grid item xs={10} md={10}>
          <div className={muiClasses.avatarContainer}>
            <div className={muiClasses.imageContainer}>
              <img src={experienceIcon} />
            </div>
            <div style={{ flex: 1 }}>
              <Typography
                variant="h6"
                fontWeight="800"
                style={{ fontSize: "22px" }}
              >
                {responsibility}
              </Typography>
              <Typography style={{ fontSize: "16px" }}>
                {company_name}{" "}
              </Typography>

              <Typography fontSize="16px">
                {location}{" "}
                {startDateFormat && `• ${startDateFormat} - ${toDate}`}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={2}
          md={2}
          sx={{
            display: "flex",
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <IconButton
            onClick={onEditHandler}
            style={{
              marginRight: "10px",
              height: "40px",
              width: "40px",
              background: "rgba(0, 0, 0, 0.05)",
            }}
          >
            <img src={edit} />
          </IconButton>
          <IconButton
            onClick={openDeleteModal}
            style={{
              height: "40px",
              width: "40px",
              background: "rgba(0, 0, 0, 0.05)",
            }}
          >
            <img src={close} />
          </IconButton>
        </Grid>

        {showEdit && (
          <Grid item xs={12} md={12} style={{ paddingLeft: "35px" }}>
            <UPExperienceForm
              data={props.data}
              expObjectId={object_id}
              submitForm={submitForm}
              showForm={setShowEdit}
              onDelete={openDeleteModal}
            />
          </Grid>
        )}
      </Grid>
    </PaperBase>
  );
};

export default UPExperienceCard;
