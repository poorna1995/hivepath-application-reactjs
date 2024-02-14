import React from "react";
import { InputLabel } from "@mui/material";
import CreatableSelect from "react-select/creatable";


const customStyles = {
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

const CreatableSelectInput = ({
  title,
  required,
  options,
  labelStyles,
  noPadding,
  styles,
  ...props
}) => {
  const ref = React.createRef();
  return (
    <div style={{ paddingTop: noPadding ? "0px" : "24px" }}>
      {title && (
        <InputLabel
          style={
            labelStyles
              ? labelStyles
              : { color: "black", marginBottom: "8px", fontWeight: "bold" }
          }
        >
          {title}
          {required && "*"}
        </InputLabel>
      )}
      <CreatableSelect
        {...props}
        ref={ref}
        styles={styles || customStyles}
        closeMenuOnSelect
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#484A9E",
          },
          borderColor: theme.primary,
        })}
        options={options}
      />
    </div>
  );
};

export default CreatableSelectInput;
