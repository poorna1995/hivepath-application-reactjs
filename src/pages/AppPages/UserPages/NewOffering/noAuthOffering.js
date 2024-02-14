import { Container } from "@mui/material";
import Seo from "components/Seo";
import NoAuthAppHeader from "components/NoAuthAppHeader";
import NoAuthOfferingSection from "sections/AppPages/UserPages/NewOfferingSections/NoAuth/index";

const NoAuthOffering = () => {
  return (
    <div style={{ background: "white" }}>
      <NoAuthAppHeader position={"static"}/>
      <Seo title={"Offering | Hivepath"} />
      <Container style={{ maxWidth: "calc(76.56rem)" }}>
        {/* <Box> */}
        <NoAuthOfferingSection />
        {/* </Box> */}
      </Container>
    </div>
  );
};

export default NoAuthOffering;
