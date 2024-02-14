import { Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LPUserProfileCard from "sections/AppPages/LandingPageSections/HomeSections/Components/LPUserProfileCard";
import { fetchUserProfiles } from "sections/AppPages/LandingPageSections/utils/homeService";
import {
  setProfiles,
  setSuggestedProfiles,
} from "store/landing-page/landingPageSlice";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import authFetch from "utils/authFetch";
import SectionLoadingIndicator from "components/Common/Feedback/SectionLoadingIndicator";
import { unbookmarkProfile } from "../../../utils/homeService";
import lodash from "lodash";
import {
  showBookmarkModal,
  updateProfile,
} from "store/landing-page/landingPageSlice";

const mapState = ({ user, landingPage }) => ({
  currentUser: user.currentUser,
  suggestedProfiles: landingPage.suggestedProfiles,
});

const NewLandingPageProfileSection = () => {
  const data = [];
  const dispatch = useDispatch();
  const { currentUser, suggestedProfiles } = useSelector(mapState);
  const [isLoading, setIsLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const sortedSuggestedprofiles = lodash.orderBy(
    suggestedProfiles,
    "first_name",
    "asc"
  );

  const fetchProfiles = () => {
    setIsLoading(true);
    const requestData = { user_id: currentUser.user_id };
    // fetchUserProfiles(requestData)
    const url = "https://landingpage.hivepath.io/api/fetchAllOthersProfiles";
    authFetch(url, requestData)
      .then((res) => {
        if (res.status === "success") {
          const { error, result } = res;
          setIsLoading(false);
          dispatch(setSuggestedProfiles(result));
        }
        // enqueueSnackbar(error, { variant: "error" });
      })
      .catch((res) => {
        setIsLoading(false);
        enqueueSnackbar("Couldn't connect with the server", {
          variant: "error",
        });
        return;
      });
  };

  const openBookmarkModal = (user_id) => {
    dispatch(
      showBookmarkModal({
        open: true,
        type: "profile",
        user_id: user_id,
      })
    );
  };

  const unbookmarkProfileHandler = (user_id, bookmark_id) => {
    // setIsLoading(true);
    unbookmarkProfile({ object_id: bookmark_id })
      .then((res) => {
        // setIsLoading(false);
        const { error } = res;
        if (!error) {
          enqueueSnackbar("Unbookmarked succesfully", { variant: "success" });
          dispatch(
            updateProfile({
              user_id: user_id,
              bookmark_done: false,
            })
          );
          return;
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      })
      .catch((res) => {
        // setIsLoading(false);
        console.log(res);
        enqueueSnackbar(res.message, { variant: "error" });
        return;
      });
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      {/* <Typography
        style={{
          fontWeight: " bold",
          fontSize: "26px",
          lineHeight: " 34px",
          color: " #000000",
          paddingLeft: "16px",
        }}
      >
        Explore network
      </Typography> */}

      {isLoading ? (
        <SectionLoadingIndicator />
      ) : (
        <Grid container>
          {sortedSuggestedprofiles.map((item, index) => {
            const {
              image_url,
              first_name,
              last_name,
              role,
              company,
              profile_headline_description,
              user_id,
              slug_id,
              bookmark_done,
              bookmark_id,
              top_offering,
            } = item;

            if (
              Array.isArray(top_offering) 
              // &&
              // top_offering.length > 0 
              // &&
              // (top_offering[0].title !== "" || top_offering[1].title !== "")
            ) {
              return (
                <Grid item xs={12} sm={4} md={2.4}>
                  <LPUserProfileCard
                    key={"upl" + index}
                    imgUrl={
                      image_url ||
                      "https://www.auramarine.com/wp-content/uploads/2018/03/man-placeholder-e1520494457998.png"
                    }
                    userName={first_name + " " + last_name}
                    designation={`${role} at ${company}`}
                    profile_headline_description={profile_headline_description}
                    user_id={user_id}
                    slug_id={slug_id}
                    bookmark_done={bookmark_done}
                    bookmark_id={bookmark_id}
                    handleBookmark={openBookmarkModal}
                    handleUnbookmark={unbookmarkProfileHandler}
                    topOffering={top_offering}
                  />
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      )}
    </div>
  );
};

export default NewLandingPageProfileSection;
