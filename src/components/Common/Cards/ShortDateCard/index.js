import classes from "./ShortDateCard.module.css";
import { Container, Grid, Typography } from "@mui/material";

const ShortDateCard = (props) => {
  let cardDate = props.date;
  if (typeof cardDate === "string") {
    cardDate = new Date(cardDate);
  }

  const month = cardDate
    .toLocaleString("default", { month: "long" })
    .slice(0, 3)
    .toUpperCase();
  const dayname = cardDate
    .toLocaleString("default", { weekday: "long" })
    .slice(0, 3)
    .toUpperCase();
  const dDate = cardDate.getDate();

  const headbackground = props.head
    ? { background: props.head }
    : { background: "#EAEAEA" };
  const contentBackground = props.head
    ? { background: props.content }
    : { background: "transparent" };
  return (
    <Grid container className={classes.card} {...props}>
      <Grid
        item
        xs={12}
        md={12}
        className={classes.cardHead}
        style={headbackground}
      >
        <span>{month}</span>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        style={contentBackground}
        className={classes.cardContent}
      >
        <Typography variant="h5" fontWeight="800">
          {dDate}
        </Typography>
        <p style={{ marginBottom: "5px" }}>{dayname}</p>
      </Grid>
    </Grid>
  );
};

export default ShortDateCard;

ShortDateCard.propTypes = {};
