import { Container, Grid, Typography, Chip, Avatar } from "@mui/material";
import classes from "pages/AppPages/LandingPages/LandingPage.module.css";

import { Paper } from "@mui/material";
import ShortDateCard from "components/Common/Cards/ShortDateCard";
import getParsedDayTime from "utils/formatDateFn";
import { format, formatDistanceToNow } from "date-fns";

const UpcomingSessionHostCard = ({ data, props }) => {
  const { from, to, date, session_data, attendee_data } = data;
  const { company, first_name, last_name, image_url, role } = attendee_data;
  const { title, category } = session_data;
  const fromTime = date && from && getParsedDayTime(date, from);
  const toTime = date && to && getParsedDayTime(date, to);

  const formatFromTime = fromTime && format(fromTime, "hh:mm a");
  const formatToTime = toTime && format(toTime, "hh:mm a");

  const getChangedDate = fromTime && format(fromTime, "MM/dd/yyyy");

  const distanceInTime = formatDistanceToNow(fromTime, {
    addSuffix: true,
  });

  const isNow = distanceInTime.search("less") !== -1 ? true : false;

  return (
    <Paper className={classes.hostCard}>
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={3} md={3}>
          <ShortDateCard head="#FF5621" content="#fff" date={getChangedDate} />
        </Grid>
        <Grid item xs={9} md={9}>
          <Typography
            variant="subtitle"
            fontWeight="500"
            fontSize="16px"
            style={{ color: "#484A9E" }}
          >
            {formatFromTime} - {formatToTime}
          </Typography>
          <Typography
            variant="h6"
            fontSize="20px"
            fontWeight="700"
            style={{ lineHeight: "1.1" }}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
            title={title || ""}
          >
            {title || "-"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} align="center">
          <Chip
            label={category || "-"}
            style={{
              background:
                "linear-gradient(90.59deg, #F9F7C6 1.61%, #E8FCDB 99.75%)",
              fontWeight: "bold",
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={3} md={2}>
          <Avatar
            src={
              image_url ||
              "https://mhcd.org/wp-content/uploads/2017/12/placeholder-man.png"
            }
            style={{ height: "60px", width: "60px" }}
          />
        </Grid>
        <Grid item xs={5} md={5} align="left">
          <Typography
            variant="h6"
            fontWeight="800"
            fontSize="18px"
            className="coloredHeading"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            title={first_name}
          >
            {first_name} {last_name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="#515151"
            fontWeight="800"
            fontSize="14px"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            title={role + " at " + company}
          >
            {role} at {company}
          </Typography>
        </Grid>
        <Grid item xs={4} md={5} className="center">
          {!isNow && (
            <Typography
              variant="subtitle2"
              color="black"
              fontWeight="800"
              fontSize="14px"
            >
              {distanceInTime}
            </Typography>
          )}
          {isNow && (
            <Chip
              label="• Now"
              style={{
                background: "#F24947",
                fontWeight: "bold",
                color: "white",
                width: "100%",
              }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

UpcomingSessionHostCard.propTypes = {};

export default UpcomingSessionHostCard;
