import styled from "@emotion/styled";
import {
  Box,
  Chip,
  LinearProgress,
  Typography,
  linearProgressClasses,
  CircularProgress,
  circularProgressClasses,
  Avatar,
} from "@mui/material";
import React from "react";
import { ReactComponent as LockedIcon } from "assets/svg/all/new-icons/landing-page/locked.svg";
import { Link } from "react-router-dom";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#EDEDED",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: "linear-gradient(94.66deg, #484A9E 2.48%, #8FBAE3 97.47%)",
  },
}));

function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        value={40}
        sx={{
          color: "#22B04A",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
const LandingPagePopoverContent = () => {
  return (
    <Box>
      <Typography
        textAlign={"center"}
        style={{
          marginBottom: "10px",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "19px",
        }}
      >
        Profile Strength: <b>Intermediate</b>
      </Typography>
      <BorderLinearProgress value={30} variant="determinate" />
      <div
        style={{
          margin: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <FacebookCircularProgress value="40" />
          <Link to="/onboarding/user-profile/step-one">
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "17px",
              }}
            >
              Complete Your Profile
            </Typography>
          </Link>
          <Chip
            label="In Progress"
            style={{
              background: "rgba(33, 184, 116, 1)",
              color: "white",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ paddingTop: "0px", paddingBottom: "4px" }}>
          <div
            style={{
              width: "2px",
              background: "#1CB46F",
              height: "50px",
              borderRadius: "5px",
              marginLeft: "20px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{
              background: "rgba(216, 216, 216, 1)",
            }}
          >
            <LockedIcon />
          </Avatar>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "17px",
            }}
          >
            Create your first offering
          </Typography>
          <Chip
            label="Complete"
            style={{
              background: "rgba(115, 115, 115, 0.4)",
              color: "white",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>

      <Typography
        style={{
          fontWeight: "normal",
          fontSize: "9px",
          lineHeight: "11px",
          textAlign: "center",
          color: "rgba(0, 0, 0, 0.5)",
          margin: "16px",
        }}
      >
        Update your profile and view the full potential of Hivepath services by
        clicking the links above.
      </Typography>
    </Box>
  );
};

export default LandingPagePopoverContent;
