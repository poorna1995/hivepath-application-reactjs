import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SelectableCard = ({
  selectState,
  onClickCard,
  imgSrc,
  imgBackgroundColor,
  title,
  fontSize,
}) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: "none",
        // bgcolor: item.bgColor,
        // padding: "16px",
        textAlign: "center",
        borderRadius: "20px",
        // border: "1px solid rgba(0, 0, 0, 0.1)",

        border: selectState
          ? "2px solid #4669B1"
          : "1px solid rgba(0, 0, 0, 0.1)",
        position: "relative",
        boxSizing: "content-box",
      }}
      onClick={onClickCard}
      // onClick={(e) => handleSelection(e, title)}
    >
      {selectState ? (
        <FaCheckCircle
          style={{
            //   color: "black",
            fontSize: "24px",
            padding: "8px",
            fill: "rgba(72, 74, 158, 1)",
            // width: "20px",
            // height: "20px",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />
      ) : (
        <FaCheckCircle
          style={{
            //   color: "black",
            fontSize: "24px",
            padding: "8px",
            fill: "rgba(255, 255, 255, 1)",
            // width: "20px",
            // height: "20px",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />
      )}
      <CardMedia
        component={"img"}
        src={imgSrc}
        style={{
          background: imgBackgroundColor,
          backgroundPosition: "cover",
          width: "100%",
          height: "110px",
          objectFit: "contain",
          padding: "8px",
        }}
      />

      <CardContent>
        <Typography fontSize={fontSize || `18px`} fontWeight="700">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SelectableCard;
