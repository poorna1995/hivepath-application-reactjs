import { Box, Container, Typography } from "@mui/material";
import React from "react";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";

import firstImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-three/one.svg";
import secondImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-three/two.svg";
import thirdImage from "assets/svg/all/new-icons/ks-onboarding/intro/step-three/three.svg";

const NewIntroKSOnboardingStepThreeSection = () => {
  const nextUrl = "/onboarding/ks/create/add-category";
  const data = [
    {
      id: 1,
      img: firstImage,
      title: "Complete Onboarding",
      description: `First things first! Once you are in the Knowledge Session onboarding process, you must provide all the information required to create a Knowledge Session. `,
      bgcolor: "rgba(251, 247, 255, 1)",
    },
    {
      id: 2,
      img: secondImage,
      title: "Place Your Availability",
      description: `After successfully adding in all the details, you will find yourself in the Hivepath Calendar. Here, you’ll need to drag and mark the time slots you’ll be available. `,
      bgcolor: "rgba(239, 249, 255, 1)",
    },
    {
      id: 3,
      img: thirdImage,
      title: "Provide Meeting Preferences",
      description: (
        <>
          {" "}
          Finally! After you are done with the above, connect your Google Meet
          account to Hivepath for your meeting platform where you can also
          provide different choices for your waitlist & time zone.
          <br />
          That's it, click submit and you are done!
        </>
      ),
      bgcolor: "rgba(255, 247, 241, 1)",
    },
  ];

  return (
    <Box>
      <Container style={{ maxWidth: "800px", paddingBottom: "64px" }}>
        <OnboardingSectionHeadings
          title={`How to create a Knowledge Session?`}
        />
        <div>
          {data.map((item) => {
            const { id, title, img, description, bgcolor } = item;
            return (
              <div style={{ padding: "16px" }}>
                <Typography
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    paddingBottom: "16px",
                  }}
                >
                  Step {id}
                </Typography>
                <div
                  style={{
                    background: bgcolor,
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />
                  <div style={{ marginLeft: "16px" }}>
                    <Typography
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography>{description}</Typography>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      <KSOnboardingButtonRow showPrimary nextURL={nextUrl} />
    </Box>
  );
};

export default NewIntroKSOnboardingStepThreeSection;
