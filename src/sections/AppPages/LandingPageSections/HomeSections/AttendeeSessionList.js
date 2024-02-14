import "./styles.css";
import UpcomingSessionAttendeeCard from "./Components/UpcomingSessionAttendeeCard";
import { Container, Grid, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchUpcomingHostSessions } from "../utils/homeService";
import { useState } from "react";
import OfferingSkeletonCard from "components/SkeletonComponents/OfferingSkeletonCard";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const AttendeeSessionList = ({ title, row, container }) => {
  const { currentUser } = useSelector(mapState);
  const [sessionList, setSessionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchSessions = () => {
    setLoading(true);
    const requestData = { user_id: currentUser.user_id, view_type: "attendee" };
    fetchUpcomingHostSessions(requestData)
      .then((res) => {
        setSessionList(res.result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const filteredSessions = sessionList.filter((item) => {
    if (item.session_data === undefined) return null;
    if (!item?.session_data?.title) return null;
    return item;
  });
  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      mt={1}
      mb={!loading && sessionList.length > 0 ? 4 : 0}
    >
      {loading && (
        <div className="scrollRow">
          {[0, 1, 2, 3].map((item) => (
            <OfferingSkeletonCard key={item} />
          ))}
        </div>
      )}

      {!loading && filteredSessions.length > 0 && (
        <>
          <Grid item xs={12} md={12}>
            <Typography
              variant="subtitle"
              fontWeight="800"
              style={{ fontSize: "26px" }}
            >
              Upcoming Sessions - Attendee
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="scrollRow">
              {filteredSessions?.map((item, index) => {
                return (
                  <UpcomingSessionAttendeeCard
                    data={item}
                    key={"attendeeCard" + index}
                  />
                );
              })}
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AttendeeSessionList;
