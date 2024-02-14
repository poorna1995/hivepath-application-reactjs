import { Typography, LinearProgress, Box } from "@mui/material";
// import classes from "./ProgressBar.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  head: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "0px !important",
    paddingTop: "8px",
    width: "100%",
    fontWeight: "bold",
    textAlign: "center",
    "& div": {
      marginLeft: "5px",
    },
  },

  linearProgress: {
    flexBasis: "100%",
    "& .MuiLinearProgress-bar": { borderRadius: "20px" },
  },
}));

const Progress = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const scrollIntoView = (el) => {
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
      window.scrollTo(0, 0);
    }, 500);
  };

  useEffect(() => {
    const element = document.getElementById(`progressDiv${props.active}`);
    if (element) {
      scrollIntoView(element);
    }
  }, [props.active]);

  return (
    <>
      <div className={matches ? "row" : ""} style={{ flexWrap: "wrap" }}>
        <div>
          <div
            className={`${classes.head}`}
            style={{
              width: matches ? "fit-content" : "auto",
            }}
          >
            {props.data.map((item, i) => {
              let active = i + 1 <= props.active;

              return (
                <div key={"progressDiv" + i} id={"progressDiv" + i}>
                  <Link to={item.link}>
                    <Box
                      className="text_title"
                      sx={{
                        width: {
                          xs: "100px",
                          md: "auto",
                        },
                      }}
                      style={{ display: "inline-flex" }}
                    >
                      <Typography
                        variant="body2"
                        display={{ xs: "flex", md: "block" }}
                        sx={{
                          color: (theme) =>
                            active
                              ? theme.palette.primary.main
                              : "rgba(21, 20, 20, 0.6)",
                          fontWeight: "bold",
                          marginLeft: {
                            xs: "-8px",
                            md: 2,
                          },
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Link>
                </div>
              );
            })}
          </div>
          <LinearProgress
            className={classes.linearProgress}
            variant="determinate"
            value={(100 / props.data.length) * props.activeBar}
            sx={{ marginTop: "10px", minWidth: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default Progress;
