import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import adviseIcon from "assets/svg/all/new-icons/ks-onboarding/intro/about-offering/advise.svg";

import conductIcon from "assets/svg/all/new-icons/ks-onboarding/intro/about-offering/conduct.svg";
import discussIcon from "assets/svg/all/new-icons/ks-onboarding/intro/about-offering/discuss.svg";
import shareIcon from "assets/svg/all/new-icons/ks-onboarding/intro/about-offering/share.svg";
import virtualChatIcon from "assets/svg/all/new-icons/ks-onboarding/intro/about-offering/virtual-chat.svg";
import professionalIcon from "assets/svg/all/new-icons/ks-onboarding/intro/about-offering/professional.svg";
import personalIcon from "assets/svg/all/new-icons/ks-onboarding/intro/about-offering/personal.svg";
import academicIcon from "assets/svg/all/new-icons/ks-onboarding/intro/about-offering/academic.svg";

import StepInfoCard from "../IntroHowToCreateSection/StepInfoCard";
import TypographyRenderHTML from "components/Common/Typography/TypographyRenderHTML";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
const textStyles = {
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: "26px",
  /* or 144% */

  color: "#333333",
  paddingTop: "8px",
  paddingBottom: "8px",
};

const sectionHeadingStyles = {
  fontWeight: "bold",
  fontSize: "28px",
  lineHeight: "36px",
  paddingTop: "8px",
};

const listItemTextStyles = {
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "23px",
  color: "#000000",
};

const AboutOfferingSection = () => {
  const nextUrl = "/onboarding/ks/intro/requirements";

  return (
    <Box style={{ paddingBottom: "128px" }}>
      <OnboardingSectionHeadings
        title={`Become a Host!`}
        description={`Hivepath invites all you brilliant minds to a new way of professional networking and interaction! `}
      />

      <Typography style={textStyles}>
        Try hosting a Knowledge Session today to share your inspiring ideas,
        valuable experiences, or unique journeys to talk about anything from the
        past to the future.
      </Typography>

      <Typography style={sectionHeadingStyles}>
        Introducing - Knowledge Session
      </Typography>

      <Typography style={textStyles}>
        A Knowledge Session is a one-on-one virtual interaction between a Host
        who is hosting a session on a topic of interest open for discussion and
        an Attendee who is looking for valuable information or assistance on
        that same topic.
      </Typography>

      <Typography style={sectionHeadingStyles}>
        Here, the Host holds the power to -
      </Typography>

      <List>
        {listData.map((item) => {
          const { icon, text } = item;
          return (
            <ListItem
              // style={{
              //   display:'flex',
              //   justifyContent:'flex-start'
              // }}
              alignItems="flex-start"
              dense
              disableGutters
            >
              <ListItemIcon>
                <img src={icon} alt="" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <TypographyRenderHTML
                    description={text}
                    style={listItemTextStyles}
                  />
                }
              />
            </ListItem>
          );
        })}
      </List>

      <Typography style={textStyles}>
        Being a Host not only gives you a medium to share your knowledge and
        experience but also allows you to learn and explore other perspectives
        of life!
      </Typography>

      <Typography style={sectionHeadingStyles}>So, is there a type?</Typography>

      <TypographyRenderHTML
        description={`<p>
      Yes, there is! Based on the vast number of topics that people may need
      help with, we are dividing<b> Knowledge Sessions</b> into 3 types for easier
      navigation. These are -
   
      </p>`}
        style={textStyles}
      ></TypographyRenderHTML>

      <Grid container spacing={3} marginTop={"16px"}>
        {typeData.map((item) => {
          const { title, description, imgSrc } = item;
          return (
            <Grid item xs={12} md={4}>
              <StepInfoCard
                imgSrc={imgSrc}
                title={title}
                alignTitle={"center"}
                description={description}
              />
            </Grid>
          );
        })}
      </Grid>
      <KSOnboardingButtonRow showPrimary nextURL={nextUrl} />
    </Box>
  );
};

export default AboutOfferingSection;

const listData = [
  {
    icon: conductIcon,
    text: `<p><b> Conduct</b> and select the topic of interest according to their
        experience/journey.</p>`,
  },
  {
    icon: discussIcon,
    text: `<p><b>Discuss</b>  trending topics and guide people through their problems to the right path.</p>`,
  },
  {
    icon: adviseIcon,
    text: `<p> <b>Advise</b> people on professional skill developments/growth based on their area of expertise.</p>`,
  },

  {
    icon: shareIcon,
    text: `<p> <b>Share</b> their professional/personal knowledge and thoughts on a topic. </p>`,
  },
  {
    icon: virtualChatIcon,
    text: `<p>Or a <b>Virtual coffee chat</b> to network and exchange ideas</p>`,
  },
];

const typeData = [
  {
    imgSrc: professionalIcon,
    title: `Professional`,
    description: `Sessions based purely on a professional journey, growth, or development will be included here. These can range from career advice, job interviews, resume reviews, to sharing professional expertise. 

    `,
  },
  {
    imgSrc: personalIcon,
    title: `Personal`,
    description: `Sessions that are targeted at personal growth, development & insights such as mentoring, consultancy, collaborations, and life stories can be included here.`,
  },
  {
    imgSrc: academicIcon,
    title: `Academic`,
    description: `Sessions based on any academic or education-related field will be included here. These can range from student life experiences, training courses, academic interviews, admissions, job search, or even international studies. `,
  },
];
