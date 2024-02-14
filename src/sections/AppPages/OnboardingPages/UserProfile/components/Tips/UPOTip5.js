import TipsContainer from "../TipsContainer";
import { Typography } from "@mui/material";

const UPOTip5 = ({ noBoxShadow }) => {
  return (
    <TipsContainer noBoxShadow={noBoxShadow}>
      <Typography fontWeight={"bold"} mb={2} fontSize="20px">
        Few tips:
      </Typography>
      <ul>
        <li>
          <strong>Social profiles</strong> are the best way to share your presence and connect
          with your network.
        </li>
        <li>
          Currently, Hivepath supports adding the few listed social media links here.
        </li>

        <li>
          We strongly recommend you to{" "}
          <strong>add your professional profiles</strong> such as Linkedin,
          GitHub, etc, for a wider audience to completely understand your level
          of experience.
        </li>
      </ul>
    </TipsContainer>
  );
};

export default UPOTip5;
