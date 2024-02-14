import { Grid } from "@mui/material";
import React from "react";
import MyHosts from "../CommonComponents/MyUsers/MyHosts";
import SelectView from "../CommonComponents/SelectView";

const AttendeeViewMyHostSection = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <SelectView />
        </Grid>
        <Grid item md={10}>
          <MyHosts />
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendeeViewMyHostSection;
