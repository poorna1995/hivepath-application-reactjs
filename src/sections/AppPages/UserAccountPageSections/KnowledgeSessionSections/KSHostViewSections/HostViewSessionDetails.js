import { Grid } from "@mui/material";
import KnowldgeSessionHostPage from "pages/AppPages/SessionPages/Host/KnowldgeSessionHostPage";
import React from "react";
import SelectView from "../CommonComponents/SelectView";

const HostViewSessionDetails = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <SelectView />
        </Grid>
        <Grid item md={10}>
          <KnowldgeSessionHostPage hide />
        </Grid>
      </Grid>
    </div>
  );
};

export default HostViewSessionDetails;
