// import bookmarkIcon from "assets/svg/user-profile/bookmark.svg";
// import bookmarkFill from "assets/svg/landing-page/bookmarkFill.svg";
import bookmarkIcon from "assets/svg/all/new-icons/general/bookmark_border.svg";
import bookmarkFill from "assets/svg/all/new-icons/general/bookmark_filled.svg";

import CircularProgress from "@mui/material/CircularProgress";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import classes from "pages/AppPages/LandingPages/LandingPage.module.css";
import { useDispatch } from "react-redux";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { useState } from "react";
import {
  showBookmarkModal,
  updateProfile,
} from "store/landing-page/landingPageSlice";

import { unbookmarkProfile } from "../../utils/homeService";
import HivepathImage from "components/Common/HivepathImage";
import { Link } from "react-router-dom";

const LPUserProfileCard = (props) => {
  const {
    imgUrl,
    userName,
    designation,
    profile_headline_description,
    user_id,
    slug_id,
    bookmark_done,
    bookmark_id,
    handleUnbookmark,
    handleBookmark,
    bookmark_name,
    topOffering,
  } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();

  const topOfferingFiltered = topOffering.filter((item) => item.title !== "");
  const headline = profile_headline_description
    ? profile_headline_description
    : designation;
	
  const navigateProfile = () => {
    const url = `/u/${slug_id}`;
    var win = window.open(url, "_blank");
    win.focus();
  };

  const openBookmarkModal = () => {
    if (handleBookmark) {
      handleBookmark(user_id);
    } else {
      enqueueSnackbar("Cannot perform bookmark", { variant: "error" });
    }
  };

  const unbookmarkProfileHandler = () => {
    setIsLoading(true);

    if (handleUnbookmark) {
      handleUnbookmark(user_id, bookmark_id, bookmark_name);
      setIsLoading(false);
      return;
    } else {
      enqueueSnackbar("Cannot Unbookmark", { variant: "error" });
    }
  };

  return (
    <div
      className={classes.profileCard}
      style={{ padding: "8px", position: "relative" }}
    >
      {!isLoading && bookmark_done && (
        <IconButton
          style={{
            height: "18px",
            position: "absolute",
            right: "20px",
            top: "30px",
            zIndex: "1",
          }}
          onClick={unbookmarkProfileHandler}
        >
          <img src={bookmarkFill} alt="bookmark" />
        </IconButton>
      )}

      {bookmark_done && isLoading && (
        <CircularProgress
          style={{
            position: "absolute",
            right: "15px",
            top: "15px",
            padding: "10px",
            zIndex: "100",
          }}
        />
      )}

      {!bookmark_done && (
        <IconButton
          style={{
            height: "18px",
            position: "absolute",
            right: "20px",
            top: "30px",
            zIndex: "100",
          }}
          onClick={openBookmarkModal}
        >
          <img
            src={bookmarkIcon}
            alt="bookmark"
            style={{ width: "28px", height: "28px" }}
          />
        </IconButton>
      )}

      <Card
        elevation={0}
        style={{
          height: "375px",
          // width: "300px",
          position: "relative",
          borderRadius: "18px",
        }}
        sx={{
          "&:hover  img": {
            transform: "scale(1.04)",
            transition: "transform 150ms",
          },
          "& .offering-info": {
            display: "none",
            height: "50%",
          },
          "&:hover .user-info": {
            display: "none",
          },

          "&:hover .offering-info": {
            width: "100%",
            height: "50%",
            // background: "white",
            display: "block",
            zIndex: "1",
            color: "white",
          },
          "&:hover gradient": {
            background: "none !important",
          },
        }}
      >
        {/* <CardMedia
          src={imgUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.76) 100%)",
          }}
          component="img"
        /> */}
        <HivepathImage
          src={imgUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.76) 100%)",
          }}
        />
        <CardContent
          className="offering-info"
          style={{
            position: "absolute",
            bottom: "10px",
            height: "auto",
          }}
        >
          {topOfferingFiltered && topOfferingFiltered.length > 0 && (
            <>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Top Rated Offerings
              </Typography>
              {topOfferingFiltered.map((item, index) => {
                const { session_id, title } = item;
                return (
                  <Link to={`/offering/${session_id}`} target="_blank">
                    <Typography
                      sx={{
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {`${index + 1}. ${title}`}
                    </Typography>
                  </Link>
                );
              })}
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              // marginBottom: "-16px",
            }}
          >
            <Button
              style={{
                background: "#43454C",
                color: "white",
                textTransform: "initial",
                marginTop: "8px",
                height: "36px",
                fontSize: "14px",
                fontWeight: "500",
                paddingLeft: "16px",
                paddingRight: "16px",
                borderRadius: "10px",
                // justifySelf: "center",
              }}
              fullWidth
              onClick={navigateProfile}
            >
              View Profile
            </Button>
          </div>
          {/* <Link to={`/u/${slug_id}`}>
            <Typography
              color="white"
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              View Profile
            </Typography>
          </Link> */}
        </CardContent>
        <div
          className="gradient"
          style={{
            // minWidth: "300px",
            width: "100%",
            height: "320px",
            // height: "100%",
            position: "absolute",
            bottom: "0px",
            background:
              " linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
          }}
        ></div>
        <CardContent
          className="user-info"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            top: "275px",
            color: "white",
            // left: "16px",
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
            {userName}
            {/* <NavLink to={`/u/${user_id}`}></NavLink> */}
          </Typography>
          <Typography
            style={{ fontSize: "16px" }}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {headline}
          </Typography>
          {/* <Typography>{offerings.map}</Typography> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LPUserProfileCard;
