import { Grid } from "@mui/material";
import React from "react";
import SelectView from "../CommonComponents/SelectView";
import HostViewManageSection from "./ManageSection/HostViewManageSection";

const HostViewManageContainer = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <SelectView />
        </Grid>
        <Grid item md={10}>
          <HostViewManageSection />
        </Grid>
      </Grid>
    </div>
  );
};

export default HostViewManageContainer;
