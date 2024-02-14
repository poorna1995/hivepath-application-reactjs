import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
import check from "assets/svg/check.svg";

const UPCoverImageCard = (props) => {
  const { id, title, image, active, onSelect } = props;

  return (
    <div className={classes.UPImageCard} onClick={() => onSelect(image)}>
      {active && (
        <div className={classes.cardOverlay}>
          <img src={check} alt="selected image" />
        </div>
      )}

      <img src={image} alt="cover" />
      {title && <span className={classes.imageCardTitle}>{title}</span>}
    </div>
  );
};

export default UPCoverImageCard;
