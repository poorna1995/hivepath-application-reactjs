import TipsContainer from "../TipsContainer";
import { Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  primaryColor: {
    color: theme.palette.primary.main,
  },
}));

const UPOTip4 = ({ noBoxShadow }) => {
  const classes = useStyles();
  return (
    <TipsContainer noBoxShadow={noBoxShadow}>
      <Typography fontWeight={"bold"} mb={2} fontSize="20px">
        More details:
      </Typography>
      <ul>
        <li>
          <Typography>
            We recommend you provide <strong>skills</strong> that you are most
            experienced with.
          </Typography>
        </li>
        <li>
          <Typography>
            The <strong>level of expertise</strong> you hold in a skill will
            determine your level of knowledge regarding that skill. You can
            choose them as follows -
          </Typography>
        </li>
      </ul>

      <Typography mb={1}>
        <strong>Beginner :</strong> <br /> Skills that you are in learning mode
        (or) are not using every day.
      </Typography>

      <Typography mb={1}>
        <strong>Intermediate :</strong> <br /> Skills that you use every day at
        work.
      </Typography>
      <Typography mb={1}>
        <strong>Expert :</strong> <br /> Skills that you’ve mastered over years
        and know everything about.
      </Typography>

      <Typography>
        <strong className={classes.primaryColor}>Please note</strong> that your
        expertise will be one of the factors to personalize your profile
        recommendations.
      </Typography>

      {/* <ol>
        <li>
          <strong>Beginner -</strong> Skills that you are in learning mode (or)
          are not utilized on a daily basis
        </li>
        <li>
          <strong>Intermediate -</strong> Skills that you use on a daily basis
          at work.
        </li>
        <li>
          <strong>Expert -</strong> Skills that you've mastered over years and
          know everything about.
        </li>
      </ol> */}

      {/* <ul>
        <li>
          <strong>Please note</strong> that your expertise will be one of the
          factors to personalize your profile recommendations.
        </li>
      </ul> */}
    </TipsContainer>
  );
};

export default UPOTip4;
