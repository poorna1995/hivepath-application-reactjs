import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  onboarding_data: user.onboarding_data,
});

const useNoAuth = (props) => {
  const { currentUser, onboarding_data } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      return history.push("/add-info");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return currentUser;
};

export default useNoAuth;
