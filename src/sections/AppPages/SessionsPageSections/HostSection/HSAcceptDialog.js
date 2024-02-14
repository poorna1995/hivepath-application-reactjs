import { DialogActions, DialogTitle } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { SCHEDULE_SERVICES } from "constants/API_URLS";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHostBooking,
  fetchHostSessionStatus,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import SessionPageBaseDialog from "../SessionPageComponents/SessionPageBaseDialog";
import MeetingLinkIssueSolutionDialog from "./MeetingLinkIssueSolutionDialog";

const mapState = ({ user, sessions, slotsData }) => ({
  currentUser: user.currentUser,
  bookingDetails: sessions.hostBookingDetails,
  session: sessions?.hostSession,
  timezone: slotsData.timezone,
});

const HSAcceptDialog = ({ bookingId, open, handleClose }) => {
  const { currentUser, bookingDetails, session, timezone } =
    useSelector(mapState);

  const USER_ID = currentUser.user_id;

  const { from, to, description, booking_id, date, requestor_email } =
    bookingDetails;
  const { title } = session;
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fromTime = date && from && getTimeBasedOnTimezone(date, from, timezone);
  const toTime = date && from && getTimeBasedOnTimezone(date, to, timezone);
  const formatFromTime = fromTime && format(fromTime, "hh:mma");
  const formatToTime = toTime && format(toTime, "hh:mma");

  const [openMeetingLinkModal, setOpenMeetingLinkModal] = useState(false);
  const fetchBookingUrl = SCHEDULE_SERVICES.FETCH_SCHEDULE_BOOKING;

  const handleLinkModal = () => {
    setOpenMeetingLinkModal(true);
  };
  const handleCloseModal = () => {
    setOpenMeetingLinkModal(false);
  };
  const fetchBookingDetails = (bookingId) => {
    const data = {
      booking_id: bookingId,
    };
    authFetch(fetchBookingUrl, data).then((json) => {
      console.log("bookingDetails", json);
      const sessionID = json.result[0]?.session_id;
      const requesterID = json.result[0]?.requested_by;
      const ownerID = json.result[0]?.session_owner;

      sessionTrackingDetails(requesterID, data?.booking_id);
      // setBookingDetails(json?.result[0]);
      dispatch(fetchHostBooking(json?.result[0]));

      setLoading(false);
    });
  };

  const sessionTrackingDetails = (userID, bookingID) => {
    // setTrackingLoading(true);
    const data = {
      user_id: userID,
      booking_id: bookingID,
      // user_id: "613b036ac217a9716eb016ac",
      // booking_id: "0a806b94-5131-11ec-b350-93bfa785240f",
      key: "host",
    };
    const sessionStatusUrl =
      "https://schedule.hivepath.io/api/sessionStatusTracking";

    authFetch(sessionStatusUrl, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        const status = json.result.session_status;
        const message = json.result.status_message;
        dispatch(fetchHostSessionStatus(json?.result));
        // setSessionStatus(status);
        // setSessionMessage(message);
        // setMessageTag(json.result.message_tag);
        // setTrackingLoading(false);
      }
    });
  };

  const handleAccept = () => {
    setLoading(true);

    const url = "https://schedule.hivepath.io/api/approveBooking";
    const data = {
      booking_id: booking_id,
      type: "one-one",
      user_id: USER_ID,
      topic_name: title ? title : "",
      // description,
      date,
      from: formatFromTime,
      to: formatToTime,
      recipients: requestor_email,

      action: "approve", //<"reject"/"cancel"/"approve">
    };

    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          handleClose();

          fetchBookingDetails(booking_id);
          enqueueSnackbar(json.message, {
            variant: "success",
          });
          console.log(json);
        } else {
          setLoading(false);
          handleClose();
          handleLinkModal();

          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
        console.log(json);
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar("Could not complete action");
      });
  };

  return (
    <div>
      <SessionPageBaseDialog open={open} handleClose={handleClose}>
        <DialogTitle
          style={{
            fontSize: "28px",
            fontWeight: "700",
            lineHeight: "32px",
          }}
        >
          Do you want to accept the request
        </DialogTitle>
        <DialogActions
          style={{
            justifyContent: "center",
          }}
        >
          <OutlinedButton
            title={"No"}
            onClick={handleClose}
            style={{
              width: "70px",
            }}
          />
          <PrimaryButton
            title="Yes"
            onClick={handleAccept}
            style={{
              width: "70px",
            }}
          />
        </DialogActions>
      </SessionPageBaseDialog>

      <MeetingLinkIssueSolutionDialog
        open={openMeetingLinkModal}
        handleClose={handleCloseModal}
      />
      <LoadingBackdrop open={loading} handleClose={() => setLoading(false)} />
    </div>
  );
};

export default HSAcceptDialog;
