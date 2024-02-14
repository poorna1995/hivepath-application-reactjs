import React from "react";
import Fab from "@mui/material/Fab";
import GradientText from "components/Common/Typography/GradientText";

const CustomFab = ({ handleClick, title, icon }) => {
  return (
    <Fab
      disableRipple
      sx={{
        position: "fixed",
        // width: "160px",
        // height: "58px",
        bottom: 16,
        right: 16,
        zIndex: "100",
        borderRadius: "10px",
        bgcolor: "common.white",
        color: "common.black",
        "&:hover": {
          bgcolor: "common.white",
        },
      }}
      variant="extended"
      onClick={handleClick}
    >
      <GradientText
        style={{
          fontWeight: "700",
          textTransform: "capitalize",
          fontSize: "18px",
        }}
      >
        {icon && icon}
        {title}
      </GradientText>
      {/* <NavigationIcon sx={{ mr: 1 }} /> */}
    </Fab>
  );
};

export default CustomFab;
