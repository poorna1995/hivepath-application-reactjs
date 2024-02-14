import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";

const mapState = ({ sessions }) => ({
  booking: sessions.hostBookingDetails,
});
const HappeningAtCard = ({ dontShow }) => {
  const { booking } = useSelector(mapState);

  const meetingURL = booking.meeting_link;
  console.log(meetingURL);

  return (
    <>
      {" "}
      {typeof meetingURL === "string" && (
        <PaperBase style={{ paddingLeft: "32px" }}>
          <Typography
            fontSize="24px"
            fontWeight="700"
            lineHeight="30px"
            paddingBottom="16px"
          >
            Happening at
          </Typography>
          {/* <Typography fontSize="16px" fontWeight="500" lineHeight="22px">
            Hello John, I am Nancy, a recent graduate in Computer Science but I
            am interested in Designing. Your transformation journey
          </Typography> */}
          <div style={{ marginTop: "16px" }}>
            <Typography>
              <span style={{ fontWeight: "700", fontSize: "18px" }}>
                {" "}
                Join Google Meet link
              </span>
              -{" "}
              <a
                href={meetingURL}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "rgba(0, 0, 0, 0.03)",
                  padding: "8px",
                  borderRadius: "9px",
                }}
              >
                {meetingURL}
              </a>
            </Typography>
          </div>
        </PaperBase>
      )}
    </>
  );
};

export default HappeningAtCard;
