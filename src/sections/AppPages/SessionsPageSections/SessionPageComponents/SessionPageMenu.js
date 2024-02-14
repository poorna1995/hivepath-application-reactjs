import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Button, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { MdMoreHoriz } from "react-icons/md";
import authFetch from "utils/authFetch";
import { useDispatch, useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import {
  fetchHostBooking,
  fetchHostSessionStatus,
  setCancelSessionReason,
  setDeclineSessionReason,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import { useState } from "react";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import SessionDeclineDialog from "./SessionDeclineDialog";
import SessionCancelDialog from "./SessionCancelDialog";
import { SCHEDULE_SERVICES } from "constants/API_URLS";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const mapState = ({ sessions, user }) => ({
  bookingDetails: sessions.hostBookingDetails,
  user: user,
  allSessions: sessions,
});

const SessionPageMenu = ({ isAttendeePage, isHostPage, sessions }) => {
  const { bookingDetails, user, allSessions } = useSelector(mapState);
  const bookingID = bookingDetails.booking_id;

  const enqueueSnackbar = useEnquequeSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDeclineDialog, setOpenDeclineDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleDeclineDialogOpen = () => {
    setOpenDeclineDialog(true);
  };
  const handleDeclineDialogClose = () => {
    setOpenDeclineDialog(false);
  };
  const handleCancelDialogOpen = () => {
    setOpenCancelDialog(true);
  };
  const handleCancelDialogClose = () => {
    setOpenCancelDialog(false);
  };

  const fetchBookingUrl = SCHEDULE_SERVICES.FETCH_SCHEDULE_BOOKING;

  const fetchBookingDetails = (bookingId) => {
    setLoading(true);
    const data = {
      booking_id: bookingId,
    };
    authFetch(fetchBookingUrl, data).then((json) => {
      console.log("bookingDetails", json);
      const sessionID = json.result[0]?.session_id;
      const requesterID = json.result[0]?.requested_by;
      const ownerID = json.result[0]?.session_owner;

      sessionTrackingDetails(requesterID, data?.booking_id);
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
        dispatch(fetchHostSessionStatus(json.result));
        // setSessionStatus(status);
        // setSessionMessage(message);
        // setMessageTag(json.result.message_tag);
        // setTrackingLoading(false);
      }
    });
  };

  const handleDeclineClick = (e, bookingId) => {
    setLoading(true);
    const url = "https://schedule.hivepath.io/api/approveBooking";
    const data = {
      user_id: user.currentUser.user_id,
      booking_id: bookingId,
      action: (isHostPage && "decline") || (isAttendeePage && "cancel"), //<"reject"/"cancel"/"approve">
      action_reason: isHostPage
        ? allSessions.declineSessionReason
        : allSessions.cancelSessionReason,
    };

    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        enqueueSnackbar(json.message, {
          variant: "success",
        });
        fetchBookingDetails(bookingId);

        dispatch(setDeclineSessionReason(""));
        dispatch(setCancelSessionReason(""));
        setLoading(false);
      } else {
        enqueueSnackbar(json.message, {
          variant: "error",
        });
        setLoading(false);
      }
      handleDeclineDialogClose();
      console.log(json);
      // handleClose();
    });
  };

  return (
    <>
      {isAttendeePage && (
        <OutlinedButton
          title={`Cancel`}
          // onClick={(e) => handleDeclineClick(e, bookingID)}
          onClick={handleDeclineDialogOpen}
        />
      )}
      {isHostPage && (
        <OutlinedButton
          title={`Cancel`}
          onClick={handleDeclineDialogOpen}
          // onClick={(e) => handleDeclineClick(e, bookingID)}
        />
      )}
      {/* <IconButton
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        // disableElevation
        style={{
          background: "#FFFFFF",
          boxShadow: "0px 0px 14px rgba(72, 74, 158, 0.15)",
        }}
        onClick={handleClick}
        // endIcon={<KeyboardArrowDownIcon />}
      >
        // {/* Options 
        <MdMoreHoriz />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isAttendeePage && [
          <MenuItem onClick={handleClose} disableRipple>
            Reschedule this call
          </MenuItem>,
          <MenuItem
            onClick={(e) => handleDeclineClick(e, bookingID)}
            disableRipple
          >
            Cancel
          </MenuItem>,
        ]}
        {isHostPage && (
          <MenuItem onClick={(e) => handleDeclineClick(e, bookingID)}>
            Decline
          </MenuItem>
        )}
      </StyledMenu> */}
      <LoadingBackdrop open={loading} handleClose={() => setLoading(false)} />

      {isHostPage && (
        <SessionDeclineDialog
          open={openDeclineDialog}
          handleClose={handleDeclineDialogClose}
          onClick={(e) => handleDeclineClick(e, bookingID)}
        />
      )}
      {isAttendeePage && (
        <SessionCancelDialog
          open={openDeclineDialog}
          handleClose={handleDeclineDialogClose}
          onClick={(e) => handleDeclineClick(e, bookingID)}
        />
      )}
    </>
  );
};

export default SessionPageMenu;
