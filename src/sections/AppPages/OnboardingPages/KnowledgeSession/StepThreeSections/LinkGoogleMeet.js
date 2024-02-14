import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { ReactComponent as GoogleMeetIcon } from "assets/svg/onboarding-pages/knowledge-session/google-meet-icon.svg";
import authFetch from "utils/authFetch";
import { useDispatch, useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import {
  setGoogleMeetEmail,
  setGoogleMeetSyncedAccounts,
} from "store/User/user.actions";
import handleFetchMeetAccounts from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/ManageSessionsView/utils/handleFetchMeetAccounts";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import googleBgImg from "assets/svg/all/new-icons/ks-onboarding/preferences/google-bg-img.svg";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const LinkGoogleMeet = ({ disabled, noImage }) => {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const clientId = `${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`;
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();

  const SCOPES = `https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events`;

  const responseGoogle = (res) => {
    console.log(res);
    if (res.error) return null;
    handleGoogleMeet(res.code);
  };
  const handleGoogleMeet = (code) => {
    const url = "https://auth.hivepath.io/api/syncMeetAccount";
    const data = {
      code: code,
      user_id: USER_ID,
      origin: "google",
    };
    authFetch(url, data)
      .then((json) => {
        // dispatch(setGoogleMeetEmail(myEmail));

        if (json.status === "success") {
          // dispatch(setGoogleMeetEmail(json.email));

          handleFetchMeetAccounts(USER_ID).then((json) => {
            dispatch(setGoogleMeetSyncedAccounts(json));
          });

          enqueueSnackbar(json.message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
        console.log(json);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <GoogleLogin
        accessType="offline"
        responseType="code"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        clientId={clientId}
        scope={SCOPES}
        prompt="consent"
        render={(renderProps) => (
          <>
            {noImage ? (
              <OutlinedButton
                onClick={renderProps.onClick}
                disabled={disabled || renderProps.disabled}
                title="Add  Account"
                startIcon={
                  <GoogleMeetIcon style={{ height: "30px", width: "30px" }} />
                }
                //   onClick={handleClick}
                style={
                  disabled
                    ? {
                        color: "rgba(194, 194, 194, 1)",
                        width: "auto",
                        marginBottom: "16px",
                        border: "2px solid #C2C2C2",
                        borderRadius: "6px",
                        cursor: "not-allowed",
                        height: "50px",
                      }
                    : {
                        color: "black",
                        width: "auto",
                        marginBottom: "16px",
                        borderRadius: "6px",
                        height: "50px",
                      }
                }
              />
            ) : (
              <CardToSelect
                onClick={renderProps.onClick}
                disabled={disabled || renderProps.disabled}
              />
            )}
          </>
        )}
      />
    </div>
  );
};

export default LinkGoogleMeet;

const CardToSelect = ({ image, bgColor, title, onClick, disabled }) => {
  return (
    <Card
      sx={{
        boxShadow: "none",
        // padding: "16px",
        textAlign: "center",
        borderRadius: "20px",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        maxWidth: "250px",
        marginBottom: "16px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <CardMedia
        component={"img"}
        src={googleBgImg}
        style={{
          background: "#FFF6E6",
          width: "100%",
          height: "150px",
          objectFit: "contain",
          padding: "8px",
        }}
      />
      {/* <img src={item.img} alt="" /> */}

      <Typography
        fontSize={`20px`}
        fontWeight="700"
        padding={"16px"}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <GoogleMeetIcon
          style={{ height: "30px", width: "30px", marginRight: "16px" }}
        />
        {/* {title} */}
        Add Account
      </Typography>
    </Card>
  );
};
