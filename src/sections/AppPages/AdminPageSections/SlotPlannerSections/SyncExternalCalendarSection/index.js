import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import React, { useEffect } from "react";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import AccountListCheckbox from "./AccountListCheckbox";
import googleCalendar from "assets/images/icons/google_calendar.png";
import { FaPlus } from "react-icons/fa";
import authFetch from "utils/authFetch";
import { setSlots } from "store/calendarSlots/calendarSlotsSlice";
import { setCalendarSyncedEmails } from "store/User/user.actions";
import fetchCalendarView from "../utils/fetchCalendarView";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { ReactComponent as PlusIcon } from "assets/svg/onboarding-pages/knowledge-session/plus-icon.svg";
import noCalendarSynced from "assets/images/onboarding-pages/knowledge-session/no-sync-calendar.png";
import { Box } from "@mui/system";
import { setSyncedEmailsFetch } from "store/User/user.actions";
import GoogleLogin from "react-google-login";
import { CALENDAR_SERVICES } from "constants/API_URLS";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  syncedEmails: user.calendar_synced_emails,
  syncedEmailsFetch: user.syncedEmailsFetch,
});

const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

const CLIENT_ID =
  "300377652705-vtn53kvm8dioq8h8oj7f9en9s8k7r490.apps.googleusercontent.com";

