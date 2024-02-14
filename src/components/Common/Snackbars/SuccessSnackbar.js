import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";

const SuccessSnackbar = ({ successMessage }) => {
  const enqueueSnackbar = useEnquequeSnackbar();

  return (
    <>
      {enqueueSnackbar(successMessage, {
        variant: "success",
      })}
    </>
  );
};

export default SuccessSnackbar;
