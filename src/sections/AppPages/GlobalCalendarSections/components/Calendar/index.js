import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import React, { useEffect, useState } from "react";
import CreateEventPopUp from "sections/AppPages/AdminPageSections/SlotPlannerSections/SPComponents/Events/CreateEventPopUp";
import DeleteEventPopup from "sections/AppPages/AdminPageSections/SlotPlannerSections/SPComponents/Events/DeleteEventPopup";
import SPCustomToolbar from "sections/AppPages/AdminPageSections/SlotPlannerSections/SPComponents/SPCustomToolbar";
import SPCustomWeekHeader from "sections/AppPages/AdminPageSections/SlotPlannerSections/SPComponents/SPCustomWeekHeader";
import { CALENDAR_SERVICES, SCHEDULE_SERVICES } from "constants/API_URLS";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import getDay from "date-fns/getDay";
import fetchCalendarView from "sections/AppPages/AdminPageSections/SlotPlannerSections/utils/fetchCalendarView";
import {
  setAttendeeSessions,
  setHostSessions,
  setSlot,
  setSlots,
} from "store/calendarSlots/calendarSlotsSlice";
import changeTimezone from "utils/changeTimeZone";
import authFetch from "utils/authFetch";
import { zonedTimeToUtc } from "date-fns-tz";
import { useDispatch, useSelector } from "react-redux";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import { setCalendarSyncedEmails } from "store/User/user.actions";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchAttendeeSessionsStart,
  fetchHostSessionsStart,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import { setSectionLoading } from "store/loaders/loadersSlice";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import SPWeekEvent from "components/HivepathCalendarUI/SPComponents/SPWeekEvent";
import ShowTipsDrawer from "components/Common/Drawers/ShowTipsDrawer";
import GlobalCalendarEventDetails from "../CalendarEventDetails";
import SuggestionDrawer from "components/Common/Drawers/SuggestionDrawer";
import lodash from "lodash";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

