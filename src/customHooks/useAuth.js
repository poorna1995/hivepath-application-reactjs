import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  const location = useLocation();
  // console.log({ locationInHook: location });
  const splittedString = location.pathname.split("/");
  // console.log({ splittedString });

  const isEditPage = splittedString.includes("edit");
  const isOfferingPage = splittedString.includes("offering");

  // console.log({ isEditPage, isOfferingPage });
  useEffect(() => {
    if (!currentUser) {
      return history.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
