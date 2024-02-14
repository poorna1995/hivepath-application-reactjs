import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSessionsList } from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import fetchMySessions from "../../utils/fetchMySessions";
import YSCategories from "../YourSessions/YSComponents/Categories";
import DescriptionEditor from "../YourSessions/YSComponents/DescriptionEditor";
import YSTitleField from "../YourSessions/YSComponents/TitleField";
import { ReactComponent as CloseIcon } from "assets/svg/onboarding-pages/knowledge-session/close-icon.svg";
import KnowledgeSessionBaseDialog from "../BaseDialog";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const EditSuggestedSessionModal = ({ open, handleClose, data }) => {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;

  const { title, category, description } = data;

  const sessionCategory = {
    label: category,
    value: category,
  };
  // const description = session.description
  // const sessionDescription = convertFromRaw(session?.description);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [mycategory, setCategory] = useState(sessionCategory || "");

  const [mytitle, setTitle] = useState(title || "");
  const [categories, setCategories] = useState([]);
  const enqueueSnackbar = useEnquequeSnackbar();

  const html = `<p>${description}</p>`;
  const blocksFromHTML = convertFromHTML(html);
  const sessionContent = ContentState.createFromBlockArray(blocksFromHTML);
  var myEditorState = EditorState;
  var myContentState = ContentState;
  // console.log(sessionDescription);
  const [editorState, setEditorState] = useState(
    myEditorState.createWithContent(
      // myContentState.createFromText(description) ||
      sessionContent
    )
  );

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
      category: mycategory.value,
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
        }}
      >
        Add a New Session
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
          category={mycategory}
          handleChange={(e) => setCategory(e)}
        />
        <YSTitleField
          title={mytitle}
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

export default EditSuggestedSessionModal;
