import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import {
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPen,
  FaPlus,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  onboarding_data: user.onboarding_data,
});
const UserProfileCard = ({ userProfile, editProfile }) => {
  const { currentUser, onboarding_data } = useSelector(mapState);
  const userName = `${currentUser.firstname} ${currentUser.lastname}`;

  const userData =
    onboarding_data?.onboarding_data || currentUser?.onboarding_data;

  const designation = userData?.stage1.role;
  const companyName = userData?.stage1.company;
  const location = userData?.stage1.location;
  const languages = userData?.stage1.languages;
  const lookingFor = userData?.stage1.looking_for;

  return (
    <div style={{ minWidth: "320px", paddingRight: "16px" }}>
      {/* 
     // Profile Picture
            Left side


            User details
            name
            designation
            location
            languages
            looking for

            social profiles

            CTAs {Refer(Outlined), Follow(Primary)}


     */}
      <Card
        style={{
          position: "relative",
          overflow: "visible",
          boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.05)",
        }}
      >
        <CardMedia
          component="img"
          src={currentUser.image_url}
          style={{
            objectFit: "cover",
            width: "190px",
            height: "230px",
            position: "absolute",
            top: "-30%",
            left: "20px",
            borderRadius: "14px",
          }}
          alt=""
        />
        <CardContent style={{ paddingTop: "120px" }}>
          <Typography variant="caption" color="GrayText" paddingBottom="16px">
            4.92 (13) - Response Time 1 hour
          </Typography>
          <Typography
            color="primary"
            variant="h5"
            fontWeight="700"
            paddingBottom="8px"
            fontSize="24px"
          >
            {userName}
          </Typography>
          <Typography paddingBottom="8px" fontSize="14px">
            {designation} at <b>{companyName}</b>
          </Typography>
          <Typography paddingBottom="8px" fontSize="14px">
            <FaMapMarkerAlt /> {location}
          </Typography>
          <Typography paddingBottom="8px" fontSize="14px">
            Languages:{" "}
            <b>
              {languages?.map((item, index) =>
                languages.length - 1 > index ? (
                  <span>{item}, </span>
                ) : (
                  <span>{item} </span>
                )
              )}
            </b>
          </Typography>
          <Typography paddingBottom="8px" fontSize="14px">
            Looking For:{" "}
            <b>
              {lookingFor?.map((item, index) =>
                lookingFor.length - 1 > index ? (
                  <span>{item}, </span>
                ) : (
                  <span>{item} </span>
                )
              )}
            </b>
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container>
            {userProfile && (
              <Grid item xs={12} paddingBottom="16px" paddingLeft="16px">
                {/* Social Profile Links */}

                <IconButton size="large">
                  <FaLinkedinIn />
                </IconButton>

                <IconButton size="large">
                  <FaInstagram />
                </IconButton>
                <IconButton size="large">
                  <FaGlobe />
                </IconButton>
              </Grid>
            )}

            {userProfile && (
              <Grid
                item
                xs={12}
                width="100%"
                justifyContent="space-between"
                display="flex"
                padding="16px"
                paddingTop="8px"
              >
                {/* CTAs */}
                <OutlinedButton
                  title="Refer"
                  variant="outlined"
                  fullWidth
                  style={{
                    marginRight: "8px",
                    borderRadius: "6px",
                  }}
                >
                  Refer
                </OutlinedButton>
                <PrimaryButton
                  title="follow"
                  // variant="contained"
                  // fullWidth
                  // color="primary"
                  style={{ borderRadius: "6px" }}
                >
                  Follow
                </PrimaryButton>
              </Grid>
            )}
            {editProfile && (
              <Grid>
                <Button
                  style={{
                    textTransform: "capitalize",
                    color: "black",
                    padding: "16px",
                  }}
                  startIcon={<FaPlus />}
                >
                  Add social media links
                </Button>
              </Grid>
            )}
            {editProfile && (
              <Grid
                item
                xs={12}
                alignItems="center"
                display="flex"
                justifyContent="space-around"
                paddingTop="16px"
                paddingBottom="16px"
              >
                <PrimaryButton
                  title="Edit Profile"
                  component={Link}
                  to="/profile/update-profile"
                  startIcon={<FaPen />}
                >
                  Edit Profile
                </PrimaryButton>
              </Grid>
            )}
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default UserProfileCard;
