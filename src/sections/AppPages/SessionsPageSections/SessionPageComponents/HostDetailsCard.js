import { Chip, Typography } from "@mui/material";
import ShortDateCard from "components/Common/Cards/ShortDateCard";
import React from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import { ReactComponent as UserGroupIcon } from "assets/svg/sessions/user-group.svg";
import { ReactComponent as StarIcon } from "assets/svg/sessions/star.svg";

const HostDetailsCard = ({
  isHost,
  userName,
  userPosition,
  sessionTitle,
  sessionCategory,
  profilePicUrl,
  rating,
}) => {
  return (
    <div>
      <PaperBase>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              lineHeight: "15px",
              color: "rgba(81, 81, 81, 1)",
            }}
          >
            {!isHost ? "HOST DETAILS" : ""}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "19px",
              color: "rgba(97, 97, 97, 1)",
            }}
          >
            Session Id:#83023
          </p>
        </div>
        {!isHost && (
          <div
            style={{
              display: "flex",
              paddingTop: "16px",
              alignItems: "center",
            }}
          >
            <img
              src={profilePicUrl || "https://source.unsplash.com/random"}
              alt=""
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
                // clipPath:'circle(50% at 50% 50%)'
              }}
            />
            <div style={{ paddingLeft: "16px" }}>
              <Typography
                style={{
                  fontWeight: "800",
                  fontSize: "24px",
                  lineHeight: "29px",
                  backgroundColor: "rgba(24, 61, 255, 1)",
                  backgroundImage:
                    "linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",

                  WebkitTextFillColor: "transparent",
                  backgroundRepeat: "repeat",
                  MozBackgroundClip: "text",
                  MozTextFillColor: "transparent",
                }}
              >
                {userName || "Ray John Abrham"}
              </Typography>
              <Typography
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "20px",
                  letterSpacing: "-3%",
                }}
              >
                {userPosition || "Ux Designer at flipkart"}
              </Typography>
              <Chip
                label={rating || "4.6(120)"}
                icon={<StarIcon />}
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  marginTop: "12px",
                  // paddingTop: "10px",
                  // paddingBottom: "10px",
                  minHeight: "34px",
                }}
              />
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            paddingTop: "16px",
          }}
        >
          <div
            style={{
              flex: 0.4,
              background: "#FCFCFC",
              border: "1px solid #FFFFFF",
              boxSizing: "border-box",
              boxShadow: "0px 0px 40px 5px rgba(72, 74, 158, 0.06)",
              borderRadius: "15px",
              height: "170px",
              width: "230px",
            }}
          >
            <div style={{ width: "40%", marginTop: "32px", marginLeft: "30%" }}>
              <ShortDateCard date={"Oct 28 2021"} head={"#FF5621"} />
            </div>
            <Typography
              style={{
                color: "rgba(72, 74, 158, 1)",
                paddingBottom: "16px",
                textAlign: "center",
                paddingTop: "8px",
              }}
            >
              02:30 PM- 03:00 PM
            </Typography>
          </div>
          <div
            style={{
              flex: 0.6,
              paddingLeft: "16px",
              marginLeft: "16px",
              borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
              height: "170px",
            }}
          >
            <Typography
              style={{
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "30px",
                // marginTop:'25%'
                paddingTop: "32px",
              }}
            >
              {sessionTitle ||
                "Did you take any special training or skill courses for your current position."}
            </Typography>
            <Chip
              label={sessionCategory || "Personal Experience"}
              icon={<UserGroupIcon />}
              style={{
                background:
                  "linear-gradient(90.59deg, #F9F7C6 1.61%, #E8FCDB 99.75%)",

                fontWeight: 600,
                fontSize: "14px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginTop: "12px",
                // paddingTop: "10px",
                // paddingBottom: "10px",
                minHeight: "34px",
              }}
            />
          </div>
        </div>
        {isHost && (
          <div style={{ marginTop: "16px" }}>
            <Typography
              style={{
                fontSize: "12px",
                fontWeight: "600",
                lineHeight: "15px",
                color: "rgba(81, 81, 81, 1)",
                textTransform: "uppercase",
              }}
            >
              Requested by (Attendee )
            </Typography>
          </div>
        )}
        {isHost && (
          <div
            style={{
              display: "flex",
              paddingTop: "16px",
              alignItems: "center",
            }}
          >
            <img
              src={profilePicUrl || "https://source.unsplash.com/random"}
              alt=""
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
                // clipPath:'circle(50% at 50% 50%)'
              }}
            />
            <div style={{ paddingLeft: "16px" }}>
              <Typography
                style={{
                  fontWeight: "800",
                  fontSize: "24px",
                  lineHeight: "29px",
                  backgroundColor: "rgba(24, 61, 255, 1)",
                  backgroundImage:
                    "linear-gradient(94.66deg, #183DFF 2.48%, #6D49D2 39.58%, #F74B35 97.47%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",

                  WebkitTextFillColor: "transparent",
                  backgroundRepeat: "repeat",
                  MozBackgroundClip: "text",
                  MozTextFillColor: "transparent",
                }}
              >
                {userName || "Ray John Abrham"}
              </Typography>
              <Typography
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "20px",
                  letterSpacing: "-3%",
                }}
              >
                {userPosition || "Ux Designer at flipkart"}
              </Typography>
              <Chip
                label={rating || "4.6(120)"}
                icon={<StarIcon />}
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  marginTop: "12px",
                  // paddingTop: "10px",
                  // paddingBottom: "10px",
                  minHeight: "34px",
                }}
              />
            </div>
          </div>
        )}
      </PaperBase>
    </div>
  );
};

export default HostDetailsCard;
