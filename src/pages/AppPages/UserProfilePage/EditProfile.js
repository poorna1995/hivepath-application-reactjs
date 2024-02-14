import { Container, Grid } from "@mui/material";
import AppHeader from "components/AppHeader";
import UserProfileCard from "components/Common/Cards/UserProfileCard";
import ProfilePageTabs from "components/Common/Navigation/ProfilePageTabs";
import React from "react";
import { useRouteMatch } from "react-router";
import AboutMeSection from "sections/AppPages/UserProfileSections/AboutMeSection";
import OfferingsSection from "sections/AppPages/UserProfileSections/Offerings";

const EditProfile = () => {
  let { path, url } = useRouteMatch();

  return (
    <div>
      {" "}
      <AppHeader />
      {/* Cover Image */}
      <img
        src="https://source.unsplash.com/random"
        alt="cover"
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
        }}
      />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <UserProfileCard editProfile />
          </Grid>
          <Grid item xs={12} md={8} padding="32px" marginTop="32px">
            {/*   // Right Side
        Main Info
        
        Offerings
        About me
        
        Offerings -> 1:1 Sessions, Events, Webinar
       */}
            <ProfilePageTabs data={userProfileData} />
          </Grid>
        </Grid>
      </Container>
      {/* Profile Info 
        
       

                
        
        
        
        */}
    </div>
  );
};

export default EditProfile;

const userProfileData = [
  {
    id: 0,
    label: "Offerings",
    component: <OfferingsSection />,
    // isDropdown: true,
    dropDownMenuItems: [
      {
        label: "1:1 Session",
        url: "/",
      },
      {
        label: "Events",
        url: "/",
      },
    ],
  },
  {
    id: 1,
    label: "About me",
    component: <AboutMeSection editProfile />,
  },
];
