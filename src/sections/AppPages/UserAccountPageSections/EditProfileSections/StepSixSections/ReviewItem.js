import check from "assets/svg/check.svg";
import classes from "./Review.module.css";

const ReviewItem = (props) => {
  const { title, icon, stageStat } = props;

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className={classes.circle}>
        <img src={icon} alt="check" className={classes.iconImg} />
        {stageStat && <img src={check} alt="check" className={classes.check} />}
      </div>

      <strong>{title}</strong>
    </div>
  );
};

export default ReviewItem;
