import {
  Button,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppHeader from "components/AppHeader";
import React from "react";
import { MdMoreHoriz } from "react-icons/md";
import FAQHelperSection from "sections/AppPages/SessionsPageSections/SessionPageComponents/FAQHelperSection";
import HappeningAtCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/HappeningAtCard";
import HostDetailsCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/HostDetailsCard";
import PreviousSessionList from "sections/AppPages/SessionsPageSections/SessionPageComponents/PreviousSessionList";
import DocumentsSection from "sections/AppPages/SessionsPageSections/SessionPageComponents/DocumentsSection";
import RequestedAgenda from "sections/AppPages/SessionsPageSections/SessionPageComponents/RequestedAgenda";
import AttendeeViewReviewSection from "sections/AppPages/SessionsPageSections/SessionPageComponents/ReviewSection";
import ShareExperienceCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/ShareExperienceCard";
import StatusCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/StatusCard";
import { ReactComponent as BackIcon } from "assets/svg/sessions/chevron-left.svg";
import { FaCheck } from "react-icons/fa";
import HostFeedbackSection from "sections/AppPages/SessionsPageSections/SessionPageComponents/FeedbackSection";
import WaitlistComponent from "sections/AppPages/SessionsPageSections/HostSection/WaitlistComponent";
import HostDocuments from "sections/AppPages/SessionsPageSections/HostSection/HostDocuments";
import SessionPageMenu from "sections/AppPages/SessionsPageSections/SessionPageComponents/SessionPageMenu";
import HSAcceptDialog from "sections/AppPages/SessionsPageSections/HostSection/HSAcceptDialog";
import { useState } from "react";
import { useEffect } from "react";
import authFetch from "utils/authFetch";
import { useDispatch, useSelector } from "react-redux";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import HSAttendeeDetailsCard from "sections/AppPages/SessionsPageSections/HostSection/HSAttendeeDetailsCard";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useHistory, useParams } from "react-router";
import {
  fetchAttendeeInfo,
  fetchHostBooking,
  fetchHostSession,
  fetchHostSessionStatus,
  setSessionFeedback,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import { differenceInHours, format } from "date-fns";
import { SESSION_STATUS } from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/MySessionsSection/SessionsSectionTabs";
import HostDeclinedMessageCard from "sections/AppPages/SessionsPageSections/AttendeeSection/HostDeclinedMessageCard";
import StatusAlertCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/StatusAlertCard";
import { SCHEDULE_SERVICES } from "constants/API_URLS";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import HostSessionActionDialog from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/HostSessionListItem/HostSessionActionDialog";
import SessionNoActionDialog from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/HostSessionListItem/SessionNoActionDialog";
import {
  HOST_STATUS_MESSAGE,
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
  timezone: user.timezone,
});

