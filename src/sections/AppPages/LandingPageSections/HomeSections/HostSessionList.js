import "./styles.css";
import { Container, Grid, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UpcomingSessionHostCard from "./Components/UpcomingSessionHostCard";

import { fetchUpcomingHostSessions } from "../utils/homeService";
import OfferingSkeletonCard from "components/SkeletonComponents/OfferingSkeletonCard";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const HostSessionList = ({ title, row, container }) => {
  const { currentUser } = useSelector(mapState);
  const data = UserProfilesListData;
  const [sessionList, setSessionList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSessions = () => {
    setLoading(true);
    const requestData = { user_id: currentUser.user_id, view_type: "host" };
    fetchUpcomingHostSessions(requestData).then((res) => {
      setSessionList(res.result || []);
      setLoading(false);
    });
  };
  const filteredSessions = sessionList.filter((item) => {
    if (!item.session_data.title) return null;
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
              Upcoming Sessions - Host
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="row">
              {filteredSessions?.map((item, index) => {
                return (
                  <UpcomingSessionHostCard
                    data={item}
                    key={`hostCard` + index}
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

export default HostSessionList;

const UserProfilesListData = [
  {
    // imgUrl: img1,
    id: 1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 2,
    // imgUrl: img2,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 3,
    // imgUrl: img3,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 4,
    // imgUrl: img4,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 5,
    // imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 6,
    // imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 7,
    // imgUrl: img2,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 8,
    // imgUrl: img3,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 9,
    // imgUrl: img4,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 10,
    // imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 11,
    // imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 12,
    // imgUrl: img2,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 13,
    // imgUrl: img3,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 14,
    // imgUrl: img4,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 15,
    // imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
];
