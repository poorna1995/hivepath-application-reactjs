import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SuccessDialog from "components/Common/Dialog/SuccessDialog";
import {
  signUpUserStart,
  updateEmailVerification,
} from "store/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const VerifySignUpTokenPage = () => {
  // const [token, setToken] = useState("");
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  const enqueueSnackbar = useEnquequeSnackbar();
  // extract token to verify
  // useEffect(() => {
  //   const url = window.location.href;
  //   //
  //   let pasToken = url.split("id/")[1];
  //   //
  //   setToken(pasToken);
  // }, []);

  // verify token
  useEffect(() => {
    const url = window.location.href;
    //
    let token = url.split("id/")[1];
    //
    // setToken(pasToken);

    fetch("https://auth.hivepath.io/api/verifyRegister", {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          // setMessage(json.message);
          if (currentUser) {
            dispatch(
              updateEmailVerification({
                ...currentUser,
                email_verification: true,
              })
            );
          }
          enqueueSnackbar(json.message, {
            variant: "success",
          });
          // setFail(false);
          // setOpen(true);
          history.push("/login");
        } else {
          // setFail(true);
          // setOpen(true);
          enqueueSnackbar(json.message, {
            variant: "error",
          });
          // setMessage(json.message);

          history.push("/login");
        }
        dispatch(signUpUserStart(""));

        //
      })
      .catch((error) => {
        // setMessage(error);
      });
  }, []);
  return (
    <div>
      {/* <SuccessDialog open={open} description={message} fail={fail} /> */}
    </div>
  );
};

export default VerifySignUpTokenPage;