const SyncExternalCalendarSections = ({ isInAvailability }) => {
  const { currentUser, syncedEmails, syncedEmailsFetch } =
    useSelector(mapState);
  const [signedIn, setSignedIn] = useState(false);
  const dispatch = useDispatch();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const syncedEmail =
    syncedEmails?.map((item) => {
      const { sync, email } = item;
      if (sync)
        return {
          sync,
          email,
        };

      return null;
    }) || [];

  const enqueueSnackbar = useEnquequeSnackbar();
  const USER_ID = currentUser.user_id;
  const responseGoogle = (res) => {
    console.log(res);
    if (res.error) return null;

    handleSyncCalendar(res.code);
  };

  // sync google calendar with hivepath calendar
  const handleSyncCalendar = async (response) => {
    setOpenBackdrop(true);
    // const { access_token, token_type } = response;
    // https://auth.hivepath.io/api/syncCalendarAccount
    // const url = `${process.env.REACT_APP_HIVEPATH_AUTH_API_URL}/syncCalendarAccount`;
    const url = CALENDAR_SERVICES.SYNC_CALENDAR_ACCOUNT;
    const data = {
      user_id: USER_ID,
      code: response,
      origin: "google",
    };
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          fetchCalendarView(USER_ID, syncedEmailsFetch).then((items) => {
            dispatch(setSlots(items));
          });
          fetchEmails();
          handleClose();
          handleCloseBackdrop();

          return enqueueSnackbar(json.message, {
            variant: "success",
          });
        } else {
          handleCloseBackdrop();

          return enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  // fetch synced emails
  const fetchEmails = () => {
    // https://auth.hivepath.io/api/fetchSyncedCalendar
    const url = CALENDAR_SERVICES.FETCH_SYNCED_CALENDAR;

    const data = {
      user_id: USER_ID,
    };
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          dispatch(setCalendarSyncedEmails(json?.result));
          dispatch(
            setSyncedEmailsFetch(
              json.result.map((item) => {
                const { email } = item;
                return email;
              })
            )
          );
        }
        // console.log("json.external_calendar", json?.external_calendar);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        border: "2px solid #FFFFFF",
        boxSizing: "border-box",
        // boxShadow: " 0px 4px 50px 4px rgba(72, 74, 158, 0.03)",
        // borderRadius: "15px",
        // maxWidth: "300px",
        margin: "auto",
        // height:'500px'
      }}
    >
      {isInAvailability && (
        <List
        // style={{ background: "white", border: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <ListItem style={{ display: "block" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  height: "20px",
                  width: "20px",
                  background: "rgba(72, 74, 158, 0.3)",
                  marginRight: "10px",
                  // border: "1px solid rgba(0, 0, 0, 0.4)",
                }}
              ></span>

              <ListItemText
                primary="Available"
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                secondary="Available time slots for sessions."
              />
            </div>
          </ListItem>

          <ListItem style={{ display: "block" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  height: "20px",
                  width: "20px",
                  background: "white",
                  marginRight: "10px",
                  border: "1px solid rgba(0, 0, 0, 0.4)",
                  boxSizing: "border-box",
                }}
              ></span>

              <ListItemText
                primary="Busy"
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                secondary="Unavailable time slots for sessions."
              />
            </div>
          </ListItem>
        </List>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "inherit",
          paddingTop: "16px",
        }}
      >
        <Typography
          style={{
            // padding: "16px",
            fontWeight: "bold",
          }}
        >
          Google Accounts{" "}
          <Tooltip
          arrow
          placement="top"
            title={
              <Typography
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  // color: "#000000",
                }}
              >
                Hivepath also provides Google calendar integration for an easier
                alignment to your personal calendar. We recommend syncing your
                calendars for a better view and experience.
                <p>
                  All information related to your synchronized data will be
                  shown in different colors, so don't worry about future
                  clashes.
                </p>
              </Typography>
            }
          >
            <IconButton>i</IconButton>
          </Tooltip>
        </Typography>

        {/* <IconButton sx={{ color: "black" }} onClick={handleOpen}>
          <FaPlus />
        </IconButton> */}
      </div>
      <Box>
        {syncedEmail.length === 0 ? (
          <div
            style={{
              paddingTop: "16px",
              paddingBottom: "16px",
              textAlign: "center",
            }}
          >
            <img src={noCalendarSynced} alt="" style={{ width: "100%" }} />
            <Typography
              style={{
                paddingBottom: "16px",
                fontWeight: "bold",
                paddingTop: "16px",
              }}
            >
              No Accounts Synced
            </Typography>

            <GoogleLogin
              accessType="offline"
              responseType="code"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              clientId={CLIENT_ID}
              scope={SCOPES}
              prompt="consent"
              render={(renderProps) => (
                <OutlinedButton
                  style={{
                    width: "auto",
                    minHeight: "48px",
                    height: "auto",
                    color: "black",
                    border: "1px solid #D3D3D3",
                    fontWeight: "600",
                    background: "white",
                  }}
                  title="Sync External Calendar"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                />
              )}
            />

            {/* <OutlinedButton
              onClick={handleClientLoad}
              style={{
                width: "auto",
                height: "48px",
                color: "black",
                border: "1px solid #D3D3D3",
                fontWeight: "600",
                background: "white",
              }}
              title="Sync External Calendar"
            /> */}
          </div>
        ) : (
          <div style={{ width: "100%", height: "inherit", paddingLeft: "8px" }}>
            <AccountListCheckbox

            // emails={emails}
            />

            <div
              style={{
                // paddingTop: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "16px",
              }}
            >
              {/* <div
                style={{
                  // paddingTop: "16px",
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={googleCalendar}
                  alt="Google Calendar logo"
                  style={{ height: "30px", width: "30px", marginRight: "20px" }}
                />
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "13px",
                    lineHeight: "16px",
                  }}
                >
                  {" "}
                  Gmail account{" "}
                </Typography>
              </div> */}
              <GoogleLogin
                accessType="offline"
                responseType="code"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                clientId={CLIENT_ID}
                scope={SCOPES}
                prompt="consent"
                render={(renderProps) => (
                  <OutlinedButton
                    title={`Add account`}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={{ alignSelf: "flex-end" }}
                  >
                    {/* <PlusIcon style={{ height: "24px", width: "24px" }} /> */}
                  </OutlinedButton>
                )}
              />
            </div>
          </div>
        )}
      </Box>
      <Container></Container>
      <LoadingBackdrop open={openBackdrop} handleClose={handleCloseBackdrop} />

      {/* <CalendarSyncDialog
        handleClose={handleClose}
        openBackdrop={openBackdrop}
        handleCloseBackdrop={handleCloseBackdrop}
        open={open}
        handleClientLoad={handleClientLoad}
      /> */}
    </Box>
  );
};

export default SyncExternalCalendarSections;
