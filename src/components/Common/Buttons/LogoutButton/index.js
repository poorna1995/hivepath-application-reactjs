import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signOutUserStart, signOutUserSuccess } from "store/User/user.actions";
import authFetch from "utils/authFetch";
import OutlinedButton from "../OutlinedButton";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const LogoutButton = () => {
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser?.user_id;
  const history = useHistory();
  const handleLogout = () => {
    authFetch("https://auth.hivepath.io/api/logout", {
      user_id: "62036b11755a090e66d4fee7",
    })
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message);
          dispatch(signOutUserSuccess);
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <OutlinedButton title="Logout" onClick={handleLogout}>
      Logout
    </OutlinedButton>
  );
};

export default LogoutButton;
