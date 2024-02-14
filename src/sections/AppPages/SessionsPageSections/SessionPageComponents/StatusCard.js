import {
  Chip,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Skeleton,
} from "@mui/material";
import React from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import { ReactComponent as PaperPlaneIcon } from "assets/svg/sessions/paper-plane.svg";

import { ReactComponent as BrowserIcon } from "assets/svg/sessions/browser.svg";
import { ReactComponent as VideoCamIcon } from "assets/svg/sessions/video-cam.svg";
import { ReactComponent as FeedbackIcon } from "assets/svg/sessions/feedback.svg";
import changeTimezone from "utils/changeTimeZone";
import enUS from "date-fns/locale/en-US";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { utcToZonedTime } from "date-fns-tz";

const mapState = ({ slotsData, sessions, view }) => ({
  timezone: slotsData.timezone,

  sessions,
  viewType: view.userType,
});

const StatusCard = ({ loading }) => {
  const { timezone, sessions, viewType } = useSelector(mapState);

  const hostView = viewType === "host";
  // const bookingDetails =
  //   sessions.hostBookingDetails && sessions.hostBookingDetails;
  const attendeeStatus =
    (sessions.hostBookingDetails &&
      sessions.hostBookingDetails.attendee_view) ||
    {};
  const hostStatus =
    (sessions.hostBookingDetails && sessions.hostBookingDetails.host_view) ||
    {};

  const sessionStatus = (hostView ? hostStatus : attendeeStatus) || {};

  const { session_status, message_tag, status_message } =
    sessionStatus && sessionStatus;
  const data = session_status;
  const message = status_message;
  const messageTag = message_tag;

  const userTimezone =
    timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const steps = [
    {
      label: "Session Request Sent",
      icon: <PaperPlaneIcon />,
    },
    {
      label: "Request accepted",
      icon: <BrowserIcon />,
    },
    {
      label: "Session",
      icon: <VideoCamIcon />,
    },
    {
      label: "Feedback",
      icon: <FeedbackIcon />,
    },
  ];

  return (
    <PaperBase style={{ minHeight: "200px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Typography
          style={{ fontSize: "26px", fontWeight: "700", lineHeight: "32px" }}
        >
          Status
        </Typography>
        <Chip label={message } /> */}
      </div>
      {loading ? (
        <Skeleton animation="wave" />
      ) : (
        <div>
          <Stepper orientation="vertical">
            {data?.map((item, index) => {
              const { title, icon: Icon, action_date, status } = item;
              // const date =
              //   action_date && changeTimezone(action_date, enUS, userTimezone);
              const getDate = action_date && `${action_date}+0000`;
              const date = action_date && utcToZonedTime(getDate, userTimezone);
              const formattedDate =
                action_date && format(date, "MMM dd, hh:mma");
              return (
                <Step key={title} active={status}>
                  <StepLabel
                    // icon={Icon}

                    StepIconProps={{
                      style: {
                        // background: "rgba(72, 74, 158, 1)",
                      },
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    >
                      {" "}
                      {title}
                    </span>
                    {index === 0 && ` ${messageTag}`}
                    <br />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "rgba(101,101,101,1)",
                      }}
                    >
                      {action_date && formattedDate}
                    </span>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
      )}
    </PaperBase>
  );
};

export default StatusCard;
