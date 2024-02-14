import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { ReactComponent as ArrowIcon } from "assets/svg/all/new-icons/dropdown-menu/right-arrow.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "8px",
    marginLeft: "16px",
    marginRight: "16px",
    "&:hover": {
      borderRadius: "10px",
      background: "#f7f7f7",
      "& > div:first-child": {
        background: "rgba(229, 79, 109, 0.1)",
      },
      "&>svg": {
        opacity: 1,
      },
    },
  },
  listItemIcon: {
    background: "#F8F8F8",
    padding: "8px",
    borderRadius: "7px",
    marginRight: "8px",
    "&:hover": {
      background: "rgba(229, 79, 109, 0.1)",
    },
  },

  icon: {
    // marginLeft: "8px",
    width: "20px",
    height: "20px",
  },
  primaryText: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    // letterSpacing: "-0.03em",
    color: "rgba(34, 34, 34, 1)",
    // paddingLeft: "8px",
  },
  secondaryText: {
    fontWeight: "500",
    color: "#515151",
    fontSize: "13px",
    lineHeight: "13px",
},
  arrowIcon: {
    opacity: 0,
  },
}));

const DropDownMenuItemButton = ({
  url,
  icon: Icon,
  title,
  hasDivider,
  description,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <MenuItem className={classes.root} {...props}>
        <ListItemIcon className={classes.listItemIcon}>
          {Icon && <Icon className={classes.icon} />}
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={
            <Typography className={classes.primaryText}> {title}</Typography>
          }
          secondary={
            <Typography className={classes.secondaryText}>
              {description}
            </Typography>
          }
        />
        <ArrowIcon className={classes.arrowIcon} />
      </MenuItem>
    </>
  );
};
export default DropDownMenuItemButton;
