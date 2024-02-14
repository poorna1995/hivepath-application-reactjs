import { Container, Typography } from "@mui/material";
import React from "react";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import CardThreeImage from "assets/gifs/onboarding/ks/start.gif";
import { Box } from "@mui/system";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";

const NewIntroKSOnboardingSteOneSection = () => {
  const nextUrl = "/onboarding/ks/intro/how-to-create";

  return (
    <Box>
      <Container
        style={{
          textAlign: "center",
          maxWidth: "800px",
          paddingBottom: "64px",
        }}
      >
        <OnboardingSectionHeadings title={`Become a Host`} />
        <Typography
          style={{
            marginTop: "16px",
            // marginBottom: "16px",
            textAlign: "left",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "26px",
            color: "#333333",
          }}
        >
          Hivepath invites all of you to a new way of professional networking
          and interaction! <br />
          Host a Knowledge Session today to share your inspiring ideas, valuable
          experiences, or unique journeys to talk about anything from the past
          to the future.
        </Typography>
        <div
          style={{
            padding: "16px",
            height: "400px",
          }}
        >
          <img
            src={CardThreeImage}
            alt=""
            style={{
              width: "100%",
              height: "400px",
              objectFit: "contain",
              // marginTop: "32px",
              borderRadius: "15px",
            }}
          />
        </div>

        {/* <Typography></Typography> */}

        <OnboardingSectionHeadings title={`What is a knowledge session?`} />
        <Typography
          style={{
            marginTop: "16px",
            // marginBottom: "16px",
            textAlign: "left",
          }}
        >
          A Knowledge Session is a one-on-one virtual interaction between a Host
          who is hosting a session on a topic of interest open for discussion
          and an Attendee who is looking for valuable information or assistance
          on that same topic.
        </Typography>
      </Container>
      <KSOnboardingButtonRow showPrimary nextURL={nextUrl} />
    </Box>
  );
};

export default NewIntroKSOnboardingSteOneSection;
