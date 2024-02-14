import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";

import authFetch from "utils/authFetch";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { setCalendarSyncedEmails } from "store/User/user.actions";
import { useState } from "react";
import getDifferenceInArray from "utils/arrayUtitlityFunctions/getDifferenceInArray";
import { CALENDAR_SERVICES } from "constants/API_URLS";

const mapState = ({ user }) => ({
  user: user,
});
const SyncCalendarAccountWithMeetDialog = ({
  open,
  handleClose,
  fetchMeetAccounts,
}) => {
  const { user } = useSelector(mapState);
  const syncedCalendarEmails = user.calendar_synced_emails;
  const USER_ID = user.currentUser.user_id;
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([]);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const googleMeetAccounts = user.googleMeetAccounts;

  const emailDiffer = getDifferenceInArray(
    syncedCalendarEmails,
    googleMeetAccounts
  );

  useEffect(() => {
    if (emailDiffer.length === 0) {
      return handleClose();
    }
    if (syncedCalendarEmails.length === 0) {
      console.log("Now fetch emails");
      return fetchEmails();
    }
  }, [emailDiffer.length]);
  const handleChange = (event, item) => {
    const { checked, value } = event.currentTarget;
    setChecked((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
    setEmails((prev) =>
      checked ? [...prev, item] : prev?.filter((val) => val !== item)
    );
  };

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

  console.log({ checked, emails });
  const handleAddAllMeetAccounts = () => {
    const addAccounts = emails.map((item) => {
      return handleAddMeetAccount(item.email);
    });
    return addAccounts;
  };
  const handleAddMeetAccount = (email) => {
    setLoading(true);
    const url = "https://auth.hivepath.io/api/addMeetAccount";

    const data = {
      user_id: USER_ID,
      email: email,
    };
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          handleClose();
          fetchMeetAccounts();
          setLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };
  // console.log({ emailDiffer });

  const disableButtons = emails.length < 1 || loading;
  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "26px",
            lineHeight: "34px",
          }}
        >
          You have added account previously. Do you want to use it to create
          meeting links
        </Typography>
      </div>

      {
        <FormGroup>
          {Array.isArray(emailDiffer) &&
            emailDiffer.length > 0 &&
            emailDiffer.map((item) => {
              const { email, object_id } = item;
              console.log({ item });
              return (
                <FormControlLabel
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                    marginTop: "8px",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  label={
                    <Typography
                      style={{
                        fontSize: "18px",
                        lineHeight: "22px",
                        fontWeight: "600",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {email}
                    </Typography>
                  }
                  key={object_id}
                  control={
                    <Checkbox
                      value={object_id}
                      onChange={(e) => handleChange(e, item)}
                      checked={checked.some((val) => val === object_id)}
                      // name={file_name}
                    />
                  }
                  labelPlacement="end"
                />
              );
            })}
        </FormGroup>
      }

      <div
        style={{
          display: "flex",
          justifyContent: "center",

          marginTop: "16px",
        }}
      >
        <PrimaryButton
          onClick={handleAddAllMeetAccounts}
          title="Yes"
          disabled={disableButtons}
          style={{ marginRight: "16px" }}
        />
        <OutlinedButton
          title={`No, Add New Account`}
          // disabled={disableButtons}
          onClick={handleClose}
        />
      </div>
    </HivepathBaseDialog>
  );
};

export default SyncCalendarAccountWithMeetDialog;
