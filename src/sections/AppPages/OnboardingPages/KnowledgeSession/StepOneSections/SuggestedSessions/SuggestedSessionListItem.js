import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import React from "react";
import { FaEdit, FaPencilAlt, FaPlus } from "react-icons/fa";
import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";
import authFetch from "utils/authFetch";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import fetchMySessions from "../../utils/fetchMySessions";
import {
  createNewSession,
  fetchAllSessionsList,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { ReactComponent as PlusIcon } from "assets/svg/onboarding-pages/knowledge-session/plus-icon.svg";
import { ReactComponent as PencilIcon } from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";
import EditSuggestedSessionModal from "./EditSuggestedSessionModal";
import { makeStyles } from "@mui/styles";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles((theme) => ({
  item: {
    width: "100%",
    // background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
    paddingBottom: "16px",
    paddingTop: "16px",
    paddingLeft: "16px",

    "&:hover": {
      background: "#f3f3f3",
      borderBottom: "2px solid transparent",
      "&>div": {
        opacity: 1,
      },
    },

    // "& > .actions": {
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "space-between",
    //   paddingRight: "8px",
    // },

    "&>div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: "8px",
      opacity: 0,
      "&:hover": {
        opacity: 1,
      },
    },
  },
  // actions: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingRight: "8px",
  //   opacity: 0,
  //   "&:hover": {
  //     opacity: 1,
  //   },
  // },
}));

const SuggestedSessionListItem = ({ category, title, description }) => {
  const classes = useStyles();
  const [backdropOpen, setBackdropOpen] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [openModal, setOpenModal] = useState(false);
  const popupState = usePopupState({
    variant: "popover",
    popupId: "suggestedSessionPopover",
  });
  const USER_ID = currentUser.user_id;
  const sessionData = {
    category,
    title,
    description,
  };
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };
  const fetchSessionList = () => {
    const data = {
      user_id: USER_ID,
    };
    fetchMySessions(data).then((json) => {
      dispatch(fetchAllSessionsList(json.result));
    });
  };

  const handleClickEdit = () => {
    const data = {
      category,
      title,
      description,
    };
    dispatch(createNewSession(data));
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);
  const handleAddNewSession = () => {
    setBackdropOpen(true);
    const url = KNOWLEDGE_SESSIONS_SERVICES.CREATE_USER_OFFERING;
    const data = {
      type: "one-one",
      user_id: USER_ID,
      title: title,
      description: description,
      category: category,
    };

    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        enqueueSnackbar(json.message, {
          variant: "success",
        });

        setBackdropOpen(false);
        fetchSessionList();

        console.log(json);
      } else {
        enqueueSnackbar(json.message, {
          variant: "error",
        });

        setBackdropOpen(false);
      }
    });
    // resetForm();
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.item} {...bindHover(popupState)}>
        <Typography
          fontWeight="600"
          fonstSizer="18px"
          letterSpacing="-0.03em"
          lineHeight="22px"
        >
          {title}
        </Typography>
        <div className={classes.actions}>
          <IconButton onClick={handleAddNewSession}>
            <PlusIcon style={{ height: "20px", width: "20px" }} />
          </IconButton>
          <IconButton onClick={handleClickEdit}>
            <PencilIcon style={{ height: "20px", width: "20px" }} />
          </IconButton>
        </div>
      </div>
      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "left",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "left",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
            borderRadius: "20px",
            maxWidth: "370px",
            padding: "16px",
          },
        }}
      >
        {/* <Paper
          style={{
            maxWidth: "300px",
            padding: "16px",
            boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
            borderRadius: "15px",
          }}
        > */}
        <Typography
          style={{
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "29px",
            paddingBottom: "16px",
            letterSpacing: "-0.03em",
          }}
        >
          Description
        </Typography>
        <Typography fontSize="16px" lineHeight="20px" letterSpacing="3%">
          {description}
        </Typography>
        {/* </Paper> */}
      </HoverPopover>
      <LoadingBackdrop open={backdropOpen} handleClose={handleBackdropClose} />
      <EditSuggestedSessionModal
        open={openModal}
        handleClose={handleModalClose}
        data={sessionData}
      />
    </div>
  );
};

export default SuggestedSessionListItem;
