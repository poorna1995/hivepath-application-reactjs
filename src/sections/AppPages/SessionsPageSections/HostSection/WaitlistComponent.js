import { Typography } from "@mui/material";
import React from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import WaitlistItem from "./WaitlistItem";

const WaitlistComponent = () => {
  return (
    <PaperBase>
      <Typography
        fontSize="26px"
        lineHeight="32px"
        fontWeight="700"
        paddingBottom="16px"
      >
        Waitlist
      </Typography>

      {data.map((item) => {
        return <WaitlistItem key={item.id} data={item} />;
      })}
    </PaperBase>
  );
};

export default WaitlistComponent;

const data = [
  {
    id: "1",
    profilePicImageUrl: "",
    userName: "Grace Ling",
    userJob: "Designer at ELectronic Arts",
    eventDateAndTime: "OCT 28, 02:30PM- 03:00PM",
    waitlistType: "WL",
  },
  {
    id: "2",
    profilePicImageUrl: "",
    userName: "Nathalia Iole",
    userJob: "Digital Business Manager",
    eventDateAndTime: "OCT 28, 02:30PM- 03:00PM",
    waitlistType: "WL2",
  },
  {
    id: "3",
    profilePicImageUrl: "",
    userName: "Christina Moica",
    userJob: "Designer at ELectronic Arts",
    eventDateAndTime: "OCT 28, 02:30PM- 03:00PM",
    waitlistType: "WL1",
    isLastItem: true,
  },
];
