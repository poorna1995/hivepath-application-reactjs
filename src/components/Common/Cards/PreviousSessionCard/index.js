import group from "assets/svg/scheduler-icons/Group.png";
import classes from "./PreviousSessionCard.module.css";
import { Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import RoundCornersButton from "components/Common/Buttons/RoundCornersButton";
import ShortDateCard from "../ShortDateCard";
import Loader from "components/Common/Loader";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import noPreviousSessions from "assets/svg/all/new-icons/empty-states/booking/avail.svg";
import PaperBase from "components/Common/PaperBase/PaperBase";

const PreviousSessionCard = (props) => {
  const { isLoading, data } = props;
  const { scheduleCard } = useSelector((state) => state.scheduler);

  if (isLoading) {
    return (
      <Grid
        item
        xs={12}
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          //   background: "white",
        }}
      >
        {/* <Loader style={{ margin: "0 auto" }} /> */}
      </Grid>
    );
  }

  return (
    <PaperBase className={classes.sessionCardHead} mb={7}>
      <Grid item xs={12} md={12} pl={4} mb={2}>
        <Typography variant="h6" fontWeight="800" style={{ fontSize: "24px" }}>
          Previous Sessions with {scheduleCard?.username}
          {/* Ray */}
        </Typography>
      </Grid>

      {data.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BaseEmptyStateComponent
            imgSrc={noPreviousSessions}
            message={`You don't have any previous sessions with the Host!`}
          />
        </div>
      )}

      <Grid container className={classes.sessionCard}>
        {data.map((rowItem, index) => {
          return (
            <Fragment key={index + "prS"}>
              <Grid
                item
                xs={2}
                md={2}
                align="center"
                mb={2}
                p={2}
                className={classes.cardItem}
              >
                <ShortDateCard
                  date={rowItem.date}
                  head="#FF5621"
                  style={{ width: "50%" }}
                />
              </Grid>

              <Grid
                item
                xs={10}
                md={10}
                p={2}
                mb={2}
                align="left"
                className={classes.cardItem}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "5px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bolder"
                      style={{ color: "black", fontSize: "18px" }}
                      mb={1}
                    >
                      {rowItem.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    align="left"
                  >
                    <RoundCornersButton
                      style={{
                        border: "1px solid #dfdcdc",
                        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "black",
                        paddingRight: "14px",
                      }}
                      title={
                        <>
                          <img
                            src={group}
                            style={{
                              height: "16px",
                              marginBottom: "-2px",
                              marginRight: "5px",
                            }}
                            alt=""
                          />{" "}
                          {rowItem.category}
                        </>
                      }
                    ></RoundCornersButton>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="500"
                      style={{
                        color: "black",
                        fontSize: "16px",
                        letterSpacing: "0.07em",
                      }}
                      mb={1}
                    >
                      {rowItem.time}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </PaperBase>
  );
};

export default PreviousSessionCard;
