import TipsContainer from "../TipsContainer";
import { Typography } from "@mui/material";

const UPOTip2 = ({ noBoxShadow }) => {
  return (
    <TipsContainer noBoxShadow={noBoxShadow}>
      <Typography fontWeight={"bold"} mb={2} fontSize="20px">
        Few tips:
      </Typography>
      <ul>
        <li>
          <Typography>
            Including your <strong>education details</strong> increases your credibility, and
            It’s a great way for us to connect you with your Alumni and lost
            connections!
          </Typography>
        </li>
      </ul>
    </TipsContainer>
  );
};

export default UPOTip2;
