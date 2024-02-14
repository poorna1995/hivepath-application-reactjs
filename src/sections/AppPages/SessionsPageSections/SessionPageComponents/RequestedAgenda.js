import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";

const useStyles = makeStyles((theme) => ({
  accordion: {
    transition: "0.4s",
    cursor: "pointer",
  },
  panel: {
    display: "none",
    overflow: "hidden",
    padding: "",
  },
  listItem: {
    padding: "16px",
    background: "white",
    marginBottom: "8px",
  },
  accordionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    lineHeight: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      lineHeight: "24px",
    },
  },
}));

const RequestedAgenda = ({ list, message, insideDrawer }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  const handleClick = () => {
    setExpanded(!expanded);
  };
  return (
    <PaperBase>
      <Accordion
        style={{ background: "transparent" }}
        elevation={0}
        variant="elevation"
        expanded={expanded}
        onChange={handleClick}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore style={{ fontSize: "32px" }} />}
        >
          <Typography
            className={classes.accordionTitle}
            fontSize="24px"
            fontWeight="700"
            lineHeight="30px"
          >
            Requested questions to discuss
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {list?.map((item) => (
              <ListItem
                key={item.id}
                sx={
                  insideDrawer && {
                    margin: "0px",
                    padding: "8px",
                  }
                }
                className={classes.listItem}
              >
                <Typography fontSize="16px" lineHeight="22px" fontWeight="500">
                  {item.key}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
        </AccordionDetails>
      </Accordion>
      {message && (
        <>
          <Typography
            fontSize="24px"
            fontWeight="700"
            lineHeight="30px"
            paddingBottom="16px"
            paddingTop="16px"
            paddingLeft="16px"
          >
            Message
          </Typography>
          <Typography
            fontSize="16px"
            lineHeight="22px"
            fontWeight="500"
            paddingLeft="16px"
          >
            {message}
          </Typography>
        </>
      )}
    </PaperBase>
  );
};

export default RequestedAgenda;
