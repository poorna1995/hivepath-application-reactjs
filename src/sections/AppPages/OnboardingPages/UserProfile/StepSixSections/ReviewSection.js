// import basic from "assets/svg/onboarding-pages/user-profile/basic.svg";
// import educationIcon from "assets/svg/onboarding-pages/user-profile/education.svg";
// import skillsIcon from "assets/svg/onboarding-pages/user-profile/skills.svg";
// import social from "assets/svg/onboarding-pages/user-profile/social.svg";
// import work from "assets/svg/onboarding-pages/user-profile/work.svg";

// import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
import { Grid } from "@mui/material";

import basic from "assets/svg/all/new-icons/profile-onboarding/general.svg";
import educationIcon from "assets/svg/all/new-icons/profile-onboarding/education.svg";
import skillsIcon from "assets/svg/all/new-icons/profile-onboarding/expertise.svg";
import social from "assets/svg/all/new-icons/profile-onboarding/social.svg";
import work from "assets/svg/all/new-icons/profile-onboarding/experience.svg";

import { Link } from "react-router-dom";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";

import ReviewItem from "./ReviewItem";
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

const ReviewSection = (props) => {
  const classes = useStyles();
  const { submitForm, stageData } = props;
  const { education, experience, skills, social_media_links } = stageData;
  const reviewData = [
    {
      title: "General",
      icon: basic,
      stageStat: true,
      bg: "#FBF7FF",
    },
    {
      title: "Experience",
      icon: educationIcon,
      stageStat: education,
      bg: "#FFF7F1",
    },
    {
      title: "Education",
      icon: work,
      stageStat: experience,
      bg: "#EFF9FF",
    },
    {
      title: "Expertise",
      icon: skillsIcon,
      stageStat: skills,
      bg: "#F6FFF1",
    },
    {
      title: "Social Media",
      icon: social,
      stageStat: social_media_links,
      bg: "#FFF1F1",
    },
  ];

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {reviewData.map((item, index) => {
          const { title, icon, stageStat, bg } = item;
          return (
            <ReviewItem
              title={title}
              icon={icon}
              stageStat={stageStat}
              bg={bg}
              index={index}
            />
          );
        })}
      </Grid>
      <Grid container spacing={2} className={classes.footerContainer}>
        <Grid
          item
          xs={12}
          md={12}
          align="center"
          mt={5}
          className={`center ${classes.footer}`}
        >
          <PrimaryButton
            title="Submit"
            onClick={submitForm}
            // style={{
            //   width: "auto",
            //   height: "50px",
            //   marginLeft: "10px",
            // }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewSection;
