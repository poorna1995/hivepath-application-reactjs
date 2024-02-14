import {
  Chip,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  fetchAllSessionsList,
  editSessionStart,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import fetchMySessions from "../../utils/fetchMySessions";
import { ReactComponent as DeleteIcon } from "assets/svg/onboarding-pages/knowledge-session/delete-icon.svg";
import { ReactComponent as PencilIcon } from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";

import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditSessionModal from "./EditSessionModal";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import SessionDescriptionModal from "./SessionDescriptionModal";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const useStyles = makeStyles((theme) => ({
  card: {
    // background:'red !important',
    border: "1px solid transparent !important",
    "&:hover": {
      boxShadow: "0px 4px 24px rgba(72, 74, 158, 0.05) !important",
      border: "1px solid #484A9E !important",
      // background: "blue !important",
    },
  },
}));

const SessionCard = ({ data, loading }) => {
  const classes = useStyles();
  const { title, category, description, session_id, user_id } = data;
  const [backdropOpen, setBackdropOpen] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

  const sessionData = {
    title,
    category,
    description,
    session_id,
    user_id,
  };
  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };
  const handleDescriptionModalOpen = () => setDescriptionModalOpen(true);
  const handleDescriptionModalClose = () => setDescriptionModalOpen(false);
  const handleEdit = () => {
    const data = {
      title,
      category,
      description,
    };
    dispatch(editSessionStart(data));
  };
  const handleEditSession = () => {
    const url = KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING;
    const data = {
      user_id: user_id,
      type: "one-one",
      session_id: session_id,
      title: "",
      description: "",
      category: "",
    };
    authFetch(url, data).then((json) => console.log(json));
  };

  const handleDeleteSession = (e) => {
    setBackdropOpen(true);
    const url = KNOWLEDGE_SESSIONS_SERVICES.DELETE_USER_OFFERING;
    const data = {
      user_id: user_id,
      session_id: session_id,
      type: "one-one",
    };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        const fetchMyData = {
          user_id: user_id,
        };
        fetchMySessions(fetchMyData).then((json) => {
          dispatch(fetchAllSessionsList(json.result));
        });
        enqueueSnackbar(json.message, {
          variant: "success",
        });
        setBackdropOpen(false);
      } else {
        enqueueSnackbar(json.message, {
          variant: "error",
        });
        setBackdropOpen(false);
      }
      console.log(json);
    });
  };
  return (
    <div style={{ padding: "8px", paddingLeft: "16px", paddingRight: "16px" }}>
      <Paper
        className={classes.card}
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
          border: "4px solid #FFFFFF",
          boxShadow: "none",
          zindex: "0",
        }}
      >
        <Grid
          container
          style={{
            padding: "16px",
            // borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
          alignItems="center"
        >
          <Grid
            item
            xs={10}
            style={{
              textAlign: "left",
              paddingLeft: "8px",
              cursor: "pointer",
            }}
            onClick={handleDescriptionModalOpen}
          >
            <Typography
              style={{
                fontWeight: 700,
                fontSize: "22px",
                textAlign: "left",
              }}
            >
              {title}
            </Typography>

            <Chip
              label={category}
              style={{
                background:
                  "linear-gradient(90.59deg, #FFE5F2 1.61%, #FEEADC 99.75%)",
                fontWeight: 600,
                fontSize: "14px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginTop: "12px",
                // paddingTop: "10px",
                // paddingBottom: "10px",
                minHeight: "34px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ fontWeight: 500, fontSize: "16px", zIndex: "3" }}
          >
            <IconButton onClick={handleEditModalOpen}>
              <PencilIcon style={{ height: "20px", width: "20px" }} />
            </IconButton>
            <IconButton onClick={handleModalOpen}>
              <DeleteIcon style={{ height: "20px", width: "20px" }} />
            </IconButton>
          </Grid>{" "}
          <DeleteConfirmModal
            open={openModal}
            handleClose={handleModalClose}
            handleDelete={handleDeleteSession}
          />
          <EditSessionModal
            open={editModalOpen}
            handleClose={handleEditModalClose}
            data={data}
          />
          <LoadingBackdrop
            open={backdropOpen}
            handleClose={handleBackdropClose}
          />
        </Grid>
      </Paper>
      <SessionDescriptionModal
        open={descriptionModalOpen}
        handleClose={handleDescriptionModalClose}
        data={data}
      />
    </div>
  );
};

export default SessionCard;
