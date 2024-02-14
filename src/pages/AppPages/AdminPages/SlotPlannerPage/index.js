import SlotPlannerLayout from "Layouts/AppLayouts/SlotPlannerLayout";
import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Grid, Typography } from "@mui/material";
import SlotPlannerCalendar from "sections/AppPages/AdminPageSections/SlotPlannerSections/SlotPlannerCalendar";
import { useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useState } from "react";
import { Box } from "@mui/system";
import SyncExternalCalendarSections from "sections/AppPages/AdminPageSections/SlotPlannerSections/SyncExternalCalendarSection";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SlotPlannerPage = () => {
  const { currentUser } = useSelector(mapState);

  const enqueueSnackbar = useEnquequeSnackbar();
  const USER_ID = currentUser.user_id;

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <SlotPlannerLayout title="Slot Planner- Hivepath">
      <Container
        maxWidth="xl"
        sx={{ pt: "16px" }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="700"
          fontSize="32px"
          letterSpacing="-1px"
        >
          Set Availability
        </Typography>
        {/* <OutlinedButton
          onClick={handleOpen}
          title="Calendar Syncing"
          style={{
            width: "auto",
            height: "48px",
            color: "black",
            border: "1px solid #D3D3D3",
            fontWeight: "600",
            background: "white",
          }}
        ></OutlinedButton> */}
      </Container>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} md={9} sm={12}>
            <Box
              sx={{
                pt: "16px",
                pb: "32px",
                background: "white",
                marginTop: "16px",
                borderRadius: "14px",
                boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.05)",
              }}
            >
              <SlotPlannerCalendar />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            paddingRight="16px"
            paddingTop="16px"
          >
            <SyncExternalCalendarSections />
          </Grid>
        </Grid>
      </Container>
      {/* <CreateOfferings /> */}

      {/* <CalendarSyncDialog handleClose={handleClose} open={open} /> */}
    </SlotPlannerLayout>
  );
};

export default SlotPlannerPage;
