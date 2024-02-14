import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import LPStatusCardBase from "./LPStatusCardBase";

const KnowledgeSessionOnboardingStatusCard = () => {
  const list = [
    {
      title: "Share your experiences with others in the network",
    },
    { title: "Build your networking and  audience" },
    {
      title: "Build your networking and  audience",
      component: (
        <PrimaryButton
          style={{ height: "32px" }}
          disabled
          title={`Become a Host`}
        />
      ),
    },
  ];

  return (
    <LPStatusCardBase
      title={`Become a Knowledge session Host`}
      list={list}
    ></LPStatusCardBase>
  );
};

export default KnowledgeSessionOnboardingStatusCard;
