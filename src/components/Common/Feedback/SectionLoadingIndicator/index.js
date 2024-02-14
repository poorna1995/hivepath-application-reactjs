import { CircularProgress } from "@mui/material";
import React from "react";

const SectionLoadingIndicator = ({ minHeight }) => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: minHeight ? minHeight : "400px",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default SectionLoadingIndicator;
