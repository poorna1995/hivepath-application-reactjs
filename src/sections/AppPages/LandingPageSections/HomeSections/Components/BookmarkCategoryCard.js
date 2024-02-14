// import bin from "assets/svg/scheduler-icons/bin.svg";
// import edit from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";

import { useState } from "react";
import { Grid, Typography, IconButton, Card, CardMedia } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import bin from "assets/svg/onboarding-pages/user-profile/Delete.svg";
import edit from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";

import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { deleteBookmark } from "../../utils/homeService";

const BookmarkCategoryCard = (props) => {
  const [isLoading, setIsLoading] = useState();

  const enqueueSnackbar = useEnquequeSnackbar();
  const {
    title,
    imageUrl,
    object_id,
    fetchBookmark,
    bookmarkContent,
    setUpdateData,
  } = props;

  const defaultBookmarks = [
    "Default",
    "Colleagues",
    "Acquaintance",
    "Close Network",
  ];

  const enableActions = defaultBookmarks.includes(title);

  const deleteBookmarkHandler = () => {
    setIsLoading(true);
    deleteBookmark({ object_id: object_id })
      .then((res) => {
        setIsLoading(false);
        const { error, message } = res;
        if (!error) {
          fetchBookmark();
          enqueueSnackbar("Bookmark deleted succesfully", {
            variant: "success",
          });
          return;
        }
        enqueueSnackbar(message, { variant: "error" });
        return;
      })
      .catch((res) => {
        setIsLoading(false);
        enqueueSnackbar("An error occured", { variant: "error" });
        return;
      });
  };

  const bookmarkHandler = () => {
    setIsLoading(true);
    bookmarkContent(object_id);
  };

  const setUpdateHandler = () => {
    setUpdateData({
      imageUrl:
        imageUrl ||
        "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg",
      title: title,
      object_id: object_id,
    });
  };

  return (
    <Grid container spacing={2} mb={2}>
      <Grid
        item
        xs={8}
        md={8}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "20px",
            width: "70px",
            height: "70px",
          }}
        >
          <CardMedia
            component="img"
            height="100"
            image={
              imageUrl ||
              "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-3.jpg"
            }
            alt="placeholder"
            style={{ width: "100%", cursor: "pointer" }}
            onClick={bookmarkHandler}
          />
        </Card>

        <Typography
          variant="h6"
          color="#000"
          fontSize="18px"
          fontWeight="800"
          style={{ cursor: "pointer", marginLeft: "10px" }}
          onClick={bookmarkHandler}
        >
          {title}
        </Typography>
      </Grid>

      <Grid
        item
        xs={4}
        md={4}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        {isLoading && <CircularProgress />}

        {!isLoading && !enableActions && (
          <>
            <IconButton
              onClick={setUpdateHandler}
              style={{
                marginRight: "10px",
                height: "40px",
                width: "40px",
                background: "rgba(0, 0, 0, 0.05)",
              }}
            >
              <img src={edit} alt="action" />
            </IconButton>
            <IconButton
              onClick={deleteBookmarkHandler}
              style={{
                height: "40px",
                width: "40px",
                background: "rgba(0, 0, 0, 0.05)",
              }}
            >
              <img src={bin} alt="action" />
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default BookmarkCategoryCard;
