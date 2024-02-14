// import React from "react";
// import { Navigate } from "react-big-calendar";
// import * as dates from "date-arithmetic";
// import TimeGrid from "react-big-calendar/lib/TimeGrid";

// const CustomWeek = (props) => {
//   const today = new Date();
//   let {
//     date,
//     localizer,
//     min = localizer.startOf(
//       new Date(),

//       "day"
//     ),
//     max = localizer.endOf(new Date(), "day"),
//     scrollToTime = localizer.startOf(new Date(), "day"),
//   } = props;
//   let range = CustomWeek.range(date, { localizer });
//   return (
//     <TimeGrid
//       {...props}
//       range={range}
//       eventOffset={15}
//       localizer={localizer}
//       min={min}
//       max={max}
//       scrollToTime={scrollToTime}
//     />
//   );
// };

// export default CustomWeek;

// CustomWeek.range = (date, { localizer }) => {
//   let start = date;
//   let end = dates.add(start, 2, "day");

//   let current = start;
//   let range = [];

//   while (localizer.lte(current, end, "day")) {
//     range.push(current);
//     current = localizer.add(current, 1, "day");
//   }

//   return range;
// };

// CustomWeek.navigate = (date, action, { localizer }) => {
//   switch (action) {
//     case Navigate.PREVIOUS:
//       return localizer.add(date, -3, "day");

//     case Navigate.NEXT:
//       return localizer.add(date, 3, "day");

//     default:
//       return date;
//   }
// };

// CustomWeek.title = (date) => {
//   return `Week View ${date.toLocaleDateString()}`;
// };
