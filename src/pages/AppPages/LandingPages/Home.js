import React from "react";
import PropTypes from "prop-types";
import LandingPageLayout from "Layouts/AppLayouts/LandingPageLayout";
import PaperBase from "components/Common/PaperBase/PaperBase";
import HomeSections from "sections/AppPages/LandingPageSections/HomeSections/index";

const Home = (props) => {
  return (
    <LandingPageLayout title="Welcome To Hivepath - Explore Knowledge Sessions ">
      <PaperBase>
        <HomeSections />
      </PaperBase>
    </LandingPageLayout>
  );
};

Home.propTypes = {};

export default Home;
