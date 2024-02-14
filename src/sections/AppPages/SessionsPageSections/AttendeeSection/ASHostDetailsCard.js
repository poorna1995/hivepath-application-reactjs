import { Avatar, Chip, Grid, Typography } from "@mui/material";
import ShortDateCard from "components/Common/Cards/ShortDateCard";
import React from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import { useSelector } from "react-redux";
import getParsedDayTime from "utils/formatDateFn";
import { enUS } from "date-fns/locale";
import changeTimezone from "utils/changeTimeZone";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import HivepathImage from "components/Common/HivepathImage";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import removeUnderscore from "utils/typographyUtilityFunctions/removeUnderscore";

const mapState = ({ slotsData }) => ({
  timezone: slotsData.timezone,
});
const ASHostDetailsCard = ({
  userName,
  userPosition,
  sessionTitle,
  sessionCategory,
  profilePicUrl,
  rating,
  sessionID,
  bookingDetails,
  hostID,
  thumbnails,
  slug_id,
}) => {
  const { timezone } = useSelector(mapState);
  const { date, from, to } = bookingDetails;

  const fromTime = date && from && getTimeBasedOnTimezone(date, from, timezone);
  const toTime = date && to && getTimeBasedOnTimezone(date, to, timezone);

  const formatFromTime = fromTime && format(fromTime, "hh:mm a");
  const formatToTime = toTime && format(toTime, "hh:mm a");

  const getChangedDate = fromTime && format(fromTime, "MM/dd/yyyy");

  return (
    <PaperBase>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            lineHeight: "15px",
            color: "rgba(81, 81, 81, 1)",
          }}
        >
          {/* HOST DETAILS */}
          Host profile
        </p>
        {/* <p
          style={{
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "19px",
            color: "rgba(97, 97, 97, 1)",
          }}
        >
          Session Id:#{sessionID}
        </p> */}
      </div>
      <div
        style={{
          display: "flex",
          paddingTop: "16px",
          alignItems: "center",
        }}
      >
        {/* {profilePicUrl && ( */}
        <Avatar
          src={profilePicUrl}
          alt=""
          style={{
            width: "56px",
            height: "56px",
            objectFit: "cover",
            borderRadius: "50%",
            // clipPath:'circle(50% at 50% 50%)'
          }}
        />
        {/* )} */}
        <div style={{ paddingLeft: "16px" }}>
          {userName && (
            <Link to={slug_id && `/u/${slug_id}`}>
              <Typography
                style={{
                  // width:'auto',
                  fontWeight: "800",
                  fontSize: "21px",
                  lineHeight: "27px",
                  backgroundColor: "rgba(24, 61, 255, 1)",
                  backgroundImage:
                    "linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  display: "inline-block",
                  WebkitTextFillColor: "transparent",
                  backgroundRepeat: "repeat",
                  MozBackgroundClip: "text",
                  MozTextFillColor: "transparent",
                }}
              >
                {userName}
              </Typography>
            </Link>
          )}
          {userPosition && (
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "18px",
                letterSpacing: "-3%",
              }}
            >
              {userPosition}
            </Typography>
          )}
        </div>
      </div>
      <Grid
        container
        // spacing="2"
        // alignItems="center"
        paddingTop="16px"
        style={{}}
      >
        <Grid item xs={3}>
          <div
            style={{
              position: "relative",
            }}
          >
            {thumbnails && (
              <HivepathImage
                src={thumbnails[0]}
                style={{
                  borderRadius: "10px",
                  maxHeight: "150px",
                }}
              />
            )}
            {sessionCategory && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  // zIndex: "100",
                  left: "10px",
                }}
              >
                <Chip
                  label={sessionCategory && sessionCategory}
                  style={{
                    fontWeight: "600",
                    background: "#0913FC",
                    color: "white",
                  }}
                />
              </div>
            )}
          </div>
        </Grid>

        {getChangedDate && (
          <Grid item xs={2} style={{ padding: "16px" }}>
            <ShortDateCard date={getChangedDate} head="#FA784F" />
          </Grid>
        )}
        <Grid
          item
          xs={7}
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {formatFromTime && formatToTime && timezone && (
            <Typography
              // marginTop="8px"
              style={{
                color: "#D93737",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "18px",
              }}
            >
              {`${formatFromTime} - ${formatToTime}  (${removeUnderscore(
                timezone
              )})`}
            </Typography>
          )}

          {sessionTitle && (
            <Link to={`/offering/${sessionID}`}>
              <Typography
                style={{
                  fontWeight: "700",
                  fontSize: "24px",
                  marginBottom: "16px",
                  color: "black",
                  flex: 1,
                }}
              >
                {sessionTitle}
              </Typography>
            </Link>
          )}
        </Grid>
      </Grid>
    </PaperBase>
  );
};

export default ASHostDetailsCard;
