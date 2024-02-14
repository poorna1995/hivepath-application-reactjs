import { Grid, Typography, IconButton, Paper } from "@mui/material";
import cardImg1 from "assets/svg/notifications/welcomeNotification/cardImg1.svg";
import cardImg2 from "assets/svg/notifications/welcomeNotification/cardImg2.svg";
import cardImg3 from "assets/svg/notifications/welcomeNotification/cardImg3.svg";
import cardImg4 from "assets/svg/notifications/welcomeNotification/cardImg4.svg";

import cardImg1Dep from "assets/svg/notifications/welcomeNotification//cardImg1Dep.svg";
import cardImg3Dep from "assets/svg/notifications/welcomeNotification//cardImg3Dep.svg";
import cardImg4Dep from "assets/svg/notifications/welcomeNotification//cardImg4Dep.svg";
import cardImg2Dep1 from "assets/svg/notifications/welcomeNotification//cardImg2Dep1.svg";
import cardImg2Dep2 from "assets/svg/notifications/welcomeNotification//cardImg2Dep2.svg";

import hand from "assets/svg/notifications/hand.svg";
import facebookIcon from "assets/svg/user-profile/facebook.svg";
import twitterIcon from "assets/svg/user-profile/twitter.svg";
import linkedinIcon from "assets/svg/user-profile/linkedin.svg";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";

const WelcomeNotification = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={12} mb={2}>
        <Typography variant="h6" fontSize="34px" fontWeight="bold">
          Hello <img src={hand} />, Welcome to Hivepath!
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px">
          We are happy to have you join our platform of professional networking
          where we connect people to learn, grow, and succeed together! <br />
          <Typography variant="subtitle2" fontSize="18px" mt={1}>
            Here are the basics to get you started -
          </Typography>
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontSize="20px" fontWeight="bold" mt={3}>
          What is Hivepath?
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px" mt={2} mb={4}>
          Hivepath is a user-dedicated networking platform with an AI-powered
          matching algorithm to help people build long-lasting connections
          through various engaging features and services.
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            boxShadow: "0px 0px 50px 6px rgba(72, 74, 158, 0.08)",
            borderRadius: "20px",
            width: "100%",
            padding: "20px 10px 50px 10px",
          }}
        >
          <Typography
            variant="h6"
            fontSize="40px"
            fontWeight="bold"
            align="center"
          >
            Things To Do
          </Typography>
          <Grid container align="center">
            <Grid item xs={12} md={6} style={{ position: "relative" }}>
              <div style={{ width: "min-content" }}>
                <div style={{ position: "relative", width: "fit-content" }}>
                  <img src={cardImg1} />
                  <img
                    src={cardImg1Dep}
                    style={{ position: "absolute", left: "0", top: "35%" }}
                  />
                </div>
                <Typography
                  variant="subtitle2"
                  align="left"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                >
                  <strong>Complete your user profile</strong> <br /> Showcase
                  your details for everyone to see.
                </Typography>
              </div>
              <div
                className="center"
                style={{ position: "absolute", bottom: "0", width: "100%" }}
              >
                <PrimaryButton
                  title="Get started"
                  style={{ height: "40px", width: "auto" }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              align="left"
              style={{ position: "relative", minHeight: "450px" }}
            >
              <div
                style={{
                  width: "min-content",
                  position: "relative",
                  height: "100%",
                }}
              >
                <img src={cardImg2} />
                <img
                  src={cardImg2Dep1}
                  style={{ position: "absolute", top: "10%", left: "50%" }}
                />
                <img
                  src={cardImg2Dep2}
                  style={{ position: "absolute", top: "22%", left: "50%" }}
                />
                <Typography
                  variant="subtitle2"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                >
                  <strong>Create offerings</strong> <br />
                  Create Knowledge sessions, Events, and Blogs on things you are
                  passionate about.
                </Typography>
                <div
                  className="center"
                  style={{ position: "absolute", bottom: "0", width: "100%" }}
                >
                  <PrimaryButton
                    title="Get started"
                    style={{ height: "40px", width: "auto" }}
                  />
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{ position: "relative", minHeight: "510px" }}
              mt={15}
            >
              <div style={{ width: "min-content", position: "relative" }}>
                <img src={cardImg3} />
                <img
                  src={cardImg3Dep}
                  style={{ position: "absolute", top: "40%", right: "30%" }}
                />
                <Typography
                  variant="subtitle2"
                  align="left"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                  mt={5}
                >
                  <strong>Explore networks</strong> <br />
                  Find people with similar interests. Follow and expand your
                  network.
                </Typography>
              </div>
              <div
                className="center"
                style={{ position: "absolute", bottom: "0", width: "100%" }}
              >
                <PrimaryButton
                  title="Explore"
                  style={{ height: "40px", width: "auto" }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              align="left"
              style={{ position: "relative" }}
              mt={15}
            >
              <div
                style={{
                  width: "min-content",
                  position: "relative",
                  height: "100%",
                }}
              >
                <img src={cardImg4} />
                <img
                  src={cardImg4Dep}
                  style={{ position: "absolute", bottom: "60%", right: "60%" }}
                />
                <Typography
                  variant="subtitle2"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                  mt={5}
                >
                  <strong>Engage with experts</strong> <br />
                  Find interesting offerings. Join, share, and interact with
                  others.
                </Typography>
                <div
                  className="center"
                  style={{ position: "absolute", bottom: "0", width: "100%" }}
                >
                  <PrimaryButton
                    title="Know more"
                    style={{ height: "40px", width: "auto" }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontSize="20px" fontWeight="bold" mt={7}>
          Connect with us
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px" mt={2} mb={2}>
          Our social media content is as informative as our experts so don’t
          forget to give us a follow and a shoutout to help us reach more
          people!
        </Typography>
      </Grid>
      <div>
        <IconButton
          style={{
            width: "60px",
            height: "60px",
            margin: "10px",
            background: "#F6F6FA",
            borderRadius: "50%",
          }}
        >
          <img src={facebookIcon} alt="socialIcon" />
        </IconButton>
        <IconButton
          style={{
            width: "60px",
            height: "60px",
            margin: "10px",
            background: "#F6F6FA",
            borderRadius: "50%",
          }}
        >
          <img src={twitterIcon} alt="socialIcon" />
        </IconButton>
        <IconButton
          style={{
            width: "60px",
            height: "60px",
            margin: "10px",
            background: "#F6F6FA",
            borderRadius: "50%",
          }}
        >
          <img src={linkedinIcon} alt="socialIcon" />
        </IconButton>
      </div>
    </Grid>
  );
};

export default WelcomeNotification;
