import TipsContainer from "../TipsContainer";
import { Typography } from "@mui/material";

const UPOTip1 = ({ noBoxShadow }) => {
  return (
    <TipsContainer noBoxShadow={noBoxShadow}>
      <Typography fontWeight={"bold"} mb={2} fontSize="20px">
        Few tips:
      </Typography>

      <ul>
        <li>
          <Typography>
            <strong>Profile pictures</strong> must be clear headshot images of
            you in good lighting.
          </Typography>
        </li>
        <li>
          <strong>Cover pictures</strong> can increase engagement. You can
          select one from our library or choose a good-quality image with the
          best resolution possible from your device.
        </li>
        <li>
          <strong>Usernames</strong> are your screen names. Any activity you’d
          be participating in Hivepath will be recorded under your username. If
          your username is taken, consider using your{" "}
          <span style={{ fontWeight: "500" }}>nicknames</span> or{" "}
          <span style={{ fontWeight: "500" }}>interchanging </span> 
          letters that are similar to your name. This way the possibilities are
          nearly endless!
        </li>
      </ul>
    </TipsContainer>
  );
};

export default UPOTip1;
