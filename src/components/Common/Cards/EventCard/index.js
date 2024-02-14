import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { FaCalendar } from "react-icons/fa";

const EventCard = () => {
  return (
    <div style={{ padding: "8px" }}>
      <Card
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "14px",
        }}
      >
        <CardMedia
          component="img"
          src="https://source.unsplash.com/random"
          alt="event pic"
          style={{
            width: "100%",
            height: "190px",
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ paddingBottom: "8px" }}
          >
            Basic introduction to the UX Design Principles
          </Typography>
          <Typography variant="subtitle1" style={{ paddingBottom: "8px" }}>
            <FaCalendar /> 27 Sep 6:30 am - 3 Oct 7:30 pm
          </Typography>
          <Grid container>
            <Grid item xs={3}>
              <Avatar src="https://source.unsplash.com/random" />
            </Grid>

            <Grid item xs={9}>
              <Typography variant="body1" fontWeight="bold">
                Christina Lee
              </Typography>

              <Typography variant="body2" color="GrayText">
                Web Developer
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCard;
