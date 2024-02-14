import React, { useState, useEffect, createRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Box, Container, IconButton, Button } from "@mui/material";
import RecommendedOfferingCard from "sections/AppPages/LandingPageSections/HomeSections/Components/RecommendedOfferingCard";
import CompleteOnboardingDialog from "sections/AppPages/UserPages/SchedulerSections/Components/CompleteOnboardingDialog.";

import { Typography } from "@mui/material";
import { ReactComponent as RightArrow } from "assets/svg/all/new-icons/landing-page/right-arrow.svg";
import { useSelector } from "react-redux";
import {
  showBookmarkModal,
  updateSession,
} from "store/landing-page/landingPageSlice";
import { unbookmarkSession } from "../../../utils/homeService";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import SectionLoadingIndicator from "components/Common/Feedback/SectionLoadingIndicator";
import { Link } from "react-router-dom";
const mapState = ({ view }) => ({
  drawerOpen: view.ua_drawer_open,
});

const RecommendedOfferingsSlider = ({ data, loading }) => {
  const { drawerOpen } = useSelector(mapState);
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();

  const [sliderRef, setSliderRef] = useState(null);
  const [openObDialog, setOpenObDialog] = useState(false);
  const toggleOBDialog = () => setOpenObDialog((state) => !state);

  const settings = {
    // focusOnSelect: true,
    infinite: false,
    swipeToSlide: true,
    slidesToShow: drawerOpen ? 2.5 : 3,
    slidesToScroll: 1,
    width: "inherit",
    height: "inherit",
    // beforeChange: (current, next) => this.setState({ activeSlide: next }),
    // afterChange: current => this.setState({ activeSlide2: current })

    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // beforeChange: (current, next) => setCurrentSlide(current),
  };
  // console.log(sliderRef, { currentSlide });

  // function slide(y) {
  //   y > 0 ? sliderRef.slickNext() : sliderRef.slickPrev();
  // }

  // useEffect(() => {
  //   window.addEventListener("wheel", (e) => {
  //     slide(e.wheelDelta);
  //   });
  // }, []);

  // const sliderRef = createRef();
  // const scroll = useCallback(
  //   (y) => {
  //     if (y > 0) {
  //       return sliderRef?.current?.slickNext(); /// ? <- using description below
  //     } else {
  //       return sliderRef?.current?.slickPrev();
  //     }
  //   },
  //   [sliderRef]
  // );
  // useEffect(() => {
  //   window.addEventListener("wheel", (e) => {
  //     scroll(e.deltaY);
  //     console.log(e.deltaY);
  //   });
  // }, [scroll]);
  // console.log({ sliderRef });

  const openBookmarkModal = (session_id) => {
    dispatch(
      showBookmarkModal({
        open: true,
        type: "session",
        session_id: session_id,
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
            updateSession({
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
        enqueueSnackbar("An error occured", { variant: "error" });
        return;
      });
  };

  return (
    <Container maxWidth={`1200px`} width="100%">
      <CompleteOnboardingDialog
        open={openObDialog}
        handleClose={toggleOBDialog}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Typography
          style={{
            fontSize: "26px",
            fontWeight: "700",
            flex: 0.8,
          }}
        >
          Knowledge Sessions for you{" "}
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            sx={{
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "21px",
              textDecorationLine: "underline",
              color: "#222222",
              textTransform: "initial",
              "&:hover": {
                // textTransform: "initial",
                textDecoration: "underline",
                background: "transparent",
              },
            }}
            component={Link}
            to="/explore"
          >
            Explore
          </Button>
          <div className="controls">
            <IconButton
              onClick={sliderRef?.slickPrev}
              disabled={!sliderRef?.slickPrev}
            >
              <RightArrow
                style={{
                  height: "20px",
                  width: "20px",
                  transform: "rotate(180deg)",
                }}
              />{" "}
            </IconButton>
            <IconButton
              onClick={sliderRef?.slickNext}
              disabled={!sliderRef?.slickNext}
            >
              <RightArrow
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />
            </IconButton>
          </div>
        </div>
      </div>

      {loading ? (
        <SectionLoadingIndicator />
      ) : (
        <Slider ref={setSliderRef} {...settings} arrows={false}>
          {Array.isArray(data) &&
            data.map((item, index) => {
              // const {title} = item;
              return (
                <RecommendedOfferingCard
                  key={"recommendedCard" + index}
                  data={item}
                  handleBookmark={openBookmarkModal}
                  handleUnbookmark={unbookmarkSessionHandler}
                  toggleOBDialog={toggleOBDialog}
                  bookmarkAction={true}
                />
              );
            })}
        </Slider>
      )}
    </Container>
  );
};

export default RecommendedOfferingsSlider;
