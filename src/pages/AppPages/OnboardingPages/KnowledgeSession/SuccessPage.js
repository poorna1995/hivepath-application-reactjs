import AppHeader from "components/AppHeader";
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useHistory } from "react-router";
import { ReactComponent as FilledCheckCircleIcon } from "assets/svg/onboarding-pages/knowledge-session/filled-check-circle.svg";
import successGIF from "assets/gifs/successful-animation.gif";

const KnowledgeSessionOnboardingSuccessPage = () => {
  let history = useHistory();
  const handleClick = () => {
    history.push("/");
  };

  return (
    <div style={{ heigt: "100vh" }}>
      <AppHeader />
      {/* A card with success message */}
      <Container
        maxWidth="md"
        style={{ display: "grid", placeItems: "center", height: "90vh" }}
      >
        <Card
          style={{
            textAlign: "center",
            height: "400px",
            width: "700px",
            background: "rgba(255, 255, 255, 0.6)",
            border: "2px solid #FFFFFF",
            boxSizing: " border-box",
            boxShadow: "0px 4px 50px 4px rgba(72, 74, 158, 0.03)",
            borderRadius: "15px",
          }}
        >
          <div>
            <img
              src={successGIF}
              alt=""
              style={{ height: "100px", width: "100px", objectFit: "contain" }}
            />
            {/* <FilledCheckCircleIcon /> */}
          </div>
          <CardContent style={{ paddingTop: "32px" }}>
            <Typography
              variant="h5"
              fontSize="28px"
              fontWeight="700"
              component="h1"
              lineHeight="34px"
            >
              Awesome, Sucessfully Submitted
            </Typography>
            <Typography
              style={{
                paddingTop: "32px",
                maxWidth: "400px",
                textAlign: "center",
                margin: "auto",
                paddingBottom: "32px",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "23px",
              }}
            >
              Your request is sent for approval and we will keep you updated
            </Typography>
            <PrimaryButton title="Go to Home" onClick={handleClick} />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default KnowledgeSessionOnboardingSuccessPage;
