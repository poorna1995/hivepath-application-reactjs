import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const LPUserProfileCard = ({
  imgUrl,
  userName,
  // repsonseTime={repsonseTime}
  designation,
  offerings,
}) => {
  return (
    <div style={{ padding: "8px" }}>
      <Card
        elevation={0}
        style={{
          height: "375px",
          // width: "300px",
          position: "relative",
          borderRadius: "18px",
        }}
        sx={{
          "&:hover > img": {
            transform: "scale(1.1)",
          },
        }}
      >
        <CardMedia
          src={imgUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.76) 100%)",
          }}
          component="img"
        />
        <div
          style={{
            // minWidth: "300px",
            width: "100%",
            height: "375px",
            position: "absolute",
            top: "0px",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.76) 100%)",
          }}
        ></div>
        <CardContent
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            top: "275px",
            color: "white",
            left: "16px",
          }}
        >
          <Typography style={{ fontWeight: "700", fontSize: "24px" }}>
            {userName}
          </Typography>
          <Typography style={{ fontSize: "16px" }}>{designation}</Typography>
          {/* <Typography>{offerings.map}</Typography> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LPUserProfileCard;
