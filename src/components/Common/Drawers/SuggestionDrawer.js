import React from "react";
import { SwipeableDrawer, Toolbar } from "@mui/material";

const SuggestionDrawer = ({
  open,
  closeDrawer,
  component,
  anchor,
  ...props
}) => {
  return (
    <React.Fragment key={"left"}>
      {/* <Button onClick={toggleDrawer('left', true)}>{'left'}</Button> */}
      <SwipeableDrawer
        anchor={anchor || "left"}
        open={open}
        onClose={closeDrawer}
        // onOpen={open}
        sx={{
          // display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            paddingTop: "32px",
            // width: drawerWidth
          },
        }}
        {...props}
      >
        <Toolbar style={{}} />
        {component}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default SuggestionDrawer;
