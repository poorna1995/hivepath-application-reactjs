import SchedulerWrapper from "Layouts/UserLayout/SchedulerLayout/SchedulerWrapper";
import StateQuestionSections from "sections/AppPages/UserPages/SchedulerSections/StateQuestionSections/";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  backBtn: { "&:hover": { background: "transparent !important" } },
}));

const StateQuestions = () => {
  return (
    <SchedulerWrapper title="State Questions- Hivepath">
      <StateQuestionSections />
    </SchedulerWrapper>
  );
};

export default StateQuestions;
