import { Typography, Grid } from "@mui/material";
import FaqCollapsibleList from "../FaqCollapsibleList";

const GeneralOnboarding = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" fontWeight="800" fontSize="32px">
          General Onboarding
        </Typography>
        <Typography variant="subtitle" fontWeight="800" color="#606060">
          Questions, Comments, or Concerns?
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <FaqCollapsibleList />
      </Grid>
    </Grid>
  );
};

export default GeneralOnboarding;
