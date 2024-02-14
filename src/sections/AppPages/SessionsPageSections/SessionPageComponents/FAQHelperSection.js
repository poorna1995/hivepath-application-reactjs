import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";

const FAQHelperSection = () => {
  return (
    <PaperBase
      style={{
        background: "rgba(56, 88, 255, 0.05)",
        border: "1px solid #3C38FF",
      }}
    >
      <Typography fontWeight="500" fontSize="18px" padding="16px">
        <strong>Have any Questions?</strong> We have the answers
        <br />
        Check out the <Link>FAQs</Link>
      </Typography>
    </PaperBase>
  );
};

export default FAQHelperSection;
