import contactUs from "assets/images/help-pages/contact-us/contact-us.svg";
import { ReactComponent as Fb } from "assets/svg/social-icons/facebookhigh.svg";
import { ReactComponent as Twitter } from "assets/svg/social-icons/twitter.svg";
import { ReactComponent as Linkedin } from "assets/svg/social-icons/linkedinhigh.svg";
import { ReactComponent as Gmail } from "assets/svg/social-icons/gmail.svg";
// import Instag from "assets/svg/social-icons/instagram.svg";
import Instag from "assets/svg/social-icons/insta.png";

import { Grid, Typography, Paper, TextField } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  socialIcons: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      margin: "30px 40px 40px 0",
      height: "40px",
    },
  },
  email: {
    display: "flex",
    alignItems: "center",
    "& svg": { marginRight: "10px", marginLeft: "10px" },
  },
  form: {
    background: "rgba(255, 255, 255, 0.4)",
    border: "2px solid #FFFFFF",
    boxSizing: "border-box",
    boxShadow: "0px 0px 50px 6px rgba(72, 74, 158, 0.08)",
    borderRadius: "24px",
    paddingLeft: "40px",
    paddingRight: "10%",
    paddingTop: "20px",
    minHeight: "500px",
    [theme.breakpoints.down("sm")]: {},
  },
  textField: {
    height: "40px",
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

const ContactUsSections = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      mb={3}
      pl={2}
      sx={{
        pl: { md: 2, xs: 0 },
        padding: { md: 0, xs: 2 },
      }}
    >
      <Grid item xs={12} md={6}>
        <img src={contactUs} />
        <br />
        <Typography
          variant="h6"
          fontSize="38px"
          className="coloredHeading"
          fontWeight={800}
        >
          Contact Us
        </Typography>
        <Typography variant="subtitle2" fontSize="16px">
          Looking for valid answers to your questions? Don’t worry!
        </Typography>
        <Typography variant="subtitle2" mt={1} fontSize="16px">
          You can write to us about your problems or just drop us an email. Our
          team will make sure to find satisfactory solutions to all your
          questions.
        </Typography>

        <Typography variant="h6" fontSize="28px" fontWeight="700" mt={3}>
          Get in touch with us
        </Typography>
        <Typography variant="subtitle2" className={classes.email}>
          {" "}
          <Gmail /> admin@hivepath.io
        </Typography>
        <div className={classes.socialIcons}>
          <Fb />
          <Twitter />
          <Linkedin />
          {/* <Instag /> */}
          <img
            src={Instag}
            style={{ height: "25px", width: "25px", marginBottom: "10px" }}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.form}>
          <Typography
            variant="h6"
            fontSize="28px"
            className="coloredHeading"
            fontWeight={800}
            pb={2}
          >
            Get in touch with us
          </Typography>

          <input className={classes.textField} placeholder="Name" />
          <input className={classes.textField} placeholder="Contact Number" />
          <input
            className={classes.textField}
            placeholder="Work email address"
          />
          <input className={classes.textField} placeholder="Designation" />

          <textarea
            className={classes.textField}
            placeholder="Message"
            style={{ height: "180px", paddingTop: "10px", resize: "none" }}
          ></textarea>

          <div className={classes.buttonContainer}>
            <PrimaryButton title="Send Message" />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ContactUsSections;
