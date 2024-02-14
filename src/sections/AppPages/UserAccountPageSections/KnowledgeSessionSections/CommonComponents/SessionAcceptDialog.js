import { DialogActions, DialogTitle } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { SCHEDULE_SERVICES } from "constants/API_URLS";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MeetingLinkIssueSolutionDialog from "sections/AppPages/SessionsPageSections/HostSection/MeetingLinkIssueSolutionDialog";
import {
  fetchHostBooking,
  fetchHostSessionsStart,
  fetchHostSessionStatus,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import { setSectionLoading } from "store/loaders/loadersSlice";
import authFetch from "utils/authFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SessionAcceptDialog = ({ open, handleClose, bookingDetails }) => {
  const { currentUser } = useSelector(mapState);

  const USER_ID = currentUser.user_id;

  const { from, to, booking_id, date, requestor_email, title } = bookingDetails;

  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openLinkIssueModal, setOpenLinkIssueModal] = useState(false);

  const handleOpenLinkIssueModal = () => {
    setOpenLinkIssueModal(true);
  };
  const handleCloseLinkIssueModal = () => {
    setOpenLinkIssueModal(false);
  };
  const fetchBookingUrl = SCHEDULE_SERVICES.FETCH_SCHEDULE_BOOKING;

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
  const fetchKnowledgeSessions = () => {
    const url = SCHEDULE_SERVICES.AGGREGATED_SESSION_VIEW;
    const data = {
      user_id: USER_ID,
      view_type: "host",
    };
    // dispatch(fetchK)
    dispatch(setSectionLoading(true));
    dispatch(fetchHostSessionsStart({ url, data }));
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
      from,
      to,
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
          fetchKnowledgeSessions();

          console.log(json);
        } else {
          setLoading(false);
          handleClose();
          handleOpenLinkIssueModal();
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
      <HivepathBaseDialog open={open} handleClose={handleClose}>
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
      </HivepathBaseDialog>
      <MeetingLinkIssueSolutionDialog
        open={openLinkIssueModal}
        handleClose={handleCloseLinkIssueModal}
      />
      <LoadingBackdrop open={loading} handleClose={() => setLoading(false)} />
    </div>
  );
};

export default SessionAcceptDialog;
