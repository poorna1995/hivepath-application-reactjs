import knowledgeSessionIcon from "assets/svg/user-profile/knowledgeSession.svg";
import ProfileIcon from "assets/svg/dropdown/profile.svg";
import coverPlaceholder from "assets/svg/onboarding-pages/user-profile/cover.svg";

import { Container, Grid, Skeleton } from "@mui/material";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { educationData } from "data/UserProfilePage/AboutUser/educationData";
import { experienceData } from "data/UserProfilePage/AboutUser/experienceData";
import UserProfileInfo from "sections/AppPages/UserProfileSections/UserProfileInfo";
import { FaBlog, FaHome, FaUser } from "react-icons/fa";
import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout/UserProfileLayout";
import AboutMeSection from "sections/AppPages/UserProfileSections/AboutMeSection";
import OfferingList from "sections/AppPages/UserProfileSections/Offerings/OfferingList";
import NoMatchPath from "components/NoMatch";

import {
  setProfileBookmark,
  setProfileSessions,
} from "store/user-profile/userProfileSlice";

import {
  fetchUserProfile,
  fetchUserData,
  fetchAllOfferings,
} from "sections/AppPages/UserProfileSections/utils/userDataService";
import { convertArrayToObject } from "sections/AppPages/LandingPageSections/utils/arrayToObjects";
import authFetch from "utils/authFetch";

const mapState = ({ user, userProfile }) => ({
  currentUser: user.currentUser,
  onboarding_data: user.onboarding_data,
  sessions: userProfile.sessions,
});

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { currentUser, sessions } = useSelector(mapState);
  const { slug_id } = useParams();
  const history = useHistory();

  let offeringInput = { user_id: currentUser.user_id };
  if (slug_id) {
    offeringInput = { slug_id: slug_id, loggedin_user_id: currentUser.user_id };
  }

  const [userData, setUserData] = useState({});
  const [headline, setHeadline] = useState("");

  const [userProfileData, setUserProfileData] = useState({});
  const [isOfferingLoading, setIsOfferingLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

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
    fetchUserData(offeringInput)
      .then((response) => {
        setIsUserLoading(false);
        const { error, result } = response;
        if (!error) {
          setUserData({ ...result });
          const bookmarkData = result.bookmark;
          dispatch(setProfileBookmark(bookmarkData));
        } else {
          setNoMatch(true);
        }
      })
      .catch((res) => {
        console.log(res);
        setIsUserLoading(false);
      });
  };

  const fetchUserProfileDataHandler = () => {
    fetchUserProfile(offeringInput).then((response) => {
      const { error, result } = response;
      if (!error) {
        setUserProfileData({ ...result });
        const { knowledge_session_headline_description } = result;
        setHeadline(knowledge_session_headline_description);
      } else {
        setNoMatch(true);
      }
    });
  };

  const fetchOfferingsHandler = () => {
    setIsOfferingLoading(true);
    fetchAllOfferings(offeringInput)
      .then((response) => {
        setIsOfferingLoading(false);
        const { error, result } = response;

        // setHeadline(headline_description);
        let filteredResult = result;
        if (slug_id && slug_id !== currentUser.user_id) {
          filteredResult = result.filter((item) => item.status === "approved");
        }

        if (!error) {
          const data = convertArrayToObject(filteredResult, "session_id");
          dispatch(setProfileSessions(data));
        } else {
          setNoMatch(true);
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
    <UserProfileLayout
      title={userData && `${userData?.name} | Hivepath `}
      description={userData && userData.description}
      imageSrc={userData && userData?.profile_pic_url}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <UserProfileInfo
            userProfile={userProfileData}
            data={userData}
            tabsData={tabsData}
            isOfferingLoading={isOfferingLoading}
            isUserLoading={isUserLoading}
          />
        </Grid>
      </Grid>
    </UserProfileLayout>
  );
};

export default UserProfilePage;
