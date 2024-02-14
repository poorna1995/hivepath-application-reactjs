import EditAboutOfferingDetailsPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/EditSessionPages/EditAboutOfferingDetailsPage";
import EditOfferingCategoryPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/EditSessionPages/EditOfferingCategoryPage";
import EditPrerequisitesPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/EditSessionPages/EditPrerequisitesPage";
import EditRelatedTopicsPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/EditSessionPages/EditRelatedTopicsPage";
import EditThumbnailsPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/EditSessionPages/EditThumbnailsPage";
import EditSessionPages from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/EditSessionPages/index";

const editSessionRoutes = [
  {
    path: "/offering/:sessionID/edit/category",
    component: EditOfferingCategoryPage,
  },
  {
    path: "/offering/:sessionID/edit/offering-details",
    component: EditAboutOfferingDetailsPage,
  },
  {
    path: "/offering/:sessionID/edit/prerequisites",
    component: EditPrerequisitesPage,
  },
  {
    path: "/offering/:sessionID/edit/related-topics",
    component: EditRelatedTopicsPage,
  },
  {
    path: "/offering/:sessionID/edit/thumbnails",
    component: EditThumbnailsPage,
  },
  {
    path: "/offering/:sessionID/edit",
    component: EditSessionPages,
  },
];

export default editSessionRoutes;
