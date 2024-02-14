import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./SPstyles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import SPCustomToolbar from "./SPComponents/SPCustomToolbar";
import SPCustomMonthHeader from "./SPComponents/SPCustomHeader";
import authFetch from "utils/authFetch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSlot, setSlots } from "store/calendarSlots/calendarSlotsSlice";
import SPWeekEvent from "./SPComponents/SPWeekEvent";
import CreateEventPopUp from "./SPComponents/Events/CreateEventPopUp";
import SPCustomWeekHeader from "./SPComponents/SPCustomWeekHeader";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { differenceInMinutes, parseISO } from "date-fns";
import fetchCalendarView from "./utils/fetchCalendarView";
import changeTimezone from "utils/changeTimeZone";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { setCalendarSyncedEmails } from "store/User/user.actions";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import DeleteEventPopup from "./SPComponents/Events/DeleteEventPopup";
// import { views } from "react-big-calendar/lib/Views";
import { CALENDAR_SERVICES } from "constants/API_URLS";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

let currentDate = new Date();
let currentDay = currentDate.getDay();

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(currentDate, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const mapState = ({ user, slotsData, calendarSlots }) => ({
  currentUser: user.currentUser,
  slots: calendarSlots?.slots,
  slot: calendarSlots.slot,
  availableSlots: slotsData?.availableSlots,
  syncedEmailsFetch: user.syncedEmailsFetch,
  calendarTimezone: slotsData.timezone,
  syncedEmails: user.calendar_synced_emails,
  user: user,
});

const customDayPropGetter = (date) => {
  const currentDate = new Date();
  // let dateTime = date.getTime();
  // let curr = currentDate.getTime();
  // console.log({ date, curr });
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

const WeekSlotWrapper = ({ children }) => {
  return React.cloneElement(
    React.Children.only(
      <>
        {children}
        <div className="rbc-mark-available">{/* Mark As Available */}</div>
      </>
    )
  );
};

const customTimeSlot = (props) => {
  return React.cloneElement(React.Children.only(props.children), {
    style: {
      background: "red",
    },
  });
};

// function TimeSlotWrapper(props: { children: React.ReactNode, resource: null /* grid */ | undefined /* gutter */, value: Date }) {
//   if (props.resource === undefined /* gutter */ || !isBanned(props.value)) {
//     return props.children;
//   }

//   const child = React.Children.only(props.children);
//   return React.cloneElement(child, { className: child.props.className + ' rbc-off-range-bg' });
// }
const SlotPlannerCalendar = ({ calendarHeight, style, containerStyles }) => {
  const calendarRef = React.createRef();

  const {
    currentUser,
    slots,
    syncedEmailsFetch,
    calendarTimezone,
    syncedEmails,
    user,
  } = useSelector(mapState);
  const [openCreateEventPopUp, setOpenCreateEventPopUp] = useState(false);
  const [eventData, setEventData] = useState({});

  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const USER_ID = currentUser.user_id;
  const [myEvents, setMyEvents] = useState([]);
  const today = new Date();
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);

  let scrollToTime =
    today.getHours() > 4 ? today.getHours() - 2 : today.getHours();
  console.log({ scrollToTime });
  const currentHours = today.getHours();
  console.log({ currentHours });
  // if (currentHours > 4) {
  //   scrollToTime = currentHours - 3;
  //   return scrollToTime;
  // }
  const showTimezone = format(today, "xxxxx");
  console.log(showTimezone);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleClosePopup = () => {
    setOpenCreateEventPopUp(false);
    dispatch(setSlot({}));
  };
  const handleOpenPopup = () => {
    setOpenCreateEventPopUp(true);
  };
  const handleRemoveModalOpen = () => {
    setOpenRemoveModal(true);
  };
  const handleRemoveModalClose = () => {
    setOpenRemoveModal(false);
  };
  const enqueueSnackbar = useEnquequeSnackbar();
  const [draggedEvent, setDraggedEvent] = useState();

  let emails = syncedEmailsFetch;
  // ||
  // user.calendar_synced_emails?.map((item) => {
  //   const { email } = item;
  //   return email;
  // });
  // fetch slots from the api

  const fetchEmails = () => {
    const url = CALENDAR_SERVICES.FETCH_SYNCED_CALENDAR;
    const data = {
      user_id: USER_ID,
    };
    authFetch(url, data)
      .then((json) => {
        // console.log("json.external_calendar", json?.external_calendar);
        dispatch(setCalendarSyncedEmails(json?.result));
      })
      .catch((error) => console.log(error));
  };

  const setEventCellStyling = (event) => {
    // console.log("event in prop styling", event);

    if (event.availability === true) {
      let style = {
        background: `#F7FFF4`,
        border: `1px solid #89C073`,
        borderLeft: `5px solid #89C073`,
      };
      return { style };
    }
    if (event.email) {
      let style = {
        background: `${event.color}`,
        border: `1px solid ${event.border}`,
        borderLeft: `5px solid ${event.border} `,
      };
      return { style };
    }

    if (event.approval_status === "approved") {
      let style = {
        background: "#EDFBF4",
        border: "1px solid rgba(73, 217, 148, 0.7)",
      };
      return { style };
    }
  };
  const customSlotPropGetter = (date) => {
    let style = {
      background: "red",
    };
    return {
      className: "rbc-time-slot rbc-mark-available",
      style: style,
    };
  };

  const fetchSlots = () => {
    setOpenBackdrop(true);
    fetchCalendarView(USER_ID, syncedEmailsFetch).then((json) => {
      if (json) {
        handleCloseBackdrop();
        // return setMyEvents(json);
        // console.log({ json });
        return dispatch(setSlots(json));
      }
      // return dispatch(setSlots([]));
    });
  };
  useEffect(() => {
    fetchSlots();
    fetchEmails();
  }, [syncedEmailsFetch]);

  const colors = [
    {
      id: "0",
      color: "#F2FAFF",
      border: " #2D9AFF",
    },
    {
      id: "1",
      color: "#FEF7EC",
      border: "#E88C38",
    },
  ];
  const syncedEmail = syncedEmails?.map((item, index) => {
    const { sync, email } = item;

    return {
      sync,
      email,
      id: index,
    };
  });

  let arr3 =
    syncedEmail?.map((item, i) => Object.assign({}, item, colors[i])) || [];
  // console.log("arr3", arr3);

  // console.log(slots);
  const dates =
    (Array.isArray(slots) &&
      slots.length > 0 &&
      slots.map((slot) => {
        const { start, end, email } = slot;

        const startTime = changeTimezone(start, enUS, calendarTimezone);
        const endTime = changeTimezone(end, enUS, calendarTimezone);

        const color = arr3?.filter((arrItem) => {
          if (arrItem.email === email) return arrItem.color;
          return null;
        });
        const getcolor = color[0]?.color || "";
        // const border = arr3?.filter((arrItem) => {
        //   if (arrItem.email === email) return arrItem.border;
        //   return null;
        // });
        // console.log({ color });
        const getBorder = color[0]?.border || "";
        return {
          color: getcolor,
          border: getBorder,
          start: new Date(startTime),
          end: new Date(endTime),

          ...slot,
        };
      })) ||
    [];
  // console.log("dates", dates);

  // useEffect(() => {
  //   setMyEvents(dates);
  //   // console.log("myEvents", myEvents, calendarTimezone);
  // }, [slots, calendarTimezone]);

  const handleDragStart = (event) => {
    // this.setState({ draggedEvent: event });
    setDraggedEvent(event);
  };

  const dragFromOutsideItem = () => {
    return draggedEvent;
  };

  let timeRangeFormat = ({ start, end }, culture, local) =>
    `${local.format(start, "p", culture)} – ${local.format(end, "p", culture)}`;

  let dayRangeHeaderFormat = ({ start, end }, culture, local) =>
    `${local.format(start, "MMM d", culture)} – ${local.format(
      end,
      "MMM d, yyyy",
      culture
    )}`;

  const formats = {
    weekdayFormat: "EEE",
    // eventTimeRangeFormat:'e'
    timeGutterFormat: "hh aaa",
    dayRangeHeaderFormat: dayRangeHeaderFormat,

    eventTimeRangeFormat: timeRangeFormat,
  };

  const onDropFromOutside = ({ start, end, allDay }) => {
    // const { draggedEvent } = this.state;

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    };
    setDraggedEvent(null);
    // setState({ draggedEvent: null });
    moveEvent({ event, start, end });
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    // const { events } = this.state;

    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = myEvents.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent;
    });

    // this.setState({
    //   events: nextEvents,
    // });
    setMyEvents(nextEvents);

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  };

  const resizeEvent = ({ event, start, end }) => {
    // const { events } = this.state;

    const nextEvents = myEvents.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    // this.setState({
    //   events: nextEvents,
    // });

    setMyEvents(nextEvents);

    //alert(`${event.title} was resized to ${start}-${end}`)
  };

  function newEvent(_event) {
    // let idList = this.state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    // let hour = {
    //   id: newId,
    //   title: 'New Event',
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    // }
    // this.setState({
    //   events: this.state.events.concat([hour]),
    // })
  }

  const handleRemoveEvent = (event) => {
    // console.log(event);

    const data = {
      user_id: USER_ID,
      type: "one-one",
      // key: "time",
      object_id: event.object_id,
      // date_object_id: event.date_object_id,
    };
    const url = `${process.env.REACT_APP_HIVEPATH_CALENDAR_API_URL}/deleteSlotPlan`;
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        const user_id = USER_ID;
        // fetchSlotPlan(user_id).then((json) => {
        //   console.log("json", json);
        //   dispatch(setSlots(json));
        // });
        fetchCalendarView(user_id, emails).then((items) => {
          dispatch(setSlots(items));
        });
        // dispatch(fetchSlotsStart)
        //  dispatch(fetchSlotsStart(json?.result.slot_data?.one-one.slot_plan));

        // enqueueSnackbar(json?.message, {
        //   variant: "success",
        // });
      } else {
        enqueueSnackbar(json?.message, {
          variant: "error",
        });
      }
      console.log(json);
    });
  };

  const handleEventSelect = (event) => {
    // alert( e.start);
    // alert(e.title);
    // handleClickEvent(e)
    // alert(e.end)
    // alert(e.title)
    console.log({ event });
    if (event.availability === false) return null;
    // handleRemoveEvent(event);
    handleRemoveModalOpen();
    setEventData(event);
    // console.log(event);

    // console.log(e);
    // setOpen(!open);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    dispatch(setSlot({}));
  };

  const handleSelect = ({ start, end }) => {
    const currentDate = new Date();
    const startTime = zonedTimeToUtc(start, calendarTimezone);
    const endTime = zonedTimeToUtc(end, calendarTimezone);
    if (start < currentDate) {
      return null;
    }

    handleOpenPopup();
    console.log(calendarTimezone);
    // setEventData({startTime,endTime})
    dispatch(setSlot({ start, end }));

    // const startTime = new Date(changeTimezone(start, enUS, calendarTimezone));
    // const endTime = new Date(changeTimezone(end, enUS, calendarTimezone));
    // console.group("Event Create")
    console.log(start, end);
    console.log("startTime, endTime", startTime, endTime);
    // console.groupEnd("Event group end")

    // if the start and end time is already in the list i.e., the event/ slot is already created for a time, delete the event for that time
    // for this call another function to delete slot for that particular time

    // try {
    //   // if (startTimeAndDate === typeof Date && endTimeAndDate === typeof Date) {
    //   const schema = {
    //     type: "one-one",
    //     user_id: USER_ID,
    //     from_date: format(start, "yyyy-LL-dd"),
    //     to_date: format(end, "yyyy-LL-dd"),
    //     from_time: format(start, "hh:mma"),
    //     to_time: format(end, "hh:mma"),
    //     timezone: calendarTimezone,
    //     // slot_plan: [
    //     //   {
    //     //     date: format(start, "yyyy-LL-dd"),
    //     //     day: format(start, "eeee"),
    //     //     availability: true,
    //     //     time: [
    //     //       {
    //     //         from: format(start, "hh:mma"),
    //     //         to: format(end, "hh:mma"),
    //     //         // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    //     //         timezone: calendarTimezone,
    //     //       },
    //     //     ],
    //     //   },
    //     // ],
    //     // booking_duration: differenceInMinutes(endTime, startTime),
    //   };

    //   //new data
    //   //   {
    //   //     "type": "one-one",
    //   //     "user_id": "61b05f7fd2fc4ac7bffe93e6",
    //   //     "from_date": "2022-02-17",
    //   //     "to_date" : "2022-02-18",
    //   //     "from_time": "11:00PM",
    //   //     "to_time":"02:00AM",
    //   //     "timezone":"UTC"
    //   // }

    //   console.log(schema);

    //   // Backend connection
    //   const url = `${process.env.REACT_APP_HIVEPATH_CALENDAR_API_URL}/slotPlan`;

    //   authFetch(url, schema)
    //     .then((json) => {
    //       console.log(json);
    //       if (json.status === "success") {
    //         const user_id = USER_ID;
    //         fetchCalendarView(user_id, emails).then((items) => {
    //           dispatch(setSlots(items));
    //         });

    //         return enqueueSnackbar(json?.message, {
    //           variant: "success",
    //         });
    //       } else {
    //         return enqueueSnackbar(json?.message, {
    //           variant: "error",
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   // }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div
      style={{
        paddingBottom: "32px",
        ...containerStyles,
      }}
    >
      <DragAndDropCalendar
        ref={calendarRef}
        localizer={localizer}
        selectable
        resizable
        longPressThreshold={1}
        formats={formats}
        popup={true}
        eventPropGetter={setEventCellStyling}
        dayPropGetter={customDayPropGetter}
        // slotPropGetter={customSlotPropGetter}
        onSelectSlot={handleSelect}
        // onEventDrop={moveEvent}
        // onEventResize={resizeEvent}
        onSelectEvent={handleEventSelect}
        events={dates}
        views={{ week: true }}
        step={30}
        drilldownView={"week"}
        // min={new Date(today.getFullYear(), today.getMonth(), today.getDay(), 8)}
        // max={
        //   new Date(today.getFullYear(), today.getMonth(), today.getDay(), 20)
        // }
        // timeslots={10}
        showMultiDayTimes
        scrollToTime={scrollToTime}
        // dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
        // onDropFromOutside={onDropFromOutside}
        // handleDragStart={handleDragStart}
        // date={new Date(Date.now())}
        components={{
          // timeSlotWrapper: WeekSlotWrapper,
          // event: SPCustomEvent,
          // agenda: {
          //   event: EventAgenda,
          // },
          // dateCellWrapper: ColoredDateCellWrapper,
          // day:SPCustomDateCell,
          // dayColumnWrapper:'',
          // eventContainerWrapper:{
          //   timeGridEvent: SPCustomEvent
          // },

          // eventWrapper: SPCustomEventWrapper,
          // header: SPCustomHeader,
          week: {
            // event: (props) => {
            //   return <SPTimeGridEvent

            //   {...props}
            // },
            // eventWrapper: (props) => {
            //   return <SPEventCell {...props} />;
            // },

            event: (props) => {
              return (
                <SPWeekEvent
                  // style={{ height: "", top: "", width: "", xOffset: "" }}
                  // SPWeekEvent
                  // components={{
                  //   event: SPWeekEvent,
                  //   eventWrapper: SPEventCell,
                  // }}
                  {...props}
                  // modalOpen={open}
                  // handleCreateModalClose={handleModalClose}
                />
              );
            },
            header: SPCustomWeekHeader,
            // dateCellWrapper: ColoredDateCellWrapper,
            // eventWrapper: ColoredDateCellWrapper,
            // dayCellWrapper: ColoredDateCellWrapper
          },
          header: {
            dateContentRow: (props) => {
              return <span style={{ visibility: "hidden" }}></span>;
            },
          },

          // resourceHeader:(props) => {
          //   return <SPCustomHeader label={props.label} />
          // },
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
          // timeGutterWrapper:'',
          toolbar: SPCustomToolbar,

          // timeGridEvent: SPCustomEvent,
          // week: CustomWeek,
          // work_week:''
        }}
        // startAccessor="start"
        // endAccessor="end"
        defaultView={"week"}
        // defaultView={Views.WEEK}
        style={{
          ...style,
          height:
            // "100%",
            calendarHeight ? calendarHeight : "68vh",
        }}
        // scrollToTime={new Date(1970, 1, 1, 6)}
        // defaultDate={new Date(2015, 3, 12)}
        // defaultDate={new Date(2021, 17, 7)}
      />

      {/* <CreateEventPopUp
        // event={myNewEvent}

        handleClose={handleModalClose}
        open={open}
      /> */}

      {/* 
<EditEvent 
event={event}
handleClose={handleModalClose}
open={modalOpen}

/> */}

      <CreateEventPopUp
        open={openCreateEventPopUp}
        handleClose={handleClosePopup}

        // eventData={eventData}
      />

      <DeleteEventPopup
        open={openRemoveModal}
        handleClose={handleRemoveModalClose}
        event={eventData}
      />
      {/* <LoadingBackdrop open={openBackdrop} handleClose={handleCloseBackdrop} /> */}
    </div>
  );
};

export default SlotPlannerCalendar;
