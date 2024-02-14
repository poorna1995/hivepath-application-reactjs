import { ReactComponent as RightArrow } from "assets/svg/admin-icons/arrow-right.svg";

import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  listItem: {
    "& li": {
      paddingLeft: "0",
    },
    color: "rgba(0, 0, 0, 0.8)",
    "& > li > div > span > svg": {
      width: "auto",
      height: "24px",
      marginLeft: "10px",
      marginBottom: "-7px",
    },
    "& > li:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
    "& > li > div > span": {
      fontWeight: "600",
    },
  },
  root: {
    paddingRight: "20px",
  },
}));

const UGOverviewCard = ({ data, title, setExpanded }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={() => setExpanded(true)}>
      <Typography variant="h6" fontWeight="700" fontSize="22px">
        {title}
      </Typography>

      <List className={classes.listItem}>
        {data.map((item, index) => {
          return (
            <ListItem key={`ugitem${index}`}>
              <ListItemText>
                {item.title}
                <RightArrow />
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default UGOverviewCard;
