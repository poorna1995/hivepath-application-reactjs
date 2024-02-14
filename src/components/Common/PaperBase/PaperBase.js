import { Paper } from "@mui/material";
import React from "react";

const PaperBase = ({ style, children }) => {
  return (
    <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
      <Paper
        style={style}
        sx={{
          boxShadow: "none",

          // boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.06)",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(0,0,0,0.1)",
          padding: { md: "16px", xs: "8px" },
        }}
      >
        {children}
      </Paper>
    </div>
  );
};

export default PaperBase;
