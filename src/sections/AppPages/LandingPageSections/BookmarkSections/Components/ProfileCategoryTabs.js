import "index.css";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Paper, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import noBookmarkProfile from "assets/svg/all/new-icons/empty-states/bookmarks/no-bookmark.svg";
import BookmarkedProfileCard from "./BookmarkedProfileCard";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import LPUserProfileCard from "../../HomeSections/Components/LPUserProfileCard";
import { unbookmarkProfile } from "../../utils/homeService";
import { updateBookmarks } from "store/landing-page/landingPageSlice";

const mapState = ({ landingPage }) => ({
  bookmarkedProfileData: landingPage.bookmarks.profiles || {},
  bookmarkData: landingPage.bookmarks,
});

export default function ProfileCategoryTabs({
  setCategory,
  category,
  ...props
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const enqueueSnackbar = useEnquequeSnackbar();
  const { bookmarkedProfileData, bookmarkData } = useSelector(mapState);
  let filteredData = [];
  if (category in bookmarkedProfileData) {
    const { data } = bookmarkedProfileData[category];
    filteredData = data.filter((item) => !item.unbookmarked);
  }

  const unbookmarkProfileHandler = (user_id, object_id, bookmark_name) => {
    const elementsIndex = bookmarkData.profiles[bookmark_name].data.findIndex(
      (element) => element.object_id === object_id
    );
    let newArray = [...bookmarkData.profiles[bookmark_name].data];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      unbookmarked: true,
    };

    // setIsLoading(true);
    unbookmarkProfile({ object_id: object_id })
      .then((res) => {
        // setIsLoading(false);
        const { error } = res;
        if (!error) {
          enqueueSnackbar("Unbookmarked succesfully", { variant: "success" });
          dispatch(
            updateBookmarks({
              ...bookmarkData,
              profiles: {
                ...bookmarkData.profiles,
                [bookmark_name]: {
                  ...bookmarkData.profiles[bookmark_name],
                  data: [...newArray],
                },
              },
            })
          );
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      })
      .catch((res) => {
        // setIsLoading(false);
        console.log(res);
        enqueueSnackbar("An error occured", { variant: "error" });
        return;
      });
  };

  const emptyStateNavigation = () => {
    history.push("/profiles");
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        {/* <Grid
          item
          xs={12}
          md={12}
          align="left"
          style={{ height: "80vh", overflow: "hidden", overflowY: "scroll" }}
          className="suggested-session-list"
          pb={10}
        > */}
        {filteredData.length === 0 && (
          <Grid item xs={12} md={12} sm={12}>
            <BaseEmptyStateComponent
              imgSrc={noBookmarkProfile}
              imageStyles={{ width: "200px" }}
              buttonTitle={`Explore`}
              onButtonClick={emptyStateNavigation}
              message={`You currently don't  have any saved profiles!`}
              shortDescription={`Find amazing people`}
            />
          </Grid>
        )}

        {filteredData &&
          filteredData.map((profileCard, pindex) => {
            const {
              company,
              first_name,
              image_url,
              last_name,
              object_id,
              role,
              slug_id,
              user_id,
              top_offering,
			  profile_headline_description
            } = profileCard;
            if (!profileCard.unbookmarked) {
              return (
                <Grid item xs={12} md={2.4} sm={4}>
                  <LPUserProfileCard
                    key={profileCard.object_id}
                    data={profileCard}
                    bookmark_name={category}
                    imgUrl={image_url}
                    userName={`${first_name} ${last_name}`}
                    designation={`${role} at ${company}`}
					profile_headline_description={profile_headline_description}
                    user_id={user_id}
                    slug_id={slug_id}
                    bookmark_done={true}
                    bookmark_id={object_id}
                    handleUnbookmark={unbookmarkProfileHandler}
					topOffering={top_offering}
                  />
                </Grid>
              );
            }
          })}
        {/* </Grid> */}
      </Grid>
    </Box>
  );
}
