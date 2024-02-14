import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import StepInfoCard from "./StepInfoCard";
import stepOneImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-one.svg";
import stepTwoImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-two.svg";
import stepThreeImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-three.svg";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";

const gridListData = [
  {
    id: 1,
    title: "Complete Knowledge Session Onboarding",
    description: `First things first! Once you are in the onboarding process, you must go through all the information provided to understand how everything works and then provide all the information required to create a Knowledge Session. `,
    imgSrc: stepOneImage,
  },
  {
    id: 2,
    title: `Place Your Availability`,
    description: `After successfully adding in all the details, you will find yourself in the Hivepath Calendar. Here, you'll need to drag and mark the time slots you'll be available in for the sessions. Make sure you provide more than one date/time,  allowing multiple people to book your sessions.`,
    imgSrc: stepTwoImage,
  },
  {
    id: 3,
    title: `Provide Meeting Preferences`,
    description: `Finally! After you are done with all the details and schedule, you have to provide a meeting place for your sessions. For that, just connect your Google Meet account to Hivepath and we'll do the rest for you. The end!`,
    imgSrc: stepThreeImage,
  },
];

const KSIntroHowToCreateOfferingSection = () => {
  return (
    <Box style={{ paddingBottom: "64px" }}>
      <OnboardingSectionHeadings
        title={`How to create a Knowledge Session?
`}
        description={`Now, for those equally kind yet curious users who wish to become a Host and lend a helping hand to the ones seeking it, here's an easy step-by-step guide for creating one or multiple Knowledge Sessions - 
`}
      />
      <Grid
        container
        spacing={3}
        marginTop={"16px"}
        className="removeScrollBar"
      >
        {gridListData.map((item) => {
          const { id, title, description, imgSrc } = item;
          return (
            <Grid item xs={12} md={4}>
              <StepInfoCard
                count={id}
                description={description}
                title={title}
                imgSrc={imgSrc}
              />
            </Grid>
          );
        })}
      </Grid>
      <KSOnboardingButtonRow
        primaryText={"Next"}
        showPrimary
        nextURL={"/onboarding/ks/intro/samples"}
        showSecondary
        backURL={`/onboarding/ks/intro/requirements`}
      />
    </Box>
  );
};

export default KSIntroHowToCreateOfferingSection;
