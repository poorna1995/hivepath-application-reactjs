import React from "react";
import { Button, ListItem, ListItemText, Popover } from "@mui/material";
import SPCustomPopUp from "./SPCustomPopUpDialog";

import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { FaCalendarAlt } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

const SPMonthEvent = (props) => {
  // const [open, setOpen] = React.useState(false);

  const {
    event,
    className,
    selected,
    showAsAllDay,
    continuesAfter,
    continuesPrior,
  } = props;
  const [modalOpen, setModalOpen] = React.useState(false);
  const [startValue, setStartValue] = React.useState(event.start);
  const [endValue, setEndValue] = useState(event.end);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div
    // aria-describedby={id}
    // onClick={handleClick}
    >
      <div {...bindTrigger(popupState)}>
        {event?.type === "google" ? (
          <>
            <span style={{ background: "red" }}>{event.title}</span>
          </>
        ) : (
          <>
            {/* {`${timeRangeFormat({ start: event.start, end: event.end })}`} */}
            {/* {`${event?.start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}  - ${event?.end.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} `} */}

            {event.title}
          </>
        )}
      </div>

      <div>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div>
            <div style={{ padding: "8px", textTransform: "capitalize" }}>
              <ListItem
                component={Button}
                style={{ textTransform: "capitalize", color: "black" }}
                startIcon={<FaCalendarAlt />}
                onClick={handleModalOpen}
              >
                <ListItemText primary="Edit Time" />
              </ListItem>
              <ListItem
                component={Button}
                style={{ textTransform: "capitalize", color: "black" }}
                startIcon={<FaCalendarAlt />}
              >
                <ListItemText primary="Edit Dates" />
              </ListItem>
              <ListItem
                component={Button}
                style={{ textTransform: "capitalize", color: "black" }}
                startIcon={<MdRefresh />}
              >
                <ListItemText primary="Edit All Saturdays" />
              </ListItem>
              <ListItem
                component={Button}
                style={{ textTransform: "capitalize", color: "black" }}
                startIcon={<MdRefresh />}
              >
                <ListItemText primary="Reset time" />
              </ListItem>
            </div>

            {/*               
              <Typography>Title:{event.title}<br />
              
              {event.id}
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} sx={{ paddingTop: "16px" }}>
                  <MobileTimePicker
                    label="Add start time"
                    value={startValue}
                    onChange={(newValue) => {
                      setStartValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <MobileTimePicker
                    label="Add End time"
                    value={endValue}
                    onChange={(newValue) => {
                      setEndValue(newValue);
                    }}
                    // shouldDisableTime={(timeValue, clockType) => {
                    //   if (!error) {
                    //     return true;
                    //   }

                    //   return false;
                    // }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div style={{ display: "flex", padding: "8px" }}>
              <PrimaryButton
                title="Save"
                onClick={updateSlot}
                style={{ marginRight: "4px" }}
              ></PrimaryButton>
              <OutlinedButton title="Delete"></OutlinedButton>
            </div> */}
          </div>
        </Popover>

        {/* <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{
            zIndex: "32",
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
              
            >
              <Paper 
          >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                  className="rbc-overlay"
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleModalOpen}>Edit Time</MenuItem>
                    <MenuItem onClick={handleClose}>{event.id}</MenuItem>
                    <MenuItem onClick={handleClose}>{event.desc}</MenuItem>
                    
                    <MenuItem onClick={handleClose}>Reset Time</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper> */}
        <SPCustomPopUp
          event={event}
          handleOpen={handleModalOpen}
          handleClose={handleModalClose}
          open={modalOpen}
        />
      </div>
    </div>
  );
};

export default SPMonthEvent;
