import ProfilePageTabs from "components/Common/Navigation/ProfilePageTabs";
import LandingPageLayout from "Layouts/AppLayouts/LandingPageLayout";
import React from "react";
import HomeTab from "sections/AppPages/LandingPageSections/HomeTab";
import UserProfilesList from "sections/AppPages/LandingPageSections/UserProfilesList";
import OfferingBlogs from "sections/AppPages/UserProfileSections/Offerings/Blogs";
import EventOfferings from "sections/AppPages/UserProfileSections/Offerings/Events";

const AppPage = () => {
  return (
    <LandingPageLayout title="Welcome To Hivepath - Explore Knowledge Sessions">
      <div style={{ paddingTop: "16px", paddingLeft: "16px" }}>
        <ProfilePageTabs data={tabData} />
      </div>
    </LandingPageLayout>
  );
};

export default AppPage;

const tabData = [
  {
    id: 0,
    label: "Home",

    component: <HomeTab />,
    // url:"/profile"
  },
  {
    id: 1,
    label: "Networking",

    component: <UserProfilesList title="Expand Your Network" />,
    // url:"/profile"
  },
  {
    id: 2,
    label: "Events",
    component: <EventOfferings />,
    // url:"/events"
  },
  {
    id: 3,
    label: "Blogs",
    component: <OfferingBlogs />,
    // url:"/events"
  },
];
