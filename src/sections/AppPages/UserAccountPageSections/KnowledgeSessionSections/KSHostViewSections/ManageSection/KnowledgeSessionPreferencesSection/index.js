import {
  Container,
  Paper,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserPreferences } from "store/User/user.actions";
import authFetch from "utils/authFetch";
import LinkGoogleMeet from "sections/AppPages/OnboardingPages/KnowledgeSession/StepThreeSections/LinkGoogleMeet";
import { ReactComponent as GoogleMeetIcon } from "assets/svg/onboarding-pages/knowledge-session/google-meet-icon.svg";
import SelectTimezone from "components/Common/Inputs/SelectInput/SelectTimezone";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";

const mapState = ({ user, slotsData }) => ({
  currentUser: user.currentUser,
  preferences: user.user_preferences,
  syncedEmails: user.calendar_synced_emails,
  timezone: slotsData.timezone,
  googleMeetEmail: user.googleMeetEmail,
});
const KnowledgeSessionPreferencesSection = () => {
  const { currentUser, preferences, syncedEmails, timezone, googleMeetEmail } =
    useSelector(mapState);
  const USER_ID = currentUser.user_id;
  let history = useHistory();

  const { gmeet_email_preference, timezone_preference, waitlist_preference } =
    preferences;
  const dispatch = useDispatch();

  const [waitlistParticipants, setWaitlistParticipants] = useState(
    waitlist_preference || 0
  );
  const [loading, setLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const handleLoadingBackdropClose = () => setLoading(false);

  const [gMeetPreference, setGMeetPreference] = useState(
    gmeet_email_preference || ""
  );
  useEffect(() => {
    if (gmeet_email_preference)
      return setGMeetPreference(gmeet_email_preference);
  }, [gmeet_email_preference]);

  const handlePrefenceChange = (e) => {
    setGMeetPreference(e.target.value);
  };

  const handleWaitlistPreferences = () => {
    setLoading(true);
    const url = KNOWLEDGE_SESSIONS_SERVICES.ADD_SESSION_PREFERENCES;
    const data = {
      user_id: USER_ID,
      type: "one-one",
      timezone_preference:
        timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      gmeet_email_preference: googleMeetEmail || gMeetPreference,
      // zoom_email_preference
      waitlist_preference: waitlistParticipants,
    };
    console.log(data);

    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        setLoading(false);
        enqueueSnackbar(json.message, {
          variant: "success",
        });
        history.push("/onboarding/knowledge-session/step-four");
      } else {
        setLoading(false);
        enqueueSnackbar(json.message, {
          variant: "error",
        });
      }
      console.log(json);
    });
  };
  useEffect(() => {
    const url = KNOWLEDGE_SESSIONS_SERVICES.FETCH_PREFERENCES;
    // "https://auth.hivepath.io/api/fetchPreferences";
    const data = {
      user_id: USER_ID,
    };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        dispatch(setUserPreferences(json.result[0]));
      }
      console.log(json.result[0]);
    });
  }, []);

  return (
    <div>
      <Container style={{ paddingLeft: "32px" }}>
        <Typography
          style={{
            fontSize: "28px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Preferences
        </Typography>
        <Container>
          <Typography
            style={{
              fontSize: "24px",
              fontWeight: "700",
              paddingBottom: "16px",
            }}
          >
            Meeting Preferences
          </Typography>
          <div
            style={{
              paddingBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <GoogleMeetIcon
              style={{
                height: "30px",
                width: "30px",
                marginRight: "16px",
              }}
            />
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
              {" "}
              Google Meet
            </span>
          </div>
          <Typography
            style={{
              fontSize: "16px",
              lineHeight: "18px",
              letterSpacing: "-1%",
              fontWeight: 500,
              color: "#616161",
              marginBottom: "16px",
            }}
          >
            Once you link your Google Meet account, we can automatically
            generate Google meetings for you.
          </Typography>
          <LinkGoogleMeet disabled={gMeetPreference && true} />

          <>
            {Array.isArray(syncedEmails) && syncedEmails?.length > 0 ? (
              <FormControl
                component="fieldset"
                style={{ paddingBottom: "16px" }}
              >
                <FormLabel component="legend" style={{ marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "black",
                    }}
                  >
                    Or Sync existing Google Account
                  </span>{" "}
                  <br />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      paddingBottom: "16px",
                      color: "rgba(97, 97, 97, 1)",
                    }}
                  >
                    Only one account can sync
                  </span>
                </FormLabel>
                <RadioGroup
                  row
                  name="row-radio-buttons-group"
                  value={gMeetPreference}
                  onChange={handlePrefenceChange}
                >
                  {syncedEmails?.map((item) => {
                    const { email } = item;
                    return (
                      <FormControlLabel
                        key={email}
                        style={{
                          height: "66px",
                          // width: "200px",
                          paddingLeft: "8px",
                          paddingRight: "16px",
                          background: "#ffffff",
                          boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
                          borderRadius: "15px",
                          marginRight: "16px",
                          marginTop: "8px",
                          marginLeft: "8px",
                        }}
                        value={email}
                        control={<Radio />}
                        label={email}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            ) : (
              <FormControl
                component="fieldset"
                style={{ paddingBottom: "16px" }}
              >
                <FormLabel component="legend" style={{ marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "black",
                    }}
                  >
                    Or Sync existing Google Account
                  </span>{" "}
                  <br />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      paddingBottom: "16px",
                      color: "rgba(97, 97, 97, 1)",
                    }}
                  >
                    Only one account can sync
                  </span>
                </FormLabel>
                <RadioGroup
                  row
                  name="row-radio-buttons-group"
                  value={gMeetPreference}
                >
                  <FormControlLabel
                    // key={email}
                    style={{
                      height: "66px",
                      // width: "200px",
                      paddingLeft: "8px",
                      paddingRight: "16px",
                      background: "#ffffff",
                      boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
                      borderRadius: "15px",
                      marginRight: "16px",
                      marginTop: "8px",
                      marginLeft: "8px",
                    }}
                    value={gMeetPreference}
                    control={<Radio />}
                    label={gMeetPreference}
                  />
                </RadioGroup>
              </FormControl>
            )}
          </>
        </Container>
      </Container>
      <Container
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.2)",
          paddingTop: "16px",

          paddingBottom: "32px",
        }}
      >
        <div style={{ paddingLeft: "32px" }}>
          <Typography style={{ fontSize: "24px", fontWeight: "700" }}>
            Waitlist Preference
          </Typography>
          <Typography style={{ paddingBottom: "12px", paddingTop: "8px" }}>
            Number of Participants can
          </Typography>
          <TextField
            type="number"
            value={waitlistParticipants}
            helperText={
              // (waitlistParticipants > 5 || waitlistParticipants < 0) &&
              "Please enter number between 0 and 5"
            }
            error={waitlistParticipants > 5 || waitlistParticipants < 0}
            min={0}
            max={5}
            step={1}
            onChange={(e) => setWaitlistParticipants(e.target.value)}
          />
        </div>
        <div
          style={{ paddingLeft: "32px", maxWidth: "40%", paddingTop: "32px" }}
        >
          <Typography
            style={{
              fontSize: "24px",
              fontWeight: "700",
              paddingBottom: "16px",
            }}
          >
            Timezone Preference
          </Typography>
          <SelectTimezone />
        </div>
      </Container>
      <LoadingBackdrop
        open={loading}
        handleClose={handleLoadingBackdropClose}
      />
    </div>
  );
};

export default KnowledgeSessionPreferencesSection;
