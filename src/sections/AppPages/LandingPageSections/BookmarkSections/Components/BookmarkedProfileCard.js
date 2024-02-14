// import bookmarkIcon from "assets/svg/user-profile/bookmark.svg";
import bookmarkIcon from "assets/svg/landing-page/bookmarkFill.svg";

import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

import { updateBookmarks } from "store/landing-page/landingPageSlice";
import { unbookmarkProfile } from "../../utils/homeService";

const mapState = ({ landingPage }) => ({
  bookmarkData: landingPage.bookmarks,
});

const BookmarkedProfileCard = ({ data, bookmark_name, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  //   const history = useHistory();
  const enqueueSnackbar = useEnquequeSnackbar();

  const { bookmarkData } = useSelector(mapState);

  const { company, first_name, object_id, role, user_id, image_url, slug_id } =
    data;

  const unbookmarkProfileHandler = () => {
    const elementsIndex = bookmarkData.profiles[bookmark_name].data.findIndex(
      (element) => element.object_id === object_id
    );
    let newArray = [...bookmarkData.profiles[bookmark_name].data];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      unbookmarked: true,
    };

    setIsLoading(true);
    unbookmarkProfile({ object_id: object_id })
      .then((res) => {
        setIsLoading(false);
        const { error } = res;
        if (!error) {
          enqueueSnackbar("Unbookmarked succesfully", { variant: "success" });
          dispatch(
            updateBookmarks({
              ...bookmarkData,
              profiles: {
                ...bookmarkData.profiles,
                [bookmark_name]: {
                  ...bookmarkData.profiles[bookmark_name],
                  data: [...newArray],
                },
              },
            })
          );
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res);
        enqueueSnackbar("An error occured", { variant: "error" });
        return;
      });
  };

  const navigateToProfile = () => {
    const url = `/u/${slug_id}`;
    var win = window.open(url, "_blank");
    win.focus();

    // history.push("/user/" + user_id);
  };

  return (
    <Card
      elevation={0}
      style={{
        height: "300px",
        width: "275px",
        position: "relative",
        borderRadius: "18px",
        display: "inline-block",
        margin: "10px",
      }}
    >
      {isLoading && (
        <CircularProgress
          style={{
            position: "absolute",
            right: "5px",
            top: "10px",
            padding: "10px",
          }}
        />
      )}

      {!isLoading && (
        <IconButton
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            zIndex: "10",
          }}
          onClick={unbookmarkProfileHandler}
        >
          <img src={bookmarkIcon} alt="bookmark" />
        </IconButton>
      )}

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
          top: "200px",
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
            cursor: "pointer",
          }}
          onClick={navigateToProfile}
        >
          {first_name}
        </Typography>
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            cursor: "pointer",
          }}
          onClick={navigateToProfile}
        >
          {role} at {company}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookmarkedProfileCard;
