import React from "react";
import Fab from "@mui/material/Fab";
import { Popover, Typography, Popper, Fade, Paper } from "@mui/material";
import LandingPagePopoverContent from "./LandingPagePopoverContent";
import { ReactComponent as CloseIcon } from "assets/svg/all/new-icons/landing-page/close.svg";
import GradientText from "components/Common/Typography/GradientText";

const LandingPageFab = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
    <div>
      {open ? (
        <Fab
          disableRipple
          sx={{
            position: "fixed",
            bottom: 16,
            right: 28,
            zIndex: "100",
            // borderRadius: "10px",
            bgcolor: "common.white",
            color: "common.black",
            "&:hover": {
              bgcolor: "common.white",
            },
          }}
          onClick={handleClick("top-start")}
        >
          <CloseIcon />
        </Fab>
      ) : (
        <Fab
          disableRipple
          sx={{
            position: "fixed",
            width: "160px",
            height: "58px",
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
          onClick={handleClick("top-start")}
        >
          <GradientText
            style={{
              fontWeight: "700",
              textTransform: "capitalize",
              fontSize: "18px",
            }}
          >
            Get Started
          </GradientText>
          {/* <NavigationIcon sx={{ mr: 1 }} /> */}
        </Fab>
      )}

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        style={{ zIndex: "100" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              style={{
                padding: "16px",
                boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.06)",
                borderRadius: "10px",
                width: "400px",
                margin: "16px",
              }}
            >
              <LandingPagePopoverContent />
            </Paper>
          </Fade>
        )}
      </Popper>
      {/* <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            padding: "16px",
            boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.06)",
            borderRadius: "10px",
            width: "400px",
          },
        }}
      >
      </Popper> */}
    </div>
  );
};

export default LandingPageFab;
