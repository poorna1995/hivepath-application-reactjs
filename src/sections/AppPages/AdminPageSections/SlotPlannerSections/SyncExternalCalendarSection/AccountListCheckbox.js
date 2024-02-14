import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import authFetch from "utils/authFetch";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import {
  setCalendarSyncedEmails,
  setSyncedEmailsFetch,
} from "store/User/user.actions";
import { FaTrash } from "react-icons/fa";
import { Typography } from "@mui/material";
import { ReactComponent as SyncIcon } from "assets/svg/onboarding-pages/knowledge-session/sync-icon.svg";
import { ReactComponent as DeleteIcon } from "assets/svg/onboarding-pages/knowledge-session/delete-icon.svg";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { CALENDAR_SERVICES } from "constants/API_URLS";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  syncedEmails: user.calendar_synced_emails,
  syncedEmailsFetch: user.syncedEmailsFetch,
});

const AccountListCheckbox = ({ emails }) => {
  const { currentUser, syncedEmails, syncedEmailsFetch } =
    useSelector(mapState);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const selectedEmailsFromState = syncedEmails.map((item) => {
    const { email } = item;
    return email;
  });
  console.log({ selectedEmailsFromState });
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (syncedEmailsFetch.length > 0) return setSelected(syncedEmailsFetch);
    return setSelected(selectedEmailsFromState);
  }, []);

  // useEffect(() => {
  //   setSelected(selectedEmailsFromState);
  // }, []);
  // const emails = currentUser?.external_calendar;
  const handleBackdropOpen = () => setOpenBackdrop(true);
  const handleBackdropClose = () => setOpenBackdrop(false);

  const USER_ID = currentUser?.user_id;

  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();

  const colors = [
    {
      id: "0",
      color: "#ECF5FF",
    },
    {
      id: "1",
      color: "#FFF7DB",
    },
  ];

  // console.log({ syncedEmails });
  const syncedEmail =
    syncedEmails.length > 0 &&
    syncedEmails?.map((item, index) => {
      // console.log(index);
      const { sync, email } = item;

      return {
        sync,
        email,
        id: index,
      };
    });

  let arr3 = syncedEmail.map((item, i) => Object.assign({}, item, colors[i]));
  console.log("arr3", arr3);
  console.log({ syncedEmailsFetch });

  // useEffect(() => {
  //   if (!selected) return setSelected(syncedEmailsFetch);
  // }, [selected]);

  const handleChange = (event, newValue) => {
    const { checked, value } = event.currentTarget;
    // console.log(event.currentTarget.value)
    // console.log(event.currentTarget.checked)

    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
    // dispatch()
    // console.log("selected in handlechange", selected);
    // dispatch(setSyncedEmailsFetch(selected));
  };
  useEffect(() => {
    // console.log("selected in useEffect ", selected);
    dispatch(setSyncedEmailsFetch(selected));
  }, [selected, dispatch]);
  // console.log({ selected });

  const fetchEmails = () => {
    const url = CALENDAR_SERVICES.FETCH_SYNCED_CALENDAR;
    const data = {
      user_id: USER_ID,
    };
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          dispatch(setCalendarSyncedEmails(json?.result));
        }
        // console.log("json.external_calendar", json?.external_calendar);
      })
      .catch((error) => console.log(error));
  };

  function stringChange(str) {
    if (str.length > 10) return str.substring(0, 8) + "...";
  }
  useEffect(() => {
    fetchEmails();
  }, [selected]);

  const handleResync = (e, email) => {
    setOpenBackdrop(true);
    const url = "https://calendar.hivepath.io/api/reSyncCalendarAccount";
    const data = {
      user_id: USER_ID,
      origin: "google",
      email: email,
    };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        handleBackdropClose();
        return enqueueSnackbar(json.message, {
          variant: "success",
        });
      } else {
        handleBackdropClose();
        return enqueueSnackbar(json.message, {
          variant: "error",
        });
      }
    });
  };
  const handleDisconnectEmail = (e, email) => {
    setOpenBackdrop(true);
    const url = `${process.env.REACT_APP_HIVEPATH_CALENDAR_API_URL}/deSyncCalendarAccount`;

    const { checked, value } = e.currentTarget;

    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== email)
    );

    const data = {
      user_id: USER_ID,
      origin: "google",
      email: email,
    };

    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          fetchEmails();
          enqueueSnackbar(json?.message, {
            variant: "success",
          });
          handleBackdropClose();
        } else {
          enqueueSnackbar(json?.message, {
            variant: "error",
          });

          handleBackdropClose();
        }
        // console.log(json);
      })
      .catch((error) => console.log(error));
  };

  return (
    <List sx={{ width: "100%" }}>
      {arr3?.map((item, value) => {
        const { email, sync, color } = item;
        const labelId = `checkbox-list-label-${value}`;

        return (
          <div
            // disableGutters
            key={value}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              // marginLeft: "-12px",
              width: "100%",
              flex: 1,
              paddingTop: "8px",
              minWidth: "100%",
            }}
          >
            {Array.isArray(syncedEmailsFetch) &&
              syncedEmailsFetch.length > 0 &&
              syncedEmailsFetch?.filter((val) => {
                if (val === email) return console.log("val", val);
                return null;
              })}
            <Checkbox
              edge="start"
              value={email}
              onChange={(e) => handleChange(e)}
              checked={
                Array.isArray(syncedEmailsFetch) &&
                syncedEmailsFetch.length > 0 &&
                syncedEmailsFetch.some((val) => val === email)
              }
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
            <div
              style={{
                height: "20px",
                width: "20px",
                minHeight: "20px",
                minWidth: "20px",
                background: `${color}`,
                // marginRight: "10px",
                // marginLeft: "-16px",
                borderRadius: "50%",
                border: "1px solid rgba(0, 0, 0, 0.4)",
              }}
            ></div>

            <Typography
              style={{
                fontSize: "14px",
                // marginLeft: "-24px",
                marginLeft: "16px",
                marginRight: "4px",
                wordWrap: "break-word",
                width: "100px",
                fontWeight: "500",
                letterSpacing: "-0.2px",
                flex: 1,
              }}
            >
              {email}
              {/* {stringChange(email)} */}
            </Typography>
            {sync && (
              <IconButton
                onClick={(e) => handleResync(e, email)}
                sx={{
                  // fontSize: "16px",
                  justifySelf: "flex-end",
                }}
                // }}
              >
                <SyncIcon style={{ height: "24px", width: "24px" }} />
              </IconButton>
            )}
            {sync && (
              <IconButton
                onClick={(e) => handleDisconnectEmail(e, email)}
                sx={{
                  color: "error.main",
                  // fontSize: "16px",
                  justifySelf: "flex-end",
                }}
                // }}
              >
                <DeleteIcon style={{ height: "20px", width: "20px" }} />
              </IconButton>
            )}
          </div>
        );
      })}
      <LoadingBackdrop open={openBackdrop} handleClose={handleBackdropClose} />
    </List>
  );
};

export default AccountListCheckbox;
