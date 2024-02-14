import { useState } from "react";

import other from "assets/images/help-pages/faq/Others.jpg";
import general_onboarding from "assets/images/help-pages/faq/General_Onboarding.jpg";

import offerings from "assets/images/help-pages/faq/Offerings.jpg";
import security from "assets/images/help-pages/faq/Password_Security.jpg";
import recruitment from "assets/images/help-pages/faq/Team_Recuritment.jpg";

import FaqCategoryCard from "./Components/FaqCategoryCard";
import FaqExpanded from "./FaqExpanded";
import { Grid } from "@mui/material";

const FaqSections = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {!expanded && (
        <Grid container>
          {categories.map((item, index) => (
            <Grid item xs={6} md={3}>
              <FaqCategoryCard
                data={item}
                setExpanded={setExpanded}
                key={`fcc${index}`}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {expanded && <FaqExpanded setExpanded={setExpanded} data={categories} />}
    </>
  );
};

export default FaqSections;

const categories = [
  {
    title: "Genreal Onboarding",
    image_url: general_onboarding,
    link: "#",
    id: 1,
  },
  { title: "Offerings", image_url: offerings, link: "#", id: 2 },
  { title: "Password & Security", image_url: security, link: "#", id: 3 },
  { title: "Team Recruitment", image_url: recruitment, link: "#", id: 4 },
  { title: "Other", image_url: other, link: "#", id: 5 },
];
