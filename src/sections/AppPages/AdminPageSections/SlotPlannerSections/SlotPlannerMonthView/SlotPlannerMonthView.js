import { differenceInMinutes, format } from "date-fns";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import { setSlot, setSlots } from "store/calendarSlots/calendarSlotsSlice";
import authFetch from "utils/authFetch";
import fetchCalendarView from "../utils/fetchCalendarView";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import SPCustomToolbar from "../SPComponents/SPCustomToolbar";
import CreateEventPopUp from "../SPComponents/Events/CreateEventPopUp";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const mapState = ({ user, slotsData }) => ({
  currentUser: user.currentUser,
  slots: slotsData?.slots,
  slot: slotsData.slot,
  availableSlots: slotsData?.availableSlots,
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

const WeekSlotWrapper = ({ children }) => {
  return React.cloneElement(
    React.Children.only(
      <div className="rbc-time-slot">
        <>
          {children}
          <span className="rbc-mark-available">Mark As Available</span>
        </>
      </div>
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

const SlotPlannerMonthView = () => {
  const calendarRef = React.createRef();

  const { currentUser, slots } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [myEvents, setMyEvents] = useState([]);
  const today = new Date();
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);

  const scrollToTime =
    today.getHours() > today.setHours(8) ? today.getHours() : today.setHours(8);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const enqueueSnackbar = useEnquequeSnackbar();
  const [draggedEvent, setDraggedEvent] = useState();

  let emails = currentUser?.external_calendar?.map((item) => {
    const { email } = item;
    return email;
  });
  // fetch slots from the api
  const fetchSlots = () => {
    const user_id = USER_ID;

    // fetchSlotPlan(user_id).then((json) => {
    //   // dispatch(setSlots(json));
    // });
    fetchCalendarView(user_id, emails).then((json) => {
      // console.log("CalendarView", json);
      // const currentDate = new Date();

      // filter list of events from today

      // const result = json?.filter((slot) => {
      //   const {
      //     start,
      //     end,
      //     title,
      //     booking_id,
      //     time_availability,
      //     object_id,
      //     session_id,
      //     source_type,
      //     timezone,
      //     date,
      //   } = slot;

      //   const currentDate = new Date();

      //   if (start < currentDate || end < currentDate) return null;

      //   return {
      //     start: new Date(start),
      //     end: new Date(end),
      //     title,
      //     booking_id,
      //     time_availability,
      //     object_id,
      //     session_id,
      //     source_type,
      //     timezone,
      //     date,
      //   };
      // });
      dispatch(setSlots(json));
    });
  };
  useEffect(() => {
    fetchSlots();
  }, []);

  const dates =
    slots?.map((slot) => {
      const {
        start,
        end,
        title,
        booking_id,
        time_availability,
        object_id,
        session_id,
        source_type,
        timezone,
        date,
      } = slot;

      // const currentDate = new Date();

      // if (start < currentDate || end < currentDate) return null;

      return {
        start: new Date(start),
        end: new Date(end),
        title,
        booking_id,
        time_availability,
        object_id,
        session_id,
        source_type,
        timezone,
        date,
      };
    }) || [];
  // console.log("dates", dates);

  useEffect(() => {
    setMyEvents(dates);
  }, [slots]);

  const handleDragStart = (event) => {
    // this.setState({ draggedEvent: event });
    setDraggedEvent(event);
  };

  const dragFromOutsideItem = () => {
    return draggedEvent;
  };

  let timeRangeFormat = ({ start, end }, culture, local) =>
    `${local.format(start, "p", culture)} – ${local.format(end, "p", culture)}`;

  const formats = {
    weekdayFormat: "EEE",
    // eventTimeRangeFormat:'e'

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
    console.log(event);

    const data = {
      user_id: USER_ID,
      type: "one-one",
      key: "time",
      object_id: event.object_id,
    };
    const url = `${process.env.REACT_APP_HIVEPATH_UTIL_API_URL}/deleteSlotPlan`;
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

  const handleEventSelect = (e) => {
    // alert( e.start);
    // alert(e.title);
    // handleClickEvent(e)
    // alert(e.end)
    // alert(e.title)
    handleRemoveEvent(e);

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
    if (start < currentDate) {
      return null;
    }

    try {
      // if (startTimeAndDate === typeof Date && endTimeAndDate === typeof Date) {
      const schema = {
        type: "one-one",
        user_id: USER_ID,
        slot_plan: [
          {
            date: format(start, "yyyy-LL-dd"),
            day: format(start, "eeee"),
            availability: true,
            time: [
              {
                from: format(start, "hh:mma"),
                to: format(end, "hh:mma"),
                timezone: format(start, "OOOO"),
              },
            ],
          },
        ],
        booking_duration: differenceInMinutes(end, start),
      };

      // Backend connection
      const url = `${process.env.REACT_APP_HIVEPATH_UTIL_API_URL}/slotPlan`;

      authFetch(url, schema)
        .then((json) => {
          console.log(json);
          if (json.status === "success") {
            const user_id = USER_ID;
            fetchCalendarView(user_id, emails).then((items) => {
              dispatch(setSlots(items));
            });

            // return enqueueSnackbar(json?.message, {
            //   variant: "success",
            // });
          } else {
            return enqueueSnackbar(json?.message, {
              variant: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DragAndDropCalendar
        ref={calendarRef}
        localizer={localizer}
        selectable
        resizable
        formats={formats}
        popup={true}
        // dayPropGetter={customDayPropGetter}
        // slotPropGetter={customSlotPropGetter}
        onSelectSlot={handleSelect}
        // onEventDrop={moveEvent}
        // onEventResize={resizeEvent}
        onSelectEvent={handleEventSelect}
        events={myEvents}
        views={{ week: true }}
        step={30}
        drilldownView={"week"}
        // min={new Date(today.getFullYear(), today.getMonth(), today.getDay(), 8)}
        // max={
        //   new Date(today.getFullYear(), today.getMonth(), today.getDay(), 20)
        // }
        // timeslots={10}
        showMultiDayTimes
        scrollToTime={new Date(scrollToTime)}
        // dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
        // onDropFromOutside={onDropFromOutside}
        // handleDragStart={handleDragStart}
        // date={new Date(Date.now())}
        components={{
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
                <span className="rbc-label" style={{ paddingTop: "4px" }}>
                  {"Date"}
                </span>
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
        style={{ height: 800 }}
        // scrollToTime={new Date(1970, 1, 1, 6)}
        // defaultDate={new Date(2015, 3, 12)}
        // defaultDate={new Date(2021, 17, 7)}
      />

      <CreateEventPopUp
        // event={myNewEvent}

        handleClose={handleModalClose}
        open={open}
      />
    </div>
  );
};

export default SlotPlannerMonthView;
