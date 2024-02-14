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
  IconButton,
  Card,
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
import { useDispatch, useSelector } from "react-redux";
import LinkToZoomButton from "sections/AppPages/OnboardingPages/KnowledgeSession/StepThreeSections/LinkToZoomButton";
import LinkGoogleMeet from "sections/AppPages/OnboardingPages/KnowledgeSession/StepThreeSections/LinkGoogleMeet";
import { ReactComponent as GoogleMeetIcon } from "assets/svg/onboarding-pages/knowledge-session/google-meet-icon.svg";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { useEffect } from "react";

import OnboardingSectionHeadings from "../components/Typography/SectionHeadings";
import KSOnboardingButtonRow from "../components/KSOnboardingButtonRow";
import SyncCalendarAccountWithMeetDialog from "./SyncCalendarAccountWithMeetDialog";
import handleFetchMeetAccounts from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/ManageSessionsView/utils/handleFetchMeetAccounts";
import {
  setCalendarSyncedEmails,
  setGoogleMeetSyncedAccounts,
} from "store/User/user.actions";
import { setOnboardingPreferencePopup } from "store/dialogs/dialogsSlice";
import getDifferenceInArray from "utils/arrayUtitlityFunctions/getDifferenceInArray";
import { makeStyles } from "@mui/styles";
import { ReactComponent as CheckIcon } from "assets/svg/all/new-icons/ks-onboarding/preferences/check-icon.svg";

import { ReactComponent as DeleteIcon } from "assets/svg/all/new-icons/ks-onboarding/preferences/delete-icon.svg";
import {
  CALENDAR_SERVICES,
  KNOWLEDGE_SESSIONS_SERVICES,
} from "constants/API_URLS";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "32px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
    },
  },
  emailsContainer: {
    display: "flex",
    alignItems: "flex-start",
    // alignItem
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      flex: 0,
      flexDirection: "column",
      paddingTop: "16px",
      paddingBottom: "128px",
    },
  },
  contentContainer: {
    flex: 0.7,
    [theme.breakpoints.down("sm")]: {
      flex: 0,
    },
  },
  tipContainer: {
    flex: 0.3,
    background: "#F3F3F3",
    // background:'blue'
    padding: "32px",
    boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
    borderRadius: "20px",
    height: "auto",
    margin: "16px",
    [theme.breakpoints.down("sm")]: {
      flex: 0,
    },
  },

  emailCard: {
    // height: "66px",
    // width: "200px",
    paddingLeft: "8px",
    paddingRight: "16px",
    background: "#ffffff",
    // boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    marginRight: "16px",
    // marginTop: "8px",
    marginLeft: "8px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginTop: "8px",
      marginLeft: "0px",
    },
  },
}));

const mapState = ({ user, slotsData, dialogs }) => ({
  currentUser: user.currentUser,
  user: user,
  timezone: slotsData.timezone,
  googleMeetEmail: user.googleMeetEmail,
  googleMeetAccounts: user.googleMeetAccounts,
  dialogs: dialogs,
});

