import RecommendedOfferingCard from "./Components/RecommendedOfferingCard";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { Typography } from "@mui/material";

import { fetchRecommendedSessions } from "../utils/homeService";
import { convertArrayToObject } from "../utils/arrayToObjects";
import OfferingSkeletonCard from "components/SkeletonComponents/OfferingSkeletonCard";
import UnstyledModal from "components/Common/Modals/UnstyledModal";
import RecommendedOfferingModal from "./Components/RecommendedOfferingModal";

import { setSessions } from "store/landing-page/landingPageSlice";

const mapState = ({ user, landingPage }) => ({
  currentUser: user.currentUser,
  recommendedSessions: landingPage.sessions,
});

const RecommendedOfferingList = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const enqueueSnackbar = useEnquequeSnackbar();
  const { currentUser, recommendedSessions } = useSelector(mapState);
  //   const recommendedSessions = {};
  const emptyList = [1, 2, 3, 4];

  const fetchSessions = () => {
    setIsLoading(true);
    const requestData = { user_id: currentUser.user_id };
    fetchRecommendedSessions(requestData)
      .then((res) => {
        setIsLoading(false);
        if (!res.error) {
          const modifiedSessionData = convertArrayToObject(
            res.result,
            "session_id"
          );
          dispatch(setSessions(modifiedSessionData));
        } else {
          enqueueSnackbar(res.error, { variant: "error" });
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

  const toggleModal = () => {
    setModalOpen((state) => !state);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <UnstyledModal
        modalToggleHandler={toggleModal}
        open={openModal}
        style={{ width: "70%", padding: "20px" }}
      >
        <RecommendedOfferingModal
          data={modalData}
          modalToggleHandler={toggleModal}
        />
      </UnstyledModal>
      {!isLoading && Object.keys(recommendedSessions).length > 0 && (
        <Typography
          variant="h6"
          fontWeight="800"
          style={{ fontSize: "26px" }}
          pl={3}
        >
          Recommended Offerings
        </Typography>
      )}

      {
        <div className="scrollRow" style={{ paddingTop: "0" }}>
          {isLoading ? (
            <>
              {" "}
              {emptyList.map((item, index) => (
                <OfferingSkeletonCard key={`skeleton${index}`} />
              ))}
            </>
          ) : (
            <>
              {Object.keys(recommendedSessions)?.map((item, index) => {
                return (
                  <RecommendedOfferingCard
                    key={"recommendedCard" + index}
                    data={recommendedSessions[item]}
                    modalHandler={setModalOpen}
                    setModalData={setModalData}
                  />
                );
              })}
            </>
          )}
        </div>
      }
    </div>
  );
};

RecommendedOfferingList.propTypes = {};

export default RecommendedOfferingList;