let currentDate = new Date();

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(currentDate, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const mapState = ({
  user,
  slotsData,
  calendarSlots,
  view,
  sessions,
  loaders,
}) => ({
  currentUser: user.currentUser,
  slots: calendarSlots?.slots,
  slot: calendarSlots.slot,
  syncedEmailsFetch: user.syncedEmailsFetch,
  calendarTimezone: slotsData.timezone,
  syncedEmails: user.calendar_synced_emails,
  user: user,
  viewType: view.userType,
  allSessions: sessions,
  loading: loaders.sectionLoader,
  calendarViewTypes: view.calendarViewTypes,
  calendarSlots: calendarSlots,
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

const GlobalCalendarView = ({ calendarHeight, style, containerStyles }) => {
  const calendarRef = React.createRef();

  const {
    currentUser,
    slots,
    syncedEmailsFetch,
    calendarTimezone,
    syncedEmails,
    allSessions,
    calendarSlots,
    loading,
    slot,
    user,
    viewType,
    calendarViewTypes,
  } = useSelector(mapState);
  const [openCreateEventPopUp, setOpenCreateEventPopUp] = useState(false);
  const [eventData, setEventData] = useState({});
  const hostSessions = calendarSlots.hostSessions;
  const attendeeSessions = calendarSlots.attendeeSessions;
  const KNOWLEDGE_SESSION_ONBOARDING_DONE =
    currentUser.knowledge_session_onboarding_done;

  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const USER_ID = currentUser.user_id;
  const today = new Date();

  let scrollToTime =
    today.getHours() > 4 ? today.getHours() - 2 : today.getHours();
  // console.log({ scrollToTime });
  const currentHours = today.getHours();
  // console.log({ currentHours });
  const showTimezone = format(today, "xxxxx");
  // console.log(showTimezone);
  const dispatch = useDispatch();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
    dispatch(setSectionLoading(false));
  };
  const handleCloseCreateEventPopup = () => {
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
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const enqueueSnackbar = useEnqueueSnackbar();

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

    // if (event.approval_status === "approved") {
    //   let style = {
    //     background: "#EDFBF4",
    //     border: "1px solid rgba(73, 217, 148, 0.7)",

    //     borderLeft: "5px solid rgba(73, 217, 148, 0.7)",
    //   };
    //   return { style };
    // }
    if (event.i_am === "host") {
      let style = {
        background: "#FFF4E8",
        border: "1px solid #F19D3A",
        borderLeft: "5px solid #F19D3A",
      };
      return { style };
    }
    if (event.i_am === "attendee") {
      let style = {
        background: "#ECECFF",
        border: "1px solid #7979F0",
        borderLeft: "5px solid #7979F0",
      };
      return { style };
    }
  };

  const fetchSlots = () => {
    setOpenBackdrop(true);
    dispatch(setSectionLoading(true));
    fetchCalendarView(USER_ID, syncedEmailsFetch).then((json) => {
      if (json) {
        handleCloseBackdrop();
        return dispatch(setSlots(json));
      }
    });
  };
  useEffect(() => {
    fetchSlots();
    fetchEmails();
  }, [syncedEmailsFetch]);

  const colors = [
    {
      id: "0",
      color: "#ECF5FF",
      border: "#58BCF4",
    },
    {
      id: "1",
      color: "#FFF7DB",
      border: "#EFCD56",
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
      slots
        .map((slot) => {
          const { start, end, email, title } = slot;

          const startTime = changeTimezone(start, enUS, calendarTimezone);
          const endTime = changeTimezone(end, enUS, calendarTimezone);

          const color = arr3?.filter((arrItem) => {
            if (arrItem.email === email) return arrItem.color;
            return null;
          });
          const getcolor = color[0]?.color || "";
          const getBorder = color[0]?.border || "";
          return {
            color: getcolor,
            border: getBorder,
            start: new Date(startTime),
            end: new Date(endTime),
            // title: "Available",
            ...slot,
          };
        })
        .filter((item) => {
          const { source_type, availability } = item;
          if (availability === false && source_type === "hivepath") return null;
          return item;
        })) ||
    [];

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

  const handleEventSelect = (event) => {
    console.log({ event });
    if (event.booking_id) {
      handleOpenDrawer();
      setEventData(event);
      return null;
    }
    if (event.availability === false) return null;
    handleRemoveModalOpen();
    setEventData(event);
  };

  const handleSelect = ({ start, end }) => {
    const currentDate = new Date();
    const startTime = zonedTimeToUtc(start, calendarTimezone);
    const endTime = zonedTimeToUtc(end, calendarTimezone);
    if (start < currentDate) {
      return null;
    }

    handleOpenPopup();
    // console.log(calendarTimezone);
    dispatch(setSlot({ start, end }));

    // console.log(start, end);
    // console.log("startTime, endTime", startTime, endTime);
  };

  const ATTENDEE = "attendee";
  const HOST = "host";

  const isHostView = viewType === HOST;
  const location = useLocation();
  const pathname = location.pathname;

  // const hostSessions = allSessions.hostSessions;
  // const attendeeSessions = allSessions.attendeeSessions;
  const history = useHistory();
  // const mySessions = isHostView ? hostSessions : attendeeSessions;

  const url = SCHEDULE_SERVICES.FETCH_HOST_AND_ATTENDEE_SESSIONS;

  const convertedSessions = (data = [], isHostView = false) => {
    const sessions =
      (Array.isArray(data) &&
        data.length > 0 &&
        data
          .map((item) => {
            const {
              attendee_view,
              host_view,
              from_date,
              from_time,
              to_date,
              to_time,
              host_data,
              attendee_data,
            } = item;

            const eventBeginTime = getTimeBasedOnTimezone(
              from_date,
              from_time,
              calendarTimezone
            );
            const eventFinishTime = getTimeBasedOnTimezone(
              to_date,
              to_time,
              calendarTimezone
            );
            const formattedStartTime = format(
              eventBeginTime,
              "eee, MMM dd, yyyy"
            );

            const timestamp = new Date();

            // const getCurrentTimeStatus = () => {
            //   if (timestamp > fromTime && timestamp < toTime) return true;
            //   return false;
            // };
            // const myTime = getCurrentTimeStatus();

            return {
              start: eventBeginTime,
              end: eventFinishTime,
              formattedDate: formattedStartTime,
              session_status: isHostView === true ? host_view : attendee_view,
              userData: isHostView === true ? attendee_data : host_data,
              i_am: isHostView === true ? "host" : "attendee",

              ...item,
            };
          })
          .filter((item) => {
            const sessionData = item?.session_data;
            const title = item?.session_data?.title;

            if (sessionData || title) return item;
            return null;
          })) ||
      [];
    return sessions;
  };

  const hostview = true;
  const hostCalendarSessions = convertedSessions(hostSessions, hostview);
  const attendeeCalendarSessions = convertedSessions(attendeeSessions);

  const isItemIncluded = (data, item) => {
    let result = Array.isArray(data) && data.length > 0 && data.includes(item);
    return result;
  };

  const showHosts = isItemIncluded(calendarViewTypes, "host");
  const showAttendees = isItemIncluded(calendarViewTypes, "attendee");
  const showAvailability = isItemIncluded(calendarViewTypes, "availability");
  const availabilitySlots = lodash.groupBy(dates, "source_type");
  // console.log({ availabilitySlots });
  const googleSlots = availabilitySlots.google || [];
  const hivepathSlots = availabilitySlots.hivepath || [];
  // console.log({ googleSlots, hivepathSlots });

  const onlyHosts = (showHosts && hostCalendarSessions) || [];
  const onlyAttendees = (showAttendees && attendeeCalendarSessions) || [];
  const onlyAvailability =
    (showAvailability && dates) || (!showAvailability && googleSlots) || [];

  useEffect(() => {
    const data = {
      user_id: USER_ID,
      // view_type: isHostView ? HOST : ATTENDEE,
    };

    dispatch(setSectionLoading(true));

    authFetch(url, data)
      .then((json) => {
        dispatch(setSectionLoading(false));

        if (json.status === "success") {
          dispatch(setAttendeeSessions(json.result.attendee));
          dispatch(setHostSessions(json.result.host));
        }
      })
      .catch((error) => {
        dispatch(setSectionLoading(false));

        console.error(error);
      });

    // dispatch(fetchHostSessionsStart({ url, hostData }));
    // dispatch(fetchAttendeeSessionsStart({ url, attendeeData }));
    // if (isHostView) {
    //   return dispatch(fetchHostSessionsStart({ url, data }));
    // } else {
    //   return dispatch(fetchAttendeeSessionsStart({ url, data }));
    // }
  }, [dispatch, USER_ID, url]);

  // console.log({
  //   onlyHosts,
  //   onlyAttendees,
  //   onlyAvailability,
  // });
  const allEventsAndSessions =
    [...onlyHosts, ...onlyAttendees, ...onlyAvailability] || [];
  // (showHosts &&
  //   showAttendees &&
  //   showAvailability && [
  //     ...hostCalendarSessions ,
  //     ...dates,
  //     ...attendeeCalendarSessions,
  //   ]) ||
  // [];

  // console.log({ allEventsAndSessions });
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
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventSelect}
        events={allEventsAndSessions || []}
        views={{ week: true }}
        step={30}
        drilldownView={"week"}
        showMultiDayTimes
        scrollToTime={scrollToTime}
        components={{
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
                    marginLeft: "-6px",
                  }}
                >
                  {/* {"Date"} */}
                  GMT
                  <br /> {showTimezone}
                </span>
              </div>
            );
          },
          toolbar: SPCustomToolbar,
        }}
        defaultView={"week"}
        style={{
          ...style,
          height:
            // "100%",
            calendarHeight ? calendarHeight : "68vh",
        }}
      />

      {KNOWLEDGE_SESSION_ONBOARDING_DONE && (
        <>
          <CreateEventPopUp
            open={openCreateEventPopUp}
            handleClose={handleCloseCreateEventPopup}
          />

          <DeleteEventPopup
            open={openRemoveModal}
            handleClose={handleRemoveModalClose}
            event={eventData}
          />
        </>
      )}
      {/* <LoadingBackdrop open={openBackdrop} handleClose={handleCloseBackdrop} /> */}

      <SuggestionDrawer
        closeDrawer={handleCloseDrawer}
        open={openDrawer}
        anchor="right"
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "400px",
          },
        }}
        // open
        component={
          <div style={{ paddingTop: "32px" }}>
            <GlobalCalendarEventDetails
              event={eventData}
              handleClose={handleCloseDrawer}
            />
          </div>
        }
      />
    </div>
  );
};

export default GlobalCalendarView;
