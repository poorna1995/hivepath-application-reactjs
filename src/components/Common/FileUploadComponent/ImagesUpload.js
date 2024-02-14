import makeStyles from "@mui/styles/makeStyles";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicURL } from "../../../store/User/user.actions";
import PrimaryButton from "../Buttons/PrimaryButton";
import profilepicPlaceholder from "../../../assets/svg/profile-picture.svg";
import LoadingBackdrop from "../Feedback/Backdrop/LoadingBackdrop";
import { Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  layout: {},
  profilePicPreview: {
    borderRadius: "50%",
    width: "180px",
    height: "180px",
    objectFit: "cover",
    zIndex: 2,
    // borderRadius:''
    // position:"relative",
  },
  profilePicContainer: {
    position: "relative",
    borderRadius: "50%",
    width: "210px",
    height: "250px",
    objectFit: "cover",
    zIndex: 2,
  },
  profileUploadInput: {
    position: "absolute",
    top: "0px",
    opacity: "0",
    "&:hover": {
      // display: "flex",
      opacity: 0.4,
    },
  },
}));

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  onboarding_data: user.onboarding_data,
});
const ImagesUpload = ({
  images,
  setImages,
  onChange,
  disabled,
  setDisabled,
}) => {
  const dispatch = useDispatch();
  const enqueueSnackbar = useEnquequeSnackbar();
  const classes = useStyles();
  const [timestamp, setTimestamp] = useState(Date.now());
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser?.user_id;
  // const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);
  const image_url = currentUser?.image_url;

  // const [images, setImages] = React.useState([]);

  // const onChange = (imageList) => {
  //   // data for submit

  //   setImages(imageList);
  //   setDisabled(false);
  // };

  const handleProfilePictureUpload = (file) => {
    const formData = new FormData();
    setDisabled(true);

    formData.append("file", file);
    // https://utils.hivepath.io/api/fileUpload?user_id=123&type=profile_pic&category=profile_pic
    // https://utils.hivepath.io/api/fileUpload?user_id=${USER_ID}&type=session_document&category=session_document

    const url = `https://utils.hivepath.io/api/fileUpload?user_id=${USER_ID}&type=profile_pic&category=profile_pic
    `;
    fetch(url, {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setTimestamp(Date.now());

          dispatch(setProfilePicURL(json.file_path));
          enqueueSnackbar(json?.message, {
            variant: "success",
          });
          setLoading(false);
        } else {
          enqueueSnackbar(json?.message, {
            variant: "error",
          });
          setLoading(false);
        }
        //
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);

        enqueueSnackbar("Cannot complete action", {
          variant: "error",
        });
      });
  };
  // const onSubmit = () => {
  //   setLoading(true);
  //   handleProfilePictureUpload(images[0]?.file);
  // };

  return (
    <div style={{ marginBottom: "-24px" }}>
      <ImageUploading
        maxFileSize={5048576}
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageUpdate, dragProps, errors }) => (
          // write your building UI
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              {/* If image_url exists */}
              {imageList[0] === undefined ? (
                <>
                  {image_url ? (
                    <div className={classes.profilePicContainer}>
                      <div className={classes.profilePicPreview}>
                        <img
                          key={timestamp}
                          className={classes.profilePicPreview}
                          src={`${image_url}?${global.Date.now()}`}
                          alt=""
                        />
                      </div>
                      <div className={classes.profileUploadInput}>
                        <label onClick={onImageUpload} {...dragProps}>
                          <img
                            src={profilepicPlaceholder}
                            alt={"profile img"}
                            className={classes.profilePicPreview}
                          />
                        </label>
                      </div>
                      {/* here write logic when there is no image selected */}
                    </div>
                  ) : (
                    <div className={classes.profilePicContainer}>
                      <div className={classes.profilePicPreview}></div>

                      {/* {/* if image_url does not exists  */}
                      <div
                        className={classes.profileUploadInput}
                        style={{ opacity: 1 }}
                      >
                        <label
                          onClick={() => onImageUpload()}
                          {...dragProps}
                          for="profile-pic-input"
                        >
                          <img
                            src={profilepicPlaceholder}
                            alt={"profile img"}
                            className={classes.profilePicPreview}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  {/* when image is selected */}
                  {
                    <div className={classes.profilePicContainer}>
                      <div className={classes.profilePicPreview}>
                        <img
                          className={classes.profilePicPreview}
                          src={imageList[0]?.data_url}
                          alt=""
                        />
                      </div>
                      <div
                        className={classes.profileUploadInput}
                        // style={{ opacit}}
                      >
                        <label
                          onClick={() => onImageUpdate()}
                          {...dragProps}
                          for="profile-pic-input"
                        >
                          <img
                            src={profilepicPlaceholder}
                            alt={"profile img"}
                            className={classes.profilePicPreview}
                          />
                        </label>
                      </div>
                      {images.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            // textAlign: "center",
                            marginTop: "8px",
                          }}
                        >
                          {/* <Button
                            disabled={disabled}
                            title="Upload Image"
                            onClick={onSubmit}
                            style={{
                              textDecoration: "underline",
                              textTransform: "capitalize",
                              textAlign: "center",
                              marginLeft: "-32px",
                            }}
                          >
                            {" "}
                            Upload Image
                          </Button> */}
                        </div>
                      )}
                    </div>
                  }
                </div>
              )}
            </div>

            {errors && (
              <div style={{ marginTop: "32px", color: "red" }}>
                {errors.maxNumber && (
                  <span>Number of selected images exceed maxNumber</span>
                )}
                {errors.acceptType && (
                  <span>Your selected file type is not allow</span>
                )}
                {errors.maxFileSize && (
                  <span>Please select an image less than 4 MB</span>
                )}
                {errors.resolution && (
                  <span>
                    Selected file is not match your desired resolution
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
      <LoadingBackdrop open={loading} handleClose={() => setLoading(false)} />
    </div>
  );
};

export default ImagesUpload;
