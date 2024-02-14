import { Container, Rating, Typography } from "@mui/material";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import React from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import { useSelector } from "react-redux";

const mapState = ({ sessions }) => ({
  sessionFeedback: sessions.sessionFeedback,
});
const HostFeedbackSection = ({ dontShow }) => {
  const { sessionFeedback } = useSelector(mapState);
  const message =
    sessionFeedback.length >= 1 &&
    sessionFeedback.map((item) => {
      const { feedback } = item;
      return feedback;
    });
  const data = [
    {
      id: 0,
      label: "Feedback",
      component: (
        <Typography
          marginTop="8px"
          fontSize="16px"
          fontWeight="500"
          lineHeight="22px"
          padding="16px"
        >
          {message[0]}{" "}
        </Typography>
      ),
    },
  ];

  return (
    <>
      {sessionFeedback.length > 0 && (
        <PaperBase style={{ paddingLeft: "32px" }}>
          {/* <BasicTabs data={data} /> */}

          <Typography fontSize={"24px"} fontWeight="700">
            Feedback
          </Typography>
          <Typography
            marginTop="8px"
            fontSize="16px"
            fontWeight="500"
            lineHeight="22px"
            padding="16px"
          >
            {message[0]}{" "}
          </Typography>
        </PaperBase>
      )}
    </>
  );
};

export default HostFeedbackSection;
