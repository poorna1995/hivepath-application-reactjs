// import classes from "./StepOne.module.css";
// import logo from "assets/images/successful-animation.png";
import celebration from "assets/gifs/scheduler/celeberate.gif";
import successGif from "assets/gifs/scheduler/success.gif";

import { Card, Typography, CardContent } from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { Link } from "react-router-dom";

// import UserProfileLayout from "Layouts/AppLayouts/UserProfileLayout";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    "& .MuiDialog-paper": {
      borderRadius: "24px",
      width: "600px",
    },
  },
  root: {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
    borderRadius: "24px",
    // boxShadow: "none",
    boxShadow: "0px 0px 24px rgba(72, 74, 158, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "left",
    flex: 1,
    "& .MuiAvatar-root": {
      marginRight: "16px",
      width: "46px",
      height: "46px",
    },
  },
}));

const SuccessPage = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ textAlign: "center" }}
      className={classes.dialogContainer}
    >
      <DialogContent style={{ padding: "0" }}>
        <Card className={classes.root}>
          <CardContent>
            <div
              style={{
                backgroundImage: `url(${celebration})`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={successGif}
                  style={{ height: "90px", width: "90px" }}
                />
              </div>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="coloredHeading"
                fontWeight="bold"
                fontSize="48px"
              >
                Thank you!
              </Typography>
            </div>

            <Typography
              variant="body2"
              fontWeight="bold"
              pb={2}
              fontSize="16px"
            >
              Your user profile is now live and complete! Go on & get
              ready to schedule Knowledge Sessions now!
            </Typography>

            <Link to="/">
              <PrimaryButton
                title="Go home"
                style={{
                  marginBottom: "5%",
                  marginTop: "30px",
                }}
              />
            </Link>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPage;
