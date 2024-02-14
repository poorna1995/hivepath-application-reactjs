import { Avatar, Chip, Grid, Paper, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/styles";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import ShortDateCard from "components/Common/Cards/ShortDateCard";
import HivepathImage from "components/Common/HivepathImage";
import GradientText from "components/Common/Typography/GradientText";
import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import AttendeeSessionList from "sections/AppPages/LandingPageSections/HomeSections/AttendeeSessionList";
import getParsedDayTime from "utils/formatDateFn";
import AttendeeSesssionListItem from "../../NewKnowledgeSessionsPageSections/SessionsListView/AttendeeSesssionListItem";
import HostSessionListItem from "../../NewKnowledgeSessionsPageSections/SessionsListView/HostSessionListItem";

const mapState = ({ view, user, slotsData }) => ({
  viewType: view.userType,
  currentUser: user.currentUser,
  timezone: slotsData.timezone,
});
const SessionListItem = ({
  bookingID,
  bookingData,
  sessionData,
  userData,
  isActionTab,
}) => {
  const { viewType } = useSelector(mapState);
  const hostView = viewType === "host";

  return (
    <div style={{ maxWidth: "100%" }}>
      {/* {hostView ? ( */}
      <HostSessionListItem
        bookingData={bookingData}
        sessionData={sessionData}
        userData={userData}
        bookingID={bookingID}
        isActionTab={isActionTab}
      />
      {/* ) : (
        <AttendeeSesssionListItem
          bookingData={bookingData}
          sessionData={sessionData}
          userData={userData}
          bookingID={bookingID}
          isActionTab={isActionTab}
        />
      // )} */}
    </div>
  );
};

export default SessionListItem;
