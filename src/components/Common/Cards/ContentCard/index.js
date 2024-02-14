import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const ContentCard = ({
  imgUrl,
  userName,
  repsonseTime,
  designation,
  offerings,
}) => {
  return (
    <div style={{ padding: "8px" }}>
      <Card
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "14px",
        }}
      >
        {/* image */}
        <CardMedia
          component="img"
          src="https://source.unsplash.com/random"
          alt=""
          style={{
            width: "100",
            height: "280px",
            objectFit: "cover",
          }}
        />
        <CardContent>
          {repsonseTime && (
            <Typography variant="subtitle2">
              Response time {repsonseTime}
            </Typography>
          )}{" "}
          <Typography
            variant="h5"
            color="primary"
            fontWeight="700"
            fontSize="1.2rem"
            // style={{background: 'linear-gradient(268.54deg, #484A9E -3.46%, #8FBAE3 181.58%)'}}
          >
            {userName}
          </Typography>
          <Typography fontSize="0.8rem" variant="body2">
            {designation}{" "}
          </Typography>
          <div style={{ paddingTop: "16px" }}>
            {offerings?.map((item) => (
              <span
                style={{
                  padding: "8px",
                  marginRight: "8px",
                  backgroundColor: "rgba(72, 74, 158, 0.1)",
                  borderRadius: "5px",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </CardContent>

        {/* helpertext */}
        {/* Title */}
        {/* subtitle */}
        {/*  */}
      </Card>
    </div>
  );
};

export default ContentCard;
