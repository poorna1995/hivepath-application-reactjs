import { Grid, useMediaQuery } from "@mui/material";

import ProgressBar from "components/Common/ProgressBar";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useTheme } from "@mui/styles";
const font15 = { fontSize: "15px" };

const UserProfileOnboardingLayout = (props) => {
  const { active } = props;
  return (
    <Grid container spacing={2}>
      <Grid
        item
        // xs={12}
        md={12}
        style={{
          width: "100%",
        }}
      >
        <ProgressBar
          //   title="Basic Information"
          data={[
            {
              index: 1,
              link: "/onboarding/user-profile/step-one",
              title: <p style={font15}>General</p>,
            },
            {
              index: 2,
              link: "/onboarding/user-profile/step-two",
              title: <p style={font15}>Education</p>,
            },
            {
              index: 3,
              link: "/onboarding/user-profile/step-three",
              title: <p style={font15}>Experience</p>,
            },
            {
              index: 4,
              link: "/onboarding/user-profile/step-four",
              title: <p style={font15}>Expertise</p>,
            },
            {
              index: 5,
              link: "/onboarding/user-profile/step-five",
              title: <p style={font15}>Social media</p>,
            },
            {
              index: 6,
              link: "/onboarding/user-profile/step-six",
              title: <p style={font15}>Submit</p>,
            },
          ]}
          active={active}
          activeBar={active}
          openLink={true}
          borderStyle={{ marginTop: "-10px" }}
        />
      </Grid>
      {/* <Grid item xs={12} md={2}>
        <OutlinedButton title="Preview" />
      </Grid> */}
      <Grid item md={12}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default UserProfileOnboardingLayout;
