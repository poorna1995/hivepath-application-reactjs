import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSlots } from "store/calendarSlots/calendarSlotsSlice";
import authFetch from "utils/authFetch";
import fetchCalendarView from "../../utils/fetchCalendarView";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { FormControlLabel, Radio, Typography } from "@mui/material";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  syncedEmailsFetch: user.syncedEmailsFetch,
});

const DeleteEventPopup = ({ event, open, handleClose }) => {
  const { currentUser, syncedEmailsFetch } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const dispatch = useDispatch();
  const enqueueSnackbar = useEnquequeSnackbar();
  const handleRemoveEvent = () => {
    // console.log(event);

    const data = {
      user_id: USER_ID,
      type: "one-one",
      // key: "time",
      object_id: event.object_id,
      // date_object_id: event.date_object_id,
    };
    const url = `${process.env.REACT_APP_HIVEPATH_CALENDAR_API_URL}/deleteSlotPlan`;
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        const user_id = USER_ID;
        // fetchSlotPlan(user_id).then((json) => {
        //   console.log("json", json);
        //   dispatch(setSlots(json));
        // });
        handleClose();
        fetchCalendarView(user_id, syncedEmailsFetch).then((items) => {
          dispatch(setSlots(items));
        });
        // dispatch(fetchSlotsStart)
        //  dispatch(fetchSlotsStart(json?.result.slot_data?.one-one.slot_plan));

        enqueueSnackbar(json?.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(json?.message, {
          variant: "error",
        });
      }
      console.log(json);
    });
  };

  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "480px",
          flexDirection: "column",
          paddingLeft: "8px",
          paddingRight: "8px",
          marginTop: "16px",
          // alignItems: "center",
        }}
      >
        <Typography fontSize={`20px`} fontWeight={`700`} paddingBottom="16px">
          Do you want to remove from your Calendar?
        </Typography>

        {/* <FormControlLabel
          label={
            <Typography
              fontSize="18px"
              fontWeight="500"
              style={{
                textAlign: "left",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              Only This Slot
            </Typography>
          }
          control={<Radio />}
        
        
        /> */}

        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <PrimaryButton title={`Confirm`} onClick={handleRemoveEvent} />
        </div>
        {/* {event.object_id && event.object_id} */}
      </div>
    </HivepathBaseDialog>
  );
};

export default DeleteEventPopup;
