import { Container, Grid, Button, IconButton, Skeleton } from "@mui/material";
import AppHeader from "components/AppHeader";
import React from "react";
import FAQHelperSection from "sections/AppPages/SessionsPageSections/SessionPageComponents/FAQHelperSection";
import HostDetailsCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/HostDetailsCard";
import PreviousSessionList from "sections/AppPages/SessionsPageSections/SessionPageComponents/PreviousSessionList";
import RequestedAgenda from "sections/AppPages/SessionsPageSections/SessionPageComponents/RequestedAgenda";
import StatusCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/StatusCard";
import { ReactComponent as BackIcon } from "assets/svg/sessions/chevron-left.svg";
import { makeStyles } from "@mui/styles";
import { MdMoreHoriz } from "react-icons/md";
import HappeningAtCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/HappeningAtCard";
import { useHistory, useParams } from "react-router-dom";
import AttendeeViewReviewSection from "sections/AppPages/SessionsPageSections/SessionPageComponents/ReviewSection";
import DocumentsSection from "sections/AppPages/SessionsPageSections/SessionPageComponents/DocumentsSection";
import ShareExperienceCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/ShareExperienceCard";
import SessionPageMenu from "sections/AppPages/SessionsPageSections/SessionPageComponents/SessionPageMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import authFetch from "utils/authFetch";
import { useState } from "react";
import ASHostDetailsCard from "sections/AppPages/SessionsPageSections/AttendeeSection/ASHostDetailsCard";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import {
  fetchAttendeeInfo,
  fetchHostBooking,
  fetchHostSession,
  fetchHostSessionStatus,
  setSessionFeedback,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import { useRouteMatch } from "react-router-dom";
import HostFeedbackSection from "sections/AppPages/SessionsPageSections/SessionPageComponents/FeedbackSection";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import { differenceInHours, format } from "date-fns";
import HostDeclinedMessageCard from "sections/AppPages/SessionsPageSections/AttendeeSection/HostDeclinedMessageCard";
import { SESSION_STATUS } from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/MySessionsSection/SessionsSectionTabs";
import HSAttendeeDetailsCard from "sections/AppPages/SessionsPageSections/HostSection/HSAttendeeDetailsCard";
import StatusAlertCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/StatusAlertCard";
import { SCHEDULE_SERVICES } from "constants/API_URLS";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import HostSessionActionDialog from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/HostSessionListItem/HostSessionActionDialog";
import SessionNoActionDialog from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/HostSessionListItem/SessionNoActionDialog";
import AttendeeSessionActionDialog from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/AttendeeSesssionListItem/AttendeeSessionActionDialog";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import {
  ATTENDEE_STATUS_MESSAGE,
  MESSAGE_FOR_BOTH,
} from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/HostSessionListItem";
const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
  },
  button: {
    "&:hover": {
      background: "none",
    },
  },
  rightGrid: {
    paddingLeft: "16px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
    },
  },
}));

const mapState = ({ user, sessions, slotsData }) => ({
  currentUser: user.currentUser,
  booking: sessions.hostBookingDetails,
  session_status: sessions.hostSessionStatus,
  hostSession: sessions.hostSession,
  timezone: slotsData.timezone,
});

