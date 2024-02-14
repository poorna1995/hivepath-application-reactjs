// import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
import {
  Grid,
  InputLabel,
  Checkbox,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import Select from "react-select";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import getYears, {
  getMonths,
  getDateFormat,
  getDateConflict,
  getMonthName,
} from "../utils/getYears";
import UPEducationCard from "./UPEducationCard";
import PaperBase from "components/Common/PaperBase/PaperBase";
import UPEducationForm from "./UPEducationForm";

const customStylesDropdown = {
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    ":hover": {
      borderColor: "black",
    },
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};
const customStylesDropdownError = {
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    borderColor: "#b00020",
    ":hover": {
      borderColor: "#b00020",
    },
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};

const initState = {
  college_name: "",
  degree_name: "",
  field_of_study: "",
  start_month: "",
  start_year: "",
  end_month: "",
  end_year: "",
  currently_studying_here: false,
  description: "-",
};

const validateInitState = {
  college_name: { isError: false },
  degree_name: { isError: false },
  field_of_study: { isError: false },
  start_month: { isError: false },
  start_year: { isError: false },
  end_month: { isError: false },
  end_year: { isError: false },
  description: { isError: false },
};

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const EducationDetailsSection = (props) => {
  const {
    submitForm,
    educationCards,
    onDelete,
    eduObjectId,
    showEducationForm,
    showFormHandler,
    editEducation,
    editData,
  } = props;

  const { currentUser } = useSelector(mapState);

  const [formData, setFormData] = useState(initState);
  const [validateData, setValidateData] = useState(validateInitState);

  const enqueueSnackbar = useEnquequeSnackbar();

  const formRef = useRef();
  const years = getYears(1980);
  const months = getMonths();

  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const validate = async () => {
    let validated = true;

    Object.keys(validateData).forEach((element) => {
      if (formData[element].length === 0) {
        let validateInput = {
          [element]: { isError: true },
        };

        setValidateData((state) => {
          return { ...state, ...validateInput };
        });
        validated = false;
      }
    });

    return validated;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { start_year, start_month } = formData;
    const start_date = getDateFormat(start_year.value, start_month.value);

    const { end_year, end_month } = formData;
    const end_date = getDateFormat(end_year.value, end_month.value);

    const startEndConflict = getDateConflict(start_date, end_date);

    if (startEndConflict) {
      //   setValidateData((state) => {
      //     return {
      //       ...state,
      //       start_year: { isError: true },
      //       end_year: { isError: true },
      //     };
      //   });
      enqueueSnackbar("Start date must be smaller than end date", {
        variant: "error",
      });
      return;
    }

    const {
      college_name,
      degree_name,
      field_of_study,
      currently_studying_here,
      description,
      location,
    } = formData;

    const submitData = {
      college_name: college_name,
      degree_name: degree_name,
      field_of_study: field_of_study,
      currently_studying_here: currently_studying_here,
      description: description,

      //   location: "Bangalore, India",
      start_date: start_date,
      end_date: end_date,
    };

    let requestData = {
      user_id: currentUser.user_id,
      education: [{ ...submitData }],
    };

    if (eduObjectId) {
      // will update here
      requestData = {
        user_id: currentUser.user_id,
        update: "education",
        object_id: eduObjectId,
        ...submitData,
      };
    }

    validate().then((res) => {
      if (res) {
        submitForm(requestData).then((res) => {
          if (res) {
            // emptying form data after success operation
            setFormData(initState);
          }
        });
      } else {
        enqueueSnackbar("Fill all the required fields", {
          variant: "error",
        });
        return;
      }
    });
  };

  const changeHandler = (e, el) => {
    let input;
    if (e.target.type === "checkbox") {
      input = { [e.target.name]: el };
      if (el) {
        // setting end date
        const currentDate = new Date();
        const month = getMonthName(currentDate.getMonth());

        input = {
          ...input,
          end_month: { label: month, value: currentDate.getMonth() },
          end_year: {
            label: currentDate.getFullYear(),
            value: currentDate.getFullYear(),
          },
        };
      }
    } else {
      input = { [e.target.name]: e.target.value };

      // setting validating info
      const validateValue = e.target.value === "" ? true : false;
      let validateInput = {
        [e.target.name]: { isError: validateValue },
      };
      setValidateData((state) => {
        return { ...state, ...validateInput };
      });
    }

    setFormData((state) => {
      return { ...state, ...input };
    });
  };

  const changeDropDownHandler = (e, el) => {
    let input = { [el.name]: e };
    // console.log(input);
    setFormData((state) => {
      return { ...state, ...input };
    });

    const validateValue = e.length === 0 ? true : false;
    let validateInput = {
      [el.name]: { isError: validateValue },
    };
    setValidateData((state) => {
      return { ...state, ...validateInput };
    });
  };

  useEffect(() => {
    if (editData) {
      //   for editing the saved data
      setFormData(editData);
    } else {
      setFormData({});
    }
  }, [editData]);

  // const onEditorStateChange = (editorState) => {
  //   setEditorState(editorState);
  // console.log(editorState)
  // };

  const sortedEducation = educationCards.sort(function (a, b) {
    const startYearA = a.start_year.label;
    const startYearB = b.start_year.label;
    // Compare the 2 dates
    if (startYearA > startYearB) return -1;
    if (startYearA < startYearB) return 1;
    return 0;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontWeight="800" style={{ fontSize: "26px" }}>
          Education
        </Typography>
        <Typography>
          Tell us about your academic journey! Share your education details from
          school, university to further studies.
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        {sortedEducation.map((item, index) => (
          <UPEducationCard
            key={index + "educationcard"}
            data={item}
            onEdit={editEducation}
            onDelete={onDelete}
            submitForm={submitForm}
          />
        ))}

        {showEducationForm && (
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              marginTop: "20px",
              padding: "10px",
            }}
          >
            <UPEducationForm
              submitForm={submitForm}
              showFormHandler={showFormHandler}
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default EducationDetailsSection;
