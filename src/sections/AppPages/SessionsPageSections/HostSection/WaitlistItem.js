import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import SessionPageGradientTitle from "../SessionPageComponents/SessionPageGradientTitle";

const WaitlistItem = ({ data }) => {
  const {
    profilePicImageUrl,
    userName,
    userJob,
    eventDateAndTime,
    waitlistType,
    isLastItem,
  } = data;
  return (
    <div
      style={{
        borderBottom: isLastItem ? "" : "1px solid rgba(0, 0, 0, 0.1)",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <Grid container>
        <Grid item xs={2}>
          <Avatar
            sx={{ width: 65, height: 65 }}
            src={profilePicImageUrl || "https://source.unsplash.com/random"}
          />
        </Grid>
        <Grid item xs={8} paddingLeft="8px">
          {/* <SessionPageGradientTitle
            userName={userName}
            gradient=" linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%) "
          /> */}
          <Typography
            style={{
              fontWeight: "800",
              fontSize: "24px",
              lineHeight: "29px",
              backgroundColor: "rgba(24, 61, 255, 1)",
              backgroundImage:
                "linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",

              WebkitTextFillColor: "transparent",
              backgroundRepeat: "repeat",
              MozBackgroundClip: "text",
              MozTextFillColor: "transparent",
            }}
          >
            {userName}
          </Typography>
          <Typography
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="-3%"
            style={{ color: "rgba(81, 81, 81, 1)", paddingTop: "8px" }}
          >
            {userJob}
          </Typography>
          <Typography
            style={{
              color: "rgba(72, 74, 158, 1)",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "20px",
              paddingTop: "8px",
            }}
          >
            {eventDateAndTime}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{
              background: "#EFEFEF",
              borderRadius: "10px",
              fontSize: "16px",
              lineHeight: "20px",
              color: "#CC2F2f",
              padding: "8px",
              textAlign: "center",
            }}
          >
            {" "}
            {waitlistType}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default WaitlistItem;
