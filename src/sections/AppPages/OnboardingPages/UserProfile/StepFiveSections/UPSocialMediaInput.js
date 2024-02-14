// import editIcon from "assets/svg/onboarding-pages/user-profile/edit.svg";
import editIcon from "assets/svg/onboarding-pages/knowledge-session/pencil.svg";
import checkIcon from "assets/svg/user-account/edit-profile/check.svg";
// import checkIcon from "assets/svg/check.svg";

import { Grid, IconButton } from "@mui/material";
import TextInputIcon from "components/Common/Inputs/TextInput/TextInputIcon";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import { useState } from "react";

const UPSocialMediaInput = (props) => {
  const enqueueSnackbar = useEnquequeSnackbar();
  const [isEdit, setIsEdit] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState(null);
  const {
    object_id,
    name,
    value,
    placeholder,
    icon,
    onChange,
    onUpdate,
    validateRegex,
    validateLinks,
  } = props;

  const updateHandler = () => {
    if (value !== "") {
      if (validateRegex && !RegExp(validateRegex).test(value)) {
        enqueueSnackbar("Please enter valid URL", {
          variant: "error",
        });
        return false;
      }

      onUpdate(object_id, name).then((res) => {
        setIsEdit(false);
      });
    } else {
      enqueueSnackbar("Link cannot be empty", {
        variant: "error",
      });
    }
  };

  const validateHandler = () => {
    if (validateRegex && !RegExp(validateRegex).test(value) && value !== "") {
      setError("Please enter valid URL");
      validateLinks(name, true);
    } else {
      setError(null);
      validateLinks(name, null);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
    >
      <Grid item xs={12} md={10}>
        <TextInputIcon
          disabled={object_id && !isEdit ? true : false}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          icon={icon}
          onKeyUp={onChange}
          onBlur={validateHandler}
        />
      </Grid>
      <Grid item xs={12} md={2} className="center">
        {object_id && !isEdit && showEdit && (
          <IconButton onClick={() => setIsEdit(true)}>
            <img src={editIcon} height="24px" />
          </IconButton>
        )}

        {object_id && isEdit && (
          <IconButton onClick={updateHandler}>
            <img src={checkIcon} style={{ height: "24px" }} />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={12} md={12} mb={3} style={{ paddingTop: "0" }}>
        {error && <p style={{ fontSize: "14px", color: "red" }}>{error}</p>}
      </Grid>
    </Grid>
  );
};

export default UPSocialMediaInput;
