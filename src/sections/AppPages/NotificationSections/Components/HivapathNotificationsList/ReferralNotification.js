import "./style.css";
import { Grid, Typography, IconButton, Paper } from "@mui/material";
import offering from "assets/svg/notifications/knowledgeSession/offering.svg";
import request from "assets/svg/notifications/knowledgeSession/request.svg";
import approved from "assets/svg/notifications/knowledgeSession/approved.svg";
import seperator from "assets/svg/notifications/knowledgeSession/seperator.svg";

import hand from "assets/svg/notifications/hand.svg";
import refer from "assets/svg/notifications/referral/refer.png";

import connect from "assets/svg/notifications/referral/connect.svg";
import rewards from "assets/svg/notifications/referral/rewards.svg";
import people from "assets/svg/notifications/referral/people.svg";
import share from "assets/svg/notifications/referral/share.svg";
// import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ReferralNotification = () => {
  const { currentUser } = useSelector(mapState);

  return (
    <Grid container>
      <Grid item xs={12} md={12} mb={2}>
        <Typography variant="h6" fontSize="34px" fontWeight="bold">
          Hey {currentUser.firstname}, <img src={hand} />
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px">
          Hivepath is aiming to help people like you and many others to join
          together in a world of infinite knowledge where every answer is only a
          click away!
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} mt={2}>
        <Typography variant="subtitle2" fontSize="18px">
          You can help someone in need by Referring them to us and leading them
          to a vast cluster of professional & personal guidance.
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontSize="20px" mt={3} mb={3}>
          Here’s how you can do this -
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} mb={3}>
        <img src={refer} style={{ width: "100%" }} />
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="subtitle2" fontSize="18px">
          Each referral will be tracked and listed on the referral board for you
          to see. So, next up, here’s how your referral works -
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={5} mb={2}>
        <Grid container pl={2}>
          <Grid item xs={2} md={2} align="center">
            <div className="iconRoundDiv2">
              <img src={share} />
            </div>
            <Typography variant="h6" fontSize="18px" fontWeight="bold" mt={2}>
              You refer Hivepath
            </Typography>
          </Grid>

          <Grid
            item
            xs={1}
            md={1}
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
              <img src={people} />
            </div>
            <Typography variant="h6" fontSize="18px" fontWeight="bold" mt={2}>
              People join using your invite
            </Typography>
          </Grid>

          <Grid
            item
            xs={1}
            md={1}
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
              <img src={connect} />
            </div>
            <Typography variant="h6" fontSize="18px" fontWeight="bold" mt={2}>
              Referral helps interested people
            </Typography>
          </Grid>

          <Grid
            item
            xs={1}
            md={1}
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
              <img src={rewards} />
            </div>
            <Typography variant="h6" fontSize="18px" fontWeight="bold" mt={2}>
              You receive rewards!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontSize="18px" mt={3}>
          Yes! Your contribution to help others is appreciated and will be
          rewarded so don’t think twice before referring. Let others in on the
          adventure.
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} mt={3}>
        <Typography variant="h6" fontSize="18px">
          Let’s learn, share, and network together!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReferralNotification;
