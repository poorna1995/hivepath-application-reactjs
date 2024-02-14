import classes from "./RoundCornersButton.module.css";

const RoundCornersButton = (props) => {
  return (
    <button className={classes.roundBtn} {...props}>
      {props.icon} {props.title}
    </button>
  );
};

export default RoundCornersButton;
