import {
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { VscKey } from "react-icons/vsc";
import PasswordInputTooltipContent from "./TooltipContent";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    maxWidth: "600px",
    height: "100%",
    width: "100%",
    margin: "auto",
  },
  label: {
    color: "black",
    margin: theme.spacing(1),
    marginLeft: 0,
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "19px",
    letterSpacing: "-3%",
  },
  socialAuth: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tooltipContainer: {
    background: "white",
    color: "black",
    boxShadow: "0px 0px 35px rgba(0, 0, 0, 0.05)",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  tooltipArrow: {
    color: "white",
    width: "2rem",
    height: "1rem",
    marginTop: "-1.6em !important",
    [theme.breakpoints.down("md")]: {
      // bottom:'-200px'
    },
  },
}));

const PasswordInput = ({ title, isLoginPage, ...props }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const [oneLowercase, setOneLowerCase] = useState(false);

  const [oneNumber, setOneNumber] = useState(false);
  const [oneUppercase, setOneUpperCase] = useState(false);
  const [oneSpecialCharacter, setOneSpecialCharacter] = useState(false);
  const [moreThanEight, setMoreThanEight] = useState(false);
  const ref = useRef(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleKeyUp = (str) => {
    //validate lowercase
    var lowerCaseLetters = /[a-z]/g;
    if (str?.match(lowerCaseLetters)) {
      setOneLowerCase(true);
    } else {
      setOneLowerCase(false);
      // ;
    }
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (str?.match(upperCaseLetters)) {
      setOneUpperCase(true);
    } else {
      setOneUpperCase(false);
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (str?.match(numbers)) {
      setOneNumber(true);
    } else {
      setOneNumber(false);
    }

    // Validate length
    if (str?.length >= 8) {
      setMoreThanEight(true);
    } else {
      setMoreThanEight(false);
    }
    var specialCharacters = /[!@#$%^&*]/;
    if (str?.match(specialCharacters)) {
      setOneSpecialCharacter(true);
    } else {
      setOneSpecialCharacter(false);
    }
  };

  const items = [
    {
      text: "One uppercase",
      condition: oneUppercase,
    },
    {
      text: "One lowercase",
      condition: oneLowercase,
    },
    {
      text: "One number",
      condition: oneNumber,
    },
    {
      text: "One special character",
      condition: oneSpecialCharacter,
    },
    {
      text: "Minumum 8 characters",
      condition: moreThanEight,
    },
  ];

  const tooltipTitle = <PasswordInputTooltipContent data={items} />;

  return (
    <div style={{ marginTop: "24px" }}>
      <InputLabel required className={classes.label}>
        {title || "Password"}
      </InputLabel>
      {isLoginPage ? (
        <TextField
          //  inputProps={{style:{paddingTop:'15px', paddingBottom:'15px'}}}
          fullWidth
          variant="outlined"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          // onKeyUp={handleKeyUp}
          onKeyUp={(e) => handleKeyUp(e.target.value)}
          {...props}
          inputProps={{ style: { paddingTop: "15px", paddingBottom: "14px" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  disableRipple
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>{" "}
              </InputAdornment>
            ),
            startAdornment: <VscKey style={{ marginRight: "8px" }} />,
          }}
        />
      ) : (
        <Tooltip
          // className={classes.tooltipContainer}
          classes={{
            tooltip: classes.tooltipContainer,
            arrow: classes.tooltipArrow,
          }}
          title={tooltipTitle}
          arrow
          placement="right"
          disableHoverListener
        >
          <TextField
            //  inputProps={{style:{paddingTop:'15px', paddingBottom:'15px'}}}
            fullWidth
            variant="outlined"
            placeholder="Password"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
            type={showPassword ? "text" : "password"}
            // onKeyUp={handleKeyUp}
            onKeyUp={(e) => handleKeyUp(e.target.value)}
            {...props}
            inputProps={{
              style: { paddingTop: "15px", paddingBottom: "14px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>{" "}
                </InputAdornment>
              ),
              startAdornment: <VscKey style={{ marginRight: "8px" }} />,
            }}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default PasswordInput;
