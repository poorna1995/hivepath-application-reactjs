import { InputLabel } from "@mui/material";

import React from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const customStyles = {
  multiValueRemove: (styles) => ({
    ...styles,
    ":hover": {
      backgroundColor: "#484A9E",
      color: "white",
    },
  }),
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    ":hover": {
      borderColor: "black",
    },
  }),
};
export const CreatableMulti = ({
  title,
  options,
  required,
  inputRef,
  ...props
}) => {
  const ref = React.createRef();

  return (
    <div style={{ paddingTop: props.noMargin ? "" : "24px" }} ref={inputRef}>
      <InputLabel
        style={{ color: "black", marginBottom: "8px", fontWeight: "bold" }}
      >
        {title}
        {required && "*"}
      </InputLabel>
      <CreatableSelect
        styles={customStyles}
        isMulti
        ref={ref}
        components={animatedComponents}
        options={options}
        theme={(theme) => ({
          ...theme,
          // borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "#484A9E",
          },
          borderColor: theme.primary,
        })}
        {...props}
      />
    </div>
  );
};
