import UserAccountPageLayout from "Layouts/AppLayouts/UserAccountPageLayout";
import React from "react";
import MySessionsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/MySessionsSection";

const MySessionsPage = () => {
  return (
    <UserAccountPageLayout>
      <MySessionsSection />
    </UserAccountPageLayout>
  );
};

export default MySessionsPage;
