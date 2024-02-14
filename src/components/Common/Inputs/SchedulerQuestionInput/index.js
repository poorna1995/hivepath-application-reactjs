// import bin from "assets/svg/scheduler-icons/bin.svg";
import { ReactComponent as Close } from "assets/svg/onboarding-pages/user-profile/Delete.svg";

import classes from "./SchedulerQuestionInput.module.css";
import { FaGripVertical, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

import {
  deleteQuestion,
  updateQuestion,
} from "store/Scheduler/scheduler.actions";
import { useRef } from "react";
import authFetch from "utils/authFetch";

import { Grid, IconButton } from "@mui/material";
import { useHistory } from "react-router";

const SchedulerQuestionInput = (props) => {
  const enqueueSnackbar = useEnquequeSnackbar();
  const inputRef = useRef();
  const { bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.scheduler);
  const isDisabled = props.object_id ? true : false;

  const deleteInput = () => {
    if (questions.length < 2) {
      enqueueSnackbar("Needs to have atleast one question", {
        variant: "error",
      });
      //   alert("Needs to have atleast one question");
      return;
    }

    if (props.object_id) {
      props.setLoading(true);
      const requestData = {
        booking_id: bookingId,
        key: "question",
        object_id: props.object_id,
      };

      const addQuestionCall = authFetch(
        "https://schedule.hivepath.io/api/deleteScheduleBooking",
        requestData
      ).then((res) => {
        props.setLoading(false);
        if (res.status === "success") {
          dispatch(deleteQuestion(props.id));
        } else {
          alert("An error occured while deleting the question");
          console.log(res);
        }
      });
    } else {
      dispatch(deleteQuestion(props.id));
    }
  };

  const updateInputVal = () => {
    // if question is not yet uploaded on the server, user can make changes to the question text from 'add questions' page
    // if (!props.object_id) {
    const inputText = inputRef.current.value;
    if (props.object_id) {
      dispatch(updateQuestion(props.object_id, inputText));
    } else {
      dispatch(updateQuestion(props.id, inputText));
    }
    // }
  };

  return (
    <Grid container className={classes.input}>
      <Grid item xs={1} md={1} className="center">
        <FaArrowRight style={{ height: "16px" }} />
      </Grid>
      <Grid item xs={10} md={10}>
        <input
          defaultValue={props.data}
          ref={inputRef}
          onBlur={updateInputVal}
          disabled={isDisabled}
          className={props.class}
          placeholder="State your question here"
          //   placeholder={"Question " + (props.index + 1)}
        />
      </Grid>
      <Grid item xs={1} md={1} className="center">
        {questions.length > 1 && (
          <IconButton onClick={deleteInput}>
            {" "}
            <Close />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default SchedulerQuestionInput;
