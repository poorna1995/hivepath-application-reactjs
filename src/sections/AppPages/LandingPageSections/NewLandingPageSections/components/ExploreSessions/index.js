import OfferingSkeletonCard from "components/SkeletonComponents/OfferingSkeletonCard";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecommendedOfferingCard from "sections/AppPages/LandingPageSections/HomeSections/Components/RecommendedOfferingCard";
import CompleteOnboardingDialog from "sections/AppPages/UserPages/SchedulerSections/Components/CompleteOnboardingDialog.";
import { convertArrayToObject } from "sections/AppPages/LandingPageSections/utils/arrayToObjects";
import { fetchRecommendedSessions } from "sections/AppPages/LandingPageSections/utils/homeService";

import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useState } from "react";
import {
  setRecommendedOfferings,
  setSessions,
  showBookmarkModal,
  updateExploreSession,
} from "store/landing-page/landingPageSlice";

import { unbookmarkSession } from "../../../utils/homeService";

import { Grid, Typography, useMediaQuery } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SearchInputs from "./SearchInputs";
import authFetch from "utils/authFetch";
import SectionLoadingIndicator from "components/Common/Feedback/SectionLoadingIndicator";
import { LANDING_PAGE_SERVICES } from "constants/API_URLS";
import { useTheme } from "@mui/styles";
import { setSectionLoading } from "store/loaders/loadersSlice";

const mapState = ({ user, landingPage, loaders }) => ({
  currentUser: user.currentUser,
  recommendedSessions: landingPage.sessions,
  filters: landingPage.filters,
  landingPage: landingPage,
  loading: loaders.sectionLoader,
});

const ExploreSessions = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openObDialog, setOpenObDialog] = useState(false);
  const toggleOBDialog = () => setOpenObDialog((state) => !state);

  const enqueueSnackbar = useEnquequeSnackbar();
  const { currentUser, recommendedSessions, filters, landingPage, loading } =
    useSelector(mapState);
  //   const recommendedSessions = {};
  const emptyList = [1];
  const myRecommendations = landingPage.recommendedOfferings;

  const fetchSessions = () => {
    setIsLoading(true);
    dispatch(setSectionLoading(true));
    const filterURL = LANDING_PAGE_SERVICES.FILTERED_OFFERINGS;
    // "https://landingpage.hivepath.io/api/filteredOfferings";

    const filterData = {
      user_id: currentUser.user_id,
      // category: category.value,
      // topics: topics.value,
      // availability: availability.value,
    };

    authFetch(filterURL, filterData).then((json) => {
      if (json.status === "success") {
        dispatch(setRecommendedOfferings(json.result));
        setIsLoading(false);
        dispatch(setSectionLoading(false));
  
      }
    });
    // const requestData = { user_id: currentUser.user_id };
    // fetchRecommendedSessions(requestData)
    //   .then((res) => {
    //     setIsLoading(false);
    //     if (!res.error) {
    //       const modifiedSessionData = convertArrayToObject(
    //         res.result,
    //         "session_id"
    //       );
    //       dispatch(setSessions(res.result));
    //     } else {
    //       enqueueSnackbar(res.error, { variant: "error" });
    //       return;
    //     }
    //   })
    //   .catch((res) => {
    //     setIsLoading(false);
    //     enqueueSnackbar("Couldn't connect with the server", {
    //       variant: "error",
    //     });
    //     return;
    //   });
  };

  const toggleModal = () => {
    setModalOpen((state) => !state);
  };

  const openBookmarkModal = (session_id) => {
    dispatch(
      showBookmarkModal({
        open: true,
        type: "session",
        session_id: session_id,
        explore: true,
      })
    );
  };

  const unbookmarkSessionHandler = (bookmark_id, session_id) => {
    // setIsLoading(true);
    unbookmarkSession({ object_id: bookmark_id })
      .then((res) => {
        // setIsLoading(false);
        const { error } = res;
        if (!error) {
          enqueueSnackbar("Unbookmarked succesfully", { variant: "success" });
          dispatch(
            updateExploreSession({
              session_id: session_id,
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
    fetchSessions();
  }, []);

  return (
    <div>
      <CompleteOnboardingDialog
        open={openObDialog}
        handleClose={toggleOBDialog}
      />

      <div
        style={{
          position: "sticky",
          top: matches ? "121px" : "129px",
          zIndex: 200,
          background: "white",
          // marginTop: "-16px",
          paddingTop: "16px",
          // marginLeft: "-16px",
        }}
      >
        {/* <Typography
          style={{
            fontWeight: " bold",
            fontSize: "26px",
            lineHeight: " 34px",
            color: " #000000",
            paddingLeft: "16px",
          }}
        >
          Explore 1:1 sessions
        </Typography>{" "} */}
        <SearchInputs />
      </div>
      {loading ? (
        <>
          <SectionLoadingIndicator handleClearFilter={() => fetchSessions()} />{" "}
          {/* {emptyList.map((item, index) => (
            <OfferingSkeletonCard key={`skeleton${index}`} />
          ))} */}
        </>
      ) : (
        <Grid container spacing={2}>
          {Array.isArray(myRecommendations) &&
            //   Object.keys(recommendedSessions)
            myRecommendations.length > 0 &&
            myRecommendations.map((item, index) => {
              // console.log(item);
              return (
                <Grid item xs={12} md={4} sm={6}>
                  <RecommendedOfferingCard
                    key={"recommendedCard" + index}
                    data={item}
                    handleBookmark={openBookmarkModal}
                    handleUnbookmark={unbookmarkSessionHandler}
                    toggleOBDialog={toggleOBDialog}
                    bookmarkAction={true}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}
    </div>
  );
};

export default ExploreSessions;
