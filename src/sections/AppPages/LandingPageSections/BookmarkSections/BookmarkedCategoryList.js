import BSBookmarkCategoryCard from "./Components/BSBookmarkCategoryCard";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import { Skeleton, Typography, Card, CardMedia } from "@mui/material";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import BookmarkDialog from "../HomeSections/BookmarkDialog";

import noBookmark from "assets/svg/all/new-icons/empty-states/bookmarks/no-bookmark.svg";
import unionIcon from "assets/svg/landing-page/Union.svg";
import { showBookmarkModal } from "store/landing-page/landingPageSlice";
import { fetchBookmarkList } from "../utils/homeService";

import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  createContainer: {
    display: "inline-block",
    width: 150,
    margin: "10px 20px 10px 0",
    "& .MuiPaper-root": {
      boxShadow: "none",
      borderRadius: "20px",
      border: "1px solid rgba(0,0,0,0.1)",
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& .MuiCardMedia-root": {
        width: "100px",
        height: "100px",
        cursor: "pointer",
      },
    },
  },
}));

const mapState = ({ user, landingPage }) => ({
  bookmarkedSessionData: landingPage.bookmarks.sessions || {},
  bookmarkedProfilesData: landingPage.bookmarks.profiles || {},
  showBookmark: landingPage.showBookmark,
  currentUser: user.currentUser,
});

const BookmarkedCategoryList = ({ setCategory, isLoading, ...props }) => {
  const dispatch = useDispatch();
  const enqueueSnackbar = useEnquequeSnackbar();

  const muiClasses = useStyles();
  const history = useHistory();
  const [isLoadingGroups, setIsLoading] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  const loading = isLoading || isLoadingGroups;

  const {
    currentUser,
    showBookmark,
    bookmarkedSessionData,
    bookmarkedProfilesData,
  } = useSelector(mapState);

  const emptyStateNavigation = () => {
    history.push("/explore");
  };

  const openBookmarkModal = () => {
    dispatch(
      showBookmarkModal({
        open: true,
        type: "session",
        session_id: "",
        createBookmark: true,
      })
    );
  };

  const fetchBookmarkListHandler = () => {
    setIsLoading(true);

    const requestData = { user_id: currentUser.user_id };
    fetchBookmarkList(requestData).then((res) => {
      setIsLoading(false);
      const { error, message, result } = res;
      if (error) {
        enqueueSnackbar(message, { variant: "error" });
        return;
      }
      setBookmarkList(result);
    });
  };

  useEffect(() => {
    if (!showBookmark.open) {
      fetchBookmarkListHandler();
    }
  }, [showBookmark.open]);

  return (
    <>
      <BookmarkDialog open={showBookmark.open || false} />

      <Typography
        variant="h6"
        fontWeight="bold"
        fontSize="24px"
        paddingTop="20px"
      >
        Select a category
      </Typography>
      {loading && (
        <div style={{ marginTop: "10px" }}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: "150px",
              width: "150px",
              display: "inline-block",
              marginRight: "20px",
              borderRadius: "10px",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              height: "150px",
              width: "150px",
              display: "inline-block",
              marginRight: "20px",
              borderRadius: "10px",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              height: "150px",
              width: "150px",
              display: "inline-block",
              marginRight: "20px",
              borderRadius: "10px",
            }}
          />
        </div>
      )}

      {!loading && bookmarkList.length === 0 && (
        // <div></div>
        <BaseEmptyStateComponent
          imgSrc={noBookmark}
          imageStyles={{ width: "200px" }}
          message={`You currently don’t have any bookmarks in this folder! 
      `}
          shortDescription={`Find new ones.`}
          buttonTitle={`Explore`}
          onButtonClick={emptyStateNavigation}
        />
      )}

      {!loading && bookmarkList.length > 0 && (
        <div>
          {bookmarkList.map((item, index) => {
            const { bookmark_name, image_url } = item;

            return (
              <BSBookmarkCategoryCard
                key={`bscategorycard${index}`}
                setCategory={setCategory}
                title={bookmark_name}
                imageUrl={image_url}
                index={index}
              />
            );
          })}

          <div className={muiClasses.createContainer}>
            <Card onClick={openBookmarkModal}>
              <CardMedia component="img" image={unionIcon} alt="placeholder" />
            </Card>
            <Typography
              variant="h6"
              color="#000"
              fontSize="18px"
              fontWeight="800"
              align="center"
              style={{ marginTop: "10px" }}
            >
              Create
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarkedCategoryList;
