import PaperBase from "components/Common/PaperBase/PaperBase";
import LandingPageLayout from "Layouts/AppLayouts/LandingPageLayout";
import React from "react";
import NewLandingPageSections from "sections/AppPages/LandingPageSections/NewLandingPageSections/NewLandingPageSections";
const NewLandingPage = () => {

  
  return (
    <LandingPageLayout title="Welcome To Hivepath - Explore Knowledge Sessions " paddingLeft={'8px'}>
   {/* <img src={welcomeGIF} alt="" /> */}
      <NewLandingPageSections />
    </LandingPageLayout>
  );
};

export default NewLandingPage;
