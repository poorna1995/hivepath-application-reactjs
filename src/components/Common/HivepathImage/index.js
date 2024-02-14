import React from "react";
import Image from "mui-image";
import { Skeleton } from "@mui/material";

const HivepathImage = ({ src, ...props }) => {
  return <Image src={src} showLoading={<></>} shift={null} {...props} />;
};

export default HivepathImage;
