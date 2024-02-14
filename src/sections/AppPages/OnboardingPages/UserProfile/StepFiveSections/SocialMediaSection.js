import { Grid, Paper, InputLabel, Typography } from "@mui/material";
// import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
import { useSelector } from "react-redux";

import TextInputIcon from "components/Common/Inputs/TextInput/TextInputIcon";
import linkedin from "assets/svg/social-icons/linkedinhigh.svg";
import fb from "assets/svg/social-icons/facebookhigh.svg";
import insta from "assets/svg/social-icons/insta.svg";
import git from "assets/svg/social-icons/git.svg";
import twitter from "assets/svg/social-icons/twitter.svg";
import website from "assets/svg/social-icons/website.svg";
import portfolio from "assets/svg/social-icons/portfolio.svg";

import UPSocialMediaInput from "./UPSocialMediaInput";
import PaperBase from "components/Common/PaperBase/PaperBase";

import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
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

const SocialMediaSection = (props) => {
  const classes = useStyles();
  const { formData, submitForm, onInputChange, onUpdate, validateLinks } =
    props;

  const fbRegex =
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/;
  const instaRegex = /(https?:\/\/(?:www\.)?instagram\.com\/([^/?#&]+)).*/;

  const twitterRegex =
    /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
  const linkedinRegex =
    /(ftp|http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  const gitRegex =
    /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i;
  const urlRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  return (
    <Grid container spacing={2} className={classes.customForm}>
      {/* <form onSubmit={handleForm}> */}

      <Grid
        item
        xs={12}
        md={12}
        mb={3}
        align="left"
        style={{ paddingLeft: "0" }}
      >
        <Typography variant="h6" fontWeight="800" style={{ fontSize: "26px" }}>
          Social media
        </Typography>
        <Typography>
          Connect with us socially by providing your social media accounts that
          you’d like to display in your Hivepath profile. This helps us expand
          your engagement to other platforms!
        </Typography>
      </Grid>

      <div style={{ width: "100%" }}>
        <PaperBase
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "none",
            paddingBottom: "0",
          }}
        >
          <Grid container spacing={2} p={2} pb={0}>
            <Grid
              item
              xs={12}
              md={4}
              align="left"
              sx={{
                marginLeft: {
                  md: "auto",
                  xs: "-32px",
                },
              }}
            >
              <InputLabel style={{ marginTop: "0" }}>
                Professional profiles{" "}
              </InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <UPSocialMediaInput
                  object_id={formData.linkedin.object_id}
                  name={"linkedin"}
                  value={formData.linkedin.link}
                  placeholder="Linkedin URL"
                  icon={linkedin}
                  onChange={onInputChange}
                  onUpdate={onUpdate}
                  validateRegex={linkedinRegex}
                  validateLinks={validateLinks}
                />

                <UPSocialMediaInput
                  object_id={formData.github.object_id}
                  name={"github"}
                  value={formData.github.link}
                  placeholder="Github URL"
                  icon={git}
                  onChange={onInputChange}
                  onUpdate={onUpdate}
                  validateRegex={gitRegex}
                  validateLinks={validateLinks}
                />

                <UPSocialMediaInput
                  object_id={formData.portfolio.object_id}
                  name={"portfolio"}
                  value={formData.portfolio.link}
                  placeholder="Dribble URL"
                  icon={portfolio}
                  onChange={onInputChange}
                  onUpdate={onUpdate}
                  validateRegex={urlRegex}
                  validateLinks={validateLinks}
                />

                <UPSocialMediaInput
                  object_id={formData.website.object_id}
                  name={"website"}
                  value={formData.website.link}
                  placeholder="Website URL"
                  icon={website}
                  onChange={onInputChange}
                  onUpdate={onUpdate}
                  validateRegex={urlRegex}
                  validateLinks={validateLinks}
                />
              </Grid>
            </Grid>
          </Grid>
        </PaperBase>

        <PaperBase
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "none",
            paddingBottom: "0",
          }}
        >
          <Grid container spacing={2} p={2} pb={0}>
            <Grid
              item
              xs={12}
              md={4}
              align="left"
              sx={{
                marginLeft: {
                  md: "auto",
                  xs: "-32px",
                },
              }}
            >
              <InputLabel style={{ marginTop: "0" }}>
                Personal profiles{" "}
              </InputLabel>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <UPSocialMediaInput
                  object_id={formData.facebook.object_id}
                  name={"facebook"}
                  value={formData.facebook.link}
                  placeholder={"Facebook URL"}
                  icon={fb}
                  onChange={onInputChange}
                  onUpdate={onUpdate}
                  validateRegex={fbRegex}
                  validateLinks={validateLinks}
                />

                <UPSocialMediaInput
                  object_id={formData.instagram.object_id}
                  name={"instagram"}
                  value={formData.instagram.link}
                  placeholder="Instagram URL"
                  icon={insta}
                  onChange={onInputChange}
                  onUpdate={onUpdate}
                  validateRegex={instaRegex}
                  validateLinks={validateLinks}
                />

                <UPSocialMediaInput
                  object_id={formData.twitter.object_id}
                  name={"twitter"}
                  value={formData.twitter.link}
                  placeholder="Twitter URL"
                  icon={twitter}
                  onChange={onInputChange}
                  onUpdate={onUpdate}
                  validateRegex={twitterRegex}
                  validateLinks={validateLinks}
                />
              </Grid>
            </Grid>
          </Grid>
        </PaperBase>
      </div>
    </Grid>
  );
};

export default SocialMediaSection;
