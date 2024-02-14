import "index.css";

import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import noBookmarkProfile from "assets/svg/all/new-icons/empty-states/bookmarks/no-bookmark.svg";
import UnstyledModal from "components/Common/Modals/UnstyledModal";
import RecommendedOfferingModal from "../../HomeSections/Components/RecommendedOfferingModal";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

// import BSSessionCard from "./BSSessionCard";
import RecommendedOfferingCard from "sections/AppPages/LandingPageSections/HomeSections/Components/RecommendedOfferingCard";
import CompleteOnboardingDialog from "sections/AppPages/UserPages/SchedulerSections/Components/CompleteOnboardingDialog.";

import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import { updateBookmarks } from "store/landing-page/landingPageSlice";
import { unbookmarkSession } from "../../utils/homeService";

const mapState = ({ landingPage }) => ({
  bookmarkedSessionData: landingPage.bookmarks.sessions || {},
  bookmarkData: landingPage.bookmarks,
});

export default function SessionCategoryTabs({
  setCategory,
  category,
  ...props
}) {
  const history = useHistory();
  const { bookmarkedSessionData, bookmarkData } = useSelector(mapState);
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const [openObDialog, setOpenObDialog] = useState(false);
  const toggleOBDialog = () => setOpenObDialog((state) => !state);

  let filteredData = null;
  if (category in bookmarkedSessionData) {
    const { data } = bookmarkedSessionData[category];
    filteredData = data.filter((item) => !item.unbookmarked);
  }

  const unbookmarkSessionHandler = (bookmark_id) => {
    const updatedBookmarks = bookmarkData.sessions[category].data.map((item) =>
      item.bookmark_id === bookmark_id
        ? { ...item, unbookmarked: true }
        : { ...item }
    );

    // setIsLoading(true);
    unbookmarkSession({ object_id: bookmark_id })
      .then((res) => {
        // setIsLoading(false);
        const { error } = res;
        if (!error) {
          enqueueSnackbar("Unbookmarked succesfully", { variant: "success" });
          dispatch(
            updateBookmarks({
              ...bookmarkData,
              sessions: {
                ...bookmarkData.sessions,
                [category]: {
                  ...bookmarkData.sessions[category],
                  data: [...updatedBookmarks],
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
        enqueueSnackbar(res.message, { variant: "error" });
        return;
      });
  };

  const navigateToSession = () => {
	history.push('/explore')
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CompleteOnboardingDialog
        open={openObDialog}
        handleClose={toggleOBDialog}
      />

      <Grid container>
        <Grid
          item
          xs={12}
          md={12}
          align="left"
          style={{ overflow: "hidden", overflowY: "scroll", paddingTop: "0" }}
          className="suggested-session-list"
          //   pt={3}
        >
          {(!filteredData || filteredData.length === 0) && (
            <BaseEmptyStateComponent
              imgSrc={noBookmarkProfile}
              imageStyles={{ width: "200px" }}
              buttonTitle={`Explore`}
              message={`You currently don’t have any saved sessions!
              `}
              shortDescription={`Find interesting topics `}
              onButtonClick={navigateToSession}
            />
          )}
          <Grid container spacing="2">
            {filteredData &&
              filteredData.map((sessionCard, sindex) => {
                return (
                  <Grid item xs={12} md={4}>
                    <RecommendedOfferingCard
                      key={`bsscard${sindex}`}
                      data={{ ...sessionCard, bookmark_done: true }}
                      handleUnbookmark={unbookmarkSessionHandler}
                      toggleOBDialog={toggleOBDialog}
                      bookmarkAction={true}
                    />
                    {/* <BSSessionCard
                      key={`bsscard${sindex}`}
                      data={sessionCard}
                      bookmark_name={category}
                      modalHandler={setModalOpen}
                      setModalData={setModalData}
                    /> */}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
