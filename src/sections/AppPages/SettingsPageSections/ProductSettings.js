import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const ProductSettings = () => {
  return (
    <div>
      <Container>
        <Typography>What would you like to Offer</Typography>
        <Grid container>
          <Grid item md={4} sm={6} xs={12}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductSettings;
