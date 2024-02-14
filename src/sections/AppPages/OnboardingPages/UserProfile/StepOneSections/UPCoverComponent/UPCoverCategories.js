import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";
import { Grid } from "@mui/material";
import UPCategoryImageCard from "./UPCategoryImageCard";

const UPCoverCategories = (props) => {
  const { data, onCategoryChange } = props;

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12} md={12} mb={2}>
        <span>Select Category</span>
      </Grid> */}
      <Grid
        item
        xs={12}
        md={12}
        p={2}
        style={{ paddingTop: "0", maxHeight: "250px", overflowY: "scroll" }}
      >
        <Grid container spacing={2}>
          {data.map((item, index) => {
            const { category, files } = item;
            if (files.length > 0) {
              return (
                <Grid
                  key={`imgContainer${index}`}
                  item
                  xs={12}
                  md={6}
                  className={classes.cardContainer}
                >
                  <UPCategoryImageCard
                    key={`imgCard${index}`}
                    image={files[0]}
                    title={category}
                    onSelect={onCategoryChange}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UPCoverCategories;
