import classes from "./UPUploadComponent.module.css";
import { Grid, Typography } from "@mui/material";
import uploadIcon from "assets/svg/upload.svg";
import { useState } from "react";

import { FileUploader } from "react-drag-drop-files";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root2: {
    "& .sc-gsDKAQ": {
      display: "none !important",
    },
  },
}));

const UPUploadComponent = (props) => {
  const customClasses = useStyles();
  const { size, onChange } = props;
  const [availableImage, setAvailableImage] = useState(null);

  const onChangeHandler = (event) => {
    const file = event;
    // const file = event.target.files[0];

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

            {/* <input
              id="file-coverInput"
              type="file"
              name="coverImg"
              onChange={(event) => {
                onChangeHandler(event);
              }}
            /> */}
          </Grid>
        }
      />
    </div>
  );
};

export default UPUploadComponent;
