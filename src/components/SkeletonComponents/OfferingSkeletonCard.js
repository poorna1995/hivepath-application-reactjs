import { Grid, Skeleton } from "@mui/material";
import PaperBase from "components/Common/PaperBase/PaperBase";
import React from "react";

const OfferingSkeletonCard = () => {
  return (
    <div style={{ padding: "8px" }}>
      <PaperBase style={{ minHeight: "300px", width: "600px" }}>
        <Grid container>
          <Grid item xs={3}>
            {" "}
            <Skeleton
              variant="circular"
              style={{ height: "60px", width: "60px" }}
            />
          </Grid>

          <Grid item xs={8} marginRight="16px">
            <Skeleton style={{ height: "30px", width: "200px" }} />
            <Skeleton style={{ height: "50px", width: "200px" }} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Skeleton style={{ height: "30px", width: "200px" }} />
            <Skeleton style={{ height: "30px", width: "200px" }} />
            <Skeleton style={{ height: "60px", width: "200px" }} />
          </Grid>
        </Grid>
      </PaperBase>
    </div>
  );
};

export default OfferingSkeletonCard;
