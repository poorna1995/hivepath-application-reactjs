// import classes from "pages/AppPages/UserAccountPages/EditProfile/StepOne.module.css";
import {
  Grid,
  InputLabel,
  Checkbox,
  Typography,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import Select from "react-select";

// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PaperBase from "components/Common/PaperBase/PaperBase";
import EPEducationForm from "./EPEducationForm";

import getYears, {
  getMonths,
  getDateFormat,
  getDateConflict,
  getMonthName,
} from "../utils/getYears";
import EPEducationCard from "./EPEducationCard";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  customForm2: {
    "& label": {
      marginLeft: "0",
      fontWeight: "500 !important",
      color: "black",
    },
  },
}));

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
  description: "",
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
  const classes = useStyles();
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
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

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
    }
  }, [editData]);

  // const onEditorStateChange = (editorState) => {
  //   setEditorState(editorState);
  // console.log(editorState)
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} style={{ paddingLeft: "0" }}>
        <Typography variant="h6" fontWeight="800" style={{ fontSize: "26px" }}>
          Education
        </Typography>
        <Typography>
          Add more <strong>academic details</strong>. Share a new educational
          field that you missed or completed recently.
          {/* Tell us about your academic journey! Share your education details from
          school, university to further studies. */}
        </Typography>
      </Grid>

      {educationCards.length > 0 && (
        <Grid
          item
          xs={12}
          md={12}
          style={{ paddingLeft: "0", paddingTop: "0", marginTop: "-8px" }}
        >
          <PaperBase
            style={{
              paddingLeft: "0",
              paddingTop: "0",
              boxShadow: "none",
              border: "none",
            }}
          >
            <Grid item xs={12} md={12}>
              {educationCards.map((item, index) => (
                <EPEducationCard
                  key={index + "educationcard"}
                  data={item}
                  onEdit={editEducation}
                  onDelete={onDelete}
                  submitForm={submitForm}
                />
              ))}
            </Grid>
          </PaperBase>
        </Grid>
      )}

      {showEducationForm && (
        <Grid
          item
          xs={12}
          md={12}
          className={` ${classes.customForm2} ${
            showEducationForm ? "expand" : ""
          }`}
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <EPEducationForm
            submitForm={submitForm}
            showFormHandler={showFormHandler}
          />

          {/* <form ref={formRef} onSubmit={handleFormSubmit}>
            <PaperBase>
              <Grid container spacing={2} ml={1} mb={4}>
                <Grid item xs={12} md={12} align="left">
                  <Typography
                    variant="h6"
                    fontWeight="800"
                    style={{ fontSize: "26px" }}
                  >
                    Add Education
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4} align="left">
                  <InputLabel>College Name </InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    name={"college_name"}
                    value={formData.college_name}
                    onChange={changeHandler}
                    placeholder="Eg: Columbia University"
                    className={classes.inputField}
                    error={validateData.college_name.isError}
                    helperText={
                      validateData.college_name.isError
                        ? "Field is required"
                        : ""
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4} align="left">
                  <InputLabel>Degree </InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name={"degree_name"}
                    value={formData.degree_name}
                    onChange={changeHandler}
                    placeholder="Eg: Bachelor's"
                    className={classes.inputField}
                    error={validateData.degree_name.isError}
                    helperText={
                      validateData.degree_name.isError
                        ? "Field is required"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name={"field_of_study"}
                    value={formData.field_of_study}
                    onChange={changeHandler}
                    placeholder="Field of study"
                    className={classes.inputField}
                    error={validateData.field_of_study.isError}
                    helperText={
                      validateData.field_of_study.isError
                        ? "Field is required"
                        : ""
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4} align="left">
                  <InputLabel>Starting from </InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Select
                        name={"start_month"}
                        value={formData.start_month}
                        onChange={changeDropDownHandler}
                        styles={customStylesDropdown}
                        closeMenuOnSelect
                        options={months}
                        styles={
                          validateData.start_month.isError
                            ? customStylesDropdownError
                            : customStylesDropdown
                        }
                      />
                      {validateData.start_month.isError && (
                        <p className={classes.errorText}>Field is required</p>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6} pl={0}>
                      <Select
                        name={"start_year"}
                        value={formData.start_year}
                        onChange={changeDropDownHandler}
                        closeMenuOnSelect
                        options={years}
                        styles={
                          validateData.start_year.isError
                            ? customStylesDropdownError
                            : customStylesDropdown
                        }
                      />
                      {validateData.start_year.isError && (
                        <p className={classes.errorText}>Incorrect value</p>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4} align="left">
                  <InputLabel>Ending in </InputLabel>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Select
                        isDisabled={formData.currently_studying_here}
                        name={"end_month"}
                        value={formData.end_month}
                        onChange={changeDropDownHandler}
                        closeMenuOnSelect
                        options={months}
                        styles={
                          validateData.end_month.isError
                            ? customStylesDropdownError
                            : customStylesDropdown
                        }
                      />
                      {validateData.end_month.isError && (
                        <p className={classes.errorText}>Field is required</p>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Select
                        isDisabled={formData.currently_studying_here}
                        name={"end_year"}
                        value={formData.end_year}
                        onChange={changeDropDownHandler}
                        closeMenuOnSelect
                        options={years}
                        styles={
                          validateData.end_year.isError
                            ? customStylesDropdownError
                            : customStylesDropdown
                        }
                      />
                      {validateData.end_year.isError && (
                        <p className={classes.errorText}>Incorrect value</p>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputLabel>
                    <Checkbox
                      name={"currently_studying_here"}
                      checked={formData.currently_studying_here}
                      onChange={changeHandler}
                    />{" "}
                    <span
                      style={{
                        color: "black",
                        fontSize: "14px",
                        marginTop: "0",
                        fontWeight: "400",
                      }}
                    >
                      Currently studying
                    </span>
                  </InputLabel>
                </Grid>
              </Grid>

              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={4} align="left">
                  <InputLabel>Details </InputLabel>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    name="description"
                    value={formData.description}
                    onChange={changeHandler}
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 250 }}
                    style={{ width: "100%" }}
                    error={validateData.description.isError}
                    helperText={
                      validateData.description.isError
                        ? "Field is required"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={8} mt={3}>
                  <OutlinedButton
                    title="Cancel"
                    style={{ width: "100px", height: "50px" }}
                    onClick={() => showFormHandler(false)}
                  />
                  <PrimaryButton
                    title="Save"
                    style={{
                      width: "100px",
                      height: "50px",
                      marginLeft: "10px",
                    }}
                    type="submit"
                  />
                </Grid>
              </Grid>
            </PaperBase>
          </form> */}
        </Grid>
      )}
    </Grid>
  );
};

export default EducationDetailsSection;
