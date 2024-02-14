import TipsContainer from "../TipsContainer";
import { Typography } from "@mui/material";

const UPOTip3 = ({ noBoxShadow }) => {
  return (
    <TipsContainer noBoxShadow={noBoxShadow}>
      <Typography fontWeight={"bold"} mb={2} fontSize="20px">
        Few tips:
      </Typography>
      <ul>
        <li>
          <Typography>
            <strong>Work experience</strong> section is where you really get to sell your skills
            and show off your best qualities. Make sure you spend some time and
            really iron out the details to perfection.
          </Typography>
        </li>
        <li>
          <Typography>
            When listing your <strong>job roles</strong>, follow a chronological order and make
            sure they are stated point-wise for easier understanding.{" "}
          </Typography>
        </li>

        <li>
          <Typography>
            Describe your <strong>responsibilities</strong> in concise statements. Whenever
            possible, quantify your accomplishments and responsibilities.
          </Typography>
        </li>
      </ul>
    </TipsContainer>
  );
};

export default UPOTip3;
