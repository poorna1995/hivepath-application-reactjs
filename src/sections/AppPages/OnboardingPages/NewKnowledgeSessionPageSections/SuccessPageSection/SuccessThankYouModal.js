import React from "react";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import GradientText from "components/Common/Typography/GradientText";
import { Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useHistory } from "react-router-dom";
import authFetch from "utils/authFetch";
import { useDispatch } from "react-redux";
import { setKnowledgeSessionOnboardingStatus } from "store/User/user.actions";
import { useSelector } from "react-redux";
import successGIF from "assets/gifs/onboarding/ks/success.gif";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const SuccessThankYouModal = ({ open, handleClose }) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleGoToHome = () => {
    // const url = "https://auth.hivepath.io/api/fetchUserOnboarding";
    // const data = {
    //   user_id: currentUser.user_id,
    //   type: "one-one",
    // };
    // authFetch(url, data)
    //   .then((json) => {
    //     if (json.status === "success") {
    //       dispatch(
    //         setKnowledgeSessionOnboardingStatus(json.result.onboarding_done)
    //       );
    history.push("/");
    handleClose();
    //   }
    // })
    // .catch((error) => console.log(error));
  };
  return (
    <HivepathBaseDialog open={open} handleClose={handleClose} hideButton>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          maxWidth: "500px",
          // paddingBottom: "24px",
          // paddingTop: "24px",
        }}
      >
        <img
          src={successGIF}
          alt=""
          style={{
            height: "150px",
            objectFit: "cover",
          }}
        />
        <GradientText
          style={{
            fontSize: "48px",
            fontWeight: "800",
            lineHeight: "58px",
          }}
          gradient={
            "linear-gradient(94.66deg, #183DFF 2.48%, #5D1EAE 39.58%, #F74B35 97.47%)"
          }
        >
          Thank You!
        </GradientText>
        <Typography
          style={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "23px",
            maxWidth: "70%",
            margin: "auto",
            // paddingTop: "24px",
            paddingBottom: "24px",
            textAlign: "center",
          }}
        >
          Your request to become a Host is underway!
          <br />
          Our team will now review & approve the same within 24 hours to publish
          it.
        </Typography>
        <PrimaryButton title={"Go to Home"} onClick={handleGoToHome} />
      </div>
    </HivepathBaseDialog>
  );
};

export default SuccessThankYouModal;
