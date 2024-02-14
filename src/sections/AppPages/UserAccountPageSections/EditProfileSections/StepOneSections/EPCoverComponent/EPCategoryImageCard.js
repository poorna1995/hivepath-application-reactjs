import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";

const EPCategoryImageCard = (props) => {
  const { title, image, onSelect } = props;
  return (
    <div className={classes.UPImageCard} onClick={() => onSelect(title)}>
      <img src={image} alt="cover" />
      {title && <span className={classes.imageCardTitle}>{title}</span>}
    </div>
  );
};

export default EPCategoryImageCard;
