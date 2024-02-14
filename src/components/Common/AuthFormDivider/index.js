import { Typography } from "@mui/material";
import React from "react";

const AuthFormDivider = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "16px",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          width: "200px",
          height: "1px",
          background: "rgba(0,0,0,0.1)",
        }}
      />
      <Typography
        variant="body1"
        style={{ paddingRight: "8px", paddingLeft: "8px" }}
      >
        Or
      </Typography>
      <div
        style={{
          width: "200px",
          height: "1px",
          background: "rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

export default AuthFormDivider;
