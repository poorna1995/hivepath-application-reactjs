import { FormHelperText, InputLabel } from "@mui/material";
import { EditorState } from "draft-js";
import React from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Box } from "@mui/material";

const DescriptionEditor = ({
  editorState,
  onEditorStateChange,
  editorHeight,
  helperText,
  placeholder,
  ...props
}) => {
  return (
    <Box
      sx={{
        marginTop: "16px",
        "& .blockTypeClass": {
          fontWeight: "500",
        },
      }}
    >
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
        placeholder={placeholder || "Add Description"}
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        // toolbarCustomButtons={[<CustomOption />]}
        //  toolbarOnFocus

        editorStyle={{
          height: editorHeight || "200px",
          padding: "8px",
          // fontWeight:'600',
          border: "1px solid rgba(0,0,0,0.1)",
          lineHeight: "24px",
          fontWeight: "500",
          fontSize: "18px",
          borderRadius: "10px",
        }}
        // wrapperStyle={{
        //   border: "1px solid #919191",
        //   borderRadius: "5px",
        //   padding: "2px",
        // }}
        toolbarStyle={{
          border: "none",
        }}
        toolbar={{
          options: [
            "inline",
            // "blockType",
            // "fontSize",
            // "fontFamily",
            "list",
            // "textAlign",
            "colorPicker",
            "link",
            // "embedded",
            "emoji",
          ],
          blockType: {
            inDropdown: true,
            // component: (
            //   <ul>
            //     <li>Normal</li>
            //   </ul>
            // ),
          },
          textAlign: { inDropdown: true },
          inline: {
            inDropdown: true,
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
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
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
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: "auto",
              width: "auto",
            },
          },
        }}
        {...props}
      />
      <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
    </Box>
  );
};

export default DescriptionEditor;
