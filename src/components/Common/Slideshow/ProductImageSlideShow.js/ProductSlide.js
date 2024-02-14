import HivepathImage from "components/Common/HivepathImage";
import React from "react";

const ProductSlide = ({ src }) => {
  return (
    <img
      src={src}
      style={{ width: "300px", maxHeight: "300px", objectFit: "contain" }}
      alt="Slide "
    />
  );
};

export default ProductSlide;
