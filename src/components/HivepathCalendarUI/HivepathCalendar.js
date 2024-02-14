import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import SPCustomToolbar from "./SPComponents/SPCustomToolbar";
import SPWeekEvent from "./SPComponents/SPWeekEvent";
import SPCustomWeekHeader from "./SPComponents/SPCustomWeekHeader";
import AppAndCalendarToolbar from "./SPComponents/AppAndCalendarToolbar";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

let currentDate = new Date();
let currentDay = currentDate.getDay();

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  // : () => startOfWeek(currentDate, { weekStartsOn: currentDay }),
  getDay,
  locales,
});

const customDayPropGetter = (date) => {
  const currentDate = new Date();
  if (date < currentDate)
    return {
      className: "disabled-day",
      style: {
        cursor: "not-allowed",
        background: "rgba(184, 184, 184, 0.1)",
      },
    };
  else return {};
};

// const WeekSlotWrapper = ({ children }) => {
//   return React.cloneElement(
//     React.Children.only(
//       <div className="rbc-time-slot">
//         {children}
//         {/* <span className="rbc-mark-available">Mark As Available</span> */}
//       </div>
//     )
//   );
// };
const HivepathCalendar = ({ events, height, style, ...calendarProps }) => {
  const calendarRef = React.createRef();

  const setEventCellStyling = (event) => {
    if (event.email) {
      let style = {
        background: `${event.color}`,
      };
      return { style };
    }

    if (event.time_availability === false) {
      let style = {
        background: "#F3FEF7",
        borderLeft: "2px solid rgba(34, 176, 74, 1)",
      };
      return { style };
    }
  };

  // console.log("dates", dates);

  let timeRangeFormat = ({ start, end }, culture, local) =>
    `${local.format(start, "p", culture)} – ${local.format(end, "p", culture)}`;

  const formats = {
    weekdayFormat: "EEE",
    // eventTimeRangeFormat:'e'
    timeGutterFormat: "hh a",
    // dayRangeHeaderFormat:'LLL ',

    eventTimeRangeFormat: timeRangeFormat,
  };
  const today = new Date();
  const showTimezone = format(today, "xxxxx");

  const dates = events.map((item) => {
    const { start_date } = item;
    return { ...item };
  });
  console.log({ events });

  return (
    <DragAndDropCalendar
      ref={calendarRef}
      localizer={localizer}
      // selectable
      // resizable
      formats={formats}
      popup={true}
      events={events}
      eventPropGetter={setEventCellStyling}
      dayPropGetter={customDayPropGetter}
      views={{ week: true }}
      step={30}
      drilldownView={"week"}
      // showMultiDayTimes
      scrollToTime={currentDate.getHours()}
      components={{
        // timeSlotWrapper: WeekSlotWrapper,
        week: {
          event: (props) => {
            return <SPWeekEvent {...props} />;
          },
          header: SPCustomWeekHeader,
        },
        header: {
          dateContentRow: (props) => {
            return <span style={{ visibility: "hidden" }}></span>;
          },
        },

        timeGutterHeader: (props) => {
          return (
            <div style={{ paddingTop: "8px" }}>
              <span
                className="rbc-label"
                style={{
                  paddingTop: "4px",
                  // wordBreak: "break-word",
                  // marginRight: "-4px",
                  marginLeft: "-6px",
                }}
              >
                {/* {"Date"} */}
                GMT
                <br /> {showTimezone}
              </span>
              {/* <br />
                <span className="rbc-label" style={{ paddingTop: "4px" }}>
                  {"Time"}
                </span>
                <br /> */}
            </div>
          );
        },
        toolbar: SPCustomToolbar,
      }}
      defaultView={"week"}
      style={{ height: height ? height : "68vh", ...style }}
      {...calendarProps}
    />
  );
};

export default HivepathCalendar;
