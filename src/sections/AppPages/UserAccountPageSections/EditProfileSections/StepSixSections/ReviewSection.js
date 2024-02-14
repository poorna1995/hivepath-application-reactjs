import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
import { Grid } from "@mui/material";
import basic from "assets/svg/onboarding-pages/user-profile/basic.svg";
import educationIcon from "assets/svg/onboarding-pages/user-profile/education.svg";
import skillsIcon from "assets/svg/onboarding-pages/user-profile/skills.svg";
import social from "assets/svg/onboarding-pages/user-profile/social.svg";
import work from "assets/svg/onboarding-pages/user-profile/work.svg";
import { Link } from "react-router-dom";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";

import ReviewItem from "./ReviewItem";
const ReviewSection = (props) => {
  const { submitForm, stageData } = props;
  const { education, experience, skills, social_media_links } = stageData;

  return (
    <Grid container spacing={2} className={classes.reviewContainer}>
      <Grid item xs={12} md={3}>
        <ReviewItem title="Basic Details" icon={basic} stageStat={true} />
      </Grid>
      <Grid item xs={12} md={2}>
        <ReviewItem
          title="Education Details"
          icon={educationIcon}
          stageStat={education}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <ReviewItem
          title="Work Experience"
          icon={skillsIcon}
          stageStat={experience}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <ReviewItem title="Skills" icon={social} stageStat={skills} />
      </Grid>
      <Grid item xs={12} md={3}>
        <ReviewItem
          title="Social Media Accounts"
          icon={work}
          stageStat={social_media_links}
        />
      </Grid>

      <Grid item xs={12} md={12} align="center">
        {/* <Link to="success"> */}
        <PrimaryButton
          title="Submit for approval"
          style={{
            width: "auto",
            height: "50px",
            marginLeft: "10px",
          }}
          onClick={submitForm}
        />
        {/* </Link> */}
      </Grid>
    </Grid>
  );
};

export default ReviewSection;
