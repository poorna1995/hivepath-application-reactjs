import { Typography, IconButton } from "@mui/material";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
import { ReactComponent as AddIcon } from "assets/svg/help-page/add.svg";
import { ReactComponent as AddInactiveIcon } from "assets/svg/help-page/addInactive.svg";

import Divider from "@mui/material/Divider";

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
}));
const FaqListItem = ({ title, data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} className={classes.root}>
        <ListItemText primary={title} />
        <ListItemIcon>
          {/* <InboxIcon /> */}
          {open ? <AddIcon /> : <AddInactiveIcon />}
        </ListItemIcon>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography
          variant="subtitle2"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.6)"
          pl={2}
          pb={2}
        >
          {data}
        </Typography>
      </Collapse>
      <Divider />
    </>
  );
};

export default FaqListItem;
