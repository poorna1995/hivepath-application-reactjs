import { styled, Typography } from "@mui/material";
import React from "react";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: `${theme.typography.fontFamily} !important`,
  "& p": {
    fontSize: "18px !important",
    fontWeight: "500",
    padding: "8px 0px",
    // fontFamily: "DM Sans !important",
    fontFamily: `${theme.typography.fontFamily} !important`,
  },
  // "& p span": {
  //   fontSize: "16px !important",
  //   fontWeight: "500",
  //   lineHeight: "22px",
  //   // fontFamily: "DM Sans !important",
  //   fontFamily: `${theme.typography.fontFamily} !important`,
  // },
  "& h1": {
    fontWeight: "700",
    fontSize: "28px !important",
    lineHeight: "36px",
    fontFamily: `${theme.typography.fontFamily} !important`,
  },
  "& h2": {
    fontWeight: "700",
    fontSize: "26px !important",
    lineHeight: "36px",
    fontFamily: `${theme.typography.fontFamily} !important`,
  },
  "&  h3": {
    fontWeight: "700",
    fontSize: "22px !important",
    lineHeight: "36px",
    fontFamily: `${theme.typography.fontFamily} !important`,
  },

  "& h4": {
    fontWeight: "500",
    fontSize: "20px !important",
    lineHeight: "26px",
    fontFamily: `${theme.typography.fontFamily} !important`,
  },
  "&  h5": {
    fontWeight: "700",
    fontSize: "18px !important",
    lineHeight: "26px",
    fontFamily: `${theme.typography.fontFamily} !important`,
  },
  "& h6": {
    fontWeight: "700",
    fontSize: "16px !important",
    lineHeight: "26px",
    fontFamily: `${theme.typography.fontFamily} !important`,
  },
  "& span": {
    fontFamily: `${theme.typography.fontFamily} !important`,
    fontSize: "inherit !important",
    fontWeight: "inherit !important",
  },
  "& ul": {
    paddingLeft: "8px",
    listStylePosition: "inside",
    fontFamily: `${theme.typography.fontFamily} !important`,
    fontWeight: "500",
    fontSize: "18px !important",
  },
  "& ol": {
    paddingLeft: "8px",
    listStylePosition: "inside",
    fontFamily: `${theme.typography.fontFamily} !important`,
    fontWeight: "500",
    fontSize: "18px !important",
  },
}));

const TypographyRenderHTML = ({ description, ...props }) => {
  return (
    <StyledTypography
      dangerouslySetInnerHTML={{ __html: description }}
      {...props}
    ></StyledTypography>
  );
};

export default TypographyRenderHTML;
