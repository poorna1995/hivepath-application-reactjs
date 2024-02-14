import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { SCHEDULE_SERVICES } from "constants/API_URLS";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { fetchHostBooking } from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const SessionPage = () => {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const history = useHistory();
  const { bookingID } = useParams();
  const { path, url } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fetchBookingUrl = SCHEDULE_SERVICES.FETCH_SCHEDULE_BOOKING;

  const fetchBookingDetails = (bookingID) => {
    setIsLoading(true);
    const data = {
      booking_id: bookingID,
    };
    authFetch(fetchBookingUrl, data).then((json) => {
      console.log("bookingDetails", json);
      const sessionID = json.result[0].session_id;
      const ownerID = json.result[0].session_owner;

      const requesterID = json.result[0].requested_by;

      if (ownerID === USER_ID) {
        return history.push(`${url}/host`);
      }
      if (USER_ID === requesterID) {
        return history.push(`${url}/attendee`);
      }
      if (USER_ID !== requesterID && USER_ID !== ownerID) {
        return history.push("/");
      }
      dispatch(fetchHostBooking(json.result[0]));

      setIsLoading(false);
      console.log(sessionID);
    });
  };

  useEffect(() => {
    const url = bookingID;
    // const url = window.location.href.split("/sessions/")[1];

    fetchBookingDetails(url);
  }, [url]);
  return (
    <div>
      <LoadingBackdrop
        open={isLoading}
        handleClose={() => setIsLoading(false)}
      />
    </div>
  );
};

export default SessionPage;
