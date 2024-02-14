import React from "react";
import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import UGOverviewCard from "./UGOverviewCard";
import UGExpanded from "./UGExpanded";

const UserGuideSections = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid container spacing={2} pl={2}>
      {!expanded && (
        <>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" fontWeight="bold" fontSize="38px">
              User Guide
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight="700"
              fontSize="16px"
              color="#606060"
            >
              Let us help you know Hivepath better. Select the category you wish
              to know about and let your interests spark!
            </Typography>
          </Grid>
          {Object.keys(data).map((item, index) => {
            return (
              <Grid item xs={12} md={4} mt={2} key={`ugsc${index}`}>
                <UGOverviewCard
                  key={`ugcc${index}`}
                  data={data[item]}
                  title={item}
                  setExpanded={setExpanded}
                />
              </Grid>
            );
          })}
        </>
      )}

      {expanded && <UGExpanded data={data} setExpanded={setExpanded} />}
    </Grid>
  );
};

export default UserGuideSections;

const data = {
  "Getting Started": [
    {
      title: "Joining Hivepath - Registration/Sign-up process",
      link: "#",
      id: 1,
    },
    {
      title: "User Profile Onboarding",
      link: "#",
      id: 2,
    },
    {
      title: "Knowledge Session Onboarding",
      link: "#",
      id: 3,
    },
    {
      title: "Exploring Hivepath - Network & offerings",
      link: "#",
      id: 4,
    },
    {
      title: "Updating Availability - Hivepath calendar",
      link: "#",
      id: 5,
    },
  ],
  "User Engagement": [
    {
      title: "Connecting with people - Where & how?",
      link: "app/help/user-guide/2",
      id: 6,
    },
    {
      title: "Creating a Knowledge Session",
      link: "app/help/user-guide/2",
      id: 7,
    },
    {
      title: "Booking a Knowledge Session",
      link: "app/help/user-guide/2",
      id: 8,
    },
  ],
  "Features & Services": [
    {
      title: "Offerings - Process and implementation",
      link: "#",
      id: 9,
    },
    {
      title:
        "Direct Interactions - Text messages, video calls, social media, etc",
      link: "#",
      id: 10,
    },
    {
      title: "Bookmarks - What,  where & how?",
      link: "#",
      id: 11,
    },
    {
      title: "Drafts - What, where & how?",
      link: "#",
      id: 12,
    },
    {
      title: "Resources - What, where & how?",
      link: "#",
      id: 13,
    },
  ],
  "Privacy & Security": [
    {
      title: "Account - Log-in/Log-out",
      link: "#",
      id: 14,
    },
    {
      title: "Password Changes - Where & how?",
      link: "#",
      id: 15,
    },
    {
      title: "Privacy Options - View/Hide activities",
      link: "#",
      id: 16,
    },
    {
      title: "Data Misuse - Fraud, scam, duplicate, etc",
      link: "#",
      id: 17,
    },
    {
      title: "Report - What, where & how?",
      link: "#",
      id: 18,
    },
  ],
  Contact: [
    {
      title: "Contact us - Where & how?",
      link: "#",
      id: 19,
    },
    {
      title: "Feedback - Where & how?",
      link: "#",
      id: 19,
    },
  ],
};
