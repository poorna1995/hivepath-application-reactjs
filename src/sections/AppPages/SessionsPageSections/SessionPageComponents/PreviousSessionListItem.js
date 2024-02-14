import { Chip, Typography } from "@mui/material";
import ShortDateCard from "components/Common/Cards/ShortDateCard";
import React from "react";
import { ReactComponent as UserGroupIcon } from "assets/svg/sessions/user-group.svg";

const PreviousSessionListItem = ({ date, time, title, category }) => {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        paddingBottom: "16px",
        paddingTop: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: "1",
        }}
      >
        <div style={{ flex: 0.2, maxWidth: "60px" }}>
          <ShortDateCard date={date || "Oct 21 2021"} head="#FF5621" />
        </div>
        <div style={{ flex: 0.8 }}>
          <p
            style={{
              fontWeight: "600",
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.5)",
            }}
          >
            {time || "02:30PM - 03:30PM"}
          </p>
          <Typography
            style={{
              fontWeight: "700",
              fontSize: "21px",
              lineHeight: "25px",
              color: "rgba(0, 0, 0, 0.5)",
            }}
          >
            {title || " Cohesion Kickoff: Accelerating into the Future of Work"}
          </Typography>
        </div>
      </div>
      <div style={{ paddingTop: "16px" }}>
        <Chip
          icon={<UserGroupIcon />}
          style={{
            background:
              "linear-gradient(90.59deg, #F9F7C6 1.61%, #E8FCDB 99.75%)",
            fontWeight: 600,
            fontSize: "14px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginTop: "12px",
            // paddingTop: "10px",
            // paddingBottom: "10px",
            minHeight: "34px",
          }}
          label={category || "Personal Experience"}
        />
      </div>
    </div>
  );
};

export default PreviousSessionListItem;
