import classes from "./StepOne.module.css";
import { Container, Grid, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { debounceFunction } from "sections/AppPages/OnboardingPages/UserProfile/utils/debounce";

import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout";
import UserProfileOnboardingLayout from "Layouts/UserLayout/UserProfileOnboardingLayout";
import BasicDetailsSection from "sections/AppPages/OnboardingPages/UserProfile/StepOneSections/BasicDetailsSection";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";

import { setProfileData } from "store/User/user.actions";

import {
  checkSlug,
  startUserProfileOnboarding,
  autoSuggest,
  fetchUserData,
  fetchCoverImages,
  uploadImage,
  getFlag,
} from "sections/AppPages/OnboardingPages/UserProfile/utils/fetchOnboarding";
import CustomFab from "components/Common/Buttons/CustomFab";
import { useTheme } from "@mui/styles";

const initState = {
  first_name: "",
  last_name: "",
  email: "",
  slug_id: "",
  location: "",
  flag_url: "",
  role: "",
  expertise: [],
  looking_for: [],
  languages: [], //{label:'English', value:'English'},{label:'Hindi', value:'Hindi'}
  description: "",
  image_url: "",
  cover_url: "",
  location_coordinates: "",
};

const validateInitState = {
  //   location: { isError: false },
  //   role: { isError: false },
  //   expertise: { isError: false },
  //   looking_for: { isError: false },
  //   languages: { isError: false },
  //   description: { isError: false },
  slug_id: { isError: false },
};

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const StepOne = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const enqueueSnackbar = useEnquequeSnackbar();
  const { currentUser } = useSelector(mapState);
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const [formData, setFormData] = useState(initState);
  const [validateData, setValidateData] = useState(validateInitState);

  const [profileImg, setProfileImg] = useState(null);
  const [coverFileImg, setCoverFileImg] = useState(null);

  const [coverImages, setCoverImages] = useState([]);
  const [showCoverContainer, setShowCoverContainer] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isSlugDisabled, setIsSlugDisabled] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  // auto suggested states
  const [language, setLanguages] = useState([]);
  const [lookingFor, setLookingFor] = useState([]);
  const [interests, setInterests] = useState([]);

  const setSlugStatus = (isError, isTouched, message) => {
    let validateInput = {
      slug_id: {
        isError: isError,
        isTouched: isTouched,
        message: message,
      },
    };
    setValidateData((state) => {
      return { ...state, ...validateInput };
    });
  };

  const getSlugHandler = (inputSlug) => {
    setSlugStatus(false, true, "Loading...");

    const res = checkSlug({
      slug_id: inputSlug,
      user_id: currentUser.user_id,
    }).then((response) => {
      const { result, error } = response;
      if (!error) {
        if (result.status === "failure") {
          // input slug is either already taken, provide suggestions
          let suggestions = result.suggestions.map((item, index) => (
            <span
              key={item + index}
              onClick={() => setUserName(item)}
              className={classes.suggestions}
            >
              {item + ", "}
            </span>
          ));
          if (suggestions.length > 0) {
            suggestions.unshift(
              <span key={"suggestion00"} style={{ color: "#606060" }}>
                Suggestions:{" "}
              </span>
            );
          }

          setSlugStatus(true, true, suggestions);
        } else {
          setSlugStatus(false, true, "This username is available");
        }
      } else {
        enqueueSnackbar(error, { variant: "error" });
        return;
      }
    });
  };

  const slugDebounce = () => {
    const username = formData.slug_id;
    // // Debounces makeAPICall method
    if (formData.slug_id !== "") {
      debounceFunction(() => {
        return getSlugHandler(username);
      }, 400);
    } else {
      setSlugStatus(true, true, "Username cannot be empty!");
    }
  };

  const autoSuggestHandler = (payload) => {
    const res = autoSuggest(payload).then((response) => {
      const { result, error, status } = response;
      if (!error) {
        const inputData = result.map((item) => {
          return { label: item, value: item };
        });
        switch (payload.type) {
          case "language":
            setLanguages(inputData);
          case "looking_for":
            setLookingFor(inputData);
          case "interest":
            setInterests(inputData);
        }
      } else {
        enqueueSnackbar(error, { variant: "error" });
        return;
      }
    });
  };

  const validate = async () => {
    let validated = true;

    // if ((formData.slug_id === "" || !isSlugValid) && !isSlugDisabled) {
    //   return false;
    // }

    Object.keys(validateData).forEach((element) => {
      if (element === "slug_id") {
        if (validateData["slug_id"].isError) {
          validated = false;
          return false;
        }
      }

      if (formData[element].length === 0) {
        let validateInput = {
          [element]: { isError: true },
        };

        setValidateData((state) => {
          return { ...state, ...validateInput };
        });
        validated = false;
      } else {
        let validateInput = {
          [element]: { isError: false },
        };

        setValidateData((state) => {
          return { ...state, ...validateInput };
        });
      }
    });

    return validated;
  };

  const submitProfileData = (requestData) => {
    const res = startUserProfileOnboarding(requestData, false).then(
      (response) => {
        setIsLoading(false);
        const { result, error } = response;
        dispatch(setProfileData({ slug_id: requestData.slug_id }));
        if (error) {
          enqueueSnackbar(error, { variant: "error" });
          return;
        } else {
          // move to next step here
          history.push("step-two");
        }
      }
    );
  };

  const userProfileOnboardingHandler = () => {
    setIsLoading(true);
    let requestData = {
      user_id: currentUser.user_id,
      cover_url: formData.cover_url,
      slug_id: formData.slug_id,
      image_url: formData.image_url,
    };

    // let requestData = {
    //   user_id: currentUser.user_id,
    //   ...formData,
    //   expertise: formData.expertise.map((item) => item.value),
    //   looking_for: formData.looking_for.map((item) => item.value),
    //   languages: formData.languages.map((item) => item.value),
    // };

    const validateInput = validate().then((res) => {
      if (res) {
        // checking if any profile image is in the state
        if (profileImg) {
          const uploadData = new FormData();
          uploadData.append("file", profileImg);
          uploadImage(
            uploadData,
            currentUser.user_id,
            "profile_pic",
            "profile_pic"
          )
            .then((res) => {
              const { file_path } = res.result;
              if (!res.error) {
                requestData = { ...requestData, image_url: file_path };
                submitProfileData(requestData);
              } else {
                enqueueSnackbar(res.error, {
                  variant: "error",
                });
                return false;
              }
            })
            .catch((res) => {
              console.log(res);
              setIsLoading(false);
              enqueueSnackbar("There was a problem in uploading the image", {
                variant: "error",
              });
              return false;
            });
        } else {
          submitProfileData(requestData);
        }
      } else {
        setIsLoading(false);
        // if (formData.slug_id === "" || !isSlugValid) {
        //   enqueueSnackbar("Username field has errors", { variant: "error" });
        // } else {
        enqueueSnackbar("Please fill all the required fields", {
          variant: "error",
        });
        // }

        return;
      }
    });
  };

  const uploadCoverImage = () => {
    if (coverFileImg) {
      setIsLoading(true);
      const uploadData = new FormData();
      uploadData.append("file", coverFileImg);
      uploadImage(uploadData, currentUser.user_id, "cover_pic", "cover_pic")
        .then((res) => {
          setIsLoading(false);
          setShowCoverContainer(false);
          const { file_path } = res.result;
          if (!res.error) {
            setFormData((state) => {
              return { ...state, cover_url: file_path };
            });
          } else {
            enqueueSnackbar(res.error, {
              variant: "error",
            });
            return false;
          }
        })
        .catch((res) => {
          console.log(res);
          setIsLoading(false);
          enqueueSnackbar("There was a problem in uploading the image", {
            variant: "error",
          });
          return false;
        });
    } else {
      enqueueSnackbar("Select a cover image first", {
        variant: "error",
      });
      return false;
    }
  };

  const changeHandler = (e, el) => {
    let input = { [e.target.name]: e.target.value };

    setFormData((state) => {
      return { ...state, ...input };
    });

    const validateValue = e.target.value === "" ? true : false;
    let validateInput = {
      [e.target.name]: { isError: validateValue, isTouched: true },
    };
    setValidateData((state) => {
      return { ...state, ...validateInput };
    });
  };

  const changeDropDownHandler = (e, el) => {
    if (el.name === "location") {
      setFormData((state) => {
        return { ...state, [el.name]: e.value };
      });
      getFlag({ country: e.value }).then((res) => {
        const { error, result } = res;
        if (!error) {
          setFormData((state) => {
            return { ...state, flag_url: result };
          });
        } else {
          setFormData((state) => {
            return { ...state, location: "", flag_url: "" };
          });
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      });
    } else {
      setFormData((state) => {
        return { ...state, [el.name]: e };
      });
    }
  };

  const setUserName = (text) => {
    setFormData((state) => {
      return { ...state, slug_id: text };
    });

    getSlugHandler(text);
  };

  const getLocation = (lat, long) => {
    console.log(lat, long);
  };

  const fetCoverImagesHandler = () => {
    setIsLoading(true);
    fetchCoverImages().then((res) => {
      setIsLoading(false);
      const { result, error } = res;
      if (!error) {
        setCoverImages(result);
      } else {
        enqueueSnackbar("Couldn't fetch cover images", { variant: "error" });
      }
    });
  };

  const setCoverImageHandler = (image) => {
    // using this function to hide the modal also on cancel press
    if (image) {
      setFormData((state) => {
        return { ...state, cover_url: image };
      });
    }

    setShowCoverContainer(false);
  };

  const fetchUserDataHandler = () => {
    setIsLoading(true);
    fetchUserData({ user_id: currentUser.user_id }).then((response) => {
      const { result, error } = response;
      if (!error) {
        const {
          firstname,
          lastname,
          email,
          slug_id,
          location,
          designation,
          //   expertise,
          //   looking_for,
          //   languages,
          description,
          cover_pic_url,
          profile_pic_url,
        } = result;

        // const location = "";
        // const slug_id = "";

        if (slug_id !== "") {
          setIsSlugDisabled(true);

          setFormData((state) => {
            return { ...state, slug_id: slug_id };
          });
        }

        // let modifiedLanguage = languages.map((item) => {
        //   return { label: item, value: item };
        // });
        // let modifiedExpertise = expertise.map((item) => {
        //   return { label: item, value: item };
        // });
        // let modifiedLooking = looking_for.map((item) => {
        //   return { label: item, value: item };
        // });

        // if (location === "") {
        //   if ("geolocation" in navigator) {
        //     navigator.geolocation.getCurrentPosition(function (position) {
        //       const latitude = position.coords.latitude;
        //       const longitude = position.coords.longitude;
        //       getLocation(latitude, longitude);
        //     });
        //   }
        // }

        let userData = {
          first_name: firstname,
          last_name: lastname,
          email: email,
          slug_id: slug_id,
          location: location,
          role: designation,
          //   expertise: modifiedExpertise,
          //   looking_for: modifiedLooking,
          //   languages: modifiedLanguage,
          description: description || "",
          image_url: profile_pic_url,
          cover_url: cover_pic_url,
          location_coordinates: "",
        };

        setFormData(userData);
      } else {
        enqueueSnackbar(error, { variant: "error" });
        return;
      }
      setIsLoading(false);
    });
  };

  const setProfileImgHandler = (file) => {
    const fileSize = file.size / 1024 / 1024;
    if (fileSize > 10) {
      enqueueSnackbar("Image size must be less than 10 Mb", {
        variant: "error",
      });
      return;
    }
    setProfileImg(file);
  };

  // for checking slug suggestions
  //   useEffect(() => {
  //     slugDebounce();
  //   }, [formData.slug_id]);

  useEffect(() => {
    setIsLoading(true);
    // autoSuggestHandler({ type: "language", text: "" });
    // autoSuggestHandler({ type: "looking_for", text: "" });
    // autoSuggestHandler({ type: "interest", text: "" });
    fetCoverImagesHandler();
    fetchUserDataHandler();
  }, []);
  const handleFabClick = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  return (
    <UserProfileLayout title="User Profile Onboarding | Hivepath">
      <LoadingBackdrop open={isLoading} />

      <Container sx={{ pt: "16px" }} className="center">
        {/* <Paper className={classes.paperComponent}> */}
        <UserProfileOnboardingLayout active={1}>
          <Grid container spacing={2} style={{ marginBottom: "120px" }}>
            <Grid item xs={12} md={12}>
              <BasicDetailsSection
                openDrawer={openDrawer}
                handleDrawerClose={handleDrawerClose}
                user_id={currentUser.user_id}
                isSlugDisabled={isSlugDisabled}
                language={language}
                lookingFor={lookingFor}
                interests={interests}
                changeHandler={changeHandler}
                changeDropDownHandler={changeDropDownHandler}
                formData={formData}
                validateData={validateData}
                setUserName={setUserName}
                onProfileChange={setProfileImgHandler}
                onCoverChange={setCoverFileImg}
                coverFileImg={coverFileImg}
                profileImg={profileImg}
                coverImages={coverImages}
                setCoverImageHandler={setCoverImageHandler}
                showCoverContainer={showCoverContainer}
                setShowCoverContainer={setShowCoverContainer}
                uploadCoverImage={uploadCoverImage}
                slugDebounce={slugDebounce}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.footerContainer}>
            <Grid
              item
              xs={12}
              md={12}
              align="center"
              mt={5}
              className={`center ${classes.footer}`}
            >
              <PrimaryButton
                title="Continue"
                // onClick={uploadImg}
                onClick={userProfileOnboardingHandler}
              />
            </Grid>
          </Grid>
        </UserProfileOnboardingLayout>

        {/* </Paper> */}
      </Container>
      {matches && <CustomFab title={"Tips"} handleClick={handleFabClick} />}
    </UserProfileLayout>
  );
};

export default StepOne;
