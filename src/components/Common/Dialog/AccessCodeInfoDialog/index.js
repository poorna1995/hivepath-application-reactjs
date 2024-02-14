import { Box, Typography, Grid } from "@mui/material";
import EmailInput from "components/Common/Inputs/EmailInput";
import TextInput from "components/Common/Inputs/TextInput";
import React, { useState } from "react";
import HivepathBaseDialog from "../HivepathBaseDialog";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import authFetch from "utils/authFetch";
const AccessCodeInfoDialog = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const handleFormSubmit = () => {
    setUserEmail(email);
    const url = "https://auth.hivepath.io/api/requestAccessCode";
    const data = {
      email,
    };
    authFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          setUserEmail(email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelModalClose = () => {
    handleClose();
    setEmail("");
    setUserEmail("");
  };
  return (
    <HivepathBaseDialog open={open} handleClose={handelModalClose}>
      {!userEmail && (
        <Box
          sx={{
            maxWidth: { md: "600px", xs: "360px", sm: "500px" },
            paddingLeft: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              // textAlign: "center",
              paddingBottom: "16px",
            }}
          >
            Invitation Code
          </Typography>
          <Typography>
            Invitation code can be obtained by users who is a registered user of
            <a href="https://hivepath.io" style={{ fontWeight: "700" }}>
              {" "}
              hivepath.io
            </a>
            . Please connect with someone who is already in the network to get
            the invitation code. (or) Show you interest to signup by providing
            the email address and our team will contact you
          </Typography>

          {/* <Typography
            sx={{ fontSize: "24px", fontWeight: "700", textAlign: "center" }}
          >
            Request access code from us
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Request an access code. Enter your email below and our team will
            contact you
          </Typography> */}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <EmailInput email={email} setEmail={setEmail} />
            </Grid>
            <Grid item xs={12}>
              <PrimaryButton
                title={`Submit`}
                type="submit"
                onClick={handleFormSubmit}
                disabled={!email}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {userEmail && (
        <Box
          sx={{
            padding: "16px",
            maxWidth: { md: "600px", xs: "360px", sm: "500px" },
          }}
        >
          <Typography>
            We have received your request, our team will contact you on your
            email{" "}
            <span
              style={{
                fontWeight: "700",
                fontSize: "16px",
                color: "green",
              }}
            >
              {userEmail}
            </span>{" "}
            soon
          </Typography>
        </Box>
      )}
    </HivepathBaseDialog>
  );
};

export default AccessCodeInfoDialog;
