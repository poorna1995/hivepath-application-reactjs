import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const HelpCategoryCard = ({ data }) => {
  const history = useHistory();
  const { title, image_url, link } = data;

  const handleNavigation = () => {
    // history.push(link);
    var win = window.open(link, "_blank");
    win.focus();
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "240px",
        width: {
          xs: "auto",
          md: "270px",
        },
        position: "relative",
        borderRadius: "18px",
        display: "inline-block",
        margin: "10px",
        cursor: "pointer",
      }}
      onClick={handleNavigation}
    >
      <CardMedia
        src={image_url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.76) 100%)",
        }}
        component="img"
      />
      <div
        style={{
          minWidth: "300px",
          height: "375px",
          position: "absolute",
          top: "0px",
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.76) 100%)",
        }}
      ></div>
      <CardContent
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: "170px",
          color: "white",
          left: "16px",
        }}
      >
        <Typography
          style={{ fontWeight: "700", fontSize: "24px" }}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HelpCategoryCard;
