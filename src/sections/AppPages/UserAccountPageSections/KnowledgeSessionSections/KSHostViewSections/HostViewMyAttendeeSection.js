import { Grid } from "@mui/material";
import React from "react";
import KSHostViewMyAttendee from "../CommonComponents/MyUsers/MyAttendee";
import SelectView from "../CommonComponents/SelectView";

const HostViewMyAttendeeSection = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <SelectView />
        </Grid>
        <Grid item md={10}>
          <KSHostViewMyAttendee />
        </Grid>
      </Grid>
    </div>
  );
};

export default HostViewMyAttendeeSection;
