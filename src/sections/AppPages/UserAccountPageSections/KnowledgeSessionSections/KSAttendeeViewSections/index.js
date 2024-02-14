import { Grid } from "@mui/material";
import React from "react";
import MySessionsView from "../CommonComponents/MySessionsView";
import SelectView from "../CommonComponents/SelectView";

const KSAttendeeViewSection = () => {
  return (
    <Grid container spacing={1}>
      <Grid item md={2} sm={3} xs={12}>
        <SelectView />
      </Grid>
      <Grid item md={10} sm={9} xs={12}>
        <MySessionsView />
      </Grid>
    </Grid>
  );
};

export default KSAttendeeViewSection;
