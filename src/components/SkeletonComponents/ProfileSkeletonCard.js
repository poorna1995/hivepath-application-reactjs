import { Skeleton } from "@mui/material";
import React from "react";

const ProfileSkeletonCard = () => {
  return (
    <div style={{ padding: "16px" }}>
      <div>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={300}
          height={350}
          style={{ borderRadius: "20px" }}
        />
      </div>
    </div>
  );
};

export default ProfileSkeletonCard;
