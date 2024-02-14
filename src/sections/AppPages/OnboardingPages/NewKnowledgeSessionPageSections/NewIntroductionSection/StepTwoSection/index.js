import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import firstImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-two/one.svg";
import secondImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-two/two.svg";
import thirdImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-two/three.svg";
import fourthImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-two/four.svg";
import fifthImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-two/five.svg";
import sixthImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-two/six.svg";

import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import categoryList from "../../constants/categoryList";

const NewIntroKSOnboardingStepTwoSection = () => {
  const nextUrl = "/onboarding/ks/intro/how-to-create";
  const data = [
    {
      title: "Career Advice",
      img: firstImage,
      bgColor: "rgba(250, 255, 217, 1)",
    },
    {
      title: "Ask me anything",
      img: secondImage,
      bgColor: "rgba(234, 255, 217, 1)",
    },
    {
      title: "Career growth",
      img: thirdImage,
      bgColor: "rgba(222, 217, 255, 1)",
    },
    {
      title: "Masters studies",
      img: fourthImage,
      bgColor: "rgba(232, 204, 184, 1)",
    },
    {
      title: "Portfolio review",
      img: fifthImage,
      bgColor: "rgba(229, 217, 255, 1)",
    },
    {
      title: "Alumni connect",
      img: sixthImage,
      bgColor: "rgba(255, 244, 217, 1)",
    },
  ];
  return (
    <Box>
      <Container
        style={{
          paddingBottom: "64px",
          textAlign: "center",
          maxWidth: "1000px",
        }}
      >
        <OnboardingSectionHeadings
          title={`Creativity could be limitless`}
          description={`Some of the highly recommended knowledge sessions. `}
        />

        <Grid container marginTop="32px" spacing={2}>
          {categoryList.map((item) => {
            return (
              <Grid item xs={6} md={4} padding="16px">
                <Card
                  sx={{
                    boxShadow: "none",
                    // padding: "16px",
                    textAlign: "center",
                    borderRadius: "20px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardMedia
                    component={"img"}
                    src={item.img}
                    style={{
                      background: item.bgColor,
                      width: "100%",
                      height: "190px",
                      objectFit: "contain",
                    }}
                  />
                  {/* <img src={item.img} alt="" /> */}

                  <Typography
                    fontSize={`20px`}
                    fontWeight="700"
                    padding={"16px"}
                  >
                    {item.title}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <KSOnboardingButtonRow showPrimary nextURL={nextUrl} />
    </Box>
  );
};

export default NewIntroKSOnboardingStepTwoSection;
