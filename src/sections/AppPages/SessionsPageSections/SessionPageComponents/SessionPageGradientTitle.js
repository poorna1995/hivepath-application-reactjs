import { Typography } from "@mui/material";
import React from "react";

const SessionPageGradientTitle = ({ userName, gradient, ...props }) => {
  return (
    <div>
      <Typography
        style={{
          width: "auto",
          fontWeight: "800",
          fontSize: "24px",
          lineHeight: "29px",
          backgroundColor: "rgba(24, 61, 255, 1)",
          backgroundImage:
            gradient ||
            "linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",

          WebkitTextFillColor: "transparent",
          backgroundRepeat: "repeat",
          MozBackgroundClip: "text",
          MozTextFillColor: "transparent",
        }}
      >
        {userName || ""}
      </Typography>
    </div>
  );
};

export default SessionPageGradientTitle;
