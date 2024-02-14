// const { default: authFetch } = require("utils/authFetch");

// const fetchEmails = (user_id) => {
//     // https://auth.hivepath.io/api/fetchSyncedCalendar
//     const url = CALENDAR_SERVICES.FETCH_SYNCED_CALENDAR;
//     const data = {
//       user_id
//     };

//     return new Promise((resolve,reject) => {
//         authFetch(url, data)
//         .then((json) => {
//           if (json.status === "success") {

//             dispatch(setCalendarSyncedEmails(json?.result));
//             dispatch(
//               setSyncedEmailsFetch(
//                 json.result.map((item) => {
//                   const { email } = item;
//                   return email;
//                 })
//               )
//             );
//           }
//           // console.log("json.external_calendar", json?.external_calendar);
//         })
//         .catch((error) => console.log(error));
//     })

//   };
