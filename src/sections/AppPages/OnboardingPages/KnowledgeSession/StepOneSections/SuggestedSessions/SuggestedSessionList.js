import { List } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import SuggestedSessionListItem from "./SuggestedSessionListItem";

const useStyles = makeStyles((theme) => ({
  list: {
    background: "",
    "&::webkit-scrollbar": {
      display: "none",
    },
  },
}));

const SuggestedSessionList = ({ category, data }) => {
  const classes = useStyles();
  return (
    <List
      className={"suggested-session-list"}
      style={{
        overflowY: "scroll",
        maxHeight: "45vh",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {data?.map((item) => {
        const { title, description } = item;
        return (
          <SuggestedSessionListItem
            key={title}
            category={category}
            title={title}
            description={description}
          />
        );
      })}
    </List>
  );
};

export default SuggestedSessionList;
