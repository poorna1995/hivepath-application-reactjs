import { ReactComponent as Feedback } from "assets/svg/help-page/feedback/feedback.svg";
import {
  Grid,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useState } from "react";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  textField: {
    height: "40px",
    marginTop: "20px",
    marginBottom: "20px",
    width: "100%",
    background: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.6)",
    boxSizing: "border-box",
    borderRadius: "10px",
    paddingLeft: "15px",
    fontSize: "16px",
    fontFamily: "inherit",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const FeedbackSections = () => {
  const classes = useStyles();
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Grid container spacing={2} mb={3} p={2}>
      <Grid item xs={12} md={7}>
        <Typography
          variant="h6"
          fontWeight="700"
          fontSize="40px"
          className="coloredHeading"
        >
          Lend us your strength!
        </Typography>
        <Typography variant="subtitle2" fontWeight="500" fontSize="16px" mt={2}>
          Please help us improve by letting us know how we can serve you better
          and share anything that might be useful for us. Your opinions, ideas,
          or suggestions would be greatly appreciated. <br />
          <br />
          For any queries - Please visit the FAQ or Contact us page.
        </Typography>

        <FormControl fullWidth sx={{ marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label">
            Select a category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Select a category"
            onChange={handleChange}
          >
            <MenuItem value={10}>Onboarding</MenuItem>
            <MenuItem value={20}>Knowledge session</MenuItem>
            <MenuItem value={30}>Drafts</MenuItem>
          </Select>
        </FormControl>

        <textarea
          className={classes.textField}
          placeholder="Please provide your feedback here."
          style={{ height: "180px", paddingTop: "10px", resize: "none" }}
        ></textarea>

        <div className={classes.buttonContainer}>
          <PrimaryButton title="Send Feedback" />
        </div>
      </Grid>
      <Grid
        item
        xs={6}
        md={5}
        sx={{
          display: {
            md: "block",
            xs: "none",
          },
        }}
      >
        <Feedback style={{ marginTop: "70px" }} />
      </Grid>
    </Grid>
  );
};

export default FeedbackSections;
