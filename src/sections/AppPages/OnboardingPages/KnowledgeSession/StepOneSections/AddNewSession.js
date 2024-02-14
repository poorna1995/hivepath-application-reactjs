import { InputLabel, Paper, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import React, { Component } from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, Modifier, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";
import draftToHtml from "draftjs-to-html";
import { FaCode } from "react-icons/fa";
import code from "assets/svg/onboarding-pages/knowledge-session/code-solid.svg";
import { useEffect } from "react";
import authFetch from "utils/authFetch";
import { useDispatch, useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import fetchMySessions from "../utils/fetchMySessions";
import { fetchAllSessionsList } from "store/knowledge-sessions/knowledgeSessionsSlice";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "⭐",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return <div onClick={this.addStar}>⭐</div>;
  }
}

const mapState = ({ user, sessions }) => ({
  currentUser: user.currentUser,
  session: sessions.session,
});

const AddNewSession = () => {
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

        console.log(json);
      } else {
        enqueueSnackbar(json.message, {
          variant: "error",
        });

        setBackdropOpen(false);
      }
    });
    resetForm();
  };

  return (
    <div style={{ height: "100%" }}>
      <Paper
        style={{
          padding: "32px",
          height: "800px",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Typography
          style={{
            fontSize: "28px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Add a new Session
        </Typography>
        <FormSelectInput
          title="Category"
          options={options}
          value={category}
          onChange={(e) => setCategory(e)}
        />
        <TextInput
          title="Title"
          placeholder="Add a new service title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ marginTop: "16px" }}>
          {/* <InputLabel
            style={{
              color: "black",
              margin: "8px",
              marginLeft: 0,
              marginBottom: "10px",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "19px",
              letterSpacing: "-3%",
            }}
          >
            Description
          </InputLabel> */}
          <Editor
            placeholder="Add Description"
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            toolbarCustomButtons={[<CustomOption />]}
            editorStyle={{
              height: "200px",
              padding: "8px",
              // border:'1px solid'
            }}
            wrapperStyle={{
              // border: "1px solid #919191",
              borderRadius: "5px",
              padding: "2px",
            }}
            toolbarStyle={{
              border: "none",
            }}
            toolbar={{
              inline: {
                options: [
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "monospace",
                  "superscript",
                  "subscript",
                ],
                // monospace: { icon: code, className: undefined },
              },
              fontFamily: {
                options: [
                  "Arial",
                  "Georgia",
                  "Impact",
                  "Tahoma",
                  "Times New Roman",
                  "Verdana",
                  "Inter",
                ],
              },
              image: {
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: () => {},
                previewImage: false,
                inputAccept:
                  "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                alt: { present: false, mandatory: false },
                defaultSize: {
                  height: "auto",
                  width: "auto",
                },
              },
            }}
          />
        </div>
        {/* {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        <p
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          }}
        ></p> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <PrimaryButton title={"Add Session"} onClick={handleAddNewSession} />
        </div>
      </Paper>
      <LoadingBackdrop handleClose={handleBackdropClose} open={backdropOpen} />
    </div>
  );
};

export default AddNewSession;
