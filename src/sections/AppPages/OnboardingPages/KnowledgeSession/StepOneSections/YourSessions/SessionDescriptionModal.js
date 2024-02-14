import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactComponent as CloseIcon } from "assets/svg/onboarding-pages/knowledge-session/close-icon.svg";
import { ReactComponent as DeleteIcon } from "assets/svg/onboarding-pages/knowledge-session/delete-icon.svg";
import { ReactComponent as PencilIcon } from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditSessionModal from "./EditSessionModal";
import { useState } from "react";
import fetchMySessions from "../../utils/fetchMySessions";
import authFetch from "utils/authFetch";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useDispatch } from "react-redux";
import { fetchAllSessionsList } from "store/knowledge-sessions/knowledgeSessionsSlice";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import KnowledgeSessionBaseDialog from "./../BaseDialog";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const SessionDescriptionModal = ({ open, handleClose, data }) => {
  const { title, category, description, user_id, session_id } = data;
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();

  const newtitle = `<p>${title}</p>`;
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
    <KnowledgeSessionBaseDialog open={open} onClose={handleClose}>
      <DialogTitle
      // style={{
      //   //   textAlign: "center",
      //   fontWeight: "700",
      //   fontSize: "26px",
      //   lineHeight: "32px",
      //   letterSpacing: "-1%",
      //   width: "90%",
      // }}
      >
        <Typography
          style={{
            //   textAlign: "center",
            fontWeight: "700",
            fontSize: "26px",
            lineHeight: "32px",
            letterSpacing: "-1%",
            width: "90%",
            marginTop: "32px",
          }}
          dangerouslySetInnerHTML={{ __html: newtitle }}
        ></Typography>
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
      </DialogTitle>

      <IconButton
        onClick={handleClose}
        style={{
          top: "16px",
          right: "24px",
          position: "absolute",
          padding: "0px",
        }}
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        onClick={handleModalOpen}
        style={{
          top: "80px",
          right: "20px",
          position: "absolute",
          //   padding: "0px",
          // border: "1px solid",
          background: "white",
          boxShadow: " 0px 0px 14px rgba(72, 74, 158, 0.15)",
          padding: "16px",
        }}
      >
        <DeleteIcon style={{ height: "20px", width: "20px" }} />
      </IconButton>
      <IconButton
        onClick={handleEditModalOpen}
        style={{
          top: "160px",
          right: "20px",
          position: "absolute",
          background: "white",

          boxShadow: " 0px 0px 14px rgba(72, 74, 158, 0.15)",
          padding: "16px",

          // border: "1px solid",
          //   padding: "0px",
        }}
      >
        <PencilIcon style={{ height: "20px", width: "20px" }} />
      </IconButton>
      <Divider style={{ marginLeft: "24px", marginRight: "64px" }} />

      <DialogContent>
        <Typography
          style={{ paddingBottom: "24px", width: "95%", paddingLeft: "16px" }}
          dangerouslySetInnerHTML={{ __html: description }}
        ></Typography>
      </DialogContent>
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
      <LoadingBackdrop open={backdropOpen} handleClose={handleBackdropClose} />
    </KnowledgeSessionBaseDialog>
  );
};

export default SessionDescriptionModal;