const KnowldgeSessionHostPage = ({ hide }) => {
  const { currentUser, booking, session_status, hostSession, timezone } =
    useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const sessionStatusState = session_status.session_status;
  const bookingSessionData = booking && booking.session_data;

  const classes = useStyles();
  const enqueueSnackbar = useEnqueueSnackbar();
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const handleAcceptDialogClose = () => setAcceptDialogOpen(false);

  const handleAcceptDialogOpen = () => setAcceptDialogOpen(true);

  const [loading, setLoading] = useState(false);
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
  const profilePicUrl = userDetails && userDetails?.image_url;
  // console.log({ userDetails, userName, profilePicUrl });

  const rating = userDetails?.rating;
  const [sessionID, setSessionID] = useState("");
  const [sessionDetails, setSessionDetails] = useState({});
  useEffect(() => {
    setUserDetails(booking.attendee_data);
  }, [booking.attendee_data]);
  useEffect(() => {
    setSessionDetails(booking.session_data);
  }, [booking]);
  const sessionCategory = sessionDetails?.category;
  const sessionTitle = sessionDetails?.title;
  const [bookingDetails, setBookingDetails] = useState({});
  const [sessionMessage, setSessionMessage] = useState("");
  const list = bookingDetails.questions;
  const description = bookingDetails?.description;
  const [messageTag, setMessageTag] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [attendeeID, setAttendeeID] = useState("");

  const [markNoModal, setMarkNoModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [thankYouModal, setThankYouModal] = useState(false);
  const history = useHistory();

  const fetchBookingUrl = SCHEDULE_SERVICES.FETCH_SCHEDULE_BOOKING;
  const fetchSessionUrl = "https://auth.hivepath.io/api/fetchSession";
  const sessionStatusUrl =
    "https://schedule.hivepath.io/api/sessionStatusTracking";
  const fetchUSerData = "https://auth.hivepath.io/api/fetchUserData";

  const [sessionStatus, setSessionStatus] = useState(sessionStatusState || []);
  const handleClose = () => setLoading(false);
  // const [bookingID, setBookingID] = useState("");
  const { bookingID } = useParams();
  // console.log("bookingId", bookingID);

  const fetchBookingDetails = (bookingId) => {
    const data = {
      booking_id: bookingId,
    };
    authFetch(fetchBookingUrl, data).then((json) => {
      // console.log("bookingDetails", json);
      if (json.status === "success") {
        const sessionID = json.result[0]?.session_id;
        const requesterID = json.result[0]?.requested_by;
        const ownerID = json.result[0]?.session_owner;
        setAttendeeID(requesterID);
        // fetchPreviousSessionsList(ownerID, requesterID);
        setBookingDetails(json?.result[0]);
        dispatch(fetchHostBooking(json?.result[0]));
      }

      setLoading(false);
    });
  };
  const fetchSessionDetails = (sessionID) => {
    const data = {
      // session_id: "61a4f73c6b5cfc2c8ade3ca5",
      session_id: sessionID,
    };
    authFetch(fetchSessionUrl, data).then((json) => {
      // console.info(json);
      setSessionDetails(json.result);
      dispatch(fetchHostSession(json.result));
    });
  };

  const sessionTrackingDetails = (userID, bookingID) => {
    setTrackingLoading(true);
    const data = {
      user_id: userID,
      booking_id: bookingID,
      // user_id: "613b036ac217a9716eb016ac",
      // booking_id: "0a806b94-5131-11ec-b350-93bfa785240f",
      key: "host",
    };
    authFetch(sessionStatusUrl, data).then((json) => {
      if (json.status === "success") {
        // console.log(json);
        const status = json.result.session_status;
        const message = json.result.status_message;
        dispatch(fetchHostSessionStatus(json.result));
        setSessionStatus(status);
        setSessionMessage(message);
        setMessageTag(json.result.message_tag);
        setTrackingLoading(false);
      }
    });
  };
  const fetchUserDetails = (userID) => {
    setInfoLoading(true);
    const url = "https://auth.hivepath.io/api/fetchUserData";
    const data = {
      user_id: userID,
    };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        setUserDetails(json?.result);
        dispatch(fetchAttendeeInfo(json.result));
        // console.log(json);
        setInfoLoading(false);
      }
    });
  };
  const disableItems = () => {
    const result = sessionStatusState && sessionStatusState[1]?.status;
    // console.log(result, "result");
    const disable =
      booking.booking_status === "pending" ||
      booking.booking_status === "cancelled";

    return disable;
  };
  const disableTillThird = () => {
    const result = sessionStatusState && sessionStatusState[2]?.status;
    // console.log(result, "result");
    return result;
  };
  useEffect(() => {
    // const webAddress = window.location.href;
    // const bookingId = webAddress.split("/sessions/")[1].split("/")[0];

    setLoading(true);
    fetchBookingDetails(bookingID);
    fetchSessionFeedback();
  }, []);

  let [previousSessionsList, setPreviousSessionsList] = useState([]);

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
  const fetchPreviousSessionsList = (user_id, owner_id) => {
    const url = "https://schedule.hivepath.io/api/fetchMutualSchedules";
    const data = {
      user_id: user_id,
      owner_id: owner_id,
    };

    authFetch(url, data)
      .then((json) => {
        // console.log(json);
      })
      .catch((error) => console.log(error));
  };

  const viewType = booking.host_view;
  const statusMessage = viewType && viewType.status_message.toLowerCase();

  const isEqualTo = (condition) => statusMessage === condition;

  const cancelledStatus = isEqualTo(SESSION_STATUS.CANCELLED);
  const approvedStatus = isEqualTo(SESSION_STATUS.APPROVED);
  const pendingStatus = isEqualTo(SESSION_STATUS.PENDING);
  const declinedStatus = isEqualTo(SESSION_STATUS.DECLINED);
  const completedStatus = isEqualTo(SESSION_STATUS.COMPLETED);
  const feedbackPendingStatus = isEqualTo(SESSION_STATUS.FEEDBACK_PENDING);
  const happeningNowStatus = isEqualTo(SESSION_STATUS.HAPPENING_NOW);

  const waitingListStatus = isEqualTo(SESSION_STATUS.WAITING_LIST);

  const handleJoinMeeting = () => {
    // const { booking } = useSelector(mapState);

    const meetingURL = booking.meeting_link;
    // console.log(meetingURL);
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
  // console.log({ getChangedDate, getTime, isInTwentyFourHour, timeDifference });

  const onClickYesButton = () => {
    setModalData(booking);
    handleSessionComplete();
  };

  const handleThankYouModalOpen = () => {
    setThankYouModal(true);
  };
  const handleCloseThankYouModal = () => {
    setThankYouModal(false);
    fetchBookingDetails(bookingID);
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
              onClick={() => history.push("/u/account/sessions")}
            >
              Back to sessions
            </Button>
          </div>
        </div>
        <Grid container>
          <Grid item md={8} xs={12}>
            {/* Status */}
            {cancelledStatus && (
              <HostDeclinedMessageCard
                hostPage
                content={MESSAGE_FOR_BOTH.CANCELLED}
              />
            )}

            {pendingStatus && (
              <StatusAlertCard
                content={HOST_STATUS_MESSAGE.REQUEST_RECEIVED}
                component={
                  <>
                    <Button
                      style={{}}
                      sx={{
                        textTransform: "capitalize",
                        background: "#00AF46",
                        borderRadius: "9px",
                        color: "white",
                        width: "auto",
                        height: {
                          xs: "42px",
                          md: "48px",
                        },
                        paddingRight: {
                          xs: "16px",
                        },
                        paddingLeft: {
                          xs: "16px",
                        },

                        marginRight: {
                          xs: "8px",
                          md: "16px",
                        },
                        "&:hover": {
                          // opacity: "0.9",
                          background: "#00AF46",
                        },
                      }}
                      onClick={handleAcceptDialogOpen}
                      // startIcon={<FaCheck />}
                    >
                      Accept{" "}
                    </Button>
                    <SessionPageMenu isHostPage />
                  </>
                }
              />
            )}

            {approvedStatus && (
              <StatusAlertCard
                content={HOST_STATUS_MESSAGE.APPROVED}
                component={
                  <>
                    {" "}
                    <PrimaryButton
                      onClick={handleJoinMeeting}
                      title="Join"
                      style={{ marginRight: "16px" }}
                    />
                    <>{!isInTwentyFourHour && <SessionPageMenu isHostPage />}</>
                  </>
                }
              />
            )}
            {completedStatus && (
              <StatusAlertCard content={MESSAGE_FOR_BOTH.COMPLETE} />
            )}
            {feedbackPendingStatus && (
              <StatusAlertCard
                content={HOST_STATUS_MESSAGE.FEEDBACK_PENDING}
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

            {declinedStatus && (
              <StatusAlertCard content={MESSAGE_FOR_BOTH.CANCELLED} />
            )}
            {happeningNowStatus && (
              <StatusAlertCard
                content={MESSAGE_FOR_BOTH.HAPPENING_NOW}
                component={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <PrimaryButton
                      onClick={handleJoinMeeting}
                      title="Join"
                      style={{ marginRight: "16px" }}
                    />
                    <>{!isInTwentyFourHour && <SessionPageMenu isHostPage />}</>
                  </div>
                }
              />
            )}

            <HSAttendeeDetailsCard
              userName={userName}
              userPosition={userPosition}
              profilePicUrl={profilePicUrl}
              rating={rating}
              sessionID={booking.session_id}
              sessionTitle={sessionTitle}
              sessionCategory={sessionCategory}
              bookingDetails={bookingDetails}
              loading={infoLoading}
              attendee_id={attendeeID}
              thumbnails={bookingSessionData && bookingSessionData.thumbnails}
              slug_id={
                booking &&
                booking.attendee_data &&
                booking.attendee_data.slug_id
              }
            />
            <RequestedAgenda list={list} message={description} />
            {approvedStatus && <HappeningAtCard />}
            {(approvedStatus || completedStatus || feedbackPendingStatus) && (
              <HostDocuments
                session_id={booking.session_id}
                // dontShow={disableItems()}
              />
            )}
            {completedStatus && (
              <>
                <HostFeedbackSection />

                {/* <ShareExperienceCard dontShow={disableTillThird()} /> */}
              </>
            )}
            {/* {
              feedbackPendingStatus && <WriteFeedbackSection />
            } */}
          </Grid>
          <Grid item md={4} xs={12} className={classes.rightGrid}>
            <StatusCard
              data={sessionStatus}
              message={sessionMessage}
              messageTag={messageTag}
              loading={trackingLoading}
            />
            {/* <FAQHelperSection /> */}
            {/* <WaitlistComponent /> */}
            {/* <PreviousSessionList data={previousSessionsList} /> */}
          </Grid>
        </Grid>
      </Container>
      <LoadingBackdrop open={loading} handleClose={handleClose} />

      <HSAcceptDialog
        open={acceptDialogOpen}
        handleClose={handleAcceptDialogClose}
      />
      <HostSessionActionDialog
        open={thankYouModal}
        handleClose={handleCloseThankYouModal}
        sessionData={modalData}
      />

      <SessionNoActionDialog
        open={markNoModal}
        handleClose={handleCloseMarkNoModal}
        handlePrimaryAction={handleIncompleteAction}
      />
    </div>
  );
};

export default KnowldgeSessionHostPage;
