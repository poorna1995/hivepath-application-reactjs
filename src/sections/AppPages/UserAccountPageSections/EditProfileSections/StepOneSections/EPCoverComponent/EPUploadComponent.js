import classes from "./EPUploadComponent.module.css";
import { Grid, Typography } from "@mui/material";
import uploadIcon from "assets/svg/upload.svg";
import { useState } from "react";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import { FileUploader } from "react-drag-drop-files";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root2: {
    "& .sc-gsDKAQ": {
      display: "none !important",
    },
  },
}));

const EPUploadComponent = (props) => {
  const customClasses = useStyles();
  const enqueueSnackbar = useEnquequeSnackbar();
  const { size, onChange, type } = props;
  const [availableImage, setAvailableImage] = useState(null);

  const onChangeHandler = (event) => {
    const file = event;
    // const file = event.target.files[0];
    // const fileSize = file.size / 1024 / 1024;
    // if (fileSize > 10) {
    //   enqueueSnackbar("Image size must be less than 10 Mb", {
    //     variant: "error",
    //   });
    //   return;
    // }

    onChange(file);
    setAvailableImage(file.name);
  };

  return (
    <div className={customClasses.root2}>
      <FileUploader
        handleChange={(event) => {
          onChangeHandler(event);
        }}
        name="coverImg"
        multiple={false}
        children={
          <Grid container spacing={2} className={classes.uploadContainer}>
            <label htmlFor="file-coverInput">
              <Grid item xs={12} md={12}>
                <img src={uploadIcon} alt="upload" />
              </Grid>
              <Grid item xs={12} md={12}>
                {!availableImage && "Drag and drop your file here"}
                {availableImage && "Selected file: "}{" "}
                <span style={{ marginLeft: "5px" }}> {availableImage}</span>
              </Grid>
              <Grid item xs={12} md={12}>
                or
              </Grid>
              <Grid item xs={12} md={12}>
                <span>Browse files</span>
              </Grid>
              <Grid item xs={12} md={12}>
                <p>(Recommended Size - {size}) </p>
              </Grid>
            </label>
          </Grid>
        }
      />
    </div>
  );
};

export default EPUploadComponent;
