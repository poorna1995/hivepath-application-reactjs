import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setReferralLink } from "store/referral/referral.actions";

const VerifyReferPage = () => {
  const { referralID } = useParams();
  const [referredByLink, setReferredByLink] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(window.location.href);
    const url = window.location.href;
    console.log(referralID);
    // localStorage.setItem("referalString", url);
    // setReferredByLink(url);
    dispatch(setReferralLink(url));
    history.push("/sign-up");
  }, []);

  return (
    <div>
      <LoadingBackdrop open={true} />
    </div>
  );
};

export default VerifyReferPage;
