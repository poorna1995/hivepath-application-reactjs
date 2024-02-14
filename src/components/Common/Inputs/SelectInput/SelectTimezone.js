import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  TextField,
  Menu,
} from "@mui/material";
import React, { Fragment } from "react";
import { MdAccountCircle } from "react-icons/md";
import { ReactComponent as Globe } from "assets/svg/admin-icons/globe.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCalendarTimezone } from "store/slots/slots.actions";
import timezones from "timezones-list";

import Select, { components } from "react-select";
import { Box } from "@mui/system";

const mapState = ({ slotsData }) => ({
  calendarTimezone: slotsData.timezone,
});

const customStyles = {
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    ":hover": {
      borderColor: "black",
    },
  }),
  // option: (base) => ({
  //   ...base,
  //   // border: `1px dotted ${colourOptions[2].color}`,
  //   height: "100%",
  //   zIndex: "100",
  //   background: "white",
  // }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};

const removeUnderscore = function (str = "") {
  return str.replace(/[_]/gi, " ");
};

const SelectTimezone = ({ ...props }) => {
  const { calendarTimezone } = useSelector(mapState);

  const [timezone, setTimezone] = React.useState(
    calendarTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  // console.log(calendarTimezone);
  useEffect(() => {
    if (calendarTimezone) return setTimezone(calendarTimezone);
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, [calendarTimezone]);

  const initialTimezoneValue = {
    label: removeUnderscore(calendarTimezone),
    value: calendarTimezone,
  };
  // console.log(initialTimezoneValue);
  const [timezoneValue, setTimezoneValue] =
    React.useState(initialTimezoneValue);

  const ref = React.createRef();

  const dispatch = useDispatch();

  const handleChange = (event) => {
    // console.log("event in input", event);
    setTimezoneValue(event);
    setTimezone(event.value);
  };

  const options = timezones
    .map((item) => {
      const { label, name, tzCode, utc } = item;
      return {
        label: removeUnderscore(tzCode),
        value: tzCode,
        name: name,
        utc: utc,
      };
    })
    .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

  useEffect(() => {
    dispatch(setCalendarTimezone(timezone));
  }, [timezone, dispatch]);

  return (
    <div style={{ zIndex: "100" }}>
      <Select
        {...props}
        ref={ref}
        value={initialTimezoneValue}
        onChange={handleChange}
        styles={customStyles}
        closeMenuOnSelect
        options={options}
        placeholder="Select Timezone"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#484A9E",
          },
          borderColor: theme.primary,
        })}
      />
    </div>
  );
};

export default SelectTimezone;
// let options = [
//   {
//     value: "America/New_York",
//     label: "America/New_York",
//   },
//   {
//     value: "Europe/Paris",
//     label: "Europe/Paris",
//   },
//   {
//     value: "Asia/Calcutta",
//     label: "Asia/Calcutta",
//   },
//   {
//     label: "Asia/Kolkata",
//     value: "Asia/Kolkata",
//   },
// ];
