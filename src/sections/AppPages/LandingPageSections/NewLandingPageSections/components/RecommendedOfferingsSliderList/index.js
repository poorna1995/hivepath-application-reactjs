import { Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertArrayToObject } from "sections/AppPages/LandingPageSections/utils/arrayToObjects";
import { fetchRecommendedSessions } from "sections/AppPages/LandingPageSections/utils/homeService";
import { setSessions } from "store/landing-page/landingPageSlice";
import RecommendedOfferingsSlider from "./RecommendedOfferingsSlider";

const mapState = ({ user, landingPage }) => ({
  currentUser: user.currentUser,
  recommendedSessions: landingPage.sessions,
});

const RecommendedOfferingsSliderList = () => {
  const { currentUser, recommendedSessions } = useSelector(mapState);
  const filterSessions = recommendedSessions.slice(0, 15);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchSessions = () => {
    setLoading(true);
    // setIsLoading(true);
    const requestData = { user_id: currentUser.user_id };
    fetchRecommendedSessions(requestData)
      .then((res) => {
        // setIsLoading(false);
        setLoading(false);
        if (!res.error) {
          dispatch(setSessions(res.result));
        } else {
          //   enqueueSnackbar(res.error, { variant: "error" });
          //   return;
        }
      })
      .catch((res) => {
        setLoading(false);
        // setIsLoading(false);
        // enqueueSnackbar("Couldn't connect with the server", {
        //   variant: "error",
        // });
        return;
      });
  };

  const toggleModal = () => {
    // setModalOpen((state) => !state);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <RecommendedOfferingsSlider data={filterSessions} loading={loading} />
    </div>
  );
};

export default RecommendedOfferingsSliderList;
