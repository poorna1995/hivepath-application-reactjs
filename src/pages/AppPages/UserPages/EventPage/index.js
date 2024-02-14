import { Container, Box } from "@mui/material";
import EventSection from "sections/AppPages/UserPages/EventSections";

import Seo from "components/Seo";
import AppHeader from "components/AppHeader";

const EventPage = () => {
  return (
    <div style={{ background: "white", minHeight: "90vh" }}>
      <AppHeader />
      <Seo title={"Event | Hivepath"} />
      <Box style={{ width: "100%" }} mt={2}>
        <EventSection />
      </Box>
    </div>
  );
};

export default EventPage;
