import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import fourOhFourImage from "assets/svg/all/new-icons/no-page-found/404.svg";
import GradientText from "components/Common/Typography/GradientText";

const NoMatchPath = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Container
        // maxWidth="sm"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "800px",
          
        }}
      >
        <img src={fourOhFourImage} alt="" />{" "}
        <div style={{
          marginLeft:'24px'
        }}>
          {/* <Typography
            style={{
         
            }}
          >
            404
          </Typography> */}
          <GradientText
            gradient={
              "linear-gradient(94.66deg, #667EEA 2.48%, #FA709A 97.47%)"
            }
            style={{
              fontWeight: 700,
              fontSize: "36px",
              lineHeight: "44px",
              // marginTop: "-64px",
            }}
          >
            Page not found
          </GradientText>
          <Typography
            style={{
              fontWeight: 500,
              // fontSize: "36px",
              // lineHeight: "44px",
              // maxWidth: "480px",
              marginBottom: "32px",
              marginTop: "32px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                lineHeight: "23px",
                color: "#141414",
              }}
            >
              We can’t seem to find the page you are looking for. We will help
              you back to the homepage now{" "}
            </span>
          </Typography>
          <div
            style={{
              marginTop: "16px",
            }}
          >
            <Link
              to="/"
              style={{
                background: "#484A9E",
                borderRadius: "10px",
                padding: "16px",
                color: "white",
                fontSize: "16px",
              }}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NoMatchPath;
