import { Alert, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const HostDeclinedMessageCard = ({ hostPage, attendeePage, content }) => {
  return (
    <div>
      <Alert
        // icon={<CheckIcon fontSize="inherit" />}
        severity="error"
        style={{
          paddingLeft: "32px",
          background: "rgba(204, 47, 47, 0.05)",
          border: "1px solid rgba(203, 30, 30, 0.5)",
          boxSizing: " border-box",
          borderRadius: " 15px",
        }}
      >
        <Typography
          style={{
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "21px",
          }}
        >
          {attendeePage && (
            <>
              <span
                style={{
                  fontWeight: " bold",

                  color: "#CC2F2F",
                }}
              >
                Host has declined your request.
              </span>{" "}
              <br />
              We have more knowledge session hosts who would love to help you!
              <br />
              <Link
                to="/explore"
                style={{
                  textDecoration: "underline",
                }}
              >
                Explore here
              </Link>
            </>
          )}
          {hostPage && (
            <>
              <span
                style={{
                  fontWeight: " bold",

                  color: "#CC2F2F",
                }}
              >{content}
                {/* Attendee has cancelled this request. */}
              </span>{" "}
              {/* <br /> */}
              {/* We have more knowledge session hosts who would love to help you! */}
              <br />
            </>
          )}
        </Typography>
      </Alert>
    </div>
  );
};

export default HostDeclinedMessageCard;
