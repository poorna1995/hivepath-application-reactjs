import { Grid } from "@mui/material";
import KnowldgeSessionHostPage from "pages/AppPages/SessionPages/Host/KnowldgeSessionHostPage";
import React from "react";
import { useState } from "react";
import { Route, Switch } from "react-router";
import MySessionsView from "../CommonComponents/MySessionsView";
import SelectView from "../CommonComponents/SelectView";

const HostViewContainer = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={2} sm={3} xs={12}>
          <SelectView />
        </Grid>
        <Grid item md={10} sm={9} xs={12}>
          <MySessionsView host />
        </Grid>
      </Grid>
    </div>
  );
};

export default HostViewContainer;
