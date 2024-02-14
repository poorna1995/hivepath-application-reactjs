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
import { Box } from "@mui/system";
import AppHeader from "components/AppHeader";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PasswordInput from "components/Common/Inputs/PasswordInput";
import TextInput from "components/Common/Inputs/TextInput";
import React from "react";
import { useHistory } from "react-router";
import KnowledgeSessionStepThreeTabs from "sections/AppPages/OnboardingPages/KnowledgeSession/StepThreeSections/Tabs";
import KnowledgeSessions from "sections/AppPages/UserProfileSections/Offerings/KnowledgeSessions";
import { ReactComponent as VideoIconBlack } from "assets/svg/onboarding-pages/knowledge-session/video-icon-black.svg";

import { ReactComponent as VideoIconWhite } from "assets/svg/onboarding-pages/knowledge-session/video-icon-white.svg";
import KSOnboardingProgressBar from "sections/AppPages/OnboardingPages/KnowledgeSession/ProgressBar";
import ButtonRow from "sections/AppPages/OnboardingPages/KnowledgeSession/ButtonRow";
import { useState } from "react";
import authFetch from "utils/authFetch";
import { useSelector } from "react-redux";
import LinkToZoomButton from "sections/AppPages/OnboardingPages/KnowledgeSession/StepThreeSections/LinkToZoomButton";
import LinkGoogleMeet from "sections/AppPages/OnboardingPages/KnowledgeSession/StepThreeSections/LinkGoogleMeet";
import { ReactComponent as GoogleMeetIcon } from "assets/svg/onboarding-pages/knowledge-session/google-meet-icon.svg";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { useEffect } from "react";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";

const mapState = ({ user, slotsData }) => ({
  currentUser: user.currentUser,
  syncedEmails: user.calendar_synced_emails,
  timezone: slotsData.timezone,
  googleMeetEmail: user.googleMeetEmail,
});

const KnowledgeSessionOnboardingStepThree = ({ hide }) => {
  let history = useHistory();
  const { currentUser, syncedEmails, timezone, googleMeetEmail } =
    useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [waitlistParticipants, setWaitlistParticipants] = useState(0);
  const [loading, setLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const handleLoadingBackdropClose = () => setLoading(false);

  const [gMeetPreference, setGMeetPreference] = useState(googleMeetEmail || "");

  useEffect(() => {
    setGMeetPreference(googleMeetEmail);
    console.log(googleMeetEmail);
  }, [googleMeetEmail]);

  const handlePrefenceChange = (e) => {
    setGMeetPreference(e.target.value);
  };
  // console.log(gMeetPreference);
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

  return (
    <div style={{}}>
      {!hide && (
        <>
          <AppHeader />

          {/* Progress Bar */}
          <Container style={{ paddingTop: "8px" }}>
            <KSOnboardingProgressBar progressValue={50} />
          </Container>
        </>
      )}

      {/* Preferences Container */}
      <Container style={{ paddingTop: "24px", paddingBottom: "128px" }}>
        <Paper
          style={{
            paddingTop: "16px",
            background: "rgba(255, 255, 255, 0.6)",
            border: "2px solid #FFFFFF",
            boxSizing: " border-box",
            boxShadow: "0px 4px 50px 4px rgba(72, 74, 158, 0.03)",
            borderRadius: "15px",
          }}
        >
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
              </Typography>{" "}
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
                {Array.isArray(syncedEmails) && syncedEmails?.length > 0 && (
                  <FormControl
                    component="fieldset"
                    style={{ paddingBottom: "16px" }}
                  >
                    <FormLabel
                      component="legend"
                      style={{ marginBottom: "16px" }}
                    >
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
                              boxShadow:
                                "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
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
          </Container>
        </Paper>
      </Container>
      {/* <ButtonRow
        handleClick={handleWaitlistPreferences}
        disabled={waitlistParticipants > 5 || waitlistParticipants < 0}
      /> */}
      {!hide && (
        <div
          style={{
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            bottom: "0px",
            position: "fixed",
            alignItems: "center",
            width: "100%",
            background: "white",
            height: "70px",
          }}
        >
          <PrimaryButton
            title="Save & Continue"
            disabled={
              waitlistParticipants > 5 ||
              waitlistParticipants < 0 ||
              gMeetPreference === ""
            }
            onClick={handleWaitlistPreferences}
          />
        </div>
      )}
      <LoadingBackdrop
        open={loading}
        handleClose={handleLoadingBackdropClose}
      />
    </div>
  );
};

export default KnowledgeSessionOnboardingStepThree;
