import format from "date-fns-tz/format";
// import bookmarkIcon from "assets/svg/user-profile/bookmark.svg";
import CircularProgress from "@mui/material/CircularProgress";
import bookmarkIcon from "assets/svg/landing-page/bookmarkFill.svg";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import {
  Container,
  Avatar,
  Grid,
  Typography,
  Chip,
  IconButton,
  Paper,
  CardContent,
  CardMedia,
  Card,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import classes from "pages/AppPages/LandingPages/LandingPage.module.css";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useState } from "react";
import { updateBookmarks } from "store/landing-page/landingPageSlice";
import { unbookmarkSession } from "../../utils/homeService";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: "420px",
    maxWidth: "420px",
    // height: "420px",
    margin: "10px",
    boxShadow: "0px 0px 24px rgba(72, 74, 158, 0.1)",
    borderRadius: "14px",
    position: "relative",
    "&:hover": {
      cursor: "pointer",
      background: "#f7f7f7",
      "& .MuiTypography-h5": {
        textDecorationColor: "black",
        textDecorationLine: "underline",
      },
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
    top: "240px",
    right: "20px",
    borderRadius: "50%",
    background: "white",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const mapState = ({ landingPage }) => ({
  bookmarkData: landingPage.bookmarks,
});

const BSSessionCard = ({ data, bookmark_name, ...props }) => {
  const dispatch = useDispatch();
  const { bookmarkData } = useSelector(mapState);
  const [isLoading, setIsLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const { object_id, user_data, session_data } = data;
  const { name, role, image_url, company, user_id } = user_data;
  const {
    category,
    description,
    session_duration,
    title,
    sessions_taken,
    session_id,
    thumbnails,
  } = session_data;

  const { setModalData, modalHandler } = props;

  const createdDate = format(new Date(), "MMMM L, Y");

  const scheduleNavigateHandler = () => {
    const url = `/schedule/${session_id}/${user_id}/slot?user=${
      name.split(" ")[0]
    }`;
    var win = window.open(url, "_blank");
    win.focus();
  };

  const profileNavigateHandler = () => {
    const url = `/u/${user_id}`;
    var win = window.open(url, "_blank");
    win.focus();
  };

  const openModal = () => {
    const scheduleLink = `/schedule/${session_id}/${user_id}/slot?user=${
      name.split(" ")[0]
    }`;
    setModalData({
      title: title,
      description: description,
      category: category,
      scheduleLink: scheduleLink,
      sessions_duration: session_duration,
      sessions_taken: sessions_taken,
    });
    modalHandler(true);
  };

  const unbookmarkSessionHandler = () => {
    const elementsIndex = bookmarkData.sessions[bookmark_name].data.findIndex(
      (element) => element.object_id === object_id
    );
    let newArray = [...bookmarkData.sessions[bookmark_name].data];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      unbookmarked: true,
    };

    setIsLoading(true);
    unbookmarkSession({ object_id: object_id })
      .then((res) => {
        setIsLoading(false);
        const { error } = res;
        if (!error) {
          enqueueSnackbar("Unbookmarked succesfully", { variant: "success" });
          dispatch(
            updateBookmarks({
              ...bookmarkData,
              sessions: {
                ...bookmarkData.sessions,
                [bookmark_name]: {
                  ...bookmarkData.sessions[bookmark_name],
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

  const htmlDescription = `<p>${description}</p>`;
  const viewOffering = () => {
    history.push(`/offering/${session_id}`);
  };
  return (
    <div style={{ padding: "" }}>
      <Card className={classes.root}>
        <div className={classes.bookmark}>
          {/* {!bookmark_done && (
          // <IconButton onClick={openBookmarkModal}>
            <Bookmark />
          </IconButton>
        )} */}
          {/* {bookmark_done && ( */}
          <IconButton onClick={unbookmarkSessionHandler}>
            <img src={bookmarkIcon} alt="bookmark" />
          </IconButton>
          {/* )} */}
        </div>
        <div onClick={viewOffering}>
          <Chip
            label={category}
            style={{
              // background: categoryColors[category] || categoryColors["Default"],
              color: "white",
              fontWeight: "bold",
              position: "absolute",
              top: "10px",
              left: "10px",
            }}
          />
          {thumbnails && (
            <CardMedia
              component="img"
              height="250"
              image={thumbnails[0]}
              alt="card image"
            />
          )}
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            fontWeight={700}
            fontSize="21px"
            component="div"
            style={{
              paddingRight: "50px",
              height: "80px",

              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
            onClick={viewOffering}
          >
            {title}
          </Typography>

          <div className={classes.avatarContainer}>
            <Avatar src={image_url} />
            <div style={{ flex: 1 }} onClick={profileNavigateHandler}>
              <Typography
                // title={first_name}
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
                {name}
                {/* {first_name} {last_name} */}
              </Typography>
              <Typography
                title={role}
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
                {role} at {company}
              </Typography>
            </div>

            <PrimaryButton
              title="Schedule"
              style={{
                height: "30px",
                width: "auto",
                fontSize: "14px",
                marginBottom: "-10px",
              }}
              onClick={scheduleNavigateHandler}
            />
          </div>
        </CardContent>
      </Card>
    </div>

    //  <Grid container spacing={2}>
    //   <Grid item xs={1} md={1} align="left">
    //     <Avatar
    //       src={
    //         image_url
    //           ? image_url
    //           : "https://mhcd.org/wp-content/uploads/2017/12/placeholder-man.png"
    //       }
    //       style={{ height: "60px", width: "60px" }}
    //     />
    //   </Grid>
    //   <Grid item xs={8} md={8} align="left" style={{ paddingLeft: "25px" }}>
    //     <Typography
    //       variant="h6"
    //       fontWeight="800"
    //       fontSize="18px"
    //       className="coloredHeading"
    //       onClick={profileNavigateHandler}
    //       style={{ cursor: "pointer" }}
    //     >
    //       {name}
    //     </Typography>
    //     <span
    //       style={{ marginLeft: "10px", color: "#484A9E", fontWeight: "800" }}
    //     >
    //       • Follow
    //     </span>

    //     <Typography variant="subtitle2" color="#515151" fontWeight="800">
    //       {role} at {company}
    //     </Typography>
    //     <Typography variant="subtitle2" color="#515151" fontWeight="800">
    //       {createdDate}
    //     </Typography>
    //   </Grid>
    //   <Grid
    //     item
    //     xs={3}
    //     md={3}
    //     style={{ position: "relative" }}
    //     className="center"
    //   >
    //     {isLoading && (
    //       <CircularProgress
    //         style={{
    //           position: "absolute",
    //           right: "0",
    //           top: "10px",
    //           padding: "10px",
    //         }}
    //       />
    //     )}

    //     {!isLoading && (
    //       <IconButton
    //         style={{
    //           height: "18px",
    //           position: "absolute",
    //           right: "0",
    //           top: "20px",
    //         }}
    //         onClick={unbookmarkSessionHandler}
    //       >
    //         <img src={bookmarkIcon} alt="bookmark" />
    //       </IconButton>
    //     )}
    //   </Grid>
    // </Grid>

    // <Grid
    //   container
    //   spacing={2}
    //   mt={1}
    //   className={classes.recommendedCardContent}
    // >
    //   <Grid item xs={11} md={11}>
    //     <Typography
    //       variant="h6"
    //       fontSize="20px"
    //       fontWeight="700"
    //       style={{ lineHeight: "1.1", cursor: "pointer" }}
    //       sx={{
    //         display: "-webkit-box",
    //         overflow: "hidden",
    //         WebkitBoxOrient: "vertical",
    //         WebkitLineClamp: 2,
    //       }}
    //       onClick={openModal}
    //     >
    //       {title && title}
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={9} md={9}>
    //     <Chip
    //       label={category}
    //       style={{
    //         background:
    //           "linear-gradient(130.09deg, #F1DFFF 8.18%, #DBE7FF 92.68%)",
    //         fontWeight: "bold",
    //       }}
    //     />
    //   </Grid>
    //   <Grid item xs={12} md={12}>
    //     <Typography
    //       variant="subtitle2"
    //       fontWeight="700"
    //       color="#616161"
    //       sx={{
    //         display: "-webkit-box",
    //         overflow: "hidden",
    //         WebkitBoxOrient: "vertical",
    //         WebkitLineClamp: 2,
    //       }}
    //       dangerouslySetInnerHTML={{ __html: htmlDescription }}
    //     ></Typography>
    //   </Grid>

    //   <Grid
    //     item
    //     xs={3}
    //     md={3}
    //     style={{
    //       paddingTop: "0",
    //       marginTop: "16px",
    //       borderRight: "1px solid rgba(0, 0, 0, 0.1)",
    //     }}
    //   >
    //     <Typography variant="subtitle2" fontWeight="700">
    //       Session Taken
    //     </Typography>
    //     <Typography variant="subtitle2" fontWeight="700">
    //       {sessions_taken}
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={3} md={5}>
    //     <Typography variant="subtitle2" fontWeight="700">
    //       Session
    //     </Typography>
    //     <Typography variant="subtitle2" fontWeight="700">
    //       {session_duration}
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={4} md={4} align="center">
    //     <PrimaryButton
    //       title="Schedule"
    //       style={{ width: "100px", height: "36px" }}
    //       onClick={scheduleNavigateHandler}
    //     />
    //   </Grid>
    // </Grid> */}
  );
};

export default BSSessionCard;
