// import classes from "./CalendarComponent.module.css";
import "App.css";
import "react-nice-dates/build/style.css";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import enUS from "date-fns/locale/en-US";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import changeTimeZone from "utils/changeTimeZone";
import getParsedDayTime, {
  yyyymmdd,
  formatDate,
  getMonthYear,
} from "utils/formatDateFn";
import {
  updateCalendarSnapshot,
  updateSelectedDate,
} from "store/Scheduler/scheduler.actions";
import authFetch from "utils/authFetch";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    "& .nice-dates-day": {
      fontWeight: "600",
      color: "black",
      "&::after": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .nice-dates-navigation_current": {
      fontWeight: "bolder",
    },
    "& .nice-dates-week-header_day": {
      fontWeight: "bolder",
      color: "#373434",
    },
    "& .-disabled": {
      color: "#b4b4b4",
    },
    "& .nice-dates-navigation_next": {
      position: "absolute",
      left: "30px",
    },
    "& .nice-dates-navigation_current": {
      textAlign: "left",
      paddingLeft: "30px",
      fontSize: "21px",
      fontWeight: "bold",
    },
    "& .nice-dates-week-header": {
      boxShadow: "none",
    },
    "& .nice-dates-navigation": {
      paddingTop: "15px",
      marginBottom: "11px",
    },

    "& .-slotsAvailable": {
      "& .nice-dates-day_date": {
        background: "rgba(72, 74, 158, 0.1)",
        color: theme.palette.primary.main,
        borderRadius: "50%",
        width: "80%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "&::before": {
        left: "10.5%",
        right: "10.5%",
        top: "10.5%",
        bottom: "10.5%",
      },
      "&::after": {
        left: "10.5%",
        right: "10.5%",
        top: "10.5%",
        bottom: "10.5%",
      },
    },
    "& .-selected": {
      "& .nice-dates-day_date": {
        color: "white !important",
      },
      "&::before": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const DatePickerCalendarComponent = (props) => {
  const classes = useStyles();
  const { sessionId, hostId, bookingId } = useParams();
  const { currentUser } = useSelector(mapState);

  const ownerId = hostId || props.hostId; // from outside logged in area

  const dispatch = useDispatch();
  const enqueueSnackbar = useEnquequeSnackbar();

  const { data, selectedDate } = useSelector(
    (state) => state.scheduler.calendar
  );
  const { slotsWithTime } = props.data.data;
  const { setIsLoading } = props;
  const { timezone } = useSelector((state) => state.slotsData);

  //   var yesterday = new Date(new Date().valueOf() - 1000 * 3600 * 24);

  let enabledDates = {};
  const currentDateValidate = changeTimeZone(new Date(), enUS, timezone);

  if (slotsWithTime) {
    for (let slot of slotsWithTime) {
      const fromValidate = changeTimeZone(slot.date, enUS, timezone);

      if (currentDateValidate < fromValidate) {
        let modifiedTime = changeTimeZone(
          slot.date,
          enUS,
          timezone
        ).toDateString();
        if (!(modifiedTime in enabledDates)) {
          enabledDates[modifiedTime] = true;
        }
      }
    }
  }

  const updateSelectedDateHandler = (d) => {
    dispatch(updateSelectedDate(d));
  };

  const updateMonthHandler = (d) => {
    // getting first date of current month
    const modifiedTime = changeTimeZone(new Date(), enUS, timezone);

    let currentDate = modifiedTime;
    currentDate.setHours(0, 0, 0, 0);

    if (d.getMonth() >= currentDate.getMonth()) {
      fetchSlotPlan(d);
    }
  };

  const fetchSlotPlan = (date) => {
    const forwardMove = date > selectedDate ? true : false;

    const { month, year, monthNumber } = getMonthYear(date);
    let modifiedTime = date;
    let forwardSlot = null;
    let backwardSlot = date;

    if (currentUser) {
      setIsLoading(true);
      let requestData = {
        owner_id: ownerId,
        requested_by: currentUser.user_id,
        type: "one-one",
        month: month,
        year: year + "",
        // time_slot: 30,
      };

      const data_t = authFetch(
        "https://calendar.hivepath.io/api/fetchSlots",
        requestData
      )
        .then((res) => {
          setIsLoading(false);
          if (res.status === "success") {
            let slotsWithTime = res["result"]
              .map((slot) => {
                const { from_date, from_time, to_date, to_time, waitlist } =
                  slot;

                let slotDate = getParsedDayTime(from_date, from_time);
                let slotEndDate = getParsedDayTime(to_date, to_time);

                let convertedSlot = changeTimeZone(slotDate, enUS, timezone);

                if (!forwardSlot && convertedSlot.getMonth() === monthNumber) {
                  forwardSlot = convertedSlot;
                }
                if (convertedSlot.getMonth() === monthNumber) {
                  backwardSlot = convertedSlot;
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

            let modifiedSlotTime = modifiedTime;
            if (slotsWithTime.length > 0) {
              modifiedSlotTime = forwardMove
                ? forwardSlot || modifiedTime
                : backwardSlot;
            }

            dispatch(updateSelectedDate(modifiedSlotTime));
          }
        })
        .catch((err) => {
          setIsLoading(false);
          enqueueSnackbar("Connection failed", {
            variant: "error",
          });
          console.log(err);
        });
    }
  };

  const modifiers = {
    disabled: (date) => {
      if (slotsWithTime) {
        // will need to adjust for different timeframes (maybe)
        let isDisabled = true;
        const currentDate = currentDateValidate.setHours(0, 0, 0, 0);

        if (date >= currentDate) {
          let mdate = date.toDateString();
          isDisabled = !(mdate in enabledDates);
        }

        return isDisabled;
      }
    },
    highlight: (date) => {
      if (slotsWithTime) {
        // will need to adjust for different timezones (maybe)

        const currentDate = currentDateValidate.setHours(0, 0, 0, 0);

        if (date >= currentDate) {
          let mdate = date.toDateString();
          return mdate in enabledDates;
        }
      }
    },
  };

  const modifiersClassNames = {
    highlight: "-slotsAvailable",
  };

  return (
    <div className={classes.container}>
      {/* <p>
        Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
      </p> */}
      <DatePickerCalendar
        date={selectedDate}
        onDateChange={updateSelectedDateHandler}
        month={selectedDate}
        onMonthChange={updateMonthHandler}
        locale={enGB}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </div>
  );
};

export default DatePickerCalendarComponent;
