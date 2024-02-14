import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";

const ButtonRow = ({ handleClick, ...props }) => {
  return (
    <div
      style={{
        // marginTop: "8px",
        padding: "16px",
        position: "fixed",
        bottom: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        background: "white",
        height: "70px",
        minHeight: "7vh",
        // maxHeight: "70px",
        zIndex: "100",
        borderTop: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <PrimaryButton title="Save & Continue" onClick={handleClick} {...props} />
    </div>
  );
};

export default ButtonRow;
