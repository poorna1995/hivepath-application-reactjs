import "./style.css";
import { Grid, Typography, IconButton, Paper } from "@mui/material";
import offering from "assets/svg/notifications/knowledgeSession/offering.svg";
import request from "assets/svg/notifications/knowledgeSession/request.svg";
import approved from "assets/svg/notifications/knowledgeSession/approved.svg";
import seperator from "assets/svg/notifications/knowledgeSession/seperator.svg";
// import PrimaryButton from "components/Common/Buttons/PrimaryButton";

const KnowledgeSessionNotification = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={12} mb={2}>
        <Typography variant="h6" fontSize="34px" fontWeight="bold">
          Knowledge Session Onboarding Complete!
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px">
          You have successfully fulfilled all the onboarding requirements of
          Hosting a Knowledge Session to help others with your skills and
          expertise. Thank you for your kind efforts and hard work!
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontSize="20px" fontWeight="bold" mt={3}>
          Now here’s how the cycle goes -
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} mt={10} mb={10}>
        <Grid container>
          <Grid item xs={2} md={2} align="center">
            <div className="iconRoundDiv">
              <img src={request} />
            </div>
            <Typography variant="h6" fontSize="18px" fontWeight="bold" mt={2}>
              You send us a request
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            md={3}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <img src={seperator} />
            </div>
          </Grid>
          <Grid item xs={2} md={2} align="center">
            <div className="iconRoundDiv">
              <img src={approved} />
            </div>
            <Typography variant="h6" fontSize="18px" fontWeight="bold" mt={2}>
              We approve the request
            </Typography>
          </Grid>
          <Grid item xs={1} md={1}></Grid>
          <Grid
            item
            xs={2}
            md={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <img src={seperator} />
            </div>
          </Grid>

          <Grid item xs={2} md={2} align="center">
            <div className="iconRoundDiv">
              <img src={offering} />
            </div>
            <Typography variant="h6" fontSize="18px" fontWeight="bold" mt={2}>
              The offering is created
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px">
          Simple right? All you need to do is wait for our Approval Email and
          that’s it! Once approved, your offering will be created and updated on
          your profile.
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontSize="18px" fontWeight="bold" mt={3}>
          Here are some things you can do while you wait for your session
          approval -
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} mt={3}>
        <ul style={{ paddingLeft: "25px" }}>
          <li>
            <Typography variant="h6" fontSize="18px" mb={2}>
              <span style={{ color: "#484A9E", fontWeight: "bold" }}>
                Explore Offerings.
              </span>{" "}
              Look what others are talking about, find something that interests
              you, interact, and collaborate with them.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" fontSize="18px" mb={2}>
              <span style={{ color: "#484A9E", fontWeight: "bold" }}>
                Update Calendar.
              </span>{" "}
              Provide your availabilities. Prioritize your timeslots according
              to your schedule for easy session bookings.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" fontSize="18px" mb={2}>
              <span style={{ color: "#484A9E", fontWeight: "bold" }}>
                Start Preparing.
              </span>{" "}
              Head over to our Blog page where we have dedicated content for
              successful virtual interactions. Get a head-start with our useful
              tips and suggestions.
            </Typography>
          </li>
          <li>
            <Typography variant="h6" fontSize="18px" mb={2}>
              <span style={{ color: "#484A9E", fontWeight: "bold" }}>
                Share & Refer.
              </span>{" "}
              Use our social media integrations to share your valuable
              experiences and help us reach more people.
            </Typography>
          </li>
        </ul>

        <Typography variant="h6" fontSize="18px">
          We wish you a great start!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default KnowledgeSessionNotification;
