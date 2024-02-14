import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setPreviewSession } from "store/knowledge-sessions/knowledgeSessionsSlice";
import OfferingSamplePreviewComponent from "../../IntroductionSections/SampleOfferingsSection.js/OfferingSamplePreviewComponent";
import OfferingSessionPreviewComponent from "./OfferingSessionPreviewComponent";

const mapState = ({ sessions }) => ({
  session: sessions.previewSession,
});
const OfferingSessionPreview = ({ data }) => {
  const { session } = useSelector(mapState);
  const history = useHistory();
  const prevURL = "/onboarding/ks/create/preview-sessions";

  const dispatch = useDispatch();

  const handleClickBack = () => {
    dispatch(setPreviewSession({}));
    return history.push(prevURL);
  };

  return (
    <div>
      {/* <Button onClick={handleClickBack}> Go Back </Button> */}
      <OfferingSessionPreviewComponent data={session} />
    </div>
  );
};

export default OfferingSessionPreview;
