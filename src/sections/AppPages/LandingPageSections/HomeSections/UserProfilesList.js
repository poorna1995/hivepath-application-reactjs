import img1 from "assets/images/placeholder-images/img1.png";
import img2 from "assets/images/placeholder-images/img2.png";
import img3 from "assets/images/placeholder-images/img3.png";
import img4 from "assets/images/placeholder-images/img4.png";

import LPUserProfileCard from "./Components/LPUserProfileCard";
import "./styles.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { Typography } from "@mui/material";

import { fetchUserProfiles } from "../utils/homeService";
import { convertArrayToObject } from "../utils/arrayToObjects";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import OfferingSkeletonCard from "components/SkeletonComponents/OfferingSkeletonCard";
import ProfileSkeletonCard from "components/SkeletonComponents/ProfileSkeletonCard";
import BookmarkDialog from "./BookmarkDialog";

import { setProfiles } from "store/landing-page/landingPageSlice";

const mapState = ({ user, landingPage }) => ({
  currentUser: user.currentUser,
  suggestedProfiles: landingPage.profiles,
});

const UserProfilesList = ({ creator }) => {
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
          dispatch(setProfiles(modifiedProfilesData));
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
  return (
    <div>
      {!isLoading && Object.keys(suggestedProfiles).length > 0 && (
        <Typography
          variant="h6"
          fontWeight="800"
          style={{ fontSize: "26px" }}
          pl={3}
        >
          {creator ? "Top Creators" : "Explore"}
        </Typography>
      )}
      <div className="scrollRow" style={{ paddingTop: "0" }}>
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((item, index) => (
              <ProfileSkeletonCard key={`profileskel${index}`} />
            ))}
          </>
        ) : (
          <>
            {Object.keys(suggestedProfiles)?.map((item, index) => {
              const {
                first_name,
                last_name,
                image_url,
                role,
                company,
                user_id,
                bookmark_done,
                bookmark_id,
                slug_id,
              } = suggestedProfiles[item];
              //   const key = user_id + Math.floor(1000 + Math.random() * 9000);

              return (
                <LPUserProfileCard
                  key={"upl" + index}
                  imgUrl={
                    image_url ||
                    "https://www.auramarine.com/wp-content/uploads/2018/03/man-placeholder-e1520494457998.png"
                  }
                  userName={first_name + " " + last_name}
                  designation={`${role} at ${company}`}
                  user_id={user_id}
                  slug_id={slug_id}
                  bookmark_done={bookmark_done}
                  bookmark_id={bookmark_id}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilesList;
