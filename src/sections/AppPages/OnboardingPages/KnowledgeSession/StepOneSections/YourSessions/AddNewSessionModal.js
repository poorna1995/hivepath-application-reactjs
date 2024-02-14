import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSessionsList } from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import fetchMySessions from "../../utils/fetchMySessions";
import YSCategories from "./YSComponents/Categories";
import DescriptionEditor from "./YSComponents/DescriptionEditor";
import YSTitleField from "./YSComponents/TitleField";
import { ReactComponent as CloseIcon } from "assets/svg/onboarding-pages/knowledge-session/close-icon.svg";
import KnowledgeSessionBaseDialog from "../BaseDialog";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const mapState = ({ user, sessions }) => ({
  currentUser: user.currentUser,
  session: sessions.session,
});

const AddNewSessionModal = ({ open, handleClose }) => {
  const { currentUser, session } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  // const {title, category, description} = session
  const sessionCategory = {
    label: session?.category,
    value: session?.category,
  };
  // const sessionDescription = convertFromRaw(session?.description);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [category, setCategory] = useState("");

  const [title, setTitle] = useState(session.title || "");
  const [categories, setCategories] = useState([]);
  const enqueueSnackbar = useEnquequeSnackbar();

  const dispatch = useDispatch();
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };

  useEffect(() => {
    const url = KNOWLEDGE_SESSIONS_SERVICES.FETCH_SESSION_CATEGORIES;
    const data = {
      type: "one-one",
      title: "category",
    };

    authFetch(url, data).then((json) => {
      // console.log("json categories", json.result);
      setCategories(json.result);
    });
  }, []);

  const options = categories.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const resetForm = () => {
    setTitle("");
    setEditorState(EditorState.createEmpty());
    setCategory("");
  };

  const fetchSessionList = () => {
    const data = {
      user_id: USER_ID,
    };
    fetchMySessions(data).then((json) => {
      dispatch(fetchAllSessionsList(json.result));
    });
  };

  const handleAddNewSession = () => {
    setBackdropOpen(true);
    const url = KNOWLEDGE_SESSIONS_SERVICES.CREATE_USER_OFFERING;
    const data = {
      type: "one-one",
      user_id: USER_ID,
      title: title,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      category: category.value,
    };

    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        enqueueSnackbar(json.message, {
          variant: "success",
        });

        setBackdropOpen(false);
        fetchSessionList();
        handleClose();

        resetForm();

        console.log(json);
      } else {
        enqueueSnackbar(json.message, {
          variant: "error",
        });

        setBackdropOpen(false);
      }
    });
  };

  return (
    <KnowledgeSessionBaseDialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: "26px",
          lineHeight: "32px",
          letterSpacing: "-1%",
          width: "100%",
        }}
      >
        <span> Add a New Session</span>
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

      <DialogContent>
        <YSCategories
          category={category}
          handleChange={(e) => setCategory(e)}
        />
        <YSTitleField
          title={title}
          handleChange={(e) => setTitle(e.target.value)}
        />
        <DescriptionEditor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </DialogContent>

      <DialogActions style={{ justifyContent: "center" }}>
        <PrimaryButton title={"Add Session"} onClick={handleAddNewSession} />
      </DialogActions>

      <LoadingBackdrop handleClose={handleBackdropClose} open={backdropOpen} />
    </KnowledgeSessionBaseDialog>
  );
};

export default AddNewSessionModal;
