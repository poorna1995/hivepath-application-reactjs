import unionIcon from "assets/svg/landing-page/Union.svg";
import { Grid, Typography, Card } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import BookmarkCategoryCard from "./BookmarkCategoryCard";

const BookmarkList = ({ createHandler, ...props }) => {
  const {
    bookmarkList,
    fetchBookmark,
    bookmarkContent,
    isLoading,
    setUpdateData,
  } = props;

  return (
    <>
      <Grid container spacing={2} mb={2}>
        <Grid
          item
          xs={2}
          md={12}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "20px",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              maxWidth: 345,
              height: "70px",
              width: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => createHandler(true)}
          >
            <img src={unionIcon} />
          </Card>
          <Typography
            variant="h6"
            color="#000"
            fontSize="18px"
            fontWeight="800"
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={() => createHandler(true)}
          >
            Create new group
          </Typography>
        </Grid>
      </Grid>

      {bookmarkList.map((item) => {
        const { bookmark_name, image_url, object_id } = item;
        return (
          <BookmarkCategoryCard
            key={object_id}
            title={bookmark_name}
            imageUrl={image_url}
            object_id={object_id}
            fetchBookmark={fetchBookmark}
            bookmarkContent={bookmarkContent}
            setUpdateData={setUpdateData}
          />
        );
      })}
    </>
  );
};

export default BookmarkList;
