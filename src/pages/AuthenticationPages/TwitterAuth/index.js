import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import authFetch from "utils/authFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const TwitterAuth = () => {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const history = useHistory();
  const enqueueSnackbar = useEnquequeSnackbar();
  useEffect(() => {
    console.log(window.location.href);
    // const url ='http://localhost:3000/twitter?state=state&code=N0dUN0pINHVNMGszSFVxcDNVdGFVN2xqNURNWFlrcUFiZWRUU3VfZzUxNEZ5OjE2NDAyNjQwOTAzMDI6MToxOmFjOjE'

    const url = window.location.href;
    const code = url.split("code=")[1];
    console.log(code);
    const apiUrl = "https://auth.hivepath.io/api/sharereferralviatwitter";
    const data = {
      code: code,
      redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}/twitter`,
      user_id: USER_ID,
    };

    authFetch(apiUrl, data)
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json.message, {
            variant: "success",
          });
          history.push("/u/account/referral");
        } else {
          enqueueSnackbar("Error in sharing", {
            variant: "error",
          });
          history.push("/");
        }

        console.log(json);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <LoadingBackdrop open={true} handleClose={() => false} />
    </div>
  );
};

export default TwitterAuth;
