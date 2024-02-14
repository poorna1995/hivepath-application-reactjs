import { Grid } from "@mui/material";
import React from "react";

const TableHeader = () => {
  return (
    <Grid
      container
      style={{
        padding: "16px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      <Grid item xs={6} style={{ fontWeight: 500, fontSize: "16px" }}>
        Title
      </Grid>
      <Grid item xs={4} style={{ fontWeight: 500, fontSize: "16px" }}>
        Category
      </Grid>
      <Grid item xs={2} style={{ fontWeight: 500, fontSize: "16px" }}>
        Actions
      </Grid>
    </Grid>
  );
};

export default TableHeader;
