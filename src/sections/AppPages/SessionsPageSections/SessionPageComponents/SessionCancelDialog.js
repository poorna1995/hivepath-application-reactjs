import {
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCancelSessionReason } from "store/knowledge-sessions/knowledgeSessionsSlice";

const optionsData = [
  "I am not feeling well and would like to rest.",
  "Sorry! There has been a sudden change of plans.",
  "I didn’t prepare myself for the session.",
  "Other",
];

const SessionCancelDialog = ({ open, handleClose, onClick }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const dispatch = useDispatch();
  const handleSelectedOption = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value !== "Other") {
      return dispatch(setCancelSessionReason(e.target.value));
    }
  };
  console.log({ selectedOption });

  const isOther = selectedOption === "Other";
  const disableButton = !selectedOption || (isOther && !otherReason);

  const handleOtherReason = (e) => {
    setOtherReason(e.target.value);
    dispatch(setCancelSessionReason(e.target.value));
  };

  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <div style={{ padding: "16px", minHeight: "350px", height: "auto" }}>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "26px",
            lineHeight: "34px",
            maxWidth: "500px",
          }}
        >
          Reason for cancelation
        </Typography>
        <FormControl
          component="fieldset"
          // style={{ paddingBottom: "16px" }}
        >
          {/* <FormLabel
            component="legend"
            style={{
              color: "black",
              fontWeight: "700",
              fontSize: "16px",
              lineHeight: "20px",
              paddingTop: "16px",
            }}
          >
            Reason for declining
          </FormLabel> */}
          <RadioGroup
            name="row-radio-buttons-group"
            value={selectedOption}
            onChange={handleSelectedOption}
            style={{
              display: "flex",
              // alignItems: "center",
            }}
          >
            {optionsData?.map((item) => {
              // const { item } = item;
              return (
                <div
                  style={{
                    // height: "66px",
                    // width: "200px",
                    paddingLeft: "8px",
                    paddingRight: "16px",
                    background: "#ffffff",
                    // boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
                    borderRadius: "15px",
                    marginRight: "16px",
                    // marginTop: "8px",
                    marginLeft: "8px",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
                  />
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>

        {isOther && (
          <div style={{ marginTop: "16px" }}>
            {" "}
            <OutlinedInput
              fullWidth
              multiline
              minRows={3}
              value={otherReason}
              onChange={handleOtherReason}
            />
          </div>
        )}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PrimaryButton
            title={`Confirm`}
            onClick={onClick}
            disabled={disableButton}
          />
        </div>
      </div>
    </HivepathBaseDialog>
  );
};

export default SessionCancelDialog;
