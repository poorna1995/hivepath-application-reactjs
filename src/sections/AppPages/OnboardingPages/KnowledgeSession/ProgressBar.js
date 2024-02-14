import {
  Container,
  Grid,
  LinearProgress,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  stepLabelClasses,
  TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { MdCheck } from "react-icons/md";
import currentStepBG from "assets/svg/onboarding-pages/knowledge-session/current.svg";

import { ReactComponent as CurrentStepIcon } from "assets/svg/onboarding-pages/knowledge-session/current.svg";
import { ReactComponent as CheckFilledGradientIcon } from "assets/svg/onboarding-pages/knowledge-session/check-blue-gradient.svg";
import { ReactComponent as CalendarIcon } from "assets/svg/onboarding-pages/knowledge-session/calendar.svg";
import { ReactComponent as SubmitIcon } from "assets/svg/onboarding-pages/knowledge-session/submit.svg";
import { ReactComponent as VideoDisabledIcon } from "assets/svg/onboarding-pages/knowledge-session/video-disabled.svg";
import ShortDateCard from "components/Common/Cards/ShortDateCard";
import TextInput from "components/Common/Inputs/TextInput";

// const QontoConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 10,
//     left: "calc(-50% + 16px)",
//     right: "calc(50% + 16px)",
//   },

//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: "#784af4",
//       //   border: "2px solid",

//       //   borderImage:
//       //     " linear-gradient(277.72deg, #8FBAE3 10.75%, #4E69AE 73.03%)",
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: "#784af4",
//       // borderBottom: "2px solid",

//       // borderImage: `  red,
//       //   rgba(0, 0, 0, 0)
//       // ) 1 100%`,
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     borderColor:
//       theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// }));

// const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
//   color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
//   display: "flex",
//   height: 22,
//   alignItems: "center",
//   ...(ownerState.active && {
//     color: "#784af4",
//   }),
//   "& .QontoStepIcon-completedIcon": {
//     color: "#784af4",
//     zIndex: 1,
//     fontSize: 18,
//   },
//   "& .QontoStepIcon-circle": {
//     width: 8,
//     height: 8,
//     borderRadius: "50%",
//     backgroundColor: "currentColor",
//   },
// }));

// function QontoStepIcon(props) {
//   const { active, completed, className } = props;

//   return (
//     <QontoStepIconRoot ownerState={{ active }} className={className}>
//       {completed ? <CheckFilledGradientIcon /> : <CurrentStepIcon />}
//     </QontoStepIconRoot>
//   );
// }

// QontoStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    * @default false
//    */
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    * @default false
//    */
//   completed: PropTypes.bool,
// };

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(277.72deg, #8FBAE3 10.75%, #4E69AE 73.03%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(277.72deg, #8FBAE3 10.75%, #4E69AE 73.03%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  // backgroundColor:
  //   theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active &&
    {
      // backgroundImage:
      //   "linear-gradient(277.72deg, #8FBAE3 10.75%, #4E69AE 73.03%)",
      // boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
  ...(ownerState.completed &&
    {
      // backgroundImage:
      //   "linear-gradient(277.72deg, #8FBAE3 10.75%, #4E69AE 73.03%)",
    }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <CurrentStepIcon />,
    2: <CalendarIcon />,
    3: <VideoDisabledIcon />,
    4: <SubmitIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <CheckFilledGradientIcon />
      ) : (
        <>
          {" "}
          {active ? (
            <>
              {" "}
              <CurrentStepIcon />
            </>
          ) : (
            <>{icons[String(props.icon)]}</>
          )}{" "}
        </>
      )}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const KSOnboardingProgressBar = ({ progressValue, ...props }) => {
  const activeStep = progressValue / 25;
  // const steps = ["Sessions", "Availability", "Preferences", "Submit"];
  const steps = [
    {
      label: "Sessions",
      url: "/onboarding/knowledge-session/step-one",
    },
    {
      label: "Availability",
      url: "/onboarding/knowledge-session/step-two",
      icon: CalendarIcon,
    },
    {
      label: "Preferences",
      url: "/onboarding/knowledge-session/step-three",
      icon: VideoDisabledIcon,
    },
    {
      label: "Submit",
      url: "/onboarding/knowledge-session/step-four",
      icon: SubmitIcon,
    },
  ];

  // const disableB = progressValue === 25
  return (
    <Container style={{ maxWidth: "800px", paddingTop: "8px" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((item, index) => {
          const { label, url } = item;
          return (
            <Step key={label}>
              <Link to={activeStep > index && url}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  componentsProps={{
                    style: {
                      color: activeStep
                        ? ""
                        : "rgba(174, 174, 174, 1) !important",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Link>
            </Step>
          );
        })}
      </Stepper>

      {/* <Grid container paddingTop={2}>
        <Grid item xs={3} paddingLeft={2}>
          <Link to="/onboarding/knowledge-session/step-one">
            <span style={{ fontSize: "21px" }}> Sessions</span>
          </Link>
        </Grid>
        <Grid item xs={3} paddingLeft={2}>
          <Link
            to={
              progressValue > 25 && "/onboarding/knowledge-session/step-two"
            }
            style={{
              color: "",
              cursor: `${progressValue <= 25 && "not-allowed"}`,
            }}
          >
            <span style={{ fontSize: "21px" }}> Availability</span>
          </Link>
        </Grid>
        <Grid item xs={3} paddingLeft={2}>
          <Link
            style={{
              color: "",
              cursor: `${progressValue <= 50 && "not-allowed"}`,
            }}
            to={
              progressValue > 50 &&
              "/onboarding/knowledge-session/step-three"
            }
          >
            <span style={{ fontSize: "21px" }}> Preferences</span>
          </Link>
        </Grid>
        <Grid item xs={3} paddingLeft={2}>
          <Link
            style={{
              color: "",
              cursor: `${progressValue <= 75 && "not-allowed"}`,
            }}
            to={
              progressValue > 75 &&
              "/onboarding/knowledge-session/step-four"
            }
          >
            <span style={{ fontSize: "21px" }}> Submit</span>
          </Link>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={progressValue} /> */}
    </Container>
  );
};

export default KSOnboardingProgressBar;
