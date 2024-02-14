import React from "react";
import CreatableSelect from "react-select/creatable";

const CreatableSelectInput = ({ options, ...props }) => {
  return (
    <div>
      <CreatableSelect isClearable options={options} {...props} />
    </div>
  );
};

export default CreatableSelectInput;
