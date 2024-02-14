import React from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Container, Dialog, DialogTitle, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MobileTimePicker } from "@mui/lab";
import { useState } from "react";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useDispatch } from "react-redux";
import { updateSlotStart } from "store/calendarSlots/calendarSlotsSlice";

const SPCustomPopUp = ({ handleOpen, handleClose, open, event }) => {
  const [startValue, setStartValue] = React.useState(event?.start || null);
  const [endValue, setEndValue] = useState(event?.end || null);

  const dispatch = useDispatch();

  const eventData = {
    id: event?.id,
    start: startValue,
    end: endValue,
    title: event?.title,
  };
  const updateSlot = (e) => {
    e.preventDefault();
    dispatch(updateSlotStart(eventData));
    // setAnchorEl(null);
    console.log(event);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} onBackdropClick={handleClose}>
      <DialogTitle>Set Available Time</DialogTitle>

      <Container
        maxWidth="md"
        sx={{
          background: "white",
          top: "30%",
          // position: "absolute",
          left: "10%",
          // padding:'32px'
        }}
      >
        <div>
          <Typography>
            Title:{event?.title}
            <br />
            {event?.id}
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ paddingTop: "16px" }}>
              <MobileTimePicker
                label="Add start time"
                value={startValue}
                onChange={(newValue) => {
                  setStartValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <MobileTimePicker
                label="Add End time"
                value={endValue}
                onChange={(newValue) => {
                  setEndValue(newValue);
                }}
                // shouldDisableTime={(timeValue, clockType) => {
                //   if (!error) {
                //     return true;
                //   }

                //   return false;
                // }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div style={{ display: "flex", padding: "8px" }}>
          <PrimaryButton
            title="Save"
            onClick={updateSlot}
            style={{ marginRight: "8px" }}
          ></PrimaryButton>
          <OutlinedButton onClick={handleClose} title="Close"></OutlinedButton>
        </div>
      </Container>
    </Dialog>
  );
};

export default SPCustomPopUp;
