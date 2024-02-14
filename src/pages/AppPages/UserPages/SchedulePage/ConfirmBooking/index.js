import SchedulerWrapper from "Layouts/UserLayout/SchedulerLayout/SchedulerWrapper";
import ConfirmBookingSection from "sections/AppPages/UserPages/SchedulerSections/ConfirmBooking/";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  header: {
    background: "#ffffff",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
    borderRadius: "24px",
    padding: "15px",
    "& hr": { width: "100%", border: "1px solid rgba(0, 0, 0, 0.1)" },
    "& textarea": {
      width: "100%",
      outline: "none !important",
      border: "none !important",
      backgroundColor: "#f9f9f9",
      padding: "10px 20px",
      fontFamily: "inherit",
      fontWeight: "400",
      resize: "none",
      borderRadius: "10px",
      fontSize: "18px !important",
      "&:focus": { outline: "none", border: "1px solid #484a9e" },
    },
  },

  addQuestionBtn: {
    padding: "20px 20px 15px 40px",
    "& span": {
      display: "flex",
      alignItems: "center",
      border: "none",
      fontWeight: "500",
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
  disabledBtn: {
    "& button": {
      borderColor: "rgb(167, 167, 170) !important",
      color: "#bbb8b8 !important",
    },
  },

  backBtn: { "&:hover": { background: "transparent !important" } },
}));

const ConfirmBooking = () => {
  return (
    <SchedulerWrapper title="Confirm Booking- Hivepath">
      <ConfirmBookingSection />
    </SchedulerWrapper>
  );
};

export default ConfirmBooking;
