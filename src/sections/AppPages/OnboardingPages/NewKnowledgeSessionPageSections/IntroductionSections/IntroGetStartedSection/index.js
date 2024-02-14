import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import { makeStyles } from "@mui/styles";
const textStyles = {
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: "27px",
  color: "#333333",
  paddingTop: "16px",
  paddingBottom: "16px",
};

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "128px", paddingTop: "32px" },
  gridContainer: {
    maxWidth: "80%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  itemContainer: {
    background: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: " 10px",
    width: "270px",
    height: "70px",
    display: "grid",
    placeItems: "center",
    margin: "8px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      // height: "50px",
      padding: "8px",
    },
  },
  content: {
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "23px",
    textAlign: "center",

    color: "#222222",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      lineHeight: "18px",
    },
  },
}));

const IntroGetStartedSection = () => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    fetch("https://utils.hivepath.io/api/fetchSessionTypes")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.result);
        console.log(json);
      });
  }, []);

  return (
    <Box className={classes.root}>
      <OnboardingSectionHeadings
        title={`Get Started - You are all set!`}
        description={`You can now start creating a session on your own!
      Select the type of Knowledge Session you wish to create and begin your journey as a Host. 
      `}
      />
      <Typography className={classes.descriptionStyle} style={textStyles}>
        Take a look at some of the popular categories listed below for
        inspiration -
      </Typography>

      <Grid container className={classes.gridContainer}>
        {Array.isArray(categories) &&
          categories.map((item) => (
            <Grid item xs={6} md={4}>
              <div className={classes.itemContainer} style={{}}>
                <p className={classes.content} style={{}}>
                  {item}
                </p>
              </div>
            </Grid>
          ))}
      </Grid>
      <div style={{ marginTop: "24px" }}>
        <FormControlLabel
          control={<Checkbox name="accept" />}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "start",
          }}
          label={
            <Typography
              style={{
                fontWeight: 500,
                fontSize: "15px",
                lineHeight: "25px",
                /* or 167% */

                color: "#333333",
              }}
            >
              I hereby acknowledge understanding the information delivered and
              declare that I consent to provide all information required to
              create a Knowledge Session in Hivepath.
            </Typography>
          }
        />
      </div>

      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={"/onboarding/ks/intro/samples"}
        nextURL={"/onboarding/ks/create/add-category"}
      />
    </Box>
  );
};

export default IntroGetStartedSection;

const categories = [
  "Design",
  "Ask me anything (AMA)",
  "Career Advice",
  "Product Design",
  "Technology",
  "Higher Studies",
  "AR/VR",
  "Personal Growth",
  "Career Growth",
  "Alumni Connect",
  "Ask me anything (AMA)",
  "Data Science",
];
