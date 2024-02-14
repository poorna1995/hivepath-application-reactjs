import authFetch from "utils/authFetch";
import mapAvailableSlots from "utils/mapAvailableSlots";

export default function fetchCalendarView(user_id = "", email = []) {
  // const url = `${process.env.REACT_APP_HIVEPATH_UTIL_API_URL}/fetchCalendarView`;
  const url = "https://calendar.hivepath.io/api/fetchCalendarView";
  const data = {
    user_id: user_id,
    email: email,
  };

  const slotPlans = authFetch(url, data)
    .then((json) => {
      if (json.status === "success") {
        const getSlots = mapAvailableSlots(json?.result);
        // console.log("getSlots from the api now", getSlots);
        // dispatch(setSlots(getSlots));

        // function for filtering the result to show events after the current date only
        const result =
          getSlots &&
          getSlots.filter((slot) => {
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

            const currentDate = new Date();

            if (start < currentDate || end < currentDate) return null;

            return {
              start: new Date(start),
              end: new Date(end),
              // start,
              // end,
              title,
              booking_id,
              time_availability,
              object_id,
              session_id,
              source_type,
              timezone,
              date,
              ...slot,
            };
          });

        //         You4:48 PM
        // new Date('2021 10 30 05:30 AM ')
        // You4:49 PM
        // new Date('2021 ,10 ,30 05:30 AM ')
        // You4:51 PM
        // new Date('2021, 10 ,30, 05,30')
        // You4:52 PM
        // new Date(2020, 09, 26, 11, 12, 29)
        // You4:54 PM
        // new Date("10/26/2020 12:29")
        // new Date("10/26/2020 12:29 AM")

        return result;
      }
      // console.log("json", json);
      // return json?.result?.slot_plan;
    })
    .catch((err) => console.log(err));

  // console.log("slotPlans", slotPlans);
  return slotPlans;
}
