import { Alert, Button, Container, Grid } from "@mui/material";
import AppHeader from "components/AppHeader";
import TextInput from "components/Common/Inputs/TextInput";
import React from "react";

const EditProfileForm = () => {
  return (
    <div>
      <Alert
        // title="Not yet ready, Work in Progress!"
        severity="warning"
      >
        Not yet ready, Work in Progress!
      </Alert>
      <AppHeader />
      <Container
        style={{
          marginTop: "32px",
        }}
      >
        <img
          src="https://source.unsplash.com/random"
          alt=""
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "13px 13px 0px 0px",
          }}
        />
        <div id="profile-pic" style={{ position: "relative", height: "150px" }}>
          <img
            src="https://source.unsplash.com/random"
            alt=""
            style={{
              position: "absolute",
              width: "170px",
              height: "200px",
              left: "20px",
              top: "-100px",
              borderRadius: "24px",
            }}
          />
        </div>
        <Grid container paddingBottom="32px">
          <Grid item md={6} xs={12} padding="8px">
            <TextInput label="First name" />
          </Grid>
          <Grid item md={6} xs={12} padding="8px">
            <TextInput label="Last name" />
          </Grid>
          <Grid item md={6} xs={12} padding="8px">
            <TextInput label="Role" />
          </Grid>
          <Grid item md={6} xs={12} padding="8px">
            <TextInput label="Company/ Profile" />
          </Grid>
          <Grid item xs={12} padding="8px">
            <TextInput label="Languages" />
          </Grid>
          <Grid item xs={12} padding="8px">
            <TextInput label="Location" />
          </Grid>
          <Grid item xs={12} padding="8px">
            <TextInput label="About me" multiline rows={4} />
          </Grid>

          <Grid
            xs={12}
            md={4}
            justifyContent="space-around"
            display="flex"
            alignItems="center"
          >
            <Button variant="outlined" style={{ textTransform: "capitalize" }}>
              Cancel
            </Button>
            <Button variant="contained" style={{ textTransform: "capitalize" }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EditProfileForm;
