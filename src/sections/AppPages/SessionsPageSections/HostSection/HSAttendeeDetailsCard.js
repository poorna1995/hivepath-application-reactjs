import {
  Chip,
  Typography,
  Skeleton,
  Avatar,
  Grid,
  Tooltip,
  Button,
  useMediaQuery,
} from "@mui/material";
import ShortDateCard from "components/Common/Cards/ShortDateCard";
import React, { useState, useEffect } from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import { ReactComponent as UserGroupIcon } from "assets/svg/sessions/user-group.svg";
import { ReactComponent as StarIcon } from "assets/svg/sessions/star.svg";
import getParsedDayTime from "utils/formatDateFn";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import changeTimezone from "utils/changeTimeZone";
import { enUS } from "date-fns/locale";
import { Link } from "react-router-dom";
import HivepathImage from "components/Common/HivepathImage";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import removeUnderscore from "utils/typographyUtilityFunctions/removeUnderscore";
import { makeStyles, useTheme } from "@mui/styles";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  root: {},
  userInfoContainer: {
    display: "flex",
    paddingTop: "16px",
    alignItems: "center",
  },
  avatar: {
    width: "56px",
    height: "56px",
    [theme.breakpoints.down("sm")]: {
      width: "30px",
      height: "30px",
    },
  },
  userName: {
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      lineHeight: "21px",
    },
  },
  role: {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "18px",
    letterSpacing: "-3%",
  },
  sessionTitle: {
    fontWeight: "700",
    fontSize: "24px",
    marginBottom: "16px",
    color: "black",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      // marginLeft: "8px",
    },
  },
  hideOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  titleContainer: {
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8px",
      paddingLeft: "0px !important",
    },
  },
  showOnMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  imageStyles: {
    borderRadius: "10px",
    // paddingRight: "-32px",
    maxHeight: "150px",
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      // marginLeft: "8px",
      maxHeight: "80px",
    },
  },
  timeContent: {
    color: "#D93737",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "18px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      lineHeight: "16px",
    },
  },
}));

const mapState = ({ slotsData, view }) => ({
  timezone: slotsData.timezone,

  viewType: view.userType,
});

