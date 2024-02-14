import React from "react";
import {
  Backdrop,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import apiCalendar from "components/ApiCalendar/ApiCalendar";
import { useDispatch, useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import googleCalendar from "assets/images/icons/google_calendar.png";

import { MdClose } from "react-icons/md";
import fetchCalendarView from "../utils/fetchCalendarView";
import { setSlots } from "store/calendarSlots/calendarSlotsSlice";
import { useState } from "react";
import { setCalendarSyncedEmails } from "store/User/user.actions";
import { useEffect } from "react";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  syncedEmails: user?.calendar_synced_emails,
});

const CalendarSyncDialog = ({
  handleClose,
  open,
  handleClientLoad,
  handleCloseBackdrop,
  openBackdrop,
}) => {
  // const [open, setOpen]=useState(false)
  // const { currentUser, syncedEmails } = useSelector(mapState);
  // const [signedIn, setSignedIn] = useState(false);
  // const dispatch = useDispatch();
  // // const [openBackdrop, setOpenBackdrop]= useState(false)

  // const enqueueSnackbar = useEnquequeSnackbar();
  // const USER_ID = currentUser.user_id;
  // const [syncedEmails, setSyncedEmails] = useState([]);

  //   const handleToggle = () => {
  //     setOpenBackdrop(!open);
  //   }
  //   const handleCloseBackdrop = () => {
  //     setOpenBackdrop(false)
  //   }

  //   let emails = syncedEmails?.map((item) => {
  //     const { email } = item;
  //     return email;
  //   });
  //   useEffect(() => {
  //     const script = document.createElement("script");
  //     script.async = true;
  //     script.defer = true;
  //     script.src = "https://apis.google.com/js/api.js";

  //     document.body.appendChild(script);

  //     // script.addEventListener("load", () => {
  //     //   if (window.gapi) handleClientLoad();
  //     // });
  //   }, []);
  //   const handleClientLoad = () => {
  //     initClient();
  //     // window?.gapi?.load("client:auth2", initClient);
  //   };
  //   const initClient = () => {
  //     const gapi = window?.gapi;

  //     gapi?.load("client:auth2", () => {
  //       gapi?.client?.init({
  //         apiKey: API_KEY,
  //         clientId: CLIENT_ID,
  //         // discoveryDocs: DISCOVERY_DOCS,
  //         scope: SCOPES,
  //       });
  //       gapi?.auth2
  //         ?.getAuthInstance()
  //         .signIn()
  //         .then((res) => {
  //           // console.log(res);

  // setOpenBackdrop(true)
  //           listUpcomingEvents(10);
  //         })
  //         .catch((err) => console.log(err));
  //     });
  //   };

  //   const listUpcomingEvents = (maxResults) => {
  //     window?.gapi?.client?.calendar?.events
  //       ?.list({
  //         calendarId: "primary",
  //         timeMin: new Date().toISOString(),
  //         showDeleted: false,
  //         singleEvents: true,
  //         maxResults: maxResults,
  //         orderBy: "startTime",
  //       })
  //       .then(({ result }) => {
  //         // console.log(result);

  //         return handleSyncCalendar(result);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return enqueueSnackbar(
  //           "Something went wrong. Please try again later!",
  //           {
  //             variant: "error",
  //           }
  //         );
  //       });
  //   };

  //   useEffect(() => {
  //     fetchEmails();
  //   }, [open]);

  //   // sync google calendar with hivepath calendar
  //   const handleSyncCalendar = async (response) => {
  //     const url = `${process.env.REACT_APP_HIVEPATH_AUTH_API_URL}/googleCalendarAuth`;
  //     const data = {
  //       user_id: USER_ID,
  //       response_from_google: response,
  //     };
  //     authFetch(url, data)
  //       .then((json) => {
  //         if (json.status === "success") {
  //           fetchCalendarView(USER_ID, emails).then((items) => {
  //             dispatch(setSlots(items));
  //           });
  //           fetchEmails();

  //           handleClose()
  //           handleCloseBackdrop()
  //           return enqueueSnackbar(json.message, {
  //             variant: "success",
  //           });
  //         } else {
  //           setSignedIn(false);

  //           return enqueueSnackbar(json.message, {
  //             variant: "error",
  //           });
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   };

  //   // fetch synced emails
  //   const fetchEmails = () => {
  //     const url = `${process.env.REACT_APP_HIVEPATH_AUTH_API_URL}/fetchUserData`;
  //     const data = {
  //       user_id: USER_ID,
  //     };
  //     authFetch(url, data)
  //       .then((json) => {
  //         console.log("json.external_calendar", json?.external_calendar);
  //         dispatch(setCalendarSyncedEmails(json?.external_calendar));
  //       })
  //       .catch((error) => console.log(error));
  //   };

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleClose}
      onBackdropClick={handleClose}
    >
      <Container style={{ padding: "16px" }}>
        <DialogTitle>Select calendar to connect</DialogTitle>
        <IconButton
          style={{ position: "absolute", top: "5px", right: "5px" }}
          onClick={handleClose}
        >
          <MdClose />
        </IconButton>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            width: "500px",
            paddingBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={googleCalendar}
              alt="Google Calendar logo"
              style={{ height: "40px", width: "40px", marginRight: "20px" }}
            />
            <Typography variant="body1"> Google Calendar </Typography>
          </div>
          <OutlinedButton
            title="Add Account"
            onClick={handleClientLoad}
            style={{
              height: "30px",
              // width: "108px",
              color: "black",

              border: "1px solid #D3D3D3",
            }}
          />
        </Container>

        {/* 
        
        Outlook part
        
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            paddingBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={outlookCalendar}
              alt="Outlook Calendar logo"
              style={{ height: "50px", width: "50px", marginRight: "20px" }}
            />

            <Typography variant="body1"> Outlook Calendar </Typography>
          </div>
          <OutlinedButton
            title="Sync"
            style={{
              height: "30px",
              width: "108px",
              color: "black",
              border: "1px solid #D3D3D3",
            }}
          />
        </Container> */}
        <LoadingBackdrop
          open={openBackdrop}
          handleClose={handleCloseBackdrop}
        />
      </Container>
    </Dialog>
  );
};

export default CalendarSyncDialog;
