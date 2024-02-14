import React, { useState } from "react";
import validator from "validator";
import TextInput from "../TextInput";
import { InputAdornment } from "@mui/material";
import { ReactComponent as ErrorIcon } from "../../../../assets/svg/input-icons/error.svg";

const EmailInput = ({ email, setEmail, ...props }) => {
  const [emailError, setEmailError] = useState(false);

  const validateEmail = () => {
    // setEmail(e.target.value);
    if (email.length > 5) {
      if (validator.isEmail(email)) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    } else {
      setEmailError(false);
    }
  };

  return (
    <TextInput
      required
      error={emailError}
      title="Email address"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={validateEmail}
      // onFocus={show}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {emailError && <ErrorIcon />}
          </InputAdornment>
        ),
      }}
      placeholder="Enter your email here"
      {...props}
    />
  );
};

export default EmailInput;
