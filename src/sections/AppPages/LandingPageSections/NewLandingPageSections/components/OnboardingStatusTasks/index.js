import { useTheme } from "@emotion/react";
import { Grid, Stack, Typography } from "@mui/material";
import KnowledgeSessionOnboardingLayout from "Layouts/AppLayouts/OnboardingLayouts/KnowledgeSessionOnboardingLayout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import KnowledgeSessionOnboardingStatusCard from "./KnowledgeSessionOnboardingStatusCard";
import ProfileOnboardingStatusCard from "./ProfileOnboardingStatusCard";
import LPStatusCardBase from "./LPStatusCardBase";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { makeStyles } from "@mui/styles";
import { ReactComponent as CheckIcon } from "assets/svg/all/new-icons/landing-page/check-square.svg";
import CardOneImage from "assets/svg/all/new-icons/landing-page/card-one.svg";
import CardTwoImage from "assets/svg/all/new-icons/landing-page/card-two.svg";
import CardThreeImage from "assets/svg/all/new-icons/landing-page/card-three.svg";
import { useHistory } from "react-router-dom";
import authFetch from "utils/authFetch";
import SectionLoadingIndicator from "components/Common/Feedback/SectionLoadingIndicator";
import lodash from "lodash";
import { Box } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  icon: {
    "& path": {
      fill: theme.palette.success.dark,
    },
  },
}));

const iconStyle = {
  height: "16px",
  width: "16px",
};

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const OnboardingStatusTasks = () => {
  const { currentUser } = useSelector(mapState);
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const cardStatusURL = `https://landingpage.hivepath.io/api/userCards`;
  const USER_ID = currentUser.user_id;

  const [pageError, setPageError] = useState("");
  const pageErrorMessage = (
    <p
      style={{
        fontSize: "24px",
        fontWeight: "700",
      }}
    >
      Could not fetch cards!
    </p>
  );
  const handleFetchUserCardsStatus = () => {
    setLoading(true);
    const data = {
      user_id: USER_ID,
    };
    authFetch(cardStatusURL, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          console.log({ json });
          setList(json.result);
        }
      })
      .catch((error) => {
        setLoading(false);
        setPageError(pageErrorMessage);
        console.error(error);
      });
  };
  useEffect(() => {
    handleFetchUserCardsStatus();
  }, []);

  const USER_PROFILE_ONBOARDING_STATUS = currentUser.profile_onboarding_done;
  const profileOnboardingClick = () => {
    history.push("/onboarding/user-profile/step-one");
  };
  const hostOnboardingClick = () => {
    history.push("/onboarding/ks/intro");
  };

  const exploreLinkClick = () => {
    history.push("/explore");
  };
  const orderedList = list.length > 0 && lodash.orderBy(list, "card_id", "asc");

  // const
  // const data = [
  //   {
  //     title: "Complete your profile ",
  //     bgColor: "#FCECE1",
  //     description: `Add your skills & experiences to help us find network relevant to your field of interest.  `,
  //     show: !USER_PROFILE_ONBOARDING_STATUS,
  //     img: CardOneImage,
  //     component: (
  //       <PrimaryButton
  //         style={{ height: "40px", fontWeight: "500" }}
  //         disabled={USER_PROFILE_ONBOARDING_STATUS === true}
  //         title={`Profile Onboarding`}
  //         onClick={profileOnboardingClick}
  //       />
  //     ),
  //     button_title: "Profile Onboarding",
  //   },

  //   {
  //     title: "Explore & Schedule 1:1 Sessions",
  //     bgColor: "#EAF8EB",
  //     img: CardTwoImage,
  //     description:
  //       "Explore our network of experts and schedule 1:1 Knowledge Sessions  ",
  //     component: (
  //       <PrimaryButton
  //         style={{ height: "40px", fontWeight: "500" }}
  //         // disabled
  //         title={`Explore`}
  //         onClick={exploreLinkClick}
  //       />
  //     ),
  //     button_title: `Explore`,
  //   },
  //   {
  //     title: "Become a Host!",
  //     bgColor: "#E8EEF5",
  //     component: (
  //       <PrimaryButton
  //         style={{ height: "40px", fontWeight: "500" }}
  //         disabled={USER_PROFILE_ONBOARDING_STATUS === false}
  //         title={`Become a Host`}
  //         onClick={hostOnboardingClick}
  //       />
  //     ),
  //     img: CardThreeImage,

  //     description: `Guide people to success by sharing your skills & experiences as a Knowledge Session Host!`,
  //     button_title: `Become a Host`,
  //     redirect_url: "/onboarding/ks/intro",
  //   },
  // ];
  return (
    <div style={{ paddingBottom: "32px", paddingTop: "16px" }}>
      <Typography
        variant="h3"
        sx={{
          fontSize: { md: "26px", xs: "20px" },
          paddingLeft: "16px",
          paddingBottom: "8px",
        }}
      >
        Hi{" "}
        <span
          style={{
            color: theme.palette.primary.main,
          }}
        >
          {" "}
          {currentUser.firstname}
        </span>
        , Welcome to Hivepath!
      </Typography>

      {loading ? (
        <SectionLoadingIndicator />
      ) : (
        <>
          {pageError ? (
            pageError
          ) : (
            <Box
              // direction="row"
              // justifyContent="center"
              alignItems="stretch"
              spacing={2}
              sx={{
                display: "flex",
                overflowX: "scroll",
                overflowY: "hidden",
                padding: "20px",
                alignItems: "stretch",
              }}
              className={"removeScrollBar"}
            >
              {orderedList.length > 0 &&
                orderedList.map((item) => {
                  const {
                    title,
                    bg_color,
                    description,
                    thumbnail_image,
                    redirection_url,
                    button_title,
                    active,
                    card_id,
                  } = item;
                  return (
                    // <Grid item xs={12} md={4} key={title}>
                    <LPStatusCardBase
                      title={title}
                      description={description}
                      list={list}
                      bgColor={bg_color}
                      img={thumbnail_image}
                      buttonTitle={button_title}
                      disableButton={!active}
                      redirect_url={redirection_url}
                      key={card_id}
                    />
                    // </Grid>
                  );
                })}
              {/* <Grid item xs={12} md={4}>
        <KnowledgeSessionOnboardingStatusCard />
      </Grid> */}
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default OnboardingStatusTasks;
