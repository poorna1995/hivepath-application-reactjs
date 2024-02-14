// import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
// import graduate from "assets/images/onboarding-pages/user-profile/graduate.jpg";
// import graduate from "assets/svg/user-profile/educationIcon.svg";
// import educationIcon from "assets/images/user-profile/education.png";
// import close from "assets/svg/onboarding-pages/knowledge-session/delete-icon.svg";
import educationIcon from "assets/svg/onboarding-pages/user-profile/book.svg";
import edit from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";
import close from "assets/svg/onboarding-pages/user-profile/Delete.svg";

import { Grid, Paper, Typography, IconButton } from "@mui/material";
import ConfirmDialog from "components/Common/Dialog/ConfirmDialog";
import { useState } from "react";
import PaperBase from "components/Common/PaperBase/PaperBase";
import UPEducationForm from "./UPEducationForm";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {
    width: "50px",
    background: "#FEF5E6",

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
    alignItems: "center",
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
  paperComponent: {
    marginTop: "30px",
    padding: "50px 50px 50px 25px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.4)",
    border: "2px solid #ffffff",
    boxSizing: "border-box",
    boxShadow: "0px 0px 50px 5px rgba(72, 74, 158, 0.06)",
    borderRadius: "20px",
    "& form": { width: "100%" },
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
  customForm2: {
    "& label": {
      marginLeft: "0",
      fontWeight: "500 !important",
      color: "black",
    },
  },
}));

const UPEducationCard = (props) => {
  const muiClasses = useStyles();
  const [openDelModal, setOpenDelModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const {
    college_name,
    degree_name,
    field_of_study,
    start_date,
    end_date,
    description,
    object_id,
    currently_studying_here,
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

  return (
    <PaperBase
      className={`${muiClasses.customForm2} ${muiClasses.paperComponent}`}
      style={{
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "none",
        // paddingBottom: "0",
      }}
    >
      <ConfirmDialog
        open={openDelModal}
        setOpen={setOpenDelModal}
        onConfirm={onDeleteHandler}
        message="Are you sure you want to delete the education?"
      />

      <Grid container spacing={2}>
        <Grid item xs={10} md={10} alignItems="start">
          <div className={muiClasses.avatarContainer}>
            <div className={muiClasses.imageContainer}>
              <img src={educationIcon} alt="" />
            </div>
            <div style={{ flex: 1, marginLeft: "8px" }}>
              <Typography
                variant="h6"
                fontWeight="800"
                sx={{ fontSize: { md: "21px", xs: "16px" } }}
              >
                {college_name}
              </Typography>

              <Typography sx={{ fontSize: { md: "16px", xs: "14px" } }}>
                {degree_name}, {field_of_study}
              </Typography>

              <Typography sx={{ fontSize: { md: "16px", xs: "14px" } }}>
                {start_date.split("-")[0]} - {end_date.split("-")[0]}{" "}
                {currently_studying_here && "(Present)"}
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
              height: "40px",
              width: "40px",
              background: "rgba(0, 0, 0, 0.05)",
              marginRight: "10px",
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
          <Grid item xs={12} md={12} style={{ paddingTop: "0" }}>
            <UPEducationForm
              eduObjectId={object_id}
              data={props.data}
              showFormHandler={setShowEdit}
              submitForm={submitForm}
            />
          </Grid>
        )}
      </Grid>
    </PaperBase>
  );
};

export default UPEducationCard;
