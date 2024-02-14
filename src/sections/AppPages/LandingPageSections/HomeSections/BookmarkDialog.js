import { Typography, IconButton, Card, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { MdClose } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import BookmarkList from "./Components/BookmarkList";
import CreateBookmark from "./Components/CreateBookmark";

import {
  fetchBookmarkList,
  bookmarkSession,
  bookmarkProfile,
  createBookmark as createBookmarkService,
} from "../utils/homeService";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import authFetch from "utils/authFetch";

import {
  showBookmarkModal,
  updateSession,
  updateExploreSession,
  updateProfile,
} from "store/landing-page/landingPageSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "500px",
    maxHeight: "600px",
    padding: "30px",
    paddingTop: "10px",
  },
  "& .MuiPaper-root": {
    borderRadius: "15px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,

            color: "black",
            bgcolor: "rgba(0,0,0,0.1)",
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },

            // color: (theme) => theme.palette.grey[500],
          }}
        >
          <MdClose />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const mapState = ({ user, landingPage }) => ({
  currentUser: user.currentUser,
  showBookmark: landingPage.showBookmark,
});

export default function BookmarkDialog({ open }) {
  const dispatch = useDispatch();

  const enqueueSnackbar = useEnquequeSnackbar();
  const { currentUser, showBookmark } = useSelector(mapState);
  const { createBookmark } = showBookmark;
  const [create, setCreate] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [bookmarkList, setBookmarkList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    dispatch(showBookmarkModal({ open: false }));
    setCreate(false);
  };

  const createDefaultBookmark = () => {
    setIsLoading(true);
    authFetch(KNOWLEDGE_SESSIONS_SERVICES.CREATE_DEFAULT_BOOKMARK, {
      user_id: currentUser.user_id,
    })
      .then((res) => {
        setIsLoading(false);
        const { status, message } = res;
        if (status === "success") {
          fetchBookmarkListHandler();
          return;
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        console.log(res);
        setIsLoading(false);
        enqueueSnackbar(res.message, { variant: "error" });
      });

    // const requestData = {
    //   user_id: currentUser.user_id,
    //   bookmark_name: "Default",
    //   image_url:
    //     "https://utils.hivepath.io/api/file/abstract_(3)1640758167088.png",
    // };
    // createBookmarkService(requestData).then((res) => {
    //   const { error, message } = res;
    //   setIsLoading(false);
    //   if (!error) {
    //     fetchBookmarkListHandler();
    //     return;
    //   }

    //   enqueueSnackbar(error, { variant: "error" });
    //   return;
    // });
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
      if (result.length === 0) {
        createDefaultBookmark();
      }
      setBookmarkList(result);
    });
  };

  const bookmarkContent = async (object_id) => {
    setIsLoading(true);
    const { type, explore } = showBookmark;
    let requestData = {
      user_id: currentUser.user_id,
      bookmark_id: object_id,
    };

    if (type === "session") {
      requestData = { ...requestData, session_id: showBookmark.session_id };
      bookmarkSession(requestData)
        .then((res) => {
          setIsLoading(false);
          const { error, bookmark_object_id } = res;

          if (error) {
            enqueueSnackbar(error, { variant: "error" });
            return false;
          } else {
            if (explore) {
              dispatch(
                updateExploreSession({
                  session_id: showBookmark.session_id,
                  bookmark_done: true,
                  bookmark_id: bookmark_object_id,
                })
              );
            } else {
              dispatch(
                updateSession({
                  session_id: showBookmark.session_id,
                  bookmark_done: true,
                  bookmark_id: bookmark_object_id,
                })
              );
            }
            handleClose();
            enqueueSnackbar("Bookmarked session succesfully", {
              variant: "success",
            });
            return true;
          }
        })
        .catch((res) => {
          setIsLoading(false);
          enqueueSnackbar("An error occured", { variant: "error" });
          return false;
        });
    } else {
      requestData = { ...requestData, profile_id: showBookmark.user_id };
      bookmarkProfile(requestData).then((res) => {
        const { error } = res;
        if (error) {
          enqueueSnackbar(error, { variant: "error" });
          return;
        } else {
          dispatch(
            updateProfile({
              user_id: showBookmark.user_id,
              bookmark_done: true,
            })
          );
          handleClose();
          enqueueSnackbar("Bookmarked profile succesfully", {
            variant: "success",
          });
          return true;
        }
      });
    }
  };

  const setUpdateHandler = (data) => {
    setCreate(true);
    setUpdateData(data);
  };

  const backHandler = () => {
    setCreate(false);
    setUpdateData(null);
  };

  useEffect(() => {
    fetchBookmarkListHandler();
  }, []);

  useEffect(() => {
    setCreate(createBookmark);
  }, [createBookmark]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        {/* <Typography variant="h6" color="#000" fontWeight="800" align="center"> */}
        Your bookmarks
        {/* </Typography> */}
      </BootstrapDialogTitle>
      <DialogContent>
        {!create && (
          <BookmarkList
            createHandler={setCreate}
            fetchBookmark={fetchBookmarkListHandler}
            bookmarkList={bookmarkList}
            bookmarkContent={bookmarkContent}
            isLoading={isLoading}
            setUpdateData={setUpdateHandler}
          />
        )}
        {create && (
          <CreateBookmark
            backHandler={createBookmark ? handleClose : backHandler}
            fetchBookmark={fetchBookmarkListHandler}
            isLoading={isLoading}
            updateData={updateData}
          />
        )}
      </DialogContent>
    </BootstrapDialog>
  );
}
