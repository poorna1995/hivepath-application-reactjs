import { Avatar, Button, Card, Skeleton, Typography } from "@mui/material";
import GradientText from "components/Common/Typography/GradientText";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const mapState = ({ view }) => ({
  viewType: view.userType,
});
const MyUserCard = ({ data, loading }) => {
  const { viewType } = useSelector(mapState);
  const hostView = viewType === "host";
  const { name, image_url, company, role, following, user_id, slug_id } = data;
  return (
    <div style={{ padding: "8px" }}>
      <Card
        sx={{
          display: "flex",
          // boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
          boxShadow: "none",
          borderRadius: "20px",
          height: "100px",
          padding: "32px",
          alignItems: "center",
          flex: 1,
          border: "1px solid rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
            border: "1px solid transparent",
          },
        }}
      >
        {image_url ? <Avatar src={image_url} /> : <Avatar />}

        <div style={{ marginLeft: "16px", flex: "1" }}>
          <Link to={`/u/${slug_id}`} target={"_blank"}>
            <GradientText style={{ fontSize: "18px", fontWeight: "700" }}>
              {name}
            </GradientText>
          </Link>
          <Typography>
            {role} at {company}
          </Typography>
        </div>
        <div style={{ justifySelf: "flex-end" }}>
          {following ? (
            <span
              style={{
                color: "rgba(65, 189, 115, 1)",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "22px",
                letterSpacing: "-.01em",
              }}
            >
              Following
            </span>
          ) : (
            <>
              {!hostView && (
                <Button
                  style={{
                    fontSize: "18px",
                    lineHeight: "22px",
                    fontWeight: 600,
                    letterSpacing: "-.01em",
                    color: "#484A9e",
                    textTransform: "capitalize",
                  }}
                >
                  Follow
                </Button>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MyUserCard;
