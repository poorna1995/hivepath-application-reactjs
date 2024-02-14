import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllSessionsList } from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";
import fetchMySessions from "../../utils/fetchMySessions";
import YSCategories from "./YSComponents/Categories";
import DescriptionEditor from "./YSComponents/DescriptionEditor";
import YSTitleField from "./YSComponents/TitleField";
import { ReactComponent as CloseIcon } from "assets/svg/onboarding-pages/knowledge-session/close-icon.svg";
import KnowledgeSessionBaseDialog from "../BaseDialog";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
const EditSessionModal = ({ open, handleClose, data }) => {
  const { title, category, session_id, user_id, description } = data;

  const thisSessionCategory = {
    label: category,
    value: category,
  };
  const [sessionCategory, setCategory] = useState(thisSessionCategory || "");

  const [sessionTitle, setTitle] = useState(title || "");
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
  const enqueueSnackbar = useEnquequeSnackbar();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const fetchSessionList = () => {
    const data = {
      user_id,
    };
    fetchMySessions(data).then((json) => {
      dispatch(fetchAllSessionsList(json?.result));
    });
  };
  const handleEditSession = () => {
    const url = KNOWLEDGE_SESSIONS_SERVICES.UPDATE_USER_OFFERING;
    const data = {
      user_id: user_id,
      type: "one-one",
      session_id: session_id,
      title: sessionTitle,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      category: sessionCategory.value,
    };
    console.log(data);
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          fetchSessionList();

          enqueueSnackbar(json.message, {
            variant: "success",
          });
          handleClose();
        } else {
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
        console.log(json);
      })
      .catch((err) => console.log(err));
  };

  return (
    <KnowledgeSessionBaseDialog open={open} scroll="paper">
      <DialogTitle
        style={{
          paddingTop: "32px",
          textAlign: "center",
          fontWeight: "700",
          fontSize: "26px",
          lineHeight: "32px",
          letterSpacing: "-1%",
        }}
      >
        Edit Session Details
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

      <DialogContent
        style={
          {
            // paddingBottom: "32px"
          }
        }
      >
        <YSCategories
          category={sessionCategory}
          handleChange={(e) => setCategory(e)}
        />
        <YSTitleField
          title={sessionTitle}
          handleChange={(e) => setTitle(e.target.value)}
        />
        <DescriptionEditor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <PrimaryButton title="Save" onClick={handleEditSession} />
      </DialogActions>
    </KnowledgeSessionBaseDialog>
  );
};

export default EditSessionModal;
