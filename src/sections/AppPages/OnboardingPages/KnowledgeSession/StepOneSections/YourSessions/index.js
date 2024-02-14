import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Skeleton,
  LinearProgress,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import TableHeader from "./TableHeader";
import SessionCard from "./SessionCard";
import noItemsPlaceholder from "assets/images/onboarding-pages/knowledge-session/no-items-in-session.png";
import { fetchAllSessionsList } from "store/knowledge-sessions/knowledgeSessionsSlice";
import fetchMySessions from "../../utils/fetchMySessions";
import Progress from "components/Common/ProgressBar";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { ReactComponent as PlusIcon } from "assets/svg/onboarding-pages/knowledge-session/plus-icon.svg";
import AddNewSessionModal from "./AddNewSessionModal";
import noOffering from "assets/svg/all/new-icons/empty-states/onboarding/no-offering.svg";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";

const mapState = ({ user, sessions }) => ({
  currentUser: user.currentUser,
  mySessions: sessions.mySessions,
});
const YourSessions = ({ md }) => {
  const { currentUser, mySessions } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const [sessionList, setSessionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const mysessionsList = sessionList.map((item) => item);

  const handleAddNewSessionModal = () => {
    setModalOpen(true);
  };
  const handelAddNewSessionModalClose = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    setLoading(true);
    const url = "https://auth.hivepath.io/api/fetchUserOffering";
    const data = {
      user_id: USER_ID,
    };
    fetchMySessions(data).then((json) => {
      if (json.status === "success") {
        setLoading(false);

        console.log(json.result);
        dispatch(fetchAllSessionsList(json?.result));
        // setSessionList(json.result);
      }
    });
  }, []);

  return (
    <div style={{ height: "inherit" }}>
      <Paper
        style={
          md
            ? {
                paddingTop: "32px",
                boxShadow: "none",
                borderRadius: "20px",
                background: "transparent",
              }
            : {
                // maxHeight: "500px",
                paddingTop: "32px",
                boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.06)",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.4)",
                border: "2px solid #FFFFFF",
                height: "inherit",
              }
        }
      >
        {loading ? (
          <>
            {!md && (
              <Typography
                style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  // textAlign: "center",
                  paddingLeft: "16px",
                  lineHeight: "32px",
                  paddingBottom: "16px",
                }}
              >
                Your Sessions <br />
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(97,97,97,1)",
                    fontWeight: 500,
                  }}
                >
                  {" "}
                  Add at least 4 sessions to continue
                </span>
              </Typography>
            )}
            <LinearProgress
              variant="indeterminate"
              width="100%"
              height="100px"
            />
            <Skeleton height="100px" animation="wave" />
            <Skeleton height="100px" animation="wave" />
            <Skeleton height="100px" animation="wave" />
          </>
        ) : (
          <>
            {mySessions?.length === 0 ? (
              <BaseEmptyStateComponent
                imgSrc={noOffering}
                message={`No session created`}
                customComponent={
                  <OutlinedButton
                    title="Add Session"
                    onClick={handleAddNewSessionModal}
                    style={{
                      width: "auto",
                      color: "black",
                      marginTop: "32px",
                      border: "2px solid #484A9E",
                    }}
                    startIcon={<PlusIcon />}
                  />
                }
              />
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "8px",
                  }}
                >
                  {!md && (
                    <Typography
                      style={{
                        fontSize: "26px",
                        fontWeight: 700,
                        // textAlign: "center",
                        lineHeight: "32px",
                      }}
                    >
                      Your Sessions <br />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(97,97,97,1)",
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        Add at least 4 sessions to continue
                      </span>
                    </Typography>
                  )}{" "}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={handleAddNewSessionModal}
                  >
                    <IconButton
                      style={{ border: "1px solid rgba(72, 74, 158, 1)" }}
                    >
                      <PlusIcon />
                    </IconButton>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        marginLeft: "8px",
                        letterSpacing: "-3%",
                      }}
                    >
                      Add session
                    </span>
                  </div>
                  {/* <OutlinedButton
                    title="Add session"
                    onClick={handleAddNewSessionModal}
                    startIcon={<PlusIcon />}
                    style={{ width: "auto", color: "black", 

                  
                  }}
              
                  /> */}
                </div>
                {md && (
                  <Grid container>
                    {mySessions.map((item) => {
                      return (
                        <Grid item xs={12} md={md}>
                          <SessionCard
                            key={item.session_id}
                            data={item}
                            loading={loading}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                )}{" "}
                {!md && (
                  <div
                    className={"suggested-session-list"}
                    style={{
                      overflowY: "scroll",
                      maxHeight: "55vh",
                      // height:'50vh'
                      // minHeight: "350px",
                    }}
                  >
                    {mySessions.map((item) => {
                      return (
                        <SessionCard
                          key={item.session_id}
                          data={item}
                          loading={loading}
                        />
                      );
                    })}
                  </div>
                )}{" "}
              </div>
            )}
          </>
        )}
      </Paper>
      <AddNewSessionModal
        open={modalOpen}
        handleClose={handelAddNewSessionModalClose}
      />
    </div>
  );
};

export default YourSessions;
