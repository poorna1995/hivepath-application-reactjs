import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";
import StepOne from "../../sections/InfoPage/StepOne";
import StepTwo from "../../sections/InfoPage/StepTwo";
import StepThree from "../../sections/InfoPage/StepThree";
import SuccessDialog from "../Common/Dialog/SuccessDialog";
import PrimaryButton from "../Common/Buttons/PrimaryButton";

const useProgressStepIconStyles = makeStyles({
  root: {
    // color: "#eaeaf0",
    // display: "flex",
    // height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 150,
    height: 4,
    // borderRadius: '50%',
    backgroundColor: "#e3e3e3",
  },
  blue: {
    width: 150,
    height: 4,
    // borderRadius: '50%',
    backgroundColor: "blue",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function ProgressStepIcon(props) {
  const classes = useProgressStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed || active ? (
        <div className={clsx(classes.blue)} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

ProgressStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    { step: "Step 1", title: "Basic Information", id: 0 },
    { step: "Step 2", title: "About Yourself", id: 1 },
    { step: "Step 3", title: "Select your interests", id: 2 },
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <StepOne />;
    case 1:
      return <StepTwo />;
    case 2:
      return <StepThree />;
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const descripition = `Thank you for submitting your profile information to Hivepath. Our team will review your profile and approve it shortly for public view. 
	`;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector="none">
        {steps.map((step) => (
          <Step key={step.id}>
            <StepLabel StepIconComponent={ProgressStepIcon}>
              {activeStep === step.id && (
                <span>
                  <span style={{ color: "#adadad" }}>{step.step}</span> <br />
                  {step?.title}
                </span>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          backgroundColor: "white",
          padding: "16px",
          // height:'100%',
          position: "fixed",
          left: 0,
          bottom: "0px",
          width: "100%",
          borderTop: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {activeStep === 0 ? (
          <Button
            style={{
              borderColor: "#484A9E",
              textTransform: "capitalize",
              borderRadius: "6px",
              display: "none",
            }}
            variant="outlined"
            disabled
            className={classes.button}
          >
            Back
          </Button>
        ) : (
          <Button
            style={{
              borderColor: "#484A9E",
              textTransform: "capitalize",
              borderRadius: "6px",
              width: "100px",
              height: "50px",
            }}
            variant="outlined"
            onClick={handleBack}
            className={classes.button}
          >
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <PrimaryButton variant="contained" onClick={handleClickOpen}>
            Continue
          </PrimaryButton>
        ) : (
          <PrimaryButton
            disabled
            onClick={handleNext}
            title="Continue"
          ></PrimaryButton>
        )}
        <SuccessDialog
          open={open}
          handleClose={handleClose}
          description={descripition}
        />
      </div>
    </div>
  );
}
