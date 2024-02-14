import AppHeader from "components/AppHeader";
import AdminDrawer from "sections/AppPages/AdminPageSections/AdminDrawer";
import { Box } from "@mui/system";
import Seo from "components/Seo";

const UserLayout = ({ title, children }) => {
  return (
    <div>
      <AppHeader isAdmin />
      <Seo title={title} />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: "1", p: "3", width: "100%" }}>{children}</Box>
      </Box>
    </div>
  );
};

export default UserLayout;
