import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import authFetch from "utils/authFetch";
import KSOnboardingButtonRow from "../../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../components/Typography/SectionHeadings";
import OfferingSamplePreviewComponent from "./OfferingSamplePreviewComponent";
import SampleOfferingTabs from "./SampleOfferingTabs";

const KSIntroSampleOfferingsSection = () => {
  const [sampleData, setSampleData] = useState({});
  useEffect(() => {
    const url = "https://auth.hivepath.io/api/fetchOfferingMaster";
    // authFetch(url, data)
    // const data =''
    fetch(url)
      .then((res) => res.json())
      .then((json) => setSampleData(json?.result[0]))
      .catch((error) => console.error(error));
  }, []);

  const data = [
    {
      id: 0,
      title: "Professional",
      component: <OfferingSamplePreviewComponent data={sampleData} />,
    },
    {
      id: 1,
      title: "Academic",
      component: <OfferingSamplePreviewComponent data={sampleData} />,
    },
    {
      id: 2,
      title: "Mentoring",
      component: <OfferingSamplePreviewComponent data={sampleData} />,
    },
    {
      id: 3,
      title: "Alumni Connect",
      component: <OfferingSamplePreviewComponent data={sampleData} />,
    },
  ];

  return (
    <Box>
      <OnboardingSectionHeadings
        title={`Sample Knowledge Sessions`}
        description={`To help you understand what a Knowledge Session looks like, once it has all the details required, here are a few samples to clear your mind -`}
      />
      <SampleOfferingTabs alldata={data} />
      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={"/onboarding/ks/intro/how-to-create"}
        nextURL={"/onboarding/ks/intro/get-started"}
      />
    </Box>
  );
};

export default KSIntroSampleOfferingsSection;
