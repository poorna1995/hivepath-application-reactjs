import React from "react";
import { Box, Grid, Avatar, Typography } from "@mui/material";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import titleIcon from "assets/svg/all/new-icons/ks-onboarding/intro/looking-for/title.svg";
import descriptionIcon from "assets/svg/all/new-icons/ks-onboarding/intro/looking-for/description.svg";
import prerequisitesIcon from "assets/svg/all/new-icons/ks-onboarding/intro/looking-for/prerequisites.svg";
import relatedTopicsIcon from "assets/svg/all/new-icons/ks-onboarding/intro/looking-for/related-topics.svg";
import thumbnailsIcon from "assets/svg/all/new-icons/ks-onboarding/intro/looking-for/thumbnails.svg";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import TypographyRenderHTML from "components/Common/Typography/TypographyRenderHTML";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  },
  textContainer: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "16px",
    },
  },
  title: {
    fontWeight: "700",
    fontSize: "21px",
    lineHeight: "27px",
    color: "#000000",
    marginTop: "8px",
    marginBottom: "8px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },
  description: {
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "21px",
    color: "#333333",
    marginBottom: "8px",
  },
}));

const OfferingOnboardingRequirementsSection = () => {
  const classes = useStyles();

  return (
    <Box style={{ paddingBottom: "128px" }}>
      <OnboardingSectionHeadings
        title={`What are we looking for?`}
        description={`Moving along to our next priority now, we have some data requirements. For things to run smoothly, we request the Host to provide the following details for a successful Knowledge Session onboarding -`}
      />

      <Grid container spacing={3} marginTop="16px">
        {lookingForData.map((item) => {
          const { icon, title, description, secondLine } = item;
          return (
            <Grid
              item
              xs={12}
              md={6}
              sm={6}
              style={{
                paddingRight: "16px",
              }}
            >
              <Box className={classes.itemContainer}>
                <Avatar src={icon} />
                <div className={classes.textContainer}>
                  <Typography
                    className={classes.title}
                    // style={titleStyles}
                  >
                    {title}
                  </Typography>
                  <Typography
                    className={classes.description}
                    // style={descriptionStyles}
                  >
                    {description}
                  </Typography>
                  {secondLine && (
                    <TypographyRenderHTML
                      // style={descriptionStyles}
                      description={secondLine}
                    />
                  )}
                </div>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={"/onboarding/ks/intro/about"}
        nextURL={"/onboarding/ks/intro/how-to-create"}
      />
    </Box>
  );
};

export default OfferingOnboardingRequirementsSection;

const lookingForData = [
  {
    icon: titleIcon,
    title: `Title`,
    description: `To have everyone's eyes on your session, a title should be both clear and powerful. Make sure anybody who reads it knows exactly what the session is about.
    `,
  },
  {
    icon: descriptionIcon,
    title: `Description`,
    description: `For your audience to get interested, you can always use the power of words. Describe the session's key takeaways, benefits, and list your experiences. 
    `,
  },
  {
    icon: relatedTopicsIcon,
    title: `Related Topics`,
    description: `Connect to a wider audience by branching out to other topics related to your session. Make sure you put them in hashtags! \n
    
    `,
    secondLine: `<b>Eg:</b>  # Machine learning,  # Forecasting,  # Data science,  #Engineering #Supply chain.
    `,
  },
  {
    icon: prerequisitesIcon,
    title: `Prerequisites`,
    description: `This one is skippable but for the sessions where you believe you need to put a few benchmarks for those who can join your session, then this is it.
    `,
  },
  {
    icon: thumbnailsIcon,
    title: `Thumbnails`,
    description: `Visual representations go way beyond words so make sure you add clear yet eye-catching images to attract your audience.
    `,
  },
];
