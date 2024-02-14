import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const EventCard2 = (props) => {
  return (
    <div>
      <Card
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "14px",
          ...props.style,
        }}
      >
        <CardMedia
          component="img"
          src={props.img}
          alt="event pic"
          style={{
            width: "100%",
            // height: "190px",
            objectFit: "none",
            background: "#E9E9E9",
            height: "248px",
          }}
        />
        <CardContent textalign="center">
          <Grid container p={2}>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h6" color="black" fontWeight="800">
                {props.description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCard2;
