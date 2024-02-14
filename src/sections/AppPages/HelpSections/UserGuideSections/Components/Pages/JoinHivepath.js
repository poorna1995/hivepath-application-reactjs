import React from "react";
import { Skeleton, Typography, Grid, Button } from "@mui/material";

const JoinHivepath = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography color="#484A9E" variant="h6" fontSize="34px">
          Joining Hivepath - Registration/Sign-up process
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px">
          Hivepath is an all-in-one networking platform dedicated to
          professional networking to help individuals connect and achieve their
          desired goals.
          <br />
          <br />
          We are a team of passionate busy bees who strive to learn, solve, and
          improve the areas of professional networking problems that lack an
          efficient way to connect people directly without waiting for long
          hours. In addition with the absence of goal-oriented feedback systems,
          people tend to miss a lot of important information and that's exactly
          where we, the people from Hivepath, buzz in!
          <br />
          <br />
          Our team helps in solving these problems by providing you an
          incredible way of communication where you get to connect instantly in
          1-on-1 professional/personal insights from highly experienced
          candidates, all within mere minutes!
          <br />
          <br />
          Moreover, you also receive included-tracking to improve your progress
          through our various high-end tools to help you achieve your dreams
          sooner.
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Skeleton
            animation={false}
            variant="rectangular"
            style={{ height: "300px", width: "600px" }}
          />
        </div>

        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <Typography variant="subtitle2" fontSize="18px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor rhoncus dolor purus non enim praesent elementum
              facilisis leo, vel fringilla est ullamcorper eget nulla facilisi
              etiam dignissim diam quis enim lobortis scelerisque fermentum dui
              faucibus in ornare quam viverra
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle2" fontSize="18px" mt={1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor rhoncus dolor purus non enim praesent elementum
              facilisis leo, vel fringilla est ullamcorper eget nulla facilisi
              etiam dignissim diam quis enim lobortis scelerisque fermentum dui
              faucibus in ornare quam viverra
            </Typography>
          </li>
        </ul>
        <Typography variant="subtitle2" fontSize="18px" mt={2} mb={5}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor rhoncus dolor purus non enim praesent elementum facilisis
          leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim
          diam quis enim lobortis scelerisque fermentum dui faucibus in ornare
          quam viverra
        </Typography>
      </Grid>
    </Grid>
  );
};

export default JoinHivepath;
