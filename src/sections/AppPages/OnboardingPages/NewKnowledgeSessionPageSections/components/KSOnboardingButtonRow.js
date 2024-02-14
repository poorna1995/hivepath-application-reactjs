import { Button, useMediaQuery } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "white",
    position: "fixed",
    bottom: "0px",
    height: "70px",
    display: "flex",
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

const KSOnboardingButtonRow = ({
  onClickPrimaryButton,
  onClickSecondaryButton,
  showPrimary,
  showSecondary,
  primaryText,
  secondaryText,
  marginLeft,
  nextURL,
  backURL,
  disablePrimary,
  loadingPrimary,
  hideBorder,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView)
  return (
    <div
      className={classes.root}
      style={
        matches
          ? {
              borderTop: hideBorder ? "" : "1px solid rgba(0,0,0,0.1)",
              marginLeft: "-8px",
            }
          : {
              borderTop: hideBorder ? "" : "1px solid rgba(0,0,0,0.1)",
              marginLeft: hideBorder ? "-48px" : "-24px",
            }
      }
    >
      {showSecondary && (
        <OutlinedButton
          title={secondaryText || "Back"}
          component={Link}
          to={backURL}
          onClick={onClickSecondaryButton}
          style={
            matches
              ? {
                  marginLeft: `23vw`,
                  marginRight: "16px",
                }
              : {
                  marginLeft: `30vw`,
                  marginRight: "16px",
                }
          }
        />
      )}
      {showPrimary && (
        <PrimaryButton
          title={primaryText || "Next"}
          onClick={onClickPrimaryButton}
          component={!onClickPrimaryButton ? Link : Button}
          to={nextURL}
          style={
            matches
              ? {
                  marginLeft: showSecondary ? "0vw" : `40vw`,
                }
              : {
                  marginLeft: showSecondary ? "0vw" : `35vw`,
                }
          }
          disabled={disablePrimary}
          loading={loadingPrimary}
        />
      )}
    </div>
  );
};

export default KSOnboardingButtonRow;
