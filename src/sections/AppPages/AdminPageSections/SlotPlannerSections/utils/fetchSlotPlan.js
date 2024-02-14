import authFetch from "utils/authFetch";
import mapAvailableSlots from "utils/mapAvailableSlots";

export default function fetchSlotPlan(user_id = "") {
  const url = `${process.env.REACT_APP_HIVEPATH_UTIL_API_URL}/fetchSlotPlan`;

  const data = {
    user_id: user_id,
    type: "one-one",
  };

  const slotPlans = authFetch(url, data)
    .then((json) => {
      if (json.status === "success") {
        const getSlots = mapAvailableSlots(json?.result.slot_data?.slot_plan);
        // console.log("getSlots from the api now", getSlots);
        // dispatch(setSlots(getSlots));
        return getSlots;
      }
      console.log("json", json);
      return json?.result.slot_data?.slot_plan;
    })
    .catch((err) => console.log(err));

  return slotPlans;
}
