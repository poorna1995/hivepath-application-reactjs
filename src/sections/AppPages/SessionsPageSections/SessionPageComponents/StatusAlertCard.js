import { Alert, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const StatusAlertCard = ({ content, component }) => {
  return (
    <Alert
      // icon={<CheckIcon fontSize="inherit" />}
      severity="info"
      style={{
        paddingLeft: "32px",
        background: "rgba(204, 47, 47, 0.05)",
        // border: "1px solid rgba(203, 30, 30, 0.5)",
        boxSizing: " border-box",
        borderRadius: " 15px",
        alignItems: "center",
      }}
      sx={{
        
        "& .MuiAlert-message": {
          width: "100%",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          width: "100%",
        }}
      >
        <Typography
          style={{
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "21px",
            flex: 1,
          }}
        >
          {content}
        </Typography>
        {component && component}
      </div>
    </Alert>
  );
};

export default StatusAlertCard;
