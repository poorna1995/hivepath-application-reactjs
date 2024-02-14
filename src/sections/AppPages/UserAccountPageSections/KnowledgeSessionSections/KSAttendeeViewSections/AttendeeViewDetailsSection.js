import { Grid } from "@mui/material";
import KnowledgeSessionAttendeePage from "pages/AppPages/SessionPages/Attendee/KnowledgeSessionAttendeePage";
import React from "react";
import SelectView from "../CommonComponents/SelectView";

const AttendeeViewDetailsSection = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <SelectView />
        </Grid>
        <Grid item md={10}>
          <KnowledgeSessionAttendeePage hide />
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendeeViewDetailsSection;
