import classes from "pages/AppPages/OnboardingPages/UserProfile/StepOne.module.css";

import { Grid, IconButton } from "@mui/material";
import UPCoverImageCard from "./UPCoverImageCard";

const UPCoverImages = (props) => {
  const { data, category, selectedImage, setSelectedImage, setShowPicks } =
    props;

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12} md={12}>
        <span>Select our picks</span>
      </Grid> */}
      <Grid
        item
        xs={12}
        md={12}
        p={2}
        mt={4}
        style={{ paddingTop: "0", maxHeight: "250px", overflowY: "scroll" }}
      >
        <Grid container spacing={2}>
          {data.map((item, index) => {
            const cardId = "categoryImgCard" + index;
            let active = selectedImage === item ? true : false;
            return (
              <Grid
                key={cardId}
                id={cardId}
                item
                xs={12}
                md={6}
                className={classes.cardContainer}
                // style={{ height: "150px" }}
              >
                <UPCoverImageCard
                  key={cardId}
                  id={cardId}
                  image={item}
                  onSelect={setSelectedImage}
                  active={active}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UPCoverImages;
