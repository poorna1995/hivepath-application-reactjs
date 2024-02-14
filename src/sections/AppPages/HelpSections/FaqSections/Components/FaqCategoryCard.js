import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const FaqCategoryCard = ({ data, setExpanded }) => {
  const history = useHistory();
  const { title, image_url, link } = data;

  const handleNavigation = () => {
    setExpanded(true);
    // history.push(link);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "200px",
        width: { md: "265px", xs: "auto" },
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
          minWidth: "100%",
          height: "100%",
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
          top: "140px",
          color: "white",
          left: "16px",
        }}
      >
        <Typography
          style={{ fontWeight: "700", fontSize: "16px" }}
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

export default FaqCategoryCard;
