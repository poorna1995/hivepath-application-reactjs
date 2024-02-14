import check from "assets/svg/all/new-icons/profile-onboarding/check.svg";
import error from "assets/svg/all/new-icons/profile-onboarding/error.svg";
// import classes from "./Review.module.css";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
    width: "200px",
    paddingBottom: "10px",

    position: "relative",
    marginRight: "30px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    width: "100%",
    borderRadius: "20px 20px 0 0",
  },
  check: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
  },
  error: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    height: "26px",
    width: "26px",
  },
}));

const ReviewItem = (props) => {
  const classes = useStyles();
  const { title, icon, stageStat, bg, index } = props;

  return (
    <>
      <div style={{ marginBottom: "20px" }} className={classes.root}>
        <div
          className={classes.imageContainer}
          // sx={{ backgroundColor: `${bg}` }}
          style={{ background: `${bg}` }}
        >
          <div style={{ paddingTop: "10px" }}>
            <img src={icon} alt="check" className={classes.iconImg} />
            {stageStat && (
              <img src={check} alt="check" className={classes.check} />
            )}
            {!stageStat && (
              <img src={error} alt="erro" className={classes.error} />
            )}
          </div>
        </div>

        <strong>{title}</strong>
      </div>
      {index === 2 && <div style={{ flexBasis: "100%", height: "0" }}></div>}
    </>
  );
};

export default ReviewItem;
