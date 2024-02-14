import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiListItemText-root > span": {
      fontWeight: "800",
    },
  },
  activeItem: {
    background: "rgba(72, 74, 158, 0.1)",
    borderRight: "2px solid #484A9E",
    color: "#484A9E",
  },
}));
const FaqLeftPanel = ({ data }) => {
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState(1);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderRight: "1px solid rgba(0, 0, 0, 0.1)",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {data.map((item, index) => {
        const { title, id } = item;
        return (
          <ListItemButton
            key={`flpi${index}`}
            onClick={() => setActiveItem(id)}
            className={activeItem === id ? classes.activeItem : ""}
          >
            <ListItemText primary={title} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default FaqLeftPanel;
