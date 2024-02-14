import Home from "pages/AppPages/LandingPages/Home";
import Drafts from "pages/AppPages/LandingPages/Drafts";
import Bookmarks from "pages/AppPages/LandingPages/Bookmarks";

const accountRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/drafts",
    component: Drafts,
  },
  {
    path: "/bookmarks",
    component: Bookmarks,
  },
];

export default accountRoutes;
