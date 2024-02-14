import { Typography } from "@mui/material";
import React from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import PreviousSessionListItem from "./PreviousSessionListItem";

const PreviousSessionList = ({ data }) => {
  return (
    <>
      {Array.isArray(data) && data.length > 0 && (
        <div style={{ paddingBottom: "32px" }}>
          <PaperBase>
            <Typography fontSize="26px" fontWeight="bold" lineHeight="32px">
              Previous Session
            </Typography>
            {data?.map((item) => {
              const { title, category, time, date } = item;
              return (
                <PreviousSessionListItem
                  title={title}
                  time={time}
                  category={category}
                  date={date}
                />
              );
            })}
            {/* <PreviousSessionListItem />
        <PreviousSessionListItem />
        <PreviousSessionListItem />
        <PreviousSessionListItem /> */}
          </PaperBase>
        </div>
      )}
    </>
  );
};

export default PreviousSessionList;
