import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertArrayToObject } from "sections/AppPages/LandingPageSections/utils/arrayToObjects";
import { fetchUserProfiles } from "sections/AppPages/LandingPageSections/utils/homeService";
import { setProfiles } from "store/landing-page/landingPageSlice";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useEffect } from "react";
import UserInfoContainer from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/HostSessionListItem/UserInfoContainer";
import { Typography } from "@mui/material";

const mapState = ({ user, landingPage }) => ({
  currentUser: user.currentUser,
  suggestedProfiles: landingPage.profiles,
});

const RecommendedHostsList = () => {
  const dispatch = useDispatch();
  const { currentUser, suggestedProfiles } = useSelector(mapState);
  const [isLoading, setIsLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();

  const fetchProfiles = () => {
    setIsLoading(true);
    const requestData = { user_id: currentUser.user_id };
    fetchUserProfiles(requestData)
      .then((res) => {
        const { error, result } = res;
        setIsLoading(false);
        if (!error) {
          const modifiedProfilesData = convertArrayToObject(result, "user_id");
          dispatch(setProfiles(result));
        } else {
          enqueueSnackbar(error, { variant: "error" });
          return;
        }
      })
      .catch((res) => {
        setIsLoading(false);
        enqueueSnackbar("Couldn't connect with the server", {
          variant: "error",
        });
        return;
      });
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
  const filterProfiles = suggestedProfiles.slice(0, 5);

  return (
    <div
      style={
        {
          // background:
          //   "linear-gradient(273.01deg, #FFFFFF 3.29%, #FFFFFF 102.13%)",
        }
      }
    >
      <Typography
        style={{
          fontSize: "26px",
          fontWeight: "700",
        }}
      >Hosts to connect with!
      </Typography>{" "}
      <div
        style={{
          paddingBottom: "16px",
          // paddingTop: "8px",
          // paddingLeft: "16px",
          background: "#F3F3F3",
          // marginRight: "-16px",
          borderRadius: "15px",
          // marginTop:'8px'
        }}
      >
        {filterProfiles.map((item) => {
          const { slug_id, first_name, last_name, company, role, image_url, profile_headline_description } =
            item;

          return (
            <div style={{ padding: "4px", marginLeft: "8px" }}>
              <UserInfoContainer
                first_name={first_name}
                last_name={last_name}
                slug_id={slug_id}
                company={company}
                role={role}
                profile_headline_description={profile_headline_description}
                image_url={image_url}
                gradientStyle={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedHostsList;
