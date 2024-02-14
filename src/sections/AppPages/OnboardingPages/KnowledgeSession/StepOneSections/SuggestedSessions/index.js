import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Paper,
  Typography,
  Skeleton,
  LinearProgress,
} from "@mui/material";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SuggestedSessionList from "./SuggestedSessionList";
import SuggestedSessionsTabs from "./SuggestedSessionsTabs";

const SuggestedSessions = () => {
  const [sessions, setSessions] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setLoading(true);
    const url = KNOWLEDGE_SESSIONS_SERVICES.FETCH_SESSION_SUGGESTIONS;
    fetch(url, {
      method: "GET",
      // body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setSessions(json?.result);
          setLoading(false);
        }
        // console.log("json", json);
      })
      .catch((err) => console.log(err));
  }, []);

  const objectArray = Object?.entries(sessions).map((item) => {
    const title = item[0];
    const data = item[1];

    return {
      title,
      data,
    };
  });

  // console.log(objectArray);

  return (
    <div style={{ height: "inherit" }}>
      <Paper
        style={{
          paddingTop: "32px",
          // height: "800px",
          boxShadow: " 0px 0px 50px rgba(72, 74, 158, 0.04)",
          // minHeight: "600px",
          border: "2px solid #FFFFFF",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.4)",
          height: "inherit",
        }}
      >
        <Typography
          style={{
            fontSize: "26px",
            fontWeight: "700",
            paddingLeft: "16px",
            paddingBottom: "8px",
            // textAlign: "center",
          }}
        >
          Suggested Sessions
        </Typography>
        <Divider />
        <div style={{ paddingTop: "16px", paddingBottom: "32px" }}>
          {loading ? (
            <div>
              <Skeleton height="50px" animation="wave" />

              <Skeleton height="50px" animation="wave" />
              <Skeleton height="50px" animation="wave" />

              <Skeleton height="50px" animation="wave" />
            </div>
          ) : (
            <>
              <SuggestedSessionsTabs alldata={objectArray} />
            </>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default SuggestedSessions;
