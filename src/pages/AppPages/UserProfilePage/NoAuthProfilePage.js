import knowledgeSessionIcon from "assets/svg/user-profile/knowledgeSession.svg";
import ProfileIcon from "assets/svg/dropdown/profile.svg";
import coverPlaceholder from "assets/svg/onboarding-pages/user-profile/cover.svg";

import { Container, Grid, Skeleton, Toolbar } from "@mui/material";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useParams } from "react-router";

import { educationData } from "data/UserProfilePage/AboutUser/educationData";
import { experienceData } from "data/UserProfilePage/AboutUser/experienceData";
import UserProfileInfo from "sections/AppPages/UserProfileSections/UserProfileInfo";

import AboutMeSection from "sections/AppPages/UserProfileSections/AboutMeSection";
import OfferingList from "sections/AppPages/UserProfileSections/Offerings/OfferingList";

import NoAuthAppHeader from "components/NoAuthAppHeader";
import Seo from "components/Seo";
import NoMatchPath from "components/NoMatch";

import { setProfileSessions } from "store/user-profile/userProfileSlice";

import {
  fetchUserProfile,
  fetchUserData,
  fetchAllOfferings,
  fetchProfileData,
  fetchPublicOfferings,
} from "sections/AppPages/UserProfileSections/utils/userDataService";
import { convertArrayToObject } from "sections/AppPages/LandingPageSections/utils/arrayToObjects";

const mapState = ({ user, userProfile }) => ({
  currentUser: user.currentUser,
  sessions: userProfile.sessions,
});

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { currentUser, sessions } = useSelector(mapState);
  const { slug_id } = useParams();

  let offeringInput = { slug_id: slug_id };

  const [noMatch, setNoMatch] = useState(false);
  const [headline, setHeadline] = useState("");
  const [userData, setUserData] = useState({});
  const [userProfileData, setUserProfileData] = useState({});
  const [offerings, setOfferings] = useState([]);
  const [isOfferingLoading, setIsOfferingLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  let tabsData = [
    {
      id: 0,
      label: "About Me",
      component: (
        <AboutMeSection
          profileData={userProfileData}
          userData={userData}
          educationData={educationData}
          experienceData={experienceData}
        />
      ),
    },
  ];

  if (Object.keys(sessions).length) {
    tabsData = [
      {
        id: 0,
        label: "Knowledge Session",
        component: (
          <OfferingList
            title={`Offerings by ${userData.firstname}`}
            hostName={userData.firstname}
            headline={headline}
          />
        ),
      },

      {
        id: 1,
        label: "About Me",
        component: (
          <AboutMeSection
            profileData={userProfileData}
            userData={userData}
            educationData={educationData}
            experienceData={experienceData}
          />
        ),
      },
    ];
  }

  const enqueueSnackbar = useEnquequeSnackbar();

  const fetchUserDataHandler = () => {
    setIsUserLoading(true);
    const requestData = {
      urlType: "publicFetchUserData",
      inputData: offeringInput,
    };
    fetchProfileData(requestData)
      .then((response) => {
        setIsUserLoading(false);
        const { error, result } = response;

        if (!error) {
          setUserData({ ...result });
        } else {
          setNoMatch(true);
          //   enqueueSnackbar(error, { variant: "error" });
          //   return;
        }
      })
      .catch((res) => {
        console.log(res);
        setIsUserLoading(false);
      });
  };

  const fetchUserProfileDataHandler = () => {
    const requestData = {
      urlType: "publicFetchUserProfile",
      inputData: offeringInput,
    };

    fetchProfileData(requestData).then((response) => {
      const { error, result } = response;
      if (!error) {
        setUserProfileData({ ...result["profile_data"] });
        const { knowledge_session_headline_description } =
          result["profile_data"];
        setHeadline(knowledge_session_headline_description);
      } else {
        setNoMatch(true);
        // enqueueSnackbar(error, { variant: "error" });
        // return;
      }
    });
  };

  const fetchOfferingsHandler = () => {
    setIsOfferingLoading(true);
    const requestData = {
      urlType: "publicFetchAllOffering",
      inputData: offeringInput,
    };

    fetchPublicOfferings(requestData)
      .then((response) => {
        setIsOfferingLoading(false);
        const { error, result } = response;

        // setHeadline(headline_description);

        if (!error) {
          setOfferings(result);
          const data = convertArrayToObject(result, "session_id");
          dispatch(setProfileSessions(data));
        } else {
          setNoMatch(true);
          //   enqueueSnackbar(error, { variant: "error" });
          //   return;
        }
      })
      .catch((res) => {
        console.log(res);
        setIsOfferingLoading(false);
      });
  };

  useEffect(() => {
    fetchUserDataHandler();
    fetchUserProfileDataHandler();
    fetchOfferingsHandler();
  }, []);

  if (noMatch) {
    return <NoMatchPath />;
  }

  return (
    <div>
      <NoAuthAppHeader />
      <Toolbar style={{ height: "80px" }} />
      <Seo
        title={userData && `${userData?.name} | Hivepath `}
        description={userData && userData.description}
        imageSrc={userData && userData?.profile_pic_url}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <UserProfileInfo
            userProfile
            data={userData}
            tabsData={tabsData}
            offerings={offerings}
            isOfferingLoading={isOfferingLoading}
            isUserLoading={isUserLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfilePage;
