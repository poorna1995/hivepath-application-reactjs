import React from "react";
import {
  Button,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
  bindHover,
} from "material-ui-popup-state/hooks";
import { FaCalendarAlt } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import EditEvent from "./Events/EditEvent";
import {
  fetchSlotsStart,
  setSlots,
} from "store/calendarSlots/calendarSlotsSlice";
import fetchSlotPlan from "../utils/fetchSlotPlan";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { format } from "date-fns";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  hoverText: {
    position: "absolute",
    top: "-5px",
    left: "-5px",
    width: "140px",
    display: "inline",
    paddingLeft: "5px",
    paddingBottom: "10px",
    paddingTop: "5px",
    opacity: 0,
    "&:hover": {
      display: "flex",
      opacity: 1,
      background: "white",
    },
  },
  title: {
    display: "flex",
  },
  titleBox: {
    width: "100%",
    position: "relative",
  },
}));

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SPWeekEvent = (props) => {
  const classes = useStyles();
  const {
    event,
    slotStart,
    slotEnd,
    title,
    isAllDay,
    continuesPrior,
    continuesAfter,
  } = props;
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [modalOpen, setModalOpen] = React.useState(false);

  const dispatch = useDispatch();

  const enqueueSnackbar = useEnquequeSnackbar();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover-preferences",
  });

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleRemoveEvent = (e) => {
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
        fetchSlotPlan(user_id).then((json) => {
          console.log("json", json);
          dispatch(setSlots(json));
        });
        // dispatch(fetchSlotsStart)
        //  dispatch(fetchSlotsStart(json?.result.slot_data?.one-one.slot_plan));

        enqueueSnackbar("Deleted Event!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Error in deletion", {
          variant: "error",
        });
      }
      console.log(json);
    });
  };
  const eventStartFormattedTime = event.start && format(event.start, "hh:mmaaa");
  const eventEndFormatTime = event.end && format(event.end, "hh:mmaaa");
  return (
    <div className={classes.root}>
      <div
        style={{ width: "100%" }}
        //  {...bindTrigger(popupState)}
      >
        {/* {event.title} */}
        {event?.source_type === "google" ? (
          <div>
            <span style={{ fontSize: "10px" }}>Google</span>
            <br />
            <span>{event?.title}</span>
            <br />
            <span
              style={{
                fontSize: "10px",
              }}
            >
              {eventStartFormattedTime}-{eventEndFormatTime}
            </span>
          </div>
        ) : (
          <>
            {event.availability === true ? (
              <div className={classes.titleBox}>
                <span className={"rbc-event-title"}>
                  {(event.title && event?.title) || "Available"}
                  <br />
                  <span style={{ fontSize: "10px", fontWeight: "400" }}>
                    {eventStartFormattedTime}-{eventEndFormatTime}
                  </span>
                </span>
                <span className={"rbc-mark-busy"}> Mark As Busy</span>
              </div>
            ) : (
              <div className={classes.titleBox} {...bindHover(popupState)}>
                <span className={"rbc-event-title"}>{event?.title}</span>
                <span
                  className={"rbc-mark-busy"}
                  style={{ padding: "5px", paddingTop: "10px" }}
                >
                  Mark As Available
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <div>
        <HoverPopover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
          }}
        >
          <div>
            <div style={{ padding: "8px", textTransform: "capitalize" }}>
              <Typography>{event?.title}</Typography>
              {event && (
                <Typography>
                  {event.start.toString()}- {event.end.toString()}
                </Typography>
              )}
            </div>
          </div>
        </HoverPopover>

        {/* <EditEvent
          event={event}
          handleClose={handleModalClose}
          open={modalOpen}
        /> */}
        {/* <SPCustomPopUp
          event={event}
          handleOpen={handleModalOpen}
          handleClose={handleModalClose}
          open={modalOpen}
        />  */}
      </div>
    </div>
  );
};

export default SPWeekEvent;