const PreferencesSection = () => {
  const classes = useStyles();
  let history = useHistory();
  const {
    currentUser,
    timezone,
    googleMeetEmail,
    googleMeetAccounts,
    user,
    dialogs,
  } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const handleLoadingBackdropClose = () => setLoading(false);
  const syncedCalendarEmails = user.calendar_synced_emails;

  const [gMeetPreference, setGMeetPreference] = useState(googleMeetEmail || "");
  // const [googleMeetAccounts, setGoogleMeetAccounts] = useState([]);
  // const [openCalendarAccountDialog, setOpenCalendarAccountDialog] =
  //   useState(false);

  const handleCalenarAccountDialogOpen = () => {
    // setOpenCalendarAccountDialog(true);
  };
  const handleCloseCalendarAccountDialog = () => {
    // setOpenCalendarAccountDialog(false);
    dispatch(setOnboardingPreferencePopup(false));
  };
  const openCalendarAccountDialog = dialogs.onboardingPreferencePopup;

  const emailDiffer = getDifferenceInArray(
    syncedCalendarEmails && syncedCalendarEmails,
    googleMeetAccounts && googleMeetAccounts
  );

  console.log({ emailDiffer }, "in preference");
  useEffect(() => {
    if (emailDiffer.length > 0)
      return dispatch(setOnboardingPreferencePopup(true));
    // return setOpenCalendarAccountDialog(true);
    if (syncedCalendarEmails.length === 0) {
      console.log("fetchEmails in preferences section");
      return fetchEmails();
    }
  }, [emailDiffer.length]);
  useEffect(() => {
    setGMeetPreference(googleMeetEmail);
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
      waitlist_preference: 0,
    };
    console.log(data);

    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        setLoading(false);
        enqueueSnackbar(json.message, {
          variant: "success",
        });
        history.push("/onboarding/ks/success");
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
    handleFetchMeetAccounts();
  }, []);
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

  const handleFetchMeetAccounts = () => {
    const url = "https://auth.hivepath.io/api/fetchMeetAccounts";
    const data = { user_id: USER_ID };
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          console.log(json);
          dispatch(setGoogleMeetSyncedAccounts(json.result));

          // setGoogleMeetAccounts(json.result);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleRemoveMeetAccount = (e, object_id) => {
    const url = "https://auth.hivepath.io/api/deleteMeetAccount";
    const data = {
      object_id: object_id,
    };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        handleFetchMeetAccounts();
      }
    });
  };

  return (
    <div>
      <div className={classes.root} style={{}}>
        <div className={classes.emailsContainer} style={{}}>
          <Container className={classes.contentContainer} style={{ flex: 0.7 }}>
            <Typography
              style={{
                fontSize: "24px",
                fontWeight: "700",
                paddingBottom: "16px",
              }}
            >
              Meeting Preferences
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
                lineHeight: "18px",
                letterSpacing: "-1%",
                fontWeight: 500,
                color: "#616161",
                // marginBottom: "16px",
              }}
            >
              Please provide your Google account to Hivepath so that we can
              automatically generate Google meetings for you.
            </Typography>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                height: "inherit",
              }}
            >
              <div
                style={{
                  flex: 1,
                  minHeight: "150px",
                  paddingTop: "32px",
                }}
              >
                {Array.isArray(googleMeetAccounts) &&
                  googleMeetAccounts?.length > 0 && (
                    <FormControl
                      component="fieldset"
                      // style={{ paddingBottom: "16px" }}
                    >
                      <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        value={gMeetPreference}
                        onChange={handlePrefenceChange}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {googleMeetAccounts?.map((item) => {
                          const { email } = item;
                          return (
                            <div className={classes.emailCard} style={{}}>
                              <FormControlLabel
                                key={email}
                                value={email}
                                control={<Radio />}
                                label={email}
                              />
                              {email === gMeetPreference && <CheckIcon />}
                              {googleMeetAccounts.length > 1 && (
                                <IconButton
                                  onClick={(e) =>
                                    handleRemoveMeetAccount(e, item.object_id)
                                  }
                                  style={{
                                    position: "absolute",
                                    top: "-4px",
                                    right: "-4px",
                                    height: "8px",
                                    width: "8px",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  )}
              </div>
              <div
                style={
                  {
                    // justifySelf: "flex-end",
                  }
                }
              >
                <LinkGoogleMeet
                  disabled={
                    Array.isArray(googleMeetAccounts) &&
                    googleMeetAccounts.length > 2
                  }
                />
              </div>
            </div>
          </Container>
          <Card className={classes.tipContainer}>
            <Typography
              style={{
                fontSize: "21px",
                lineHeight: "27px",
                fontWeight: "bold",
                color: "#222222 ",
              }}
            >
              More details
            </Typography>
            {/* Some content */}
            <ul
              style={{
                marginTop: "16px",
                marginLeft: "16px",
                paddingLeft: "16px",
                fontSize: "14px",
                fontWeight: "400",
                paddingBottom: "16px",
                color: "#222222",
              }}
            >
              <li style={{ marginBottom: "16px" }}>
                {" "}
                <span>
                  All users have the ability to add upto 3 accounts. However,
                  you can choose to change your account any time as required.
                  {/* You have ability to add 3 accounts and change your choice */}
                  {/* Only one account can sync */}
                </span>
              </li>
              <li>
                Hivepath currently supports Google Meet to host all your virtual
                interactions. We will be integrating other conferencing apps in
                near future.
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={"/onboarding/ks/availability"}
        nextURL={"/onboarding/ks/success"}
        onClickPrimaryButton={handleWaitlistPreferences}
        disablePrimary={!gMeetPreference}
      />
      <LoadingBackdrop
        open={loading}
        handleClose={handleLoadingBackdropClose}
      />
      <SyncCalendarAccountWithMeetDialog
        open={openCalendarAccountDialog}
        handleClose={handleCloseCalendarAccountDialog}
        fetchMeetAccounts={handleFetchMeetAccounts}
      />
    </div>
  );
};

export default PreferencesSection;
