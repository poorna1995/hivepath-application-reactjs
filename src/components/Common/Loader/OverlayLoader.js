import classes from "./OverlayLoader.module.css";
import loadingGif from "assets/gifs/overlayLoader.gif";

const OverlayLoader = (props) => {
  const displayLoader = props.isLoading ? "block" : "none";
  return (
    <div className={classes.overlay} style={{ display: displayLoader }}>
      <div className={classes.text}>
        <img src={loadingGif} alt="loader" style={{ height: "150px" }} />
      </div>
    </div>
  );
};

export default OverlayLoader;
