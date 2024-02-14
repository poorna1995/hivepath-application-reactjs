import gif from "assets/gifs/dotsLoader.gif";
import { CircularProgress } from "@mui/material";

const Loader = (props) => {
  return (
    <div
      style={{
        cursor: "pointer",
        pointerEvents: "none",
        // background: "rgba(202, 197, 197, 0.3) none repeat scroll 0% 0%",
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        zIndex: "100",
      }}
    >
      <CircularProgress
        style={{
          position: "absolute",
          top: "45%",
          left: "45%",
          // height: "80px",
        }}
      />
      {/* <img
        src={gif}
        alt="loader"
        style={{
          position: "absolute",
          top: "45%",
          left: "45%",
          height: "80px",
        }}
        {...props}
      /> */}
    </div>
  );
};

export default Loader;
