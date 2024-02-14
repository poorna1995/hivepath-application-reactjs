import { Container, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import SlotPlannerLayout from "Layouts/AppLayouts/SlotPlannerLayout";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CalendarSyncDialog from "sections/AppPages/AdminPageSections/SlotPlannerSections/CalendarSyncDialog";
import SlotPlannerMonthView from "sections/AppPages/AdminPageSections/SlotPlannerSections/SlotPlannerMonthView/SlotPlannerMonthView";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SlotPlannerMonthViewPage = () => {
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
    <SlotPlannerLayout title="Slot Planner Month View">
      <Container
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
        <OutlinedButton
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
        ></OutlinedButton>
      </Container>
      <Container
        sx={{
          pt: "16px",
          pb: "32px",
          background: "white",
          marginTop: "16px",
          borderRadius: "14px",
          boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* <CreateOfferings /> */}
        <SlotPlannerMonthView />
      </Container>
      <CalendarSyncDialog handleClose={handleClose} open={open} />
    </SlotPlannerLayout>
  );
};

export default SlotPlannerMonthViewPage;
