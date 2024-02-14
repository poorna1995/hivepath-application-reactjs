import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PrimaryButton from "../Buttons/PrimaryButton";
import GradientText from "../Typography/GradientText";

const steps = [
  {
    label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

const DialogSlideshow = ({
  steps,
  onClickComplete,
  onClickSkip,
  completeButtonTitle,
  gradientText,
  gradientTextProps,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      style={{
        margin: "-16px",
        marginTop: "-64px",
      }}
      // sx={{ maxWidth: 400, flexGrow: 1 }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          //   height: 50,
        }}
      >
        {" "}
        <img
          src={steps[activeStep].imgSrc}
          style={{ width: "100%", objectFit: "cover" }}
          alt=""
        />
        {gradientText ? (
          <GradientText
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              lineHeight: "28px",
              marginTop: "16px",
            }}
          >
            {steps[activeStep].label}
          </GradientText>
        ) : (
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              lineHeight: "28px",
              marginTop: "16px",
            }}
          >
            {steps[activeStep].label}
          </Typography>
        )}
        <Typography
          style={{
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "28px",
            marginTop: "16px",
          }}
        >
          {steps[activeStep].message}
        </Typography>
      </Paper>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        style={{
          background: "transparent",
          margin: "16px",
        }}
        activeStep={activeStep}
        nextButton={
          <>
            {activeStep === maxSteps - 1 ? (
              <PrimaryButton
                size="small"
                title={`Complete ${completeButtonTitle}`}
                // style={{ height: "36px" }}
                // onClick={handleClose}
                onClick={onClickComplete}
              >
                Complete
              </PrimaryButton>
            ) : (
              <PrimaryButton
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                title="Next"
              >
                Next
                <KeyboardArrowRight />
              </PrimaryButton>
            )}
          </>
        }
        backButton={
          <div>
            {activeStep === maxSteps - 1 ? (
              <Button
                size="small"
                onClick={handleBack}
                style={{
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "28px",
                }}
              >
                Back{" "}
              </Button>
            ) : (
              <Button
                size="small"
                disabled
                style={{
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "28px",
                }}
              >
                Back{" "}
              </Button>
            )}
          </div>
        }
      />
    </Box>
  );
};

export default DialogSlideshow;
