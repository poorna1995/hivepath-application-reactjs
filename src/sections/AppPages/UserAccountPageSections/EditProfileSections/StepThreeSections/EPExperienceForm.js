// import classes from "pages/AppPages/UserAccountPages/EditProfile/StepOne.module.css";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useSelector } from "react-redux";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";

import { Grid, InputLabel, TextField, Checkbox } from "@mui/material";

import getYears, {
  getMonths,
  getDateFormat,
  getDateConflict,
  getMonthName,
} from "../utils/getYears";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  customForm: {
    padding: "10px",
    paddingBottom: "0",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },

    "& label": {
      fontWeight: " bold !important",
      marginTop: "10px",
      marginBottom: "8px",
      //   marginLeft: "25px",
      color: "black !important",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "8px",
      },
    },
  },
  customForm: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    "& label": {
      fontWeight: " bold !important",
      marginTop: "10px",
      marginBottom: "8px",
      //   marginLeft: "25px",
      color: "black !important",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "8px",
      },
    },
  },
  inputField: {
    width: "100%",
    "& input": { height: "12px !important", backgroundColor: "white" },
  },
  errorText: {
    color: "#b00020",
    fontWeight: "400",
    fontSize: "0.75rem",
    lineHeight: "1.66",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: "0",
    marginLeft: "14px",
  },
}));

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

const customStylesDropdown = {
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    borderRadius: "10px",
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
    borderRadius: "10px",
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

const EPExperienceForm = (props) => {
  const { currentUser } = useSelector(mapState);
  const classes = useStyles();
  const { updateId, data, submitForm, showForm, onDelete } = props;
  const [formData, setFormData] = useState(data || initState);

  const [validateData, setValidateData] = useState(validateInitState);
  const enqueueSnackbar = useEnquequeSnackbar();

  const years = getYears(1980);
  const months = getMonths();

  const changeHandler = (e, el) => {
    let input;
    if (e.target.type === "checkbox") {
      input = { [e.target.name]: el };
      if (el) {
        // setting end date
        const currentDate = new Date();
        const monthStr = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        const month = getMonthName(currentDate.getMonth() + 1);

        input = {
          ...input,
          end_month: { label: month, value: monthStr },
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

  const validate = async () => {
    let validated = true;

    Object.keys(validateData).forEach((element) => {
      if (element in formData && formData[element].length === 0) {
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
          employment_status: "Full time", // formData.employment_status.value,
        };

        let requestData = {
          user_id: currentUser.user_id,
          experience: [{ ...submitData }],
        };

        if (updateId) {
          // will update here
          requestData = {
            user_id: currentUser.user_id,
            update: "experience",
            object_id: updateId,
            ...submitData,
          };
        }

        submitForm(requestData, updateId).then((res) => {
          if (res) {
            showForm(false);
            // emptying form data after success operation
            if (!updateId) {
              setFormData(initState);
            }
          }
        });
      }
    });
  };

  return (
    <Grid container spacing={2} mb={3} className={classes.customForm}>
      <Grid item xs={12} md={12}>
        <InputLabel>Company </InputLabel>
        <TextField
          name={"company_name"}
          value={formData.company_name}
          onChange={changeHandler}
          placeholder="Eg: Google"
          className={classes.inputField}
          error={validateData.company_name.isError}
          helperText={
            validateData.company_name.isError ? "Field is required" : ""
          }
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputLabel>Job role</InputLabel>
        <TextField
          name={"responsibility"}
          value={formData.responsibility}
          onChange={changeHandler}
          placeholder="Eg: UX Designer"
          className={classes.inputField}
          error={validateData.responsibility.isError}
          helperText={
            validateData.responsibility.isError ? "Field is required" : ""
          }
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputLabel>Location</InputLabel>
        <TextField
          name={"location"}
          value={formData.location}
          onChange={changeHandler}
          placeholder="Eg: Bangalore"
          className={classes.inputField}
          error={validateData.location.isError}
          helperText={validateData.location.isError ? "Field is required" : ""}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputLabel>Starting from</InputLabel>
        <Grid container>
          <Grid item xs={6} md={6} pr={1}>
            <Select
              name={"start_month"}
              value={formData.start_month}
              onChange={changeDropDownHandler}
              closeMenuOnSelect
              options={months}
              styles={
                validateData.start_month.isError
                  ? customStylesDropdownError
                  : customStylesDropdown
              }
            />
          </Grid>
          <Grid item xs={6} md={6} pl={0}>
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
          </Grid>
          {(validateData.start_year.isError ||
            validateData.start_month.isError) && (
            <p className={classes.errorText}>Incorrect date</p>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <InputLabel>Ending in</InputLabel>
        <Grid container>
          <Grid item xs={6} md={6} pr={1}>
            <Select
              isDisabled={formData.currently_working_here}
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
          </Grid>
          <Grid item xs={6} md={6}>
            <Select
              isDisabled={formData.currently_working_here}
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
          </Grid>
          {(validateData.end_year.isError ||
            validateData.end_month.isError) && (
            <p className={classes.errorText}>Incorrect date</p>
          )}
        </Grid>
        <InputLabel style={{ textAlign: "right" }}>
          <Checkbox
            name={"currently_working_here"}
            checked={formData.currently_working_here}
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
            Currently working
          </span>
        </InputLabel>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          placeholder="Addtional details"
          name="description"
          value={formData.description}
          onChange={changeHandler}
          multiline
          rows={4}
          inputProps={{ maxLength: 1500 }}
          style={{ width: "100%" }}
          //   error={validateData.description.isError}
          //   helperText={
          //     validateData.description.isError ? "Field is required" : ""
          //   }
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Grid item xs={12} md={12}>
          <PrimaryButton
            title={updateId ? "Update" : "Save"}
            style={{
              width: "100px",
              height: "50px",
            }}
            onClick={handleFormSubmit}
          />

          <OutlinedButton
            title="Cancel"
            style={{
              width: "100px",
              height: "50px",
              color: "black",
              marginLeft: "10px",
            }}
            onClick={() => showForm(false)}
          />

          {updateId && (
            <OutlinedButton
              title="Delete Experience"
              style={{
                width: "auto",
                fontWeight: "600",
                border: "none",
                height: "50px",
                color: "black",
                marginLeft: "10px",
                color: "#C6211B",
                float: "right",
                background: "transparent",
              }}
              onClick={onDelete}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default EPExperienceForm;
