import CreateSessionAboutOfferingPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/CreateSessionPages/CreateSessionAboutOfferingPage";
import CreateSessionAddCategoryPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/CreateSessionPages/CreateSessionAddCategoryPage";
import CreateSessionAddPrerequisitesPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/CreateSessionPages/CreateSessionAddPrerequisitesPage";
import CreateSessionAddRelatedTopicsPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/CreateSessionPages/CreateSessionAddRelatedTopicsPage";
import CreateSessionAddThumbnailsPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/CreateSessionPages/CreateSessionAddThumbnailsPage";
import CreateSessionPreviewPage from "pages/AppPages/UserAccountPages/NewKnowledgeSessionPages/CreateSessionPages/CreateSessionPreviewPage";

const createSessionRoutes = [
  {
    path: "/offering/create/category",
    component: CreateSessionAddCategoryPage,
  },
  {
    path: "/offering/create/offering-details",
    component: CreateSessionAboutOfferingPage,
  },
  {
    path: "/offering/create/related-topics",
    component: CreateSessionAddRelatedTopicsPage,
  },
  {
    path: "/offering/create/prerequisites",
    component: CreateSessionAddPrerequisitesPage,
  },
  {
    path: "/offering/create/thumbnails",
    component: CreateSessionAddThumbnailsPage,
  },
  {
    path: "/offering/create/preview-session",
    component: CreateSessionPreviewPage,
  },
];

export default createSessionRoutes;