const KnowledgeSessionAttendeePage = ({ hide }) => {
  const { currentUser, booking, session_status, hostSession, timezone } =
    useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [loading, setLoading] = useState(false);
  const sessionStatusState = session_status.session_status;
  const bookingSessionData = booking && booking.session_data;
  // const cancelledStatus = session_status.status_message;
  const enqueueSnackbar = useEnqueueSnackbar();
  // const userName = `${currentUser.firstname} ${currentUser.lastname}`;
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const userPosition =
    userDetails &&
    userDetails.role &&
    userDetails.company &&
    userDetails.profile_headline_description &&
    (`${userDetails.profile_headline_description}` ||
      `${userDetails?.role} at ${userDetails?.company}`);
  const userName =
    userDetails && `${userDetails?.first_name} ${userDetails.last_name}`;
  const profilePicUrl = userDetails && userDetails.image_url;
  const rating = userDetails?.rating;
  const [sessionID, setSessionID] = useState("");
  const [sessionDetails, setSessionDetails] = useState({});
  const sessionCategory = sessionDetails.category;
  const sessionTitle = sessionDetails.title;
  const [bookingDetails, setBookingDetails] = useState({});
  const [sessionMessage, setSessionMessage] = useState("");
  const list = bookingDetails.questions;
  const description = bookingDetails.description;
  const [messageTag, setMessageTag] = useState("");
  const history = useHistory();

  useEffect(() => {
    setUserDetails(booking.host_data);
  }, [booking.host_data]);
  useEffect(() => {
    setSessionDetails(booking.session_data);
  }, [booking]);

  const [markNoModal, setMarkNoModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [thankYouModal, setThankYouModal] = useState(false);

  const [hostID, setHostID] = useState("");
  const fetchBookingUrl = SCHEDULE_SERVICES.FETCH_SCHEDULE_BOOKING;
  const fetchSessionUrl = "https://auth.hivepath.io/api/fetchSession";
  const sessionStatusUrl =
    "https://schedule.hivepath.io/api/sessionStatusTracking";

  const [trackingLoading, setTrackingLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);

  const [sessionStatus, setSessionStatus] = useState([]);
  const handleClose = () => setLoading(false);

  const { bookingID } = useParams();

  const { path, url } = useRouteMatch();
  console.log({ path, url });
  const fetchBookingDetails = (bookingID) => {
    const data = {
      booking_id: bookingID,
    };
    authFetch(fetchBookingUrl, data).then((json) => {
      setLoading(false);
      if (json.status === "success") {
        // console.log("bookingDetails", json);
        const sessionID = json?.result && json?.result[0].session_id;
        const ownerID = json.result[0].session_owner;
        setSessionID(sessionID);
        const requesterID = json.result[0].requested_by;

        // if (ownerID === USER_ID) {
        //   return history.push(`${url}/${bookingID}/host`);
        // }
        if (USER_ID !== requesterID && USER_ID !== ownerID) {
          return history.push("/");
        }

        // console.log(sessionID);
        // fetchSessionDetails(sessionID);
        // fetchUserDetails(ownerID);
        // sessionTrackingDetails(ownerID, data.booking_id);
        setBookingDetails(json.result[0]);
        dispatch(fetchHostBooking(json?.result[0]));
      }
    });
  };
  const fetchSessionDetails = (sessionID) => {
    const data = {
      session_id: sessionID,
    };
    authFetch(fetchSessionUrl, data).then((json) => {
      dispatch(fetchHostSession(json.result));

      setSessionDetails(json.result);
    });
  };

  const sessionTrackingDetails = (userID, bookingID) => {
    setTrackingLoading(true);
    const data = {
      user_id: userID,
      booking_id: bookingID,
      key: "attendee",
    };
    authFetch(sessionStatusUrl, data).then((json) => {
      // console.log(json);
      const status = json.result.session_status;
      const message = json.result.status_message;
      dispatch(fetchHostSessionStatus(json.result));

      setSessionStatus(status);
      setSessionMessage(message);
      setMessageTag(json.result.message_tag);

      setTrackingLoading(false);
    });
  };
  const fetchUserDetails = (userID) => {
    setInfoLoading(true);
    setHostID(userID);
    const url = "https://auth.hivepath.io/api/fetchUserData";
    const data = {
      user_id: userID,
    };
    authFetch(url, data).then((json) => {
      setUserDetails(json.result);
      dispatch(fetchAttendeeInfo(json.result));
      setInfoLoading(true);
      // console.log(json);
    });
  };
  const fetchSessionFeedback = () => {
    const url = "https://schedule.hivepath.io/api/fetchSessionFeedback";
    const data = {
      booking_id: bookingID,
    };
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          const sessionFeedback = json.result;
          dispatch(setSessionFeedback(sessionFeedback));
        }
      })
      .catch((error) => console.error(error));
  };

  const handleBack = () => {
    history.push("/u/account/sessions");
  };

  const viewType = booking.attendee_view;
  const statusMessage = viewType && viewType.status_message.toLowerCase();

  const isEqualTo = (condition) => statusMessage === condition;

  const cancelledStatus = isEqualTo(SESSION_STATUS.CANCELLED);
  const approvedStatus = isEqualTo(SESSION_STATUS.APPROVED);
  const pendingStatus = isEqualTo(SESSION_STATUS.AWAITING_FOR_APPROVAL);
  const declinedStatus = isEqualTo(SESSION_STATUS.DECLINED);
  const completedStatus = isEqualTo(SESSION_STATUS.COMPLETED);
  const feedbackPendingStatus = isEqualTo(SESSION_STATUS.REVIEW_PENDING);
  const happeningNowStatus = isEqualTo(SESSION_STATUS.HAPPENING_NOW);
  const waitingListStatus = isEqualTo(SESSION_STATUS.WAITING_LIST);
  useEffect(() => {
    setLoading(true);
    fetchBookingDetails(bookingID);
    fetchSessionFeedback();
  }, []);
  const handleJoinMeeting = () => {
    const meetingURL = booking.meeting_link;
    console.log(meetingURL);
    if (typeof meetingURL === "string") {
      const redirect = window.open(`${meetingURL}`, "_blank");
      return redirect;
    }
    return null;
  };
  const currentTime = new Date();
  const bookingDate = booking && booking.from_date;
  const fromTime = booking && booking.from_time;
  // const formatFromTime = fromTime && format(fromTime, "hh:mma");
  // // const formatToTime = toTime && format(toTime, "hh:mma");
  const getTime =
    bookingDate &&
    fromTime &&
    getTimeBasedOnTimezone(bookingDate, fromTime, timezone);

  const getChangedDate = fromTime && format(getTime, "MM/dd/yyyy");
  // const dateForMeetingCreation = fromTime && format(getTime, "yyyy-MM-dd");

  const timeDifference =
    getTime && currentTime && differenceInHours(getTime, currentTime);
  const isInTwentyFourHour = timeDifference <= 0 || timeDifference < 24;
  console.log({ getChangedDate, getTime, isInTwentyFourHour });

  const classes = useStyles();
  const handleCloseThankYouModal = () => {
    setThankYouModal(false);
    fetchBookingDetails(bookingID);
  };
  const onClickYesButton = () => {
    setModalData(booking);
    handleSessionComplete();
  };

  const handleSessionComplete = () => {
    setLoading(true);
    const url = "https://schedule.hivepath.io/api/setSessionEnd";
    const data = {
      user_id: USER_ID,
      booking_id: bookingID,
      action: "yes",
    };
    authFetch(url, data)
      .then((json) => {
        setLoading(false);
        console.log(json);
        if (json.status === "success") {
          // setLoading(false);
          setThankYouModal(true);
          enqueueSnackbar(json.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const onClickNoButton = () => {
    setMarkNoModal(true);
  };

  const handleCloseMarkNoModal = () => {
    setMarkNoModal(false);
    fetchBookingDetails(bookingID);
  };
  const handleIncompleteAction = () => {
    setLoading(true);
    const url = "https://schedule.hivepath.io/api/setSessionEnd";
    const data = {
      user_id: USER_ID,
      booking_id: bookingID,
      action: "no",
    };
    authFetch(url, data)
      .then((json) => {
        console.log(json);
        if (json.status === "success") {
          // fetchKnowledgeSessions();
          setLoading(false);
          handleCloseMarkNoModal();
          enqueueSnackbar(json.message);
          // setThankYouModal(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {!hide && <AppHeader maxWidth="xl" />}

      <Container maxWidth="xl" style={{ paddingTop: "16px" }}>
        <div id="nav" className={classes.row}>
          <div>
            <Button
              style={{
                textTransform: "capitalize",
                color: "black",
              }}
              className={classes.button}
              disableRipple
              startIcon={<BackIcon />}
              onClick={handleBack}
            >
              Back to sessions
            </Button>
          </div>
        </div>
        <Grid container>
          <Grid item md={8} xs={12}>
            {declinedStatus && (
              <HostDeclinedMessageCard
                attendeePage
                content={MESSAGE_FOR_BOTH.CANCELLED}
              />
            )}

            {pendingStatus && (
              <StatusAlertCard
                content={ATTENDEE_STATUS_MESSAGE.REQUEST_SENT}
                component={<SessionPageMenu isAttendeePage />}
              />
            )}

            {approvedStatus && (
              <StatusAlertCard
                content={ATTENDEE_STATUS_MESSAGE.APPROVED}
                component={
                  <>
                    {" "}
                    <PrimaryButton
                      onClick={handleJoinMeeting}
                      title="Join"
                      style={{ marginRight: "16px" }}
                    />
                    <>
                      {!isInTwentyFourHour && (
                        <SessionPageMenu isAttendeePage />
                      )}
                    </>
                  </>
                }
              />
            )}
            {completedStatus && (
              <StatusAlertCard content={MESSAGE_FOR_BOTH.COMPLETE} />
            )}
            {feedbackPendingStatus && (
              <StatusAlertCard
                content={ATTENDEE_STATUS_MESSAGE.REVIEW_PENDING}
                component={
                  <div>
                    <PrimaryButton
                      title={"yes"}
                      onClick={onClickYesButton}
                      style={{ marginRight: "16px" }}
                    />
                    <OutlinedButton title={"no"} onClick={onClickNoButton} />
                  </div>
                }
              />
            )}
            {waitingListStatus && (
              <StatusAlertCard content={ATTENDEE_STATUS_MESSAGE.WAITING_LIST} />
            )}

            {cancelledStatus && (
              <StatusAlertCard content={MESSAGE_FOR_BOTH.CANCELLED} />
            )}
            {happeningNowStatus && (
              <StatusAlertCard
                content={MESSAGE_FOR_BOTH.HAPPENING_NOW}
                component={
                  <>
                    <PrimaryButton
                      onClick={handleJoinMeeting}
                      title="Join"
                      style={{ marginRight: "16px" }}
                    />
                    <>
                      {!isInTwentyFourHour && (
                        <SessionPageMenu isAttendeePage />
                      )}
                    </>
                  </>
                }
              />
            )}
            <HSAttendeeDetailsCard
              userName={userName}
              userPosition={userPosition}
              profilePicUrl={profilePicUrl}
              rating={rating}
              sessionID={sessionID}
              sessionTitle={sessionTitle}
              sessionCategory={sessionCategory}
              bookingDetails={bookingDetails}
              hostID={hostID}
              thumbnails={bookingSessionData && bookingSessionData.thumbnails}
              slug_id={
                booking && booking.host_data && booking.host_data.slug_id
              }
            />

            <RequestedAgenda list={list} message={description} />
            {approvedStatus && <HappeningAtCard />}

            {/* <HappeningAtCard dontShow={disableItems()} /> */}
            {(approvedStatus || completedStatus || feedbackPendingStatus) && (
              <DocumentsSection
                // dontShow={disableItems()}
                session_id={booking.session_id}
                user_id={hostID && hostID}
              />
            )}

            {completedStatus && <HostFeedbackSection />}

            {/* <AttendeeViewReviewSection dontShow={disableTillThird()} /> */}

            {/* <ShareExperienceCard dontShow={disableTillThird()} /> */}
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            paddingLeft="16px"
            className={classes.rightGrid}
          >
            <StatusCard
              data={sessionStatus}
              message={sessionMessage}
              messageTag={messageTag}
            />
            {/* <FAQHelperSection /> */}
            {/* <PreviousSessionList /> */}
          </Grid>
        </Grid>
      </Container>
      <AttendeeSessionActionDialog
        open={thankYouModal}
        handleClose={handleCloseThankYouModal}
        sessionData={modalData}
      />
      <SessionNoActionDialog
        open={markNoModal}
        handleClose={handleCloseMarkNoModal}
        handlePrimaryAction={handleIncompleteAction}
      />
      <LoadingBackdrop open={loading} handleClose={handleClose} />
    </div>
  );
};

export default KnowledgeSessionAttendeePage;
