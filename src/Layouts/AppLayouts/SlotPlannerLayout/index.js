import React from "react";
import AppHeader from "components/AppHeader";
import AdminDrawer from "sections/AppPages/AdminPageSections/AdminDrawer";
import { Box } from "@mui/system";
import Seo from "components/Seo";

const SlotPlannerLayout = ({ title, children }) => {
  return (
    <div>
      <AppHeader
        isAdmin
        // maxWidth="xl"
      />
      <Seo title={title} />
      <Box sx={{ display: "flex" }}>
        <AdminDrawer />
        <Box sx={{ flexGrow: "1", p: "3" }}>{children}</Box>
      </Box>
    </div>
  );
};

export default SlotPlannerLayout;
