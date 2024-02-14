// import classes from "./UserScheduleCard.module.css";
import d1 from "assets/images/offering/placeholderImage.png";
import { ReactComponent as CalendarIcon } from "assets/svg/scheduler-icons/Calendar.svg";
import { ReactComponent as TimeIcon } from "assets/svg/scheduler-icons/Time_Circle.svg";
import { useParams } from "react-router";

import group from "assets/svg/scheduler-icons/Group.png";
import {
  CardMedia,
  Card,
  Typography,
  Grid,
  CardContent,
  Chip,
  Avatar,
} from "@mui/material";

import changeTimeZone from "utils/changeTimeZone";
import enUS from "date-fns/locale/en-US";
import format from "date-fns/format";

import {
  FaMapMarkerAlt,
  FaStar,
  FaRegClock,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import getParsedDayTime, { yyyymmdd } from "utils/formatDateFn";

import ShortDateCard from "components/Common/Cards/ShortDateCard";
import categoryColors from "data/UserProfilePage/offeringCategoryColor";

import { makeStyles } from "@mui/styles";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "400px",
    maxWidth: "400px",
    height: "fit-content",
    // maxHeight: "420px",
    margin: "0 10px 0 0",
    boxShadow: "0px 0px 24px rgba(72, 74, 158, 0.1)",
    borderRadius: "14px",
    // "&:hover": {
    //   cursor: "pointer",
    //   background: "#f7f7f7",
    //   "& .MuiTypography-h5": {
    // textDecorationColor: "black",
    // textDecorationLine: "underline",
    //   },
    // },
    [theme.breakpoints.down("sm")]: {
      minWidth: "auto",
      padding: "8px",
    },
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    "& .MuiAvatar-root": {
      marginRight: "16px",
      width: "46px",
      height: "46px",
    },
  },
  hideOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  showOnMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
}));

const mapState = ({ slotsData }) => ({
  timezone:
    slotsData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
});

