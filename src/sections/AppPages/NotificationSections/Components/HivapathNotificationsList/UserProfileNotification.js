import { Grid, Typography, IconButton, Paper } from "@mui/material";
import cardImg1 from "assets/svg/notifications/userProfile/cardImg1.svg";
import cardImg2 from "assets/svg/notifications/userProfile/cardImg2.svg";
import cardImg3 from "assets/svg/notifications/userProfile/cardImg3.svg";
import cardImg4 from "assets/svg/notifications/userProfile/cardImg4.svg";
import cardImg5 from "assets/svg/notifications/userProfile/cardImg5.svg";

import cardImg2Dep from "assets/svg/notifications/userProfile/cardImg2Dep.svg";
import cardImg3Dep from "assets/svg/notifications/welcomeNotification/cardImg3Dep.svg";
import cardImg4Dep from "assets/svg/notifications/welcomeNotification/cardImg4Dep.svg";
import cardImg5Dep from "assets/svg/notifications/userProfile/cardImg5Dep.svg";

import hand from "assets/svg/notifications/hand.svg";

import { useSelector } from "react-redux";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const UserProfileNotification = () => {
  const { currentUser } = useSelector(mapState);

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontSize="34px" fontWeight="bold">
          Hey {currentUser.firstname}, <img src={hand} />
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px">
          Looking good!
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px" mt={2} mb={4}>
          We see you have completed your user profile and provided all the
          necessary details.
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
            mb={5}
          >
            Here’s what you can do next
          </Typography>
          <Grid container align="center">
            <Grid item xs={12} md={6} style={{ position: "relative" }}>
              <div style={{ width: "min-content" }}>
                <div style={{ position: "relative", width: "fit-content" }}>
                  <img src={cardImg1} />
                </div>
                <Typography
                  variant="subtitle2"
                  align="left"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                >
                  <strong>Polish & Customize Profile</strong> <br />
                  Provide and update only the latest information to make your
                  profile reliable as well as attractive.
                </Typography>
              </div>
              <div
                className="center"
                style={{ position: "absolute", bottom: "0", width: "100%" }}
              >
                <PrimaryButton
                  title="Get started"
                  style={{ height: "40px", width: "130px" }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              align="left"
              style={{ position: "relative", minHeight: "480px" }}
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
                  src={cardImg2Dep}
                  style={{ position: "absolute", bottom: "55%", left: "60%" }}
                />
                <Typography
                  variant="subtitle2"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                >
                  <strong> Explore & Engage</strong> <br />
                  Connect and interact with others. Enjoy various offerings and
                  expand your network in no time.
                </Typography>
                <div
                  className="center"
                  style={{ position: "absolute", bottom: "0", width: "100%" }}
                >
                  <PrimaryButton
                    title="Get started"
                    style={{ height: "40px", width: "130px" }}
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
                  style={{ position: "absolute", top: "37%", right: "30%" }}
                />
                <Typography
                  variant="subtitle2"
                  align="left"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                  mt={5}
                >
                  <strong>Create & Update</strong> <br />
                  Provide your services through various offerings like Knowledge
                  sessions, Events, and Blogs.
                </Typography>
              </div>
              <div
                className="center"
                style={{ position: "absolute", bottom: "0", width: "100%" }}
              >
                <PrimaryButton
                  title="Explore"
                  style={{ height: "40px", width: "130px" }}
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
                  style={{ position: "absolute", bottom: "64%", right: "60%" }}
                />
                <Typography
                  variant="subtitle2"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                  mt={5}
                >
                  <strong>Find more features</strong> <br />
                  Visit our Blog/Website page to find more features. Learn and
                  improve new skills with us.
                </Typography>
                <div
                  className="center"
                  style={{ position: "absolute", bottom: "0", width: "100%" }}
                >
                  <PrimaryButton
                    title="Know more"
                    style={{ height: "40px", width: "130px" }}
                  />
                </div>
              </div>
            </Grid>

            {/* fifth section */}
            <Grid
              item
              xs={12}
              md={6}
              style={{ position: "relative", minHeight: "510px" }}
              mt={15}
            >
              <div style={{ width: "min-content", position: "relative" }}>
                <img src={cardImg5} />
                <img
                  src={cardImg5Dep}
                  style={{ position: "absolute", top: "36%", right: "30%" }}
                />
                <Typography
                  variant="subtitle2"
                  align="left"
                  fontSize="20px"
                  style={{ paddingLeft: "30px" }}
                  mt={5}
                >
                  <strong>Create & Update</strong> <br />
                  Provide your services through various offerings like Knowledge
                  sessions, Events, and Blogs.
                </Typography>
              </div>
              <div
                className="center"
                style={{ position: "absolute", bottom: "0", width: "100%" }}
              >
                <PrimaryButton
                  title="Share"
                  style={{ height: "40px", width: "130px" }}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} mt={2}>
        <Typography variant="subtitle2" fontSize="18px" mt={2} mb={2}>
          Well, go on. Finish up!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserProfileNotification;
