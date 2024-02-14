import { Typography } from "@mui/material";
import React from "react";
import { FaClipboard, FaGlobe } from "react-icons/fa";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";

const ShareExperienceCard = ({ dontShow }) => {
  return (
    <>
      {dontShow && (
        <div style={{ marginBottom: "16px" }}>
          <PaperBase style={{ paddingLeft: "32px" }}>
            <Typography
              fontSize="24px"
              fontWeight="700"
              lineHeight="30px"
              paddingBottom="16px"
            >
              Share your experience on social media
            </Typography>
            <Typography
              paddingBottom="16px"
              fontSize="16px"
              fontWeight="500"
              lineHeight="22px"
            >
              Let your social network know, how your knowledge session
              experience with Ray. Helps others to communicate with Ray
            </Typography>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <span
                style={{
                  padding: "8px",
                  background: " rgba(0, 0, 0, 0.03)",
                  borderRadius: "9px",
                  fontSize: "16px",
                  lineHeight: "30px",
                  fontWeight: "600",
                  alignItems: "center",
                  display: "flex",
                  width: "auto",
                  flex: "0.3",
                }}
              >
                <FaGlobe style={{ marginRight: "16px", marginLeft: "16px" }} />
                Hivepath.io/j/2312434k..
              </span>

              <span
                style={{
                  flex: "0.6",
                  color: "rgba(72, 74, 158, 1)",
                  marginLeft: "16px",
                  cursor: "pointer",
                }}
              >
                <FaClipboard /> Copy link
              </span>
            </div>
          </PaperBase>
        </div>
      )}
    </>
  );
};

export default ShareExperienceCard;
