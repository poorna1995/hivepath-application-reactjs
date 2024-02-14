import { Typography } from "@mui/material";
import React from "react";

const GradientText = ({ gradient, children, ...props }) => {
  return (
    <Typography
      sx={{
        width: "auto",
        backgroundColor: "rgba(24, 61, 255, 1)",
        display: "inline-block",
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
      
      {...props}
    >
      {children}
    </Typography>
  );
};

export default GradientText;
