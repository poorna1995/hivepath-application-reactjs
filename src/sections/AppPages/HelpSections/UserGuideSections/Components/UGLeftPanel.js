import { useState } from "react";
import List from "@mui/material/List";
import CollapsableItem from "./CollapsableItem";

const UGLeftPanel = ({ data }) => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(1);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleActive = useState();

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
    >
      {Object.keys(data).map((item, index) => {
        return (
          <CollapsableItem
            key={`ci${index}`}
            title={item}
            data={data[item]}
            active={active}
            setActive={setActive}
          />
        );
      })}
    </List>
  );
};

export default UGLeftPanel;
