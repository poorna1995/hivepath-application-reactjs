import { LinearProgress } from "@mui/material";
import HivepathImage from "components/Common/HivepathImage";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Slider from "react-slick";
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";
import ProductSlide from "./ProductSlide";

const ProductImageSlideShow = ({ data, containerStyle, autoplay }) => {
  const [progress, setProgress] = React.useState(0);
  //
  const [autoPlay, setAutoPlay] = useState(autoplay || false);
  const sliderRef = useRef();

  const handlePlay = () => {
    setAutoPlay(() => true);
    // sliderRef.current.slickPlay();
  };
  const handlePause = () => {
    setAutoPlay(() => false);
    // sliderRef.current.slickPause();
  };
  // console.log(sliderRef.current);
  // console.log({ autoPlay });
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (autoPlay) return sliderRef.current.slickPlay();
    // return sliderRef.current.slickPause();
  }, [autoPlay]);

  const settings = {
    // dots: true,
    infinite: true,
    // autoplay: autoPlay,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    width: "inherit",
    height: "inherit",
    // appendDots: dots => (
    //   <div
    //     style={{
    //       backgroundColor: "#ddd",
    //       borderRadius: "10px",
    //       padding: "10px"
    //     }}
    //   >
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <div
    //     style={{
    //       width: "30px",
    //       color: "blue",
    //       border: "1px blue solid",
    //     }}
    //   >
    //     <LinearProgress variant="determinate" value={progress} />
    //     {/* {i + 1} */}
    //   </div>
    // ),
  };
  return (
    <div
      style={
        (containerStyle && containerStyle) || {
          maxHeight: "200px",
          width: "400px",
        }
      }
      onMouseOver={handlePlay}
      onMouseLeave={handlePause}
    >
      <Slider
        ref={sliderRef}
        {...settings}
        autoplay={autoPlay}

        // onMouseOver={handlePlay}
        // onMouseLeave={handlePause}

        // autoplay={autoPlay}
      >
        {data?.map((item) => (
          <HivepathImage
            src={item}
            alt=""
            style={{
              // height: "100px",
              width: "100%",
            }}
          />
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageSlideShow;
