import userGuide from "assets/images/help-pages/user-guide.png";
import feedback from "assets/images/help-pages/feedback.png";
import contact from "assets/images/help-pages/contact.png";
import faq from "assets/images/help-pages/faq.png";

import { Grid, Paper } from "@mui/material";
import HelpCategoryCard from "./Components/HelpCategoryCard";

const HelpSections = () => {
  return (
    // <Paper style={{ minHeight: "85vh", padding: "20px 5px 0 20px" }}>
    // </Paper>
    <Grid container>
      {categories.map((item, index) => (
        <Grid md={3} xs={6}>
          <HelpCategoryCard data={item} key={`hcc${index}`} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HelpSections;

const categories = [
  { title: "User Guide", image_url: userGuide, link: "/help/user-guide" },
  { title: "FAQ", image_url: faq, link: "/help/faq" },
  { title: "Contact Us", image_url: contact, link: "/help/contact" },
  { title: "Feedback", image_url: feedback, link: "/help/feedback" },
];
