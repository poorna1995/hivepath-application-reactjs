import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";

import changeTimeZone from "utils/changeTimeZone";
import enUS from "date-fns/locale/en-US";
import getParsedDayTime, { getMonthYear } from "utils/formatDateFn";

import authFetch from "utils/authFetch";
import {
  updateScheduleCard,
  updateSelectedDate,
  updateDescription,
  updateQuestionSnapshot,
  updateCalendarSnapshot,
  resetState,
} from "store/Scheduler/scheduler.actions";
import { SCHEDULE_SERVICES } from "constants/API_URLS";

const mapState = ({ slotsData }) => ({
  timezone:
    slotsData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
});
const SchedulerLayout = (props) => {
  const { sessionId, hostId, bookingId } = useParams();
  const { user_id } = useSelector((state) => state.user.currentUser);
  const { timezone } = useSelector(mapState);
  const { calendar } = useSelector((state) => state.scheduler);

  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const modifiedTime = changeTimeZone(new Date(), enUS, timezone);

  useEffect(() => {
    if (!bookingId) {
      dispatch(resetState());
    }

    fetchUserMetaData();
    fetchSessionDetails();
  }, []);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    } else {
      fetchSlotPlan();
    }
  }, [props.toggleBookingDetails]);

  const fetchBookingDetails = () => {
    setIsLoading(true);
    const requestData = {
      user_id: user_id,
      booking_id: bookingId,
    };
    const data_t = authFetch(
      SCHEDULE_SERVICES.FETCH_SCHEDULE_BOOKING,
      requestData
    )
      .then((res) => {
        setIsLoading(false);
        if (res.status === "success") {
          if (res.result && res.result.length > 0) {
            const {
              booking_status,
              //   date,
              from_date,
              to_date,
              from_time,
              to_time,
              //   from,
              //   to,
              duration,
              questions,
              description,
            } = res.result[0];
            if (booking_status !== "draft") {
              // if it's pending or anything else then booking id is invalid
            } else {
              let selectedSlotDate = getParsedDayTime(from_date, from_time);

              let fromTime = changeTimeZone(
                selectedSlotDate,
                enUS,
                timezone
              ).toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              });

              let toTime = changeTimeZone(
                getParsedDayTime(to_date, to_time),
                enUS,
                timezone
              ).toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              });

              dispatch(updateSelectedDate(selectedSlotDate));
              dispatch(
                updateScheduleCard({
                  duration: duration + " Min",
                  sessionTime: fromTime + " - " + toTime,
                  sessionDate: selectedSlotDate,
                })
              );
              //   dispatch(updateSelectedSlot(from + "|" + to + "|" + date));
              dispatch(updateDescription(description));
              if (questions && questions.length > 0) {
                dispatch(updateQuestionSnapshot(questions));
              }

              fetchUserMetaData();
              return selectedSlotDate;
            }
          }
        } else {
          enqueueSnackbar("Error while fetching the data, Please try again", {
            variant: "error",
          });
        }
      })
      .then((res) => {
        fetchSlotPlan(res);
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar("Connection failed", {
          variant: "error",
        });
        console.log(err);
      });
  };

  const fetchUserMetaData = () => {
    setIsLoading(true);
    const requestData = {
      user_id: hostId,
    };
    const prevSessions = authFetch(
      "https://profile.hivepath.io/api/fetchUserData",
      requestData
    )
      .then((res) => {
        setIsLoading(false);
        if (res.status === "success") {
          let {
            name,
            location,
            profile_pic_url,
            designation,
            company,
            rating,
            reviews,
            email,
            slug_id,
            profile_headline_description,
          } = res.result;

          if (profile_pic_url === "") {
            profile_pic_url =
              "https://mhcd.org/wp-content/uploads/2017/12/placeholder-man.png";
          }

          let updateScheduleCardData = {
            username: name,
            location: location,
            userImage: profile_pic_url,

            designation: designation,
            companyName: company || "",
            rating: rating || "",
            reviews: reviews || "",
            owner_email: email || "",
            slug_id: slug_id,
            profile_headline_description: profile_headline_description,
          };
          dispatch(updateScheduleCard(updateScheduleCardData));
        } else {
          console.log(res);
          enqueueSnackbar("Error occured while fetching user data", {
            variant: "error",
          });
          // alert("An error occured, Contact admin");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar("Connection failed", {
          variant: "error",
        });
        console.log(err);
      });
  };

  const fetchSessionDetails = () => {
    setIsLoading(true);
    const requestData = {
      //   user_id: user_id,
      loggedin_user_id: user_id,
      type: "one-one",
      session_id: sessionId,
    };

    const data_t = authFetch(
      "https://ks.hivepath.io/api/fetchUserOffering",
      requestData
    )
      .then((res) => {
        setIsLoading(false);

        const { status, result } = res;
        if (status === "success") {
          if (result.length > 0) {
            const { title, category, thumbnails, prerequisites } = result[0];
            dispatch(
              updateScheduleCard({
                category: category,
                title: title,
                card_image: thumbnails[0] || "",
                prerequisites: prerequisites,
              })
            );
          } else {
            enqueueSnackbar("No offering found", {
              variant: "error",
            });
          }
        } else {
          enqueueSnackbar("Couldn't fetch the session data", {
            variant: "error",
          });
          console.log(res);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar("Connection failed", {
          variant: "error",
        });
        console.log(err);
      });
  };

  const fetchSlotPlan = (date) => {
    // date parameter is coming from fetch booking details
    setIsLoading(true);
<<<<<<< HEAD
    // let monthYear = getMonthYear(calendar.selectedDate);
    // if (date) {
    let monthYear = getMonthYear(modifiedTime);
    // }
    // const owner_id = "613b036ac217a9716eb016ac"; // original
=======
    let monthYear = getMonthYear(calendar.selectedDate);
    if (date) {
      monthYear = getMonthYear(date);
    }
>>>>>>> schedule-flow-restructure

    const requestData = {
      owner_id: hostId,
      requested_by: user_id,
      type: "one-one",
      time_slot: 30,
      month: monthYear.month,
      year: monthYear.year + "",
    };

    const data_t = authFetch(
      "https://calendar.hivepath.io/api/fetchSlots",
      requestData
    )
      .then((res) => {
        setIsLoading(false);
        if (res.status === "success") {
          //   let currentDateSlot = false;
          let firstDateSlot = null;

          let slotsWithTime = res["result"]
            .map((slot) => {
              const { from_date, from_time, to_date, to_time, waitlist } = slot;

              let slotDate = getParsedDayTime(from_date, from_time);
              let slotEndDate = getParsedDayTime(to_date, to_time);

              if (
                (firstDateSlot === null || firstDateSlot > slotDate) &&
                slotDate >= modifiedTime
              ) {
                // getting the youngest date of slot
                firstDateSlot = slotDate;
              }

              return {
                ...slot,
                date: slotDate,
                endDate: slotEndDate,
                slotDate: from_date,
              };
            })
            .flat();

          dispatch(
            updateCalendarSnapshot({
              slot_plan: res["result"],
              slotsWithTime: slotsWithTime,
            })
          );
          if (!bookingId) {
            let modifiedSlotTime = modifiedTime;
            if (firstDateSlot) {
<<<<<<< HEAD
              modifiedSlotTime = changeTimeZone(firstDateSlot, enUS, timezone);
            }

=======
              modifiedSlotTime = firstDateSlot;
            }
>>>>>>> schedule-flow-restructure
            dispatch(updateSelectedDate(modifiedSlotTime));
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar("Connection failed", {
          variant: "error",
        });
        console.log(err);
      });
  };

  const masterLoading = isLoading || props.isLoading;

  return (
    <Grid container spacing={2}>
      <LoadingBackdrop open={masterLoading} />
      <Grid item xs={12} md={12}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default SchedulerLayout;
