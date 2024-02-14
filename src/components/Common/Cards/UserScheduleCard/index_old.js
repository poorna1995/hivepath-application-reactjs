import group from "assets/svg/scheduler-icons/Group.png";
import { Typography, Grid, CardContent, CardMedia } from "@mui/material";
import classes from "./UserScheduleCard.module.css";

import changeTimeZone from "utils/changeTimeZone";
import enUS from "date-fns/locale/en-US";

import {
  FaMapMarkerAlt,
  FaStar,
  FaRegClock,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import getParsedDayTime, { formatDate, yyyymmdd } from "utils/formatDateFn";

import RoundCornersButton from "components/Common/Buttons/RoundCornersButton";
import ShortDateCard from "components/Common/Cards/ShortDateCard";

const UserScheduleCard = (props) => {
  //   const duration = useSelector(
  //     (state) => state.scheduler.calendar.data.booking_duration
  //   );

  const {
    title,
    category,
    username,
    designation,
    companyName,
    location,
    rating,
    reviews,
    userImage,
    sessionTime,
    sessionDate,
    duration,
  } = useSelector((state) => state.scheduler.scheduleCard);

  const { selectedSlot, data } = useSelector(
    (state) => state.scheduler.calendar
  );
  const slotsWithTime = data.slotsWithTime;
  const { timezone } = useSelector((state) => state.slotsData);

  let slot = null;

  if (selectedSlot && slotsWithTime) {
    slot = slotsWithTime.filter((item) => {
      return selectedSlot === item.from + "|" + item.to + "|" + item.slotDate;
    });
  }

  let sessionTimeConverted = sessionTime;
  let shortCardDate = new Date();
  if (slot && slot.length > 0) {
    slot = slot[0];
    shortCardDate = changeTimeZone(slot.date, enUS, timezone);

    let sessionFrom = changeTimeZone(
      slot.date,
      enUS,
      timezone
    ).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    let sessionTo = changeTimeZone(
      slot.endDate,
      enUS,
      timezone
    ).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    sessionTimeConverted = sessionFrom + " - " + sessionTo;
  }

  const reviewsSet =
    reviews && (reviews > 0 || reviews !== "") ? "(" + reviews + ")" : "";

  return (
    <div className={classes.card}>
      <div className={classes.cardHead} style={{ position: "relative" }}>
        <p>SCHEDULED FOR</p>

        <Typography
          variant="h6"
          fontWeight="700"
          title={title}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        >
          {/* {title} */}
        </Typography>

        <RoundCornersButton
          style={{ marginTop: "10px" }}
          title={
            <>
              <img
                src={group}
                alt="group icon"
                style={{
                  height: "16px",
                  marginBottom: "-3px",
                  marginRight: "3px",
                }}
              />{" "}
              {category || "Personal Experience"}
            </>
          }
        ></RoundCornersButton>
        {slot && (
          <ShortDateCard
            date={shortCardDate}
            head="#FF5621"
            content="white"
            style={{
              position: "absolute",
              right: 15,
              bottom: -25,
              color: "black",
              width: "21%",
            }}
          />
        )}
      </div>

      <Grid container className={classes.cardContent}>
        <Grid
          item
          xs={12}
          md={3}
          display="flex"
          container
          direction="column"
          alignItems="center"
        >
          <CardMedia
            component="img"
            src={userImage}
            style={{
              objectFit: "cover",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              marginTop: "5px",
            }}
            alt=""
          />
          {rating && (rating !== "" || rating > 0) && (
            <span className={classes.reviewSpan}>
              <FaStar style={{ color: "rgba(217, 55, 55, 1)" }} />
              <strong style={{ marginLeft: "5px" }}>
                {rating} {reviewsSet}
              </strong>
            </span>
          )}
          {!rating && (rating === "" || rating < 1) && (
            <span className={classes.reviewSpan}>No reviews</span>
          )}
        </Grid>

        <Grid ml={3} item xs={12} md={8}>
          <CardContent className={classes.detailCard}>
            <h3>{username}</h3>
            <Typography paddingBottom="8px" fontSize="14px" color="#515151">
              {designation} at {companyName}
            </Typography>
            <Typography paddingBottom="8px" fontSize="14px" color="#515151">
              <FaMapMarkerAlt /> {location}
            </Typography>
            {duration && (
              <Typography paddingBottom="8px" fontSize="14px" color="#515151">
                <FaRegClock /> Session. {duration}
              </Typography>
            )}

            {sessionTimeConverted && (
              <Typography paddingBottom="8px" fontSize="14px" color="#515151">
                <FaRegCalendarAlt /> {sessionTimeConverted}
              </Typography>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserScheduleCard;
