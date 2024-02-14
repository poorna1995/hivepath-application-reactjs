import { Grid, Typography } from "@mui/material";
import { useState } from "react";

// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, Modifier, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import UPExperienceCard from "./UPExperienceCard";
import UPExperienceForm from "./UPExperienceForm";

const initState = {
  company_name: "",
  description: "",
  responsibility: "",
  employment_status: "Full time",
  currently_working_here: false,
  location: "",
  start_year: "",
  end_year: "",
  start_month: "",
  end_month: "",
  uploads: "",
};

const validateInitState = {
  company_name: { isError: false },
  //   description: { isError: false },
  responsibility: { isError: false },
  employment_status: { isError: false },
  location: { isError: false },
  start_year: { isError: false },
  end_year: { isError: false },
  start_month: { isError: false },
  end_month: { isError: false },
};

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ExperienceSection = (props) => {
  const {
    submitForm,
    expCards,
    onDelete,
    expObjectId,
    showExpForm,
    setShowExpForm,
    editExperience,
    editData,
  } = props;

  const [formData, setFormData] = useState(initState);
  const [validateData, setValidateData] = useState(validateInitState);

  //   const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //   const onEditorStateChange = (editorState) => {
  //     const MAX_LENGTH = 10;
  //     const length = editorState.getCurrentContent().getPlainText("").length;
  //     console.log(length);
  //     if (length > MAX_LENGTH) {
  //       //   console.log("showuld stop");
  //       setEditorState((state) => state);
  //       return false;
  //     } else {
  //       const editorContent = draftToHtml(
  //         convertToRaw(editorState.getCurrentContent())
  //       );

  //       setEditorState(editorState);
  //       setFormData((state) => {
  //         return {
  //           ...state,
  //           description: editorContent,
  //         };
  //       });
  //     }
  //   };

  const sortedExp = expCards.sort(function (a, b) {
    const startYearA = a.start_year.label;
    const startYearB = b.start_year.label;
    // Compare the 2 dates
    if (startYearA > startYearB) return -1;
    if (startYearA < startYearB) return 1;
    return 0;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} align="left">
        <Typography variant="h6" fontWeight="800" style={{ fontSize: "26px" }}>
          Experience
        </Typography>
        <Typography>
          Please fill out each work experience according to the fields listed
          below.
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        {sortedExp.map((item, index) => (
          <UPExperienceCard
            key={index + "expcard"}
            data={item}
            onEdit={editExperience}
            onDelete={onDelete}
            submitForm={submitForm}
          />
        ))}
      </Grid>

      {showExpForm && (
        <Grid item xs={12} md={12}>
          <UPExperienceForm submitForm={submitForm} showForm={setShowExpForm} />
        </Grid>
      )}
    </Grid>
  );
};

export default ExperienceSection;
