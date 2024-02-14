import { Route, Switch } from "react-router-dom";

import { Container, Grid } from "@mui/material";
import AppHeader from "components/AppHeader";
import MiniDrawer from "sections/AppPages/UserAccountPageSections/AccountSectionDrawer";
import { Toolbar } from "@mui/material";

import General from "./StepOne";
import Education from "./StepTwo";
import Experience from "./StepThree";
import Skill from "./StepFour";
import SocialMedia from "./StepFive";
import { ReactComponent as ProfileIconI } from "assets/svg/user-account/edit-profile/userI.svg";
import { ReactComponent as EducationIconI } from "assets/svg/user-account/edit-profile/educationI.svg";
import { ReactComponent as ExperienceIconI } from "assets/svg/user-account/edit-profile/experienceI.svg";
import { ReactComponent as SkillsIconI } from "assets/svg/user-account/edit-profile/skillsI.svg";
import { ReactComponent as SocialIconI } from "assets/svg/user-account/edit-profile/heartI.svg";

import { ReactComponent as ProfileIconA } from "assets/svg/user-account/edit-profile/userA.svg";
import { ReactComponent as EducationIconA } from "assets/svg/user-account/edit-profile/educationA.svg";
import { ReactComponent as ExperienceIconA } from "assets/svg/user-account/edit-profile/experienceA.svg";
import { ReactComponent as SkillsIconA } from "assets/svg/user-account/edit-profile/skillsA.svg";
import { ReactComponent as SocialIconA } from "assets/svg/user-account/edit-profile/heartA.svg";

import EPSidebar from "./Components/EPSidebar";

import BasicTabs from "components/Common/Navigation/BasicTabs";
import UserAccountPageLayout from "Layouts/AppLayouts/UserAccountPageLayout";
const EditProfile = (props) => {
  const data = [
    {
      id: 0,
      label: "General",
      component: <General />,
      // icon: <ProfileIconI />,
    },
    {
      id: 1,
      label: "Experience",
      component: <Experience />,
      // icon: <ProfileIconI />,
    },
    {
      id: 2,
      label: "Education",
      component: <Education />,
      // icon: <ProfileIconI />,
    },
    {
      id: 3,
      label: "Expertise",
      component: <Skill />,
      // icon: <ProfileIconI />,
    },
    {
      id: 4,
      label: "Social media",
      component: <SocialMedia />,
      // icon: <ProfileIconI />,
    },
  ];

  return (
    <UserAccountPageLayout>
      {/* <AppHeader isSettings position="fixed" />
      <Toolbar />
      <MiniDrawer> */}
      <BasicTabs
        data={data}
        tabstyles={{
          fontWeight: "700",
          fontSize: "18px",
          textTransform: "none",
        }}
        tabsStyles={{
          background: "white",
          // borderRadius:'10px'
        }}
      />
      {/* <Grid container>
          <Grid item xs={3} md={3}>
            <EPSidebar />
          </Grid>
          <Grid item xs={9} md={9}>
            <Switch>
              <Route
                exact
                path="/u/account/edit-profile/1"
                component={General}
              />
              <Route
                exact
                path="/u/account/edit-profile/2"
                component={Experience}
              />
              <Route
                exact
                path="/u/account/edit-profile/3"
                component={Education}
              />
              <Route
                exact
                path="/u/account/edit-profile/4"
                component={Skill}
              />
              <Route
                exact
                path="/u/account/edit-profile/5"
                component={SocialMedia}
              />
            </Switch>
          </Grid>
        </Grid> */}
      {/* </MiniDrawer> */}
    </UserAccountPageLayout>
  );
};

export default EditProfile;
