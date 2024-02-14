import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import InfoSetUpLayout from "../../../Layouts/InfoSetUpLayout";
import StepThree from "../../../sections/InfoPage/StepThree";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    color: "#adadad",
    marginRight: "108px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "100px",
    },
  },
}));

const StepThreePage = () => {
  const classes = useStyles();
  return (
    <InfoSetUpLayout title="Add Profile Data">
      <div style={{ maxWidth: "480px", margin: "auto", paddingTop: "16px" }}>
        <div>
          <div style={{ textAlign: "right", maxWdth: "150px" }}>
            <Typography variant="body2" className={classes.title}>
              Step 3
            </Typography>
            <Typography variant="body2" style={{ marginRight: "14px" }}>
              Select your interests
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "16px",
              paddingTop: "8px",
            }}
          >
            <div
              className="horzontal_line"
              style={{
                width: 150,
                height: 4,
                // borderRadius: '50%',
                backgroundColor: "#484A9E",
              }}
            ></div>
            <div
              className="horzontal_line"
              style={{
                width: 150,
                height: 4,
                // borderRadius: '50%',
                backgroundColor: "#484A9E",
              }}
            ></div>
            <div
              className="horzontal_line"
              style={{
                width: 150,
                height: 4,
                // borderRadius: '50%',
                backgroundColor: "#484A9E",
              }}
            ></div>
          </div>
        </div>
      </div>
      <StepThree />
    </InfoSetUpLayout>
  );
};

export default StepThreePage;