const UserScheduleCard = (props) => {
  const classes = useStyles();
  const { hostId } = useParams();

  const {
    title,
    category,
    username,
    designation,
    companyName,
    reviews,
    userImage,
    sessionTime,
    sessionDate,
    card_image,
    slug_id,
    profile_headline_description,
  } = useSelector((state) => state.scheduler.scheduleCard);

  const headline = profile_headline_description
    ? profile_headline_description
    : `${designation} at ${companyName}`;

  const { selectedSlot, data, selectedDate } = useSelector(
    (state) => state.scheduler.calendar
  );
  const slotsWithTime = data.slotsWithTime;
  //   const { timezone } = useSelector((state) => state.slotsData);
  const { timezone } = useSelector(mapState);

  let slot = null;
  let sessionTimeConverted = sessionTime;

  if (selectedSlot && slotsWithTime) {
    slot = slotsWithTime.filter(
      (item) =>
        selectedSlot === item.from + "|" + item.to + "|" + yyyymmdd(item.date)
    );
  }

  if (slot && slot.length > 0) {
    slot = slot[0];
    const stringDate = slot.date;

    let sessionFrom = changeTimeZone(
      getParsedDayTime(stringDate, slot.from),
      enUS,
      timezone
    ).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    let sessionTo = changeTimeZone(
      getParsedDayTime(stringDate, slot.to),
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

  let prettyDate = null;

  if (sessionDate) {
    prettyDate = format(
      changeTimeZone(sessionDate, enUS, timezone),
      "EEE, d LLLL yyyy"
    );
  }

  const profileNavigation = () => {
    const url = "/u/" + slug_id;
    var win = window.open(url);
    win.focus();
  };

  return (
    <Card className={classes.root}>
      <div style={{ position: "relative" }}>
        <Chip
          label={category}
          style={{
            background: categoryColors[category] || categoryColors["Default"],
            color: "white",
            fontWeight: "bold",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
          className={classes.hideOnMobile}
        />

        <CardMedia
          component="img"
          height="200"
          image={card_image}
          alt="card image"
          className={classes.hideOnMobile}
        />
        <Grid container spacing="2" className={classes.showOnMobile}>
          <Grid item xs={4}>
            <img
              src={card_image}
              alt=""
              style={{
                maxWidth: "100%",
                minWidth: "100%",
                maxHeight: "80px",
                minHeight: "80px",
                borderRadius: "10px",
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography
              sx={{ fontWeight: "700", fontSize: "16px", marginLeft: "8px" }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            fontWeight={700}
            fontSize="21px"
            // component="div"

            sx={{
              paddingRight: "30px",

              display: { xs: "none", md: "-webkit-box" },
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {title}
          </Typography>

          <div className={classes.avatarContainer} onClick={profileNavigation}>
            <Avatar src={userImage} />
            <div style={{ flex: 1 }}>
              <Typography
                variant="h6"
                fontWeight="700"
                className="coloredHeading"
                fontSize="16px"
                style={{ cursor: "pointer" }}
                // onClick={profileNavigation}
              >
                {username}
              </Typography>
              <Typography
                variant="subtitle2"
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {headline}
              </Typography>
            </div>
          </div>
          {prettyDate && (
            <div
              className={classes.avatarContainer}
              style={{ marginTop: "10px", marginTop: "20px" }}
            >
              <CalendarIcon />
              <div style={{ flex: 1, marginLeft: "10px" }}>
                <Typography
                  variant="subtitle2"
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {prettyDate}
                </Typography>
              </div>
            </div>
          )}

          {sessionTimeConverted && (
            <div
              className={classes.avatarContainer}
              style={{ marginTop: "10px" }}
            >
              <TimeIcon />
              <div style={{ flex: 1, marginLeft: "10px" }}>
                <Typography
                  variant="subtitle2"
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {sessionTimeConverted} ({timezone.replace("_", " ")})
                </Typography>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>

    // <div className={classes.card}>
    //   <div className={classes.cardHead} style={{ position: "relative" }}>
    //     <div
    //       style={{
    //         position: "absolute",
    //         top: "-4px",
    //         left: "-2px",
    //         width: "101%",
    //       }}
    //     >
    //       <img src={borderImg} width="100%" />
    //     </div>

    //     <p>SCHEDULED FOR</p>
    //     <h3>{title}</h3>

    //     <RoundCornersButton
    //       style={{
    //         background:
    //           "linear-gradient(90.59deg, #F9F7C6 1.61%, #E8FCDB 99.75%)",
    //         paddingRight: "15px",
    //       }}
    //       title={
    //         <>
    //           <img
    //             src={group}
    //             alt="group icon"
    //             style={{
    //               height: "16px",
    //               marginBottom: "-3px",
    //               marginRight: "3px",
    //             }}
    //           />{" "}
    //           {category || "Personal Experience"}
    //         </>
    //       }
    //     ></RoundCornersButton>
    //     {sessionDate && (
    //       <ShortDateCard
    //         date={sessionDate}
    //         head="#FF5621"
    //         content="white"
    //         style={{
    //           position: "absolute",
    //           right: 15,
    //           bottom: -25,
    //           color: "black",
    //           width: "21%",
    //         }}
    //       />
    //     )}
    //   </div>

    //   <Grid container className={classes.cardContent}>
    //     <Grid
    //       item
    //       xs={12}
    //       md={3}
    //       display="flex"
    //       container
    //       direction="column"
    //       alignItems="center"
    //     >
    //       <CardMedia
    //         component="img"
    //         src={userImage}
    //         style={{
    //           objectFit: "cover",
    //           width: "80px",
    //           height: "80px",
    //           borderRadius: "50%",
    //           marginTop: "5px",
    //         }}
    //         alt=""
    //       />
    //       {rating && (rating !== "" || rating > 0) && (
    //         <span className={classes.reviewSpan}>
    //           <FaStar style={{ color: "rgba(217, 55, 55, 1)" }} />
    //           <strong style={{ marginLeft: "5px" }}>
    //             {rating} {reviewsSet}
    //           </strong>
    //         </span>
    //       )}
    //       {!rating && (rating === "" || rating < 1) && (
    //         <span className={classes.reviewSpan}>No reviews</span>
    //       )}
    //     </Grid>

    //     <Grid ml={3} item xs={12} md={8}>
    //       <CardContent className={classes.detailCard}>
    //         <h3>{username}</h3>
    //         <Typography paddingBottom="8px" fontSize="14px" color="#515151">
    //           {designation} at {companyName}
    //         </Typography>
    //         <Typography paddingBottom="8px" fontSize="14px" color="#515151">
    //           <FaMapMarkerAlt /> {location}
    //         </Typography>
    //         {duration && (
    //           <Typography paddingBottom="8px" fontSize="14px" color="#515151">
    //             <FaRegClock /> Session. {duration}
    //           </Typography>
    //         )}

    //         {sessionTimeConverted && (
    //           <Typography paddingBottom="8px" fontSize="14px" color="#515151">
    //             <FaRegCalendarAlt /> {sessionTimeConverted}
    //           </Typography>
    //         )}
    //       </CardContent>
    //     </Grid>
    //   </Grid>
    // </div>
  );
};

export default UserScheduleCard;
