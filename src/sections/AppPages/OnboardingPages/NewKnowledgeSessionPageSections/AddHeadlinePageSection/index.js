import { Box, Container, OutlinedInput } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOfferingHeadline } from "store/knowledge-sessions/knowledgeSessionsSlice";
import KSOnboardingButtonRow from "../components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../components/Typography/SectionHeadings";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";

const mapState = ({ sessions }) => ({
  offeringHeadline: sessions.offeringHeadline,
});

const AddHeadlinePageSection = () => {
  const theme = useTheme();
  const { offeringHeadline } = useSelector(mapState);
  const [headline, setHeadline] = useState(offeringHeadline || "");
  const dispatch = useDispatch();
  const disableNext =
    !headline || headline.length < 10 || headline.length > 250;
  const history = useHistory();
  console.log({ headline });

  const handleSubmit = () => {
    dispatch(setOfferingHeadline(headline));
    history.push("/onboarding/ks/availability");
  };
  return (
    <Box style={{ display: "flex", flex: 1 }}>
      <Container
        maxWidth="md"
        style={
          theme.breakpoints.down("sm")
            ? { padding: "8px", paddingTop: "16px" }
            : {}
        }
      >
        <OnboardingSectionHeadings
          title={`Add Offering Headline`}
          description={`Add headline for your offerings`}
          containerStyles={{ flex: 1 }}
        />
        <OutlinedInput
          value={headline}
          style={{
            marginTop: "16px",
          }}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="Headline text"
          multiline
          minRows={4}
          fullWidth
        />
      </Container>

      <KSOnboardingButtonRow
        showPrimary
        showSecondary
        backURL={"/onboarding/ks/create/preview-sessions"}
        // nextURL={"/onboarding/ks/create/related-topics"}
        onClickPrimaryButton={handleSubmit}
        disablePrimary={disableNext}
        // onClickPrimaryButton={handleSubmit}
        // disablePrimary={
        // title.length < 5 ||
        // title.length > 70 ||
        // sessionDescription.length < 10 ||
        // sessionDescription.length > 2000
        // }
      />
    </Box>
  );
};

export default AddHeadlinePageSection;
