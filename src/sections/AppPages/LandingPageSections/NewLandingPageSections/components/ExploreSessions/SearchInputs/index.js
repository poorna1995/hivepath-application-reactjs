import { Grid, TextField, Button } from "@mui/material";

import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import { LANDING_PAGE_SERVICES } from "constants/API_URLS";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  setRecommendedOfferings,
} from "store/landing-page/landingPageSlice";
import authFetch from "utils/authFetch";
import { setSectionLoading } from "store/loaders/loadersSlice";

const mapState = ({ user,loaders }) => ({
  currentUser: user.currentUser,
  isLoading:loaders.sectionLoader
});

const SearchInputs = () => {
  const { currentUser, isLoading } = useSelector(mapState);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState("");
  const [availability, setAvailability] = useState("");
  const dispatch = useDispatch();
  const disableButton = !category && !topics && !availability;
  const [relatedTopics, setRelatedTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRelatedTopics = () => {
    const url = "https://utils.hivepath.io/api/fetchExpertiseList";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setRelatedTopics(json.result);
        }
      });

    // console.log(json);
  };

  useEffect(() => {
    const url = "https://landingpage.hivepath.io/api/exploreOfferingsFilters";
    const data = {
      user_id: currentUser.user_id,
    };

    authFetch(url, data)
      .then((json) => {
        // console.log("json categories", json);
        // setCategories(json.result);
        // setRelatedTopics(json.result);
        if (json.status === "success") {
          console.log({ filterCategories: json.result });
          setCategories(json.result.topics_list);
          setRelatedTopics(json.result.expertise_list);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log({ categories, relatedTopics });
  const options =
    Array.isArray(categories) &&
    categories.length > 0 &&
    categories.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  const topicOptions =
    Array.isArray(relatedTopics) &&
    relatedTopics.length > 0 &&
    relatedTopics.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  const handleClick = () => {
    // dispatch(
    //   setFilters({
    //     topic: category.value,
    //     skill: topics.value,
    //     availability: availability.value,
    //   })
    // );
  };
  // console.log({
  //   category: category.value,
  //   skill: topics,
  //   availability,
  // });

  const handleFilter = () => {
    setLoading(true);
    dispatch(setSectionLoading(true));
    const filterURL = LANDING_PAGE_SERVICES.FILTERED_OFFERINGS;

    // "https://landingpage.hivepath.io/api/filteredOfferings";

    const filterData = {
      user_id: currentUser.user_id,
      category: category.value,
      topics: topics.value,
      availability: availability.value,
    };

    authFetch(filterURL, filterData).then((json) => {
      if (json.status === "success") {
        dispatch(setRecommendedOfferings(json.result));
        setLoading(false);
        dispatch(setSectionLoading(false));
      }
    });
  };

  const availabilityOptions = [
    {
      label: "Starting Soon",
      value: "starting_soon",
    },
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Tomorrow",
      value: "tomorrow",
    },
    {
      label: "This Week",
      value: "this_week",
    },
    {
      label: "Next Week",
      value: "next_week",
    },
    {
      label: "This Month",
      value: "this_month",
    },
    {
      label: "Next Month",
      value: "next_month",
    },
  ];
  const resetForm = () => {
    setCategory("");
    setTopics("");
    setAvailability("");
  };

  const handleClearFilters = () => {
    setLoading(true);
    dispatch(setSectionLoading(true));
    const filterURL = LANDING_PAGE_SERVICES.FILTERED_OFFERINGS;
    // "https://landingpage.hivepath.io/api/filteredOfferings";

    const filterData = {
      user_id: currentUser.user_id,
    };

    authFetch(filterURL, filterData).then((json) => {
      if (json.status === "success") {
        dispatch(setRecommendedOfferings(json.result));
        setLoading(false);
        dispatch(setSectionLoading(false));
        resetForm();
      }
    });
  };

  return (
    <Grid
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "space-between",
      // }}
      alignItems={"center"}
      container
      spacing={2}
      padding={2}
    >
      <Grid item md={2}>
        <FormSelectInput
          value={category}
          options={options}
          onChange={(e) => setCategory(e)}
          noPadding
          placeholder="Topics"
        />{" "}
      </Grid>
      <Grid item md={2}>
        <FormSelectInput
          value={topics}
          options={topicOptions}
          onChange={(e) => setTopics(e)}
          noPadding
          placeholder="Keywords"
        />{" "}
        {/* <TextInput
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          noMargin
          placeholder="Exertise/SKills"
          inputProps={{
            style: { paddingTop: "12px", paddingBottom: "12px" },
          }}
        />{" "} */}
      </Grid>
      <Grid item md={2}>
        <FormSelectInput
          noPadding
          placeholder="Availability"
          value={availability}
          onChange={(e) => setAvailability(e)}
          options={availabilityOptions}
        />
      </Grid>
      <Grid item md={6}>
        <PrimaryButton
          title={`Search `}
          disabled={disableButton || isLoading}
          onClick={handleFilter}
        />
        <Button
          onClick={handleClearFilters}
          style={{
            textTransform: "initial",
            textDecoration: "underline",
          }}
          disabled={disableButton || isLoading}
        >
          Clear filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchInputs;
