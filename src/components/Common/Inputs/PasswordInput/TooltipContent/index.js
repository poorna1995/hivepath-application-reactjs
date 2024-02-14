// this file is for tooltip content that will be shown in the password input tooltip

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { ReactComponent as CheckIcon } from "../../../../../assets/svg/input-icons/check.svg";

import { ReactComponent as InfoIcon } from "../../../../../assets/svg/input-icons/info.svg";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 0,
  },
}));
const PasswordInputTooltipContent = ({ data, ref }) => {
  const classes = useStyles();
  return (
    <List ref={ref}>
      {data?.map((item) => {
        const { text, condition } = item;
        return (
          <ListItem key={text} className={classes.listItem}>
            {condition ? (
              <>
                <ListItemIcon
                  style={{
                    color: "#22B04A",
                    fontSize: "14px",
                    paddingRight: "0px",
                    marginLeft: "8px",
                  }}
                >
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  style={{
                    textDecoration: "line-through",
                    color: "#B7B7B7",
                    paddingLeft: 0,
                    marginLeft: "-24px",
                  }}
                />
              </>
            ) : (
              <>
                <ListItemIcon
                  style={{
                    color: "red",
                    paddingRight: "0px",
                    marginLeft: "8px",
                  }}
                >
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  style={{
                    color: "#6D6D6D",
                    paddingLeft: 0,
                    marginLeft: "-24px",
                  }}
                />
              </>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default PasswordInputTooltipContent;
