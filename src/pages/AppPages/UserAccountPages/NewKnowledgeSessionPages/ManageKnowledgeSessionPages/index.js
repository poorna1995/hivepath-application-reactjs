import UserAccountPageLayout from "Layouts/AppLayouts/UserAccountPageLayout";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ManageSessionsView from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/ManageSessionsView/ManageSessionsView";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ManageKnowledgeSessionsPage = () => {
  const { currentUser } = useSelector(mapState);
  const KS_ONBOARDING_DONE = currentUser.knowledge_session_onboarding_done;
  const history = useHistory();
  useEffect(() => {
    if (KS_ONBOARDING_DONE) return;
    return history.push("/onboarding/ks/intro");
  }, [KS_ONBOARDING_DONE, history]);
  return (
    <UserAccountPageLayout>
      <ManageSessionsView />
    </UserAccountPageLayout>
  );
};

export default ManageKnowledgeSessionsPage;
