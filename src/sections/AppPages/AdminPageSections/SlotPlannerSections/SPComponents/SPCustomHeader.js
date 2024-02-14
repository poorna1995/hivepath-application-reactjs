import { Typography } from "@mui/material";
import React from "react";

// Header for calendar month view

const SPCustomMonthHeader = ({ label }) => {
  // const labelDisplay = label.substring(0, 3);
  return (
    <div className="rbc-header">
      <Typography
        variant="body1"
        padding="8px"
        style={{
          textTransform: "uppercase",
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        {label && label}
      </Typography>
    </div>
  );
};

export default SPCustomMonthHeader;
