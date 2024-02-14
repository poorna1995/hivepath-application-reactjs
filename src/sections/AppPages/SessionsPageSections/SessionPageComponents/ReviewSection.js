import { Container, Rating, Typography } from "@mui/material";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import React from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import { ReactComponent as StarIcon } from "assets/svg/sessions/star.svg";

const AttendeeViewReviewSection = ({ dontShow }) => {
  return (
    <>
      {dontShow && (
        <PaperBase style={{ paddingLeft: "32px" }}>
          <BasicTabs data={data} />
        </PaperBase>
      )}
    </>
  );
};

export default AttendeeViewReviewSection;

const data = [
  {
    id: 0,
    label: "Review",
    component: (
      <Container>
        <Rating style={{ marginTop: "16px" }} value={3} size={"large"} />
        <Typography
          marginTop="8px"
          fontSize="16px"
          fontWeight="500"
          lineHeight="22px"
        >
          Hello John, I am Nancy, a recent graduate in Computer Science but I am
          interested in Designing. Your transformation journey is admirable and
          something I can relate to so, I hope to find my true calling through
          this discussion. I wish to learn a lot from you. Thank you.
        </Typography>
      </Container>
    ),
  },
  {
    id: 1,
    label: "Rating",
    component: (
      <div style={{ paddingTop: "24px", padding: "16px" }}>
        <Typography
          style={{
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "22px",
            paddingBottom: "16px",
          }}
        >
          Rate this Host
          <br />
          <span style={{ fontSize: "12px" }}>Tell others what you think</span>
        </Typography>

        <Rating value={0} size={"large"} />
      </div>
    ),
  },
];
