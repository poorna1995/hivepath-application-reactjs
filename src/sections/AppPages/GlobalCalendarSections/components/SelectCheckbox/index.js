import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { USER_PROFILE_SERVICES } from "constants/API_URLS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarViewTypes } from "store/views/view.actions";

const mapState = ({ view, user }) => ({
  calendarViewTypes: view.calendarViewTypes,
  currentUser: user.currentUser,
});

const SelectCalendarViewCheckbox = () => {
  const { calendarViewTypes, currentUser } = useSelector(mapState);
  const [checkedItems, setChecked] = React.useState(calendarViewTypes || []);
  const USER_ONBOARDING_DONE = currentUser.profile_onboarding_done;
  const KNOWLEDGE_SESSION_ONBOARDING_DONE =
    currentUser.knowledge_session_onboarding_done;

  useEffect(() => {
    if (!KNOWLEDGE_SESSION_ONBOARDING_DONE) {
      return setChecked(["attendee"]);
    }
    return setChecked(calendarViewTypes);
  }, [
    calendarViewTypes,
    KNOWLEDGE_SESSION_ONBOARDING_DONE,
    USER_ONBOARDING_DONE,
  ]);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, item) => {
    const { checked, value } = event.currentTarget;
    // console.log(event.currentTarget.value);
    setChecked((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
    setEmails((prev) =>
      checked
        ? [...prev, item]
        : prev?.filter((val) => val.value !== item.value)
    );
  };
  useEffect(() => {
    if (!KNOWLEDGE_SESSION_ONBOARDING_DONE) {
      return dispatch(setCalendarViewTypes(["attendee"]));
    }

    dispatch(setCalendarViewTypes(checkedItems));
  }, [emails]);

  // console.log({ checkedItems, emails });
  const emailDiffer = [
    {
      title: "Availability",
      object_id: 123,
      value: "availability",
      color: "#89C073",
      bgColor: "#F7FFF4",
      show: KNOWLEDGE_SESSION_ONBOARDING_DONE,
    },
    {
      title: "Knowledge Sessions-Host",
      object_id: 456,
      value: "host",
      color: "#F19D3A",
      bgColor: "#FFF4E8",
      show: KNOWLEDGE_SESSION_ONBOARDING_DONE,
    },
    {
      title: "Knowledge Sessions-Attendee",
      object_id: 789,
      value: "attendee",
      color: "#7979F0",
      bgColor: "#ECECFF",
      // show: USER_ONBOARDING_DONE,
      show: true,
    },
  ];
  return (
    <div>
      {!KNOWLEDGE_SESSION_ONBOARDING_DONE && (
        <Box paddingTop={`48px`} sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              marginRight: "8px",
            }}
          >
            Share your Experience
          </Typography>
          <PrimaryButton title={`Onboard`} style={{ height: "36px" }} />
        </Box>
      )}

      {!KNOWLEDGE_SESSION_ONBOARDING_DONE && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              minWidth: "20px",
              minHeight: "20px",
              background: emailDiffer[2].color,
              borderRadius: "50%",
              marginRight: "16px",
            }}
          ></div>
          <Typography
            style={{
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "500",
              letterSpacing: "-0.01em",
            }}
          >
            {emailDiffer[2].title}
          </Typography>
        </div>
      )}

      <FormGroup>
        {KNOWLEDGE_SESSION_ONBOARDING_DONE &&
          Array.isArray(emailDiffer) &&
          emailDiffer.length > 0 &&
          emailDiffer.map((item) => {
            const { title, object_id, value, color, bgColor, show } = item;
            // console.log({ item });
            if (!show) return null;
            return (
              <FormControlLabel
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  marginTop: "8px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        minWidth: "20px",
                        minHeight: "20px",
                        background: color,
                        borderRadius: "50%",
                        marginRight: "16px",
                      }}
                    ></div>
                    <Typography
                      style={{
                        fontSize: "16px",
                        lineHeight: "22px",
                        fontWeight: "500",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {title}
                    </Typography>
                  </div>
                }
                key={object_id}
                control={
                  <Checkbox
                    value={value}
                    onChange={(e) => handleChange(e, item)}
                    checked={
                      checkedItems && checkedItems.some((val) => val === value)
                    }
                    // name={file_name}
                  />
                }
                labelPlacement="end"
              />
            );
          })}
      </FormGroup>
    </div>
  );
};

export default SelectCalendarViewCheckbox;
