import { ReactComponent as ReviewsIcon } from "assets/svg/all/new-icons/landing-page/comments-icon.svg";
import { ReactComponent as SessionsTakenIcon } from "assets/svg/all/new-icons/landing-page/sessions-taken-icon.svg";
import { ReactComponent as BookmarkFill } from "assets/svg/offerings-page/bookmark_fill.svg";
import { ReactComponent as Bookmark } from "assets/svg/offerings-page/bookmark.svg";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Typography, Avatar, Chip, IconButton, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { setShowSignup } from "store/user-profile/userProfileSlice";

import categoryColors from "data/UserProfilePage/offeringCategoryColor";
import NoDataButton from "components/Common/Buttons/NoDataButton";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: "420px",
    // maxWidth: "420px",
    // height: "380px",
    margin: "10px",
    marginRight: "0",
    boxShadow: "none",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "14px",
    flex: 1,
    position: "relative",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 24px 5px rgba(72, 74, 158, 0.06)",
      border: "1px solid transparent",

      "& .MuiTypography-h5": {
        textDecorationColor: "black",
        textDecorationLine: "underline",
      },
    },
    "& .MuiCardMedia-img": {
      objectFit: "cover",
    },
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    "& .MuiAvatar-root": {
      marginRight: "16px",
      width: "46px",
      height: "46px",
    },
  },
  bookmark: {
    position: "absolute",
    top: "10px",
    right: "10px",
    borderRadius: "50%",
    background: "white",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const RecommendedOfferingCard = ({ data, ...props }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  const { handleBookmark, handleUnbookmark, toggleOBDialog, bookmarkAction } =
    props;
  const {
    bookmark_done,
    bookmark_id,
    user_data,
    sessions_taken,
    category,
    description,
    session_id,
    title,
    user_id,
    thumbnails,
    slot_availability,
    related_topics,
    review_count,
  } = data;

  const {
    first_name,
    last_name,
    role,
    image_url,
    slug_id,
    profile_headline_description,
  } = user_data;

  const headline = profile_headline_description
    ? profile_headline_description
    : role;
  const isOwner = (currentUser && currentUser.user_id) === user_id;

  const scheduleNavigateHandler = () => {
    if (!currentUser) {
      showSigninModal();
      return false;
    }

    const PROFILE_OBOARDING_DONE = true; //currentUser.profile_onboarding_done;
    if (!PROFILE_OBOARDING_DONE) {
      toggleOBDialog();
      return;
    }

    const url = `/schedule/${session_id}/${user_id}/slot?user=${first_name}`;
    var win = window.open(url, "_blank");
    win.focus();
  };

  const profileNavigateHandler = () => {
    const url = `/u/${slug_id}`;
    var win = window.open(url, "_blank");
    win.focus();
  };

  const viewOffering = () => {
    const url = "/offering/" + session_id;
    // var win = window.open(url, "_blank");
    // win.focus();
    history.push(url);
  };

  const showSigninModal = () => {
    dispatch(setShowSignup(true));
  };

  const openBookmarkModal = () => {
    if (!currentUser) {
      showSigninModal();
      return false;
    }

    handleBookmark(session_id);
  };

  const unbookmarkSessionHandler = () => {
    handleUnbookmark(bookmark_id, session_id);
  };

  const htmlDescription = `<p>${description}</p>`;
  const card_image = thumbnails
    ? thumbnails[0]
    : "https://mui.com/static/images/cards/contemplative-reptile.jpg";

  let filteredTopics = [];
  if (related_topics) {
    filteredTopics = related_topics.slice(0, 2);
  }
  return (
    <Card className={classes.root}>
      {bookmarkAction && !isOwner && (
        <div className={classes.bookmark}>
          {!bookmark_done && (
            <Tooltip title="Bookmark">
              <IconButton onClick={openBookmarkModal}>
                <Bookmark />
              </IconButton>
            </Tooltip>
          )}
          {bookmark_done && (
            <Tooltip title="Unbookmark">
              <IconButton onClick={unbookmarkSessionHandler}>
                <BookmarkFill />
              </IconButton>
            </Tooltip>
          )}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          right: "40px",
          top: "14px",
        }}
      >
        {sessions_taken < 0 && (
          <Tooltip title="Sessions Taken">
            <Chip
              label={sessions_taken}
              style={{
                background: "white",
                marginRight: "16px",
                paddingLeft: "8px",
              }}
              icon={<SessionsTakenIcon />}
            />
          </Tooltip>
        )}
        {review_count > 0 && (
          <Tooltip title="Reviews">
            <Chip
              label={review_count}
              style={{
                background: "white",
                marginRight: sessions_taken > 0 ? "8px" : "16px",
                paddingLeft: "8px",
              }}
              icon={<ReviewsIcon />}
            />
          </Tooltip>
        )}
      </div>
      <div onClick={viewOffering}>
        <Chip
          label={category}
          style={{
            background: categoryColors[category] || categoryColors["Default"],
            color: "white",
            fontWeight: "bold",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        />

        <CardMedia
          component="img"
          height="210"
          image={card_image}
          alt="card image"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          fontWeight={700}
          fontSize="21px"
          component="div"
          style={{
            // paddingRight: "50px",
            flex: 1,
            // height: "80px",

            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
          onClick={viewOffering}
        >
          {title}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: "8px",
          }}
        >
          {" "}
          {filteredTopics.map((item) => {
            return (
              <Chip
                label={`# ${item}`}
                style={{ fontWeight: "500", marginRight: "8px" }}
              />
            );
          })}
        </div>
        <div className={classes.avatarContainer}>
          <Avatar src={image_url} />
          <div style={{ flex: 1 }} onClick={profileNavigateHandler}>
            <Typography
              title={first_name}
              variant="h6"
              fontWeight="700"
              className="coloredHeading"
              fontSize="16px"
              style={{
                cursor: "pointer",
                //   display: "-webkit-box",
                //   overflow: "hidden",
                //   WebkitBoxOrient: "vertical",
                //   WebkitLineClamp: 1,
              }}
            >
              {first_name} {last_name}
            </Typography>
            <Typography
              title={headline}
              variant="subtitle2"
              style={{
                fontWeight: 500,
                fontSize: "14px",

                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {headline}
            </Typography>
          </div>

          {slot_availability && !isOwner && (
            <PrimaryButton
              title="Schedule"
              style={{
                height: "38px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "-10px",
              }}
              onClick={scheduleNavigateHandler}
            />
          )}

          {!slot_availability && !isOwner && (
            <NoDataButton
              title="No slots"
              style={{
                height: "38px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "-10px",
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>

    // <Paper className={classes.root}>
    //   <div className={classes.titleRow} style={{ flex: "1" }}>
    //     <Typography className={classes.title}>{title}</Typography>{" "}
    //     <div className={classes.bookmarkContainer}>
    //       {bookmark_done && !isLoading && (
    //         <IconButton
    //           className={classes.iconButton}
    //           onClick={unbookmarkSessionHandler}
    //         >
    //           <img
    //             src={bookmarkFill}
    //             alt="bookmark"
    //             style={{
    //               width: "20px",
    //             }}
    //           />
    //         </IconButton>
    //       )}

    //       {bookmark_done && isLoading && <CircularProgress />}

    //       {!bookmark_done && (
    //         <IconButton
    //           onClick={openBookmarkModal}
    //           style={{
    //             width: "20px",
    //           }}
    //         >
    //           <img src={bookmarkIcon} alt="bookmark" />
    //         </IconButton>
    //       )}
    //     </div>
    //   </div>
    //   <div>
    //     <Chip
    //       label={category}
    //       style={{
    //         background:
    //           "linear-gradient(130.09deg, #F1DFFF 8.18%, #DBE7FF 92.68%)",
    //         fontWeight: "bold",
    //         marginTop: "8px",
    //         // width: "100px",
    //       }}
    //     />
    //   </div>
    //   <Typography
    //     variant="subtitle2"
    //     fontWeight="700"
    //     color="#616161"
    //     sx={{
    //       display: "-webkit-box",
    //       overflow: "hidden",
    //       WebkitBoxOrient: "vertical",
    //       WebkitLineClamp: 2,
    //     }}
    //     style={{
    //       marginTop: "8px",
    //       marginBottom: "16px",
    //     }}
    //     dangerouslySetInnerHTML={{ __html: htmlDescription }}
    //   ></Typography>
    //   {/* User Details */}
    //   <div
    //     style={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //       flex: 1,
    //     }}
    //   >
    //     <Avatar
    //       src={image_url}
    //       style={{
    //         marginRight: "16px",
    //         width: "46px",
    //         height: "46px",
    //       }}
    //     />{" "}
    //     <div style={{ flex: 1 }}>
    //       <Typography
    //         variant="h6"
    //         fontWeight="700"
    //         fontSize="18px"
    //         className="coloredHeading"
    //         onClick={profileNavigateHandler}
    //         style={{ cursor: "pointer" }}
    //       >
    //         {first_name && first_name} {last_name && last_name}
    //       </Typography>
    //       <Typography
    //         style={{
    //           fontWeight: 500,
    //           fontSize: "14px",
    //           lineHeight: "17px",
    //         }}
    //       >
    //         {role} at {company}
    //       </Typography>
    //     </div>
    //     <PrimaryButton
    //       title="Schedule"
    //       style={{ width: "100px", height: "36px" }}
    //       onClick={scheduleNavigateHandler}
    //     />
    //   </div>
    //   {/*
    //   <Grid container spacing={2} style={{ width: "600px" }}>
    //     <Grid item xs={3} md={2} align="center">
    //       <Avatar
    //         src={
    //           image_url
    //             ? image_url
    //             : "https://mhcd.org/wp-content/uploads/2017/12/placeholder-man.png"
    //         }
    //         style={{ height: "60px", width: "60px" }}
    //       />
    //     </Grid>
    //     <Grid item xs={8} md={8} style={{ paddingLeft: "0" }}>
    //       <Typography
    //         variant="h6"
    //         fontWeight="800"
    //         fontSize="18px"
    //         className="coloredHeading"
    //         onClick={profileNavigateHandler}
    //         style={{ cursor: "pointer" }}
    //       >
    //         {first_name && first_name} {last_name && last_name}
    //       </Typography>
    //       <span
    //         style={{ marginLeft: "10px", color: "#484A9E", fontWeight: "800" }}
    //       >
    //         • Follow
    //       </span>

    //       <Typography variant="subtitle2" color="#515151" fontWeight="800">
    //         {role} at {company}
    //       </Typography>
    //       <Typography variant="subtitle2" color="#515151" fontWeight="800">
    //         {createdDate}
    //       </Typography>
    //     </Grid>
    //     <Grid
    //       item
    //       xs={2}
    //       md={2}
    //       style={{ position: "relative" }}
    //       className="center"
    //     >
    //       {bookmark_done && !isLoading && (
    //         <IconButton
    //           style={{
    //             height: "18px",
    //             position: "absolute",
    //             right: "0",
    //             top: "20px",
    //           }}
    //           onClick={unbookmarkSessionHandler}
    //         >
    //           <img src={bookmarkFill} alt="bookmark" />
    //         </IconButton>
    //       )}

    //       {bookmark_done && isLoading && (
    //         <CircularProgress
    //           style={{
    //             position: "absolute",
    //             right: "0",
    //             top: "10px",
    //             padding: "10px",
    //           }}
    //         />
    //       )}

    //       {!bookmark_done && (
    //         <IconButton
    //           style={{
    //             height: "18px",
    //             position: "absolute",
    //             right: "0",
    //             top: "20px",
    //           }}
    //           onClick={openBookmarkModal}
    //         >
    //           <img src={bookmarkIcon} alt="bookmark" />
    //         </IconButton>
    //       )}
    //     </Grid>
    //   </Grid>
    //   <Grid
    //     container
    //     spacing={2}
    //     mt={1}
    //     className={classes.recommendedCardContent}
    //   >
    //     <Grid item xs={11} md={11}>
    //       <Typography
    //         variant="h6"
    //         fontSize="20px"
    //         fontWeight="700"
    //         style={{ lineHeight: "1.1", cursor: "pointer" }}
    //         sx={{
    //           display: "-webkit-box",
    //           overflow: "hidden",
    //           WebkitBoxOrient: "vertical",
    //           WebkitLineClamp: 2,
    //         }}
    //         onClick={openModal}
    //       >
    //         {title && title}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={9} md={9}>
    //       <Chip
    //         label={category}
    //         style={{
    //           background:
    //             "linear-gradient(130.09deg, #F1DFFF 8.18%, #DBE7FF 92.68%)",
    //           fontWeight: "bold",
    //         }}
    //       />
    //     </Grid>
    //     <Grid item xs={12} md={12}>
    //       <Typography
    //         variant="subtitle2"
    //         fontWeight="700"
    //         color="#616161"
    //         sx={{
    //           display: "-webkit-box",
    //           overflow: "hidden",
    //           WebkitBoxOrient: "vertical",
    //           WebkitLineClamp: 2,
    //         }}
    //         dangerouslySetInnerHTML={{ __html: htmlDescription }}
    //       ></Typography>
    //     </Grid>

    //     <Grid
    //       item
    //       xs={4}
    //       md={4}
    //       style={{
    //         paddingTop: "0",
    //         marginTop: "16px",
    //         borderRight: "1px solid rgba(0, 0, 0, 0.1)",
    //       }}
    //     >
    //       <Typography variant="subtitle2" fontWeight="700">
    //         Session Taken
    //       </Typography>
    //       <Typography variant="subtitle2" fontWeight="700">
    //         {sessions_taken}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={4} md={4}>
    //       <Typography variant="subtitle2" fontWeight="700">
    //         Session
    //       </Typography>
    //       <Typography variant="subtitle2" fontWeight="700">
    //         {sessions_duration}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={4} md={4} align="center">
    //       <PrimaryButton
    //         title="Schedule"
    //         style={{ width: "100px", height: "36px" }}
    //         onClick={scheduleNavigateHandler}
    //       />
    //     </Grid>
    //   </Grid> */}
    // </Paper>
  );
};

RecommendedOfferingCard.propTypes = {};

export default RecommendedOfferingCard;