const HSAttendeeDetailsCard = ({
  userName,
  userPosition,
  sessionTitle,
  sessionCategory,
  profilePicUrl,
  rating,
  sessionID,
  bookingDetails,
  loading,
  attendee_id,
  thumbnails,
  slug_id,
  insideDrawer,
  userProfile,
  profile_headline_description
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const { timezone, viewType } = useSelector(mapState);
  const { from_date, from_time, to_date, to_time, session_data, booking_id } =
    bookingDetails;
  const isHostView = viewType === "host";
  const fromTime =
    from_date &&
    from_time &&
    getTimeBasedOnTimezone(from_date, from_time, timezone);
  const toTime =
    to_date && to_time && getTimeBasedOnTimezone(to_date, to_time, timezone);

  // const changeFrom = fromTime && changeTimezone(fromTime, enUS, timezone);
  // const changeTo = toTime && changeTimezone(toTime, enUS, timezone);

  const formatFromTime = fromTime && format(fromTime, "hh:mm a");
  const formatToTime = toTime && format(toTime, "hh:mm a");

  const getChangedDate = fromTime && format(fromTime, "MM/dd/yyyy");
  const dateForMobileView = fromTime && format(fromTime, "E, MMM dd, yyyy ");

  // const ahnd
  const [show, setShow] = useState(false);
  let keywords =
    session_data &&
    (show
      ? session_data.related_topics
      : session_data.related_topics.slice(0, 3));
  const moreLength =
    session_data &&
    keywords &&
    session_data.related_topics.length - keywords.length;

  // console.log({
  //   // changeFrom,
  //   // changeTo,
  //   formatFromTime,
  //   formatToTime,
  //   getChangedDate,
  // });
  const handleOnClickMoreButton = () => {
    setShow(true);
  };
  return (
    <PaperBase>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      ></div>
      {insideDrawer && (
        <Typography
          style={{
            color: "#D93737",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "18px",
          }}
          // className={clsx(classes.showOnMobile, classes.timeContent)}
        >
          {`${dateForMobileView}, ${formatFromTime}-${formatToTime} (${timezone})`}
        </Typography>
      )}
      <Typography
        style={{
          color: "#D93737",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "18px",
        }}
        className={clsx(classes.showOnMobile, classes.timeContent)}
      >
        {`${dateForMobileView}, ${formatFromTime}-${formatToTime} (${timezone})`}
      </Typography>
      <Grid
        container
        // spacing="2"
        // alignItems="center"
        paddingTop="16px"
        style={{}}
      >
        {/* {getChangedDate && (
          <Grid
            item
            md={2}
            // xs={0}
            order={isHostView ? "1" : "2"}
            style={{ padding: "8px" }}
            className={classes.hideOnMobile}
          >
            <ShortDateCard date={getChangedDate} head="#FA784F" />
          </Grid>
        )} */}
        <Grid
          item
          md={8}
          xs={8}
          order={isHostView ? "2" : "3"}
          classname={classes.titleContainer}
          style={{
            paddingLeft: !isHostView && "8px",
          }}
        >
          {!insideDrawer && (
            <>
              {formatFromTime && formatToTime && (
                <Typography
                  // marginTop="8px"
                  style={{
                    color: "#D93737",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "18px",
                  }}
                  className={classes.hideOnMobile}
                >
                  {`${dateForMobileView}, ${formatFromTime} - ${formatToTime} (${removeUnderscore(
                    timezone
                  )})`}
                </Typography>
              )}
            </>
          )}
          {sessionTitle && (
            <Link
              to={
                insideDrawer
                  ? `/sessions/${booking_id}`
                  : `/offering/${sessionID}`
              }
              target='_blank'
            >
              <Typography
                sx={
                  insideDrawer && {
                    fontSize: "16px !important",
                  }
                }
                className={classes.sessionTitle}
                style={{}}
              >
                {sessionTitle}
              </Typography>
            </Link>
          )}
          <div style={{ display: "flex", width: matches && "100%" }}>
            {keywords &&
              keywords.map((item) => (
                <Chip
                  label={`# ${item}`}
                  style={{
                    marginRight: matches ? "8px" : "16px",
                    fontWeight: "500",
                    marginBottom: "8px",
                  }}
                />
              ))}{" "}
            {moreLength > 0 && (
              <Button
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  textTransform: "initial",
                }}
                onClick={handleOnClickMoreButton}
              >
                {" "}
                + {moreLength} more
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={4} order={isHostView ? "2" : "1"} md={4}>
          <div
            style={{
              position: "relative",
            }}
          >
            {thumbnails && (
              <HivepathImage
                src={thumbnails[0]}
                className={classes.imageStyles}
                // style={{
                //   borderRadius: "10px",
                //   maxHeight: "150px",
                // }}
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
                className={classes.hideOnMobile}
              >
                {!insideDrawer && (
                  <Tooltip title={sessionCategory}>
                    <Chip
                      label={sessionCategory && sessionCategory}
                      style={{
                        fontWeight: "600",
                        background: "#0913FC",
                        color: "white",
                        maxWidth: "120px",
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      <div style={{ marginTop: "16px" }}>
        {!insideDrawer && (
          <Typography
            style={{
              fontSize: "12px",
              fontWeight: "600",
              lineHeight: "15px",
              color: "rgba(81, 81, 81, 1)",
              // textTransform: "uppercase",
            }}
          >
            
           {isHostView ? "Attendee":"Host"}  profile
          </Typography>
        )}
        {insideDrawer && (
          <Typography
            style={{
              fontSize: "12px",
              fontWeight: "600",
              lineHeight: "15px",
              color: "rgba(81, 81, 81, 1)",
              textTransform: "capitalize",
            }}
          >
            {userProfile === "host" ? "Attendee" : "Host"} profile
          </Typography>
        )}
      </div>

      <div className={classes.userInfoContainer} style={{}}>
        <Avatar src={profilePicUrl} alt="" className={classes.avatar} />

        <div style={{ paddingLeft: "16px" }}>
          {userName && (
            <Link to={slug_id && `/u/${slug_id}`} target='_blank'>
              <Typography className={classes.userName}>{userName}</Typography>
            </Link>
          )}
          {userPosition && (
            <Typography className={classes.role} style={{}}>
              { userPosition}
            </Typography>
          )}
        </div>
      </div>
    </PaperBase>
  );
};

export default HSAttendeeDetailsCard;
