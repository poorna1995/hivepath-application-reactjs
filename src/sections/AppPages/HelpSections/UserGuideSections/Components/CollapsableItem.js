import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import StarBorder from "@mui/icons-material/StarBorder";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
      marginRight: "10px",
      color: "black",
      fontWeight: "bold",
    },
    "& .MuiListItemText-root > span": {
      fontWeight: "800",
    },
  },
  collapsedContainer: {
    "& .MuiListItemText-root > span": {
      fontWeight: "800",

      width: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  activeItem: {
    background: "rgba(72, 74, 158, 0.1)",
    borderRight: "2px solid #484A9E",
  },
  activeHeading: {
    color: "#484A9E",
  },
}));
const CollapsableItem = ({ title, data, active, setActive }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const activeHead =
    data.filter((item) => item.id === active).length > 0 ? true : false;

  const handleClick = () => {
    setOpen(!open);
  };

  const handleActive = (id) => {
    setActive(id);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} className={classes.root}>
        <ListItemIcon>
          {/* <InboxIcon /> */}
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText
          primary={title}
          className={activeHead ? classes.activeHeading : ""}
        />
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className={classes.collapsedContainer}
      >
        <List component="div" disablePadding>
          {data.map((item, index) => {
            const { title } = item;
            return (
              <ListItemButton
                key={`cii${index}`}
                sx={{ pl: 4 }}
                className={active === item.id ? classes.activeItem : ""}
                onClick={() => handleActive(item.id)}
              >
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsableItem;
