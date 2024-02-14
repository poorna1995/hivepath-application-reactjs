import { FormHelperText, Input } from "@mui/material";
import TextInput from "components/Common/Inputs/TextInput";
import React from "react";

const YSTitleField = ({
  title,
  handleChange,
  disabled,
  helperText,
  ...props
}) => {
  return (
    <div>
      <Input
        fullWidth
        multiline
        style={{
          marginTop: "16px",
          marginBottom: "8px",
          fontWeight: "700",
          fontSize: "26px",
          letterSpacing: "-1px",
        }}
        title="Title"
        placeholder="Add a new service title"
        value={title}
        onChange={handleChange}
        {...props}
        disabled={disabled}
      />
      <FormHelperText
        sx={{
          color: "red",
        }}
      >
        {helperText}{" "}
      </FormHelperText>
    </div>
  );
};

export default YSTitleField;
