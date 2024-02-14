import React from "react";
import SessionListItem from "./SessionListItem";
import { CircularProgress, Typography, Divider } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { makeStyles } from "@mui/styles";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import { useHistory } from "react-router-dom";
import attendeeViewAllSessionsEmpty from "assets/svg/all/new-icons/empty-states/sessions-view/no-sessions.svg";

var lodash = require("lodash");
const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "scroll",
    maxHeight: "70vh",
  },

  itemList: {
    padding: "16px",
    [theme.breakpoints.down("sm")]: {
      padding: "4px",
    },
  },
  listItem: {
    // maxWidth: "100%",
  },
}));

const SessionList = ({ data, loading, hostView, isActionTab }) => {
  const classes = useStyles();
  const history = useHistory();

  const groupedSessions = lodash.groupBy(data, "formattedDate");
  // console.log({ groupedSessions });
  const groupedDateArray = Object.keys(groupedSessions).map((date) => ({
    date,
    value: groupedSessions[date],
  }));
  // console.log({ groupedDateArray });

  return (
    <div className={classes.root}>
      {loading ? (
        <div
          style={{
            height: "400px",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.itemList} style={{}}>
          {Array.isArray(groupedDateArray) && groupedDateArray.length > 0 ? (
            <div>
              {" "}
              {groupedDateArray.map((item) => {
                const { date, value } = item;

                return (
                  <div style={{ paddingBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        maxWidth: "75%",
                      }}
                    >
                      <Typography
                        fontWeight={`700`}
                        fontSize="24px"
                        color="primary.main"
                        width={"auto"}
                        flex={1}
                        sx={{
                          fontSize: {
                            md: "24px",
                            xs: "16px",
                          },
                        }}
                      >
                        {date}
                      </Typography>

                      <Divider
                        // style={{ width: "75%" }}
                        sx={{
                          width: {
                            md: "75%",
                            xs: "0%",
                          },
                        }}
                      />
                    </div>

                    <>
                      {value.map((item) => {
                        const bookingID = item?.booking_data?.booking_id;
                        const bookingData = item?.booking_data;
                        const sessionData = item?.session_data;
                        const userData = hostView
                          ? item?.attendee_data
                          : item?.host_data;

                        // console.log({
                        //   item,
                        // });

                        return (
                          <div className={classes.listItem}>
                            <SessionListItem
                              bookingID={bookingID}
                              bookingData={item}
                              sessionData={sessionData}
                              userData={userData}
                              isActionTab={isActionTab}
                            />
                          </div>
                        );
                      })}
                    </>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{ height: "70vh", display: "grid", placeItems: "center" }}
            >
              <BaseEmptyStateComponent
                imgSrc={attendeeViewAllSessionsEmpty}
                buttonTitle={"Explore"}
                onButtonClick={() => history.push("/explore")}
                message={
                  hostView
                    ? " Oops! looks like you've no more bookings."
                    : "You currently don't have any sessions scheduled!"
                }
                shortDescription={
                  hostView
                    ? "Create a new session instead?"
                    : "Let'shelp you find one!"
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionList;
const data = [1, 2, 3, 4];
