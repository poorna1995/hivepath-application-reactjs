import { Grid, Skeleton } from "@mui/material";

import React from "react";

const ProfileInfoSkeleton = () => {
  return (
    <div style={{ padding: "8px" }}>
      <Grid container>
        <Grid item xs={2}>
          {" "}
          <Skeleton
            variant="circular"
            style={{ height: "150px", width: "150px" }}
          />
        </Grid>

        <Grid item xs={8}>
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileInfoSkeleton;
