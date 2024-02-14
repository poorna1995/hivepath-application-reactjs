import { Grid, Skeleton } from "@mui/material";

import PaperBase from "components/Common/PaperBase/PaperBase";
const ProfileSkeletonCard = () => {
  return (
    <div style={{ padding: "8px" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
          <Skeleton style={{ height: "35px", width: "100%" }} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileSkeletonCard;
