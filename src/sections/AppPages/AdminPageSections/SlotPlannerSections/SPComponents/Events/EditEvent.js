import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Container,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { differenceInMinutes, format } from "date-fns";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSlotStart,
  setSlot,
  setSlots,
} from "store/calendarSlots/calendarSlotsSlice";
import authFetch from "utils/authFetch";
import fetchSlotPlan from "../../utils/fetchSlotPlan";

const mapState = ({ calendarSlots, user }) => ({
  slots: calendarSlots.slots,
  currentUser: user.currentUser,
});

const EditEvent = ({ event, handleClose, open }) => {
  const { slots, currentUser } = useSelector(mapState);

  const USER_ID = currentUser.user_id;

  const [startTimeAndDate, setStartTimeAndDate] = useState();

  const [endTimeAndDate, setEndTimeAndDate] = useState();
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    setStartTimeAndDate(event.start);
    setEndTimeAndDate(event.end);
  }, [event.start, event.end]);

  const eventData = {
    start: startTimeAndDate,
    end: endTimeAndDate,

    title: "Available",
  };

  const updateSlot = (e) => {
    e.preventDefault();

    try {
      const schema = {
        user_id: USER_ID,
        type: "one-one",
        object_id: event.object_id,
        key: "time",
        from: format(startTimeAndDate, "hh:mma"),
        to: format(endTimeAndDate, "hh:mma"),
        timezone: format(startTimeAndDate, "OOOO"),
        availability: true,
      };

      // Backend connection
      const url = `${process.env.REACT_APP_HIVEPATH_UTIL_API_URL}/updateSlotPlan`;

      authFetch(url, schema).then((json) => {
        console.log(json);
        if (json.status === "success") {
          const user_id = USER_ID;
          fetchSlotPlan(user_id).then((json) => {
            console.log("json", json);
            dispatch(setSlots(json));
          });

          return enqueueSnackbar("Availability Updated Successfully", {
            variant: "success",
          });
        } else {
          return enqueueSnackbar("Error while completing operation", {
            variant: "error",
          });
        }
      });
      // }
    } catch (error) {
      console.log(error);
    }

    // Redux store
    // dispatch(setSlot({}));
    // dispatch(addSlotStart([...slots, eventData]));

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
          <Typography>{event.title}</Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ paddingTop: "16px" }}>
              <DateTimePicker
                label="Add start time"
                value={startTimeAndDate}
                onChange={(newValue) => {
                  setStartTimeAndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="Add End time"
                value={endTimeAndDate}
                onChange={(newValue) => {
                  setEndTimeAndDate(newValue);
                }}
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

export default EditEvent;
