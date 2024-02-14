import { Button, Card, CardActionArea, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HivepathImage from "components/Common/HivepathImage";
import ProductImageSlideShow from "components/Common/Slideshow/ProductImageSlideShow.js";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setPreviewSession } from "store/knowledge-sessions/knowledgeSessionsSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 24px 5px rgba(72, 74, 158, 0.06)",
    borderRadius: "20px",
    margin: "8px",
    // display: "grid",
    // placeItems: "center",
    maxHeight: "500px",
    cursor: "pointer",
    position: "relative",
    maxWidth: "400px",
  },
}));

const PreviewOfferingItem = ({ imgSrc, title, data }) => {
  const classes = useStyles();
  const { session_id, category } = data;

  const dispatch = useDispatch();
  const handleClick = () => {
    const url = `/onboarding/ks/create/preview-sessions/${session_id}`;
    window.open(url);
    dispatch(setPreviewSession(data));
  };

  return (
    <Card className={classes.root} style={{}} onClick={handleClick}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          zIndex: "100",
          display: "flex",
          justifyContent: "start",
          left: "20px",
        }}
      >
        <Chip
          label={category}
          style={{
            background: "#023E8A",
            color: "white",
          }}
        />
      </div>
      <div style={{ maxHeight: "250px", overflow: "hidden" }}>
        {Array.isArray(imgSrc) && (
          <ProductImageSlideShow
            data={imgSrc}
            containerStyle={{
              // height: "300px",
              maxHeight: "300px",
              width: "400px",
              // objectFit: "contain",
            }}
          />
        )}
      </div>

      {/* <HivepathImage
        src={imgSrc[0]}
        alt=""
        width="100%"
        style={{
          // height: "140px",
          objectFit: "cover",
        }}
      /> */}
      {/* )} */}

      {/* // )} */}
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          lineHeight: " 26px",

          color: "#222222",
          padding: "8px",
          paddingBottom: "24px",
        }}
        align="left"
      >
        {title}
      </Typography>
    </Card>
  );
};

export default PreviewOfferingItem;
