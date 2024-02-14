import { CircularProgress, Grid, Typography } from "@mui/material";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import PaperBase from "components/Common/PaperBase/PaperBase";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import MyUserCard from "./MyUserCard";

import attendeeViewNoHosts from "assets/svg/all/new-icons/empty-states/sessions-view/no-hosts.svg";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const KSHostViewMyAttendee = () => {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [myAttendees, setMyAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const url = "https://auth.hivepath.io/api/fetchMyAttendees";
    // https://auth.hivepath.io/api/fetchMyHosts
    const data = { user_id: USER_ID, category: "", type: "" };

    authFetch(url, data)
      .then((json) => {
        setLoading(false);
        setMyAttendees(json.result);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(myAttendees);
  return (
    <PaperBase>
      <Typography fontWeight="700" fontSize="28px">
        My Attendee
      </Typography>

      {loading ? (
        <div style={{ display: "grid", placeItems: "center", height: "300px" }}>
          <CircularProgress style={{ margin: "64px" }} />
        </div>
      ) : (
        <>
          {myAttendees.length > 0 ? (
            <Grid container>
              {myAttendees.map((item) => (
                <Grid item xs={6}>
                  <MyUserCard data={item} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div
              style={{
                height: "80vh",
                display: "grid",
                placeItems: "center",
              }}
            >
              <BaseEmptyStateComponent
                imgSrc={attendeeViewNoHosts}
                message={`There are currently no Attendees that you've interacted with.
          `}
                shortDescription={` Create new sessions to interact more`}
                buttonTitle={`Create`}
              />
            </div>
          )}
        </>
      )}
    </PaperBase>
  );
};

export default KSHostViewMyAttendee;
