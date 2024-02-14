import { Button, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdContentCopy, MdCheck } from "react-icons/md";

const ReferCodeCopyComponent = ({ referral_link }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);
  };

  return (
    <>
      {referral_link && (
        <div
          style={{ display: "flex", alignItems: "center", paddingLeft: "32px" }}
        >
          {" "}
          <Typography
            fontWeight={`500`}
            fontSize="14px"
            sx={{
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Public access code:
          </Typography>
          <div
            style={{
              padding: "0px",
              paddingLeft: "8px",
              paddingRight: "8px",
              border: "1px dashed rgba(0,0,0,0.5)",
              borderRadius: "5px",
              marginLeft: "8px",
            }}
          >
            <CopyToClipboard onCopy={onCopy} text={referral_link}>
              <span
                style={{
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "700",
                  marginLeft: "8px",
                  marginRight: "8px",
                }}
              >
                {" "}
                {referral_link}
              </span>
            </CopyToClipboard>
            {copied ? (
              <IconButton
                style={{ color: "black", textTransform: "capitalize" }}
                startIcon={<MdCheck />}
              >
                <MdCheck />
              </IconButton>
            ) : (
              <CopyToClipboard onCopy={onCopy} text={referral_link}>
                <IconButton
                  style={{ color: "black", textTransform: "capitalize" }}
                  startIcon={<MdContentCopy />}
                >
                  <MdContentCopy />
                </IconButton>
              </CopyToClipboard>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReferCodeCopyComponent;
