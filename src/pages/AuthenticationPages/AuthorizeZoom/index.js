import React from "react";
import { useEffect, useState } from "react";
import authFetch from "utils/authFetch";
import { useHistory } from "react-router-dom";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useSelector } from "react-redux";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const AuthorizeZoomPage = () => {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const history = useHistory();
  const enqueueSnackbar = useEnquequeSnackbar();
  const [loading, setLoading] = useState(false);
  const handleClose = () => setLoading(false);
  useEffect(() => {
    setLoading(true);
    const url = window.location.href;
    let code = url.split("?code=")[1];
    console.log(code);
    const reqUrl = "https://auth.hivepath.io/api/saveZoomSecret";
    const reqData = {
      user_id: USER_ID,
      code: code,
    };
    authFetch(reqUrl, reqData).then((response) => {
      if (response.status === "success") {
        // push to step three onboarding knowledge session
        enqueueSnackbar(response?.message, {
          variant: "success",
        });
        setLoading(false);
        return history.push("/onboarding/knowledge-session/step-three");
      } else {
        enqueueSnackbar(response?.message, {
          variant: "error",
        });
        setLoading(false);
        return history.push("/onboarding/knowledge-session/step-three");
      }
    });
  }, []);
  return (
    <div>
      <LoadingBackdrop open={loading} handleClose={handleClose} />
    </div>
  );
};

export default AuthorizeZoomPage;
