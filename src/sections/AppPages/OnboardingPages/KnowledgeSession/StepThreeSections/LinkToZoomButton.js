import React from "react";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { ReactComponent as VideoIconBlack } from "assets/svg/onboarding-pages/knowledge-session/video-icon-black.svg";

const LinkToZoomButton = () => {
  const CLIENT_ID = `${process.env.REACT_APP_ZOOM_CLIENT_ID}`;
  const REDIRECT_URL = `${process.env.REACT_APP_REDIRECT_URL}`;

  let url = `https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}/zoomauth`;

  // https://zoom.us/oauth/authorize?response_type=code&client_id=QtCcbudQSEKfaHgQNnnuw&redirect_uri=https://hivepath-onboarding.web.app/zoomauth
  return (
    <OutlinedButton
      component="a"
      href={url}
      title="Link to Zoom Account"
      startIcon={<VideoIconBlack />}
      //   onClick={handleClick}
      style={{ color: "black", width: "auto", marginBottom: "16px" }}
    />
  );
};

export default LinkToZoomButton;
