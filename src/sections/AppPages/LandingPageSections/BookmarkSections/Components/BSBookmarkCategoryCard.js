import img1 from "assets/images/placeholder-images/img1.png";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";

const BSBookmarkCategoryCard = ({ setCategory, ...props }) => {
  const { title, imageUrl, index } = props;
  return (
    <div
      style={{
        display: "inline-block",
        maxWidth: 150,
        margin: "10px 20px 10px 0",
      }}
    >
      <Card
        onClick={() => setCategory(title)}
        style={{
          boxShadow: "none",
          borderRadius: "20px",
          height: "150px",
          width: "150px",
        }}
      >
        <CardMedia
          component="img"
          image={
            imageUrl ||
            "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg"
          }
          alt="placeholder"
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
        />
      </Card>
      <Typography
        variant="h6"
        color="#000"
        fontSize="18px"
        fontWeight="800"
        align="center"
        style={{ marginTop: "10px", wordBreak:"break-all" }}
      >
        {title}
      </Typography>
    </div>
  );
};

export default BSBookmarkCategoryCard;
