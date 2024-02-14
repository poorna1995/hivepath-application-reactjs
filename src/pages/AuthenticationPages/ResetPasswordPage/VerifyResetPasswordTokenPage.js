import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SuccessDialog from "components/Common/Dialog/SuccessDialog";
import { setResetPasswordToken } from "store/User/user.actions";
import authFetch from "utils/authFetch";

const VerifyResetPasswordTokenPage = () => {
  // const [token, setVerificationToken] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const enqueueSnackbar = useEnquequeSnackbar();

  // extract token
  // useEffect(() => {
  //   const url = window.location.href;
  //   let pasToken = url.split("id/")[1];
  //   setVerificationToken(pasToken);
  // }, []);

  //
  useEffect(() => {
    const url = window.location.href;
    let token = url.split("id/")[1];

    authFetch("https://auth.hivepath.io/api/verifyResetPasswordToken", {
      token: token,
    })
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar("Verification Successful!", {
            variant: "success",
          });
          dispatch(setResetPasswordToken(token));
          history.push("/set-new-password");
        } else {
          enqueueSnackbar(json.message, {
            variant: "error",
          });

          dispatch(setResetPasswordToken(""));

          history.push("/reset-password");
        }
      })
      .catch((error) => {
        //
      });
  }, []);

  return <div></div>;
};

export default VerifyResetPasswordTokenPage;
