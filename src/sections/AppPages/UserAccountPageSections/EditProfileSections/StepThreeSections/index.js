import classes from "pages/AppPages/UserAccountPages/EditProfile/StepOne.module.css";
// import addBlackIcon from "assets/svg/onboarding-pages/user-profile/addBlack.svg";
// import addIcon from "assets/svg/onboarding-pages/user-profile/add.svg";
import PaperBase from "components/Common/PaperBase/PaperBase";

import {
  Grid,
  InputLabel,
  TextField,
  Paper,
  Typography,
  Checkbox,
  useMediaQuery,
} from "@mui/material";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import Select from "react-select";

// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, Modifier, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import EPExperienceCard from "./EPExperienceCard";
import EPExperienceForm from "./EPExperienceForm";

import getYears, {
  getMonths,
  getDateFormat,
  getDateConflict,
  getMonthName,
} from "../utils/getYears";
import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {},
  customForm: {
    "& label": {
      fontWeight: " bold !important",
      marginTop: "10px",
      marginLeft: "25px",
      color: "black !important",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "8px",
      },
    },
  },
}));
const initState = {
  company_name: "",
  description: "",
  responsibility: "",
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
  description: { isError: false },
  responsibility: { isError: false },
  location: { isError: false },
  start_year: { isError: false },
  end_year: { isError: false },
  start_month: { isError: false },
  end_month: { isError: false },
};

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
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const muiClasses = useStyles();
  const { currentUser } = useSelector(mapState);
  const [formData, setFormData] = useState(initState);
  const [validateData, setValidateData] = useState(validateInitState);
  const [showForm, setShowForm] = useState(true);

  const enqueueSnackbar = useEnquequeSnackbar();

  const formRef = useRef();
  const years = getYears(1980);
  const months = getMonths();

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

    validate().then((res) => {
      if (!res) {
        enqueueSnackbar("Fill in all required fields", {
          variant: "error",
        });
        return;
      } else {
        const { start_year, start_month } = formData;
        const start_date = getDateFormat(start_year.value, start_month.value);

        const { end_year, end_month } = formData;
        const end_date = getDateFormat(end_year.value, end_month.value);

        const startEndConflict = getDateConflict(start_date, end_date);

        if (startEndConflict) {
          enqueueSnackbar("Start date must be smaller than end date", {
            variant: "error",
          });
          return;
        }

        const submitData = {
          company_name: formData.company_name,
          description: formData.description,
          responsibility: formData.responsibility,
          currently_working_here: formData.currently_working_here,
          location: formData.location,
          start_date: start_date,
          end_date: end_date,
          uploads: [{ key: "project", title: "", upload_id: "", link: "" }],
          employment_status: "Full time",
        };

        let requestData = {
          user_id: currentUser.user_id,
          experience: [{ ...submitData }],
        };

        if (expObjectId) {
          // will update here
          requestData = {
            user_id: currentUser.user_id,
            update: "experience",
            object_id: expObjectId,
            ...submitData,
          };
        }

        submitForm(requestData).then((res) => {
          if (res) {
            // emptying form data after success operation
            setFormData(initState);
          }
        });
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
    setFormData((state) => {
      return { ...state, ...input };
    });

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

    const validateValue = e.label.length === 0 ? true : false;
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

  //   const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //   const onEditorStateChange = (editorState) => {
  //     setEditorState(editorState);
  //   };

  return (
    <Grid container spacing={2} className={classes.customForm2}>
      <Grid item xs={12} md={12} align="left">
        <Typography variant="h6" fontWeight="800" style={{ fontSize: "26px" }}>
          Experience
        </Typography>
        <Typography>
          {/* Please fill out each work experience according to the fields listed
          below. */}
          Add more <strong>work experiences</strong>. Please remember to fill
          out each detail according to the new job role.
        </Typography>
      </Grid>
      {expCards.length > 0 && (
        <Grid item xs={12} md={12} style={{ padding: "0" }}>
          <PaperBase
            style={{
              boxShadow: "none",
              paddingTop: "10px",
              paddingLeft: "0",
			  border: "none",
			  paddingBottom: "0",
            }}
          >
            <Grid item xs={12} md={12}>
              {expCards.map((item, index) => (
                <EPExperienceCard
                  key={index + "expcard"}
                  data={item}
                  onEdit={editExperience}
                  onDelete={onDelete}
                  submitForm={submitForm}
                />
              ))}
            </Grid>
          </PaperBase>
        </Grid>
      )}

      {showExpForm && (
        <Grid
          item
          xs={12}
          md={12}
          style={{ padding: "0" }}
          // className={muiClasses.customForm}
        >
          <form ref={formRef} onSubmit={handleFormSubmit}>
            <PaperBase
              style={{
                paddingLeft: matches ? "8px" : "50px",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <Grid item xs={12} md={10}>
                <EPExperienceForm
                  submitForm={submitForm}
                  showForm={setShowExpForm}
                />
              </Grid>
            </PaperBase>
          </form>
        </Grid>
      )}
    </Grid>
  );
};

export default ExperienceSection;
