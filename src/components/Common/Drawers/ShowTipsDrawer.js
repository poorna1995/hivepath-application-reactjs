import React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerBleeding = 100;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const ShowTipsDrawer = ({ open, handleClose, component, ...props }) => {
  // const [open, setOpen] = React.useState(false);

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };
  const container = window.document.body;
  return (
    <Root>
      <CssBaseline />
      {/* <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      /> */}
      {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
            <Button onClick={toggleDrawer(true)}>Open</Button>
          </Box> */}
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={handleClose}
        onOpen={open}
        sx={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
        // swipeAreaWidth={200}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {component}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default ShowTipsDrawer;
